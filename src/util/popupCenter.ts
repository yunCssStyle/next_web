//수정필요
export const popupCenter = (url: string) => {
  const width = 400;
  const height = 750;

  // 화면 중앙 좌표 계산
  const left = window.innerWidth / 2 - width / 2 + window.screenX;
  const top = window.innerHeight / 2 - height / 2 + window.screenY;

  const newWindow = window.open(
    url,
    'signin',
    `width=${width}, height=${height}, top=${top}, left=${left}, location=no`
  );

  if (newWindow) {
    newWindow.focus();
  }
};
