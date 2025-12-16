export type Trait = 'D' | 'I' | 'S' | 'C';

const traitLabels: Record<Trait, string> = {
  D: 'Dominance',
  I: 'Influence',
  S: 'Steadiness',
  C: 'Conscientiousness',
};

const questions: { text: string; trait: Trait }[] = [
  { text: '我喜歡快速決策，勇於承擔風險。', trait: 'D' },
  { text: '我樂於表達並帶動他人情緒。', trait: 'I' },
  { text: '我重視團隊和諧，願意傾聽。', trait: 'S' },
  { text: '我在意細節，追求高品質的成果。', trait: 'C' },
];

const initialScores: Record<Trait, number> = {
  D: 0,
  I: 0,
  S: 0,
  C: 0,
};

export default function DiscTestPage() {
  const scores = questions.reduce<Record<Trait, number>>((acc, { trait }) => {
    return { ...acc, [trait]: acc[trait] + 1 };
  }, initialScores);

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">DISC 測驗示例</h1>
      <section className="space-y-4">
        {questions.map((q) => (
          <article key={q.text} className="rounded border p-4 shadow-sm">
            <p className="font-medium">{q.text}</p>
            <p className="text-sm text-gray-600">對應維度：{traitLabels[q.trait]}</p>
          </article>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">目前累積結果</h2>
        <ul className="list-disc pl-6">
          {(Object.keys(scores) as Trait[]).map((trait) => (
            <li key={trait}>
              {traitLabels[trait]}：{scores[trait]}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
