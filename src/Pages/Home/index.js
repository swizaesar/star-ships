import React from "react";
import styled from "styled-components";
import { useStore } from "../../Reducers";
import Button from "../../Components/Button";
import {
    Card,
    CardBody,
    Col,
    Container,
    FormGroup,
    Input,
    Row,
} from "reactstrap";
import service from "./index.service";
import DefaultImage from "../../Components/Assets/Image/rocket2.png";
import InfiniteScroll from "../../Components/InfiniteScroll";
import Rating from "../../Components/Rating";
import SkeletonLoading from "../../Components/Skeleton";
import debounce from "../../Utils/Debounce";
import { color } from "../../Utils/Variable";
import { formatMoney } from "../../Utils/PriceConverter";
import { useHistory } from "react-router-dom";

const Style = styled.div`
    .card {
        color: ${color.primary};
        font-size: 14px;
        margin-bottom: 30px;
        .ships-data {
            display: flex;
            align-items: baseline;
            margin-bottom: 10px;
            &-label {
                margin-right: 10px;
                min-width: 100px;
            }
            &-name {
                font-weight: 600;
            }
        }
        @media (max-width: 767px) {
            font-size: 12px;
            img {
                width: 100px;
                display: block;
                margin: 0 auto 20px;
            }
        }
    }
`;
const LoadData = () => {
    return (
        <>
            <Col xl="6" lg="6" md="6" sm="6">
                <SkeletonLoading width="100%" height="325px" />
            </Col>
            <Col xl="6" lg="6" md="6" sm="6">
                <SkeletonLoading width="100%" height="325px" />
            </Col>
        </>
    );
};
const Home = () => {
    const history = useHistory();
    const { dispatch, state } = useStore();
    const [data, setData] = React.useState([]);

    const [isZero, setZero] = React.useState(false);
    const [onSearch, setSearch] = React.useState("");
    const [isLoading, setLoading] = React.useState(false);
    const [isFirstGet, setFirstGet] = React.useState(true);
    const [params, setParams] = React.useState({
        page: 1,
        search: onSearch,
    });
    const handleLoadData = () => {
        setTimeout(() => {
            setZero(true);
            getDataStarShips();
        }, 200);
    };
    const getDataStarShips = () => {
        if (state?.starShips?.list?.isSuccess) {
            if (data?.length < state?.starShips?.list?.data.count) {
                getData({
                    page: params.page + 1,
                    search: onSearch,
                });
            }
        }
    };
    const getData = (params) => {
        setLoading(true);
        setParams(params);
        service.starShips({ dispatch, params });
    };
    const handleShipDetail = (item) => {
        var getId = item.url.slice(0, -1);
        var id = getId.substring(getId.lastIndexOf("/") + 1);
        history.push(`/start-ship/${id}`);
    };

    const handleSearchShip = debounce((value) => {
        setZero(false);
        setSearch(value);
        setData([]);
        getData({
            page: 1,
            search: value,
        });
    }, 750);
    const handleSearchShips = (value) => {
        handleSearchShip(value);
    };
    const handleGetStartShip = () => {
        if (isFirstGet && !state?.starShips?.list) {
            window.scrollTo(0, 0);
            service.starShips({ dispatch });
            setFirstGet(false);
        }
    };
    const handleGetStartShipCallback = React.useCallback(handleGetStartShip);
    React.useEffect(() => {
        handleGetStartShipCallback();
    }, [handleGetStartShipCallback]);
    React.useEffect(() => {
        if (state?.starShips?.list?.isSuccess) {
            setLoading(false);
            if (data) {
                if (data?.length < 1 && params.page === 1) {
                    setData(state.starShips.list.data.results);
                    setZero(true);
                }
                if (data?.length > 1 && params.page !== 1) {
                    setData((prevState) => [
                        ...prevState,
                        ...state.starShips.list.data.results,
                    ]);
                }
            }
        }
        if (state?.starShips?.list?.isError) {
            setData([]);
            setZero(true);
        }
    }, [state]); // eslint-disable-line
    return (
        <Style>
            <InfiniteScroll
                threshold={10}
                isLoading={isLoading}
                onLoadData={handleLoadData}
                hasMore={false}
                loadingComponent={
                    <Row>
                        <LoadData />
                    </Row>
                }
            >
                <Container fluid="md">
                    <Row className="justify-content-end">
                        <Col xl="4" lg="4" md="4" sm="6">
                            <FormGroup>
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    onChange={({ target: { value } }) =>
                                        handleSearchShips(value)
                                    }
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        {data && data?.length < 1
                            ? onSearch !== ""
                                ? isZero && <h1>Start ship not found</h1>
                                : !isZero && <LoadData />
                            : data?.map((item, key) => {
                                  return (
                                      <Col
                                          key={key}
                                          xl="6"
                                          lg="6"
                                          md="6"
                                          sm="6"
                                      >
                                          <Card>
                                              <CardBody>
                                                  <Row>
                                                      <Col
                                                          xl="4"
                                                          lg="4"
                                                          md="4"
                                                          sm="12"
                                                      >
                                                          <img
                                                              src={DefaultImage}
                                                              alt={item.name}
                                                              className="img-fluid"
                                                          />
                                                      </Col>
                                                      <Col
                                                          xl="8"
                                                          lg="8"
                                                          md="8"
                                                          sm="12"
                                                      >
                                                          <div className="ships-data">
                                                              <div className="ships-data-label">
                                                                  Name:
                                                              </div>
                                                              <div className="ships-data-name">
                                                                  {item.name}
                                                              </div>
                                                          </div>
                                                          <div className="ships-data">
                                                              <div className="ships-data-label">
                                                                  Model:
                                                              </div>
                                                              <div className="ships-data-name">
                                                                  {item.model}
                                                              </div>
                                                          </div>
                                                          <div className="ships-data">
                                                              <div className="ships-data-label">
                                                                  Starship
                                                                  class:
                                                              </div>
                                                              <div className="ships-data-name">
                                                                  {
                                                                      item.starship_class
                                                                  }
                                                              </div>
                                                          </div>
                                                          <div className="ships-data">
                                                              <div className="ships-data-label">
                                                                  Manufacturer:
                                                              </div>
                                                              <div className="ships-data-name">
                                                                  {
                                                                      item.manufacturer
                                                                  }
                                                              </div>
                                                          </div>
                                                          <div className="ships-data">
                                                              <div className="ships-data-label">
                                                                  MGLT:
                                                              </div>
                                                              <div className="ships-data-name">
                                                                  {item.MGLT ===
                                                                  "unknown"
                                                                      ? "-"
                                                                      : `${item.MGLT} Megalights`}
                                                              </div>
                                                          </div>
                                                          <div className="ships-data">
                                                              <div className="ships-data-label">
                                                                  Crew:
                                                              </div>
                                                              <div className="ships-data-name">
                                                                  {item.crew}{" "}
                                                                  People
                                                              </div>
                                                          </div>
                                                          <div className="ships-data">
                                                              <div className="ships-data-label">
                                                                  Consumables:
                                                              </div>
                                                              <div className="ships-data-name">
                                                                  {item.consumables ===
                                                                  "unknown"
                                                                      ? "-"
                                                                      : item.consumables}
                                                              </div>
                                                          </div>
                                                          <div className="ships-data">
                                                              <div className="ships-data-label">
                                                                  Length:
                                                              </div>
                                                              <div className="ships-data-name">
                                                                  {item.length}{" "}
                                                                  meters
                                                              </div>
                                                          </div>
                                                          <div className="ships-data">
                                                              <div className="ships-data-label">
                                                                  Speed:
                                                              </div>
                                                              <div className="ships-data-name">
                                                                  {item.max_atmosphering_speed ===
                                                                  "n/a"
                                                                      ? "-"
                                                                      : `${item.max_atmosphering_speed} kilometers/hour`}
                                                              </div>
                                                          </div>
                                                          <div className="ships-data">
                                                              <div className="ships-data-label">
                                                                  Cargo
                                                                  capacity:
                                                              </div>
                                                              <div className="ships-data-name">
                                                                  {item.cargo_capacity ===
                                                                  "unknown"
                                                                      ? "-"
                                                                      : formatMoney(
                                                                            {
                                                                                amount: Number(
                                                                                    item.cargo_capacity
                                                                                ),
                                                                                currency:
                                                                                    "",
                                                                            }
                                                                        )}
                                                              </div>
                                                          </div>
                                                          <div className="ships-data">
                                                              <div className="ships-data-label">
                                                                  Cost in
                                                                  credits:
                                                              </div>
                                                              <div className="ships-data-name">
                                                                  {item.cost_in_credits ===
                                                                  "unknown"
                                                                      ? "-"
                                                                      : formatMoney(
                                                                            {
                                                                                amount: Number(
                                                                                    item.cost_in_credits
                                                                                ),
                                                                                currency:
                                                                                    "$",
                                                                            }
                                                                        )}
                                                              </div>
                                                          </div>
                                                          <div className="ships-data">
                                                              <div className="ships-data-label">
                                                                  Rating:
                                                              </div>
                                                              <div className="ships-data-name">
                                                                  <Rating
                                                                      rating={Number(
                                                                          item.hyperdrive_rating
                                                                      )}
                                                                      totalStars={
                                                                          1
                                                                      }
                                                                  />
                                                              </div>
                                                          </div>
                                                      </Col>
                                                  </Row>
                                                  <div className="text-right">
                                                      <Button
                                                          color="outline-primary"
                                                          type="button"
                                                          onClick={() =>
                                                              handleShipDetail(
                                                                  item
                                                              )
                                                          }
                                                      >
                                                          See more
                                                      </Button>
                                                  </div>
                                              </CardBody>
                                          </Card>
                                      </Col>
                                  );
                              })}
                    </Row>
                </Container>
            </InfiniteScroll>
        </Style>
    );
};
export default Home;
