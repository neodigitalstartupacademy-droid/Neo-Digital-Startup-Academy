
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  PieChart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  ShieldAlert, 
  Cpu, 
  Globe, 
  Briefcase,
  FileText,
  Download,
  AlertCircle,
  Zap,
  ShieldCheck,
  ChevronRight,
  Layers,
  Rocket,
  Brain,
  Award,
  Lock,
  Factory,
  Check,
  Copy,
  UserPlus,
  Mail,
  Share2,
  ExternalLink,
  Target,
  X,
  Plus,
  Palette,
  Eye,
  Trash2,
  Server,
  Database,
  Unlink,
  Settings,
  Crown,
  BookOpen,
  Send,
  Sparkles,
  Info,
  Clock,
  ArrowRight,
  Terminal,
  Activity,
  PlusCircle,
  RotateCw,
  Fingerprint,
  Box,
  CheckCircle2,
  Bot
} from 'lucide-react';
import { SYSTEM_CONFIG } from '../constants';
import { AdminMonitorStats, WhiteLabelInstance } from '../types';

interface AdminMonitorProps {
  stats: AdminMonitorStats;
}

export const AdminMonitor: React.FC<AdminMonitorProps> = ({ stats }) => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [showDiplomacy, setShowDiplomacy] = useState(false);
  const [diplomacyTab, setDiplomacyTab] = useState<'leaders' | 'haute'>('leaders');
  const [showFactory, setShowFactory] = useState(false);
  const [factoryStep, setFactoryStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [sourceHub, setSourceHub] = useState('GMBC-OS-MASTER-V5');

  // White Label Form State
  const [newClient, setNewClient] = useState<Partial<WhiteLabelInstance>>({
    clientName: '',
    industry: 'Santé & Bien-être',
    aiName: 'José',
    currency: 'USD',
    primaryColor: '#00d4ff',
    catalogType: 'neolife',
    logoUrl: '',
    setupFee: 1500,
    royaltyRate: 40,
    isLocked: false
  });

  const [instances, setInstances] = useState<WhiteLabelInstance[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ndsa_white_label_instances');
    if (saved) {
      try {
        setInstances(JSON.parse(saved).map((i: any) => ({ ...i, deploymentDate: new Date(i.deploymentDate) })));
      } catch (e) { console.error("WL Instances load failed"); }
    }
  }, []);

  const saveInstances = (newInstances: WhiteLabelInstance[]) => {
    setInstances(newInstances);
    localStorage.setItem('ndsa_white_label_instances', JSON.stringify(newInstances));
  };

  const handleDeploy = () => {
    if (!newClient.clientName) return;
    setIsDeploying(true);
    setTimeout(() => {
      const instance: WhiteLabelInstance = {
        ...(newClient as WhiteLabelInstance),
        id: `WL-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        deploymentDate: new Date(),
        status: 'ACTIVE'
      };
      saveInstances([instance, ...instances]);
      setIsDeploying(false);
      setFactoryStep(5);
    }, 4500);
  };

  const toggleLock = (id: string) => {
    saveInstances(instances.map(i => i.id === id ? { ...i, isLocked: !i.isLocked, status: !i.isLocked ? 'LOCKED' : 'ACTIVE' } : i));
  };

  const deleteInstance = (id: string) => {
    saveInstances(instances.filter(i => i.id !== id));
  };

  const FactoryModal = () => (
    <div className="fixed inset-0 bg-slate-950/98 backdrop-blur-3xl z-[500] flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500 overflow-y-auto">
      <div className="bg-slate-900 rounded-[4rem] shadow-3xl w-full max-w-4xl overflow-hidden relative border border-[#00d4ff]/20 my-auto">
        <div className="absolute top-0 left-0 w-full h-2 bg-white/5 flex">
          {[1, 2, 3, 4, 5].map(s => (
            <div key={s} className={`flex-1 h-full transition-all duration-700 ${factoryStep >= s ? 'bg-[#00d4ff]' : 'bg-transparent'}`} />
          ))}
        </div>
        
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#00d4ff]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#00d4ff]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <button onClick={() => { setShowFactory(false); setFactoryStep(1); }} className="absolute top-10 right-10 p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-slate-400 hover:text-white z-50 border border-white/5"><X size={24} /></button>
        
        <div className="p-16 relative z-10">
          {factoryStep === 1 && (
            <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-500">
              <div className="flex items-center gap-10">
                <div className="w-24 h-24 bg-[#00d4ff]/10 border border-[#00d4ff]/40 rounded-[2.5rem] flex items-center justify-center text-[#00d4ff] shadow-3xl shadow-[#00d4ff]/20 animate-pulse"><RotateCw size={44} /></div>
                <div>
                  <div className="px-3 py-1 bg-[#00d4ff]/10 rounded-full border border-[#00d4ff]/20 inline-block mb-3">
                    <span className="text-[10px] font-black text-[#00d4ff] uppercase tracking-widest">Protocol Omega-7</span>
                  </div>
                  <h3 className="text-5xl font-black text-white tracking-tighter italic uppercase">Clone Hub Workflow</h3>
                  <p className="text-slate-400 text-lg font-medium mt-1 italic">Duplication d'instance isolée sécurisée.</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
                    <Box size={14} /> Sélection du Hub Source
                  </label>
                  <select 
                    className="w-full px-8 py-6 rounded-[2rem] bg-slate-950 border border-white/10 text-white focus:border-[#00d4ff] outline-none transition-all font-black italic uppercase tracking-tight cursor-pointer appearance-none shadow-inner"
                    value={sourceHub}
                    onChange={(e) => setSourceHub(e.target.value)}
                  >
                    <option value="GMBC-OS-MASTER-V5">GMBC OS MASTER v5.0 (Global)</option>
                    <option value="AFRICA-BIO-SYNC-V2">Africa Bio-Sync v2.1</option>
                    <option value="EURO-EXCELLENCE-V1">Euro Excellence v1.0</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
                      <UserPlus size={14} /> Nom du Nouveau Hub
                    </label>
                    <input type="text" placeholder="Ex: BioTech Elite Hub" className="w-full px-8 py-6 rounded-[2rem] bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-[#00d4ff] outline-none transition-all font-bold placeholder:text-slate-600" value={newClient.clientName} onChange={e => setNewClient({...newClient, clientName: e.target.value})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
                      <Target size={14} /> Industrie Cible
                    </label>
                    <select className="w-full px-8 py-6 rounded-[2rem] bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-[#00d4ff] outline-none transition-all font-bold appearance-none cursor-pointer" value={newClient.industry} onChange={e => setNewClient({...newClient, industry: e.target.value})}>
                      <option className="bg-slate-900">Santé & Bien-être</option>
                      <option className="bg-slate-900">Cosmétique Bio</option>
                      <option className="bg-slate-900">Nutrition Sportive</option>
                      <option className="bg-slate-900">Agriculture Digitale</option>
                    </select>
                  </div>
                </div>
              </div>

              <button onClick={() => setFactoryStep(2)} className="w-full py-8 bg-[#00d4ff] text-slate-900 font-black rounded-[2.5rem] uppercase tracking-[0.4em] text-sm shadow-3xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-4">
                Personnaliser l'Identité & Design <ChevronRight size={24} />
              </button>
            </div>
          )}

          {factoryStep === 2 && (
            <div className="space-y-12 animate-in slide-in-from-right-8 duration-500">
              <div className="flex items-center gap-10">
                <div className="w-24 h-24 bg-purple-500/10 border border-purple-500/40 rounded-[2.5rem] flex items-center justify-center text-purple-500 shadow-3xl shadow-purple-500/20"><Palette size={44} /></div>
                <div>
                  <h3 className="text-5xl font-black text-white tracking-tighter italic uppercase">Branding & AI Identity</h3>
                  <p className="text-slate-400 text-lg font-medium italic mt-1">Configurez le visage et les couleurs de votre écosystème.</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
                      <Bot size={14} /> Nom de l'IA Personnalisée
                    </label>
                    <input type="text" value={newClient.aiName} onChange={e => setNewClient({...newClient, aiName: e.target.value})} className="w-full px-8 py-6 rounded-[2rem] bg-slate-950 border border-white/10 text-white focus:border-[#00d4ff] outline-none transition-all font-bold" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
                      <Palette size={14} /> Couleur Primaire (HEX)
                    </label>
                    <div className="flex gap-4">
                      <input type="color" value={newClient.primaryColor} onChange={e => setNewClient({...newClient, primaryColor: e.target.value})} className="w-20 h-20 bg-transparent border-none cursor-pointer" />
                      <input type="text" value={newClient.primaryColor} onChange={e => setNewClient({...newClient, primaryColor: e.target.value})} className="flex-1 px-8 py-6 rounded-[2rem] bg-slate-950 border border-white/10 text-white focus:border-[#00d4ff] outline-none transition-all font-mono font-bold" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
                    <Database size={14} /> Type de Catalogue Produits
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    <button 
                      onClick={() => setNewClient({...newClient, catalogType: 'neolife'})} 
                      className={`p-6 rounded-3xl border flex items-center gap-4 transition-all ${newClient.catalogType === 'neolife' ? 'bg-[#00d4ff]/20 border-[#00d4ff] text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}
                    >
                      <Layers size={20} /> <span className="font-black uppercase tracking-widest text-xs">NeoLife Native</span>
                    </button>
                    <button 
                      onClick={() => setNewClient({...newClient, catalogType: 'custom'})} 
                      className={`p-6 rounded-3xl border flex items-center gap-4 transition-all ${newClient.catalogType === 'custom' ? 'bg-[#00d4ff]/20 border-[#00d4ff] text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}
                    >
                      <PlusCircle size={20} /> <span className="font-black uppercase tracking-widest text-xs">Custom Catalog</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 pt-6">
                <button onClick={() => setFactoryStep(1)} className="flex-1 py-8 border border-white/10 text-white font-black rounded-[2.5rem] uppercase tracking-widest text-sm hover:bg-white/5 transition-all">Retour</button>
                <button onClick={() => setFactoryStep(3)} className="flex-[2] py-8 bg-[#00d4ff] text-slate-900 font-black rounded-[2.5rem] uppercase tracking-[0.4em] text-sm shadow-3xl hover:brightness-110 active:scale-[0.98] transition-all">Setup Financier <ChevronRight size={20} /></button>
              </div>
            </div>
          )}

          {factoryStep === 3 && (
            <div className="space-y-12 animate-in slide-in-from-right-8 duration-500">
              <div className="flex items-center gap-10">
                <div className="w-24 h-24 bg-amber-500/10 border border-amber-500/40 rounded-[2.5rem] flex items-center justify-center text-amber-500 shadow-3xl shadow-amber-500/20"><DollarSign size={44} /></div>
                <div>
                  <h3 className="text-5xl font-black text-white tracking-tighter italic uppercase">Setup Économique</h3>
                  <p className="text-slate-400 text-lg font-medium italic mt-1">Ingénierie des flux et royalties du Hub.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-4">Frais de Setup Initial ($)</label>
                  <input type="number" className="w-full px-8 py-7 rounded-[2.5rem] bg-slate-950 border border-white/10 text-white focus:bg-white/10 focus:border-[#00d4ff] outline-none transition-all font-black text-xl shadow-inner" value={newClient.setupFee} onChange={e => setNewClient({...newClient, setupFee: Number(e.target.value)})} />
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-4">Part des Royalties NDSA (%)</label>
                  <input type="number" className="w-full px-8 py-7 rounded-[2.5rem] bg-slate-950 border border-white/10 text-white focus:bg-white/10 focus:border-[#00d4ff] outline-none transition-all font-black text-xl shadow-inner" value={newClient.royaltyRate} onChange={e => setNewClient({...newClient, royaltyRate: Number(e.target.value)})} />
                </div>
              </div>
              <div className="flex gap-6 pt-6">
                <button onClick={() => setFactoryStep(2)} className="flex-1 py-8 border border-white/10 text-white font-black rounded-[2.5rem] uppercase tracking-widest text-sm hover:bg-white/5 transition-all">Retour</button>
                <button onClick={() => setFactoryStep(4)} className="flex-[2] py-8 bg-[#00d4ff] text-slate-900 font-black rounded-[2.5rem] uppercase tracking-[0.4em] text-sm shadow-3xl hover:brightness-110 active:scale-[0.98] transition-all">Générer Compilation Stark</button>
              </div>
            </div>
          )}

          {factoryStep === 4 && (
            <div className="text-center space-y-16 animate-in slide-in-from-right-12 duration-500">
               <div className="relative inline-block">
                  <div className="w-40 h-40 bg-[#00d4ff]/10 border-4 border-[#00d4ff] rounded-[3.5rem] flex items-center justify-center mx-auto text-[#00d4ff] shadow-3xl relative z-10">
                    {isDeploying ? <Cpu size={80} className="animate-spin" /> : <ShieldCheck size={80} />}
                  </div>
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-white text-slate-900 rounded-full flex items-center justify-center animate-pulse shadow-3xl border-8 border-slate-900"><Zap size={32} /></div>
               </div>
               <div className="space-y-6">
                  <h3 className="text-6xl font-black text-white tracking-tighter italic uppercase leading-none">{isDeploying ? "Compilation en cours..." : "Compilation Terminée"}</h3>
                  <p className="text-slate-400 text-2xl font-medium max-w-3xl mx-auto leading-relaxed italic">
                    Clonage des protocoles de <strong>{sourceHub}</strong> vers l'instance isolée <strong>{newClient.clientName}</strong>.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                    <span className="text-xs font-black uppercase text-emerald-400 tracking-[0.4em]">Environnement SaaS Isolé : OMEGA READY</span>
                  </div>
               </div>
               {!isDeploying && (
                 <button onClick={handleDeploy} className="w-full py-10 bg-emerald-500 text-slate-950 font-black rounded-[3rem] uppercase tracking-[0.5em] text-sm shadow-3xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-6">
                   LANCER DÉPLOIEMENT HUB FINAL <Rocket size={32} />
                 </button>
               )}
            </div>
          )}

          {factoryStep === 5 && (
            <div className="text-center space-y-12 animate-in zoom-in-95 duration-1000 py-10">
               <div className="relative inline-block">
                 <div className="w-40 h-40 bg-emerald-500 rounded-[3rem] flex items-center justify-center mx-auto text-slate-950 shadow-3xl relative z-10"><Check size={80} /></div>
                 <div className="absolute -top-6 -right-6 w-16 h-16 bg-slate-900 text-[#00d4ff] rounded-full flex items-center justify-center animate-bounce shadow-3xl border-4 border-white/20"><Sparkles size={32} /></div>
               </div>
               <div className="space-y-4">
                 <h3 className="text-6xl font-black text-white tracking-tighter mb-4 italic uppercase leading-none">HUB SYNC ACTIVÉ</h3>
                 <p className="text-slate-500 text-2xl font-medium max-w-2xl mx-auto leading-relaxed italic">
                   L'instance White Label pour <strong>{newClient.clientName}</strong> a été injectée dans le réseau mondial. 
                   <br />Protocoles de sécurité Bio-Sync déployés.
                 </p>
               </div>
               <button onClick={() => { setShowFactory(false); setFactoryStep(1); }} className="w-full py-10 bg-white text-slate-950 font-black rounded-[3rem] uppercase tracking-[0.5em] text-sm shadow-3xl hover:bg-[#00d4ff] hover:text-slate-950 transition-all flex items-center justify-center gap-4">
                 TERMINER LE WORKFLOW <CheckCircle2 size={24} />
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {showFactory && <FactoryModal />}
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-slate-950/40 backdrop-blur-3xl p-12 rounded-[4rem] text-white relative overflow-hidden border border-white/5 shadow-3xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00d4ff]/5 rounded-full -mr-64 -mt-64 blur-[100px] animate-pulse"></div>
        <div className="relative z-10 space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#00d4ff]/10 rounded-full border border-[#00d4ff]/20 text-[11px] font-black text-[#00d4ff] uppercase tracking-widest shadow-2xl">
            <ShieldAlert size={16} /> MASTER-ADMIN COMMAND v{SYSTEM_CONFIG.version}
          </div>
          <h2 className="text-5xl font-black tracking-tighter italic leading-none uppercase">Tour de Direction Stark</h2>
          <div className="flex items-center gap-4 text-slate-500 font-bold uppercase tracking-widest text-xs justify-center md:justify-start">
            <span className="text-white">{SYSTEM_CONFIG.founder.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
            <span>{SYSTEM_CONFIG.founder.status}</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
           <button onClick={() => setShowDiplomacy(!showDiplomacy)} className={`px-8 py-5 rounded-2xl flex items-center gap-3 transition-all text-[10px] font-black uppercase tracking-widest shadow-lg ${showDiplomacy ? 'bg-[#00d4ff] text-slate-900' : 'bg-white/5 border border-white/10 text-white'}`}><Globe size={18} /> Section Diplomatique</button>
           <button onClick={() => { setFactoryStep(1); setShowFactory(true); }} className="px-10 py-5 bg-[#00d4ff] text-slate-900 rounded-2xl flex items-center gap-4 transition-all text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-[#00d4ff]/20 hover:scale-105 active:scale-95"><RotateCw size={20} /> Clone Hub</button>
        </div>
      </div>

      {/* Terminal Command Panel */}
      <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] backdrop-blur-md relative overflow-hidden">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#00d4ff]/10 rounded-2xl text-[#00d4ff]"><Terminal size={32} /></div>
            <div>
              <h3 className="text-3xl font-black text-white tracking-tight italic uppercase">Commandes Prioritaires Fondateur</h3>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1 italic">Protocoles Omega d'expansion massive</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-3">
             <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
             <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Global Bio-Sync : OK</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <button className="p-10 rounded-[3rem] bg-slate-950/80 border border-white/5 hover:border-[#00d4ff]/30 transition-all text-left flex flex-col justify-between group shadow-xl">
              <Share2 size={36} className="text-[#00d4ff] mb-8 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="font-black text-2xl text-white italic uppercase tracking-tighter">Générer Bio-Link Master</h4>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-3 italic">Point d'entrée universel pour orphelins</p>
              </div>
           </button>
           
           <button onClick={() => { setFactoryStep(1); setShowFactory(true); }} className="p-10 rounded-[3rem] bg-white text-slate-950 border border-transparent hover:scale-[1.02] transition-all text-left flex flex-col justify-between group shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-all pointer-events-none"><RotateCw size={120} /></div>
              <RotateCw size={40} className="text-[#00d4ff] mb-8 group-hover:rotate-180 transition-transform duration-700" />
              <div className="absolute top-6 right-6 px-3 py-1 bg-slate-900 text-[#00d4ff] text-[9px] font-black rounded-full uppercase tracking-widest border border-white/10">Module Omega-7</div>
              <div>
                <h4 className="font-black text-2xl italic uppercase tracking-tighter">Clone Hub</h4>
                <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-3 italic leading-relaxed">Dupliquer un Hub GMBC OS avec personnalisation AI & Design</p>
              </div>
           </button>
           
           <button className="p-10 rounded-[3rem] bg-slate-950/80 border border-white/5 hover:border-amber-500/30 transition-all text-left flex flex-col justify-between group shadow-xl">
              <Database size={36} className="text-amber-500 mb-8 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="font-black text-2xl text-white italic uppercase tracking-tighter">Coffre-Fort Leads</h4>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-3 italic">Visualiser & Router les Leads Orphelins mondiaux</p>
              </div>
           </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: "Flux Net SaaS Mensuel", value: `$${stats.totalNetSaaS.toLocaleString()}`, icon: DollarSign, color: "text-[#00d4ff]", trend: "+12%" },
          { label: "Conversion José AI", value: `${stats.aiEffectiveness}%`, icon: Cpu, color: "text-emerald-400", trend: "+2.4%" },
          { label: "Leads Orphelins (Global)", value: stats.orphanLeadsCount.toLocaleString(), icon: Activity, trend: "+145" },
          { label: "Hubs White Label Actifs", value: instances.length.toString(), icon: Factory, trend: instances.length > 0 ? "+1" : "0" }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-950/40 backdrop-blur-2xl p-10 rounded-[3.5rem] border border-white/5 shadow-xl hover:bg-white/5 transition-all relative group overflow-hidden">
             <div className="absolute -right-8 -bottom-8 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform"><stat.icon size={120} /></div>
             <div className="flex justify-between items-start mb-10 relative z-10">
                <div className={`p-5 rounded-2xl bg-white/5 ${stat.color} border border-white/10 shadow-inner`}><stat.icon size={36} /></div>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 text-[11px] font-black text-emerald-400 tabular-nums"><TrendingUp size={12} /> {stat.trend}</div>
             </div>
             <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
             <h3 className="text-4xl font-black text-white italic tracking-tighter tabular-nums">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Instance Management Section */}
      <div className="bg-white/5 border border-white/10 rounded-[4rem] overflow-hidden backdrop-blur-md shadow-3xl">
        <div className="p-12 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 bg-slate-950/20">
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="p-3 bg-[#00d4ff]/10 rounded-2xl text-[#00d4ff]"><Factory size={32} /></div>
              <h3 className="text-3xl font-black text-white tracking-tight italic uppercase leading-none">Gestion des Instances White Label</h3>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] italic">Contrôle centralisé des hubs partenaires isolés (Protocol Omega-7).</p>
          </div>
          <button onClick={() => { setFactoryStep(1); setShowFactory(true); }} className="px-12 py-6 bg-[#00d4ff] text-slate-950 rounded-[2.5rem] font-black uppercase tracking-widest text-[11px] flex items-center gap-5 shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:scale-105 transition-all active:scale-95">
            <RotateCw size={22} className="animate-spin-slow" /> Clone Hub
          </button>
        </div>
        
        <div className="p-12">
          {instances.length === 0 ? (
            <div className="py-24 text-center space-y-10">
               <div className="w-32 h-32 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center mx-auto text-slate-700 shadow-inner"><Unlink size={60} /></div>
               <div className="space-y-4">
                 <h4 className="text-3xl font-black text-white italic tracking-tighter uppercase">Aucune Instance Omega Détectée</h4>
                 <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto leading-relaxed italic">Initialisez votre premier Hub White Label pour commencer le déploiement de votre écosystème global.</p>
               </div>
               <button onClick={() => { setFactoryStep(1); setShowFactory(true); }} className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all italic">Lancer la Factory OMEGA</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {instances.map((instance) => (
                 <div key={instance.id} className="p-10 bg-slate-900/60 border border-white/10 rounded-[3.5rem] hover:bg-white/5 transition-all group relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none rotate-12 group-hover:rotate-0 transition-transform duration-1000"><Layers size={180} /></div>
                    
                    <div className="flex justify-between items-start mb-10 relative z-10">
                       <div className="w-16 h-16 bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded-2xl flex items-center justify-center text-[#00d4ff] shadow-inner font-black text-2xl uppercase italic" style={{ borderColor: instance.primaryColor, color: instance.primaryColor }}>
                         {instance.clientName.charAt(0)}
                       </div>
                       <div className="flex gap-3">
                          <button onClick={() => toggleLock(instance.id)} title={instance.isLocked ? "Déverrouiller" : "Verrouiller"} className={`p-4 rounded-xl transition-all shadow-lg ${instance.isLocked ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'}`}>
                             {instance.isLocked ? <Lock size={20} /> : <ShieldCheck size={20} />}
                          </button>
                          <button onClick={() => deleteInstance(instance.id)} title="Supprimer" className="p-4 bg-white/5 text-slate-400 hover:text-rose-500 border border-white/10 rounded-xl transition-all hover:bg-rose-500/5 hover:border-rose-500/20">
                             <Trash2 size={20} />
                          </button>
                       </div>
                    </div>

                    <div className="space-y-2 relative z-10 mb-10">
                       <h4 className="text-3xl font-black text-white italic tracking-tighter truncate leading-tight uppercase">{instance.clientName}</h4>
                       <div className="flex items-center gap-3">
                          <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{instance.industry}</span>
                          <span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
                          <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border ${instance.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                            {instance.status === 'ACTIVE' && <Activity size={10} className="animate-pulse" />}
                            {instance.status}
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5 relative z-10">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">AI Agent</p>
                          <p className="text-xs font-black text-white italic">{instance.aiName}</p>
                       </div>
                       <div className="text-right space-y-1">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Catalog</p>
                          <p className="text-xs font-black text-[#00d4ff] italic uppercase">{instance.catalogType}</p>
                       </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 relative z-10">
                       <div className="flex items-center justify-between mb-6">
                          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Royalty Rate</p>
                          <p className="text-sm font-black text-white">{instance.royaltyRate}%</p>
                       </div>
                       <button className="w-full py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#00d4ff] hover:text-slate-950 transition-all italic shadow-xl">
                          DÉPLOYER MASTER CONSOLE <ExternalLink size={16} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
