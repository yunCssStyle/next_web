import COLOR from '@/constants/COLOR';
import styled from '@emotion/styled';

export const AccountSettingPageStyle = styled.div`
  padding: 60px 16px 101px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter', sans-serif;

  h2 {
    color: ${COLOR['BLACK__#000000']};
    text-align: center;
    font-size: 40px;
    font-weight: 800;
    line-height: 140%; /* 56px */
  }

  .inner__container {
    padding: 40px 0 20px;
    width: 100%;
    border-bottom: 1px solid ${COLOR['GRAY6__#E7E7E7']};
    h4 {
      font-size: 18px;
      font-weight: 700;
      line-height: 160%;
      display: flex;

      margin-top: 24px;
      :first-of-type {
        margin-top: 0;
      }
      span {
        margin-left: 8px;
      }
    }
    .disabled__box {
      margin-top: 12px;
      svg {
        margin-right: 4px;
      }
    }
    .notification {
      margin-top: 4px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      color: ${COLOR['GRAY3__#929292']};
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
    }
    button {
      margin-top: 12px;
    }
  }

  .agree__newsletter {
    margin-top: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      color: #000;
      font-size: 16px;
      font-weight: 700;
      line-height: 26px;
    }
  }

  .notification__newsletters {
    width: 100%;
    margin-top: 4px;
    color: ${COLOR['GRAY2__#565656']};
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }
`;
