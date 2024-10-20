import { LINK } from '@/constants/link';
import { SVG } from '@/svg';
import { snsArr } from '@/constants/sns';
import { HamburgerMenuStyle } from './layout.style';
import ModalCustom from '../ModalCustom';
import { useRouter } from 'next/navigation';
import QUERY_CUSTOM from '@/query';
import { apiHelper } from '@/util/apiHelper';
import useHavahStore from '@/store/havahStore';
import useGlobalStore from '@/store/globalStore';

// HIDDEN MENU
type HamburgerMenuProps = {
  isOpen: boolean;
  onClickClose: () => void;
};

function HamburgerMenu(props: HamburgerMenuProps) {
  const { userInfo } = QUERY_CUSTOM.USER_INFO();
  const { isOpen, onClickClose } = props;
  const { havahWalletInfo, setBalanceOfMZT } = useHavahStore.getState();
  const { setSigninRedirectUrl } = useGlobalStore.getState();
  const { setCurrentPageNumber } = useGlobalStore();
  const router = useRouter();
  const menuArr: { name: string; event: () => void; shortcut?: boolean }[] = [
    {
      name: 'camp',
      event: () => {
        setCurrentPageNumber(1);

        if (!userInfo) {
          setSigninRedirectUrl('/camp');
          router.push('/sign/signin');
        } else {
          router.push('/camp');
        }
        onClickClose();
      }
    },
    {
      name: 'trading post',
      event: () => {
        if (!userInfo) {
          setSigninRedirectUrl('/tradingpost');
          router.push('/sign/signin');
        } else {
          apiHelper
            .getBalanceOfMZT(havahWalletInfo.address)
            .then((balanceOfMZT) => {
              setBalanceOfMZT(balanceOfMZT);
            });
          router.push('/tradingpost');
        }
        onClickClose();
      }
    },
    {
      name: 'governance',
      event: () => {
        router.push('/governance');
        onClickClose();
      }
    },
    {
      name: 'market',
      event: () => {
        window.open(LINK.MARKET, '_blank');
      },
      shortcut: true
    },
    {
      name: 'docs',
      event: () => {
        window.open(LINK.GITBOOK, '_blank');
      },
      shortcut: true
    }
  ];

  return (
    <ModalCustom isOpen={isOpen} onClose={onClickClose}>
      <>
        <HamburgerMenuStyle
          className="hidden__menu"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="container">
            <ul className="menu">
              {menuArr.map((item, index) => (
                <li key={index} onClick={item.event}>
                  <span>{item.name}</span>
                  {item.shortcut && SVG.ICON.SHORTCUT_CUSTOM()}
                </li>
              ))}
            </ul>
            <div className="sns__container">
              <div className="line" />
              <div className="sns__icons">
                {snsArr.slice(1).map((item, index) => (
                  <a key={index} href={item.url} target="_blank">
                    {item.img_white}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <span className="close__button" onClick={onClickClose}>
            <SVG.ICON.CLOSE />
          </span>
        </HamburgerMenuStyle>
      </>
    </ModalCustom>
  );
}

export default HamburgerMenu;
