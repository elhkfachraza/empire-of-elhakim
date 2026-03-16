import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Shield, Zap, LogOut, MessageSquare, Youtube, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function EmpireHome() {
  const { data: session } = useSession();
  const [nick, setNick] = useState("");

  const handleUpdateNick = async () => {
    const res = await fetch('/api/discord/update-nick', {
      method: 'POST',
      body: JSON.stringify({ uid: session.user.id, newNick: nick })
    });
    if (res.ok) alert("Nickname Server Diperbarui!");
    else alert("Gagal! Pastikan Role Bot paling atas.");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500">
      {/* NAVBAR */}
      <nav className="fixed w-full z-[100] backdrop-blur-xl border-b border-white/5 px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-black italic shadow-lg shadow-blue-500/20">E</div>
          <span className="text-xl font-extrabold uppercase italic tracking-tighter">Empire <span className="text-blue-500">Elhakim</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] uppercase font-bold tracking-widest">
          <a href="#about" className="hover:text-blue-400 transition">About</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
          {session ? (
            <button onClick={() => signOut()} className="flex items-center gap-2 text-red-500"><LogOut size={14}/> Logout</button>
          ) : (
            <button onClick={() => signIn('discord')} className="bg-blue-600 px-6 py-2 rounded-full hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition">Login</button>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        <motion.h2 initial={{opacity:0}} animate={{opacity:1}} className="text-blue-500 font-bold tracking-[0.6em] mb-4 uppercase text-xs">Official Empire Network</motion.h2>
        <motion.h1 initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="text-6xl md:text-9xl font-black italic tracking-tighter mb-6">WHERE DREAMS <br/> <span className="text-blue-600 underline decoration-blue-900">CONQUER.</span></motion.h1>
        <p className="text-gray-500 italic max-w-lg mx-auto">Masuk ke dalam ekosistem Empire of Elhakim. Akses eksklusif untuk para Citizens.</p>
        <div className="mt-12">
            {!session && <button onClick={() => signIn('discord')} className="bg-white text-black px-12 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all">Get Started</button>}
        </div>
      </section>

      {/* DASHBOARD AREA (ONLY IF LOGGED IN) */}
      {session && (
        <section className="py-24 px-6 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] text-center shadow-2xl">
              <img src={session.user.image} className="w-24 h-24 rounded-3xl mx-auto mb-6 border-2 border-blue-500 p-1 shadow-blue-500/20 shadow-xl" />
              <h3 className="text-2xl font-black italic tracking-tighter uppercase">{session.user.name}</h3>
              <p className="text-[10px] text-gray-500 font-mono mt-2 tracking-widest">ID: {session.user.id}</p>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white/5 border border-white/10 p-10 rounded-[40px]">
                <h4 className="font-black text-blue-500 text-xs uppercase mb-6 flex items-center gap-2 tracking-widest"><Zap size={14}/> Server Settings</h4>
                <div className="space-y-4">
                  <label className="text-[10px] text-gray-500 font-bold uppercase">Update Your Server Nickname</label>
                  <div className="flex gap-3">
                    <input onChange={(e) => setNick(e.target.value)} type="text" placeholder="Masukkan Nickname Baru..." className="bg-black/40 border border-white/10 p-4 rounded-2xl flex-1 outline-none focus:border-blue-500 transition-all text-sm" />
                    <button onClick={handleUpdateNick} className="bg-blue-600 px-8 rounded-2xl font-black text-[10px] uppercase hover:bg-white hover:text-black transition">Sync</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="py-20 text-center opacity-30 text-[10px] font-bold tracking-[0.4em] uppercase">
        © 2026 Empire of Elhakim | Created by Kaelxx
      </footer>
    </div>
  );
}
