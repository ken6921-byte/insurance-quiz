'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ctaLinks } from '@/config/ctaLinks';

const questions = [
  { text: '面對緊急狀況時，我會主動掌握方向並快速做決定。', trait: 'D' },
  { text: '參與團隊討論時，我喜歡拋出新點子並帶動氣氛。', trait: 'I' },
  { text: '客戶提出疑問時，我會耐心傾聽並提供完整解釋。', trait: 'S' },
  { text: '處理保單細節時，我會反覆確認文件與數字。', trait: 'C' },
  { text: '遇到阻力時，我傾向直接挑戰並突破。', trait: 'D' },
  { text: '第一次見面我能很快與客戶建立輕鬆對話。', trait: 'I' },
  { text: '我喜歡維持穩定的合作關係而非激烈競爭。', trait: 'S' },
  { text: '我在意流程與合規，會確保每一步都符合規範。', trait: 'C' },
  { text: '設定目標時，我希望能主導節奏並看到成果。', trait: 'D' },
  { text: '在大型場合分享產品或故事時，我感到興奮。', trait: 'I' },
  { text: '面對變動，我會先觀察再慢慢採取行動。', trait: 'S' },
  { text: '收到客戶需求，我會整理表格或清單以便追蹤。', trait: 'C' },
];

const traitLabels: Record<string, string> = {
  D: '主導 (Dominance)',
  I: '影響 (Influence)',
  S: '穩定 (Steadiness)',
  C: '謹慎 (Conscientiousness)',
};

type Answer = 1 | 2 | 3 | 4 | 5;

export default function DiscTestPage() {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [showResult, setShowResult] = useState(false);

  const totals = useMemo(() => {
    return questions.reduce(
      (acc, _, index) => {
        const value = answers[index];
        const trait = questions[index].trait;
        if (value) {
          acc[trait] += value;
        }
        return acc;
      },
      { D: 0, I: 0, S: 0, C: 0 }
    );
  }, [answers]);

  const progress = (Object.keys(answers).length / questions.length) * 100;

  const dominantTrait = useMemo(() => {
    const entries = Object.entries(totals);
    const max = Math.max(...entries.map(([, value]) => value));
    const found = entries.filter(([, value]) => value === max).map(([key]) => key);
    return found[0];
  }, [totals]);

  const handleSelect = (index: number, value: Answer) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const renderBars = () => {
    return (
      <div className="grid grid-cols-4 gap-3">
        {(['D', 'I', 'S', 'C'] as const).map((trait) => {
          const score = totals[trait];
          const percentage = Math.min(100, (score / (questions.length * 5)) * 100 * 4);
          return (
            <div key={trait} className="space-y-2 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                <span>{traitLabels[trait]}</span>
                <span>{score} 分</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-indigo-500 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const resultBlock = (
    <div className="space-y-3 rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
      <h2 className="text-2xl font-bold">你的溝通傾向</h2>
      <p className="text-sm text-slate-200">
        主要傾向：{traitLabels[dominantTrait]}。記得因人而異，保持彈性調整自己的節奏。
      </p>
      <div className="space-y-2 rounded-xl bg-white/10 p-4 text-sm leading-6">
        <p className="font-semibold">保險情境溝通建議</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>與 D 型客戶：直奔重點、比較方案與結果，提供明確下一步。</li>
          <li>與 I 型客戶：多用故事案例、互動提問，保持輕鬆氛圍。</li>
          <li>與 S 型客戶：給予時間思考，強調陪伴與後續服務。</li>
          <li>與 C 型客戶：準備數據、條款與風險說明，回答細節問題。</li>
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={ctaLinks.lineInvite}
          className="inline-flex items-center justify-center rounded-lg bg-lime-400 px-4 py-3 font-semibold text-slate-900 shadow hover:bg-lime-300"
        >
          加入 LINE 看完整分析
        </Link>
        <Link
          href="/tools"
          className="text-sm text-slate-200 underline-offset-4 hover:underline"
        >
          返回工具清單
        </Link>
      </div>
    </div>
  );

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold text-indigo-600">DISC 測驗</p>
        <h1 className="text-3xl font-bold text-slate-900">掌握客戶的溝通語言</h1>
        <p className="text-slate-700">
          單頁快速作答，左下方即時更新 D/I/S/C 分數，完成後即可獲得話術建議。
        </p>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-2 bg-indigo-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-slate-600">
          進度：{Object.keys(answers).length} / {questions.length} 題
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {questions.map((question, index) => (
            <div key={question.text} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">第 {index + 1} 題 / {questions.length}</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{question.text}</p>
                </div>
                {answers[index] && (
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {traitLabels[question.trait].split(' ')[0]} +{answers[index]}
                  </span>
                )}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleSelect(index, value as Answer)}
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      answers[index] === value
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200'
                    }`}
                  >
                    {value} 分
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-3 rounded-2xl bg-slate-100 px-4 py-4 text-sm text-slate-700">
            <span className="font-semibold text-slate-900">提示</span>
            <span>5 分代表非常符合，1 分代表不太符合。</span>
            <span>全部回答完畢後下方會出現溝通建議。</span>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">即時分數趨勢</h2>
            <span className="text-xs text-slate-500">隨時更新</span>
          </div>
          {renderBars()}
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">如何解讀？</p>
            <p className="mt-1 leading-6">
              分數越高代表你在該象限的慣性越明顯，實務上會混合存在。完成全部題目即可看到溝通建議。
            </p>
          </div>
        </div>
      </div>

      {Object.keys(answers).length === questions.length && (
        <div>
          <button
            onClick={() => setShowResult(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white shadow hover:bg-indigo-500"
          >
            查看結果與話術建議
          </button>
        </div>
      )}

      {showResult && resultBlock}
    </section>
  );
}
