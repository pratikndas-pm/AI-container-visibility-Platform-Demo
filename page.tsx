export default function Page() {
  return (
    <section className="grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-5xl font-extrabold leading-tight">
          Predict <span className="text-brand">Revised ETAs</span> & <span className="text-brand">Delay Risk</span>
        </h1>
        <p className="mt-5 text-slate-300">
          A professional AI demo for container logistics — built with Next.js, Tailwind, and API routes. 
          Deploy instantly on Vercel, 100% web-based.
        </p>
        <div className="mt-7 flex gap-3">
          <a className="btn" href="/demo">🚀 Launch Live Demo</a>
        </div>
      </div>
    </section>
  );
}