import { SQLiteDatabase } from "expo-sqlite";

// https://docs.expo.dev/versions/latest/sdk/sqlite/

export const dbTableName = "notes";
export const diasParaDelete = 14;   // días para la eliminacion permanente

export interface Nota {
    id?: number;
    title: string;
    value: string;
    created_at: string;
    updated_at?: string;
    delete_date?: string;
};

export async function addColumnBD(
    // AGREGAR COLUMNA A LA TABLA YA CREADA
    {db, name, type} : {db: SQLiteDatabase, name: string, type: string}
) {
    try {
        await db.execAsync(`
            ALTER TABLE ${dbTableName}
            ADD COLUMN ${name} ${type};
        `)
    } catch (error) {
        console.log("Error agregando columna:", error);
    }
}

export const getNextID = async (db: SQLiteDatabase): Promise<number | null> => {
    // OBTENER EL PROXIMO VALOR DE ID EN LA TABLA
    try {
        const result = await db.getFirstAsync<{ nextId: number | null }>(
            `SELECT COALESCE(MAX(id), 0) + 1 as nextId 
            FROM ${dbTableName};`
        );
        return result?.nextId ?? 1; // devuelve null si no hay registros
    } catch (e) {
        console.error("Error obteniendo el siguiente ID:", e);
        return 1;
    }
};

export const initDB = async (db: SQLiteDatabase) => {
    try{     
        await db.execAsync(`
            PRAGMA journal_mode = 'wal';
            CREATE TABLE IF NOT EXISTS ${dbTableName} (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT, 
                value TEXT, 
                created_at TEXT, 
                updated_at TEXT,
                delete_date TEXT
            );
        `);
    } catch(e) {
        console.log("Error creando la tabla:", e);
    }
}

export const insertNote = async (db: SQLiteDatabase, nota: Nota) => {
    try{
        const result = await db.runAsync(`
            INSERT INTO ${dbTableName} (title, value, created_at, updated_at)
            VALUES (?, ?, ?, ?);
        `, [nota.title, nota.value, nota.created_at, nota.created_at]);
        return result.lastInsertRowId;  // retorna el ID
        // (await preparedInsertStatement(title, value, date)).executeAsync(title, value, date);

    }catch(e){
        console.log("Error inserting note:", e); 
    }
}

export async function getNoteByID(db: SQLiteDatabase, id: number): Promise<Nota> {
    // OBTENER UN SOLO REGISTRO DE LA BD RETORNANDO COMO 'Nota'
    try {
        const nota = await db.getFirstAsync(
                `
                SELECT * 
                FROM ${dbTableName} 
                WHERE id = ?;
                `, [id]
            );
        return nota as Nota;
    } catch (error) {
        console.log("Error al cargar la nota:", error);
    }
}


export const updateNote = async ( 
    db: SQLiteDatabase, 
    { id, title, value, updated_at }: Nota
) => {
    try {
        await db.runAsync(`
            UPDATE ${dbTableName} 
            SET title = ?, value = ?, updated_at = ?
            WHERE id = ?;
        `, [title, value, updated_at, id]);
    } catch (e) {
        console.log("Error updating note:", e); 
    }
}

export const deleteNotesManual = async (db: SQLiteDatabase, listDelet: number[]) => {
    try {
        if (listDelet.length > 0) {
            // Si el array está vacío la query se rompe
            db.runAsync(
                `DELETE FROM ${dbTableName} 
                WHERE id IN (${listDelet.map( () => '?').join(',')});`, // Genera un string como "?, ?, ?, ..."
                listDelet
            );
        }
    } catch (error) {
        console.log("Error al eliminar notas manualmente:",error);        
    }
}


export const deleteNoteVencidas = async (db: SQLiteDatabase) => {
    // TODAS LAS NOTAS CON delete_date CON FECHA PASADA SE ELIMINAN 
    try {
        const today = new Date().toISOString(); // fecha actual
        await db.runAsync(
            `
            DELETE FROM ${dbTableName} 
            WHERE delete_date IS NOT NULL AND delete_date <= ?;
        `, [today]);
    } catch (e) {
        console.log("Error eliminando notas vencidas:", e); 
    }
}

export const setDeleteNote = async (db: SQLiteDatabase, listDelet: number[]) => {
    // RECIBE ARRAY Y CADA ID SETEA LAS NOTAS EN LA BD CON 'delete_date'
    const diaFuturo = new Date(new Date().setDate(new Date().getDate() + diasParaDelete));
    
    try {
        if (listDelet.length > 0) {
            // Si el array está vacío la query se rompe
            await db.runAsync(
                `
                UPDATE ${dbTableName} 
                SET delete_date = ? 
                WHERE id IN (${listDelet.map( () => '?').join(',')});
                `, // Genera un string como "?, ?, ?, ..."
                [diaFuturo.toISOString(), ...listDelet]
            );
        }
    } catch (error) {
        console.log("Error al eliminar nota:",error);        
    }
} 

export const undoNotesFromTrash = async (db: SQLiteDatabase, listTrash: number[]) => {
    // RECIBE ARRAY Y CADA ID SETEA SU CAMPO 'delete_date' = NULL;
    try {
        if (listTrash.length > 0) {
            // Si el array está vacío la query se rompe
            await db.runAsync(
                `
                UPDATE ${dbTableName} 
                SET delete_date = NULL 
                WHERE id IN (${listTrash.map( () => '?').join(',')});
                `, // Genera un string como "?, ?, ?, ..."
                listTrash
            );
        }
    } catch (error) {
        console.log("Error al restaurar notas:",error);
    }
}

export const getAllRows = async (
    db: SQLiteDatabase, 
    orderBy: string, 
    trashRows = false,
): Promise<Nota[]> => {
    const query = getQuery(orderBy, trashRows);    // query segun el param y Context Settings
    
    try {
        const allRows = await db.getAllAsync(query);
        return allRows as Nota[];
    } catch (e) {
        console.log("Error getting all notes:", e);
        return null;
    }
}

const getQuery = (orderBy: string, trashRows: boolean) : string => {
    let query = `SELECT * FROM ${dbTableName} `;

    if (trashRows) {
        // get notas seteadas como eliminadas
        query += `WHERE delete_date IS NOT NULL
                  ORDER BY delete_date DESC`;
    } 
    else if (orderBy === "created_date") {
        // Fecha de creación
        query += `WHERE delete_date IS NULL
                  ORDER BY created_at DESC`;
    } 
    else if (orderBy === "modification_date") {
        // Fecha de modificación
        query += `WHERE delete_date IS NULL
                  ORDER BY updated_at DESC`;
    }
    return query + ";";
}

// prepared statements
// const preparedInsertStatement = async (title: string, value: string, date: string) => {
//     // compile your SQL query once and execute it multiple times
//     return await db.prepareAsync(`
//         INSERT INTO notes (title, value, date, updated_at)
//             VALUES (${title}, ${value}, ${date}, ${date});
//     `);
// }

export const deleteALL = async (db: SQLiteDatabase) => {
    try {
        await db.runAsync(`
            DELETE FROM ${dbTableName};`);
    } catch (e) {
        console.log("Error eliminando ALL:", e); 
    }
}