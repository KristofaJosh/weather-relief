import {screen} from "@testing-library/react";
import FavouriteList from "./index";
import {render as reduxRender} from "../../../../utils/redux-util";

describe("FavouriteList Component", () => {
  it("renders correctly and doesn't show the remove button", async () => {
    reduxRender(<FavouriteList/>)

    // should show no user initially, and not be fetching a user
    expect(screen.getByText(/Favourite Cities/i)).toBeInTheDocument()
    expect(screen.queryByText(/x/i)).not.toBeInTheDocument()
  })
});
