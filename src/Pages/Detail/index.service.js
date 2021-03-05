import { servicesAction } from "../../Reducers";
const service = {
    starShips: ({ dispatch, params }) => {
        servicesAction(dispatch).reduxFetch({
            url: `/starships/${params}`,
            method: "GET",
            reducer: "service",
            group: "starShips",
            key: "detail",
            message: {
                200: {
                    mode: {
                        use: "alert",
                        type: "success",
                        timeOut: 3000,
                    },
                    text: "Success Get Data",
                },
            },
        });
    },
    starShipsFilms: ({ dispatch, id, keyId }) => {
        servicesAction(dispatch).reduxFetch({
            url: `/films/${id}`,
            method: "GET",
            reducer: "service",
            group: "starShips",
            key: `films${keyId}`,
            message: {
                200: {
                    mode: {
                        use: "alert",
                        type: "success",
                        timeOut: 3000,
                    },
                    text: "Success Get Data",
                },
            },
        });
    },
    starShipsPilot: ({ dispatch, id, keyId }) => {
        servicesAction(dispatch).reduxFetch({
            url: `/people/${id}`,
            method: "GET",
            reducer: "service",
            group: "starShips",
            key: `pilot${keyId}`,
            message: {
                200: {
                    mode: {
                        use: "alert",
                        type: "success",
                        timeOut: 3000,
                    },
                    text: "Success Get Data",
                },
            },
        });
    },
    starShipsClear: ({ dispatch }) => {
        servicesAction(dispatch).reduxClear({
            reducer: "service",
            group: "starShips",
            key: "list",
            type: "CLEAR",
        });
    },
};
export default service;
