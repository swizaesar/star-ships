import styled, { keyframes } from "styled-components";

export const shimmer = keyframes`
    100% {
      transform: translateX(100%);
    }
`;

const SkeletonLoadingStyle = styled.div`
    height: ${props => props.height};
    width: ${props => props.width};
    position: relative;
    overflow: hidden;
    background-color: #ddd;
    border-radius: ${props => props.circle || "6px"};

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
            90deg,
            rgba(#fff, 0) 0,
            rgba(#fff, 0.2) 20%,
            rgba(#fff, 0.5) 60%,
            rgba(#fff, 0)
        );
        background: #e8e8e8;
        animation: ${shimmer} 2s infinite;
        content: "";
    }
`;
export default SkeletonLoadingStyle;
