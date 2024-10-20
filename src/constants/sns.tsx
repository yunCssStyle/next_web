import { SVG } from '@/svg';
import { LINK } from './link';

export const snsArr: {
  url: string;
  img: JSX.Element;
  img_white?: JSX.Element;
}[] = [
  {
    url: LINK.GITBOOK,
    img: <SVG.ICON.GITBOOK />,
    img_white: <SVG.ICON.GITBOOK_WHITE />
  },
  {
    url: LINK.DISCORD,
    img: <SVG.ICON.DISCORD />,
    img_white: <SVG.ICON.DISCORD_WHITE />
  },
  {
    url: LINK.TELEGRAM,
    img: <SVG.ICON.TELEGRAM />,
    img_white: <SVG.ICON.TELEGRAM_WHITE />
  },
  {
    url: LINK.TWITTER,
    img: <SVG.ICON.TWITTER />,
    img_white: <SVG.ICON.TWITTER_WHITE />
  },
  {
    url: LINK.MEDIUM,
    img: <SVG.ICON.MEDIUM />,
    img_white: <SVG.ICON.MEDIUM_WHITE />
  }
];
