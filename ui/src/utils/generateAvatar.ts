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
    "#83A285",
    "#A083AE",
    "#FF637F",
    "#FFA26D",
    "#77BEFF",
    "#80F0BA",
    "#FFCF4E",
    "#FF603E",
    "#F44242",
    "#D57CFF",
    "#7075FF",
    "#808242",
    "#804343",
    "#FF56B1",
    "#6992A9",
  ][seed % 15];

  if (!account) {
    return {
      selectedAvatar: preStaticUrl + "/img/default_avatar.png",
      selectedBackground: "#EFEFEF",
    };
  }

  return { selectedAvatar, selectedBackground };
};
