export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-6 sm:p-8 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-20 h-20 mb-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30 animate-fade-in">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>

        {/* 标题区域 */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h1 className="font-serif-display text-6xl sm:text-7xl md:text-8xl font-light text-slate-900 mb-6 leading-[1.1] tracking-tight">
            疗愈助手
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-8"></div>
          <p className="text-xl sm:text-2xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
            在这里，你可以安心地说出心里话
            <br />
            <span className="text-blue-600 font-normal">我会陪你一起，慢慢变好</span>
          </p>
        </div>

        {/* 按钮组 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <a
            href="/login"
            className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-full hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 text-base font-medium hover:scale-105"
          >
            <span>登录 / 注册</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="/chat"
            className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm text-slate-700 px-10 py-4 rounded-full border border-slate-200 hover:border-blue-300 hover:bg-white transition-all duration-300 text-base font-medium"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>开始对话</span>
          </a>
          <a
            href="/emotion"
            className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm text-slate-700 px-10 py-4 rounded-full border border-slate-200 hover:border-blue-300 hover:bg-white transition-all duration-300 text-base font-medium"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>情绪轨迹</span>
          </a>
        </div>

        {/* 特性卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-slate-800 mb-2">隐私保护</h3>
            <p className="text-xs text-slate-500 leading-relaxed">你的对话完全保密</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-slate-800 mb-2">智能建议</h3>
            <p className="text-xs text-slate-500 leading-relaxed">AI 提供个性化方案</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-slate-800 mb-2">即时响应</h3>
            <p className="text-xs text-slate-500 leading-relaxed">随时随地陪伴你</p>
          </div>
        </div>

        {/* 统计信息 */}
        <p className="text-sm text-slate-400 font-light animate-fade-in" style={{ animationDelay: '0.4s' }}>
          已有 <span className="text-blue-600 font-semibold">1,234</span> 人找到了内心的平静
        </p>
      </div>
    </div>
  );
}