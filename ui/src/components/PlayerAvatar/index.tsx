import cx from "classnames";
import React, { memo } from "react";
import styled from "styled-components";

import { getShortenAddress } from "../../utils/tool";
import { preStaticUrl } from "../../constant/constant";

import "./index.stylus";
import Avatar from "../Avatar/Avatar";
import { useCustomTranslation } from "../../hooks/useCustomTranslation";
import { LngNs } from "../../utils/i18n";
import { useAvatar } from "../../hooks/useAvatar";

export interface IPlayerAvatar {
  hidePixel?: boolean;
  className?: string;
  account?: string;
  highLight?: boolean;
  hideAvatars?: boolean;
  showAccount?: boolean;
  size?: number;
  winner?: boolean;
  border?: boolean;
  AvatarBorder?: any;
  AccountTextFrComp?: any;
  preLen?: number;
  endLen?: number;
  otherStr?: string;
  onClick?: any;
  onMouseOver?: any;
}

const PlayerAvatar: React.FC<IPlayerAvatar> = memo(
  ({
    account,
    showAccount = false,
    size = 60,
    border = false,
    AvatarBorder = React.Fragment,
    AccountTextFrComp = React.Fragment,
    className,
    preLen,
    endLen,
    otherStr,
    hideAvatars,
    onClick,
    onMouseOver,
    hidePixel,
  }: IPlayerAvatar) => {
    const { t } = useCustomTranslation([LngNs.zBingo]);
    const avatars = useAvatar(account, hideAvatars);

    return (
      <div
        className={cx(className, "player_playerAvatar")}
        onClick={onClick}
        onMouseOver={onMouseOver}
      >
        {hideAvatars ? null : account ? (
          avatars ? (
            <AvatarBorder>
              <Avatar
                hidePixel={hidePixel}
                size={size}
                src={avatars.selectedAvatar}
                backgroundColor={avatars.selectedBackground}
              />
            </AvatarBorder>
          ) : null
        ) : (
          <div
            className={"player_avatar"}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              overflow: "hidden",
              background: "rgba(138, 138, 138, 1)",
            }}
          >
            <Avatar
              hidePixel={hidePixel}
              size={size}
              src={preStaticUrl + `/img/pixel_default_avatar.png`}
            />
          </div>
        )}
        {showAccount && (
          <p
            className={
              className?.includes("account") ? "player_avatar_account" : ""
            }
          >
            {account
              ? `${getShortenAddress(account, preLen, endLen)}${
                  otherStr ? ` ${otherStr}` : ""
                }`
              : t("waiting")}
            <AccountTextFrComp />
          </p>
        )}
      </div>
    );
  }
);

const OuterCircle = styled.div<{
  isGrey?: boolean;
  isGreen?: boolean;
  Padding?: string;
  size?: "large" | "small" | number;
  winner?: boolean;
}>`
  background: ${({ isGrey, isGreen }) => {
    if (isGreen) {
      return "linear-gradient(180deg, #8FCA3A 0%, #59B11C 32.81%, #259900 100%)";
    }
    if (isGrey) {
      return "linear-gradient(180deg, #ddd 0%, #434343 100%)";
    }
    return "linear-gradient(180deg, #F1A541 0%, #D48A2B 45.31%, #9F5A03 100%)"; // 默认值
  }};
  border-radius: 50%;
  position: relative;
  ${({ winner }) =>
    winner &&
    `&::after {
    content: '';
    position: absolute;
    top: -14px;
    right: -5px;
    width: 27px;
    height: 25px;
    background: url(${preStaticUrl}/img/layout/crown.svg) no-repeat;
  }`}

  padding: 1.875px;
  ${({ size }) => {
    if (size === "small") {
      return ` width: 40px;
    height: 40px;`;
    } else if (size === "large") {
      return ` width: 64px;
    height: 64px;
    padding: 3px;`;
    } else if (size) {
      return ` width: ${size}px;
    height: ${size}px;`;
    } else {
      return `
          width: 48px;
          height: 48px;
        `;
    }
  }}

  .center-circle {
    background: ${({ isGrey, isGreen }) => {
      if (isGreen) {
        return "linear-gradient(180deg, #289B02 0%, #65B724 29.17%, #8CC939 100%)";
      }
      if (isGrey) {
        return "linear-gradient(180deg, #494949 0%, #d9d9d9 100%)";
      }
      return "linear-gradient(180deg, #AE6306 0%, #D68B2B 29.69%, #E79B3B 100%)"; // 默认值
    }};
    border-radius: 50%;
    padding: ${({ size }) => {
      if (size == "large") {
        return "2px";
      }
      return "1.25px"; // 默认值
    }};
    width: 100%;
    height: 100%;
    .inner-circle {
      background: #613c17;
      box-shadow: ${({ size }) => {
        if (size == "large") {
          return "0px 2px 0px 0px rgba(0, 0, 0, 0.25) inset";
        }
        return "0px 1.25px 0px 0px rgba(0, 0, 0, 0.25) inset"; // 默认值
      }};
      width: 100%;
      height: 100%;
      border-radius: 50%;
      img {
        border-radius: 50%;
        box-shadow: ${({ size }) => {
          if (size == "large") {
            return "0px 2px 0px 0px rgba(0, 0, 0, 0.25) inset";
          }
          return "0px 1.25px 0px 0px rgba(0, 0, 0, 0.25) inset"; // 默认值
        }};
      }
    }
  }
`;
type IAvatar = {
  account: string | undefined;
  size?: "large" | "small" | undefined | number;
  isGreen?: boolean;
  isGrey?: boolean;
  winner?: boolean;
};

export const PlayerAvatarList: React.FC<IAvatar> = ({
  account,
  size,
  isGreen = false,
  isGrey = false,
  winner,
}) => {
  const { selectedAvatar, selectedBackground } = useAvatar(account, false);
  return (
    <OuterCircle size={size} isGreen={isGreen} isGrey={isGrey} winner={winner}>
      <div className="center-circle ">
        <div className="inner-circle">
          {account ? (
            <img
              decoding="async"
              loading="lazy"
              width={"100%"}
              src={selectedAvatar}
              style={{ background: selectedBackground }}
            />
          ) : (
            <img
              decoding="async"
              loading="lazy"
              width={"100%"}
              src={preStaticUrl + `/img/default_avatar.png`}
            />
          )}
        </div>
      </div>
    </OuterCircle>
  );
};

export default PlayerAvatar;
