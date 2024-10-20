'use client';
import IconDiscord from './discord.svg';
import IconGitbook from './gitbook.svg';
import IconMedium from './medium.svg';
import IconTelegram from './telegram.svg';
import IconTwitter from './twitter.svg';
import IconDiscord_white from './discord_white.svg';
import IconGitbook_white from './gitbook_white.svg';
import IconMedium_white from './medium_white.svg';
import IconTelegram_white from './telegram_white.svg';
import IconTwitter_white from './twitter_white.svg';
import IconGoogle from './google.svg';
import IconClose from './close.svg';
import IconClose2 from './close2.svg';
import IconClose3 from './close3.svg';

import IconCloseMini from './close_mini.svg';
import IconHamburger from './hamburger.svg';
import IconShortcut16x16 from './shortcut_16x16.svg';
import IconShortcut_new from './shortcut_new.svg';
import IconWallet from './wallet.svg';
import IconWalletChecked from './wallet_checked.svg';
import IconAccount from './account.svg';
import IconArrowUp from './arrow_up.svg';
import IconArrowUp2 from './arrow_up2.svg';
import IconArrowDown from './arrow_down.svg';
import IconHistory from './history.svg';
import IconSetting from './setting.svg';
import IconSignOut from './signout.svg';
import IconGold from './gold.svg';
import IconCopy from './copy.svg';
import IconCopy2 from './copy2.svg';
import IconRefresh from './refresh.svg';
import IconFilter from './filter.svg';
import IconMZP from './mzp.svg';
import IconMZP18 from './mzp18.svg';

import IconPlus from './plus.svg';
import IconPickaxe from './pickaxe.svg';
import IconExclamation from './exclamation.svg';
import IconExclamation2 from './exclamation2.svg';
import IconSymbol from './symbol.svg';
import IconMZT from './mzt.svg';
import IconMZT24 from './mzt24.svg';
import IconMZTDisabled from './mzt_disabled.svg';
import IconError from './error.svg';
import IconCheck from './check.svg';
import IconPaginationLeft from './pagination_left.svg';
import IconPaginationRight from './pagination_right.svg';
import IconQuestionCircle from './question_circle.svg';
import IconTooltipTriangle from './tooltip_triangle.svg';
import IconInfinityLoop from './infinity_loop.svg';
import IconPageBack from './page_back.svg';
import IconShowMore from './show_more.svg';
import IconSearch from './search.svg';
import IconXMark from './x_mark.svg';
import IconLock from './lock.svg';
import IconUnlock from './unlock.svg';

import Num1 from './num_1.svg';
import Num2 from './num_2.svg';
import Num3 from './num_3.svg';
import Num4 from './num_4.svg';

const ICON = {
  DISCORD: (): JSX.Element => {
    return <IconDiscord />;
  },

  GITBOOK: (): JSX.Element => {
    return <IconGitbook />;
  },

  MEDIUM: (): JSX.Element => {
    return <IconMedium />;
  },

  TELEGRAM: (): JSX.Element => {
    return <IconTelegram />;
  },

  TWITTER: (): JSX.Element => {
    return <IconTwitter />;
  },
  DISCORD_WHITE: (): JSX.Element => {
    return <IconDiscord_white />;
  },

  GITBOOK_WHITE: (): JSX.Element => {
    return <IconGitbook_white />;
  },

  MEDIUM_WHITE: (): JSX.Element => {
    return <IconMedium_white />;
  },

  TELEGRAM_WHITE: (): JSX.Element => {
    return <IconTelegram_white />;
  },

  TWITTER_WHITE: (): JSX.Element => {
    return <IconTwitter_white />;
  },

  GOOGLE: (): JSX.Element => {
    return <IconGoogle />;
  },

  CLOSE: (): JSX.Element => {
    return <IconClose />;
  },

  CLOSE2: (): JSX.Element => {
    return <IconClose2 />;
  },

  CLOSE3: (): JSX.Element => {
    return <IconClose3 />;
  },

  CLOSE_MINI: (): JSX.Element => {
    return <IconCloseMini />;
  },

  HAMBURGER: (): JSX.Element => {
    return <IconHamburger />;
  },

  SHORTCUT: (): JSX.Element => {
    return <IconShortcut_new />;
  },

  SHORTCUT_16X16: (): JSX.Element => {
    return <IconShortcut16x16 fill="#929292" />;
  },

  SHORTCUT_CUSTOM: (fill: string = '#fff'): JSX.Element => {
    return <IconShortcut_new fill={fill} />;
  },

  WALLET: (): JSX.Element => {
    return <IconWallet />;
  },

  WALLET_CHECKED: (): JSX.Element => {
    return <IconWalletChecked />;
  },

  ACCOUNT: (): JSX.Element => {
    return <IconAccount />;
  },

  ARROW_UP: (): JSX.Element => {
    return <IconArrowUp />;
  },

  ARROW_UP2: (): JSX.Element => {
    return <IconArrowUp2 />;
  },

  ARROW_DOWN: (): JSX.Element => {
    return <IconArrowDown />;
  },

  HISTORY: (): JSX.Element => {
    return <IconHistory />;
  },

  SETTING: (): JSX.Element => {
    return <IconSetting />;
  },

  SIGNOUT: (): JSX.Element => {
    return <IconSignOut fill="#929292" />;
  },

  SIGNOUT_CUSTOM: (): JSX.Element => {
    return <IconSignOut />;
  },

  GOLD: (): JSX.Element => {
    return <IconGold />;
  },

  COPY: (): JSX.Element => {
    return <IconCopy />;
  },

  COPY2: (): JSX.Element => {
    return <IconCopy2 />;
  },

  REFRESH: (): JSX.Element => {
    return <IconRefresh />;
  },

  FILTER: (): JSX.Element => {
    return <IconFilter />;
  },

  MZP: (): JSX.Element => {
    return <IconMZP />;
  },

  MZP18: (): JSX.Element => {
    return <IconMZP18 />;
  },

  MZT24: (): JSX.Element => {
    return <IconMZT24 />;
  },

  PLUS: (): JSX.Element => {
    return <IconPlus />;
  },

  PICKAXE: (): JSX.Element => {
    return <IconPickaxe />;
  },

  EXCLAMATION: (): JSX.Element => {
    return <IconExclamation />;
  },

  EXCLAMATION2: (): JSX.Element => {
    return <IconExclamation2 />;
  },

  SYMBOL: (): JSX.Element => {
    return <IconSymbol />;
  },

  MZT: (): JSX.Element => {
    return <IconMZT />;
  },

  MZT_DISABLED: (): JSX.Element => {
    return <IconMZTDisabled />;
  },

  ERROR: (): JSX.Element => {
    return <IconError />;
  },

  CHECK: (): JSX.Element => {
    return <IconCheck />;
  },

  PAGINATION_LEFT: (): JSX.Element => {
    return <IconPaginationLeft />;
  },

  PAGEBACK: (): JSX.Element => {
    return <IconPageBack />;
  },

  PAGINATION_RIGHT: (): JSX.Element => {
    return <IconPaginationRight />;
  },

  QUESTION_CIRCLE: (): JSX.Element => {
    return <IconQuestionCircle />;
  },

  TOOLTIP_TRIANGLE: (): JSX.Element => {
    return <IconTooltipTriangle />;
  },

  INFINITY_LOOP: (): JSX.Element => {
    return <IconInfinityLoop />;
  },
  ICONSHOWMORE: (): JSX.Element => {
    return <IconShowMore />;
  },

  SEARCH: (): JSX.Element => {
    return <IconSearch />;
  },

  X_MARK: (): JSX.Element => {
    return <IconXMark />;
  },

  LOCK: (): JSX.Element => {
    return <IconLock />;
  },

  UNLOCK: (): JSX.Element => {
    return <IconUnlock />;
  },

  NUM1: (): JSX.Element => {
    return <Num1 />;
  },

  NUM2: (): JSX.Element => {
    return <Num2 />;
  },

  NUM3: (): JSX.Element => {
    return <Num3 />;
  },

  NUM4: (): JSX.Element => {
    return <Num4 />;
  }
};

export const SVG = {
  ICON
} as const;
