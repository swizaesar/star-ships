import React, { useRef, useEffect } from "react";
import { Container } from "reactstrap";
import useIntersection from "./index-scroll-fn";

const InfiniteScroll = (props) => {
    const {
        children,
        onLoadData,
        threshold,
        loadingComponent,
        isLoading,
    } = props;
    const ref = useRef();
    const refLast = useRef();
    const [isIntersecting, setIntersecting] = useIntersection(
        ref,
        refLast,
        threshold
    );

    useEffect(() => {
        if (isIntersecting && !isLoading) {
            onLoadData();
            setIntersecting(false);
        }
    });

    return (
        <div ref={ref}>
            {children}

            <Container>
                <div ref={refLast}>{isLoading ? loadingComponent : false}</div>
            </Container>
        </div>
    );
};

export default InfiniteScroll;
