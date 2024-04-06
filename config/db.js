import pkg from 'pg';

import 'dotenv/config.js';

const { Pool } = pkg;

// Extraer las variables de entorno para la conexión a la base de datos
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

const config = {
    user: DB_USER,
    password: DB_PASS,
    host: DB_HOST,
    database: DB_NAME,
    allowExitOnIdle: true,
};    

const pool = new Pool(config);

export default pool;
