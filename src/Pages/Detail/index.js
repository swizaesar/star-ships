import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { useStore } from "../../Reducers";
import DefaultImage from "../../Components/Assets/Image/rocket2.png";
import service from "./index.service";
import Film from "./Film";
import Pilot from "./Pilot";
import styled from "styled-components";
import Rating from "../../Components/Rating";
import { formatMoney } from "../../Utils/PriceConverter";

const Style = styled.div`
    .ships-data {
        display: flex;
        align-items: baseline;
        margin-bottom: 10px;
        &-label {
            margin-right: 20px;
            width: 130px;
        }
        &-name {
            font-weight: 600;
        }
    }
    @media (max-width: 767px) {
        h2 {
            text-align: center;
        }
        font-size: 12px;
        img {
            width: 100px;
            display: block;
            margin: 0 auto 20px;
        }
    }
`;

const Detail = (props) => {
    const history = useHistory();
    const { dispatch, state } = useStore();
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const [isFirstGet, setFirstGet] = React.useState(true);
    const [data, setData] = React.useState(false);

    React.useEffect(() => {
        if (isFirstGet) {
            service.starShips({ dispatch, params: props.match.params.id });
            service.starShipsClear({ dispatch });
            setFirstGet(false);
        }
    }, [isFirstGet, dispatch, props]);
    React.useEffect(() => {
        if (state?.starShips?.detail?.isSuccess) {
            setData(state.starShips.detail.data);
        }
        if (state?.starShips?.detail?.isError) {
            history.push("/404");
        }
    }, [state, history]);
    return (
        <Style>
            {data && (
                <Container>
                    <div className="mb-5">
                        <Link to="/">
                            <i className="fas fa-arrow-left mr-1"></i> Back
                        </Link>
                    </div>
                    <div>
                        <Row>
                            <Col xl="12">
                                <h2 className="mb-4">{data.name}</h2>
                            </Col>
                            <Col xl="4" lg="4" md="4" sm="12">
                                <img
                                    src={DefaultImage}
                                    alt={data.name}
                                    className="img-fluid"
                                />
                            </Col>
                            <Col xl="8" lg="8" md="8" sm="12">
                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        Name:
                                    </div>
                                    <div className="ships-data-name">
                                        {data.name}
                                    </div>
                                </div>
                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        Model:
                                    </div>
                                    <div className="ships-data-name">
                                        {data.model}
                                    </div>
                                </div>
                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        Starship class:
                                    </div>
                                    <div className="ships-data-name">
                                        {data.starship_class}
                                    </div>
                                </div>
                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        Manufacturer:
                                    </div>
                                    <div className="ships-data-name">
                                        {data.manufacturer}
                                    </div>
                                </div>
                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        MGLT:
                                    </div>
                                    <div className="ships-data-name">
                                        {data.MGLT === "unknown"
                                            ? "-"
                                            : `${data.MGLT} Megalights`}
                                    </div>
                                </div>
                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        Crew:
                                    </div>
                                    <div className="ships-data-name">
                                        {data.crew} People
                                    </div>
                                </div>
                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        Consumables:
                                    </div>
                                    <div className="ships-data-name">
                                        {data.consumables === "unknown"
                                            ? "-"
                                            : data.consumables}
                                    </div>
                                </div>
                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        Length:
                                    </div>
                                    <div className="ships-data-name">
                                        {data.length} meters
                                    </div>
                                </div>
                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        Speed:
                                    </div>
                                    <div className="ships-data-name">
                                        {data.max_atmosphering_speed === "n/a"
                                            ? "-"
                                            : `${data.max_atmosphering_speed} kilometers/hour`}
                                    </div>
                                </div>
                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        Cargo capacity:
                                    </div>
                                    <div className="ships-data-name">
                                        {data.cargo_capacity === "unknown"
                                            ? "-"
                                            : formatMoney({
                                                  amount: Number(
                                                      data.cargo_capacity
                                                  ),
                                                  currency: "",
                                              })}
                                    </div>
                                </div>
                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        Cost in credits:
                                    </div>
                                    <div className="ships-data-name">
                                        {data.cost_in_credits === "unknown"
                                            ? "-"
                                            : formatMoney({
                                                  amount: Number(
                                                      data.cost_in_credits
                                                  ),
                                                  currency: "$",
                                              })}
                                    </div>
                                </div>
                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        Film:
                                    </div>

                                    <div>
                                        {data.films.length > 0 ? (
                                            data.films.map((item, key) => {
                                                return (
                                                    <div
                                                        className="ships-data-name"
                                                        key={key}
                                                    >
                                                        <Film
                                                            keyId={key}
                                                            item={item}
                                                        />
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="ships-data-name">
                                                -
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        Pilots:
                                    </div>

                                    <div>
                                        {data.pilots.length > 0 ? (
                                            data.pilots.map((item, key) => {
                                                return (
                                                    <div
                                                        className="ships-data-name"
                                                        key={key}
                                                    >
                                                        <Pilot
                                                            keyId={key}
                                                            item={item}
                                                        />
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="ships-data-name">
                                                -
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        Passengers:
                                    </div>
                                    <div className="ships-data-name">
                                        {data.passengers === "n/a" ||
                                        data.passengers === "0" ||
                                        data.passengers === "unknown"
                                            ? "-"
                                            : `${data.passengers} People`}
                                    </div>
                                </div>
                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        Created:
                                    </div>
                                    <div className="ships-data-name">
                                        {new Date(data.created).getDate()}-
                                        {
                                            month[
                                                new Date(
                                                    data.created
                                                ).getMonth()
                                            ]
                                        }
                                        -{new Date(data.created).getFullYear()}
                                    </div>
                                </div>

                                <div className="ships-data">
                                    <div className="ships-data-label">
                                        Rating:
                                    </div>
                                    <div className="ships-data-name">
                                        <Rating
                                            rating={Number(
                                                data.hyperdrive_rating
                                            )}
                                            totalStars={1}
                                            textColor="text-white"
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            )}
        </Style>
    );
};
export default Detail;
