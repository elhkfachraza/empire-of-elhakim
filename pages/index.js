import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Shield, Zap, LogOut, User, Activity, Globe, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function EmpireHome() {
  const { data: session } = useSession();
  const [nick, setNick] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateNick = async () => {
    if(!nick) return alert("Masukkan nickname!");
    setLoading(true);
    const res = await fetch('/api/discord/update-nick', {
      method: 'POST',
      body: JSON.stringify({ uid: session.user.id, newNick: nick })
    });
    setLoading(false);
    if (res.ok) alert("✅ Nickname Server Berhasil Disinkronkan!");
    else alert("❌ Gagal! Cek posisi Role Bot di Server.");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      {/* NAVBAR */}
      <nav className="fixed w-full z-[100] backdrop-blur-md border-b border-white/5 px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center font-black italic shadow-lg shadow-blue-500/20">E</div>
          <span className="text-xl font-extrabold uppercase italic tracking-tighter">Empire <span className="text-blue-500 font-black">Elhakim</span></span>
        </div>
        <div>
          {session ? (
            <div className="flex items-center gap-4">
               <img src={session.user.image} className="w-8 h-8 rounded-full border border-blue-500/50" />
               <button onClick={() => signOut()} className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition">Disconnect</button>
            </div>
          ) : (
            <button onClick={() => signIn('discord')} className="bg-blue-600 px-8 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition shadow-lg shadow-blue-600/20">Login with Discord</button>
          )}
        </div>
      </nav>

      {/* HERO / LANDING */}
      {!session ? (
        <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.8}}>
            <h2 className="text-blue-500 font-bold tracking-[0.8em] mb-6 uppercase text-[10px]">Portal Authenticator v1483021262144933918</h2>
            <h1 className="text-7xl md:text-[120px] font-black italic tracking-tighter leading-none mb-8">
              THE <span className="text-blue-600">EMPIRE</span> <br/> LEGACY.
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto mb-12 text-lg font-light leading-relaxed">
              Selamat datang di pusat kendali warga Empire of Elhakim. Hubungkan akun Discord Anda untuk sinkronisasi identitas server secara instan.
            </p>
            <button onClick={() => signIn('discord')} className="group relative bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] overflow-hidden transition-all hover:scale-105">
              <span className="relative z-10 flex items-center gap-3">Mulai Koneksi <Zap size={16} fill="black"/></span>
              <div className="absolute inset-0 bg-blue-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </motion.div>
        </section>
      ) : (
        /* DASHBOARD USER */
        <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="grid lg:grid-cols-3 gap-8">
            
            {/* PROFILE CARD */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] text-center backdrop-blur-sm">
              <div className="relative inline-block mb-6">
                <img src={session.user.image} className="w-32 h-32 rounded-[35px] border-4 border-blue-600 p-1.5 shadow-2xl shadow-blue-500/20" />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-[#020617] flex items-center justify-center">
                  <Activity size={12} className="text-white"/>
                </div>
              </div>
              <h3 className="text-3xl font-black italic tracking-tighter uppercase text-white">{session.user.name}</h3>
              <p className="text-blue-500 font-mono text-[10px] mt-2 font-bold tracking-[0.2em]">CITIZEN VERIFIED</p>
              
              <div className="mt-10 pt-10 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="text-left">
                  <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">User ID</p>
                  <p className="text-xs font-mono text-gray-300">{session.user.id}</p>
                </div>
                <div className="text-left">
                  <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Server ID</p>
                  <p className="text-xs font-mono text-gray-300">1459892256986370224</p>
                </div>
              </div>
            </div>

            {/* CONTROLS */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 p-10 rounded-[40px]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500">
                    <Shield size={24}/>
                  </div>
                  <div>
                    <h4 className="font-black italic text-xl uppercase tracking-tighter text-white">Identity Manager</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.1em]">Ubah Nickname Anda di Server Discord</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="relative group">
                    <input 
                      onChange={(e) => setNick(e.target.value)} 
                      type="text" 
                      className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm font-medium tracking-wide placeholder:text-gray-600" 
                      placeholder="Masukkan nama baru di server..." 
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition">
                      <MessageSquare size={18}/>
                    </div>
                  </div>
                  <button 
                    onClick={handleUpdateNick} 
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-lg shadow-blue-600/20"
                  >
                    {loading ? "Processing Sync..." : "Synchronize Identity"}
                  </button>
                </div>
              </div>

              {/* SERVER STATUS CARD */}
              <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Globe className="text-blue-500" size={32}/>
                  <div>
                    <h4 className="text-sm font-black uppercase italic tracking-widest text-white">Empire Status</h4>
                    <p className="text-[10px] text-green-500 font-bold uppercase tracking-[0.2em] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span> Global Link Active
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Node</p>
                  <p className="text-xs font-mono">IDN-1102</p>
                </div>
              </div>
            </div>

          </motion.div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="py-20 text-center opacity-30 border-t border-white/5 mx-10">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase text-white italic">
          Empire of Elhakim © 2026 | Protocol Secured by Bot 1483021262144933918
        </p>
      </footer>
    </div>
  );
}
