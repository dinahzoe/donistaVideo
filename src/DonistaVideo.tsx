import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';

// Einfaches Strichmännchen SVG, etwas verbessert für Animation
const Stickman: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="80" height="160" viewBox="0 0 80 160" style={style}>
    {/* Kopf */}
    <circle cx="40" cy="30" r="20" stroke="black" strokeWidth="3" fill="none" />
    {/* Körper */}
    <line x1="40" y1="50" x2="40" y2="110" stroke="black" strokeWidth="3" />
    {/* Arme */}
    <line x1="10" y1="80" x2="70" y2="80" stroke="black" strokeWidth="3" />
    {/* Beine */}
    <line x1="40" y1="110" x2="10" y2="150" stroke="black" strokeWidth="3" />
    <line x1="40" y1="110" x2="70" y2="150" stroke="black" strokeWidth="3" />
  </svg>
);

// Scheinwerfer als halbtransparenter gelber Lichtkreis
const Spotlight: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" style={style}>
    <circle cx="100" cy="100" r="90" fill="yellow" opacity={0.2} />
    <polygon points="100,100 180,190 20,190" fill="yellow" opacity={0.3} />
  </svg>
);

// Laptop SVG mit animierten Shop-Kacheln (farbige Rechtecke)
const Laptop: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="180" height="120" viewBox="0 0 180 120" style={style}>
    {/* Bildschirm */}
    <rect x="20" y="20" width="140" height="80" stroke="black" strokeWidth="3" fill="#ddd" rx={10} ry={10} />
    {/* Tastatur */}
    <rect x="40" y="100" width="100" height="10" stroke="black" strokeWidth="2" fill="#bbb" rx={3} ry={3} />
    {/* Onlineshops */}
    <rect x="35" y="35" width="35" height="25" fill="#4caf50" rx={5} ry={5} />
    <rect x="80" y="35" width="35" height="25" fill="#2196f3" rx={5} ry={5} />
    <rect x="125" y="35" width="35" height="25" fill="#f44336" rx={5} ry={5} />
  </svg>
);

// Weltkugel mit grüner Aufhellung
const Globe: React.FC<{ style?: React.CSSProperties; greenIntensity: number }> = ({ style, greenIntensity }) => {
  // clamp greenIntensity zwischen 0.2 und 1
  const green = Math.min(Math.max(greenIntensity, 0.2), 1);
  const fillColor = `rgba(34,139,34,${green})`; // grün mit variablem Alpha
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" style={style}>
      <circle cx="90" cy="90" r="80" stroke="black" strokeWidth="3" fill="#87ceeb" />
      {/* grüne Kontinente */}
      <path
        fill={fillColor}
        d="M50,60 Q65,25 100,50 T140,75 Q125,115 85,100 Q65,90 50,60 Z"
      />
    </svg>
  );
};

// Einfach animierte Münze als goldener Kreis
const Coin: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div
    style={{
      width: 25,
      height: 25,
      borderRadius: '50%',
      backgroundColor: 'gold',
      border: '2px solid orange',
      boxShadow: '0 0 8px orange',
      ...style,
    }}
  />
);

// Menschenmenge als einfache farbige Kreise
const Crowd: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{ display: 'flex', gap: 12, ...style }}>
    {[...Array(10)].map((_, i) => (
      <div
        key={i}
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          backgroundColor: '#FF7043',
          boxShadow: '0 0 12px #FF7043',
        }}
      />
    ))}
  </div>
);

export const DonistaVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Timing:
  // Szene 1: 0 - 60
  // Szene 2: 60 - 120
  // Szene 3: 120 - 180
  // Szene 4: 180 - 240
  // Szene 5: 240 - 300

  // ---------------- Szene 1 ----------------
  const scene1Opacity = interpolate(frame, [0, 15, 45, 60], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ---------------- Szene 2 ----------------
  const scene2Opacity = interpolate(frame, [60, 75, 105, 120], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scene2StickmanX = interpolate(frame, [60, 90], [-100, width / 3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scene2LaptopX = interpolate(frame, [60, 90], [width + 100, (width / 3) + 150], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ---------------- Szene 3 ----------------
  const scene3Opacity = interpolate(frame, [120, 135, 165, 180], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const globeGreenIntensity = interpolate(frame, [120, 180], [0.2, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ---------------- Szene 4 ----------------
  const scene4Opacity = interpolate(frame, [180, 195, 225, 240], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinY = interpolate(frame, [180, 240], [height + 50, height / 2 + 50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ---------------- Szene 5 ----------------
  const scene5Opacity = interpolate(frame, [240, 255, 285, 300], [0, 1, 1, 1], { extrapolateLeft: 'clamp' });

  // Münzen Animation: leichtes Pendeln & Aufsteigen
  const coinXOffsets = [0, 15, 30, 45, 60];
  const coinAnimations = coinXOffsets.map((offset, i) => {
    // Pendelbewegung in X Richtung
    const pendel = 5 * Math.sin((frame - 180) / 5 + i);
    return (width / 2) + offset + pendel;
  });

  // Menschenmenge - Pulsierende Opacity
  const crowdPulse = 0.5 + 0.5 * Math.sin((frame - 240) / 10);

  return (
    <AbsoluteFill style={{ backgroundColor: 'white', fontFamily: 'Arial, sans-serif', padding: 40 }}>
      {/* Szene 1 */}
      <div style={{
        opacity: scene1Opacity,
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}>
        <Spotlight style={{ position: 'absolute', top: 20, left: 100 }} />
        <div style={{ position: 'absolute', bottom: 100, left: 100 }}>
          <Stickman />
        </div>
        {/* Sprechblase */}
        <div style={{
          position: 'absolute',
          bottom: 170,
          left: 130,
          backgroundColor: 'white',
          border: '2px solid black',
          borderRadius: 15,
          padding: '15px 20px',
          maxWidth: 320,
          fontSize: 22,
          fontWeight: 'bold',
          userSelect: 'none',
          boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
        }}>
          Hi, kennst du eigentlich das Prinzip von Donista?
        </div>
      </div>

      {/* Szene 2 */}
      <div style={{
        opacity: scene2Opacity,
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
        <div style={{ position: 'absolute', bottom: 100, left: scene2StickmanX }}>
          <Stickman />
        </div>
        <div style={{ position: 'absolute', bottom: 100, left: scene2LaptopX }}>
          <Laptop />
        </div>
        <div style={{
          position: 'absolute',
          top: 30,
          left: 50,
          fontSize: 26,
          fontWeight: 'bold',
          maxWidth: 400,
          userSelect: 'none',
          color: '#333',
        }}>
          Mit Donista kannst du shoppen und dadurch Spenden generieren.
        </div>
      </div>

      {/* Szene 3 */}
      <div style={{
        opacity: scene3Opacity,
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
        <div style={{ position: 'absolute', bottom: 100, left: 100 }}>
          <Stickman />
        </div>
        <Globe style={{ position: 'absolute', top: 40, right: 100 }} greenIntensity={globeGreenIntensity} />
        <div style={{
          position: 'absolute',
          top: 30,
          left: 50,
          fontSize: 26,
          fontWeight: 'bold',
          maxWidth: 400,
          userSelect: 'none',
          color: '#333',
        }}>
          Die Spenden werden an deine Lieblingscharity gespendet.
        </div>
      </div>

      {/* Szene 4 */}
      <div style={{
        opacity: scene4Opacity,
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
        <div style={{
          position: 'absolute',
          top: 30,
          left: 50,
          fontSize: 26,
          fontWeight: 'bold',
          maxWidth: 400,
          userSelect: 'none',
          color: '#333',
        }}>
          Ohne Zusatzkosten!
        </div>
        {/* Münzen */}
        {coinAnimations.map((x, i) => (
          <Coin
            key={i}
            style={{
              position: 'absolute',
              bottom: coinY - i * 25,
              left: x,
              transform: `rotate(${(frame + i * 10) % 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* Szene 5 */}
      <div style={{
        opacity: scene5Opacity,
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
        <div style={{
          position: 'absolute',
          top: 30,
          left: 50,
          fontSize: 28,
          fontWeight: 'bold',
          maxWidth: 600,
          userSelect: 'none',
          color: '#333',
        }}>
          Mache die Welt ohne viel Aufwand zu einem besseren Ort:
        </div>
        <div style={{ position: 'absolute', bottom: 100, left: 100, opacity: crowdPulse }}>
          <Crowd />
        </div>
      </div>
    </AbsoluteFill>
  );
};
