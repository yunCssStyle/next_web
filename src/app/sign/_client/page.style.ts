import COLOR from '@/constants/COLOR';
import styled from '@emotion/styled';

export const SignPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 68px;
  border-bottom: 1px solid ${COLOR['GRAY7__#F1F1F1']};
  align-items: center;
  color: ${COLOR['BLACK__#000000']};
  text-align: center;
  font-family: 'Inter', sans-serif;
  h3 {
    font-size: 20px;
    font-weight: 700;
    line-height: 140%;
  }
  h5 {
    margin-top: 6px;
    font-size: 16px;
    font-weight: 400;
    line-height: 160%;
    color: ${COLOR['GRAY2__#565656']};
  }
  .bg__image {
    margin: 40px 0;
  }
  .button {
    &.google {
      margin-top: 8px;
    }
    :hover {
      cursor: pointer;
    }
  }
  .notification {
    margin-top: 16px;
  }

  .terms {
    margin-top: 12px;
    color: ${COLOR['GRAY3__#929292']};
    text-align: center;

    font-size: 14px;
    font-weight: 400;
    line-height: 160%; /* 22.4px */
    a {
      color: ${COLOR['BLACK__#000000']};
      text-decoration: underline;
    }
  }
`;
