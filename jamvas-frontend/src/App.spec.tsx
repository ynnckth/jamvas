import React from "react";
import App from "./App";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { renderWithProviders } from "./testing/renderWithProviders";
import { testId } from "./testing/testId";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { baseUrl as sessionApiBaseUrl } from "./api/sessionApi";
import { baseUrl as sequencerApiBaseUrl } from "./api/sequencerApi";
import { User } from "./types/User";
import { SequencerConfiguration } from "./types/SequencerConfiguration";
import { DEFAULT_BPM } from "./app/SequencerConstants";
import { serverBaseUrl } from "./api/apiUtils";
import { ApiException } from "./api/apiException";

const server = setupServer();

describe(App.name, () => {
  const userMock: User = {
    id: "1234",
    name: "Bob",
  };

  const sequencerConfigurationMock: SequencerConfiguration = {
    bpm: DEFAULT_BPM,
    sequencerInstrumentStates: [],
  };

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    renderWithProviders(<App />);
  });

  const setupApiCallHandlersForSuccessfulUserRegistration = () => {
    server.use(
      rest.post<User>(sessionApiBaseUrl, async (req, res, ctx) => {
        return res(ctx.json(userMock), ctx.delay(250));
      })
    );
    server.use(
      rest.get<User[]>(sessionApiBaseUrl, async (req, res, ctx) => {
        return res(ctx.json([userMock]), ctx.delay(250));
      })
    );
    server.use(
      rest.get<SequencerConfiguration>(sequencerApiBaseUrl, async (req, res, ctx) => {
        return res(ctx.json(sequencerConfigurationMock), ctx.delay(250));
      })
    );
    server.use(
      rest.get(`${serverBaseUrl}/socket.io/`, async (req, res, ctx) => {
        return res(ctx.json({}), ctx.delay(250));
      })
    );
  };

  const attemptToJoinSession = async () => {
    fireEvent.click(screen.getByTestId(testId.joinSessionButton));
    await waitFor(() => expect(screen.getByTestId(testId.userRegistrationModalContainer)).toBeVisible());
    fireEvent.change(screen.getByTestId(testId.usernameInputField), { target: { value: "Bob" } });
    fireEvent.click(screen.getByTestId(testId.confirmJoinButton));
  };

  it("should render title and 'join session' button", () => {
    expect(screen.getByTestId(testId.appTitle)).toBeVisible();
    expect(screen.getByTestId(testId.joinSessionButton)).toBeVisible();
    expect(screen.queryByTestId(testId.sequencerContainer)).toBeFalsy();
  });

  it("should show user registration modal upon clicking on 'join session'", async () => {
    fireEvent.click(screen.getByTestId(testId.joinSessionButton));
    await waitFor(() => expect(screen.getByTestId(testId.userRegistrationModalContainer)).toBeVisible());
  });

  it("should show sequencer upon joining session", async () => {
    setupApiCallHandlersForSuccessfulUserRegistration();

    await attemptToJoinSession();

    await waitFor(() => expect(screen.getByTestId(testId.sequencerContainer)).toBeVisible());
    expect(within(screen.getByTestId(testId.usersInSessionContainer)).getByText(userMock.name)).toBeVisible();
  });

  it("should show error toast if request to register user failed", async () => {
    const serverErrorResponse: ApiException = {
      message: "Something went wrong on the server!",
      path: "",
      timestamp: "",
    };
    server.use(
      rest.post<User>(sessionApiBaseUrl, async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(serverErrorResponse), ctx.delay(250));
      })
    );

    await attemptToJoinSession();

    await waitFor(() => expect(screen.getByText(serverErrorResponse.message)).toBeTruthy());
    await waitFor(() => expect(screen.queryByTestId(testId.userRegistrationModalContainer)).toBeFalsy());
    await waitFor(() => expect(screen.queryByTestId(testId.sequencerContainer)).toBeFalsy());
  });
});
