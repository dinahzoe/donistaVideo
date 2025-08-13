import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, spring} from "remotion";

const INTRO_DURATION = 30;
const MOVE_DURATION = 50; // Mausbewegung leicht beschleunigt
const CLICK_AT = INTRO_DURATION + MOVE_DURATION + 10;
const CELEBRATE_DURATION = 90;

const COLORS = {
  bg: "#f8fafc",
  desk: "#e0f2fe",
  computer: "#ffffff",
  screenBg: "#e0e7ff",
  btn: "#bfdbfe",
  btnText: "#1f2937",
  glow: "#93c5fd",
  heart: "#fecdd3",
  text: "#334155",
};

export const DonationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();

  const introProgress = spring({frame, fps, durationInFrames: INTRO_DURATION, config: {damping: 200, stiffness: 120}});
  const introTranslateY = interpolate(introProgress, [0, 1], [40, 0]);
  const introOpacity = introProgress;

  const mouseMoveProgress = interpolate(frame, [INTRO_DURATION, INTRO_DURATION + MOVE_DURATION], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  const screenW = Math.min(width, 1100) * 0.8;
  const screenH = screenW * 0.6;
  const screenLeft = (width - screenW) / 2;
  const screenTop = (height - screenH) / 2 - 40;

  const btnW = Math.max(260, screenW * 0.35);
  const btnH = 72;
  const btnX = screenLeft + screenW / 2 - btnW / 2;
  const btnY = screenTop + screenH / 2 - btnH / 2 + 20;

  const mouseStart = {x: screenLeft + screenW * 0.2, y: screenTop + screenH * 0.25};
  const mouseEnd = {x: btnX + btnW * 0.8, y: btnY + btnH * 0.5};

  const mouseX = interpolate(mouseMoveProgress, [0, 1], [mouseStart.x, mouseEnd.x]);
  const mouseY = interpolate(mouseMoveProgress, [0, 1], [mouseStart.y, mouseEnd.y]);

  const clickPulse = spring({frame: frame - CLICK_AT, fps, durationInFrames: 18, config: {damping: 12, stiffness: 240}});
  const didClick = frame >= CLICK_AT;
  const btnScale = didClick ? interpolate(clickPulse, [0, 1], [1, 0.94]) : 1;
  const btnGlow = didClick ? interpolate(clickPulse, [0, 1], [0, 1]) : 0;

  const HEARTS = 15;
  const hearts = new Array(HEARTS).fill(0).map((_, i) => {
    const appearDelay = i * 8;
    const t = Math.min(1, Math.max(0, (frame - CLICK_AT - appearDelay) / 100));
    const easeT = Easing.inOut(Easing.ease)(t);
    const angle = (i / HEARTS) * Math.PI * 2;
    const distance = 150 + Math.sin(t * Math.PI) * 50;
    const driftX = Math.cos(angle + t * 2) * (screenW / 3);
    const driftY = -easeT * distance + Math.sin(angle + t) * 40;
    const x = btnX + btnW / 2 + driftX;
    const y = btnY + btnH / 2 + driftY;
    const s = interpolate(easeT, [0, 1], [0.4, 1]);
    const o = interpolate(easeT, [0, 0.1, 1], [0, 1, 0]);
    return {x, y, s, o, i};
  });

  const thanksOpacity = interpolate(frame, [CLICK_AT + 20, CLICK_AT + 50], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const thanksY = interpolate(frame, [CLICK_AT + 20, CLICK_AT + 50], [20, 0]);

  const bgOpacity = frame < INTRO_DURATION ? 1 : 0;

  return (
    <AbsoluteFill>
      {bgOpacity > 0 && <AbsoluteFill style={{background: "white", opacity: bgOpacity}} />}
      <AbsoluteFill style={{background: COLORS.bg, opacity: introOpacity, transform: `translateY(${introTranslateY}px)`}}>
        <div style={{position: "absolute", left: screenLeft - 12, top: screenTop - 12, width: screenW + 24, height: screenH + 24, background: COLORS.computer, borderRadius: 8, boxShadow: "0 8px 20px rgba(0,0,0,0.15)"}} />
        <div style={{position: "absolute", left: screenLeft, top: screenTop, width: screenW, height: screenH, background: COLORS.screenBg, borderRadius: 4, overflow: "hidden"}}>
          <div style={{position: "absolute", left: btnX - screenLeft, top: btnY - screenTop, width: btnW, height: btnH, background: COLORS.btn, borderRadius: 16, transform: `scale(${btnScale})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `${btnGlow * 0}px ${btnGlow * 0}px ${20 + btnGlow * 40}px rgba(147,197,253,${0.25 + btnGlow * 0.35})`}}>
            <span style={{fontSize: 28, fontWeight: 700, color: COLORS.btnText}}>klicke um gutes zu tun</span>
          </div>
          {hearts.map((h) => (
            <div key={h.i} style={{position: "absolute", left: h.x - screenLeft, top: h.y - screenTop, width: 20, height: 20, transform: `scale(${h.s}) rotate(45deg)`, opacity: h.o}}>
              <div style={{position: "absolute", inset: 0, background: COLORS.heart}} />
              <div style={{position: "absolute", width: 20, height: 20, left: -10, top: 0, borderRadius: 10, background: COLORS.heart}} />
              <div style={{position: "absolute", width: 20, height: 20, left: 0, top: -10, borderRadius: 10, background: COLORS.heart}} />
            </div>
          ))}
        </div>
        <div style={{position: "absolute", left: screenLeft - 20, top: screenTop + screenH, width: screenW + 40, height: 16, background: COLORS.computer, borderRadius: "0 0 4px 4px", boxShadow: "0 4px 10px rgba(0,0,0,0.15)"}} />
        <div style={{position: "absolute", left: screenLeft + screenW / 2 - 30, top: screenTop + screenH + 16, width: 60, height: 100, background: COLORS.computer, borderRadius: "0 0 8px 8px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)"}} />
        <div style={{position: "absolute", top: btnY + 120, left: 0, width: "100%", textAlign: "center", opacity: thanksOpacity, transform: `translateY(${thanksY}px)`}}>
          <span style={{fontSize: 40, fontWeight: 700, color: COLORS.text}}>Danke für deine Spende! ❤</span>
        </div>
        <div style={{position: "absolute", left: mouseX, top: mouseY, transform: `translate(-3px, -2px)`}}>
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L17 13L11 14L13 22L9 23L7 15L1 19V1Z" fill="#ffffff" stroke="#0b0b0b" strokeWidth="1"/>
          </svg>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
