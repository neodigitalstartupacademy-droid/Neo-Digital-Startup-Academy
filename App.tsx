
import React, { useState, useEffect } from 'react';
import { SYSTEM_CONFIG, I18N } from './constants';
import { AssistantJose } from './components/AssistantJose';
import { AcademyView } from './components/AcademyView';
import { SocialSync } from './components/SocialSync';
import { FinanceView } from './components/FinanceView';
import { AdminMonitor } from './components/AdminMonitor';
import { LeadChart } from './components/LeadChart';
// Fix: Removed TabType from types import as it is defined locally below
import { Language } from './types'; 
import { 
  LayoutDashboard, Bot, GraduationCap, Share2, Wallet, Menu,
  Zap, Settings, Layers, Cpu, Rocket, Brain, Sparkles
} from 'lucide-react';

type TabType = 'stats' | 'jose' | 'academy' | 'social' | 'finance' | 'admin';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('stats');
  const [lang, setLang] = useState<Language>('fr');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBoosting, setIsBoosting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const t = I18N[lang];

  useEffect(() => {
    const savedLang = localStorage.getItem('ndsa_lang') as Language;
    if (savedLang) setLang(savedLang);
  }, []);

  const switchLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('ndsa_lang', newLang);
  };

  const myReferralLink = `${window.location.origin}${window.location.pathname}#ref=${SYSTEM_CONFIG.founder.id}`;

  return (
    <div className="min-h-screen flex font-sans antialiased text-white selection:bg-[#00d4ff] selection:text-slate-950" style={{ background: SYSTEM_CONFIG.ui.backgroundGradient }}>
      <aside className={`fixed inset-y-0 left-0 w-80 bg-slate-950/90 backdrop-blur-3xl z-50 transition-transform lg:translate-x-0 lg:static border-r border-white/5 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-[0_0_30px_rgba(0,212,255,0.4)] border border-[#00d4ff]/40 bg-slate-900 overflow-hidden relative group">
              <div className="absolute inset-0 bg-[#00d4ff]/10 group-hover:bg-[#00d4ff]/20 transition-all"></div>
              <Layers size={28} className="text-[#00d4ff] relative z-10" />
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tighter uppercase italic">{SYSTEM_CONFIG.brand}</h1>
              <p className="text-[10px] text-[#00d4ff] font-black tracking-[0.3em] uppercase mt-1">Stark Universal OS</p>
            </div>
          </div>

          <nav className="space-y-3 flex-1">
            {[
              { id: 'stats', label: t.dashboard, icon: LayoutDashboard },
              { id: 'jose', label: t.jose, icon: Bot },
              { id: 'academy', label: t.academy, icon: GraduationCap },
              { id: 'social', label: t.social, icon: Share2 },
              { id: 'finance', label: t.finance, icon: Wallet },
              { id: 'admin', label: t.admin, icon: Settings },
            ].map((item) => (
              <button key={item.id} onClick={() => { setActiveTab(item.id as TabType); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl text-[14px] font-black transition-all italic uppercase tracking-tight ${activeTab === item.id ? 'bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30 shadow-2xl' : 'text-slate-500 hover:text-white hover:bg-white/5 border border-transparent'}`}>
                <item.icon size={20} /> {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-28 bg-slate-950/40 backdrop-blur-3xl border-b border-white/5 px-10 flex items-center justify-between">
          <button className="lg:hidden p-4 bg-white/5 border border-white/10 rounded-2xl" onClick={() => setIsSidebarOpen(true)}><Menu size={24} /></button>
          
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10">
               {['fr', 'en', 'it', 'es'].map((l) => (
                 <button 
                  key={l}
                  onClick={() => switchLang(l as Language)} 
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${lang === l ? 'bg-[#00d4ff] text-slate-950' : 'text-slate-500 hover:text-white'}`}
                 >
                   {l}
                 </button>
               ))}
            </div>
            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 shadow-inner">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
               <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{t.status_stable}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <button onClick={() => setIsBoosting(true)} className="p-4 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-[#00d4ff] hover:text-slate-950 transition-all shadow-xl"><Zap size={20} /></button>
             <div className="h-14 w-14 rounded-2xl flex items-center justify-center text-slate-950 font-black shadow-[0_0_20px_rgba(0,212,255,0.4)] bg-[#00d4ff] border-2 border-white/20 hover:scale-105 transition-transform cursor-pointer">
              {SYSTEM_CONFIG.founder.id.charAt(0)}
             </div>
          </div>
        </header>

        <div className="p-10 flex-1 overflow-y-auto no-scrollbar pb-32">
          {activeTab === 'stats' && <DashboardContent t={t} stats={{ prospects: 124, salesVolume: 5840, subscriptionMRR: 2150, commissions: 430, conversions: 18, activeAffiliates: 24 }} myReferralLink={myReferralLink} />}
          {activeTab === 'jose' && <AssistantJose language={lang} />}
          {activeTab === 'academy' && <AcademyView />}
          {activeTab === 'social' && <SocialSync />}
          {activeTab === 'finance' && <FinanceView />}
          {activeTab === 'admin' && <AdminMonitor stats={{ totalNetSaaS: 145200, aiEffectiveness: 98.5, orphanLeadsCount: 2450, totalActiveHubs: 42 }} />}
        </div>
      </main>
      
      {isBoosting && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-3xl z-[250] flex items-center justify-center text-white animate-in zoom-in duration-500">
           <div className="text-center space-y-10 p-16 bg-white/5 border border-white/10 rounded-[4rem] shadow-3xl max-w-2xl relative">
              <div className="absolute inset-0 bg-[#00d4ff]/10 blur-[100px] animate-pulse"></div>
              <Cpu size={80} className="text-[#00d4ff] mx-auto animate-spin-slow relative z-10" />
              <div className="space-y-4 relative z-10">
                <h3 className="text-6xl font-black uppercase tracking-[0.3em] italic leading-tight">ULTRA UNIVERSAL SYNC</h3>
                <p className="text-[#00d4ff] font-bold uppercase text-xs tracking-[0.5em] animate-pulse">Synchronizing IT/ES/FR/EN Protocols...</p>
              </div>
              <button onClick={() => setIsBoosting(false)} className="px-16 py-6 bg-white text-slate-950 font-black rounded-2xl relative z-10 shadow-2xl hover:bg-[#00d4ff] transition-all uppercase tracking-widest text-sm">Synchronisation Terminée</button>
           </div>
        </div>
      )}
    </div>
  );
};

const DashboardContent = ({ t, stats, myReferralLink }: any) => (
    <div className="space-y-12 animate-in fade-in duration-1000">
        <div className="text-center md:text-left">
          <h2 className="text-6xl font-black text-white tracking-tighter leading-none italic uppercase">{t.dashboard}</h2>
          <p className="text-slate-500 font-medium text-xl mt-4">Command Center for Global Health Restoration.</p>
        </div>

        <div className="bg-slate-950/40 rounded-[4.5rem] p-12 md:p-20 text-white relative overflow-hidden shadow-3xl border border-white/5 backdrop-blur-3xl group">
           <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-2000"><Sparkles size={400} /></div>
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-20">
              <div className="space-y-10 flex-1">
                 <h3 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] italic uppercase">Universal Smart Link</h3>
                 <p className="text-slate-400 text-2xl font-medium max-w-3xl leading-relaxed italic">
                    Capture leads globally with your Bio-Digital identity.
                 </p>
                 <div className="bg-slate-900/80 border border-white/10 px-10 py-6 rounded-[2rem] font-mono text-[#00d4ff] text-sm truncate shadow-inner">
                    {myReferralLink}
                 </div>
                 <button className="px-16 py-8 bg-[#00d4ff] text-slate-950 font-black rounded-[3rem] uppercase tracking-[0.5em] text-sm shadow-3xl flex items-center gap-6 hover:scale-105 active:scale-95 transition-all">
                    <Rocket size={32} /> {t.propulsion}
                 </button>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
                { label: "Capture Leads", value: stats.prospects, color: "text-[#00d4ff]", icon: Rocket },
                { label: "Volume MLM", value: `${stats.salesVolume} PV`, color: "text-emerald-400", icon: Layers },
                { label: "SaaS Rev", value: `$${stats.commissions}`, color: "text-amber-400", icon: Wallet },
                { label: "AI Conversations", value: stats.conversions, color: "text-rose-400", icon: Brain },
            ].map((stat, i) => (
                <div key={i} className="p-10 rounded-[3.5rem] border border-white/5 bg-slate-950/40 shadow-2xl relative group overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 p-4 opacity-5 group-hover:scale-110 transition-transform"><stat.icon size={100} /></div>
                    <stat.icon size={40} className={`${stat.color} mb-6 relative z-10`} />
                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] italic relative z-10">{stat.label}</p>
                    <h3 className={`text-5xl font-black ${stat.color} mt-4 italic tracking-tighter relative z-10`}>{stat.value}</h3>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LeadChart />
          <div className="bg-slate-950/40 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/5 flex flex-col justify-center">
             <h4 className="text-3xl font-black text-white italic mb-6 uppercase tracking-tight">Bio-Sync Diagnostics</h4>
             <p className="text-slate-400 text-lg leading-relaxed italic">
               The engine is optimized for 98.5% conversion accuracy. Every message from José is a step towards cell restoration.
             </p>
             <div className="flex gap-4 mt-10">
                <div className="px-5 py-3 bg-[#00d4ff]/10 rounded-2xl border border-[#00d4ff]/20 text-[10px] font-black text-[#00d4ff] uppercase tracking-widest italic">Global Scale</div>
                <div className="px-5 py-3 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Encrypted Protocols</div>
             </div>
          </div>
        </div>
    </div>
);

export default App;
