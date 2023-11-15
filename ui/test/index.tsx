import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
export function renderWithProviders(component: ReactElement) {
  const WrapperComponent = () => <div>{component}</div>;
  return render(<WrapperComponent />);
}
