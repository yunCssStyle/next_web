const recaptchaUrl = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
const grecaptcha = () => {
  return new Promise((res, rej) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(String(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY), {
          action: 'submit'
        })
        .then((token: string) => {
          return res(token);
        });
    });
  });
};
export { recaptchaUrl, grecaptcha };

/* google-recaptcha type */

declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance;
  }
}

export interface ReCaptchaInstance {
  ready: (cb: () => any) => void;
  execute: (key: string, options: ReCaptchaExecuteOptions) => Promise<string>;
  render: (id: string, options: ReCaptchaRenderOptions) => any;
}
interface ReCaptchaExecuteOptions {
  action: string;
}
interface ReCaptchaRenderOptions {
  sitekey: string;
  size: 'invisible';
}
