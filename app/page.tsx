export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-emerald-50 flex items-center justify-center p-8 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        <div className="mb-16">
          {/* Logo/Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-3xl mb-8 shadow-lg shadow-blue-400/30">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>

          <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-700 to-emerald-700 bg-clip-text text-transparent mb-6 tracking-tight">
            疗愈助手
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
            在这里，你可以安心地说出心里话
            <br />
            <span className="text-blue-600 font-medium">我会陪你一起，慢慢变好</span>
          </p>
        </div>

        <a
          href="/chat"
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-10 py-5 rounded-2xl hover:shadow-2xl hover:shadow-blue-400/40 transition-all duration-500 text-lg font-semibold hover:scale-105"
        >
          开始对话
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>

        <p className="mt-8 text-sm text-gray-400">
          已有 <span className="text-emerald-600 font-semibold">1,234</span> 人找到了内心的平静
        </p>
      </div>
    </div>
  );
}
