import mysql from "mysql2/promise";

export const conexion = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "reclamos",
  password: "",
  port: 3306
});
