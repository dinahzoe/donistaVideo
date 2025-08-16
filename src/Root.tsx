import { Composition } from "remotion";
import { DonationScene } from "./DonistaVideo";
import { DonationScene2 } from "./DonistaVideo2";

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
        component={DonationScene2}
        durationInFrames={30 * 5}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
