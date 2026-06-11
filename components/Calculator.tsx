'use client';
import { useState, useEffect } from 'react';
import { getTranslations, Locale } from '@/lib/i18n';

const prices = {
  current: {
    'gpt4o': { input: 18, output: 72, name: 'GPT-4o' },
    'claude-sonnet': { input: 22, output: 108, name: 'Claude 4.6 Sonnet' },
    'claude-opus': { input: 108, output: 540, name: 'Claude Opus 4.7' },
    'gemini-pro': { input: 9, output: 36, name: 'Gemini 3.1 Pro' },
    'qwen3-max': { input: 20, output: 60, name: 'Qwen3-Max' },
  },
  target: {
    'deepseek-flash': { input: 1.4, output: 5.6, name: 'DeepSeek V4 Flash' },
    'deepseek-pro': { input: 7.0, output: 28.0, name: 'DeepSeek V4 Pro' },
    'gpt55-mini': { input: 1.1, output: 4.3, name: 'GPT-5.5 Mini' },
  },
};

export default function Calculator({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).calculator;
  const [curModel, setCurModel] = useState('gpt4o');
  const [tgtModel, setTgtModel] = useState('deepseek-flash');
  const [dailyInput, setDailyInput] = useState(10);
  const [dailyOutput, setDailyOutput] = useState(2);
  const [result, setResult] = useState({ curMonthly: 0, tgtMonthly: 0, saved: 0, pct: '0' });

  function calc() {
    const cur = prices.current[curModel as keyof typeof prices.current];
    const tgt = prices.target[tgtModel as keyof typeof prices.target];
    const days = 30;
    const curMonthly = (dailyInput * cur.input + dailyOutput * cur.output) * days / 100;
    const tgtMonthly = (dailyInput * tgt.input + dailyOutput * tgt.output) * days / 100;
    const saved = curMonthly - tgtMonthly;
    const pct = Math.max(0, ((saved / curMonthly) * 100)).toFixed(0);
    setResult({ curMonthly, tgtMonthly, saved, pct });
  }

  useEffect(() => { calc(); }, [curModel, tgtModel, dailyInput, dailyOutput]);

  return (
    <div className="calc-box">
      <div className="calc-row">
        <label>{t.currentModel}</label>
        <select value={curModel} onChange={(e) => setCurModel(e.target.value)}>
          {Object.entries(prices.current).map(([k, v]) => (
            <option key={k} value={k}>{v.name}</option>
          ))}
        </select>
      </div>
      <div className="calc-row">
        <label>{t.targetModel}</label>
        <select value={tgtModel} onChange={(e) => setTgtModel(e.target.value)}>
          {Object.entries(prices.target).map(([k, v]) => (
            <option key={k} value={k}>{v.name}</option>
          ))}
        </select>
      </div>
      <div className="calc-row">
        <label>{t.dailyInput}</label>
        <input type="number" value={dailyInput} onChange={(e) => setDailyInput(Number(e.target.value))} min={1} />
      </div>
      <div className="calc-row">
        <label>{t.dailyOutput}</label>
        <input type="number" value={dailyOutput} onChange={(e) => setDailyOutput(Number(e.target.value))} min={1} />
      </div>
      <div className="calc-result">
        <p className="current">{t.currentCost}：¥{result.curMonthly.toFixed(0)}</p>
        <p className="new">{t.newCost}：¥{result.tgtMonthly.toFixed(0)}</p>
        <p className="savings">
          🎉 {t.savings} ¥{result.saved.toFixed(0)}{t.perMonth}（{result.pct}%） · {t.perYear} ¥{(result.saved * 12).toFixed(0)}
        </p>
      </div>
    </div>
  );
}
