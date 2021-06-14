import React from "react"
import { render } from "@testing-library/react"
import AppLoader from "./index"

test("Should displayed if isActive is true", () => {
  const { container } = render(<AppLoader isActive></AppLoader>);
  expect(container.querySelector(".active")).toBeInTheDocument();
})