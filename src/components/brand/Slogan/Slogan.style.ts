import { cdnUrl } from '@/util/converter';
import styled from '@emotion/styled';

const SloganStyle = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .title {
    color: #000;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: 52px; /* 130% */
    letter-spacing: -0.4px;
    margin-top: 37px;
  }
`;

export default SloganStyle;
