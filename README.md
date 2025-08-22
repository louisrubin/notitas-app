# Notitas 
###### 🚀 Nueva versión `2.4`

**Aplicación de notas desarrollado en React Native con Expo, implementando SQLite.**

|  |
|:---------------:|
| <img src="https://github.com/user-attachments/assets/b566fccd-1304-4b9e-ac29-ae982b9ee9fa" alt="Notitas-preview.gif" width="400"/> |

La idea de hacer este proyecto nació por el interés de querer crear algo simple en vacaciones y en el proceso me daba 
cuenta que hasta lo que se ve simple puede ser complejo en llevar a cabo.

Sin embargo estoy orgulloso de haberlo realizado, aunque me gustaría poder agregar más características en un futuro, 
como renderizar Markdown `(.md)` en tiempo real al escribir, como también enlazar notas dentro de otras notas... 
aún así estoy muy contento con el resultado, la experiencia y los conocimientos obtenidos. 😄

## 🚀 Nueva versión `2.4`
###### Lanzamiento: 19 ago 2025
| Modo Claro/Oscuro 🌓 | Autoguardado 💾 | Modal de confirmación 📋 |
|:---------------:| :---------------:| :---------------:|
| ![Modo Claro/Oscuro](https://github.com/user-attachments/assets/7ab8c8f9-6b54-4404-adbc-896856dca3b3) | ![Autoguardado](https://github.com/user-attachments/assets/f9639772-0a78-47d1-924b-af96bb9edcd3) | ![Modal de confirmación](https://github.com/user-attachments/assets/1454a0ab-9ad1-4035-8812-e68ed8a63050) |

## Librerías 📚

- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/): Base de datos para el almacenamiento de las notas.
- [@react-native-async-storage/async-storage](https://docs.expo.dev/versions/latest/sdk/async-storage/): Almacenamiento de clave-valor para persistir las preferencias y leerlas al momento de iniciar la app.
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started): Componentes animables como animación en acciones y transición suave entre los temas claro/oscuro.
- [react-native-paper](https://reactnativepaper.com/): Necesario para sobreponer el Modal en la pantalla.
- [react-native-dropdown-picker](https://www.npmjs.com/package/react-native-dropdown-picker): Menú desplegable para las opciones en la pantalla de configuración.

## ⏳En desarrollo:

* [x] Mejora de rendimiento
* [x] Modo claro/oscuro
* [x] Nuevas animaciones agregadas
* [x] Modal de confirmación al eliminar notas
* [x] Mensaje intuitivo al no haber ningúna nota
* [x] Botón "seleccionar todos" en papelera
* [ ] Paleta de colores personalizable para las fuentes
* [ ] Renderizar Markdown en el editor
* [ ] Enlazar notas dentro de otras notas

# Estructura de la App (resumen)

# 💾Base de datos 

## 📊Tablas 
Solo existe esta única tabla `notes` y dependiendo de su atributo `delete_date` se obtienen
las notas visibles en inicio (y editables) y las que "están" en papelera (no editables).
```js
CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT, 
    value TEXT, 
    created_at TEXT, 
    updated_at TEXT,
    delete_date TEXT  // fecha futura en la que será eliminada la nota
);
```

```js
if (nota.delete_date !== NULL) => show();  // mostrar en inicio
else => null  // mostrar en papelera
```


## 🗑️Eliminar notas 

Al momento de eliminar una o varias notas lo que se hace es agrupar los `id` de cada nota en un array
para luego pasársela a la función `setDeleteNote(listDelet: number[])` el cual hace un UPDATE a cada nota en la BD
cambiando el campo `delete_date` a una fecha futura de 14 días para así dejar de ser NULL y no será mostrada en el inicio.
```js
const setDeleteNote = async (db: SQLiteDatabase, listDelet: number[]) => {
  const diaFuturo = new Date(new Date().setDate(new Date().getDate() + diasParaDelete));
  if (listDelet.length > 0) {
      // Si el array está vacío la query se rompe
      await db.runAsync(
          `UPDATE notes 
          SET delete_date = ? 
          WHERE id IN (${listDelet.map( () => '?').join(',')});
          `, // Genera un string como "?, ?, ?, ..."
          [diaFuturo.toISOString(), ...listDelet]
      );
  }
}
```


## 🚀Iniciando la app 

A su vez al iniciar la app se ejecuta la función `deleteNoteVencidas()` la cual compara la fecha actual y las fechas
de eliminación de cada nota en papelera eliminándolos de la BD:
```js
const today = new Date().toISOString(); // fecha actual
await db.runAsync(
    `DELETE FROM notes
    WHERE delete_date IS NOT NULL
    AND delete_date <= ?;
`, [today]);
```


# ⚙️Configuraciones 
Toda esta información se gestionan mediante un `context` global para así poder leer los datos desde cualquier parte
de la aplicación mediante sus funciones. 

Al iniciar la app se obtienen las configuraciones guardadas desde `AsyncStorage` el cual permite almacenar valores
que perduren al abrir y cerrar la app. 
```js
// obteniedo informacion desde AsyncStorage
const item = await AsyncStorage.getItem(clave);  // clave --> string
return item ? JSON.parse(item) : null;    // parsea a un objeto para leerlo
```
Una vez obtenido los datos desde ***AsyncStorage*** se asigna esos valores al ***context*** global que luego serán leídos
por los demás componentes.
```js
// obtener datos desde el AsyncStorage
const [ savedFontSize, savedOrder, savedDesign, savedTheme, savedSaveAuto ] = 
    await Promise.all([
        storage.get("fontSize"),
        storage.get("orderBy"),
        storage.get("designBy"),
        storage.get("theme"),
        storage.get("saveAuto"),
    ]
);

// verif si hay valores guardados y los asigna al context global
if (savedFontSize !== null) setFontSize(savedFontSize);
if (savedOrder !== null) setOrder(savedOrder);
if (savedDesign !== null) setDesign(savedDesign);
if (savedTheme !== null) setTheme(savedTheme);
if (savedSaveAuto !== null) setSaveAuto(savedSaveAuto);
// ...
```


# 📂Vistas 
Listado de los componentes de vistas
- `Index` (pantalla de inicio)
- `Settings` (pantalla de configuraciones)
- `NotaDetail` (editor de texto)
- `Trash` (papelera)
- `Policies` (info relevante sobre la app)

*Pequeño diagrama al diseñar la app, en principio también quería que se pueda agrupar las notas por carpetas*

<img width="721" height="467" alt="Captura" src="https://github.com/user-attachments/assets/c00aa95f-99c0-4a12-bef4-f17a5136d566" />


* Versión 1 desarrollada: 7/7 - 28/7/2025*

# ⬇️Descargas 

| Android 🤖 | iOS 🍎 |
|:---------------:| :---------------:|
| 🆕 *[APK v2.4](https://drive.google.com/file/d/1qd3pxJ_3L733AdB1SEZzgzHvaMWSUAy3/view?usp=sharing)*| - |
|*[APK v1.0](https://drive.google.com/file/d/1md6GI2eRv2aZkqcwHP4_xUU4ETkWrut4/view?usp=drive_link)*| - |
