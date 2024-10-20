import COLOR from '@/constants/COLOR';
import styled from '@emotion/styled';

export const CampLayoutStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px 60px;
  background-color: #fafafa;
  width: 100%;
  h1 {
    margin-top: 60px;
    color: 000;
    text-align: center;
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: 56px;
  }

  ul.description {
    color: ${COLOR['GRAY3__#929292']};
    font-size: 14px;
    font-weight: 400;
    line-height: 160%;
    padding: 0;
    margin: 20px 0;
    width: 100%;
    li {
      list-style: none;
      position: relative;
      padding-left: 16px;
      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        background: #929292;
        border-radius: 100%;
        margin-right: 8px;
        display: inline-block;
        position: absolute;
        top: 7px;
        left: 0;
      }
    }
  }

  .refresh {
    display: flex;
    justify-content: end;
    align-items: end;
    width: 100%;
  }

  & > div {
    width: 100%;
  }
`;
