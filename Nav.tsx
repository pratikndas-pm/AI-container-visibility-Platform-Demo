import Link from "next/link";

export default function Nav() {
  return (
    <nav style={{display:'flex', gap:16, padding:'12px 0'}}>
      <Link href="/">Home</Link>
      <Link href="/api/health">API Health</Link>
    </nav>
  );
}
