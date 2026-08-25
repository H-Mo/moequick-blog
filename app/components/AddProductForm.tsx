"use client";

import { useState } from "react";

export default function AddProductForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    tech_stack: "",
    link: "",
  });
  const [status, setStatus] = useState("");
  // 处理输入变化
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // 阻止页面刷新
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(`创建成功 (id: ${data.id})`);
        setForm({ name: "", description: "", tech_stack: "", link: "" });
      } else {
        setStatus(`${data.error}`);
      }
    } catch (err) {
      setStatus("请求失败");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold">新增产品</h2>
      <input
        name="name"
        placeholder="产品名 *"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="description"
        placeholder="简介"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="tech_stack"
        placeholder="技术栈"
        value={form.tech_stack}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="link"
        placeholder="项目链接"
        value={form.link}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        提交
      </button>
      {status && <p className="text-sm">{status}</p>}
    </form>
  );
}