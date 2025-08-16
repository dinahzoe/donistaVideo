import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

// NOTE: Für ca. 8 Sekunden bitte in root.tsx die Dauer auf 30 * 8 setzen.
// <Composition id="DonistaVideo2" component={DonistaVideo2} durationInFrames={30 * 8} fps={30} width={1080} height={1920} />

const useSpr = (fps: number, frame: number, delay = 0, stiffness = 120, damping = 14) => {
	const f = Math.max(0, frame - delay);
	return spring({fps, frame: f, config: {stiffness, damping}});
};

const Bg = ({width, height, t}: {width: number; height: number; t: number}) => {
	const y = interpolate(t, [0, 1], [0, -120]);
	return (
		<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{position: 'absolute'}}>
			<defs>
				<linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="#aaf0ff" />
					<stop offset="100%" stopColor="#fff8d6" />
				</linearGradient>
				<filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
					<feGaussianBlur stdDeviation="6" />
				</filter>
			</defs>
			<rect x={0} y={0} width={width} height={height} fill="url(#grad)" />
			{/* sanfte Wolken */}
			{[0, 1, 2, 3].map((i) => {
				const cx = (i * 0.22 + t * 0.1) % 1; // loop
				const w = 420 + i * 60;
				const h = 120 + i * 10;
				return (
					<g
						key={i}
						opacity={0.25 - i * 0.04}
						filter="url(#soft)"
						transform={`translate(${cx * (width + 500) - 250}, ${120 + i * 220 + y})`}
					>
						<ellipse cx={0} cy={0} rx={w * 0.5} ry={h * 0.45} fill="#ffffff" />
					</g>
				);
			})}
		</svg>
	);
};

const Child = ({frame, fps}: {frame: number; fps: number}) => {
	const breathe = interpolate(Math.sin((frame / fps) * 0.30 * Math.PI), [-1, 1], [0.98, 1.02]);
	const blinkCycle = frame % 90;
	const blink = blinkCycle < 3 ? interpolate(blinkCycle, [0, 1, 2, 3], [1, 0.15, 0.15, 1]) : 1;
	const bobY = interpolate(Math.sin((frame / fps) * 2 * Math.PI), [-1, 1], [-8, 8]);

				// Sanfte, geschmeidige Armbewegung
const waveSpeed = 1.2; // Geschwindigkeit etwas langsamer
const armAmplitude = 0.35; // ca. ±20° in rad
const armAngle = Math.sin((frame / fps) * Math.PI * waveSpeed) * armAmplitude;

	return (
		<g transform={`translate(540, ${1200 + bobY})`}> {/* Hier Y-Wert angepasst */}
			{/* Körper */}
			<g transform={`scale(${breathe})`}>
				{/* Kopf */}
<g>

  <circle cx={0} cy={-300} r={130} fill="#ffe0bd" />
  {/* Hut oberhalb des Kopfes */}


  {/* Haare oben am Kopf (Bogen) */}
  <path d="M 110 -385 Q 0 -480 -110 -385" stroke="#3b2f2f" strokeWidth={25} fill="none" strokeLinecap="round" />

  {/* Haare rund um den Kopf */}
  {/* Linke Seite */}
  <path d="M -120 -360 Q -150 -330 -140 -250" stroke="#3b2f2f" strokeWidth={20} fill="none" strokeLinecap="round" />
  <path d="M -110 -380 Q -140 -350 -130 -260" stroke="#3b2f2f" strokeWidth={20} fill="none" strokeLinecap="round" />
  <path d="M -100 -400 Q -130 -370 -120 -270" stroke="#3b2f2f" strokeWidth={20} fill="none" strokeLinecap="round" />

  {/* Rechte Seite */}
  <path d="M 120 -360 Q 150 -330 140 -250" stroke="#3b2f2f" strokeWidth={20} fill="none" strokeLinecap="round" />
  <path d="M 110 -380 Q 140 -350 130 -260" stroke="#3b2f2f" strokeWidth={20} fill="none" strokeLinecap="round" />
  <path d="M 100 -400 Q 130 -370 120 -270" stroke="#3b2f2f" strokeWidth={20} fill="none" strokeLinecap="round" />

<g transform="translate(0, -405)"> {/* höher über Kopf */}
  {/* Hutkrempe */}
  <ellipse cx={0} cy={0} rx={160} ry={35} fill="#ffb3edff" />
  {/* Hutkrone */}
  <rect x={-90} y={-120} width={180} height={150} rx={30} fill="#ffb3edff" />

  {/* Pinkes Herz auf dem Hut */}
  <g transform="translate(0, -60) scale(1.2)"> {/* Herz leicht über der Hutkrone */}
  <path
    d="
      M 0 -30
      C -25 -55, -75 -15, 0 25
      C 75 -15, 25 -55, 0 -30
      Z
    "
    fill="#ff69b4"
  />
</g>


</g>
			{/* Augen */}
					{(() => {
						const blinkFrames = [
							[30, 33],
							[120, 123],
							[210, 213],
						];
						let blink = 1;
						for (const [start, end] of blinkFrames) {
							if (frame >= start && frame <= end) {
								blink = interpolate(frame, [start, (start+end)/2, end], [1, 0.15, 1]);
								break;
							}
						}
						return (
							<g transform={`scale(1, ${blink})`}>
								<ellipse cx={-40} cy={-330} rx={16} ry={20} fill="#ffffff" />
								<ellipse cx={40} cy={-330} rx={16} ry={20} fill="#ffffff" />
								<circle cx={-40} cy={-330} r={8} fill="#10b981" />
								<circle cx={40} cy={-330} r={8} fill="#10b981" />
							</g>
						);
					})()}

					{/* Augenbrauen */}
					<path d="M -55 -360 Q -40 -370 -25 -360" stroke="#3b3b3b" strokeWidth={5} fill="none" strokeLinecap="round" />
					<path d="M 25 -360 Q 40 -370 55 -360" stroke="#3b3b3b" strokeWidth={5} fill="none" strokeLinecap="round" />

					{/* Mund */}
					<path d="M -40 -260 Q 0 -240 40 -260" stroke="#b45309" strokeWidth={10} fill="none" strokeLinecap="round" />

					{/* Wangen */}
					<ellipse cx={-70} cy={-280} rx={20} ry={12} fill="#fecaca" />
					<ellipse cx={70} cy={-280} rx={20} ry={12} fill="#fecaca" />
				</g>

				{/* Oberkörper */}
				<g>
					<rect x={-120} y={-180} width={240} height={260} rx={40} fill="#60a5fa" />
				</g>

{/* Linker Arm */}
<g transform={`translate(-120,-150) rotate(${armAngle * 180 / Math.PI}, 0, 0)`}>
  <rect x={-24} y={0} width={48} height={150} rx={24} fill="#ffe0bd" />
  <circle cx={0} cy={160} r={26} fill="#ffe0bd" />
</g>

{/* Rechter Arm */}
<g transform={`translate(120,-150) rotate(${-armAngle * 180 / Math.PI}, 0, 0)`}>
  <rect x={-24} y={0} width={48} height={150} rx={24} fill="#ffe0bd" />
  <circle cx={0} cy={160} r={26} fill="#ffe0bd" />
</g>


				{/* Beine */}
				<g>
					<rect x={-80} y={80} width={60} height={170} rx={22} fill="#111827" />
					<rect x={20} y={80} width={60} height={170} rx={22} fill="#111827" />
					<rect x={-100} y={246} width={100} height={34} rx={16} fill="#1f2937" />
					<rect x={0} y={246} width={100} height={34} rx={16} fill="#1f2937" />
				</g>
			</g>
		</g>
	);
};

const TitleCard = ({frame, fps}: {frame: number; fps: number}) => {
	const enter = useSpr(fps, frame, 6, 160, 16);
	const y = interpolate(enter, [0, 1], [60, 0], {extrapolateRight: 'clamp'});
	const scale = interpolate(enter, [0, 1], [0.96, 1]);
	const glow = interpolate(enter, [0, 1], [0, 0.45]);
	return (
		<g transform={`translate(540, 140) scale(${scale})`} opacity={enter}>
			<defs>
				<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="10" />
				</filter>
			</defs>
			<g transform={`translate(0, ${y + 200})`}>
  <rect x={-420} y={-70} width={840} height={140} rx={28} fill="#111827" opacity={0.08} />
  <text x={0} y={0} textAnchor="middle" fontSize={72} fontWeight={800} fontFamily="Inter, ui-sans-serif, system-ui">
    Lernen macht Spaß
  </text>
  <text x={0} y={46} textAnchor="middle" fontSize={36} fontWeight={600} opacity={0.7} fontFamily="Inter, ui-sans-serif, system-ui">
    Mit Büchern & Fantasie
  </text>
  <rect x={-420} y={-70} width={840} height={140} rx={28} fill="#60a5fa" opacity={glow} filter="url(#glow)" />
</g>

		</g>
	);
};

const Sparkles = ({frame, fps}: {frame: number; fps: number}) => {
	const items = 16;
	return (
		<g>
			{Array.from({length: items}).map((_, i) => {
				const t = ((frame + i * 10) % (fps * 2)) / (fps * 2);
				const alpha = interpolate(t, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
				const x = 120 + (i * 900) / items;
				const y = 300 + (Math.sin(i * 1.3) * 80 + interpolate(t, [0, 1], [0, -180]));
				const s = interpolate(t, [0, 0.5, 1], [0.6, 1.2, 0.6]);
				return (
					<g key={i} transform={`translate(${x}, ${y}) scale(${s})`} opacity={alpha}>
						<path d="M 0 -10 L 2 -2 L 10 0 L 2 2 L 0 10 L -2 2 L -10 0 L -2 -2 Z" fill="#fbbf24" />
					</g>
				);
			})}
		</g>
	);
};

const FallingItems = ({frame, fps, width, height}: {frame: number; fps: number; width: number; height: number}) => {
	const items = 50; // noch mehr Emojis
	const emojis = ['📚','✏️','📝'];

	return (
		<g>
			{Array.from({length: items}).map((_, i) => {
				const speedOffset = i * 7;
				const t = ((frame + speedOffset) % (fps * 5)) / (fps * 5); // Loop
				// Zufällige horizontale Startposition
				const x = (Math.sin(i * 1.7 + frame / 50) * 0.5 + 0.5) * width;
				// Von oben nach unten
				const y = interpolate(t, [0, 1], [-200, height + 100]);
				// Variierende Größe
				const scale = interpolate(t, [0, 0.5, 1], [1.2, 1.8, 1.2]);
				// Leichte Rotation für realistischeren Fall
				const rotation = Math.sin(frame / 10 + i) * 20; 
				const emoji = emojis[i % emojis.length];

				return (
					<text
						key={i}
						x={x}
						y={y}
						fontSize={72}
						style={{userSelect: 'none'}}
						transform={`rotate(${rotation} ${x} ${y}) scale(${scale})`}
						textAnchor="middle"
					>
						{emoji}
					</text>
				);
			})}
		</g>
	);
};



export const DonistaVideo2: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height, durationInFrames} = useVideoConfig();

	const fadeIn = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
	const globalOpacity = fadeIn * fadeOut;

	const zoom = interpolate(frame, [0, durationInFrames], [1.02, 1.08]);
	const t = (frame % (fps * 10)) / (fps * 10);

	return (
		<AbsoluteFill style={{backgroundColor: 'white', opacity: globalOpacity}}>
			<div style={{transform: `scale(${zoom})`, width: '100%', height: '100%'}}>
				<Bg width={width} height={height} t={t} />
                
				<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{position: 'absolute'}}>
    {/* Kind und Titel zuerst */}
    <Child frame={frame} fps={fps} />
    <TitleCard frame={frame} fps={fps} />
    <Sparkles frame={frame} fps={fps} />
    {/* Emojis zuletzt, damit sie über allem liegen */}
    <FallingItems frame={frame} fps={fps} width={width} height={height} />
</svg>

			</div>
            
		</AbsoluteFill>
	);
};
