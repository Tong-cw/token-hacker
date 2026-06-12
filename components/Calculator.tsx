// Calculator component — not currently used, kept for future use
'use client';
import { useState } from 'react';
import { Locale } from '@/lib/i18n';

const models: Record<string, { name: string; input: number; output: number }> = {
  'gpt4o': { name: 'GPT-4o', input: 2.5, output: 10 },
  'deepseek-flash': { name: 'DeepSeek V4 Flash', input: 0.14, output: 0.56 },
  'deepseek-pro': { name: 'DeepSeek V4 Pro', input: 0.98, output: 3.92 },
};

export default function Calculator({ locale }: { locale: Locale }) {
  const [curModel, setCurModel] = useState('gpt4o');
  const [tgtModel, setTgtModel] = useState('deepseek-flash');
  const [dailyInput, setDailyInput] = useState(10);
  const [dailyOutput, setDailyOutput] = useState(2);

  const currentCost = ((dailyInput * 300000 * models[curModel].input + dailyOutput * 300000 * models[curModel].output) / 1000000).toFixed(0);
  const newCost = ((dailyInput * 300000 * models[tgtModel].input + dailyOutput * 300000 * models[tgtModel].output) / 1000000).toFixed(0);

  return (
    <div className="calc-box">
      <div className="calc-row">
        <label>Current Model</label>
        <select value={curModel} onChange={(e) => setCurModel(e.target.value)}>
          {Object.entries(models).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
        </select>
      </div>
      <div className="calc-row">
        <label>Target Model</label>
        <select value={tgtModel} onChange={(e) => setTgtModel(e.target.value)}>
          {Object.entries(models).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
        </select>
      </div>
      <div className="calc-row">
        <label>Daily Input (10K tokens)</label>
        <input type="number" value={dailyInput} onChange={(e) => setDailyInput(Number(e.target.value))} />
      </div>
      <div className="calc-row">
        <label>Daily Output (10K tokens)</label>
        <input type="number" value={dailyOutput} onChange={(e) => setDailyOutput(Number(e.target.value))} />
      </div>
      <div className="calc-result">
        <p className="current">Current: ${currentCost} /month</p>
        <p className="new">After Switch: ${newCost} /month</p>
        <p className="savings">Monthly Savings: ${(+currentCost - +newCost).toFixed(0)}</p>
      </div>
    </div>
  );
}
