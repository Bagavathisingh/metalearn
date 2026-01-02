import { useNavigate } from "react-router-dom";
import { Adminauth } from "../../AdminFireBaseConfig";
import { useState, useEffect } from "react";
import eyeOff from "../assets/VisibleOff.svg";
import eyeOn from "../assets/VisibleOn.svg";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNotification } from "../components/Notification";

export default function AdminLoginPage() {
  const [eye, seteye] = useState(false);
  const AdminKey = import.meta.env.VITE_ADMIN_KEY;
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [securityKey, setSecurityKey] = useState("");
  const Navigate = useNavigate();
  const notify = useNotification();

  const handleEye = (e) => {
    e.preventDefault();
    seteye(!eye);
  };

  const Adminloginhandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(Adminauth, username, password);
      // Success will trigger the onAuthStateChanged effect
    } catch (error) {
      notify("Authorization failed: " + error.message, "error");
      setLoading(false);
    }
  };

  const verifyKey = (e) => {
    e.preventDefault();
    if (securityKey === AdminKey) {
      notify("Master Access Granted.", "success");
      Navigate("/adminhome", { replace: true });
    } else {
      notify("Access Denied: Invalid Key Identifier.", "error");
      setShowKeyModal(false);
      setSecurityKey("");
      Adminauth.signOut();
      Navigate('/home');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Adminauth, (user) => {
      if (user) {
        setShowKeyModal(true);
      }
    });
    return () => unsubscribe();
  }, [AdminKey, notify]);

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-6 lg:p-12 overflow-hidden font-mono text-emerald-500">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#4ade80 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <div className="relative z-10 w-full max-w-2xl admin-terminal p-8 md:p-12 rounded-lg border-2 border-emerald-500/30 overflow-hidden box-shadow-[0_0_50px_rgba(16,185,129,0.1)]">

        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <div className="text-[10px] uppercase tracking-widest opacity-50">Secure Shell V.4.0.1</div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs opacity-70">
              <span className="text-white">root@metalearn:~#</span>
              <span className="animate-pulse">_</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter text-white">ADMINISTRATOR_LOGIN</h1>
          </div>

          <form className="space-y-10" onSubmit={Adminloginhandle}>
            <div className="space-y-4">
              <div className="group space-y-2">
                <label className="text-[10px] uppercase font-black text-emerald-400 tracking-[0.2em]">User Identifier</label>
                <div className="flex items-center gap-3">
                  <span className="opacity-40 text-sm">{'>'}</span>
                  <input
                    required
                    type="email"
                    placeholder="INPUT_ID"
                    className="w-full bg-transparent border-b border-emerald-500/20 py-2 focus:border-emerald-500 transition-colors uppercase placeholder:opacity-20"
                    onChange={(e) => setusername(e.target.value)}
                    value={username}
                  />
                </div>
              </div>

              <div className="group space-y-2 relative">
                <label className="text-[10px] uppercase font-black text-emerald-400 tracking-[0.2em]">Encrypted_Key</label>
                <div className="flex items-center gap-3">
                  <span className="opacity-40 text-sm">{'>'}</span>
                  <div className="relative w-full">
                    <input
                      required
                      type={eye ? "text" : "password"}
                      placeholder="INPUT_KEY"
                      className="w-full bg-transparent border-b border-emerald-500/20 py-2 focus:border-emerald-500 transition-colors placeholder:opacity-20"
                      onChange={(e) => setpassword(e.target.value)}
                      value={password}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
                      onClick={handleEye}
                    >
                      <img src={eye ? eyeOff : eyeOn} className="w-4 h-4 invert" alt="toggle" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 text-black py-4 font-black uppercase text-xs tracking-[0.3em] hover:bg-emerald-400 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? "RUNNING_AUTH..." : "EXECUTE_AUTHORIZATION"}
              </button>
            </div>
          </form>

          <div className="pt-8 border-t border-emerald-500/10 flex justify-between items-center text-[10px] opacity-40 uppercase tracking-widest">
            <div>Status: STANDBY</div>
            <div className="flex gap-4">
              <span>LOG_09X</span>
              <span>S_NODE_01</span>
            </div>
          </div>
        </div>
      </div>

      {/* Master Security Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="admin-terminal w-full max-w-md p-8 border-2 border-emerald-500 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 animate-pulse">CRITICAL_AUTH</div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-red-500 font-bold uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  Elevated Privileges Required
                </div>
                <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Master_Security_Key</h2>
              </div>

              <form onSubmit={verifyKey} className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[8px] text-emerald-400/50 uppercase tracking-[0.5em]">Input_Access_Code</p>
                  <input
                    autoFocus
                    required
                    type="password"
                    placeholder="••••••••"
                    value={securityKey}
                    onChange={(e) => setSecurityKey(e.target.value)}
                    className="w-full bg-black/50 border border-emerald-500/30 p-4 text-emerald-400 outline-none focus:border-emerald-500 transition-all font-mono tracking-[0.5em]"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 text-black py-4 font-black uppercase text-[10px] tracking-widest hover:bg-emerald-400 transition-all"
                  >
                    Verify_Protocol
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      Adminauth.signOut();
                      setShowKeyModal(false);
                      setSecurityKey("");
                      Navigate('/home');
                    }}
                    className="w-full border border-zinc-800 text-zinc-500 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-red-500/10 hover:text-red-500 transition-all"
                  >
                    Abort_Authorization
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
