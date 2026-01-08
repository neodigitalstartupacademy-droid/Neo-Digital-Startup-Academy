import React, { useState, useEffect } from 'react';
import { 
    Facebook, Instagram, Twitter, Linkedin, ShieldCheck, Zap, Share2, 
    Check, Link as LinkIcon, Copy, Sparkles, Target, ExternalLink,
    Quote, MessageSquare, Flame, AlertCircle, BarChart3, TrendingUp, Users,
    Terminal, Globe, Fingerprint, Activity
} from 'lucide-react';
import { SYSTEM_CONFIG } from '../constants';

export const SocialSync: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [customId, setCustomId] = useState("");

  // Au chargement, on essaie de récupérer l'ID actuel (celui du fondateur par défaut)
  useEffect(() => {
    const savedId = localStorage.getItem('ndsa_personal_id');
    if (savedId) setCustomId(savedId);
    else setCustomId(SYSTEM_CONFIG.founder.id);
  }, []);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomId(val);
    localStorage.setItem('ndsa_personal_id', val);
  };

  const smartLink = `${window.location.origin}${window.location.pathname}#ref=${customId || SYSTEM_CONFIG.founder.id}`;

  const copySmartLink = () => {
    navigator.clipboard.writeText(smartLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 animate-in fade-in duration-1000">
      {/* Smart Link Master Section */}
      <div className="bg-slate-950/40 backdrop-blur-3xl rounded-[4rem] border border-white/10 p-12 md:p-16 relative overflow-hidden shadow-3xl">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00d4ff]/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded-full text-[11px] font-black text-[#00d4ff] uppercase tracking-[0.3em]">
                <Zap size={16} /> Moteur de Viralité Stark
              </div>
              <h2 className="text-5xl font-black text-white tracking-tighter italic uppercase">Votre Smart Link Élite</h2>
              <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl">
                Générez votre lien de capture bio-numérique. Chaque clic redirige vers Coach José, configuré pour parrainer en votre nom.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
                    <Fingerprint size={12} /> Votre ID NeoLife / NDSA
                  </label>
                  <input 
                    type="text" 
                    value={customId} 
                    onChange={handleIdChange}
                    placeholder="Ex: 067-2922111" 
                    className="w-full bg-white/5 border border-white/10 px-8 py-6 rounded-3xl text-white font-black italic text-lg outline-none focus:border-[#00d4ff] transition-all"
                  />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
                    <Globe size={12} /> Votre Smart Link de Capture
                  </label>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-slate-950/60 border border-white/5 px-8 py-6 rounded-3xl text-[#00d4ff] font-mono text-xs truncate flex items-center shadow-inner">
                      {smartLink}
                    </div>
                    <button 
                      onClick={copySmartLink} 
                      className="p-6 bg-[#00d4ff] text-slate-950 rounded-3xl transition-all shadow-2xl hover:brightness-110 active:scale-90"
                    >
                      {copied ? <Check size={28} /> : <Copy size={28} />}
                    </button>
                  </div>
               </div>
            </div>
          </div>

          <div className="w-full lg:w-96 bg-white/5 rounded-[3rem] p-10 border border-white/10 shadow-2xl">
             <h3 className="text-2xl font-black text-white italic mb-8 flex items-center gap-3 uppercase tracking-tighter"><Target size={28} className="text-[#00d4ff]" /> Protocole Sync</h3>
             <ul className="space-y-6">
                {[
                  "L'invité clique sur votre Smart Link",
                  "José l'accueille sous votre égide",
                  "Analyse bio-cellulaire personnalisée",
                  "Routage boutique vers votre ID : " + (customId || "Par défaut")
                ].map((txt, i) => (
                  <li key={i} className="flex gap-4 text-sm font-bold text-slate-300 leading-relaxed italic">
                    <div className="w-7 h-7 bg-[#00d4ff] text-slate-950 rounded-full flex items-center justify-center text-xs font-black shrink-0 shadow-[0_0_15px_rgba(0,212,255,0.4)]">{i+1}</div>
                    {txt}
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </div>

      {/* Campaign Analytics Section */}
      <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 shadow-xl overflow-hidden relative backdrop-blur-md">
         <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-black text-white tracking-tight flex items-center gap-4 italic uppercase leading-none"><BarChart3 size={32} className="text-[#00d4ff]" /> Performance de Viralité</h3>
              <p className="text-slate-500 text-lg font-medium mt-2">Mesure de l'impact organique de vos partages Social Sync.</p>
            </div>
            <div className="px-6 py-3 bg-[#00d4ff]/10 text-[#00d4ff] rounded-2xl text-[11px] font-black uppercase tracking-widest border border-[#00d4ff]/20 flex items-center gap-2">
              <Activity size={16} className="animate-pulse" /> Live Feedback
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { label: "Portée Totale", value: "14,250", icon: Users, color: "text-[#00d4ff]" },
              { label: "Engagement", value: "8.4%", icon: TrendingUp, color: "text-emerald-400" },
              { label: "Vitesse Virale", value: "MAX", icon: Zap, color: "text-amber-500" }
            ].map((stat, i) => (
              <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-6 hover:bg-white/10 transition-colors group">
                <stat.icon size={32} className={`${stat.color} group-hover:scale-110 transition-transform`} />
                <div>
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.25em] mb-2">{stat.label}</p>
                  <h4 className="text-4xl font-black text-white italic tracking-tighter">{stat.value}</h4>
                </div>
              </div>
            ))}
         </div>
      </div>

      {/* Strategy Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 shadow-3xl space-y-10">
            <h3 className="text-3xl font-black text-white tracking-tight flex items-center gap-4 uppercase italic leading-none"><Flame size={32} className="text-orange-500" /> Guide du Post Viral</h3>
            <div className="bg-[#00d4ff]/5 p-8 rounded-[2.5rem] border-l-8 border-[#00d4ff] space-y-5">
               <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Structure Psychologique Stark</p>
               <p className="text-lg font-bold text-slate-200 leading-relaxed italic">{SYSTEM_CONFIG.socialViral.structure}</p>
            </div>
            <div className="space-y-6">
               <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-4">Template Copier-Coller</p>
               <div className="bg-slate-950 p-10 rounded-[3rem] text-slate-300 text-base italic font-serif leading-relaxed relative overflow-hidden shadow-inner border border-white/5">
                  <Quote size={60} className="absolute -top-6 -left-6 text-[#00d4ff] opacity-10" />
                  "{SYSTEM_CONFIG.socialViral.template}"
               </div>
            </div>
         </div>
         
         <div className="bg-slate-950/60 backdrop-blur-2xl text-white p-12 rounded-[4rem] shadow-3xl space-y-10 relative overflow-hidden border border-white/10">
            <h3 className="text-3xl font-black tracking-tight flex items-center gap-4 uppercase italic leading-none"><MessageSquare size={32} className="text-[#00d4ff]" /> Gestion des Commentaires</h3>
            <p className="text-slate-400 font-medium text-lg leading-relaxed">
              Lorsqu'un prospect commente, ne donnez pas le prix. Utilisez ce script pour l'envoyer vers José.
            </p>
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] font-mono text-sm text-[#00d4ff] leading-relaxed italic shadow-inner">
               {SYSTEM_CONFIG.socialViral.responseScript} <span className="text-white underline">{smartLink}</span>
            </div>
            <div className="bg-[#00d4ff]/10 border border-[#00d4ff]/20 p-8 rounded-3xl flex items-start gap-6">
               <AlertCircle size={28} className="text-[#00d4ff] shrink-0 mt-1" />
               <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider leading-relaxed">
                 Règle d'Or Stark : Toujours rediriger vers José. Il est formé pour créer la valeur avant de parler d'investissement.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};