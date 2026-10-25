import { useState } from 'react';
import { PenTool, Copy, Sparkles, Hash, Play, Clock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Dropdown } from '@/components/Dropdown';
import { SEED_TRENDS } from '@/data/trends';
import { generateScript } from '@/utils/scriptGen';
import { copyToClipboard } from '@/utils/export';
import { LANG_MAP } from '@/data/languages';
import type { CreatorScript } from '@/types';

const DURATIONS = [
  { value: '30', label: '30s — Reel Hook' },
  { value: '60', label: '60s — YouTube Short' },
  { value: '180', label: '3 min — Deep Dive' },
  { value: '300', label: '5 min — Full Video' },
];

const TONES = [
  { value: 'hype', labelKey: 'toneHype' },
  { value: 'professional', labelKey: 'toneProfessional' },
  { value: 'storytelling', labelKey: 'toneStorytelling' },
];

export function CreatorView() {
  const { t, lang, addToast, setSelectedTrendId } = useApp();
  const [trendId, setTrendId] = useState(SEED_TRENDS[0].id);
  const [duration, setDuration] = useState('60');
  const [tone, setTone] = useState<'hype' | 'professional' | 'storytelling'>('hype');
  const [script, setScript] = useState<CreatorScript | null>(null);
  const [generating, setGenerating] = useState(false);

  const trendOptions = SEED_TRENDS.map((tr) => ({
    value: tr.id,
    label: tr.title,
  }));

  const handleGenerate = () => {
    const trend = SEED_TRENDS.find((tr) => tr.id === trendId);
    if (!trend) return;
    setGenerating(true);
    setTimeout(() => {
      const seed = Math.floor(Math.random() * 100000);
      const result = generateScript(trend, parseInt(duration), tone, lang, seed);
      const newScript: CreatorScript = {
        id: `script-${seed}`,
        title: trend.title,
        language: lang,
        duration: parseInt(duration),
        tone,
        ...result,
        createdAt: Date.now(),
      };
      setScript(newScript);
      setGenerating(false);
      addToast(t('scriptGenerated'));
    }, 800);
  };

  const handleCopy = async () => {
    if (!script) return;
    const ok = await copyToClipboard(script.script);
    addToast(ok ? t('scriptCopied') : 'Copy failed', ok ? 'success' : 'error');
  };

  const currentLang = LANG_MAP[lang];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <PenTool className="w-6 h-6 text-primary" />
          {t('creatorTitle')}
        </h1>
        <p className="text-sm text-muted mt-1">{t('creatorDesc')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-elev border border-app rounded-xl p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wide">
                {t('language')}
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-base border border-app rounded-lg text-sm">
                <span className="text-lg">{currentLang?.flag}</span>
                <span>{currentLang?.native}</span>
                <span className="ml-auto text-xs text-muted">— syncs to header</span>
              </div>
            </div>

            <Dropdown
              label={t('selectTrend')}
              value={trendId}
              options={trendOptions}
              onChange={setTrendId}
              searchable
            />

            <Dropdown
              label={t('duration')}
              icon={<Clock className="w-4 h-4 text-muted" />}
              value={duration}
              options={DURATIONS}
              onChange={setDuration}
            />

            <div>
              <label className="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wide">
                {t('tone')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TONES.map((tn) => (
                  <button
                    key={tn.value}
                    onClick={() => setTone(tn.value as typeof tone)}
                    className={`px-2 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      tone === tn.value
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-elev border-app text-muted hover:border-primary/40'
                    }`}
                  >
                    {t(tn.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-60"
            >
              {generating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {t('generateScript')}
                </>
              )}
            </button>

            <button
              onClick={() => setSelectedTrendId(trendId)}
              className="w-full text-xs text-muted hover:text-primary transition-colors"
            >
              View trend details →
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {!script ? (
            <div className="bg-card border border-app rounded-xl p-12 text-center">
              <PenTool className="w-10 h-10 text-muted mx-auto mb-3" />
              <p className="text-muted text-sm">
                Configure your settings and generate a script. Output will appear here in your selected language.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-elev border border-app rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="font-semibold">{script.title}</h2>
                    <div className="flex items-center gap-3 text-xs text-muted mt-1">
                      <span>{currentLang?.native}</span>
                      <span>·</span>
                      <span>{DURATIONS.find((d) => d.value === String(script.duration))?.label}</span>
                      <span>·</span>
                      <span className="capitalize">{t(script.tone === 'hype' ? 'toneHype' : script.tone === 'professional' ? 'toneProfessional' : 'toneStorytelling')}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary-hover transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {t('copyScript')}
                  </button>
                </div>
                <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed text-base bg-card border border-app rounded-lg p-4 max-h-[400px] overflow-auto scrollbar-thin">
                  {script.script}
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-elev border border-app rounded-xl p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                    <Play className="w-4 h-4 text-primary" />
                    {t('hooks')}
                  </h3>
                  <div className="space-y-2">
                    {script.hooks.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm bg-card border border-app rounded-lg p-3">
                        <span className="text-xs font-bold text-primary flex-shrink-0 mt-0.5">{i + 1}.</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-elev border border-app rounded-xl p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                    <Hash className="w-4 h-4 text-primary" />
                    {t('hashtags')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {script.hashtags.map((h) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 bg-base border border-app rounded-full text-xs font-medium text-primary"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
