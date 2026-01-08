
import { PricingZone, Language } from './types';

export const I18N = {
  fr: {
    dashboard: "Cockpit de Direction",
    jose: "Coach José AI",
    academy: "Academy Leadership",
    social: "Social Sync Engine",
    finance: "Flux & Commissions",
    admin: "Master Console",
    welcome: "Bonjour. Je suis Coach José Gaétan.",
    cta_health: "Diagnostic Santé",
    cta_business: "Startup Business",
    status_stable: "Bio-Sync : Stable",
    propulsion: "Propulser Success"
  },
  en: {
    dashboard: "Command Cockpit",
    jose: "AI Coach Jose",
    academy: "Leadership Academy",
    social: "Social Sync Engine",
    finance: "Flows & Commissions",
    admin: "Master Console",
    welcome: "Hello. I am Coach Jose Gaetan.",
    cta_health: "Health Diagnostic",
    cta_business: "Business Startup",
    status_stable: "Bio-Sync: Stable",
    propulsion: "Push Success"
  },
  it: {
    dashboard: "Cabina di Comando",
    jose: "Coach José AI",
    academy: "Academy Leadership",
    social: "Motore Social Sync",
    finance: "Flussi e Commissioni",
    admin: "Master Console",
    welcome: "Buongiorno. Sono il Coach José Gaétan.",
    cta_health: "Diagnosi Salute",
    cta_business: "Startup Business",
    status_stable: "Bio-Sync: Stabile",
    propulsion: "Propulsa Successo"
  },
  es: {
    dashboard: "Cabina de Mando",
    jose: "Coach José AI",
    academy: "Academy Leadership",
    social: "Motor Social Sync",
    finance: "Flujos y Comisiones",
    admin: "Consola Maestra",
    welcome: "Hola. Soy el Coach José Gaétan.",
    cta_health: "Diagnóstico de Salud",
    cta_business: "Startup de Negocios",
    status_stable: "Bio-Sync: Estable",
    propulsion: "Propulsar Éxito"
  }
};

export const SYSTEM_CONFIG = {
  brand: "NDSA GMBC OS 2025",
  version: "3.9.0-MASTER-ACADEMY",
  founder: {
    name: "Coach José Gaétan",
    id: "067-2922111",
    officialShopUrl: "https://shopneolife.com/startupforworld/shop/atoz",
    status: "Fondateur Visionnaire"
  },
  ai: {
    name: "Coach José Gaétan",
    role: "Expert en Nutrition Cellulaire & Leader Legend Vision",
    disclaimer: "⚠️ Je suis José, votre coach. Je ne remplace pas votre médecin.",
  },
  ui: {
    backgroundGradient: "linear-gradient(135deg, #0b1418 0%, #1a2a33 100%)",
    primaryColor: "#00d4ff"
  },
  billing: {
    pricing: {
      [PricingZone.AFRICA]: { amount: 10, currency: "USD", label: "Plan Émergence" },
      [PricingZone.EUROPE]: { amount: 15, currency: "EUR", label: "Plan Excellence" },
      [PricingZone.GLOBAL]: { amount: 20, currency: "USD", label: "Plan Empire" }
    }
  },
  academy: {
    modules: [
      { 
        id: "m1", 
        title: "Science de la Restauration Cellulaire", 
        description: "Maîtrisez les fondements biologiques du SAB pour devenir une autorité en santé.",
        lessons: [
          {
            id: "m1-l1",
            title: "La membrane : porte d'entrée de la vie",
            content: "La nutrition cellulaire commence par la compréhension de la membrane lipidique. Sans une membrane fluide, aucun nutriment ne pénètre, aucun déchet ne sort. Notre technologie Tre-en-en restaure cette fluidité critique. \n\n### Points Clés :\n1. La structure bilipidique.\n2. L'impact des céréales raffinées sur la perméabilité.\n3. Pourquoi le Tre-en-en est le fondement de tout protocole.",
            starkInsight: "Si la porte est verrouillée, la fête n'aura jamais lieu. Le Tre-en-en est la clé universelle.",
            practicalExercise: "Analysez votre petit-déjeuner : contient-il des lipides et stérols entiers ou des glucides inflammatoires ?"
          },
          {
            id: "m1-l2",
            title: "Le SAB : 50 ans d'avance",
            content: "Le Scientific Advisory Board (SAB) fondé par le Dr. Arthur Furst est l'âme de NeoLife. Ici, nous ne suivons pas les modes, nous créons la norme scientifique basée sur la nature.\n\n### Points Clés :\n1. La hiérarchie Furst.\n2. Bio-disponibilité vs Concentration.\n3. L'origine naturelle intégrale.",
            starkInsight: "La science sans conscience est la ruine de l'âme, mais la science sans nature est la ruine de la cellule.",
            practicalExercise: "Listez 3 compléments synthétiques du marché et comparez leurs étiquettes avec le complexe Caroténoïde."
          }
        ] 
      },
      { 
        id: "m2", 
        title: "L'Art de la Duplication Stark", 
        description: "Apprenez à bâtir un système qui fonctionne sans votre présence physique.",
        lessons: [
          {
            id: "m2-l1",
            title: "Le Mythe de la Vente",
            content: "En MLM Stark, nous ne vendons pas des boîtes, nous dupliquons des systèmes de liberté. Le vendeur s'épuise, le Leader bâtisseur s'émancipe.\n\n### Points Clés :\n1. La différence entre revenu linéaire et résiduel.\n2. Pourquoi 5 'Generative Leaders' valent mieux que 500 clients éphémères.",
            starkInsight: "Ne cherchez pas des acheteurs, cherchez des alliés qui veulent aussi bâtir leur propre Hub.",
            practicalExercise: "Dessinez votre arbre 3-4-3 idéal."
          }
        ] 
      }
    ],
    premiumModules: [
      { 
        id: "m3", 
        title: "Magnétisme Numérique", 
        description: "Utilisez l'IA et les réseaux sociaux pour générer des leads en dormant.",
        lessons: [] 
      }
    ]
  },
  socialViral: {
    template: "Le diagnostic médical constate, mais vos cellules réclament une restauration. Découvrez l'IA José. 🧬🚀",
    responseScript: "Bonjour ! Utilisez ce lien pour votre diagnostic : ",
    structure: "HOOK / BRIDGE / CTA"
  },
  diplomacy: {
    topLeaderLetter: {
      content: "Cher Leader...\n\nJosé Gaétan"
    },
    followUpScript: "Avez-vous pu analyser le potentiel de synchronisation bio-numérique ?",
    pressKit: {
      title: "Dossier de Presse NDSA 2025",
      tagline: "L'IA au service de la restauration biologique",
      vision: {
        title: "Vision Systémique",
        content: "Our mission is to fusion artificial intelligence with the science of cellular restoration.",
        kpis: ["98% AI Effectiveness", "Global Bio-Sync Coverage"]
      },
      tech: {
        title: "Stark Technology",
        description: "The GMBC OS engine is built on isolated micro-services.",
        safety: "Military-grade encryption."
      }
    }
  },
  documents: {
    whitePaper: "Strategie_NDSA_Master_Paper.pdf"
  }
};
