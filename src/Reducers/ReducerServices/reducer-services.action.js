import service from "../../Services";

const testing = (dispatch, value) => {
    dispatch(value);
};

const clearData = (dispatch, value) => {
    dispatch(value);
};
const setData = (dispatch, value) => {
    dispatch(value);
};

const fetch = async (dispatch, value) => {
    const result = await service(value);

    if (result) {
        dispatch({
            reducer: value.reducer,
            group: value.group,
            key: value.key,
            data: result.response,
            headers: result.headers,
            message: result.message,
            type: result.type,
            isError: result.error,
            isSuccess: result.success,
        });
    }
};

const servicesAction = (dispatch) => ({
    reduxFetch: (value) => {
        fetch(dispatch, value);
    },
    reduxClear: (value) => {
        clearData(dispatch, value);
    },
    reduxSetData: (value) => {
        setData(dispatch, value);
    },
    reduxTesting: (value) => {
        testing(dispatch, value);
    },
});

export default servicesAction;
