import { servicesAction } from "../../Reducers";
const service = {
    starShips: ({ dispatch, params }) => {
        servicesAction(dispatch).reduxFetch({
            url: "/starships",
            method: "GET",
            params: params,
            reducer: "service",
            group: "starShips",
            key: "list",
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
};
export default service;
