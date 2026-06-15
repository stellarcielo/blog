import { useState, useEffect, useRef } from "react";

type Menu = {
    href: string;
    label: string;
    children?: Menu[];
}

const defaultMenu: Menu[] = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/works', label: 'WORKS' },
    { href: '/blog', label: 'BLOG' },
    { href: '/contact', label: 'CONTACT' },
]

export default function ResponsiveMenu({ menu = defaultMenu}: { menu?: Menu[] }) {
    const [visibleMenu, setVisibleMenu] = useState<Menu[]>(menu);
    const [overflowMenu, setOverflowMenu] = useState<Menu[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const containerRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current) return;

            // 1. 親要素（コンテナ）の利用可能な横幅を取得
            // 2. 子要素（各メニュー項目）の幅を計算
            // 3. はみ出る要素を特定し、setVisibleMenu と setOverflowMenu に分配するロジック
        };

        // 初期描画時と画面リサイズ時に計算を実行
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [menu]);

    return (
        <div style={{
            display: 'inline-flex',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textDecoration: 'none',
            transition: 'color 0.2s',
        }}>
            <ul ref={containerRef} className="flex-menu">
                {/* 画面に収まるメニュー */}
                {visibleMenu.map(item => (
                    <li key={item.href}><a href={item.href}>{item.label}</a></li>
                ))}

                {/* はみ出たメニューがある場合だけ「MORE」を表示 */}
                {overflowMenu.length > 0 && (
                    <li className="more-dropdown">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>MORE ▼</button>
                        {isDropdownOpen && (
                            <ul className="dropdown-items">
                                {overflowMenu.map(item => (
                                    <li key={item.href}><a href={item.href}>{item.label}</a></li>
                                ))}
                            </ul>
                        )}
                    </li>
                )}
            </ul>
        </div>

    );
}