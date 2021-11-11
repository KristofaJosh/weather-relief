import React from "react";
import style from "./page.module.scss";
import Typography from "../elements/typography";
import CurrentLocationDetailCard from "../molecules/currentLocationCard";
import { greeting } from "../../helpers/greeting";
import LargestCities from "../molecules/largestCities";
import FavouriteList from "../molecules/favouriteList";
import { useAppSelector } from "../../store";
import { getNoteKey } from "../../helpers/getNoteKey";
import { locationType } from "../../store/reducers/types";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [x, y] = greeting().split(" ");
  const { notes, weather } = useAppSelector((state) => ({
    notes: state.notes.notes,
    weather: state.weather,
  }));
  const navigation = useNavigate();

  const key = getNoteKey(weather.myLocation as unknown as locationType);

  const gotoDetail = () => {
    navigation("/detail", { state: weather.myLocation });
  };

  return (
    <div className={`container ${style.page} ${style.page__home}`}>
      <div className={style.page__greeting}>
        <div className={style.page__greeting_message}>
          <Typography level={"large"} weight={600}>
            <span style={{ fontSize: "var(--f32)" }}>{x}</span> <br /> {y}
          </Typography>
          <Typography weight={600} level={"f18"}>
            {new Date().toDateString()}
          </Typography>
        </div>
        <div>
          <div className="div-p-decorate">
            <Typography weight={600}>Notes</Typography>
          </div>
          {notes.hasOwnProperty(key) ? (
            <Typography>
              You have{" "}
              <span
                role={"button"}
                onClick={gotoDetail}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {notes[key].length}
              </span>{" "}
              note
              {notes[key].length > 1 ? "s" : ""} for{" "}
              {weather.myLocation.location.name}.
            </Typography>
          ) : (
            <Typography>
              You have not created any note for{" "}
              {weather.myLocation.location.name}.
            </Typography>
          )}
        </div>
      </div>
      <CurrentLocationDetailCard />
      <LargestCities />
      <FavouriteList />
    </div>
  );
};

export default Home;
