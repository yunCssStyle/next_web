import COLOR from '@/constants/COLOR';
import styled from '@emotion/styled';

export const TradingPostPageStyle = styled.div`
  padding: 40px 16px 68px;
  h1 {
    color: ${COLOR['BLACK__#000000']};
    text-align: center;
    font-size: 40px;
    font-weight: 800;
    line-height: 140%; /* 56px */
  }
  .refresh {
    width: 134px;
    margin-top: 40px;
    margin-left: auto;
  }
  button {
    margin-top: 24px;
    padding: 0 16px;
  }
`;
