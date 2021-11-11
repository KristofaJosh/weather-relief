import React from "react";
import FavouriteList from "../molecules/favouriteList";
import GoBack from "../molecules/goBack";

const Favourites = () => {
  return (
    <div className={`container`}>
      <GoBack />
      <FavouriteList />
    </div>
  );
};

export default Favourites;
