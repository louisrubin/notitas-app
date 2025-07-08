import * as SQLite from 'expo-sqlite';

const dbTableName = "notes";

let db = SQLite.openDatabaseAsync('notesDB');

export interface Nota {
    id: number;
    title: string;
    value: string;
    created_at: string;
    updated_at: string;
}

// export const initDB = async () => {

// }

export const initDB = async () => {
    try{
        await (await db).runAsync(`
            CREATE TABLE IF NOT EXISTS ${dbTableName} (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT, 
                value TEXT, 
                created_at TEXT, 
                updated_at TEXT
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

export const deleteNote = async (id: number) => {
    try {
        await (await db).runAsync(`
            DELETE FROM ${dbTableName} WHERE id = ?;
        `, [id]);
    } catch (e) {
        console.log("Error deleting note:", e); 
    }
}

export const getAllNotes = async (): Promise<Nota[]> => {
    try {
        const allRows = await (await db).getAllAsync(`
            SELECT * FROM ${dbTableName}
        `);
        console.log(allRows);
        return allRows as Nota[];
    } catch (e) {
        console.log("Error getting all notes:", e);
        return [];
    }
}

// prepared statements
// const preparedInsertStatement = async (title: string, value: string, date: string) => {
//     // compile your SQL query once and execute it multiple times
//     return (await db).prepareAsync(`
//         INSERT INTO notes (title, value, date, updated_at)
//             VALUES (${title}, ${value}, ${date}, ${date});
//     `);
// }