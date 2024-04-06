import pool from "../config/db.js";

const argumento = process.argv.slice(2);
const opcion = argumento[0];
const id = argumento[1];
const nombre = argumento[2];
const rut = argumento[3];
const curso = argumento[4];
const nivel = argumento[5];




// Agregar un nuevo estudiante
const agregar = async (nombre, rut, curso, nivel) => {
    try {
        const query = {
            text: "INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *",
            values: [nombre, rut, curso, nivel],
        }
        const response = await pool.query(query);
        console.log("Estudiante agregado correctamente", response.rows[0]);
    } catch (error) {
        console.log("Error:", error.message);
    }
};




// Consultar todos los estudiantes
const consultarTodos = async () => {
    try {
        const query = {
            text: "SELECT * FROM estudiantes",
            rowMode: 'array'
        }
        const response = await pool.query(query);
        console.log(response.rows);
        
    } catch (error) {
        console.log("Error:", error.message);
    }
};




// Consultar un estudiante por su ID
const consultarPorId = async (id) => {
    try {
        const query = {
            text: "SELECT * FROM estudiantes WHERE id = $1",
            values: [id],
            rowMode: 'array'
        }
        const response = await pool.query(query);
        if (response.rows.length > 0) {
            console.log(response.rows);
        } else {
            console.log("No se encontró el estudiante con el ID ingresado");
        }
    } catch (error) {
        console.log("Error:", error.message);
    }
};




// Actualizar un estudiante por su ID
const actualizar = async (id, nombre, rut, curso, nivel) => {
    try {
        const query = {
            text: "UPDATE estudiantes SET nombre = $2, rut = $3, curso = $4, nivel = $5 WHERE id = $1 RETURNING *",
            values: [id, nombre, rut, curso, nivel],
        }
        const response = await pool.query(query);
        if (response.rows.length > 0) {
            console.log("Estudiante actualizado correctamente", response.rows[0]);
        } else {
            console.log("No se encontró el estudiante con el ID ingresado");
        }
    } catch (error) {
        console.log("Error:", error.message);
    }
};




// Eliminar un estudiante por su ID
const eliminarPorId = async (id) => {
    try {
        const query = {
            text: "DELETE FROM estudiantes WHERE id = $1 RETURNING *",
            values: [id],
        }
        const response = await pool.query(query);
        if (response.rows.length > 0) {
            console.log("Estudiante eliminado correctamente", response.rows[0]);
        } else {
            console.log("No se encontró el estudiante con el ID ingresado");
        }
    } catch (error) {
        console.log("Error:", error.message);
    }
};




// Switch para elegir la opción
switch (opcion) {
    case "agregar":
        agregar(nombre, rut, curso, nivel);
        break;
    case "consultarTodos":
        consultarTodos();
        break;
    case "consultarPorId":
        consultarPorId(id);
        break;
    case "actualizarPorId":
        actualizar(id, nombre, rut, curso, nivel);
        break;
    case "eliminarPorId":
        eliminarPorId(argumento[1]);
        break;
    default:
        console.log("Opción ingresada no válida");
        break;
}



