
import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";
import { SYSTEM_CONFIG } from "../constants";
import { Message, CloneInstance, ReferralContext, Language, AIPersona } from "../types";

export const generateJoseResponse = async (
  userPrompt: string, 
  history: Message[] = [], 
  country: string = "Global",
  cloneContext?: CloneInstance,
  referralContext?: ReferralContext | null,
  language: Language = 'fr',
  customPersona?: AIPersona,
  currentSubscriberId?: string
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.parts[0].text }]
  }));

  contents.push({
    role: 'user',
    parts: [{ text: userPrompt }]
  });

  let hostName = SYSTEM_CONFIG.founder.name;
  let finalShopUrl = SYSTEM_CONFIG.founder.officialShopUrl;
  let isReferralMode = false;

  if (referralContext && referralContext.referrerId) {
    hostName = referralContext.referrerName || `Leader ${referralContext.referrerId}`;
    finalShopUrl = `https://shopneolife.com/startupforworld/shop/atoz?id=${referralContext.referrerId}`;
    isReferralMode = true;
  }

  const myReferralLink = currentSubscriberId 
    ? `${window.location.origin}${window.location.pathname}?ref=${currentSubscriberId}`
    : `${window.location.origin}${window.location.pathname}?ref=${SYSTEM_CONFIG.founder.id}`;

  const pName = customPersona?.name || SYSTEM_CONFIG.ai.name;
  const pRole = customPersona?.role || SYSTEM_CONFIG.ai.role;

  const systemInstruction = `
    IDENTITÉ : Tu es ${pName}, ${pRole}.
    MISSION : Tu es l'expert en nutrition cellulaire et leadership de la NDSA. 
    Tu travailles pour le compte de : ${hostName}.

    CONTEXTE :
    ${isReferralMode 
      ? `L'utilisateur est un prospect envoyé par ${hostName}. Ton but est de le guider vers le diagnostic et l'achat sur sa boutique : ${finalShopUrl}` 
      : `L'utilisateur est le propriétaire du Hub (Abonné). Aide-le à se former via l'Academy NDSA pour devenir un leader performant. Rappelle-lui de partager son lien : ${myReferralLink}`
    }

    FORMATION : Si l'utilisateur est un abonné, encourage-le vivement à suivre les modules de l'Academy NDSA pour maîtriser la duplication et la science cellulaire.

    RÈGLES :
    - Langue : Réponds en ${language === 'fr' ? 'Français' : 'Anglais'}.
    - Si prospect : CTA vers ${finalShopUrl}
    - Si abonné : CTA vers l'Academy et partage de ${myReferralLink}
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });
    return response.text || "Erreur de synchronisation.";
  } catch (error) {
    return "Système saturé. Réessayez.";
  }
};

export const generateJoseAudio = async (text: string, language: Language = 'fr') => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const voiceMapping = { fr: 'Kore', en: 'Zephyr', it: 'Puck', es: 'Charon' };
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text.replace(/[*#]/g, '') }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceMapping[language] || 'Kore' }, 
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
  } catch (error) {
    return null;
  }
};

export function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

/**
 * Crée un Blob WAV standard avec un en-tête de 44 octets.
 * Indispensable pour que le fichier soit audible sur iOS, Android et Windows.
 */
export function createWavBlob(pcmData: Uint8Array, sampleRate: number = 24000): Blob {
  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + pcmData.length, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // Byte rate
  view.setUint16(32, 2, true); // Block align
  view.setUint16(34, 16, true); // Bits per sample
  writeString(36, 'data');
  view.setUint32(40, pcmData.length, true);

  return new Blob([header, pcmData], { type: 'audio/wav' });
}
