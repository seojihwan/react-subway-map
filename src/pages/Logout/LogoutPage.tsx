import { Redirect } from "react-router";

import { useAuth } from "../../hooks";

import { PAGE_PATH } from "../../constants/route";

const LogoutPage = () => {
  const { logout } = useAuth();
  logout();

  return <Redirect to={PAGE_PATH.LOGIN} />;
};

export default LogoutPage;
