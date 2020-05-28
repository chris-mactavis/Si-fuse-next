import Layout from "../../components/layout";
import LoginForm from "../../components/login/LoginForm";

export default function Login() {
    return <Layout headerContent={<LoginForm />} page="Login" headerClass="signup">

    </Layout>
}