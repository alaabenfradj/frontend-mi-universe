import React from "react";
import { Link } from "react-router-dom";
import logoImg from "images/logo.png";
import logoLightImg from "images/logo-light.png";
import LogoSvg from "./LogoSvg";
import LogoPng from "./LogoPng";

export interface LogoProps {
  img?: string;
  imgLight?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
}) => {
  return (
    <Link to="/mi" className="ttnc-logo inline-block text-primary-6000">
      <LogoPng />
    </Link>
  );
};

export default Logo;
