// DonistaVideo3.tsx
import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const DonistaVideo3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Counter Logik
  const durationInSeconds = 2;
  const totalFrames = durationInSeconds * fps;
  const targetAmount = 300;
  const progress = Math.min(frame / totalFrames, 1);
  const currentAmount = Math.floor(targetAmount * progress);

  const showButton = frame > totalFrames;

  const buttonX = width / 2 - 150;
  const buttonY = height / 2 - 40;
  const buttonWidth = 300;
  const buttonHeight = 80;
  const buttonCenterX = buttonX + buttonWidth / 2;
  const buttonCenterY = buttonY + buttonHeight / 2;

  const mouseTravelFrames = 20;
  const mouseX = interpolate(frame - totalFrames, [0, mouseTravelFrames], [width + 50, buttonCenterX], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const mouseYStart = buttonCenterY + 50;
  const mouseY = interpolate(frame - totalFrames, [0, mouseTravelFrames], [mouseYStart, buttonCenterY], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const clickProgress = Math.min(Math.max((frame - totalFrames - mouseTravelFrames) / 10, 0), 1);
  const cursorScale = interpolate(clickProgress, [0, 0.5, 1], [1, 1.5, 1]);

  const distance = Math.sqrt((mouseX - buttonCenterX) ** 2 + (mouseY - buttonCenterY) ** 2);
  let hoverScale = 1;
  if (distance < 5) {
    const hoverFrame = frame - totalFrames - mouseTravelFrames;
    hoverScale = interpolate(hoverFrame, [0, 10, 20], [1, 1.2, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  }

  const numConfetti = 80;
  const confetti = useMemo(() => {
    const arr = [];
    for (let i = 0; i < numConfetti; i++) {
      arr.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 15 + Math.random() * 15,
        color: ["#FF0000", "#00FF00", "#0000FF", "#FFD700", "#FF69B4"][Math.floor(Math.random() * 5)],
        rotation: Math.random() * 360,
        direction: Math.random() * 360,
        speed: 0.5 + Math.random() * 1,
        angle: Math.random() * 360,
      });
    }
    return arr;
  }, [width, height]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee, #ff9a9e)`,
        backgroundSize: "400% 400%",
        animation: `shimmer ${totalFrames / fps}s ease infinite`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

     {/* Überschrift */}
<div
  style={{
    position: "absolute",
    top: 280, // weiter unten
    width: "100%",
    textAlign: "center",
    fontSize: 100, // größer
    fontWeight: "bold",
    color: "#000000", // schwarz
    textShadow: "2px 2px 8px rgba(255,255,255,0.3)", // leichter Schatten für Kontrast
    zIndex: 10,
  }}
>
  Spenden-Countdown
</div>


      {/* Countdown */}
      {frame <= totalFrames && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 25,
            backgroundColor: "#222",
            padding: "50px 70px",
            borderRadius: 25,
            boxShadow: "0 25px 70px rgba(0,0,0,0.5)",
            perspective: 1000,
          }}
        >
          {String(currentAmount)
            .padStart(3, "0")
            .split("")
            .map((digit, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  width: 140,
                  height: 200,
                  backgroundColor: "#111",
                  borderRadius: 12,
                  boxShadow: "inset 0 -12px 22px rgba(0,0,0,0.5), 0 12px 35px rgba(0,0,0,0.3)",
                  color: "#fff",
                  fontSize: 140,
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "50%",
                    top: 0,
                    backgroundColor: "#333",
                    borderBottom: "2px solid #000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {digit}
                </div>
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "50%",
                    bottom: 0,
                    backgroundColor: "#222",
                    borderTop: "2px solid #000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: "rotateX(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {digit}
                </div>
              </div>
            ))}

          <div
            style={{
              fontSize: 90,
              fontWeight: "bold",
              color: "#FFD700",
              marginLeft: 25,
            }}
          >
            €
          </div>
        </div>
      )}

      {/* Button */}
      {showButton && (
        <button
          style={{
            position: "absolute",
            left: width / 2 - 260,
            top: height / 2 - 90,
            width: 520,
            height: 180,
            fontSize: 65,
            fontWeight: "bold",
            backgroundColor: "#000000ff",
            color: "#fff",
            border: "none",
            borderRadius: 25,
            cursor: "pointer",
            transform: `scale(${hoverScale})`,
            transformOrigin: "center",
          }}
        >
          Jetzt shoppen und Gutes tun
        </button>
      )}

      {/* Mauszeiger */}
      <div
        style={{
          position: "absolute",
          width: 20,
          height: 30,
          backgroundColor: "white",
          clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
          left: mouseX,
          top: mouseY,
          transform: `translate(-50%, -50%) scale(${cursorScale})`,
          transformOrigin: "center",
        }}
      />

      {/* Konfetti */}
{showButton &&
  confetti.map((c, i) => {
    // langsamer: multipliziere mit kleinerem Faktor
    const distance = (frame - totalFrames) * c.speed * 20; 
    const x = c.x + Math.cos((c.direction * Math.PI) / 180) * distance;
    const y = c.y + Math.sin((c.direction * Math.PI) / 180) * distance;
    const angle = (c.angle + frame * 10) % 360;

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: c.size,
          height: c.size / 3,
          backgroundColor: c.color,
          transform: `rotate(${angle}deg)`,
          borderRadius: 2,
        }}
      />
    );
  })}

    </AbsoluteFill>
  );
};
