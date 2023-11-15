import React from "react";

interface AvatarProps {
  src: string;
  altText?: string;
  size?: number;
  style: any;
}

const Avatar: React.FC<AvatarProps> = ({ src, altText, style, size = 64 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        ...style,
      }}
    >
      <img
        src={src}
        alt={altText}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default Avatar;
