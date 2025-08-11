import React from "react";
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

export const DonistaVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Szene 1: Donista fliegt von unten rein (frames 0-60)
  const flyInProgress = spring({
    frame,
    fps,
    config: { damping: 15 },
  });
  const flyInY = interpolate(flyInProgress, [0, 1], [300, 0], {
    extrapolateRight: "clamp",
  });

  // Szene 2: Text 1 erscheint (frames 60-120)
  const text1Opacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const text1TranslateX = interpolate(frame, [60, 90], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Szene 3: Text 2 erscheint (frames 100-150)
  const text2Opacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const text2TranslateX = interpolate(frame, [100, 130], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Szene 4: Donista winkt (frames 150-200)
  const waveProgress = spring({
    frame: frame - 150,
    fps,
    config: { mass: 1, damping: 5, stiffness: 100 },
  });
  const waveRotation = Math.sin(waveProgress * Math.PI * 4) * 15; // schwingt hin und her

  // Hintergrundfarbe wechselt in der letzten Szene (ab frame 140)
  const bgColorProgress = interpolate(frame, [140, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgColor = `rgba(144, 238, 144, ${bgColorProgress})`; // hellgrün

  return (
    <AbsoluteFill
      style={{
        backgroundColor: frame < 140 ? "#f0f8ff" : bgColor,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        color: "#222",
        padding: 40,
      }}
    >
      {/* Donista Figur */}
      <div
        style={{
          fontSize: 140,
          transform: `translateY(${flyInY}px) rotate(${waveRotation}deg)`,
          opacity: frame < 200 ? 1 : 0,
          transition: "opacity 0.3s",
          userSelect: "none",
          cursor: "default",
        }}
      >
        🦸‍♀️ Donista
      </div>

      {/* Text 1 */}
      <div
        style={{
          fontSize: 45,
          marginTop: 30,
          opacity: text1Opacity,
          transform: `translateX(${text1TranslateX}px)`,
          maxWidth: 900,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Hi! I'm Donista — your friendly helper for shopping & donating easily.
      </div>

      {/* Text 2 */}
      <div
        style={{
          fontSize: 35,
          marginTop: 15,
          opacity: text2Opacity,
          transform: `translateX(${text2TranslateX}px)`,
          maxWidth: 900,
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        I help you support causes while you shop online — without any extra cost!
      </div>

      {/* Winken-Text am Ende */}
      <Sequence from={180}>
        <div
          style={{
            marginTop: 60,
            fontSize: 30,
            color: "#2c662d",
            fontWeight: "600",
            opacity: interpolate(frame, [180, 200], [0, 1]),
            animation: "pulse 1s infinite",
          }}
        >
          Thanks for watching! 👋
        </div>
      </Sequence>

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </AbsoluteFill>
  );
};
