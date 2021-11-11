import React, { ChangeEvent, useEffect, useState } from "react";
import style from "./page.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import GoBack from "../molecules/goBack";
import Typography from "../elements/typography";
import Modal from "../elements/modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { locationType } from "../../store/reducers/types";
import {
  addNote,
  createNote,
  removeNote,
  updateNote,
} from "../../store/reducers/notes/notes.reducer";
import { getNoteKey } from "../../helpers/getNoteKey";
import Button from "../elements/button";
import FrostCard from "../elements/card";
import {
  IconGlobe,
  IconHumidity,
  IconTemperature,
  IconWind,
} from "../../assets/icons";
import { updateDefaultWeather } from "../../store/reducers/weather/weather.reducer";

const Note = ({
  hasNote,
  closeModal,
  noteId,
}: {
  hasNote:
    | {
        key: string;
        body: { title: string; description: string };
      }
    | any;
  closeModal: () => void;
  noteId: string;
}) => {
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector((state) => state.notes);
  const [form, setForm] = useState({ title: "", description: "" });

  const handleCreateNote = () => {
    if (noteId && form.description) {
      if (!hasNote) {
        if (notes.hasOwnProperty(noteId) && notes[noteId].length) {
          dispatch(addNote({ key: noteId, body: form }));
        } else {
          dispatch(createNote({ body: form, key: noteId }));
        }
        closeModal();
      } else {
        dispatch(updateNote({ body: form, key: noteId, idx: hasNote.idx }));
        closeModal();
      }
      setForm({ title: "", description: "" });
    }
  };

  const deleteNote = () => {
    dispatch(removeNote({ idx: hasNote.idx, key: noteId }));
    closeModal();
  };

  const handleNoteChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (hasNote) {
      setForm(hasNote.body);
    }
  }, [hasNote]);

  return (
    <>
      <form action="" className={style.note}>
        <div className={style.note__input}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name={"title"}
            value={form.title}
            onChange={handleNoteChange}
          />
        </div>
        <div className={style.note__input}>
          <label htmlFor={"description"}>Description</label>
          <textarea
            rows={8}
            id={"description"}
            name={"description"}
            value={form.description}
            onChange={handleNoteChange}
          />
        </div>
      </form>
      <div className={style.note__button}>
        <Button
          onClick={handleCreateNote}
          text={!hasNote ? "Create" : "Update"}
        />
        {hasNote && <Button onClick={deleteNote} text={"Delete"} />}
      </div>
    </>
  );
};

const Detail = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [currentView, setCurrentView] = useState<locationType | null>(null);
  const [viewNote, setViewNote] = useState<{
    hasNote: any | boolean;
    visible: boolean;
  }>({
    hasNote: false,
    visible: false,
  });
  const { notes } = useAppSelector((state) => state.notes);
  const { defaultLoc } = useAppSelector((state) => state.weather);

  const setDefaultLoc = () => {
    if (currentView) {
      dispatch(updateDefaultWeather({ name: currentView.location.name }));
    }
  };

  useEffect(() => {
    if (!location.state) {
      navigation("/");
    } else {
      setCurrentView(location.state);
    }
    // eslint-disable-next-line
  }, []);

  if (currentView) {
    const key = getNoteKey(currentView);
    return (
      <>
        <Modal
          maxWidth={400}
          visible={viewNote.visible}
          closeModal={() => setViewNote({ hasNote: false, visible: false })}
        >
          <Note
            noteId={key}
            hasNote={viewNote.hasNote}
            closeModal={() => setViewNote({ hasNote: false, visible: false })}
          />
        </Modal>
        <div className="container">
          <div style={{marginBottom: 30}}>
            <GoBack />
            <div className={style.page}>
              {[
                {
                  title: "Name",
                  value: currentView?.location?.name,
                  Icon: null,
                },
                {
                  title: "Country",
                  value: currentView?.location?.country,
                  Icon: IconGlobe,
                },
                {
                  title: "Cloud Cover",
                  value: currentView?.current?.cloudcover,
                  Icon: null,
                },
                {
                  title: "Temperature",
                  value: `${currentView?.current?.temperature}°`,
                  Icon: IconTemperature,
                },
                {
                  title: "Feels Like",
                  value: `${currentView?.current?.feelslike}°`,
                  Icon: IconTemperature,
                },
                {
                  title: "Humidity",
                  value: `${currentView?.current?.humidity}%`,
                  Icon: IconHumidity,
                },
                {
                  title: "Precip",
                  value: `${currentView?.current?.precip}%`,
                  Icon: null,
                },
                {
                  title: "Pressure",
                  value: `${currentView?.current?.pressure}Pa`,
                  Icon: null,
                },
                {
                  title: "UV INDEX",
                  value: currentView?.current?.uv_index,
                  Icon: null,
                },
                {
                  title: "Weather Description",
                  value: currentView?.current?.weather_descriptions[0],
                  Icon: null,
                },
                {
                  title: "Wind Degree",
                  value: currentView?.current?.wind_degree,
                  Icon: null,
                },
                {
                  title: "Wind Direction",
                  value: currentView?.current?.wind_dir,
                  Icon: null,
                },
                {
                  title: "Wind Speed",
                  value: currentView?.current?.wind_speed,
                  Icon: IconWind,
                },
              ].map(({ title, value, Icon }, index) => (
                <div key={index}>
                  <div
                    className="div-p-decorate"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      weight={600}
                      style={{ textTransform: "uppercase" }}
                    >
                      {title}
                    </Typography>
                    {Icon && (
                      <Typography level={"f18"}>
                        <Icon />
                      </Typography>
                    )}
                  </div>
                  <Typography>{value}</Typography>
                </div>
              ))}
            </div>
            {defaultLoc !== currentView.location.name && (
              <Button
                style={{ marginBottom: 20 }}
                text={"Make Default"}
                onClick={setDefaultLoc}
              />
            )}
          </div>

          <div>
            <div className={`${style.note__heading} div-p-decorate`}>
              <Typography weight={600}>Notes</Typography>
              <Button
                text={"Create Note"}
                onClick={() => setViewNote({ hasNote: false, visible: true })}
              />
            </div>
            {/* check if there's note associated with this weather*/}
            {notes.hasOwnProperty(key) ? (
              <div className={style.note__wrapper}>
                {notes[key].map((el, i) => (
                  <FrostCard
                    className={style.note__wrapper_notes}
                    key={`${el.body.title}_${i}`}
                    onClick={() => setViewNote({ hasNote: el, visible: true })}
                  >
                    <div className="div-p-decorate">
                      <Typography style={{ textTransform: "capitalize" }}>
                        {el.body.title}
                      </Typography>
                    </div>
                    <Typography level={"f14"}>{el.body.description}</Typography>
                  </FrostCard>
                ))}
                {!notes[key].length && <Typography>No notes!</Typography>}
              </div>
            ) : (
              <p>No Notes</p>
            )}
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default Detail;
