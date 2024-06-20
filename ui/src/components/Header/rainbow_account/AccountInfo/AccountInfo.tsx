import React, { memo, useRef } from "react";
import IsPixelWidget from "../IsPixelWidget";
import { HeaderUIType } from "../../header";
import PlayerAvatar from "../../../../components/PlayerAvatar";
import AccountInfoDialog, {
  AddressBigWrapPop,
  AddressMiddleWrapPop,
} from "../../../ConnectWallet/components/AccountInfoDialog/AccountInfoDialog";
import { useActiveWeb3React } from "../../../../hooks/useActiveWeb3React";
import { ChainId } from "../../../../constant/constant";
import "./AccountInfo.stylus";
type IAccountInfo = {
  type: HeaderUIType;
  isMiddleWidth: boolean;
  isW768: boolean;
  copy: any;
  env: string;
  supportedChainList?: ChainId[];
};
const AccountInfo = memo(
  ({
    isW768,
    isMiddleWidth,
    type,
    copy,
    env,
    supportedChainList,
  }: IAccountInfo) => {
    const { chainId, account } = useActiveWeb3React(env, supportedChainList);
    // const setAccountInfoDialogState = useSetRecoilState(accountInfoDialogState);
    // const [showBig, setShowBig] = useRecoilState(showBigState);
    // const [showMiddle, setShowMiddle] = useRecoilState(showMiddleState);
    const bigDivRef = useRef<HTMLDivElement>(null);
    const middleDivRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //   const handleClickOutside = (event: MouseEvent) => {
    //     if (bigDivRef.current) {
    //       if (!bigDivRef.current.contains(event.target as Node)) {
    //         setShowBig(false);
    //       }
    //     }
    //     if (middleDivRef.current) {
    //       if (!middleDivRef.current.contains(event.target as Node)) {
    //         setShowMiddle(false);
    //       }
    //     }
    //   };

    //   // 添加监听事件
    //   document.addEventListener("mouseover", handleClickOutside);

    //   // 清理函数，移除事件监听器
    //   return () => {
    //     document.removeEventListener("mouseover", handleClickOutside);
    //   };
    // }, []);
    // const accountClick = useCallback(() => {
    //   if (isW768) {
    //     setShowBig(false);
    //     setShowMiddle(false);
    //     setAccountInfoDialogState(true);
    //   } else if (isMiddleWidth) {
    //     setShowMiddle((pre) => !pre);
    //   } else {
    //     setShowBig((pre) => !pre);
    //   }
    // }, [isW768, isMiddleWidth, setAccountInfoDialogState]);

    return (
      <>
        <IsPixelWidget type={type} className="address_wrap">
          <PlayerAvatar
            // onMouseOver={accountClick}
            className="account"
            account={account}
            size={isW768 ? 30 : 40}
            showAccount={isMiddleWidth ? false : true}
            type={type}
            chainId={chainId}
          />
          {/* {showBig ? ( */}
          {!isMiddleWidth && !isW768 ? (
            <div ref={bigDivRef}>
              <AddressBigWrapPop copy={copy} />{" "}
            </div>
          ) : null}
          {/* ) : null} */}
          {/* {showMiddle ? ( */}
          {isMiddleWidth ? (
            <div ref={middleDivRef}>
              <AddressMiddleWrapPop copy={copy} />
            </div>
          ) : null}
          {/* ) : null} */}
        </IsPixelWidget>
        {isW768 ? <AccountInfoDialog copy={copy} type={type} /> : null}
      </>
    );
  }
);
export default AccountInfo;
