node ver : v18.18

`$ npx create-next-app@latest ./ --typescript`

```
$ npm install @mui/material @emotion/react @emotion/styled
$ npm i @tanstack/react-query
$ npm i -D @tanstack/eslint-plugin-query
$ npm install axios
$ npm i @svgr/webpack
$ npm i dotenv
$ npm i env-cmd
$ npm i @tanstack/react-query
$ npm i -D @tanstack/eslint-plugin-query
$ npm install swiper
$ npm install zustand
$ npm i detect-browser
$ npm install next-auth
$ npm i --save lodash
$ npm install ioredis
$ npm install --save-dev @types/node
```

# 서버상태 및 클라이언트 상태관리

- 서버상태 : react-query + typescript 조합 hook 생성하여 사용
- 클라상태 : useContext 필요시 zustand추가
- 절대경로설정
- 일반상태 react-query 사용관리

# Jest

- $ npm i -D jest typescript
- $ npm i -D ts-jest @types/jest
- $ npx ts-jest config:init
  - jest.config.js 파일 모듈 에러 발생
- $ npm i --save-dev ts-node
  - jest.config.js -> jest.confin\g.ts 로 변경
