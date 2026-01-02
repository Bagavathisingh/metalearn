import maintanace from '.././assets/animation/pngwing.com.png'

export default function BackendCourseComponent() {
  return (
    <div className="animate-fade-in space-y-12">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-indigo-500" />
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Section_03</p>
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-none">
          ACADEMY <span className="text-indigo-400">MATRIX</span>
        </h1>
      </div>

      {/* Hero Maintenance Card */}
      <section className="relative group overflow-hidden rounded-[3rem] bg-white/[0.02] border border-white/5 p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full pointer-events-none" />

        <div className="lg:w-1/2 relative z-10 space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight">
              SYNCHRONIZATION <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">IN PROGRESS</span>
            </h2>
            <p className="text-slate-500 font-main text-lg leading-relaxed max-w-lg">
              Our advanced video-based learning modules are currently being deep-synced into the repository. We're finalizing the neural-link protocol for a high-fidelity educational experience.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Compiling Assets</span>
            </div>
            <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Network Stable</span>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center relative">
          <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000" />
          <img
            src={maintanace}
            alt="Coming Soon"
            className="w-full max-w-[320px] md:max-w-[400px] relative z-10 drop-shadow-2xl transition-all duration-700 group-hover:rotate-3 group-hover:scale-105"
          />
          {/* HUD Elements */}
          <div className="absolute -top-4 -right-4 p-4 font-mono text-[8px] text-indigo-400/30 uppercase leading-tight select-none pointer-events-none border border-white/5 bg-slate-950/20 backdrop-blur-md rounded-xl">
            DATA_STREAM: ACTIVE<br />
            PARITY_CHECK: 0.99<br />
            LATENCY: 2.4MS
          </div>
        </div>
      </section>

      {/* Teaser Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-40 grayscale pointer-events-none">
        {[
          { title: "Quantum Computing", type: "Expert" },
          { title: "Neural Networks", type: "Advanced" },
          { title: "Meta Architecture", type: "Core" },
          { title: "System Security", type: "Essential" }
        ].map((mod, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
            <div className="w-full aspect-video bg-white/[0.03] rounded-lg" />
            <div className="space-y-1">
              <p className="text-[8px] font-black text-indigo-500 tracking-widest uppercase">{mod.type}</p>
              <h4 className="text-sm font-black text-white uppercase">{mod.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

