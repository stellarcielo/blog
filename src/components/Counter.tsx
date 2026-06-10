import { useState } from 'react';

// これがReactコンポーネントの基本形です
// useState で状態を管理し、ボタンクリックで再レンダリングされます
export default function Counter({ label = 'Count' }: { label?: string }) {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem 1.5rem',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      fontFamily: "'Space Mono', monospace",
    }}>
      <span style={{ fontSize: '0.72rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
        {label}
      </span>
      <button
        onClick={() => setCount(c => c - 1)}
        style={{
          width: '28px', height: '28px',
          background: 'transparent',
          border: '1px solid var(--border)',
          color: 'var(--muted)',
          cursor: 'pointer',
          fontSize: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >−</button>
      <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', minWidth: '2rem', textAlign: 'center' }}>
        {count}
      </span>
      <button
        onClick={() => setCount(c => c + 1)}
        style={{
          width: '28px', height: '28px',
          background: 'transparent',
          border: '1px solid var(--accent)',
          color: 'var(--accent)',
          cursor: 'pointer',
          fontSize: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >+</button>
      <button
        onClick={() => setCount(0)}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--muted)',
          cursor: 'pointer',
          fontSize: '0.65rem',
          letterSpacing: '0.1em',
          padding: 0,
        }}
      >RESET</button>
    </div>
  );
}
