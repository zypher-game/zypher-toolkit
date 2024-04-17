import React, { useEffect, useState } from "react";
import "./SvgComponent.stylus";
const SvgComponent = ({ src, className, ...rest }: any) => {
  const [svgContent, setSvgContent] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) throw new Error("Failed to load SVG");
        const text = await response.text();
        const wrapper = document.createElement("div");
        wrapper.innerHTML = text;
        const svgElement = wrapper.querySelector("svg");
        if (svgElement) {
          const Component = () => (
            <span
              className={`svg_component ${className ?? ""}`}
              {...rest}
              dangerouslySetInnerHTML={{ __html: svgElement.outerHTML }}
            />
          );
          setSvgContent(Component);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [src]);

  return svgContent || <></>;
};

export default SvgComponent;
