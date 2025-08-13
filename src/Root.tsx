import { Composition } from 'remotion';
import { DonationScene } from './DonistaVideo';

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

    </>
  );
};

