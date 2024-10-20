import COLOR from '@/constants/COLOR';
import styled from '@emotion/styled';

export const GovernancePageStyle = styled.div`
  padding: 0 16px 60px;
  background-color: #fafafa;

  h1 {
    margin-top: 60px;
    color: 000;
    text-align: center;
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: 56px;
  }

  .description {
    color: ${COLOR['BLACK__#000000']};
    font-size: 16px;
    font-weight: 400;
    line-height: 160%;
    padding: 0 20px;
    margin: 20px 0;
    text-align: justify;
  }

  .alarm {
    color: ${COLOR['GRAY3__#929292']};
    font-size: 12px;
    font-weight: 400;
    text-align: left;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    &::before {
      content: '';
      display: inline-block;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      background-color: ${COLOR['GRAY3__#929292']};
      margin-right: 10px;
      margin-left: 8px;
    }
  }

  .list_box {
    border-radius: 12px;
    background-color: ${COLOR['WHITE__#FFFFFF']};
    box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.04);
    padding: 24px 16px;
    margin-bottom: 20px;
    h2 {
      color: ${COLOR['BLACK__#000000']};
      text-align: center;
      font-size: 24px;
      line-height: 140%; /* 33.6px */
    }
  }
  .banner {
    img {
      width: 105px;
      height: 141px;
      min-width: 105px;
      margin-right: 22px;
    }
  }
`;
