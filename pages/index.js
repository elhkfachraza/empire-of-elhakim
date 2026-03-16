import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Zap, ShieldAlert } from "lucide-react";

export default function EntryGate() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.push("/dashboard");
  }, [status]);

  return (
    <div className="h-screen w-full bg-[#000] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e3a8a_0%,_transparent_70%)] opacity-20"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 text-center"
      >
        <div className="mb-8 flex justify-center">
          <div className="p-4 bg-blue-600/10 border border-blue-500/30 rounded-full animate-pulse shadow-[0_0_50px_rgba(37,99,235,0.2)]">
            <ShieldAlert className="text-blue-500 w-12 h-12" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic text-white mb-2 uppercase">
          Empire <span className="text-blue-600">OS</span>
        </h1>
        <p className="text-blue-400 font-mono text-[10px] tracking-[0.5em] uppercase mb-12">Authorization Required</p>
        
        <button 
          onClick={() => signIn('discord')}
          className="group relative px-10 py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-sm transition-all hover:bg-blue-600 hover:text-white"
        >
          <span className="flex items-center gap-3 italic">
            Initialize Connection <Zap size={14} />
          </span>
          <div className="absolute -inset-1 border border-blue-500/50 -z-10 group-hover:scale-110 transition duration-500"></div>
        </button>
      </motion.div>

      <footer className="absolute bottom-10 text-[8px] font-mono text-gray-700 tracking-[1em] uppercase">
        Connected to Bot 1483021262144933918
      </footer>
    </div>
  );
}
