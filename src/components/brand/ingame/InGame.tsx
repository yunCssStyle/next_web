import InGameStyle from './InGame.style';
import Description from './components/Description';
import Downloader from './components/Downloader';
import Slider from './components/Slider';

export default function InGame() {
  return (
    <InGameStyle>
      <Slider />
      <Description />
      <Downloader />
    </InGameStyle>
  );
}
