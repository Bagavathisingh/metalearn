import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Menu from "../assets/MenuBar.svg";
import CloseMenu from "../assets/CloseMenu.svg";
import { useNotification } from "./Notification";

export default function Home() {
  const [menu, setmenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const notify = useNotification();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/", { replace: true });
      } else {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const goTo = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
    setmenu(false);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      notify("Logged out successfully", "success");
      navigate("/");
    } catch (error) {
      notify("Logout failed", "error");
    }
  };

  const navLinks = [
    { name: "Terminal", path: "/home", icon: "◈" },
    { name: "Subjects", path: "/home/subject", icon: "⬚" },
    { name: "Courses", path: "/home/course", icon: "⌬" },
    { name: "Founder", path: "/home/about", icon: "◎" },
  ];

  return (
    <div className="login-container h-screen w-full flex items-center justify-center p-0 md:p-4 lg:p-6 overflow-hidden font-main">
      <div className="login-blob blob-1" />
      <div className="login-blob blob-2" />

      {/* Main Application Island */}
      <div className="relative z-10 w-full h-full max-w-[1600px] flex flex-col lg:flex-row items-stretch bg-slate-950/20 backdrop-blur-[50px] md:rounded-[3rem] shadow-2xl overflow-hidden border border-white/5 animate-fade-in transition-all duration-700">

        {/* Desktop Sidebar: Navigation & Identity */}
        <aside
          className={`hidden lg:flex flex-col justify-between border-r border-white/5 bg-gradient-to-b from-indigo-600/10 to-transparent transition-all duration-500 ease-out relative ${sidebarCollapsed ? 'w-[100px] p-6' : 'w-[320px] p-10'}`}
        >
          {/* Fancy Collapse Toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 top-20 z-20 w-6 h-12 bg-indigo-500 rounded-full border border-white/10 flex items-center justify-center text-white text-[10px] transition-transform hover:scale-110 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          >
            {sidebarCollapsed ? "→" : "←"}
          </button>

          <div className="space-y-12">
            <div className={`cursor-pointer group flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-4'}`} onClick={() => goTo("/home")}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
                <span className="text-white font-black text-xs">M</span>
              </div>
              {!sidebarCollapsed && (
                <div className="animate-fade-in">
                  <h1 className="text-xl font-heading font-black text-white tracking-widest leading-none">
                    META<span className="text-indigo-400">LEARN</span>
                  </h1>
                </div>
              )}
            </div>

            <nav>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li
                    key={link.path}
                    onClick={() => goTo(link.path)}
                    className={`group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all relative ${location.pathname === link.path
                      ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                      } ${sidebarCollapsed ? 'justify-center p-4' : ''}`}
                  >
                    <span className={`text-xl transition-all duration-300 ${location.pathname === link.path ? "text-indigo-400 scale-110" : "group-hover:scale-110"} font-mono`}>{link.icon}</span>

                    {/* Fancy Tooltip: Visible only when sidebar is collapsed */}
                    {sidebarCollapsed && (
                      <div className="absolute left-[110%] top-1/2 -translate-y-1/2 px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-x-4 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap z-[100] shadow-[0_0_20px_rgba(99,102,241,0.4)] pointer-events-none">
                        {link.name}
                        {/* Tooltip Arrow */}
                        <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-600 rotate-45" />
                      </div>
                    )}

                    {!sidebarCollapsed && (
                      <span className="font-black uppercase tracking-tighter text-[11px] animate-fade-in">{link.name}</span>
                    )}
                    {location.pathname === link.path && !sidebarCollapsed && (
                      <div className="ml-auto w-1 h-1 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="space-y-6">
            <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/5 transition-all ${sidebarCollapsed ? 'p-2' : 'p-4'}`}>
              <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 font-black text-xs shrink-0 border border-white/10 group hover:border-indigo-500/50 transition-colors">
                  {user?.email?.[0].toUpperCase() || "U"}
                </div>
                {!sidebarCollapsed && (
                  <div className="overflow-hidden animate-fade-in">
                    <p className="text-[10px] font-black text-white truncate uppercase tracking-widest">{user?.email?.split('@')[0]}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Active_Node</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => goTo("/adminlogin")}
                className={`group relative overflow-hidden flex items-center gap-3 py-3 rounded-xl transition-all hover:bg-white/5 ${sidebarCollapsed ? 'justify-center px-0' : 'px-4'}`}
              >
                <span className="text-slate-500 group-hover:text-cyan-400 transition-colors">⚙</span>
                {!sidebarCollapsed && (
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-cyan-400 animate-fade-in">Instance_Control</span>
                )}
              </button>
              <button
                onClick={logout}
                className={`group relative flex items-center gap-3 py-4 rounded-xl bg-red-500/5 border border-red-500/10 transition-all hover:bg-red-500 text-white shadow-lg shadow-red-500/0 hover:shadow-red-500/20 ${sidebarCollapsed ? 'justify-center px-0' : 'px-4'}`}
              >
                <span className="transition-transform group-hover:rotate-90">⎋</span>
                {!sidebarCollapsed && (
                  <span className="text-[10px] font-black uppercase tracking-widest animate-fade-in">Terminate</span>
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-6 py-5 border-b border-white/5 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3" onClick={() => goTo("/home")}>
            <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center"><span className="text-white text-[10px] font-black">M</span></div>
            <h1 className="text-lg font-heading font-black text-white tracking-widest uppercase leading-none">META<span className="text-indigo-400">LEARN</span></h1>
          </div>

          {/* Fancy Mobile Menu Button */}
          <button
            className="group relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 p-2"
            onClick={() => setmenu(!menu)}
          >
            <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${menu ? 'rotate-45 translate-y-[8px] bg-indigo-400' : 'opacity-70 group-hover:opacity-100'}`} />
            <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${menu ? 'opacity-0' : 'opacity-70 group-hover:opacity-100'}`} />
            <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${menu ? '-rotate-45 -translate-y-[8px] bg-indigo-400' : 'opacity-70 group-hover:opacity-100'}`} />
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {menu && (
          <div className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-3xl flex flex-col p-8 pt-32 animate-fade-in lg:hidden">
            <div className="absolute top-0 right-0 p-10 font-mono text-[8px] text-white/5 select-none leading-relaxed uppercase">
              Encryption: Stable<br />
              Protocol: Mobile_v2<br />
              System_Status: Optimal
            </div>

            <ul className="space-y-6 mb-auto">
              {navLinks.map((link) => (
                <li
                  key={link.path}
                  onClick={() => goTo(link.path)}
                  className={`text-5xl font-heading font-black uppercase tracking-tighter flex items-center gap-6 transition-all ${location.pathname === link.path ? "text-indigo-400" : "text-white/40 active:text-white"}`}
                >
                  <span className="text-2xl font-mono text-white/20">{link.icon}</span>
                  {link.name}
                </li>
              ))}
            </ul>
            <div className="space-y-4 pt-10 border-t border-white/5">
              <button
                onClick={() => goTo("/adminlogin")}
                className="w-full py-4 text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] border border-white/5 rounded-2xl"
              >
                Initialize_Admin_Terminal
              </button>
              <button
                onClick={logout}
                className="w-full py-5 bg-indigo-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-lg shadow-indigo-500/20"
              >
                Terminate_Session
              </button>
            </div>
          </div>
        )}

        {/* Right Content Area: Interface */}
        <main className="flex-1 overflow-y-auto hide-scrollbar bg-white/[0.01] relative">
          {/* Inner Content Grid */}
          <div className="max-w-6xl mx-auto p-6 md:p-12 lg:p-16 min-h-full relative z-10">
            <Outlet />
          </div>

          {/* Background Subtle Patterns: Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden select-none">
            <div className="grid grid-cols-12 gap-4 p-8">
              {[...Array(144)].map((_, i) => (
                <div key={i} className="w-full aspect-square border border-white/50" />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


