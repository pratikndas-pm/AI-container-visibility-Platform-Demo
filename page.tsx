import Hello from "@/components/Hello";

export default function Page() {
  return (
    <section>
      <h1>Next.js is ready ✅</h1>
      <p>
        This starter fixes the <code>next.config.ts</code> build error by using <strong>next.config.mjs</strong>.
      </p>
      <Hello name="Pratik" />
      <ul>
        <li>TypeScript + App Router</li>
        <li>API route at <code>/api/health</code></li>
        <li>Strict mode enabled</li>
      </ul>
    </section>
  );
}
