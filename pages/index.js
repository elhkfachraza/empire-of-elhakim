import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Bot, Shield, MessageSquare, Zap, Youtube, Instagram } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();
  const [nick, setNick] = useState("");

  const updateNick = async () => {
    const res = await fetch('/api/discord/update-nick', {
      method: 'POST',
      body: JSON.stringify({ uid: session.user.id, newNick: nick })
    });
    if (res.ok) alert("Nickname Berhasil Diubah di Server!");
    else alert("Gagal! Pastikan Bot punya role lebih tinggi dari kamu.");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 glass p-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
        <h1 className="text-xl font-black italic tracking-tighter uppercase">Empire <span className="text-blue-500">Elhakim</span></h1>
        <div className="flex gap-6">
           {!session ? (
             <button onClick={() => signIn('discord')} className="bg-blue-600 px-6 py-2 rounded-full font-bold text-xs uppercase">Login</button>
           ) : (
             <button onClick={() => signOut()} className="text-red-500 text-xs font-bold uppercase">Logout</button>
           )}
        </div>
      </nav>

      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-6xl md:text-8xl font-black mb-4 italic tracking-tighter">WHERE DREAMS <span className="text-blue-600">CONQUER</span></h1>
        <p className="text-gray-400 tracking-[0.3em] uppercase text-sm italic">Empire of Elhakim Official</p>
      </section>

      {/* DASHBOARD */}
      {session && (
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <div className="bg-white/5 p-10 rounded-[40px] border border-blue-500/20">
            <div className="flex items-center gap-6 mb-10">
              <img src={session.user.image} className="w-20 h-20 rounded-2xl border-2 border-blue-600" />
              <div>
                <h2 className="text-3xl font-black italic uppercase">{session.user.name}</h2>
                <p className="text-blue-500 font-mono text-xs tracking-widest">BOT ID: 1483021262144933918</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-black/40 p-6 rounded-2xl">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Change Server Nickname</label>
                <div className="flex gap-4 mt-2">
                  <input onChange={(e) => setNick(e.target.value)} type="text" className="bg-white/5 border border-white/10 p-3 rounded-xl flex-1 outline-none focus:border-blue-500" placeholder="New Nickname..." />
                  <button onClick={updateNick} className="bg-blue-600 px-8 rounded-xl font-black text-xs uppercase">Update</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
