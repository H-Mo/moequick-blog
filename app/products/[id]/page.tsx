import {getProducts, getProductById} from "@/lib/products";
import Link from 'next/link';

/**
 * SSG 构建时生成所有产品页面
 * @returns 产品ID列表
 */
export async function generateStaticParams(){
  const products = await getProducts();
  return products.map((p) => ({id: String(p.id)}));
}

/**
 * 产品详情页面
 * @param param0 URL路径传递过来的产品ID
 * @returns 产品详情页面 JSX
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  // 通过ID查询具体的产品详情
  const product = await getProductById(Number(id));
  // 如果该ID不存在
  if(!product){
    return <p className="p-8">产品不存在</p>;
  }
  // 如果ID存在
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-600 mt-4">{product.description}</p>
      <div className="mt-6 space-y-2 text-sm">
        <p>技术栈：{product.tech_stack ?? "未标注"}</p>
        {product.link && (
          <a href={product.link} className="text-blue-500 underline">
            访问项目
          </a>
        )}
      </div>
      <Link href="/" className="inline-block mt-8 text-gray-500">← 返回</Link>
    </main>
  );
}