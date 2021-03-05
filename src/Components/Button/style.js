import styled from "styled-components";
import { Button } from "reactstrap";
import { color } from "../../Utils/Variable";

const Style = styled(Button)`
    color: ${(props) =>
        props.color === "primary"
            ? "#fff"
            : props.color === "outline-primary"
            ? color.primary
            : "#fff"};
    background: ${(props) =>
        props.color === "primary"
            ? color.primary
            : props.color === "outline-primary"
            ? "#fff"
            : props.color};
    border: ${(props) =>
        props.color === "primary"
            ? `1px solid ${color.primary}`
            : props.color === "outline-primary"
            ? `unset`
            : `1px solid  ${props.color}`};
    font-weight: 700;
    transform: translateY(0px);
    transition: all 0.25s ease;
    font-size: ${(props) => (props.size ? props.size + "px" : "14px")};

    &:hover {
        color: ${(props) =>
            props.color === "primary"
                ? "#fff"
                : props.color === "outline-primary"
                ? color.primary
                : "#fff"};
        background: ${(props) =>
            props.color === "primary"
                ? color.primary
                : props.color === "outline-primary"
                ? "#fff"
                : props.color};
        border: ${(props) =>
            props.color === "primary"
                ? `1px solid ${color.primary}`
                : props.color === "outline-primary"
                ? `unset`
                : `1px solid  ${props.color}`};
        opacity: 0.8;
    }
    &:focus {
        color: ${(props) =>
            props.color === "primary"
                ? "#fff"
                : props.color === "outline-primary"
                ? color.primary
                : "#fff"};
        background: ${(props) =>
            props.color === "primary"
                ? color.primary
                : props.color === "outline-primary"
                ? "#fff"
                : props.color};
        border: ${(props) =>
            props.color === "primary"
                ? `1px solid ${color.primary}`
                : props.color === "outline-primary"
                ? "unset"
                : `1px solid  ${props.color}`};
        opacity: 0.8;
        transform: translateY(-1px);
    }
`;
export default Style;
