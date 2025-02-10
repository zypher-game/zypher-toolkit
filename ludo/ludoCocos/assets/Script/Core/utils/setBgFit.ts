export const setBgFit = (bgNode: cc.Node) => {
  let heightScale =
    cc.view.getVisibleSize().height / cc.view.getDesignResolutionSize().height;
  let widthScale =
    cc.view.getVisibleSize().width / cc.view.getDesignResolutionSize().width;
  let scale = heightScale > widthScale ? heightScale : widthScale;
  bgNode.setScale(scale);
};
