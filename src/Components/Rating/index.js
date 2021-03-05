import React from "react";
import styled from "styled-components";

const RatingStyle = styled.div`
    text-align: left;
    i {
        font-size: 14px;
    }
    span {
        font-size: 12px;
    }
`;

const Rating = ({
    rating = 0,
    totalStars = 5,
    activeColor = "#ffc400",
    inActiveColor = "#bbc0d5",
    textColor = "text-black-50",
}) => {
    return (
        <RatingStyle>
            {[...Array(totalStars)].map((el, i) =>
                i < Math.floor(rating) ? (
                    <i
                        key={i}
                        className="fa fa-star"
                        style={{ color: activeColor }}
                    ></i>
                ) : (
                    <i
                        key={i}
                        className="fa  fa-star"
                        style={{ color: inActiveColor }}
                    ></i>
                )
            )}
            {textColor && <span className={textColor}>{` (${rating})`}</span>}
        </RatingStyle>
    );
};

export default Rating;
