import { isEqual } from "../../../utils/lodash";
import React, { FC, memo } from "react";

import { preStaticUrl } from "../../../constant/constant";
import SvgComponent from "../../SvgComponent/SvgComponent";
interface IProps {
  className: string;
}
const CommunityLink: FC<IProps> = memo(({ className }: IProps) => {
  return (
    <div className={className}>
      <a
        href="https://twitter.com/Zypher_network"
        target="_blank"
        rel="noreferrer"
      >
        <SvgComponent
          className="community_svg"
          src={preStaticUrl + "/img/layout/twitter.svg"}
        />
      </a>
      <a
        href="https://discord.com/invite/MKJZhS4p2T"
        target="_blank"
        rel="noreferrer"
      >
        <SvgComponent
          className="community_svg"
          src={preStaticUrl + "/img/layout/discord.svg"}
        />
      </a>
      <a
        href="https://zyphergames.substack.com"
        target="_blank"
        rel="noreferrer"
      >
        <SvgComponent
          className="community_svg"
          src={preStaticUrl + "/img/layout/medium.svg"}
        />
      </a>
      <a href="https://github.com/zypher-game" target="_blank" rel="noreferrer">
        <SvgComponent
          className="community_svg"
          src={preStaticUrl + "/img/layout/github.svg"}
        />
      </a>
      <a
        href="https://zyphergames.notion.site/Zypher-Games-101-58f3fc6362dc473db187dcec0b63e74e"
        target="_blank"
        rel="noreferrer"
      >
        <SvgComponent
          className="community_svg"
          src={preStaticUrl + "/img/layout/gitbook.svg"}
        />
      </a>
    </div>
  );
}, isEqual);
export default CommunityLink;
