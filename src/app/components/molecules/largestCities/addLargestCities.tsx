import { useAppDispatch, useAppSelector } from "../../../store";
import React, { useEffect, useState } from "react";
import FrostCard from "../../elements/card";
import style from "./largest.module.scss";
import Typography from "../../elements/typography";
import { IconUsers } from "../../../assets/icons";
import { thousandsSeparators } from "../../../helpers/thousanSandSeparators";
import { locationType } from "../../../store/reducers/types";
import api from "../../../../utils/apis";
import { filterLargestCities } from "../../../helpers/filterLargestCities";
import { addToLargestCity } from "../../../store/reducers/favourites/fav.reducer";
import { excludeFromList } from "../../../helpers/excludeFromList";

const AddLargeCities = ({ onClose }: { onClose: () => void }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { largestCitiesList: savedCities } = useAppSelector(
    (state) => state.favourites
  );
  const dispatch = useAppDispatch();
  const [selectedWeather, setSelectedWeather] = useState<locationType[]>([]);
  const [largestCitiesList, setLargestCitiesList] = useState<locationType[]>(
    []
  );

  const handleAddToLargestCityList = () => {
    dispatch(addToLargestCity({ data: selectedWeather }));
    onClose();
  };

  const modifySelection = (selected: locationType) => () => {
    const exist =
      selectedWeather.findIndex(
        (cc) => cc.location.name === selected.location.name
      ) > -1;
    if (exist) {
      setSelectedWeather(
        selectedWeather.filter(
          (el) => el.location.name !== selected.location.name
        )
      );
    } else {
      setSelectedWeather([...selectedWeather, selected]);
    }
  };

  const init = (hardRefresh: boolean) => {
    api
      .allCities()
      .then((res) => {
        filterLargestCities(res.data.record, 15, hardRefresh)
          .then((data) => {
            setRefreshing(false);
            setLoading(false)

            // exclude cities already in the list
            setLargestCitiesList(excludeFromList(data, savedCities));
          })
          .catch((err) => {
            setRefreshing(false);
            setLoading(false)
            alert(
              err?.response?.message || err?.info || "Something is not right!"
            );
          });
      })
      .catch((err) => {
        setRefreshing(false);
        setLoading(false)
        alert(err?.response?.message || err?.info || "Something is not right!");
      });
  };

  useEffect(() => {
    setLoading(true)
    init(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={style.addLargeCity}>
      <div className={style.addLargeCity_heading}>
        <div className={style.addLargeCity_heading_label}>
          <Typography.Heading level={2}>Select City</Typography.Heading>
          <sub>select to add to large cities</sub>
        </div>
        <div className={style.addLargeCity_heading_buttons}>
          <button
            onClick={() => {
              setRefreshing(true);
              init(true);
            }}
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
          <button
            onClick={handleAddToLargestCityList}
            disabled={!selectedWeather.length}
            style={{
              backgroundColor: selectedWeather.length > 0 ? "black" : undefined,
            }}
          >
            Add
          </button>
        </div>
      </div>
      {largestCitiesList.length ? (
        <div className={style.addLargeCity_list}>
          {largestCitiesList.map((el, i) => (
            <FrostCard
              key={i}
              className={`${
                selectedWeather.findIndex(
                  (cc) => cc.location.name === el.location.name
                ) > -1
                  ? style.addLargeCity_list_cardSelected
                  : ""
              } ${style.largest__card}`.trim()}
            >
              <div onClick={modifySelection(el)}>
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
          ))}
        </div>
      ) : (
        <div style={{ padding: 20 }}>
          <p>{loading ? "Getting data..." : "Nothing Here"}</p>
        </div>
      )}
    </div>
  );
};

export default AddLargeCities;
