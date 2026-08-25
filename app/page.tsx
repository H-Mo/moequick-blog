import { getProducts } from "@/lib/products";

/**
 * 首页组件，查询并展示产品列表
 * @returns 产品列表页面 JSX
 */
export default async function Home(){
  // 从数据库查产品列表
  const products = await getProducts();
  // 返回构造好的 JSX
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">我的作品</h1>
      <div className="grid gap-4">
        {products.map((p) => (
          <a
            key={p.id}
            href={`/products/${p.id}`}
            className="block p-6 border rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-600 mt-2">{p.description}</p>
            <p className="text-sm text-gray-400 mt-2">{p.tech_stack}</p>
          </a>
        ))}
      </div>
    </main>
  );
}