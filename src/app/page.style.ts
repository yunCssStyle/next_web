'use client';
import COLOR from '@/constants/COLOR';
import { cdnUrl } from '@/util/converter';
import styled from '@emotion/styled';

export const BrandPageStyle = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-width: 360px;
  max-width: 768px;
  font-family: 'Inter', sans-serif;
  background-color: #fafafa;
  .sticky_btns {
    position: sticky;
    bottom: 10%;
    left: 100%;
    z-index: 3;
    margin: 16px;
    height: 0px;
    > div {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
    }
  }
`;

export const ErrorPageStyle = styled.div`
  padding-top: 80px;
  width: 100%;
  max-width: 768px;
  min-width: 360px;
  min-height: 751px;
  background-image: url(${cdnUrl('/assets/images/error_bg.png')});
  background-repeat: no-repeat;
  background-size: 768px 756px;
  background-position: bottom;
  background-color: #6ed2f4;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .information {
    width: 328px;
    padding-top: 70px;
    .oops {
      font-family: 'Inter', sans-serif;
      font-size: 56px;
      font-style: normal;
      font-weight: 800;
      line-height: 140%;
    }
    .description__container {
      .description1 {
        font-family: 'Inter', sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 140%;
      }
      .description2 {
        margin-top: 10px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%;
        p {
          color: ${COLOR['GRAY1__#272727']};
        }
      }
      /* .description3 {
        margin-top: 10px;
        p {
          color: #ec1a26;
          text-align: center;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          line-height: 21px;
        }
      } */
    }
    .links {
      margin-top: 31px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      button {
        width: 300px;
        height: 60px;
        outline: none;
        border: none;
        text-transform: none !important;
        border-radius: 8px;
        background: #353a50;
        font-family: 'Inter', sans-serif;
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        line-height: 120%;
        color: #ffffff;
        text-transform: capitalize;
        &:last-of-type {
          margin-top: 8px;
        }
      }
    }
  }

  .maintenance {
    width: 328px;
    padding-top: 40px;
    h1 {
      font-size: 40px;
      font-style: normal;
      font-weight: 800;
      line-height: 49px;
      margin-bottom: 2px;
    }
    .message {
      > div {
        margin-top: 8px;
        h5 {
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 22px;
        }
        > ul {
          display: flex;
          flex-direction: column;
          align-items: center;
          li {
            font-size: 14px;
            line-height: 22px;
            width: fit-content;
          }
        }
      }
    }

    .schedule__item {
      margin-top: 10px;
      .title {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 26px;
      }
      .schedule {
        margin-top: 4px;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
      }
    }
  }

  .kiki {
    margin: -22px 0 56px;
    display: flex;
    justify-content: center;
  }
`;
