import { changeLanguage } from "i18next";
import React, { memo, useCallback } from "react";

import "./Footer.stylus";
import { languageList } from "../SideBar/component/Language";
import { useIsW768 } from "../../hooks/useWindowSize";
import CommunityLink from "../SideBar/component/CommunityLink";
import { preStaticUrl } from "../../constant/constant";
import storage from "../../utils/storage";
import { ZypherLogo } from "../SideBar/SideBar";

type ISolutionsItem = {
  title: string;
  content: string;
  show?: boolean;
  link?: string;
};
const SolutionsList: ISolutionsItem[] = [
  {
    show: true,
    title: "Distributed Prover Network",
    content:
      "Zypher's distributed prover network generates scalable ZK proofs, ensuring secure, verifiable computations. It operates on a decentralized, incentivized merged mining model.",
  },
  {
    show: true,
    title: "ZK Prompt",
    content:
      "ZKPrompt enables AI agents to commit to prompts privately while generating verifiable outputs using zero-knowledge proofs. It ensures secure, trustless interactions between AI agents and decentralized applications, allowing on-chain verification without exposing sensitive input data.",
  },
  {
    show: true,
    title: "ZK Inference",
    content:
      "zkInference encodes AI models and logic into zk circuits, enabling trustless, privacy-preserving off-chain computations with verifiable on-chain proofs of accuracy.",
  },
  {
    show: true,
    title: "Secret Engine",
    content:
      "A suite of zk-as-a-service SDKs, enabling information asymmetry essential for strategic gaming mechanisms, offering fully on-chain secrets and randomness with guaranteed fairness. Soon to be supported as AVSes.",
    link: "https://docs.zypher.network/zk/secret/overview/",
  },
  {
    show: false,
    title: "AW Engine",
    content:
      "A scalable, modular framework designed to support vertical hyper-scaling. Programmable through circuits or zkVM, with the z4 SDK specifically crafted for real-time multiplayer events, including PvP scenarios.",
    link: "https://docs.zypher.network/zk/aw/overview/",
  },
  {
    show: false,
    title: "Zytron Kit",
    content:
      "A Sovereign Rollup Stack engineered for the seamless deployment of dedicated gaming infrastructure, featuring 0 gas, 0.1s blocktime, zk pre-compiles and more. Optimized for highly interactive games such as MMOs and FOCGs.",
    link: "https://zytron.zypher.network/",
  },
  {
    show: false,
    title: "Redacted",
    content:
      "Deploy large-scale multiplayer games on [redacted] using your preferred programming languages (RUST, Solidity, WASM) and game engines (Bevy, Unity, Unreal). Pre-registration will be available soon.",
  },
];
const Footer = memo(
  ({ showLogo, Link }: { showLogo: boolean; Link: any }) => {
    const isMobile = useIsW768();

    const changeLanguageHandle = useCallback((item) => {
      changeLanguage(item.keyValue);
      storage.set("language", item.keyValue);
    }, []);
    return (
      <div className="footer_wrap">
        <div className="footer_inner">
          <div className="footer_top">
            {showLogo ? (
              <div className="footer_item">
                <ZypherLogo Link={Link} isMobile={isMobile} />
              </div>
            ) : null}
            <div className="footer_item">
              <h4>Language</h4>
              <ul className="language_item">
                {languageList.map((v) => (
                  <li key={v.label} onClick={() => changeLanguageHandle(v)}>
                    <p>{v.label}</p>
                  </li>
                ))}
              </ul>
              <a href="/whitepaper" target="_blank" rel="noreferrer">
                <h4 className="whitepaper">White paper</h4>
              </a>
              <a href="/economics" target="_blank" rel="noreferrer">
                <h4>Econ paper</h4>
              </a>
              <a
                href="https://wiki.zypher.network/"
                target="_blank"
                rel="noreferrer"
              >
                <h4>Wiki</h4>
              </a>
            </div>
            <div className="footer_item">
              <h4>Product</h4>
              <ul className="product_item">
                {SolutionsList.filter((v) => v.link).map((v) => (
                  <li key={v.title}>
                    <a href={v.link} target="_blank" rel="noreferrer">
                      {v.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    className="product_item_white"
                    href="https://drive.google.com/drive/folders/1hEpEikETzoxAMEFwZk7S5nksO1bdsrxh"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h4>Brand Kit</h4>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer_item">
              <h4>Social</h4>
              <CommunityLink className="footer_community" />
            </div>
          </div>
          <div className="footer_bottom">
            {isMobile ? (
              <>
                <p>Zypher Games 2025</p>
                <p>|</p>
                <p>Privacy Policy</p>
                <p>|</p>
                <p>Terms of Service</p>
              </>
            ) : (
              <>
                <p>Copyright © 2025 Zypher Games</p>
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  },
  () => {
    return false;
  }
);
export default Footer;
