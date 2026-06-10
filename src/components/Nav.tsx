import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT' },
  { href: '/works', label: 'WORKS' },
  { href: '/blog', label: 'BLOG' },
  { href: '/react-demo', label: 'REACT' },
  { href: '/contact', label: 'CONTACT' },
];

export default function Nav({ currentPath }: { currentPath: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // スクロールで背景を濃くする
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // メニューが開いているときは背景スクロールを止める
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: scrolled || menuOpen
          ? 'rgba(8, 12, 16, 0.97)'
          : 'rgba(8, 12, 16, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.3s',
      }}>
        {/* ロゴ */}
        <a href="/" style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.85rem',
          color: 'var(--accent)',
          letterSpacing: '0.15em',
          textDecoration: 'none',
        }}>
          {'> '}
          <span style={{ color: 'var(--text)' }}>YOUR_NAME</span>
          <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--accent)' }}>_</span>
        </a>

        {/* デスクトップ用リンク */}
        <ul style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }} className="desktop-nav">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  color: currentPath === link.href ? 'var(--accent)' : 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = currentPath === link.href ? 'var(--accent)' : 'var(--muted)')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ハンバーガーボタン（モバイル用） */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="hamburger"
          aria-label="メニューを開く"
          style={{
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <span style={{
            display: 'block', width: '22px', height: '2px',
            background: menuOpen ? 'var(--accent)' : 'var(--text)',
            transition: 'transform 0.3s, opacity 0.3s',
            transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2px',
            background: menuOpen ? 'var(--accent)' : 'var(--text)',
            transition: 'opacity 0.3s',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2px',
            background: menuOpen ? 'var(--accent)' : 'var(--text)',
            transition: 'transform 0.3s, opacity 0.3s',
            transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </nav>

      {/* モバイル用フルスクリーンメニュー */}
      <div
        className="mobile-menu"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'var(--bg)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2.5rem',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.3s',
        }}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '1.5rem',
              letterSpacing: '0.2em',
              color: currentPath === link.href ? 'var(--accent)' : 'var(--text)',
              textDecoration: 'none',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `transform 0.4s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms, opacity 0.4s ${i * 60}ms, color 0.2s`,
              opacity: menuOpen ? 1 : 0,
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
