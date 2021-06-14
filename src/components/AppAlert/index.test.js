import React from "react"
import { render } from "@testing-library/react"
import AppAlert from "./index"

test("Should displayed if isActive is true", () => {
  const { container } = render(<AppAlert isActive></AppAlert>);
  expect(container.querySelector(".active")).toBeInTheDocument();
})

test("Should display error alert if type is 'error'", () => {
  const { container } = render(<AppAlert type="error"></AppAlert>);
  expect(container.querySelector(".app-alert .error")).toBeInTheDocument();
})

test("Should display success alert if type is 'success'", () => {
  const { container } = render(<AppAlert type="success"></AppAlert>);
  expect(container.querySelector(".app-alert .success")).toBeInTheDocument();
})

test("Should display warning alert if type is 'warning'", () => {
  const { container } = render(<AppAlert type="warning"></AppAlert>);
  expect(container.querySelector(".app-alert .warning")).toBeInTheDocument();
})