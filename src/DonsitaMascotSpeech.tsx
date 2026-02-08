import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";

// DonistaVideo4 – Panda groß in der Mitte, Sprechblasen nacheinander über ihm + Herz-Feuerwerk ab der 2. Bubble

const Panda: React.FC = () => {
  return (
    <img
      src={require("./Panda.png")}
      style={{
        width: 1500,
        height: "auto",
        position: "absolute",
        bottom: 10,
        left: "50%",
        transform: "translateX(-50%)",
      }}
      alt="Donista Panda"
    />
  );
};

type BubbleProps = {
  text: string;
  start: number;
  duration: number;
  y?: number;
  scaleFrom?: number;
  fontSize?: number;
  padding?: string;
};

const SpeechBubble: React.FC<BubbleProps> = ({
  text,
  start,
  duration,
  y = 820,
  scaleFrom = 0.86,
  fontSize = 50,
  padding = "28px 36px",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progressIn = spring({
    frame: frame - start,
    fps,
    config: { damping: 200, stiffness: 120 },
  });

  const progressOut = spring({
    frame: frame - (start + duration - 15),
    fps,
    config: { damping: 200, stiffness: 120 },
  });

  const visible = interpolate(progressOut, [0, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(progressIn, [0, 1], [scaleFrom, 1]);
  const popY = interpolate(progressIn, [0, 1], [8, 0]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: y,
        left: "50%",
        transform: `translateX(-50%) translateY(${popY}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          position: "relative",
          background: "#ffffff",
          padding,
          borderRadius: 28,
          fontSize,
          fontFamily: "Inter, sans-serif",
          color: "#111827",
          boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
          maxWidth: 1200,
          opacity: visible,
          textAlign: "center",
          border: "2px solid #e5e7eb",
        }}
      >
        {text}
        {/* Tail – grauer Rand */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: -22,
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "18px solid transparent",
            borderRight: "18px solid transparent",
            borderTop: "22px solid #e5e7eb",
          }}
        />
        {/* Tail – innen weiß */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: -20,
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "16px solid transparent",
            borderRight: "16px solid transparent",
            borderTop: "20px solid #ffffff",
          }}
        />
      </div>
    </div>
  );
};

// --------- Hintergrund ---------
// --------- Hintergrund ---------
const AnimatedBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const breathe = 1 + Math.sin(frame / (fps * 2.2)) * 0.02;
  const hue = (frame * 0.15) % 360; // langsamerer Farbshift

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            // weiche Pastell-Blobs
            "radial-gradient(1200px 700px at 20% 30%, rgba(255,182,193,0.35), transparent 60%)," + // light pink
            "radial-gradient(900px 900px at 85% 20%, rgba(186,225,255,0.28), transparent 55%)," + // baby blue
            "radial-gradient(1000px 800px at 70% 85%, rgba(221,160,221,0.28), transparent 55%)," + // plum
            // Hintergrund-Verlauf pastellig
            "linear-gradient(180deg, #ffe6f0 0%, #fcd5f5 40%, #e0d7ff 100%)",
          filter: `hue-rotate(${hue}deg)`,
          transform: `scale(${breathe})`,
          transition: "filter 200ms linear",
        }}
      />
      {/* feines Raster */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px, 48px 48px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          pointerEvents: "none",
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 220px rgba(0,0,0,0.45)",
        }}
      />
    </AbsoluteFill>
  );
};


// --------- Herz-Feuerwerk (erst Herz, dann stärkere Explosion) ---------
const HeartFireworks: React.FC<{ start: number; duration: number }> = ({
  start,
  duration,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const particles = 100; // mehr Partikel für dichtere Form
  const active = frame >= start && frame < start + duration;
  if (!active) return null;

  const t = (frame - start) / duration; // 0..1

  return (
    <AbsoluteFill>
      {new Array(particles).fill(0).map((_, i) => {
        // Herz-Kurve
        const theta = (i / particles) * 2 * Math.PI;
        const xh = 16 * Math.pow(Math.sin(theta), 3);
        const yh =
          13 * Math.cos(theta) -
          5 * Math.cos(2 * theta) -
          2 * Math.cos(3 * theta) -
          Math.cos(4 * theta);

        let x = width / 2;
        let y = height / 2;
        let opacity = 1;
        let size = 6;

       
          // Herz formt sich langsam
          const progress = t / 0.5;
          const scale = 26; // leicht größer
          x += xh * scale * progress;
          y -= yh * scale * progress;
          opacity = progress;
        

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: `hsl(${(i * 15) % 360}, 80%, 60%)`,
              opacity,
              boxShadow: `0 0 15px hsl(${(i * 15) % 360}, 80%, 60%)`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};


export const DonistaVideo4: React.FC = () => {
  return (
    <AbsoluteFill>
      <AnimatedBackground />
      <Panda />

      {/* 1. Bubble */}
      <Sequence from={0}>
        <SpeechBubble
          text="Und heute schon gespendet?"
          start={0}
          duration={60}
          y={1500}
        />
      </Sequence>

      {/* 2. Bubble mit Herz-Feuerwerk (3 Pulse) */}
      <Sequence from={70}>
        <>
          <SpeechBubble
            text="Nein? Dann gehe jetzt auf donista.org!"
            start={0}
            duration={60}
            y={1500}
          />
          <HeartFireworks start={0} duration={60} />
        </>
      </Sequence>

      {/* 3. Bubble – größer */}
      <Sequence from={140}>
        <SpeechBubble
          text="Hier spendest du ohne Extrakosten. Jetzt auf donista.org!"
          start={0}
          duration={80}
          fontSize={64}
          padding="40px 56px"
          scaleFrom={0.84}
          y={1400}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export default DonistaVideo4;
