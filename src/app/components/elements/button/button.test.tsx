import Button from "./index";
import { render, screen } from "@testing-library/react";

describe("Button Component", () => {
  it("renders correctly", () => {
    render(<Button text="click me" />);
    expect(screen.getByText("click me")).toBeInTheDocument();
  });
  it("renders children correctly", () => {
    render(<Button>"click me"</Button>);
    expect(screen.getByText(/click me/)).toBeInTheDocument();
  });
  it("renders classname correctly", () => {
    render(<Button className={'is-class'} text="click me" />);
    expect(screen.getByText("click me")).toHaveClass('is-class');
  });
});
