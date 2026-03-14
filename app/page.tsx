export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F1ED] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-light text-gray-800 mb-6 tracking-wide">
          AI疗愈助手
        </h1>
        <p className="text-gray-500 mb-12 text-sm leading-relaxed">
          帮你疏导焦虑、缓解空虚感
        </p>
        <a
          href="/chat"
          className="inline-block bg-[#A8B5C7] text-white px-10 py-3 rounded-full hover:bg-[#96a3b5] transition-colors text-sm"
        >
          开始对话
        </a>
      </div>
    </div>
  );
}
