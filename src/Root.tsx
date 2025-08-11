import "./index.css";
import { Composition } from "remotion";
import { Logo, myCompSchema2 } from "./DonistaVideo/Logo";

// Each <Composition> is an entry in the sidebar!
import { DonistaVideo, donistaVideoSchema } from "./DonistaVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DonistaVideo"
        component={DonistaVideo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={donistaVideoSchema}
        defaultProps={{
          titleText: "Donista - Shoppen & Spenden ohne Zusatzkosten",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
