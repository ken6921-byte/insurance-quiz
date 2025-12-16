import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="space-y-6 rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">保險互動工具專區</h1>
      <p className="text-lg text-slate-700">
        這裡收錄了銷售現場常用的互動工具，幫助你用最直覺的方式和客戶討論需求。
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-white shadow hover:bg-slate-800"
          href="/tools"
        >
          前往工具清單
        </Link>
        <Link
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-slate-900 ring-1 ring-slate-200 hover:ring-slate-300"
          href="/disc-test"
        >
          立即試用 DISC 測驗
        </Link>
      </div>
    </section>
  );
}
