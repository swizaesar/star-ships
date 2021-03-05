import React from "react";
import { useStore } from "../../Reducers";
import service from "./index.service";
const Pilot = ({ item, keyId }) => {
    const { dispatch, state } = useStore();
    const [data, setData] = React.useState(false);
    const [isFirstGet, setFirstGet] = React.useState(true);
    const handleGetFilm = () => {
        if (isFirstGet) {
            setFirstGet(false);
            var getId = item.slice(0, -1);
            var id = getId.substring(getId.lastIndexOf("/") + 1);
            service.starShipsPilot({ dispatch, id, keyId });
        }
    };
    const handleGetFilmCallback = React.useCallback(handleGetFilm);
    React.useEffect(() => {
        handleGetFilmCallback();
    }, [handleGetFilmCallback]);
    React.useEffect(() => {
        if (state?.starShips["pilot" + keyId]?.isSuccess) {
            setData(state.starShips["pilot" + keyId].data);
        }
    }, [state, keyId]);
    return <>{data && <div>{data.name}</div>}</>;
};
export default Pilot;
