import { useState, useEffect, useRef } from 'react';

type Skill = {
  name: string;
  level: number;
  color?: string;
};

const defaultSkills: Skill[] = [
  { name: 'TypeScript / JavaScript', level: 90 },
  { name: 'React / Next.js', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Python', level: 70 },
  { name: 'Docker / CI/CD', level: 65 },
  { name: 'Rust', level: 40 },
];

export default function SkillBars({ skills = defaultSkills }: { skills?: Skill[] }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer で画面に入ったらアニメーション開始
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {skills.map((skill, i) => (
        <div key={skill.name} style={{ marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text)' }}>{skill.name}</span>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--muted)',
              transition: 'opacity 0.3s',
              opacity: animated ? 1 : 0,
            }}>
              {skill.level}%
            </span>
          </div>
          <div style={{ height: '2px', background: 'var(--border)', position: 'relative' }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
              boxShadow: '0 0 8px rgba(0, 229, 255, 0.4)',
              width: animated ? `${skill.level}%` : '0%',
              transition: `width 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 80}ms`,
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}
