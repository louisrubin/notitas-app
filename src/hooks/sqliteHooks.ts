import * as SQLite from 'expo-sqlite';
const dbTableName = "notes";
const db = SQLite.openDatabaseAsync('notesDB');

export const diasParaDelete = 14;   // días para la eliminacion permanente

export interface Nota {
    id?: number;
    title: string;
    value: string;
    created_at: string;
    updated_at?: string;
    delete_date?: string;
};

export const initDB = async () => {
    try{
        await (await db).runAsync(`
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
        console.log("Error creating table:", e);
    }
}

export const insertNote = async ({title, value, created_at}: Nota) => {
    try{
        await (await db).runAsync(`
            INSERT INTO ${dbTableName} (title, value, created_at, updated_at)
            VALUES (?, ?, ?, ?);
        `, [title, value, created_at, created_at]);
        // (await preparedInsertStatement(title, value, date)).executeAsync(title, value, date);

    }catch(e){
        console.log("Error inserting note:", e); 
    }
}

export async function getNoteByID(id: number): Promise<Nota> {
    // OBTENER UN SOLO REGISTRO DE LA BD RETORNANDO COMO 'Nota'
    try {
        const nota = await (await db).getFirstAsync(
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


export const updateNote = async ({id, title, value, updated_at}: Nota) => {
    try {
        await (await db).runAsync(`
            UPDATE ${dbTableName} 
            SET title = ?, value = ?, updated_at = ?
            WHERE id = ?;
        `, [title, value, updated_at, id]);
    } catch (e) {
        console.log("Error updating note:", e); 
    }
}

export const deleteNotesManual = async (listDelet: number[]) => {
    try {
        if (listDelet.length > 0) {
            // Si el array está vacío la query se rompe
            (await db).runAsync(
                `DELETE FROM ${dbTableName} 
                WHERE id IN (${listDelet.map( () => '?').join(',')});`, // Genera un string como "?, ?, ?, ..."
                listDelet
            );
        }
    } catch (error) {
        console.log("Error al eliminar notas manualmente:",error);        
    }
}


export const deleteNoteVencidas = async () => {
    // TODAS LAS NOTAS CON delete_date CON FECHA PASADA SE ELIMINAN 
    try {
        const today = new Date().toISOString(); // fecha actual

        await (await db).runAsync(
            `
            DELETE FROM ${dbTableName} 
            WHERE delete_date IS NOT NULL AND delete_date <= ?;
        `, [today]);
    } catch (e) {
        console.log("Error eliminando notas vencidas:", e); 
    }
}

export const setDeleteNote = async (listDelet: number[]) => {
    // RECIBE ARRAY Y CADA ID SETEA LAS NOTAS EN LA BD CON 'delete_date'
    const diaFuturo = new Date(new Date().setDate(new Date().getDate() + diasParaDelete));
    
    try {
        if (listDelet.length > 0) {
            // Si el array está vacío la query se rompe
            (await db).runAsync(
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

export const undoNotesFromTrash = async (listTrash: number[]) => {
    // RECIBE ARRAY Y CADA ID SETEA SU CAMPO 'delete_date' = NULL;
    try {
        if (listTrash.length > 0) {
            // Si el array está vacío la query se rompe
            (await db).runAsync(
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

export const getAllRows = async (orderBy: string, trashRows = false): Promise<Nota[]> => {
    const query = getQuery(orderBy, trashRows);    // query segun el param y Context Settings
    
    try {
        const allRows = await (await db).getAllAsync(query);
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
//     return (await db).prepareAsync(`
//         INSERT INTO notes (title, value, date, updated_at)
//             VALUES (${title}, ${value}, ${date}, ${date});
//     `);
// }

export const deleteALL = async () => {
    try {
        await (await db).runAsync(`
            DELETE FROM ${dbTableName};`);
    } catch (e) {
        console.log("Error deleting ALL note:", e); 
    }
}