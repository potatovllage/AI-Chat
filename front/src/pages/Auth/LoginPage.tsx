import AuthHeader from "../../components/Layout/AuthLayout/AuthHeader";
import Login from "../../containers/Auth/Login";

const LoginPage = () => {
  return (
    <>
      <AuthHeader pageName="LOGIN" />
      <Login />
    </>
  );
};

export default LoginPage;
