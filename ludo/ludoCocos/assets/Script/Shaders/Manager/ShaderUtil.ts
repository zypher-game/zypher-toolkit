import { GLoader } from "../../Core/GLoader/GLoader";
import { ViewUtil } from "./../../Game/Views/ViewUtil/VIewUtil";

export default class ShaderUtil {
  public static gray(node: cc.Node, isChild = true) {
    if (!node) return;
    if (!isChild) {
      let renderComp =
        node.getComponent(cc.Sprite) ||
        node.getComponent("MaskSprite") ||
        node.getComponent("PlistLabel");
      if (renderComp) {
        renderComp.setMaterial(
          0,
          cc.MaterialVariant.createWithBuiltin("2d-gray-sprite", renderComp)
        );
        renderComp["_activateMaterial"](true);
      }
      return;
    }
    ViewUtil.func.seachChildrens(node, (child) => {
      let renderComp =
        child.getComponent(cc.Sprite) ||
        child.getComponent("MaskSprite") ||
        child.getComponent("PlistLabel");
      if (renderComp) {
        renderComp.setMaterial(
          0,
          cc.MaterialVariant.createWithBuiltin("2d-gray-sprite", renderComp)
        );
        renderComp["_activateMaterial"](true);
      }
    });
  }

  public static normal(node: cc.Node, isChild = true) {
    if (!node) return;
    if (!isChild) {
      let renderComp =
        node.getComponent(cc.Sprite) ||
        node.getComponent("MaskSprite") ||
        node.getComponent("PlistLabel");
      if (renderComp) {
        renderComp.setMaterial(
          0,
          cc.MaterialVariant.createWithBuiltin("2d-sprite", renderComp)
        );
        renderComp["_activateMaterial"](true);
      }
      return;
    }
    ViewUtil.func.seachChildrens(node, (child) => {
      let renderComp =
        child.getComponent(cc.Sprite) ||
        child.getComponent("MaskSprite") ||
        child.getComponent("PlistLabel");
      if (renderComp) {
        renderComp.setMaterial(
          0,
          cc.MaterialVariant.createWithBuiltin("2d-sprite", renderComp)
        );
        renderComp["_activateMaterial"](true);
      }
    });
  }

  public static circularMask1(node: cc.Node) {
    let material = GLoader.getPreLoadAsset<cc.Material>(
      "Materials/sp-circular"
    );
    if (!node) return;
    let sp = node.getComponent(cc.Sprite);
    if (!sp) return;
    sp.setMaterial(0, material);
  }
}
