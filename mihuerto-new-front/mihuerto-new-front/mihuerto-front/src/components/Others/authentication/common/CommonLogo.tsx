import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ImgPath } from "utils/Constant";
interface propsType {
  alignLogo?: string;
  hasLink?: boolean;
}
const CommonLogo = ({ alignLogo }: propsType) => {
  const renderLogo = () => {
    return (
      <>
        <Image
          width={121}
          height={35}
          className="img-fluid for-light"
          src={`${ImgPath}/logo-icon.png`}
          alt="looginpage"
        />
        <Image
          width={121}
          height={35}
          className="img-fluid for-dark"
          src={`${ImgPath}/logo-icon.png`}
          alt="looginpage"
        />
      </>
    );
  };

  return (
    <Link
      className={`logo ${alignLogo ? alignLogo : ""} `}
      href="dashboard/home"
    >
      {renderLogo()}
    </Link>
  );
};

export default CommonLogo;
