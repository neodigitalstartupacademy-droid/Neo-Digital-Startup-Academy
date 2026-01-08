
import React, { useState, useRef, useEffect } from 'react';
import { generateJoseResponse, generateJoseAudio, decodeBase64, decodeAudioData, createWavBlob } from '../services/geminiService';
import { Message, Language, TimeFormat, AIPersona, ReferralContext } from '../types'; 
import { SYSTEM_CONFIG, I18N as I18N_CONST } from '../constants';
import { 
  Send, Bot, Loader2, Play, Check, Clock, User, Settings2, UserCog, X, Sparkles, BrainCircuit, Share2, Volume2, Square, Download, UserCheck, CheckCheck, Copy, Fingerprint, CircleDashed, ArrowUpCircle
} from 'lucide-react';

interface AssistantJoseProps {
  language?: Language;
}

export const AssistantJose: React.FC<AssistantJoseProps> = ({ language = 'fr' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [timeFormat, setTimeFormat] = useState<TimeFormat>('24h');
  const [showFormatMenu, setShowFormatMenu] = useState(false);
  const [showPersonaForge, setShowPersonaForge] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [referralContext, setReferralContext] = useState<ReferralContext | null>(null);
  const [myId, setMyId] = useState<string>(SYSTEM_CONFIG.founder.id);
  
  const [persona, setPersona] = useState<AIPersona>({
    name: SYSTEM_CONFIG.ai.name,
    role: SYSTEM_CONFIG.ai.role,
    philosophy: "Le diagnostic médical constate les faits, mais la Nutrition Cellulaire RESTAURE le potentiel biologique.",
    tonality: "Autorité scientifique, bienveillance, impact direct.",
    coreValues: "Vérité biologique, excellence SAB, transformation durable."
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);
  
  const t = I18N_CONST[language as Language];

  useEffect(() => {
    // 1. Capture du parrain via l'URL
    const params = new URLSearchParams(window.location.search);
    let refId = params.get('ref');

    if (!refId && window.location.hash.includes('ref=')) {
      refId = window.location.hash.split('ref=')[1].split('&')[0];
    }

    if (refId) {
      sessionStorage.setItem('ndsa_active_ref', refId);
    }

    // 2. Récupération du parrain stocké
    const storedRef = sessionStorage.getItem('ndsa_active_ref');
    if (storedRef && storedRef !== SYSTEM_CONFIG.founder.id) {
      setReferralContext({
        referrerId: storedRef,
        referrerName: `Conseiller ${storedRef}`,
        language: language as Language
      });
    }

    // 3. Récupération des données utilisateur
    const savedId = localStorage.getItem('ndsa_personal_id');
    if (savedId) setMyId(savedId);

    const savedFormat = localStorage.getItem('ndsa_time_format') as TimeFormat;
    if (savedFormat) setTimeFormat(savedFormat);

    const welcomeMsg = storedRef && storedRef !== SYSTEM_CONFIG.founder.id
      ? `Bienvenue ! Je suis ${persona.name}. Je vous accompagne pour votre diagnostic de santé de la part de votre conseiller (ID: ${storedRef}). Prêt à commencer ?`
      : t.welcome;

    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'model',
        parts: [{ text: welcomeMsg }],
        timestamp: new Date(),
        status: 'read'
      }]);
    }
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsgId = 'msg_' + Date.now();
    const userMsg: Message = { 
      id: userMsgId, 
      role: 'user', 
      parts: [{ text: input }], 
      timestamp: new Date(),
      status: 'sending'
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulation de réception par le hub
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === userMsgId ? { ...m, status: 'sent' } : m));
    }, 800);

    try {
      const responseText = await generateJoseResponse(
        userMsg.parts[0].text, 
        messages, 
        "Global", 
        undefined, 
        referralContext, 
        language as Language,
        persona,
        myId
      );
      
      setMessages(prev => prev.map(m => m.id === userMsgId ? { ...m, status: 'read' } : m));

      setMessages(prev => [...prev, { 
        id: 'ai_' + Date.now(), 
        role: 'model', 
        parts: [{ text: responseText }], 
        timestamp: new Date(),
        status: 'read'
      }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const stopAudio = () => {
    if (activeSourceRef.current) {
      activeSourceRef.current.stop();
      activeSourceRef.current = null;
    }
    setIsSpeaking(null);
  };

  const handleAudio = async (text: string, id: string) => {
    if (isSpeaking === id) { stopAudio(); return; }
    stopAudio();
    const base64 = await generateJoseAudio(text, language as Language);
    if (base64) {
      if (!audioContextRef.current) audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      const decoded = decodeBase64(base64);
      const audioBuffer = await decodeAudioData(decoded, audioContextRef.current, 24000, 1);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      activeSourceRef.current = source;
      setIsSpeaking(id);
      source.start();
      source.onended = () => setIsSpeaking(null);
    }
  };

  const handleExport = async (text: string, id: string) => {
    if (isDownloading === id) return;
    setIsDownloading(id);
    try {
      const base64 = await generateJoseAudio(text, language as Language);
      if (base64) {
        const decoded = decodeBase64(base64);
        const wavBlob = createWavBlob(decoded, 24000);
        const url = URL.createObjectURL(wavBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Jose_Audio_${id}.wav`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } finally {
      setIsDownloading(null);
    }
  };

  const StatusIndicator = ({ status }: { status?: 'sending' | 'sent' | 'read' }) => {
    if (!status) return null;
    const config = {
      sending: { icon: <ArrowUpCircle size={14} className="animate-bounce" />, color: "text-blue-400", label: "ENVOI" },
      sent: { icon: <Check size={14} />, color: "text-slate-500", label: "REMIS" },
      read: { icon: <CheckCheck size={14} className="drop-shadow-[0_0_5px_#00d4ff]" />, color: "text-[#00d4ff]", label: "LU" }
    }[status];

    return (
      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 ${config.color} animate-in fade-in`}>
        {config.icon}
        <span className="text-[7px] font-black tracking-widest uppercase">{config.label}</span>
      </div>
    );
  };

  const myReferralLink = `${window.location.origin}${window.location.pathname}?ref=${myId}`;

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-950/40 backdrop-blur-3xl rounded-[3rem] border border-white/10 overflow-hidden shadow-3xl relative">
      
      {referralContext && (
        <div className="bg-[#00d4ff]/10 border-b border-[#00d4ff]/20 px-8 py-3 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <UserCheck size={16} className="text-[#00d4ff]" />
              <p className="text-[10px] font-black text-[#00d4ff] uppercase tracking-widest italic">
                Hub Synchronisé via : <span className="text-white">Leader {referralContext.referrerId}</span>
              </p>
           </div>
        </div>
      )}

      <div className="bg-slate-900/80 p-8 flex items-center justify-between border-b border-white/5 z-50">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-xl flex items-center justify-center border border-[#00d4ff]/20">
            <Bot size={28} className="text-[#00d4ff]" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-white tracking-tight italic uppercase">{persona.name}</h2>
            <p className="text-[10px] text-[#00d4ff] font-black uppercase tracking-widest opacity-60">HUB DE RESTAURATION</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button onClick={() => setShowShareMenu(!showShareMenu)} className={`p-3 rounded-xl border transition-all ${showShareMenu ? 'bg-[#00d4ff] text-slate-950' : 'bg-white/5 text-slate-400 border-white/10'}`}><Share2 size={20} /></button>
            {showShareMenu && (
              <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-white/10 rounded-2xl shadow-3xl p-6 z-[60]">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Lien de Parrainage</p>
                <div className="bg-slate-950 p-4 rounded-xl border border-white/5 text-[10px] font-mono text-[#00d4ff] break-all mb-4">{myReferralLink}</div>
                <button onClick={() => { navigator.clipboard.writeText(myReferralLink); setCopiedId('link'); setTimeout(() => setCopiedId(null), 2000); }} className="w-full py-4 bg-[#00d4ff] text-slate-950 font-black rounded-xl uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                  {copiedId === 'link' ? <Check size={16} /> : <Copy size={16} />} {copiedId === 'link' ? 'Copié' : 'Copier mon lien'}
                </button>
              </div>
            )}
          </div>
          <button onClick={() => setShowPersonaForge(true)} className="p-3 bg-white/5 text-slate-400 border border-white/10 rounded-xl hover:text-[#00d4ff]"><UserCog size={20} /></button>
          <button onClick={() => setShowFormatMenu(!showFormatMenu)} className="p-3 bg-white/5 text-slate-400 border border-white/10 rounded-xl hover:text-white"><Settings2 size={20} /></button>
          
          {showFormatMenu && (
            <div className="absolute right-0 top-20 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-3xl p-2 z-[70]">
              {(['24h', '12h', 'seconds'] as TimeFormat[]).map(fmt => (
                <button key={fmt} onClick={() => { setTimeFormat(fmt); localStorage.setItem('ndsa_time_format', fmt); setShowFormatMenu(false); }} className={`w-full text-left px-4 py-2 rounded-lg text-[10px] font-black uppercase ${timeFormat === fmt ? 'bg-[#00d4ff] text-slate-950' : 'text-slate-400 hover:bg-white/5'}`}>
                  {fmt === 'seconds' ? 'Secondes' : fmt.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar scroll-smooth">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${msg.role === 'user' ? 'bg-slate-800 border-white/10' : 'bg-[#00d4ff]/20 border-[#00d4ff]/30'}`}>
                 {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-[#00d4ff]" />}
              </div>
              <div className="flex flex-col">
                <div className={`p-6 rounded-[2rem] border backdrop-blur-md ${msg.role === 'user' ? 'bg-[#00d4ff]/10 border-[#00d4ff]/20 text-white rounded-tr-none' : 'bg-white/5 border-white/10 text-slate-200 rounded-tl-none'}`}>
                  <p className="leading-relaxed text-[15px] font-medium whitespace-pre-line">{msg.parts[0].text}</p>
                  {msg.role === 'model' && (
                    <div className="flex items-center gap-4 mt-4">
                      <button onClick={() => handleAudio(msg.parts[0].text, msg.id)} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${isSpeaking === msg.id ? 'text-[#00d4ff]' : 'text-slate-500 hover:text-white'}`}>
                        {isSpeaking === msg.id ? <Square size={14} className="fill-current" /> : <Play size={14} />} {isSpeaking === msg.id ? 'Stop' : 'Écouter'}
                      </button>
                      <button onClick={() => handleExport(msg.parts[0].text, msg.id)} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${isDownloading === msg.id ? 'text-emerald-400' : 'text-slate-500 hover:text-white'}`}>
                        {isDownloading === msg.id ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />} Export WAV
                      </button>
                    </div>
                  )}
                </div>
                <div className={`flex items-center gap-3 mt-2 px-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-[9px] font-black text-slate-600 tracking-widest uppercase tabular-nums">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: timeFormat === 'seconds' ? '2-digit' : undefined, hour12: timeFormat === '12h' })}
                  </span>
                  {msg.role === 'user' && <StatusIndicator status={msg.status} />}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-4 px-10 py-4 bg-white/5 border border-white/10 rounded-2xl w-fit animate-pulse">
            <Loader2 className="animate-spin text-[#00d4ff]" size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">José analyse les données...</span>
          </div>
        )}
      </div>

      <div className="p-8 bg-slate-900/40 border-t border-white/10">
        <div className="flex gap-4 max-w-4xl mx-auto bg-slate-950/60 p-3 rounded-[2rem] border border-white/10 focus-within:border-[#00d4ff]/40 transition-all shadow-inner">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={`Échanger avec ${persona.name}...`} 
            className="flex-1 bg-transparent border-none px-6 py-4 text-white placeholder-slate-700 outline-none font-medium"
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()} className="w-14 h-14 rounded-2xl bg-[#00d4ff] text-slate-950 flex items-center justify-center shadow-2xl hover:brightness-110 disabled:opacity-50 transition-all"><Send size={24} /></button>
        </div>
      </div>

      {showPersonaForge && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-8">
          <div className="w-full max-w-xl bg-slate-900 border border-white/10 rounded-[3rem] p-10 space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Votre Profil Leadership</h3>
              <button onClick={() => setShowPersonaForge(false)}><X className="text-slate-500 hover:text-white" /></button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">ID Personnel NeoLife</label>
                <input value={myId} onChange={e => { setMyId(e.target.value); localStorage.setItem('ndsa_personal_id', e.target.value); }} className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-[#00d4ff] font-black outline-none" />
              </div>
              <p className="text-[11px] text-slate-400 italic">Cet ID sera utilisé par José pour générer vos liens de capture et de boutique personnalisés.</p>
            </div>
            <button onClick={() => setShowPersonaForge(false)} className="w-full py-5 bg-[#00d4ff] text-slate-900 font-black rounded-2xl uppercase tracking-widest text-xs">Synchroniser mon Hub</button>
          </div>
        </div>
      )}
    </div>
  );
};
