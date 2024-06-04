import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Navigation.stylus";
import useWindowSize from "../../../hooks/useWindowSize";
import sleep from "../../../utils/sleep";
import { preStaticUrl } from "../../../constant/constant";
export const NavKey = [
  ["", "airdrop", "airdropLoading"],
  ["games"],
  ["zeroGas"],
];
export const NavList = [
  {
    link: `/${NavKey[0][0]}`,
    label: "Airdrop",
    linkList: NavKey[0],
    classNames: "airdrop",
    isTarget: false,
    showIfGames: false, // 只显示 games 的时候显不显示
  },
  {
    link: `/${NavKey[1][0]}`,
    label: "Games",
    linkList: NavKey[1],
    classNames: "games",
    isTarget: false,
    showIfGames: true,
  },
  {
    link: `/${NavKey[2][0]}`,
    label: "Zero Gas",
    linkList: NavKey[2],
    classNames: "zero_gas",
    isTarget: false,
    showIfGames: false,
  },
  {
    link: "https://zypher.network/",
    label: "Zypher Network",
    icon: preStaticUrl + "/img/icon/pixel_link.svg",
    classNames: "network",
    isTarget: true,
    showIfGames: true,
  },
];

const Navigation: React.FC<{ pathname: string }> = memo(
  ({ pathname }: { pathname: string }) => {
    const [chooseIndex, setChooseIndex] = useState<number | null | undefined>(
      null
    );
    const [activeIndex, setActiveIndex] = useState<number | null | undefined>(
      null
    );
    const linksRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const { width } = useWindowSize();
    const { isW768, isW1670, isWBig } = useMemo(() => {
      return {
        isW768: width <= 768,
        isW1540: width <= 1540 && width > 768,
        isW1670: width < 1670 && width > 1540,
        isWBig: width >= 1670,
      };
    }, [width]);
    const init = useCallback(async () => {
      if (!isW768) {
        const index = NavKey.findIndex((key) => key.includes(pathname));
        if (index > -1) {
          setChooseIndex(index);
          setActiveIndex(index);
        }
      }
    }, [pathname, isW768]);
    useEffect(() => {
      init();
    }, [init]);
    const init2 = useCallback(async () => {
      if (!isW768) {
        linksRefs.current.forEach(async (linkRef, index) => {
          if (linkRef?.className === "nav_on") {
            const w = hasFontWeight600(linkRef);
            if (!w) {
              await sleep(0.2);
            }
            if (w) {
              setActiveIndex(index);
            }
          }
          if (chooseIndex !== null) {
            const handleMouseEnter = () => {
              setActiveIndex(index);
            };
            const handleMouseLeave = () => {
              setActiveIndex(chooseIndex);
            };
            if (linkRef) {
              linkRef.addEventListener("mouseenter", handleMouseEnter);
              linkRef.addEventListener("mouseleave", handleMouseLeave);

              // 清理回调函数，防止内存泄漏
              return () => {
                linkRef.removeEventListener("mouseenter", handleMouseEnter);
                linkRef.removeEventListener("mouseleave", handleMouseLeave);
              };
            }
          }
        });
      }
    }, [chooseIndex, pathname]);
    useEffect(() => {
      init2();
    }, [chooseIndex, pathname]);

    const updateLinePosition = useCallback(async () => {
      if (
        activeIndex !== null &&
        activeIndex !== undefined &&
        linksRefs.current[activeIndex]
      ) {
        const line = document.querySelector(".pixel_line") as HTMLElement;
        const link = linksRefs.current[activeIndex];
        if (link) {
          const linkWidth = link.offsetWidth;
          if (linkWidth) {
            const leftPosition = link.offsetLeft + (linkWidth - 36) / 2;
            line.style.width = "36px";
            line.style.left = `${leftPosition}px`; // 67px   71px
            if (chooseIndex !== activeIndex) {
              line.style.opacity = "0.8";
            }
          } else {
            await sleep(0.7);
            updateLinePosition();
          }
        }
      }
    }, [chooseIndex, activeIndex, pathname, linksRefs]);
    useEffect(() => {
      updateLinePosition();
    }, [chooseIndex, activeIndex, pathname]);
    useEffect(() => {
      (async () => {
        await sleep(0.3);
        updateLinePosition();
      })();
    }, [isW768, isW1670, isWBig]);
    return (
      <div className="nav">
        {NavList.filter((v) => (window.isGames ? v.showIfGames : true)).map(
          (v, index) => (
            <a
              key={v.label}
              className={`nav_${v.classNames}`}
              href={v.link}
              target={v.isTarget ? "_blank" : undefined}
              rel={v.isTarget ? "noreferrer" : undefined}
              ref={(ref) => (linksRefs.current[index] = ref)}
            >
              {v.label}
              {v.icon ? (
                <img src={v.icon} alt="pixel_link" className="nav_img" />
              ) : null}
            </a>
          )
        )}
        <div className="pixel_line" />
      </div>
    );
  }
);
function hasFontWeight600(element: HTMLAnchorElement | null): boolean {
  if (!element) {
    return false;
  }

  const computedStyle = window.getComputedStyle(element);
  const fontWeight = computedStyle.getPropertyValue("font-weight");
  // 类型断言，确保 fontWeight 是 string 类型，尽管在实际应用中这应该是安全的
  return fontWeight === ("600" as unknown as string);
}
export default Navigation;
