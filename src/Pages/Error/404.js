import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Style = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const ErrorPage = () => {
    return (
        <Style>
            <div>
                <div>404</div>
                <div>Page Not Found</div>
                <Link to="/"> Back to home</Link>
            </div>
        </Style>
    );
};
export default ErrorPage;
