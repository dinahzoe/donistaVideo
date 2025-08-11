import { Composition } from "remotion";
import { DonistaVideo } from "./DonistaVideo";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="DonistaVideo"
    component={DonistaVideo}
    durationInFrames={150}
    fps={30}
    width={1920}
    height={1080}
  />
);
