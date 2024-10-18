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
  ["treasureark", "treasureark", "airdropLoading"],
  ["games"],
  ["zeroGas"],
];
type INavList = {
  link: string;
  linkList: string[];
  label: string;
  classNames: string;
  isTarget: boolean;
  showIfGames?: boolean; // 只显示 games 的时候显不显示
  showArk: boolean; // 只显示 games 的时候显不显示
  isLink: boolean;
  icon?: string;
};
export const NavList: INavList[] = [
  {
    link: `/${NavKey[0][0]}`,
    linkList: NavKey[0],
    label: "Treasure Ark",
    classNames: "airdrop",
    isTarget: false,
    showIfGames: false, // 只显示 games 的时候显不显示
    showArk: true,
    isLink: true,
  },
  {
    link: `/${NavKey[1][0]}`,
    linkList: NavKey[1],
    label: "Games",
    classNames: "games",
    isTarget: false,
    showIfGames: true,
    showArk: true,
    isLink: true,
  },
  {
    link: `/${NavKey[2][0]}`,
    linkList: NavKey[2],
    label: "Zero Gas",
    classNames: "zero_gas",
    isTarget: false,
    showIfGames: false,
    showArk: true,
    isLink: true,
  },
  {
    link: "https://zytron.zypher.network/layer3",
    linkList: [],
    label: "Layer3",
    icon: preStaticUrl + "/img/icon/pixel_link.svg",
    classNames: "network",
    isTarget: true,
    showIfGames: true,
    showArk: false,
    isLink: false,
  },
  {
    link: "https://zypher.network/",
    linkList: [],
    label: "Zypher Network",
    icon: preStaticUrl + "/img/icon/pixel_link.svg",
    classNames: "network",
    isTarget: true,
    showIfGames: true,
    showArk: true,
    isLink: false,
  },
];

const Navigation = memo(
  ({ pathname, Link }: { pathname: string; Link: any }) => {
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
      if (!isW768 && linksRefs.current.length) {
        const index = NavKey.findIndex((key) => key.includes(pathname));
        if (index > -1) {
          setChooseIndex(index);
          setActiveIndex(index);
        }
      }
    }, [pathname, isW768, linksRefs.current]);
    useEffect(() => {
      init();
    }, [init]);
    const init2 = useCallback(async () => {
      if (!isW768 && linksRefs.current.length) {
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
    }, [chooseIndex, pathname, linksRefs.current]);

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
        {NavList.filter((v) =>
          window.isGames ? v.showIfGames : v.showArk
        ).map((v, index) => (
          <LinkComp
            Link={Link}
            item={v}
            key={v.label}
            className={`nav_${v.classNames} `}
            setLinksRefs={(ref) => {
              linksRefs.current[index] = ref;
            }}
          >
            {v.label}
            {v.icon ? (
              <img
                decoding="async"
                loading="lazy"
                src={v.icon}
                alt="pixel_link"
                className="nav_img"
              />
            ) : null}
          </LinkComp>
        ))}
        <div className="pixel_line" />
      </div>
    );
  }
);
interface LinkProps {
  className: string;
  item: INavList;
  children: React.ReactNode;
  setLinksRefs: (ref: HTMLAnchorElement | null) => void;
  Link: any;
}
const LinkComp = memo(
  ({ item, children, setLinksRefs, className, Link }: LinkProps) => {
    const ref = useRef<HTMLAnchorElement | null>(null);
    useEffect(() => {
      if (ref.current) {
        setLinksRefs(ref.current);
      }
    }, [ref]);
    if (item.isLink) {
      return (
        <Link to={item.link} className={className} ref={ref}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={item.link}
        ref={ref}
        target={item.isTarget ? "_blank" : undefined}
        rel={item.isTarget ? "noreferrer" : undefined}
        className={className}
      >
        {children}
      </a>
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
