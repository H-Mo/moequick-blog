// lib/products.ts —— 产品数据查询
import { pool } from "./db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

/**
 * 定义产品
 *
 * @export
 * @interface Product
 */
export interface Product extends RowDataPacket{
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  link: string | null;
  tech_stack: string | null;
  sort_order: number;
}

/**
 * 查询产品列表
 *
 * @export
 * @return {*}  {Promise<Product[]>} 产品列表
 */
export async function getProducts():Promise<Product[]>{
  const [rows] = await pool.query<Product[]>(
    "SELECT * FROM products ORDER BY sort_order"
  );
  return rows;
}

/**
 * 查询单个产品，通过ID
 *
 * @export
 * @param {number} id 产品ID
 * @return {*}  {(Promise<Product | null>)} 产品
 */
export async function getProductById(id: number): Promise<Product | null> {
  const [rows] = await pool.query(
    "SELECT * FROM products WHERE id = ?",
    [id]
  );
  const list = rows as Product[];
  return list[0] ?? null; // 空值合并运算符
}

/**
 * 添加产品
 * @param product 产品对象
 * @returns 添加成功返产品ID，失败返回 -1
 */
export async function addProduct( product: Product): Promise<number> {
  const {name, description, image_url, tech_stack, link, sort_order} = product;
  const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO products (name, description, tech_stack, link) VALUES (?, ?, ?, ?)",
      [
        name ?? "未命名产品", 
        description ?? null, 
        image_url ?? null, 
        tech_stack ?? null, 
        link ?? null, 
        sort_order ?? 99
      ]
    );
    return result.insertId;  
}