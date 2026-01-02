import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "../components/Notification";

export default function AdminHomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotification();

  const goTo = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  useEffect(() => {
    let historyIndex = parseInt(sessionStorage.getItem("navIndex") || "0");
    const handlePopState = () => {
      let newIndex = window.history.state?.idx || 0;
      if (newIndex > historyIndex) {
        notify("Forward navigation Restricted.", "error");
        navigate(-1);
      } else {
        historyIndex = newIndex;
        sessionStorage.setItem("navIndex", historyIndex.toString());
      }
    };
    const currentIndex = window.history.state?.idx || 0;
    sessionStorage.setItem("navIndex", currentIndex.toString());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate, notify]);

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-200 font-main overflow-hidden p-0 md:p-6 lg:p-10">
      {/* Background Data Stream Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:32px_32px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full h-full flex bg-slate-950/50 backdrop-blur-xl border border-white/5 md:rounded-[2.5rem] shadow-2xl overflow-hidden">

        {/* Admin Sidebar: Control Unit */}
        <aside className="hidden lg:flex w-[280px] border-r border-white/5 flex-col p-8 justify-between bg-black/40">
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                  <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-black tracking-tighter text-white uppercase leading-none">Control</h1>
                  <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.2em] mt-0.5">Admin_Module</p>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {[
                { name: 'User_Records', path: '/adminhome', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                { name: 'Subject_Logic', path: '/adminhome/adminsub', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
                { name: 'Course_Assets', path: '/adminhome/admincourse', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' }
              ].map((link) => (
                <button
                  key={link.path}
                  onClick={() => goTo(link.path)}
                  className={`w-full group px-6 py-4 flex items-center gap-4 rounded-2xl transition-all duration-300 ${location.pathname === link.path
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.05)]"
                      : "text-slate-500 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <svg className={`w-5 h-5 transition-transform duration-300 ${location.pathname === link.path ? "scale-110" : "group-hover:scale-110"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                  </svg>
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">{link.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest">
                <span className="text-slate-500">Node_Status</span>
                <span className="text-cyan-400">Stable</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-[84%]" />
              </div>
            </div>
            <button
              onClick={() => navigate('/home')}
              className="w-full py-4 rounded-2xl border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 text-slate-500 hover:text-red-400 text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Exit_Control
            </button>
          </div>
        </aside>

        {/* Main Viewport: Integrated Interface */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Viewport Header */}
          <header className="px-10 py-8 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-cyan-500/80">
                  {location.pathname.split('/').pop()?.replace('admin', '') || 'Dashboard'}
                </h2>
              </div>
              <p className="text-2xl font-heading font-black text-white uppercase tracking-tighter leading-none">
                {location.pathname.includes('sub') ? 'Subject Logic Control' :
                  location.pathname.includes('course') ? 'Course Asset Manager' :
                    'Administrative Overview'}
              </p>
            </div>

            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sync_ID: #772-AD</span>
              <span className="text-lg font-mono text-cyan-400 leading-none mt-1">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto custom-scroll px-10 pb-10">
            <div className="max-w-[1400px]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Footer Status Bar */}
      <div className="hidden lg:flex px-10 pt-4 justify-between items-center opacity-30 pointer-events-none text-[8px] font-black uppercase tracking-widest">
        <div className="flex gap-8">
          <span>Admin_Portal_v0.5.2</span>
          <span>System_UPTIME: 99.9%</span>
        </div>
        <div>Connected to Secure_Mesh_01</div>
      </div>
    </div>
  );
}
