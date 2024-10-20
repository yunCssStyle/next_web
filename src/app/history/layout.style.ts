import styled from '@emotion/styled';

export const CampLayoutStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px 68px;
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
  .menu__box {
    margin-top: 40px;
    width: 100%;
    display: flex;
    .gap {
      width: 16px;
    }
  }
`;
