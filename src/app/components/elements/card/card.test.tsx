import Button from "./index";
import { render, screen } from "@testing-library/react";
import FrostCard from "./index";

describe("Frost Card Component", () => {
  it("renders correctly", () => {
    render(<FrostCard>Hello</FrostCard>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders classname correctly", () => {
    render(<FrostCard className={'is-class'}>Great</FrostCard>);
    expect(screen.getByText("Great")).toHaveClass('is-class');
  });
});
