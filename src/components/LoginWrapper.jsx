import LoginPage from "../pages/loginPage";

export const LoginWrapper = (props) => {
    const { visible, cancel, children } = props;

    const token = localStorage.getItem("token")


    if(token == null) return <LoginPage />

    return props;
}

export default LoginWrapper