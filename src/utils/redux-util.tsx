import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
// Import your own reducer
import favouriteSlice from "../app/store/reducers/favourites/favouriteSlice";
import weatherSlice from "../app/store/reducers/weather/weatherSlice";
import notesSlice from "../app/store/reducers/notes/notesSlice";

const reducers = {
  favourites: favouriteSlice,
  weather: weatherSlice,
  notes: notesSlice
};

function render(
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  {
    // @ts-ignore
    preloadedState,
    store = configureStore({ reducer: reducers, preloadedState }),
    ...renderOptions
  } = {}
) {
  // @ts-ignore
  function Wrapper({ children }) {
    return (
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    );
  }
  // @ts-ignore
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
