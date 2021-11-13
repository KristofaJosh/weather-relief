import React, { useEffect, useState } from "react";
import FrostCard from "../../elements/card";
import style from "./largest.module.scss";
import Typography from "../../elements/typography";
import { useAppDispatch, useAppSelector } from "../../../store";
import { IconAdd, IconUsers } from "../../../assets/icons";
import { sortCities } from "../../../helpers/sortCities";
import { thousandsSeparators } from "../../../helpers/thousanSandSeparators";
import { locationType } from "../../../store/reducers/types";
import { useNavigate } from "react-router-dom";
import Modal from "../../elements/modal";
import AddLargeCities from "./addLargestCities";
import {removeFromLargestCity, setLargestCity} from "../../../store/reducers/favourites/favouriteSlice";
import { getNoteKey } from "../../../helpers/getNoteKey";
import {clearNotes} from "../../../store/reducers/notes/notesSlice";

const LargestCities = () => {
  const dispatch = useAppDispatch();
  const { largestCitiesList } = useAppSelector((state) => state.favourites);
  const { notes } = useAppSelector((state) => state.notes);
  const [toggleSort, setToggleSort] = useState(false);
  const [addLargeCity, setAddLargeCity] = useState(false);

  const navigate = useNavigate();

  const handleAddToLargestCityList = (selected: locationType) => () => {
    navigate("/detail", { state: selected });
  };

  const removeFromLargestCityList = (selected: locationType) => () => {
    const noteKey = getNoteKey(selected);
    if (notes[noteKey] && notes[noteKey].length) {
      let proceedings = prompt(`This location have notes attached to it\nType ${selected.location.name} to continue deletion.`, "");
      if (proceedings === selected.location.name) {
        dispatch(removeFromLargestCity({ data: selected }));
        dispatch(clearNotes({ key: noteKey }));
      } else {
        alert('Incomplete! name did not match.')
      }
    } else {
      dispatch(removeFromLargestCity({ data: selected }));
    }
  };

  useEffect(() => {
    if (!largestCitiesList.length) {
      dispatch(setLargestCity({ size: 3 }));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Modal
        maxWidth={600}
        visible={addLargeCity}
        closeModal={() => setAddLargeCity(false)}
      >
        <AddLargeCities onClose={() => setAddLargeCity(false)} />
      </Modal>
      <div className={`${style.section} div-p-decorate`}>
        <Typography weight={600}>Largest Cities</Typography>
        <div onClick={() => setToggleSort(!toggleSort)}>
          <Typography weight={600}>
            Sort:{" "}
            <span style={{ fontWeight: 200, cursor: "pointer" }}>
              {toggleSort ? "Population" : "A-Z"}
            </span>
          </Typography>
        </div>
      </div>
      <div className={style.largest}>
        {sortCities(largestCitiesList, toggleSort ? "population" : "a-z").map(
          (el, i) => (
            <FrostCard key={i} className={style.largest__card}>
              <div
                className={style.largest__card_remove}
                onClick={removeFromLargestCityList(el)}
              >
                x
              </div>
              <div onClick={handleAddToLargestCityList(el)}>
                <Typography level={"f32"}>
                  {el?.current.temperature}°
                </Typography>
                <Typography level={"f12"} style={{ whiteSpace: "nowrap" }}>
                  {el?.current.weather_descriptions[0].split(",")[0]}
                </Typography>
                <Typography weight={600}>{el?.location.name}</Typography>
                <Typography level={"f14"}>
                  <IconUsers
                    style={{ marginRight: 5, position: "relative", top: 2 }}
                  />
                  {thousandsSeparators(el?.location.population)}
                </Typography>
              </div>
            </FrostCard>
          )
        )}
        {largestCitiesList.length < 15 && (
          <FrostCard
            onClick={() => setAddLargeCity(true)}
            className={`${style.largest__card} ${style.largest__card_add}`}
          >
            <IconAdd />
          </FrostCard>
        )}
      </div>
    </div>
  );
};

export default LargestCities;
