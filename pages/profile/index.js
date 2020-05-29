import Layout from "../../components/layout";
import React from "react";
import ProfileOne from "../../components/profileForm/one";
import ProfileTwo from "../../components/profileForm/two";
import ProfileThree from "../../components/profileForm/three";
import Head from "next/head";

export default function Profile() {

    return <Layout headerContent={null} headerClass="page-header no-bg" redBar page="profile" isLoggedIn>
        <Head>
            <title>Profile</title>
        </Head>
        <ProfileOne />

        <ProfileTwo />

        <ProfileThree />
    </Layout>
}