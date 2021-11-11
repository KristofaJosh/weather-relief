import React, {useEffect, useState} from "react";
import Typography from "../../elements/typography";
import FrostCard from "../../elements/card";
import style from "./curr.module.scss";
import {renderWeatherDescription} from "../../../helpers/renderWeatherDescription";
import {useAppDispatch, useAppSelector} from "../../../store";
import {IconExpand, IconLocation, IconReload,} from "../../../assets/icons";
import {getSingleCity, refreshWeather,} from "../../../store/reducers/weather/weather.actions";
import {getLocation} from "../../../../utils/getLocation";
import {useNavigate} from "react-router-dom";
import {locationType} from "../../../store/reducers/types";
import {setLargestCity} from "../../../store/reducers/favourites/fav.actions";

const CurrentLocationDetailCard = () => {
    const {defaultLoc} = useAppSelector((state) => state.weather);
    const {largestCitiesList} = useAppSelector((state) => state.favourites);
    const [loading, setLoading] = useState(false);
    const [gettingLocation, setGettingLocation] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {myLocation, lastQuery, currentLoc} = useAppSelector(
        (state) => state.weather
    );

    const WeatherIcon = renderWeatherDescription(
        myLocation.current.weather_descriptions[0]
    );

    const gotoDetailPage = (selected: locationType) => () => {
        navigate("/detail", {state: selected});
    };

    const handleRefreshWeather = () => {
        setLoading(true);
        dispatch(refreshWeather(currentLoc)).then(() => {
            dispatch(setLargestCity({list: largestCitiesList})).then(() =>
                setLoading(false)
            );
        });
    };

    const triggerGetLocation = () => {
        setGettingLocation(true);
        getLocation
            .then(({coords}) => {
                if (lastQuery !== `${coords.latitude},${coords.longitude}`) {
                    dispatch(
                        getSingleCity({
                            location: `${coords.latitude
                                .toString()
                                .substr(0, 5)},${coords.longitude.toString().substr(0, 5)}`,
                            refresh: true,
                        })
                    ).then(() => setGettingLocation(false));
                } else {
                    setTimeout(() => setGettingLocation(false), 3000);
                }
            })
            .catch((err) => {
                alert(
                    "Getting location failed!\nConfirm you allowed the app get access to your location, then reload."
                );
                setGettingLocation(false);
            });
    };

    useEffect(() => {
        dispatch(getSingleCity({location: defaultLoc}))
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <FrostCard className={style.currentLocation}>
                <div className={style.currentLocation__top}>
                    <div className={style.currentLocation__temperature}>
                        <Typography.Heading weight={600} size={"large"}>
                            {myLocation.current.temperature || "-"}°
                        </Typography.Heading>
                    </div>
                    <div className={style.currentLocation__weatherDescription}>
                        <div style={{overflow: "hidden"}}>
                            <Typography
                                level={"f14"}
                                style={{whiteSpace: "nowrap", maxWidth: 95}}
                            >
                                {myLocation.current.weather_descriptions[0].split(",")[0] ||
                                "--"}
                            </Typography>
                        </div>
                        <WeatherIcon/>
                    </div>
                    <FrostCard className={style.currentLocation__time}>
                        <Typography level={"medium"}>
                            {new Date().getHours() < 10
                                ? `0${new Date().getHours()}`
                                : new Date().getHours()}
                        </Typography>
                        <Typography level={"medium"}>:</Typography>
                        <Typography level={"medium"}>
                            {new Date().getMinutes() < 10
                                ? `0${new Date().getMinutes()}`
                                : new Date().getMinutes()}
                        </Typography>
                    </FrostCard>
                </div>
                <div className={style.currentLocation__bottom}>
                    <Typography.Heading
                        level={2}
                        style={{cursor: "pointer"}}
                        onClick={gotoDetailPage(myLocation as unknown as locationType)}
                    >
                        {myLocation.location.name} <IconExpand style={{fontSize: 14}}/>
                    </Typography.Heading>
                    <Typography>{myLocation.location.region}</Typography>
                    <br/>
                    <Typography>
                        humidity: {myLocation.current.humidity || "--"}%
                    </Typography>
                    <Typography>
                        feels like: {myLocation.current.feelslike || "--"}°
                    </Typography>
                </div>
                <br/>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div className={style.currentLocation__lastUpdate}>
                        <Typography level={"f12"} className={"small"}>
                            <span>last updated:</span>{" "}
                            {new Date(myLocation.location.localtime.replace(" ", "T")).toDateString()}
                            {" - "}
                            {new Date(myLocation.location.localtime.replace(" ", "T"))
                                .toLocaleTimeString()
                                .substr(0, 5)}
                        </Typography>
                        <IconReload
                            className={`${loading ? "spin" : ""}`}
                            onClick={handleRefreshWeather}
                        />
                    </div>
                    <div
                        style={{cursor: "pointer"}}
                        title={"Get weather details for your location"}
                    >
                        <Typography style={{fontSize: "1.2rem"}}>
                            <IconLocation
                                onClick={triggerGetLocation}
                                className={`${gettingLocation ? "beep" : ""}`}
                            />
                        </Typography>
                    </div>
                </div>
            </FrostCard>
        </>
    );
};

export default CurrentLocationDetailCard;
