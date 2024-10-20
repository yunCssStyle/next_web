import { cdnUrl } from '@/util/converter';
import styled from '@emotion/styled';

type ImageContainerProps = {
  isActive: boolean;
  url: string;
};
export default function ImageContainer(props: ImageContainerProps) {
  const { isActive, url } = props;
  return (
    <ImageContainerStyle isActive={isActive} url={url}>
      <div className={`image ${isActive ? 'active' : ''}`}></div>
      {isActive ? null : <div className="not__active" />}
    </ImageContainerStyle>
  );
}

const ImageContainerStyle = styled.div<ImageContainerProps>`
  position: relative;
  .image {
    width: 328px;
    height: 583px;
    border-radius: 30px;
    background-image: url(${(props) => cdnUrl(props.url)});
    background-position: center 0;
    background-size: cover;
    &.active {
      box-shadow: 0px 30px 30px 0px rgba(0, 0, 0, 0.1);
    }
  }
  .not__active {
    position: absolute;
    top: 0;
    width: 328px;
    height: 583px;
    border-radius: 30px;
    background-color: rgba(211, 211, 211, 0.5);
  }
`;
