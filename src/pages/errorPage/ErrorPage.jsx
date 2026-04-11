import React, { useEffect, useState } from 'react';

const glitchKeyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Syne+Mono&display=swap');

  @keyframes flicker {
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
    20%, 24%, 55% { opacity: 0.4; }
  }

  @keyframes glitch {
    0% { clip-path: inset(40% 0 61% 0); transform: translate(-4px, 0); }
    20% { clip-path: inset(92% 0 1% 0); transform: translate(4px, 0); }
    40% { clip-path: inset(43% 0 1% 0); transform: translate(-4px, 0); }
    60% { clip-path: inset(25% 0 58% 0); transform: translate(4px, 0); }
    80% { clip-path: inset(54% 0 7% 0); transform: translate(-4px, 0); }
    100% { clip-path: inset(58% 0 43% 0); transform: translate(0); }
  }

  @keyframes glitch2 {
    0% { clip-path: inset(50% 0 30% 0); transform: translate(4px, 0); }
    25% { clip-path: inset(10% 0 85% 0); transform: translate(-4px, 0); }
    50% { clip-path: inset(70% 0 5% 0); transform: translate(4px, 0); }
    75% { clip-path: inset(20% 0 65% 0); transform: translate(-4px, 0); }
    100% { clip-path: inset(35% 0 55% 0); transform: translate(0); }
  }

  @keyframes scanlines {
    0% { background-position: 0 0; }
    100% { background-position: 0 100%; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse-ring {
    0% { transform: scale(0.85); opacity: 0.6; }
    50% { transform: scale(1.05); opacity: 0.2; }
    100% { transform: scale(0.85); opacity: 0.6; }
  }

  @keyframes noise {
    0%, 100% { background-position: 0 0; }
    10% { background-position: -5% -10%; }
    20% { background-position: -15% 5%; }
    30% { background-position: 7% -25%; }
    40% { background-position: 20% 25%; }
    50% { background-position: -25% 10%; }
    60% { background-position: 15% 5%; }
    70% { background-position: 0% 15%; }
    80% { background-position: 25% 35%; }
    90% { background-position: -10% 10%; }
  }

  @keyframes drift {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-8px) rotate(1deg); }
    66% { transform: translateY(4px) rotate(-1deg); }
  }
`;

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Syne', sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  noiseOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
    opacity: 0.4,
    pointerEvents: 'none',
    zIndex: 1,
    animation: 'noise 0.5s steps(1) infinite',
  },
  scanlines: {
    position: 'fixed',
    inset: 0,
    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
    pointerEvents: 'none',
    zIndex: 2,
  },
  grid: {
    position: 'fixed',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,70,70,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,70,70,0.04) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
    pointerEvents: 'none',
    zIndex: 0,
  },
  container: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    maxWidth: '640px',
    padding: '40px 32px',
    animation: 'fadeUp 0.7s ease both',
  },
  glitchWrapper: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '8px',
  },
  code: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(100px, 20vw, 180px)',
    lineHeight: 1,
    color: '#fff',
    letterSpacing: '-4px',
    position: 'relative',
    display: 'block',
    textShadow: '0 0 40px rgba(255,70,70,0.3)',
    animation: 'flicker 4s infinite',
  },
  codeBefore: {
    content: '"404"',
    position: 'absolute',
    top: 0, left: 0,
    color: '#ff4646',
    animation: 'glitch 2.5s infinite linear alternate-reverse',
  },
  codeAfter: {
    content: '"404"',
    position: 'absolute',
    top: 0, left: 0,
    color: '#46d9ff',
    animation: 'glitch2 2.5s infinite linear alternate-reverse',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,70,70,0.1)',
    border: '1px solid rgba(255,70,70,0.3)',
    borderRadius: '100px',
    padding: '6px 16px',
    marginBottom: '24px',
    animation: 'fadeUp 0.7s 0.2s ease both',
    opacity: 0,
  },
  dot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#ff4646',
    boxShadow: '0 0 8px #ff4646',
    animation: 'flicker 2s infinite',
  },
  badgeText: {
    fontFamily: "'Syne Mono', monospace",
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#ff4646',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 'clamp(22px, 4vw, 30px)',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '14px',
    letterSpacing: '-0.5px',
    animation: 'fadeUp 0.7s 0.35s ease both',
    opacity: 0,
  },
  description: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 1.7,
    marginBottom: '40px',
    animation: 'fadeUp 0.7s 0.45s ease both',
    opacity: 0,
    fontWeight: 400,
  },
  actions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    animation: 'fadeUp 0.7s 0.55s ease both',
    opacity: 0,
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: '#ff4646',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '13px 28px',
    fontSize: '14px',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    letterSpacing: '0.3px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    boxShadow: '0 0 24px rgba(255,70,70,0.3)',
  },
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '6px',
    padding: '13px 28px',
    fontSize: '14px',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
  },
  divider: {
    width: '1px',
    height: '60px',
    background: 'linear-gradient(to bottom, transparent, rgba(255,70,70,0.3), transparent)',
    margin: '48px auto',
    animation: 'fadeUp 0.7s 0.65s ease both',
    opacity: 0,
  },
  statusRow: {
    display: 'flex',
    gap: '32px',
    justifyContent: 'center',
    animation: 'fadeUp 0.7s 0.75s ease both',
    opacity: 0,
    flexWrap: 'wrap',
  },
  statusItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'center',
  },
  statusLabel: {
    fontFamily: "'Syne Mono', monospace",
    fontSize: '10px',
    letterSpacing: '2px',
    color: 'rgba(255,255,255,0.25)',
    textTransform: 'uppercase',
  },
  statusValue: {
    fontFamily: "'Syne Mono', monospace",
    fontSize: '12px',
    color: 'rgba(255,255,255,0.55)',
  },
};

const GlitchCode = () => {
  return (
    <div style={styles.glitchWrapper}>
      <span style={styles.code} data-text="404">
        404
      </span>
      <span style={{...styles.code, ...styles.codeBefore, position: 'absolute', top: 0, left: 0, color: '#ff4646', animation: 'glitch 2.5s infinite linear alternate-reverse'}}>
        404
      </span>
      <span style={{...styles.code, ...styles.codeAfter, position: 'absolute', top: 0, left: 0, color: '#46d9ff', opacity: 0.5, animation: 'glitch2 3s infinite linear alternate-reverse'}}>
        404
      </span>
    </div>
  );
};

const ErrorPage = () => {
  const [time, setTime] = useState(new Date());
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{glitchKeyframes}</style>
      <div style={styles.page}>
        <div style={styles.grid} />
        <div style={styles.noiseOverlay} />
        <div style={styles.scanlines} />

        {/* Ambient glow blobs */}
        <div style={{
          position: 'fixed', top: '20%', left: '10%',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,70,70,0.08) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
          animation: 'drift 6s ease-in-out infinite',
        }} />
        <div style={{
          position: 'fixed', bottom: '15%', right: '10%',
          width: '350px', height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(70,217,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
          animation: 'drift 8s ease-in-out infinite reverse',
        }} />

        <div style={styles.container}>
          {/* Badge */}
          <div style={styles.badge}>
            <div style={styles.dot} />
            <span style={styles.badgeText}>Page not found</span>
          </div>

          {/* Glitch 404 */}
          <GlitchCode />

          {/* Title */}
          <h1 style={styles.title}>
            Lost in the void
          </h1>

          {/* Description */}
          <p style={styles.description}>
            The page you're looking for doesn't exist, was moved,<br />
            or you may have mistyped the address.
          </p>

          {/* Actions */}
          <div style={styles.actions}>
            <a
              href="/"
              style={{
                ...styles.btnPrimary,
                ...(hoverPrimary ? {
                  background: '#ff2c2c',
                  boxShadow: '0 0 36px rgba(255,70,70,0.5)',
                  transform: 'translateY(-1px)',
                } : {}),
              }}
              onMouseEnter={() => setHoverPrimary(true)}
              onMouseLeave={() => setHoverPrimary(false)}
            >
              ← Go Home
            </a>
            <button
              onClick={() => window.history.back()}
              style={{
                ...styles.btnSecondary,
                ...(hoverSecondary ? {
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#fff',
                  transform: 'translateY(-1px)',
                } : {}),
              }}
              onMouseEnter={() => setHoverSecondary(true)}
              onMouseLeave={() => setHoverSecondary(false)}
            >
              Go Back
            </button>
          </div>

          {/* Divider */}
          <div style={styles.divider} />

          {/* Status row */}
          <div style={styles.statusRow}>
            <div style={styles.statusItem}>
              <span style={styles.statusLabel}>Error Code</span>
              <span style={styles.statusValue}>404</span>
            </div>
            <div style={styles.statusItem}>
              <span style={styles.statusLabel}>Status</span>
              <span style={{...styles.statusValue, color: '#ff4646'}}>● Not Found</span>
            </div>
            <div style={styles.statusItem}>
              <span style={styles.statusLabel}>Timestamp</span>
              <span style={styles.statusValue}>{time.toLocaleTimeString()}</span>
            </div>
            <div style={styles.statusItem}>
              <span style={styles.statusLabel}>Request</span>
              <span style={styles.statusValue}>{typeof window !== 'undefined' ? window.location.pathname.slice(0, 14) || '/' : '/'}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;