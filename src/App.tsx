import { useEffect } from "react";
import { BrowserRouter, Switch, Link } from "react-router-dom";

import Routes from "./Routes";

import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loading from "./components/Loading/Loading";

import { useAuth, useStation, useLine } from "./hooks";

import { PAGE_PATH, NAV_LINKS } from "./utils/constants/route";

const App = () => {
  const {
    isAuthenticated,
    loading: authLoading,
    error: authError,
    checkAccessToken,
  } = useAuth();
  const {
    getStations,
    loading: stationLoading,
    error: stationError,
  } = useStation();
  const { getLines, loading: lineLoading, error: lineError } = useLine();

  useEffect(() => {
    checkAccessToken();
    getStations();
    getLines();
  }, []);

  const errorMessage =
    authError?.message || stationError?.message || lineError?.message;

  const loading = authLoading || stationLoading || lineLoading;

  return (
    <BrowserRouter>
      <Header css={{ marginTop: "1.5625rem", marginBottom: "1.5625rem" }}>
        <Link to={PAGE_PATH.HOME}>🚇 지하철 노선도</Link>
      </Header>
      <Navigation links={NAV_LINKS} isAuthenticated={isAuthenticated} />
      <Switch>
        <Routes isAuthenticated={isAuthenticated} />
      </Switch>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {loading && <Loading />}
    </BrowserRouter>
  );
};

export default App;
