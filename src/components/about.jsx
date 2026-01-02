import Photo from "../assets/batman.jpg";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, Timestamp, addDoc } from "firebase/firestore";
import git from '.././assets/animation/pngwing.com (2).png'
import linkedIn from '.././assets/animation/pngwing.com (3).png'
import insta from '.././assets/animation/pngwing.com (1).png'
import { useNotification } from "./Notification";

export default function About() {
  const [feedback, setfeedback] = useState("");
  const [name, setname] = useState("");
  const [dept, setdept] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const notify = useNotification();

  const handlefeedback = async (e) => {
    e.preventDefault();
    if (!name.trim() || !dept.trim() || !feedback.trim()) {
      notify("Please fill in all fields.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "feedback"), {
        Name: name,
        Dept: dept,
        Feedback: feedback,
        CreatedAt: Timestamp.now(),
      });
      notify("Feedback logged in the vault.", "success");
      setfeedback("");
      setname("");
      setdept("");
    } catch (error) {
      notify("Transmission failed: " + error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-20">
      {/* Profile Section: Dossier 01 */}
      <section className="relative flex flex-col md:flex-row items-stretch gap-0 rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.02]">
        {/* Dossier Image Side */}
        <div className="md:w-1/3 bg-indigo-600/10 relative p-8 flex flex-col items-center justify-center border-r border-white/5 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <div className="relative z-10 w-48 h-64 rounded-2xl overflow-hidden border border-white/10 group">
            <img
              src={Photo}
              alt="Founder"
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
          </div>
          <div className="mt-8 text-center space-y-1">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Developer_ID</p>
            <p className="text-white font-mono text-sm">#BAGAVATHI-SINGH-01</p>
          </div>
        </div>

        {/* Dossier Info Side */}
        <div className="flex-1 p-10 md:p-16 space-y-8 flex flex-col justify-center">
          <div className="space-y-2">
            <h1 className="text-5xl font-heading font-black text-white tracking-tighter uppercase">
              Bagavathi<span className="text-indigo-400">Singh</span>
            </h1>
            <p className="text-slate-500 font-main font-bold tracking-widest uppercase text-xs">Architect of the Meta-Ecosystem</p>
          </div>

          <div className="space-y-4 text-slate-400 leading-relaxed font-main max-w-xl text-lg">
            <p>
              I build digital bridges. <strong className="text-white">Meta Learn</strong> is my vision of a centralized knowledge repository where information is no longer scattered, but synthesized.
            </p>
            <p className="text-sm opacity-60">
              Specializing in full-stack architecture, I focus on building high-performance systems that empower students with seamless access to research and academic archives.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <a href="https://github.com/Bagavathisingh" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all">
              <img src={git} alt="GitHub" className="w-6 h-6 invert opacity-50" />
            </a>
            <a href='https://www.linkedin.com/in/bagavathi-singh' target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all">
              <img src={linkedIn} alt="LinkedIn" className="w-5 h-5 invert opacity-50" />
            </a>
            <a href='https://www.instagram.com/bugzx___/' target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all">
              <img src={insta} alt="Instagram" className="w-5 h-5 invert opacity-50" />
            </a>
          </div>
        </div>
      </section>

      {/* Global Feedback: Transmission Protocol */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 p-8">
          <div className="w-12 h-[1px] bg-indigo-500" />
          <h2 className="text-4xl font-heading font-black text-white uppercase tracking-tighter">Transmission_Log</h2>
          <p className="text-slate-500 font-main text-lg leading-relaxed">
            Every feedback is a data point for evolution. Contribute your perspective to help us optimize the platform.
          </p>
        </div>

        <form onSubmit={handlefeedback} className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 font-mono text-[8px] leading-tight pointer-events-none">
            ENCRYPTING_FEEDBACK_CHANNEL...<br />
            BUFFER_STATUS: STABLE<br />
            TRANS_LAYER: TLS_1.3
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 group/input">
              <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1 transition-all group-focus-within/input:text-white">Name</label>
              <input
                required
                type="text"
                placeholder="John Doe"
                value={name}
                className="w-full bg-white/[0.03] border-b border-white/10 p-4 text-white outline-none focus:border-indigo-500 focus:bg-white/[0.06] transition-all rounded-t-xl"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="space-y-2 group/input">
              <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1 transition-all group-focus-within/input:text-white">Department_ID</label>
              <input
                required
                type="text"
                placeholder="CSE / IT"
                value={dept}
                className="w-full bg-white/[0.03] border-b border-white/10 p-4 text-white outline-none focus:border-indigo-500 focus:bg-white/[0.06] transition-all rounded-t-xl"
                onChange={(e) => setdept(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 group/input">
            <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1 transition-all group-focus-within/input:text-white">Message_Payload</label>
            <textarea
              required
              rows="4"
              placeholder="Input your feedback..."
              value={feedback}
              onChange={(e) => setfeedback(e.target.value)}
              className="w-full bg-white/[0.03] border-b border-white/10 p-4 text-white outline-none focus:border-indigo-500 focus:bg-white/[0.06] transition-all rounded-t-xl resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-white text-slate-950 font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:bg-indigo-500 hover:text-white transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "TRANSMITTING..." : "EXECUTE_LOG"}
          </button>
        </form>
      </section>
    </div>
  );
}


