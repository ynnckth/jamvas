import { PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "../store/store";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import { Toaster } from "react-hot-toast";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

/**
 * Wraps the react-testing-library render function with a redux store provider.
 * Consider adding further providers here to facilitate component testing.
 * @param component
 * @param preloadedState
 * @param store
 * @param renderOptions
 * For more information on testing with redux see:
 * https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function
 */
export const renderWithProviders = (
  component: React.ReactElement,
  { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {}
) =>
  render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <>
          {component}
          <Toaster />
        </>
      </ChakraProvider>
    </Provider>,
    renderOptions
  );
