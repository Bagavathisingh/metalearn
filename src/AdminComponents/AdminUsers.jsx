import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [Auth, setAuth] = useState([]);
  const [userLoad, setuserLoad] = useState(true);
  const api = import.meta.env.VITE_URL;

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "feedback"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetch(`${api}/auth-users`)
      .then((res) => res.json())
      .then((data) => {
        setAuth(data);
        setuserLoad(false);
      })
      .catch((err) => {
        console.error(err);
        setuserLoad(false);
      });
  }, [api]);

  if (userLoad)
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center gap-6 animate-pulse">
        <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-cyan-500 animate-spin"></div>
        <p className="text-xl font-heading font-black text-slate-500 uppercase tracking-widest">Scanning Databases...</p>
      </div>
    );

  return (
    <div className="animate-fade-in space-y-12">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

        {/* User Statistics & List */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight">Identity_Registry</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Authenticated Network Users</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 font-mono text-xs">
              COUNT: {Array.isArray(Auth) ? Auth.length : 0}
            </div>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scroll pr-4">
            {Array.isArray(Auth) && Auth.map((user, index) => (
              <div key={index} className="group p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-slate-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors">
                      {user.Email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-black text-white">{user.Email}</p>
                      <p className="text-[10px] text-slate-500 font-mono">UID: {user.id || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-1">
                    <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest">Authorized_On</span>
                    <span className="text-[10px] font-mono text-emerald-500/60">{user.CreatedAt || "GEN-01"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Records */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight">Transmission_Logs</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">User Sentiment & Feedback Data</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-violet-500/5 border border-violet-500/20 text-violet-400 font-mono text-xs">
              LOGS: {Array.isArray(users) ? users.length : 0}
            </div>
          </div>

          <div className="space-y-6 max-h-[600px] overflow-y-auto custom-scroll pr-4">
            {Array.isArray(users) && users.map((user, index) => (
              <div key={index} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 font-mono text-[8px] text-white">REF_{index + 100}</div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 font-black text-xs">
                    {user.Name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-white uppercase tracking-tight">{user.Name}</p>
                    <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{user.Dept}</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-black/40 border border-white/5 italic text-slate-400 text-sm leading-relaxed font-main">
                  "{user.Feedback}"
                </div>

                <div className="flex justify-end pt-2">
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Stored_in_Vault_01</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

