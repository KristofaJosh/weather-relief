import React from 'react';
import Typography from '../../elements/typography';
import style from '../largestCities/largest.module.scss';
import FrostCard from '../../elements/card';
import { useAppDispatch, useAppSelector } from '../../../store';
import { sortCities } from '../../../helpers/sortCities';
import { removeFromFavourites } from '../../../store/reducers/favourites/favouriteSlice';
import { useNavigate } from 'react-router-dom';
import { locationType } from '../../../store/reducers/types';
import { getNoteKey } from '../../../helpers/getNoteKey';
import { clearNotes } from '../../../store/reducers/notes/notesSlice';

const FavouriteList = () => {
  const { favList } = useAppSelector((state) => state.favourites);
  const { notes } = useAppSelector((state) => state.notes);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const gotoCity = (state: locationType) => () => {
    navigate('/detail', { state });
  };

  const removeFromList = (selected: locationType) => () => {
    if (selected) {
      const noteKey = getNoteKey(selected);
      if (notes[noteKey] && notes[noteKey].length) {
        let proceedings = prompt(`This location have notes attached to it\nType ${selected.location.name} to continue deletion.`, '');
        if (proceedings === selected.location.name) {
          dispatch(removeFromFavourites({ data: selected }));
          dispatch(clearNotes({ key: noteKey }));
        } else {
          alert('Incomplete! name did not match.');
        }
      } else dispatch(removeFromFavourites({ data: selected }));
    }
  };

  return (
    <div>
      <div className={'div-p-decorate'}>
        <Typography weight={600}>Favourite Cities</Typography>
      </div>
      {favList.length ? (
        <div className={style.largest}>
          {sortCities(favList, 'a-z').map((el, i) => (
            <FrostCard key={i} className={style.largest__card}>
              <button className={style.largest__card_remove} data-testid={'remove-fav'} onClick={removeFromList(el)}>
                x
              </button>
              <div onClick={gotoCity(el)}>
                <Typography level={'f32'}>{el?.current.temperature}°</Typography>
                <Typography level={'f12'} style={{ whiteSpace: 'nowrap' }}>
                  {el?.current.weather_descriptions[0].split(',')[0]}
                </Typography>
                <Typography weight={600}>{el?.location.name}</Typography>
              </div>
            </FrostCard>
          ))}
        </div>
      ) : (
        <Typography>You have not added any favourite</Typography>
      )}
    </div>
  );
};

export default FavouriteList;
