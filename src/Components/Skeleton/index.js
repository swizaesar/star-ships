import React from "react";
import SkeletonLoadingStyle from "./index.style";

const SkeletonLoading = ({
    width = "100%",
    height = "20px",
    circle = false,
    style = {}
}) => {
    return (
        <SkeletonLoadingStyle
            style={{ ...style }}
            width={width}
            height={height}
            circle={circle && "50%"}
        ></SkeletonLoadingStyle>
    );
};

export default SkeletonLoading;
