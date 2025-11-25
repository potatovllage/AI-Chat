import AuthHeader from "../../components/Layout/AuthLayout/AuthHeader";
import Signup from "../../containers/Auth/SignUp";

const SignUpPage = () => {
  return (
    <>
      <AuthHeader pageName="SIGNUP" />
      <Signup />
    </>
  );
};

export default SignUpPage;
