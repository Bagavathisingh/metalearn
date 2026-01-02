import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import vid from '../assets/videoIcon.png';
import doc from '../assets/document.png';
import pap from '../assets/exam.png';

export default function SubjectData({ sentId }) {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    fetch(`${api}/get_subjects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSubject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id, api]);

  if (loading)
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center gap-6 animate-pulse">
        <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin"></div>
        <p className="text-xl font-heading font-bold text-slate-400">Loading Content...</p>
      </div>
    );

  if (!subject)
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center p-8">
        <div className="glass-card p-12 rounded-3xl space-y-4">
          <h1 className="text-7xl font-heading font-black text-indigo-500">404</h1>
          <p className="text-xl text-white font-bold">Subject Not Found</p>
          <p className="text-slate-400 max-w-xs">The requested content could not be located. Please refresh or try again later.</p>
        </div>
      </div>
    );

  const resourceTypes = [
    {
      title: "Materials",
      icon: doc,
      description: `Access full study materials and lecture notes for ${subject.subjectTopic}.`,
      link: subject.MaterialPdf,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Internal Papers",
      icon: pap,
      description: `Check out previous internal question papers and practice sets.`,
      link: subject.QnPdf,
      color: "from-violet-500 to-purple-600"
    },
    {
      title: "Related Videos",
      icon: vid,
      description: `Watch curated video tutorials and lectures related to this subject.`,
      link: subject.VideoUrl,
      color: "from-indigo-500 to-violet-600"
    }
  ];

  return (
    <div className="animate-fade-in space-y-10 py-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl md:text-4xl font-heading font-black text-white">
          Content for <span className="text-indigo-400">{subject.subjectTopic}</span>
        </h2>
        <p className="text-slate-400">Everything you need to master this subject, curated in one place.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {resourceTypes.map((type, idx) => (
          <div key={idx} className="glass-card group flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 rounded-3xl transition-all hover:bg-white/[0.05]">
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${type.color} p-5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
              <img src={type.icon} alt={type.title} className="w-full h-full invert opacity-90" />
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <h3 className="text-2xl font-heading font-bold text-white">{type.title}</h3>
              <p className="text-slate-400 font-main max-w-xl">{type.description}</p>
            </div>

            <div className="w-full md:w-auto self-stretch md:self-center">
              <a
                href={type.link?.startsWith('http') ? type.link : `${api}${type.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full md:w-auto inline-flex items-center justify-center gap-2"
              >
                Access File
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

