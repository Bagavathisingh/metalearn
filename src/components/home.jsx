import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Menu from "../assets/MenuBar.svg";
import CloseMenu from "../assets/CloseMenu.svg";
import { useNotification } from "./Notification";

export default function Home() {
  const [menu, setmenu] = useState(false);
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
      <div className="relative z-10 w-full h-full max-w-[1600px] flex flex-col lg:flex-row items-stretch bg-slate-950/20 backdrop-blur-[50px] md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5 animate-fade-in">

        {/* Desktop Sidebar: Navigation & Identity */}
        <aside className="hidden lg:flex w-[320px] bg-gradient-to-b from-indigo-600/20 to-transparent p-10 flex-col justify-between border-r border-white/5">
          <div className="space-y-12">
            <div className="cursor-pointer group" onClick={() => goTo("/home")}>
              <h1 className="text-3xl font-heading font-black text-white tracking-tighter transition-transform group-hover:scale-105">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">META</span><br />LEARN
              </h1>
              <div className="w-12 h-1 bg-indigo-500 mt-2 rounded-full transform origin-left transition-all group-hover:w-full" />
            </div>

            <nav>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li
                    key={link.path}
                    onClick={() => goTo(link.path)}
                    className={`group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${location.pathname === link.path
                        ? "bg-white/10 text-white shadow-lg shadow-indigo-500/10"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <span className="text-xl opacity-50 font-mono">{link.icon}</span>
                    <span className="font-bold tracking-wide text-sm">{link.name}</span>
                    {location.pathname === link.path && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-black text-xs">
                  {user?.email?.[0].toUpperCase() || "U"}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-black text-white truncate">{user?.email?.split('@')[0]}</p>
                  <p className="text-[10px] text-slate-500 mt-3 uppercase tracking-widest leading-none">Researcher</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => goTo("/adminlogin")}
                className="w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400 hover:bg-white/5 transition-all text-center"
              >
                Admin Instance
              </button>
              <button
                onClick={logout}
                className="w-full py-4 rounded-xl bg-white/5 text-white text-xs font-black uppercase tracking-widest border border-white/5 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/20 transition-all text-center"
              >
                Terminate Session
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-6 py-5 border-b border-white/5 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50">
          <h1 className="text-xl font-heading font-black text-white tracking-tighter" onClick={() => goTo("/home")}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">META</span> LEARN
          </h1>
          <button className="p-2 hover:bg-white/10 rounded-xl transition-colors" onClick={() => setmenu(!menu)}>
            <img src={menu ? CloseMenu : Menu} className="w-6 h-6 invert opacity-70" alt="menu" />
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {menu && (
          <div className="fixed inset-0 z-40 bg-slate-950 flex flex-col p-8 pt-24 animate-fade-in lg:hidden">
            <ul className="space-y-4 mb-auto">
              {navLinks.map((link) => (
                <li
                  key={link.path}
                  onClick={() => goTo(link.path)}
                  className={`text-3xl font-heading font-black ${location.pathname === link.path ? "text-indigo-400" : "text-white"}`}
                >
                  {link.name}
                </li>
              ))}
            </ul>
            <div className="space-y-4">
              <button onClick={() => goTo("/adminlogin")} className="w-full py-4 text-slate-500 font-bold uppercase tracking-widest text-xs">Admin Access</button>
              <button onClick={logout} className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs">Terminate</button>
            </div>
          </div>
        )}

        {/* Right Content Area: Interface */}
        <main className="flex-1 overflow-y-auto hide-scrollbar bg-slate-950/10 custom-scroll relative">
          {/* Inner Content Grid */}
          <div className="max-w-6xl mx-auto p-6 md:p-12 lg:p-16 min-h-full">
            <Outlet />
          </div>

          {/* Background Subtle Patterns */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-8">
              {[...Array(144)].map((_, i) => (
                <div key={i} className="w-full aspect-square border border-white" />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

