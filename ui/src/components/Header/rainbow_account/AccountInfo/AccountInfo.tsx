import React, { memo, useCallback, useRef } from "react";
import IsPixelWidget from "../IsPixelWidget";
import PlayerAvatar from "../../../../components/PlayerAvatar";
import AccountInfoDialog, {
  AddressBigWrapPop,
  AddressMiddleWrapPop,
} from "../../../ConnectWallet/components/AccountInfoDialog/AccountInfoDialog";
import { useActiveWeb3React } from "../../../../hooks/useActiveWeb3React";
import { ChainId } from "../../../../constant/constant";
import "./AccountInfo.stylus";
import { useSetRecoilState } from "recoil";
import { accountInfoDialogState } from "../../../../components/ConnectWallet/state/connectWalletState";
type IAccountInfo = {
  isMiddleWidth: boolean;
  isW768: boolean;
  copy: any;
  env: string;
  supportedChainList?: ChainId[];
};
const AccountInfo = memo(
  ({ isW768, isMiddleWidth, copy, env, supportedChainList }: IAccountInfo) => {
    const { chainId, account } = useActiveWeb3React(env, supportedChainList);
    console.log({ chainId });
    const setAccountInfoDialogState = useSetRecoilState(accountInfoDialogState);
    // const [showBig, setShowBig] = useRecoilState(showBigState);
    // const [showMiddle, setShowMiddle] = useRecoilState(showMiddleState);

    const accountClick = useCallback(() => {
      if (isW768) {
        //     setShowBig(false);
        //     setShowMiddle(false);
        setAccountInfoDialogState(true);
      }
      //   } else if (isMiddleWidth) {
      //     setShowMiddle((pre) => !pre);
      //   } else {
      //     setShowBig((pre) => !pre);
      //   }
    }, [isW768, setAccountInfoDialogState]);

    return (
      <>
        <IsPixelWidget className="address_wrap">
          <PlayerAvatar
            onClick={accountClick}
            className="account"
            account={account}
            size={isW768 ? 30 : 40}
            showAccount={isMiddleWidth ? false : true}
          />
          {/* {showBig ? ( */}
          {!isMiddleWidth && !isW768 ? <AddressBigWrapPop copy={copy} /> : null}
          {/* ) : null} */}
          {/* {showMiddle ? ( */}
          {isMiddleWidth && !isW768 ? (
            <AddressMiddleWrapPop copy={copy} />
          ) : null}
          {/* ) : null} */}
        </IsPixelWidget>
        {isW768 ? <AccountInfoDialog copy={copy} /> : null}
      </>
    );
  }
);
export default AccountInfo;
