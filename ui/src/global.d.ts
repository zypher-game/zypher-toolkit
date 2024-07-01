declare module "*.svg" {
  const dataUrl: string;
  export default dataUrl;
}

declare module "*.png" {
  const dataUrl: string;
  export default dataUrl;
}
declare module "*.stylus" {
  const styles: { [className: string]: string };
  export default styles;
}
declare global {
  interface Window {
    ethereum: any;
    web3: any;
    mcrypto: any;
    env: string;
    isGames: boolean;
  }
}
import "react";
declare module "react" {
  interface ImgHTMLAttributes<T> extends React.HTMLAttributes<T> {
    fetchPriority?: "high" | "low" | "auto";
  }
}
