import { NextRequest, NextResponse } from "next/server";
import { addProduct, getProducts } from "@/lib/products";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("查询产品列表失败:", error);
    return NextResponse.json({ error: "查询失败" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // 获取请求参数
    const body = await request.json();
    // 参数校验 如果 name 没值，或者 name 的类型不是 string
    if(!body?.name || typeof body?.name !== "string"){
      return NextResponse.json(
        { error: "name 不能为空" },
        { status: 400 }
      );
    }
    // 添加产品
    const productID = await addProduct(body);
    // 如果添加失败
    if(productID === -1){
      return NextResponse.json(
        { error: "服务器错误" },
        { status: 500 }
      );
    }
    // 成功返回
    return NextResponse.json(
      { message: "创建成功", id: productID },
      { status: 201 }
    );
  } catch (error) {
    console.error("创建产品列表失败:", error);
    return NextResponse.json(
        { error: "服务器错误" },
        { status: 500 }
      );
  }
}