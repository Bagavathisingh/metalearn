import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { useState, useEffect } from "react";
import VisibleOn from '../assets/VisibleOn.svg'
import VisibleOff from '../assets/VisibleOff.svg'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNotification } from "./Notification";

export default function Login() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [passShow, setpassShow] = useState(true);
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();
    const notify = useNotification();

    const dont_haveAcc = () => {
        Navigate('/signUp', { replace: true });
    }

    const loginhandle = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, username, password);
            notify("Login successful! Welcome back.", "success");
            Navigate('/home', { replace: true });
        } catch (error) {
            notify(error.message, "error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                Navigate("/home", { replace: true });
            }
        });
        return () => unsubscribe();
    }, [Navigate]);

    return (
        <div className="login-container min-h-screen w-full flex items-center justify-center p-6 lg:p-12 overflow-hidden">
            <div className="login-blob blob-1" />
            <div className="login-blob blob-2" />

            {/* Unique Floating Island Layout */}
            <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-stretch gap-0 bg-transparent rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-in group">

                {/* Left Side: Brand Visual */}
                <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 to-violet-700 p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="grid grid-cols-10 gap-2 p-4">
                            {[...Array(50)].map((_, i) => (
                                <div key={i} className="w-1 h-1 bg-white rounded-full" />
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-white/60 font-bold tracking-[0.3em] uppercase text-xs mb-4">Foundation 01</h2>
                        <h1 className="text-5xl lg:text-7xl font-heading font-black text-white leading-none tracking-tighter">
                            META <br /> LEARN
                        </h1>
                    </div>

                    <div className="relative z-10 mt-12">
                        <p className="text-indigo-100/80 text-lg leading-relaxed font-main max-w-sm">
                            Access a universe of knowledge. Your personalized learning trajectory starts now.
                        </p>
                    </div>

                    <div className="relative z-10 pt-12">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-indigo-600 bg-indigo-400 overflow-hidden shadow-lg">
                                    <div className="w-full h-full bg-indigo-500/50" />
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-4 border-indigo-600 bg-white/10 flex items-center justify-center text-white text-xs font-bold backdrop-blur-md">
                                +1k
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Identity Interface */}
                <div className="lg:w-1/2 bg-slate-950/40 backdrop-blur-[40px] p-12 flex flex-col justify-center border-l border-white/5">
                    <div className="max-w-md mx-auto w-full space-y-10">
                        <div className="space-y-1">
                            <h3 className="text-3xl font-heading font-extrabold text-white tracking-tight">Identity Verification</h3>
                            <p className="text-slate-500 font-main">Secure entry to the Meta Learn ecosystem.</p>
                        </div>

                        <form className="space-y-6" onSubmit={loginhandle}>
                            <div className="space-y-2 group">
                                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1 transition-all group-focus-within:text-violet-400">Account Mail</label>
                                <input
                                    required
                                    onChange={(e) => setusername(e.target.value)}
                                    className="w-full bg-white/[0.03] border-b-2 border-white/10 p-4 text-white outline-none focus:border-indigo-500 focus:bg-white/[0.06] transition-all rounded-t-xl"
                                    type="email"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="space-y-2 group relative">
                                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1 transition-all group-focus-within:text-violet-400">Access Key</label>
                                <div className="relative">
                                    <input
                                        required
                                        onChange={(e) => setpassword(e.target.value)}
                                        className="w-full bg-white/[0.03] border-b-2 border-white/10 p-4 text-white outline-none focus:border-indigo-500 focus:bg-white/[0.06] transition-all rounded-t-xl pr-12"
                                        type={passShow ? "password" : "text"}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setpassShow(!passShow)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/5 rounded-lg"
                                    >
                                        <img src={passShow ? VisibleOn : VisibleOff} className="w-5 h-5 opacity-40 invert" alt="toggle" />
                                    </button>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full group/btn relative overflow-hidden bg-white text-slate-950 py-5 rounded-2xl font-black uppercase text-sm tracking-widest transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] disabled:opacity-50 flex items-center justify-center"
                                >
                                    <span className="relative z-10 group-hover/btn:text-white transition-colors">{loading ? "Synchronizing..." : "Initialize Access"}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                </button>
                            </div>

                            <div className="text-center pt-8 border-t border-white/5">
                                <p className="text-slate-500 text-sm">
                                    New probe?{" "}
                                    <span
                                        onClick={dont_haveAcc}
                                        className="text-white hover:text-indigo-400 cursor-pointer font-black transition-colors"
                                    >
                                        GENERATE IDENTITY
                                    </span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

