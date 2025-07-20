import { changeLanguage } from "i18next";
import React, { memo, useCallback } from "react";

import "./Footer.stylus";
import { languageList } from "../SideBar/component/Language";
import { useIsW768 } from "../../hooks/useWindowSize";
import CommunityLink from "../SideBar/component/CommunityLink";
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
    title: "Proof of Prompt",
    content:
      "Zypher\'s cryptographic verification protocol for prompt integrity. It enables AI agents to commit to prompts on-chain using zero-knowledge proofs, ensuring that prompts remain tamper-proof and verifiable without leaking sensitive inputs. Through standardized RESTful APIs and SDKs, Proof of Prompt provides a foundational trust interface for any AI system.",
    link: "https://wiki.zypher.network/zypher-ai-agent/zypher-ai-agent/zkprompt",
  },
  {
    show: false,
    title: "Security Browser",
    content:
      "A real-time browser designed for end users to audit AI agent interactions. It verifies the integrity of prompts and responses, displays risk labels, and flags anomalies. Users can actively contribute feedback and ratings through the embedded community trust panel, earning incentives for strengthening the AI audit network.",
    link: "https://wiki.zypher.network/",
  },
  {
    show: false,
    title: "Proof Mining",
    content:
      "Zypher\'s decentralized validation network powered by a cryptoeconomic incentive mechanism. Community-operated Prover nodes and individual users collaborate to verify agent outputs and generate scalable ZK proofs. This ensures tamper-proof AI execution without relying on centralized validators—fully aligned with Web3\'s trustless design.",
    link: "https://docs.zypher.network/mining/overview/",
  },
  {
    show: true,
    title: "Zytron",
    content:
      "A gasless AI rollup chain built on BNB Chain, optimized for zero-knowledge agent computation. Zytron supports high-frequency inference, ZK proof generation, and AI-specific workloads, serving as the on-chain backbone for Proof of Prompt and Proof of Inference. With over 3 million wallets interacting in pre-mainnet, it anchors Zypher\'s scalable, decentralized infrastructure.",
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
                <h4>User Docs</h4>
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
