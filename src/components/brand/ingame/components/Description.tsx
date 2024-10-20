import styled from '@emotion/styled';

export default function Description() {
  return (
    <DescriptionStyle>
      <p className="mt40">
        Tap your way to riches in MINE WARZ, the simple mining tycoon game
        requiring no more than<span> a few taps a day!</span>
        <br /> You will have the opportunity to explore the world of MINE WARZ,
        where you can experience wealth accumulation by pioneering mines,
        extracting resources, and engaging in resource contests, all through a
        variety of PFP (Profile Picture) NFTs.
      </p>
    </DescriptionStyle>
  );
}

const DescriptionStyle = styled.div`
  color: #000;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 27px; /* 135% */
  letter-spacing: -0.2px;
  padding: 0 26px;
  max-width: 725px;
  margin: 0 auto;
  span {
    white-space: nowrap;
  }
  p {
    &.mt40 {
      margin-top: 40px;
    }
    &.mt20 {
      margin-top: 20px;
    }
  }
`;
