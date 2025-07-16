import * as SQLite from 'expo-sqlite';
const dbTableName = "notes";
const db = SQLite.openDatabaseAsync('notesDB');

export interface Nota {
    id?: number;
    title: string;
    value: string;
    created_at: string;
    updated_at?: string;
    delete_date?: string;
}

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

// ESTE TIENE QUE SER DELETE TODOS LOS ELIMINADOS PASADOS 7-14-30 DIAS
// EL 'ELIMINAR' TIENE QUE SER SETEAR EL ATRIBUTO delete_date +30 días
export const deleteNote = async (id: number) => {
    try {
        await (await db).runAsync(`
            DELETE FROM ${dbTableName} WHERE id = ?;
        `, [id]);
    } catch (e) {
        console.log("Error deleting note:", e); 
    }
}

export const getAllRows = async (orderBy: string, removedRows = false): Promise<Nota[]> => {
    const query = getQuery(orderBy, removedRows);    // query segun el param y Context Settings
    // console.log("query:",query);
    
    try {
        const allRows = await (await db).getAllAsync(query);
        return allRows as Nota[];
    } catch (e) {
        console.log("Error getting all notes:", e);
        return null;
    }
}

const getQuery = (orderBy: string, removedRows: boolean) : string => {
    let query = `SELECT * FROM ${dbTableName} `;

    if (removedRows) {
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