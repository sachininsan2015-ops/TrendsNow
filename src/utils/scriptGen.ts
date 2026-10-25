import type { Trend, LangId } from '@/types';
import { DICTS } from '@/data/i18n';

const TONE_INTROS: Record<string, Record<string, string>> = {
  hype: {
    en: "This is BREAKING and you need to drop everything. {topic} is exploding right now with {growth}% growth in just {hours} hours.",
    hi: "यह ब्रेकिंग न्यूज़ है! {topic} अभी {hours} घंटे में {growth}% वृद्धि के साथ धमाल मचा रहा है।",
    es: "¡Esto es ÚLTIMO HORA! {topic} está explotando ahora con {growth}% de crecimiento en solo {hours} horas.",
    fr: "C'est L'INFO DU JOUR ! {topic} explose maintenant avec {growth}% de croissance en seulement {hours} heures.",
  },
  professional: {
    en: "Today's analysis focuses on {topic}, a trend currently showing {growth}% growth velocity over the past {hours} hours.",
    hi: "आज का विश्लेषण {topic} पर केंद्रित है, जो पिछले {hours} घंटों में {growth}% वृद्धि दिखा रहा है।",
    es: "El análisis de hoy se centra en {topic}, una tendencia con {growth}% de crecimiento en las últimas {hours} horas.",
    fr: "L'analyse d'aujourd'hui porte sur {topic}, une tendance affichant {growth}% de croissance ces dernières {hours} heures.",
  },
  storytelling: {
    en: "Picture this: {hours} hours ago, almost nobody was searching for {topic}. Today? {growth}% growth. Here's what happened.",
    hi: "सोचिए: {hours} घंटे पहले {topic} को लगभग कोई नहीं खोज रहा था। आज? {growth}% वृद्धि। यहाँ क्या हुआ।",
    es: "Imagina esto: hace {hours} horas casi nadie buscaba {topic}. ¿Hoy? {growth}% de crecimiento. Esto es lo que pasó.",
    fr: "Imaginez : il y a {hours} heures, presque personne ne cherchait {topic}. Aujourd'hui ? {growth}% de croissance. Voici ce qui s'est passé.",
  },
};

const HOOKS: Record<string, string[]> = {
  en: [
    "Stop scrolling — this is about to change everything.",
    "If you're not paying attention to this yet, you're already late.",
    "Three reasons this trend is about to dominate your feed.",
    "Nobody is talking about this yet. Here's why they should be.",
  ],
  hi: [
    "स्क्रॉल करना बंद करें — यह सब कुछ बदलने वाला है।",
    "अगर आपने अभी तक इस पर ध्यान नहीं दिया, तो आप पहले ही देरी कर रहे हैं।",
    "तीन कारण क्यों यह ट्रेंड आपकी फ़ीड पर हावी होने वाला है।",
  ],
  es: [
    "Deja de desplazarte — esto está a punto de cambiarlo todo.",
    "Si aún no le prestas atención, ya vas con retraso.",
    "Tres razones por las que esta tendencia dominará tu feed.",
  ],
  fr: [
    "Arrêtez de défiler — ça va tout changer.",
    "Si vous n'y prêtez pas attention, vous êtes déjà en retard.",
    "Trois raisons pour lesquelles cette tendance va dominer votre fil.",
  ],
};

const HASHTAGS: Record<string, string[]> = {
  en: ['#trending', '#viral', '#trendnow', '#fyp', '#foryou'],
  hi: ['#trending', '#viral', '#trendnow', '#viralhindi', '#fyp'],
  es: ['#tendencias', '#viral', '#trendnow', '#parati', '#fyp'],
};

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function fillTemplate(tpl: string, vars: Record<string, string | number>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

export function generateScript(
  trend: Trend,
  duration: number,
  tone: 'hype' | 'professional' | 'storytelling',
  lang: LangId,
  seed: number,
): { script: string; hooks: string[]; hashtags: string[] } {
  const dict = DICTS[lang] || DICTS.en;
  const introPool = TONE_INTROS[tone] || TONE_INTROS.hype;
  const intro = introPool[lang] || introPool.en || introPool.en;
  const introText = fillTemplate(intro, {
    topic: trend.topic,
    growth: trend.growthPct,
    hours: trend.startedHoursAgo,
  });

  const sections: string[] = [];

  if (duration <= 30) {
    sections.push(`[HOOK — 0-3s]\n${introText}`);
    sections.push(`[CONTEXT — 3-20s]\n${dict.active || 'Here\'s why it matters'}: ${trend.topic} is seeing ${trend.growthPct}% growth. Search volume: ${trend.searchVolume.toLocaleString()}.`);
    sections.push(`[CTA — 20-30s]\nFollow for real-time trend alerts before they go mainstream.`);
  } else if (duration <= 60) {
    sections.push(`[HOOK — 0-5s]\n${introText}`);
    sections.push(`[SETUP — 5-15s]\n${trend.topic} started trending ${trend.startedHoursAgo} hours ago. Right now it's at ${trend.growthPct}% growth and climbing.`);
    sections.push(`[DEEP DIVE — 15-45s]\nThe related queries tell the real story: people are searching "${trend.relatedQueries[0]?.query || trend.topic}". That means audiences want depth, not just headlines. ${dict.trendBreakdown || 'Trend breakdown'}: ${trend.relatedQueries.slice(0, 3).map(r => r.query).join(', ')}.`);
    sections.push(`[CTA — 45-60s]\nSave this and share it with someone who needs to catch this wave early.`);
  } else if (duration <= 180) {
    sections.push(`[HOOK — 0-10s]\n${introText}`);
    sections.push(`[BACKGROUND — 10-30s]\n${trend.topic} began gaining traction ${trend.startedHoursAgo} hours ago. As of now the search volume sits at ${trend.searchVolume.toLocaleString()} with a ${trend.growthPct}% velocity spike. This is not a flash trend — the related query cluster shows sustained curiosity.`);
    sections.push(`[WHY IT MATTERS — 30-90s]\nThree forces are driving this. First, the primary catalyst: ${trend.relatedQueries[0]?.query || 'breaking developments'}. Second, the amplification layer: social platforms are picking up the signal. Third, the curiosity gap — audiences are searching "${trend.relatedQueries[1]?.query || 'deeper context'}", which means they want more than surface-level takes.`);
    sections.push(`[DATA BREAKDOWN — 90-140s]\nTop related queries by interest score:\n${trend.relatedQueries.slice(0, 4).map((r, i) => `  ${i + 1}. "${r.query}" — score ${r.score}${r.rising ? ' (rising)' : ''}`).join('\n')}\nRising queries indicate where momentum is accelerating fastest.`);
    sections.push(`[TAKEAWAY — 140-180s]\nIf you create content around ${trend.topic} in the next 6 hours, you're ahead of the curve. Follow for predictive alerts on the next wave.`);
  } else {
    sections.push(`[HOOK — 0-15s]\n${introText}`);
    sections.push(`[CONTEXT — 15-45s]\nThis is a deep dive on ${trend.topic}, one of the fastest-rising searches globally right now. Over the past ${trend.startedHoursAgo} hours it has climbed ${trend.growthPct}% with no signs of plateauing.`);
    sections.push(`[ORIGIN — 45-120s]\nEvery trend has an origin point. ${trend.topic} began as a niche signal and has now crossed into mainstream awareness. The spark came from "${trend.relatedQueries[0]?.query || 'early adopters'}" — a small but vocal audience that amplified the topic across platforms.`);
    sections.push(`[EXPANSION — 120-210s]\nThe expansion phase is where the real opportunity lives. Right now search interest is at ${trend.searchVolume.toLocaleString()} and rising. Related queries reveal the audience's intent:\n${trend.relatedQueries.slice(0, 5).map((r, i) => `  ${i + 1}. "${r.query}" — ${r.score}% interest${r.rising ? ' [RISING]' : ''}`).join('\n')}`);
    sections.push(`[ANALYSIS — 210-270s]\nThis trend maps to the ${trend.category} category, which historically sustains momentum for 48-72 hours after the initial spike. We're currently ${trend.startedHoursAgo} hours in, meaning there's still a substantial window.`);
    sections.push(`[PREDICTION — 270-300s]\nBased on velocity acceleration, expect peak interest within the next 12-18 hours. Create and publish now to ride the upward curve. Follow TrendNow for the next predictive alert.`);
  }

  const script = sections.join('\n\n');

  const hookPool = HOOKS[lang] || HOOKS.en;
  const hooks = [pick(hookPool, seed), pick(hookPool, seed + 1), pick(hookPool, seed + 2)].slice(0, 3);

  const tagPool = HASHTAGS[lang] || HASHTAGS.en;
  const tags = [...new Set([...tagPool, `#${trend.topic.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20)}`])].slice(0, 6);

  return { script, hooks, hashtags: tags };
}
