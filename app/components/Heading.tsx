import React from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-left"}>
      <div className="text-2xl font-bold">{title}</div>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default Heading;
