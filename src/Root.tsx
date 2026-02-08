import { Composition } from "remotion";
import { DonationScene } from "./DonsitaDonationMonitor";
import { DonistaVideo2 } from "./DonsitaSchoolCampaign";
import { DonistaVideo3 } from "./DonsitaDonationCountdown";
import { DonistaVideo4 } from "./DonsitaMascotSpeech"; // <--- NEU

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DonistaVideo"
        component={DonationScene}
        durationInFrames={30 * 8}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="DonistaVideo2"
        component={DonistaVideo2}
        durationInFrames={30 * 5}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="DonistaVideo3"
        component={DonistaVideo3}
        durationInFrames={30 * 8}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="DonistaVideo4" // <--- NEU
        component={DonistaVideo4}
        durationInFrames={30 * 8}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
