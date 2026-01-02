import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="animate-fade-in space-y-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl md:text-4xl font-heading font-black text-white">Explore <span className="text-indigo-400">Subjects</span></h2>
        <p className="text-slate-400">Select a subject to access study materials and resources.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {item.map((list, index) => (
          <div
            key={list._id || index}
            className="group relative flex flex-col md:flex-row gap-8 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500"
          >
            {/* Image Matrix */}
            <div className="w-full md:w-52 h-52 flex-shrink-0 rounded-2xl overflow-hidden relative border border-white/5 shadow-2xl">
              <img
                src={`${api}${list.subImageUrl}`}
                alt={list.subjectTitle}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4">
                <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em]">Node_0{index + 1}</p>
              </div>
            </div>

            {/* Content Dossier */}
            <div className="flex flex-col justify-between flex-1 py-2">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Research_Module</p>
                  <h3 className="text-2xl font-heading font-black text-white group-hover:text-indigo-400 transition-colors leading-tight">
                    {list.subjectTopic}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed font-main">
                  {list.subjectDescription}
                </p>
              </div>

              <div className="pt-8 flex justify-between items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-[8px] font-black text-white/20">
                      {i}
                    </div>
                  ))}
                </div>
                <button
                  className="px-8 py-3 bg-white text-slate-950 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-500 hover:text-white transition-all active:scale-95 shadow-lg shadow-white/5"
                  onClick={() => navigate("Subjectdata/" + list._id)}
                >
                  Sync_Matrix
                </button>
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

