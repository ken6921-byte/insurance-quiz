import Link from 'next/link';

const tools = [
  {
    title: 'DISC 測驗',
    description: '快速掌握客戶溝通風格，提供保險情境的話術建議。',
    href: '/disc-test',
  },
  {
    title: '一生該賺多少錢',
    description: '依據生活型態估算至少需要累積的收入與風險提醒。',
    href: '/life-income',
  },
];

export default function ToolsPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-500">工具清單</p>
        <h1 className="text-3xl font-bold text-slate-900">互動小工具</h1>
        <p className="text-slate-700">所有介面皆為繁體中文，可直接在現場使用。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="flex h-full flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:ring-slate-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">{tool.title}</h2>
              <span className="text-sm text-indigo-600">前往</span>
            </div>
            <p className="text-sm leading-6 text-slate-700">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
