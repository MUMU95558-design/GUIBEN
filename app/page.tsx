export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center p-8">
      <div className="text-center max-w-lg">
        <div className="mb-12">
          <h1 className="text-5xl font-light text-[#2C2C2C] mb-6 tracking-tight">
            疗愈助手
          </h1>
          <p className="text-[#8B8B8B] text-base leading-relaxed">
            在这里，你可以安心地说出心里话
            <br />
            我会陪你一起，慢慢变好
          </p>
        </div>
        <a
          href="/chat"
          className="inline-block bg-[#2C2C2C] text-white px-12 py-4 rounded-full hover:bg-[#404040] transition-all duration-300 text-sm font-medium tracking-wide shadow-sm hover:shadow-md"
        >
          开始对话
        </a>
      </div>
    </div>
  );
}
