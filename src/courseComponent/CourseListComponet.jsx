import maintanace from '.././assets/animation/pngwing.com.png'
import featuredCourse from '../assets/animation/featured_course.png';
import { useNavigate } from 'react-router-dom';

export default function BackendCourseComponent() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in space-y-16">
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

      {/* Featured Course: Neural Frontier */}
      <section
        className="relative group overflow-hidden rounded-[3rem] bg-indigo-500/5 border border-indigo-500/20 p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 cursor-pointer hover:bg-indigo-500/10 hover:border-indigo-500/40 transition-all duration-700 active:scale-[0.99]"
        onClick={() => navigate('/home/course/video/featured_ai')}
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 font-mono text-[8px] uppercase tracking-widest text-indigo-400">Premium_Asset_Node</div>

        {/* Fancy Visual Side */}
        <div className="lg:w-1/2 flex justify-center relative group-hover:scale-105 transition-transform duration-700">
          <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full scale-110 pointer-events-none" />
          <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={featuredCourse}
              alt="AI Neural Networks"
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/60 to-transparent" />
          </div>
        </div>

        {/* Content Side */}
        <div className="lg:w-1/2 relative z-10 space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Available_Now</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight uppercase tracking-tighter">
              NEURAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">FRONTIERS</span>
            </h2>
            <p className="text-slate-500 font-main text-lg leading-relaxed max-w-lg">
              Unlock the core mysteries of deep learning and synthetic intelligence through our flagship premium module.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <button className="px-10 py-4 bg-white text-slate-950 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-white/5 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              Execute_Stream
            </button>
            <div className="px-4 py-2 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              Duration: 4.2H_RAW_FEED
            </div>
          </div>
        </div>
      </section>

      {/* Sync Status / Divider */}
      <div className="flex items-center gap-6 px-4 py-2 border-y border-white/5 overflow-hidden">
        <div className="whitespace-nowrap animate-infinite-scroll flex gap-12 text-[10px] font-mono text-indigo-400/30 uppercase tracking-[0.5em]">
          <span>Syncing_Module_A12</span>
          <span>Checking_Stream_Parity</span>
          <span>Allocating_Neural_Resources</span>
          <span>Meta_Link_Stable</span>
          <span>Buffer_Optimized</span>
        </div>
      </div>

      {/* Teaser Modules: Interactive Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Meta Architecture", type: "Core", img: maintanace },
          { title: "Quantum Logic", type: "Advanced", img: maintanace },
          { title: "System Security", type: "Essential", img: maintanace },
          { title: "Cloud Synapse", type: "Network", img: maintanace }
        ].map((mod, i) => (
          <div
            key={i}
            className="group p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6 hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer"
            onClick={() => navigate('/home/course/video/teaser_' + i)}
          >
            <div className="relative w-full aspect-video bg-white/[0.03] rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
              <img src={mod.img} alt={mod.title} className="w-full h-full object-contain p-4 opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-40" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-[8px] font-black text-indigo-500 tracking-[0.4em] uppercase">{mod.type}</p>
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
              </div>
              <h4 className="text-sm font-black text-white uppercase tracking-tight">{mod.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

