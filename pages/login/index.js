import Layout from "../../components/layout";
import LoginForm from "../../components/login/LoginForm";
import Head from "next/head";
import {withoutAuth} from "../../components/hoc/auth";
import React from 'react';

const Login = () => {

    return <Layout headerContent={<LoginForm />} page="Login" headerClass="signup">
        <Head>
            <title>Login</title>
        </Head>
    </Layout>
}

export default withoutAuth(Login);