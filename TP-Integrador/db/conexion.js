import mysql from 'mysql2/promise';

// Create the connection to database
export const conexion = await mysql.createConnection({
  host: 'localhost',
  user: 'cambiar',
  database: 'cambiar',
  password: 'cambiar'
});