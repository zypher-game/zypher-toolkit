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
interface Window {
  ethereum: any;
  web3: any;
  mcrypto: any;
  env: string;
  isGames: boolean;
}
