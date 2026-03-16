import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, User, Settings, Database, 
  Terminal, Power, Edit3, Cpu, Server
} from "lucide-react";

export default function MainDashboard() {
  const { data: session, status } = useSession();
  const [nick, setNick] = useState("");
  const [syncing, setSyncing] = useState(false);

  if (status === "loading") return null;
  if (!session) return null;

  const syncIdentity = async () => {
    if (!nick) return;
    setSyncing(true);
    const res = await fetch('/api/discord/update-nick', {
      method: 'POST',
      body: JSON.stringify({ uid: session.user.id, newNick: nick })
    });
    setSyncing(false);
    if (res.ok) alert("LOG: Identity Synced Successfully.");
    else alert("ERR: Authorization Failed. Check Bot Role Priority.");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans">
      {/* SIDEBAR */}
      <aside className="w-20 md:w-64 border-r border-white/5 flex flex-col">
        <div className="p-8 font-black text-xl italic tracking-tighter text-blue-600">EMPIRE</div>
        <nav className="flex-1 px-4 space-y-2">
          {[
            { n: 'Dashboard', i: LayoutDashboard, a: true },
            { n: 'Identity', i: User, a: false },
            { n: 'Core Files', i: Database, a: false },
            { n: 'System Logs', i: Terminal, a: false },
          ].map((item) => (
            <div key={item.n} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition ${item.a ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-white/5 text-gray-500'}`}>
              <item.i size={20} />
              <span className="hidden md:block font-bold text-xs uppercase tracking-widest">{item.n}</span>
            </div>
          ))}
        </nav>
        <button onClick={() => signOut()} className="m-4 p-4 text-red-500 hover:bg-red-500/10 rounded-xl transition flex items-center gap-4 uppercase font-bold text-[10px] tracking-widest">
          <Power size={20} /> <span className="hidden md:block">Shutdown</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">System Online: Guild_1459892256986370224</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold italic">{session.user.name}</span>
            <img src={session.user.image} className="w-8 h-8 rounded-lg border border-white/10" />
          </div>
        </header>

        <section className="p-10 grid lg:grid-cols-3 gap-8">
          {/* USER INFO PANEL */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="lg:col-span-1 bg-white/[0.02] border border-white/5 p-8 rounded-[32px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
              <Cpu size={100} />
            </div>
            <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] mb-8 italic">Citizen Credentials</h3>
            <img src={session.user.image} className="w-24 h-24 rounded-3xl mb-6 shadow-2xl" />
            <h2 className="text-3xl font-black italic mb-2 tracking-tighter uppercase">{session.user.name}</h2>
            <p className="text-xs font-mono text-gray-500">AUTH_ID: {session.user.id}</p>
          </motion.div>

          {/* IDENTITY CONTROL PANEL */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-white/[0.02] border border-white/5 p-8 rounded-[32px]">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500">
                <Edit3 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase">Nickname Synchronizer</h4>
                <p className="text-[10px] text-gray-500 uppercase">Write access to Guild_1459892256986370224</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <input 
                  onChange={(e) => setNick(e.target.value)}
                  type="text" 
                  placeholder="Enter New Server Alias..." 
                  className="w-full bg-black border border-white/10 p-6 rounded-2xl outline-none focus:border-blue-600 transition-all font-mono text-sm"
                />
              </div>
              <button 
                onClick={syncIdentity}
                disabled={syncing}
                className="w-full bg-blue-600 hover:bg-blue-500 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.4em] transition-all disabled:opacity-50"
              >
                {syncing ? "Executing Command..." : "Push Identity Update"}
              </button>
            </div>
          </motion.div>

          {/* SYSTEM STATS */}
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-6">
            {[
              { label: 'Network Latency', val: '14ms', icon: Server },
              { label: 'Bot Status', val: 'Active', icon: Settings },
              { label: 'Citizen Rank', val: 'Verified', icon: ShieldAlert },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-lg font-black italic">{stat.val}</p>
                </div>
                <stat.icon size={20} className="text-blue-900" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
