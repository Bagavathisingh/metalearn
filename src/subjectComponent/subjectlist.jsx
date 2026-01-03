import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import featuredSubject from '../assets/animation/featured_subject.png';

export default function Subjectlist() {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  const listItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(api + "/get-subjects");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setItem(data);
    } catch (err) {
      console.error("fetch Error :", err);
      setItem([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listItems();
  }, []);

  if (loading)
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center gap-6 animate-pulse">
        <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin"></div>
        <p className="text-xl font-heading font-bold text-slate-400">Loading Subjects...</p>
      </div>
    );

  return (
    <div className="animate-fade-in space-y-16">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-indigo-500" />
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Subject Section</p>
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-none">
          SUBJECT <span className="text-indigo-400">ARCHIVE</span>
        </h1>
      </div>

      {/* Featured Subject Hero: Legacy Archive */}
      <section
        className="relative group overflow-hidden rounded-[3rem] bg-indigo-500/5 border border-indigo-500/20 p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 cursor-pointer hover:bg-indigo-500/10 hover:border-indigo-500/40 transition-all duration-700 active:scale-[0.99]"
        onClick={() => navigate("/home/subject/Subjectdata/featured_logic")}
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 font-mono text-[8px] uppercase tracking-widest text-indigo-400">Featured_Static_Archive</div>

        {/* Visual Side */}
        <div className="lg:w-1/2 flex justify-center relative group-hover:scale-105 transition-transform duration-700">
          <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full scale-110 pointer-events-none" />
          <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={featuredSubject}
              alt="Advanced Logic"
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/60 to-transparent" />
          </div>
        </div>

        {/* Content Side */}
        <div className="lg:w-1/2 relative z-10 space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Legacy_System_Active</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight uppercase tracking-tighter">
              ADVANCED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">LOGIC_ARCHIVE</span>
            </h2>
            <p className="text-slate-500 font-main text-lg leading-relaxed max-w-lg">
              Access the core behavioral logs and architectural frameworks of meta-structural software environments.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <button className="px-10 py-4 bg-white text-slate-950 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-white/5 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              Sync_Matrix
            </button>
            <div className="px-4 py-2 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              Nodes: 1_SECURE_LINK
            </div>
          </div>
        </div>
      </section>

      {/* Logic Pulse Ticker */}
      <div className="flex items-center gap-6 px-4 py-2 border-y border-white/5 overflow-hidden">
        <div className="whitespace-nowrap animate-infinite-scroll flex gap-12 text-[10px] font-mono text-indigo-400/30 uppercase tracking-[0.5em]">
          <span>Accessing_Subject_Database</span>
          <span>Parsing_Dossier_Nodes</span>
          <span>Structural_Parity_Check_OK</span>
          <span>Meta_Core_Responding</span>
          <span>Decrypting_Materials_v2.0</span>
        </div>
      </div>

      {/* Subject Grid Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {item.map((list, index) => (
          <div
            key={list._id || index}
            className="group relative flex flex-col p-6 lg:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 overflow-hidden cursor-pointer"
            onClick={() => navigate("/home/subject/Subjectdata/" + list._id)}
          >
            {/* Header / ID Row */}
            <div className="flex justify-between items-start mb-6">
              <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[8px] font-black uppercase tracking-widest">
                Module_0{index + 1}
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Image Matrix */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden relative border border-white/5 shadow-2xl mb-6">
              <img
                src={`${api}${list.subImageUrl}`}
                alt={list.subjectTitle}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-60"></div>
            </div>

            {/* Content Dossier */}
            <div className="space-y-4 flex-1">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Structural_Node</p>
                <h3 className="text-xl font-heading font-black text-white group-hover:text-indigo-400 transition-colors leading-tight truncate">
                  {list.subjectTopic}
                </h3>
              </div>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-main break-words">
                {list.subjectDescription}
              </p>
            </div>

            {/* Footer Row */}
            <div className="pt-8 flex justify-between items-center mt-auto border-t border-white/5">
              <span className="text-white font-black uppercase text-[8px] tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">Initialize_Protocol →</span>
              <div className="flex -space-x-2">
                {[1, 2].map(i => (
                  <div key={i} className="w-6 h-6 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-[6px] font-black text-white/20 uppercase">
                    P{i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>


      {item.length === 0 && (
        <div className="glass-card p-12 text-center rounded-3xl">
          <p className="text-slate-400">No subjects found at the moment.</p>
        </div>
      )}
    </div>
  );
}

