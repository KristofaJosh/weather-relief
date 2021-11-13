import { render, screen } from "@testing-library/react";
import Typography from "./index";


describe("Typography Component", () => {
  it("Heading renders correctly", () => {
    render(<Typography.Heading level={3}>Hello</Typography.Heading>);
    const hElement = screen.getByRole('heading');

    expect(hElement).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

});
