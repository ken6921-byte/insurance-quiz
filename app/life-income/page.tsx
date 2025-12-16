'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ctaLinks } from '@/config/ctaLinks';

const lifeCostMap: Record<string, number> = {
  '3萬以下': 2.8,
  '3-5萬': 4,
  '5-8萬': 6.5,
  '8萬以上': 9,
};

type WorkUntil = 55 | 60 | 65 | '不確定';
type FamilyStatus = '單身' | '已婚' | '已婚+小孩';
type Mortgage = '無' | '有-壓力不大' | '有-壓力偏高';
type BreakImpact = '幾乎沒影響' | '會動用存款' | '會出現明顯缺口';

export default function LifeIncomePage() {
  const [age, setAge] = useState(30);
  const [workUntil, setWorkUntil] = useState<WorkUntil>(60);
  const [familyStatus, setFamilyStatus] = useState<FamilyStatus>('單身');
  const [kids, setKids] = useState('1');
  const [mortgage, setMortgage] = useState<Mortgage>('無');
  const [breakImpact, setBreakImpact] = useState<BreakImpact>('會動用存款');
  const [lifeCost, setLifeCost] = useState<keyof typeof lifeCostMap>('3-5萬');
  const [contact, setContact] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const estimated = useMemo(() => {
    const workingYears = (workUntil === '不確定' ? 60 : workUntil) - age;
    const yearlyBase = lifeCostMap[lifeCost] * 12;

    const familyFactor = familyStatus === '單身' ? 1 : familyStatus === '已婚' ? 1.25 : 1.6;
    const kidFactor = familyStatus === '已婚+小孩' ? (kids === '3+' ? 1.25 : kids === '2' ? 1.15 : 1.05) : 1;
    const mortgageFactor = mortgage === '無' ? 1 : mortgage === '有-壓力不大' ? 1.1 : 1.2;
    const breakFactor = breakImpact === '幾乎沒影響' ? 1 : breakImpact === '會動用存款' ? 1.1 : 1.25;

    const total = yearlyBase * workingYears * familyFactor * kidFactor * mortgageFactor * breakFactor;
    return Math.max(0, Math.round(total / 10) / 100); // 轉成萬
  }, [age, workUntil, lifeCost, familyStatus, kids, mortgage, breakImpact]);

  const progress = useMemo(() => {
    const baseYears = (workUntil === '不確定' ? 60 : workUntil) - 18;
    const passed = age - 18;
    const ratio = Math.min(1, Math.max(0, passed / baseYears));
    return Math.round(ratio * 100);
  }, [age, workUntil]);

  const handleUnlock = () => {
    if (contact.trim()) {
      setUnlocked(true);
    }
  };

  const infoList = [
    '估算僅供溝通參考，請搭配實際收支與保障規劃。',
    '選擇「不確定」時，系統以 60 歲為推估退休年齡。',
    '主數字為「至少」需要累積的生涯收入，不含投資報酬率。',
  ];

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold text-emerald-600">互動計算器</p>
        <h1 className="text-3xl font-bold text-slate-900">一生該賺多少錢？</h1>
        <p className="text-slate-700">
          依照你的生活型態估算需要累積的總收入，中途停下來可能才是最大風險。
        </p>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-2 bg-emerald-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-slate-600">人生進度條：{progress}%</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Q1</p>
                <h3 className="text-lg font-semibold text-slate-900">目前年齡</h3>
              </div>
              <span className="text-sm text-slate-500">18 - 65 歲</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <input
                type="range"
                min={18}
                max={65}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full"
              />
              <span className="min-w-[56px] rounded-lg bg-emerald-50 px-3 py-2 text-center text-sm font-semibold text-emerald-700">
                {age} 歲
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <p className="text-sm text-slate-500">Q2</p>
              <h3 className="text-lg font-semibold text-slate-900">預計工作到幾歲？</h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[55, 60, 65, '不確定'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setWorkUntil(option as WorkUntil)}
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      workUntil === option
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-200'
                    }`}
                  >
                    {option} {option === '不確定' && '(暫以 60 歲估算)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <p className="text-sm text-slate-500">Q3</p>
              <h3 className="text-lg font-semibold text-slate-900">目前家庭狀態</h3>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {(['單身', '已婚', '已婚+小孩'] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setFamilyStatus(option)}
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      familyStatus === option
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {familyStatus === '已婚+小孩' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <p className="text-sm text-slate-500">Q4</p>
                <h3 className="text-lg font-semibold text-slate-900">小孩數量</h3>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {['1', '2', '3+'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setKids(option)}
                      className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                        kids === option
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <p className="text-sm text-slate-500">Q5</p>
                <h3 className="text-lg font-semibold text-slate-900">房貸狀態</h3>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {(['無', '有-壓力不大', '有-壓力偏高'] as const).map((option) => (
                    <button
                      key={option}
                      onClick={() => setMortgage(option)}
                      className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                        mortgage === option
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <p className="text-sm text-slate-500">Q6</p>
              <h3 className="text-lg font-semibold text-slate-900">收入中斷一年會如何？</h3>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {(['幾乎沒影響', '會動用存款', '會出現明顯缺口'] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setBreakImpact(option)}
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      breakImpact === option
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <p className="text-sm text-slate-500">生活費級距</p>
              <h3 className="text-lg font-semibold text-slate-900">含房租/房貸、日常支出</h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(Object.keys(lifeCostMap) as Array<keyof typeof lifeCostMap>).map((option) => (
                  <button
                    key={option}
                    onClick={() => setLifeCost(option)}
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      lifeCost === option
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="rounded-xl bg-emerald-50 p-4">
            <p className="text-sm text-emerald-700">估算結果</p>
            <p className="mt-2 text-3xl font-bold text-emerald-900">約 {estimated.toLocaleString()} 萬</p>
            <p className="mt-1 text-sm text-emerald-700">至少需要累積的生涯收入，盡早規劃保障與儲蓄。</p>
            <p className="mt-3 text-sm text-emerald-900">真正的風險不是你賺不夠，是中途不能停。</p>
            <Link
              href={ctaLinks.lineInvite}
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-lime-400 px-4 py-3 font-semibold text-slate-900 shadow hover:bg-lime-300"
            >
              加入 LINE 看完整分析
            </Link>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">名單收集（可選）</p>
            <p className="mt-1">留下 Email 或電話，即可解鎖完整版分析文字。</p>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="輸入 Email 或電話"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
              />
              <button
                onClick={handleUnlock}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-500"
              >
                解鎖
              </button>
            </div>
            {unlocked ? (
              <p className="mt-2 rounded-lg bg-white px-3 py-2 text-emerald-700 ring-1 ring-emerald-100">
                感謝留下聯繫方式！建議預留 6-12 個月緊急預備金並規劃失能/醫療保障，確保收入不中斷。
              </p>
            ) : (
              <p className="mt-2 text-xs text-slate-500">僅在瀏覽器端保存，不會傳送資料。</p>
            )}
          </div>

          <div className="space-y-2 rounded-xl bg-white p-4 text-sm text-slate-700 ring-1 ring-slate-100">
            <p className="font-semibold text-slate-900">備註</p>
            <ul className="list-disc space-y-1 pl-4">
              {infoList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
