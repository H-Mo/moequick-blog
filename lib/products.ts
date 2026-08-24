// lib/products.ts —— 产品数据查询
import { pool } from "./db";

/**
 * 定义产品
 *
 * @export
 * @interface Product
 */
export interface Product{
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
  const [rows] = await pool.query(
    "SELECT * FROM products ORDER BY sort_order"
  );
  return rows as Product[]; // 断言
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