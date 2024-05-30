import { preStaticUrl } from "../constant/constant";

function hashToSeed(ethereumAddress?: string): number {
  if (!ethereumAddress) {
    return 1;
  }
  if (window.mcrypto) {
    // 使用SHA-256哈希算法计算地址的哈希值
    const hash = window.mcrypto
      .createHash("sha1")
      .update(ethereumAddress)
      .digest("hex");
    // 将哈希值解析为一个整数种子
    const seed = parseInt(hash.slice(0, 16), 16); // 16个十六进制字符转换为整数

    return seed;
  }
  return 0;
}
export default (
  account?: string
): {
  selectedAvatar: string;
  selectedBackground: string;
} => {
  // 使用以太坊地址的哈希值生成确定性的种子
  const seed = hashToSeed(account?.toLowerCase());

  const selectedAvatar = [
    preStaticUrl + "/img/tvl/hero/Agil_Avatar.png",
    preStaticUrl + "/img/tvl/hero/Celus_Avatar.png",
    preStaticUrl + "/img/tvl/hero/Ivan_Avatar.png",
    preStaticUrl + "/img/tvl/hero/Liana_Avatar.png",
    preStaticUrl + "/img/tvl/hero/Yueling_Avatar.png",
  ][seed % 6];
  const selectedBackground = [
    "#7ADBB2",
    "#FFD584",
    "#9269EB",
    "#EB6676",
    "#FFD584",
    "#62A1FF",
    "#E78C65",
    "#FF603E",
    "#99E675",
    "#65DAD3",
    "#62A1FF",
    "#E78C65",
    "#FF603E",
    "#99E675",
    "#65DAD3",
  ][seed % 15];

  if (!account) {
    return {
      selectedAvatar: preStaticUrl + "/img/default_avatar.png",
      selectedBackground: "#EFEFEF",
    };
  }

  return { selectedAvatar, selectedBackground };
};
