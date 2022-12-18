import React from "react";
import { Oval } from  'react-loader-spinner'

const Loader = ({height, width, color, stroke}) => (
  <Oval
    height={height}
    width={width}
    color={color}
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel="oval-loading"
    secondaryColor={color}
    strokeWidth={stroke}
    strokeWidthSecondary={stroke}
  />
);

export default Loader;
