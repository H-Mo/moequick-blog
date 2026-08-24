// lib/db.ts —— MySQL 连接池
import mysql from "mysql2/promise";

/**
 * MySQL 连接池，管理多个连接，自动复用
 */
 export const pool = mysql.createPool({
    uri: process.env.DATABASE_URL,  // 数据库连接串
    waitForConnections: true,       // 连接用完等待复用
    connectionLimit: 10             // 最多 10 个连接
});