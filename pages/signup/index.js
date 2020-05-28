import Layout from "../../components/layout";
import Head from "next/head";
import React from "react";
import SignupForm from "../../components/signup/SignupForm";

export default function SignUp() {
    return <Layout headerContent={<SignupForm />} page="Signup" headerClass="signup">
        <Head>
            <title>Signup</title>
        </Head>
    </Layout>
}