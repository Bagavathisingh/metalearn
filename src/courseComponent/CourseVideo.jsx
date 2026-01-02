import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Video() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (id === "featured_ai") {
      setCourse({
        _id: "featured_ai",
        subjectTopic: "NEURAL FRONTIERS: THE AI ARCHIVE",
        videoUrl: "https://www.youtube.com/embed/aircAruvnKk", // Example AI video
      });
      setLoading(false);
      return;
    }

    if (id?.startsWith("teaser_")) {
      setCourse({
        _id: id,
        subjectTopic: id.replace("teaser_", "").split("_").map(w => w.toUpperCase()).join(" ") + " CORE",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Rickroll for fun or any other default
      });
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${api}/subjects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course", err);
        setLoading(false);
      });
  }, [id, api]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center gap-6 animate-pulse">
        <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin"></div>
        <p className="text-xl font-heading font-bold text-slate-400">Mounting Video Stream...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="glass-card p-12 text-center rounded-[2.5rem] space-y-6">
        <h1 className="text-6xl font-heading font-black text-red-500 opacity-20">404</h1>
        <div className="space-y-2">
          <p className="text-white font-black uppercase tracking-widest">Signal Lost</p>
          <p className="text-slate-500">The requested video stream could not be established.</p>
        </div>
        <button onClick={() => navigate(-1)} className="btn-primary">Return to Hub</button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-8">
      {/* Breadcrumb / Top Bar */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-white transition-colors">
            ← Back
          </button>
          <div className="h-4 w-[1px] bg-white/10" />
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{course.subjectTopic || "Video Module"}</p>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-white/20">
          <span>STREAM_HD</span>
          <span>LATENCY: 12MS</span>
        </div>
      </div>

      {/* Main Player Section */}
      <section className="relative group p-1 md:p-2 rounded-[2rem] bg-white/[0.02] border border-white/5 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full scale-150 pointer-events-none" />

        <div className="relative aspect-video w-full rounded-[1.5rem] overflow-hidden border border-white/10 bg-black shadow-2xl">
          <iframe
            className="w-full h-full"
            src={course.videoUrl}
            title="Video Stream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          {/* Scanline / HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </div>
      </section>

      {/* Video Info */}
      <div className="px-4 space-y-4">
        <h1 className="text-3xl font-heading font-black text-white tracking-tight uppercase">
          {course.subjectTopic}
        </h1>
        <div className="flex flex-wrap gap-4">
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Level: Advanced
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Category: Research
          </div>
        </div>
      </div>
    </div>
  );
}

