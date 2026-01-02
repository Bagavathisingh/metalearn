import banner from '../assets/animation/clg.png';
import featuredSubject from '../assets/animation/featured_subject.png';
import featuredCourse from '../assets/animation/featured_course.png';
import { useNavigate } from 'react-router-dom';

export default function Test() {
  const navigate = useNavigate();

  return (
    <div className='animate-fade-in space-y-24 mb-20'>
      {/* Hero Section: System Initialization */}
      <section className="relative flex flex-col xl:flex-row items-center justify-between gap-16">
        <div className="flex-1 space-y-10">
          <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-[0.3em] uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Core_Link_Established
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-heading font-black leading-[0.85] tracking-tighter text-white uppercase">
              COGNITIVE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400">EVOLUTION</span>
            </h1>
            <p className="text-slate-400 font-main text-lg md:text-xl max-w-xl leading-relaxed opacity-80">
              Synchronize your neural pathways with the Meta-Learn repository. Access vetted research, historical archives, and advanced modules.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            <button
              onClick={() => navigate('/home/subject')}
              className="group relative px-10 py-5 bg-white text-slate-950 font-black uppercase text-xs tracking-widest rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <span className="relative z-20 group-hover:text-white transition-colors duration-300">Initiate Study</span>
              <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform ease-out duration-300" />
            </button>
            <button
              onClick={() => navigate('/home/course')}
              className="px-8 py-5 border border-white/10 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-white/5 transition-all"
            >
              Scan Archives
            </button>
          </div>

          <div className="pt-10 flex items-center gap-6 border-t border-white/5">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-2xl font-heading font-black text-white leading-none">12.4k</p>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Queries_Processed</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-black text-white leading-none">99.9%</p>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Uptime_Ratio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Terminal Fragment */}
        <div className="flex-1 relative order-first xl:order-last">
          <div className="absolute -inset-20 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative glass-card p-2 rounded-[2.5rem] border-white/5 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              className='w-full h-auto rounded-[2rem] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700'
              src={banner}
              alt="System Visual"
            />
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
          </div>
        </div>
      </section>

      {/* Discovery Nodes: Featured Modules */}
      <section className="space-y-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-heading font-black text-white uppercase tracking-tight">Discovery_Nodes</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Featured Learning Environments</p>
          </div>
          <div className="hidden md:block w-32 h-[1px] bg-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Featured Subject */}
          <div
            onClick={() => navigate('/home/subject')}
            className="group relative overflow-hidden rounded-[3rem] bg-white/[0.02] border border-white/5 cursor-pointer transition-all duration-500 hover:border-indigo-500/30 hover:scale-[1.01]"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img src={featuredSubject} alt="Software Engineering" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
            </div>
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-2xl font-heading font-black text-white uppercase tracking-tighter">Advanced_Logic</h3>
                  <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Subject_Module</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase">Active</div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">Master the architectural frameworks of software systems through deep-dive theoretical modules.</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <span className="text-white font-black uppercase text-xs tracking-[0.4em] translate-y-4 group-hover:translate-y-0 transition-transform">INITIALIZE_NODE →</span>
            </div>
          </div>

          {/* Featured Course */}
          <div
            onClick={() => navigate('/home/course')}
            className="group relative overflow-hidden rounded-[3rem] bg-white/[0.02] border border-white/5 cursor-pointer transition-all duration-500 hover:border-violet-500/30 hover:scale-[1.01]"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img src={featuredCourse} alt="AI & Neural Networks" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
            </div>
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-2xl font-heading font-black text-white uppercase tracking-tighter">Neural_Networks</h3>
                  <p className="text-xs text-violet-400 font-bold uppercase tracking-widest">Course_Asset</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-black uppercase">Live</div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">Explore the synthetic frontiers of artificial intelligence with curated premium video content.</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <span className="text-white font-black uppercase text-xs tracking-[0.4em] translate-y-4 group-hover:translate-y-0 transition-transform">ACCESS_STREAM →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        {[
          { title: "Neuro-Sync", desc: "Adaptive learning algorithms that sync with your pace.", code: "M-01" },
          { title: "Data Matrix", desc: "Structured repository of academic and research modules.", code: "M-02" },
          { title: "Protocol-X", desc: "Encrypted access to internal question vaults.", code: "M-03" },
        ].map((item, i) => (
          <div key={i} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-default">
            <p className="text-[10px] font-black text-indigo-500 mb-4 tracking-[0.4em]">{item.code}</p>
            <h3 className="text-xl font-heading font-black text-white mb-2">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}


