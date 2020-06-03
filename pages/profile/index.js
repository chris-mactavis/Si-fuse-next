import Layout from "../../components/layout";
import React from "react";
import ProfileOne from "../../components/profileForm/one";
import ProfileTwo from "../../components/profileForm/two";
import ProfileThree from "../../components/profileForm/three";
import ProfileFive from "../../components/profileForm/five";
import Head from "next/head";
import {auth} from "../../components/hoc/auth";
import {useSelector} from "react-redux";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import {ProfileFour} from "../../components/profileForm/four";

const Profile = ({startup, industries, locations, stages}) => {

    const currentProfile = useSelector(state => state.profile.currentState);

    const ProfileComponent = () => {
        switch (currentProfile) {
            case 1:
                return <ProfileOne startup={startup}/>;
            case 2:
                return <ProfileTwo startup={startup} locations={locations} industries={industries}/>;
            case 3:
                return <ProfileThree startup={startup}/>;
            case 4:
                return <ProfileFour startup={startup} />;
            case 5:
                return <ProfileFive startup={startup}/>;
        }
    }


    return <Layout headerContent={null} headerClass="page-header no-bg" redBar page="profile" isLoggedIn>

        <Head>
            <title>Profile</title>
        </Head>

        <ProfileComponent/>
    </Layout>
}

Profile.getInitialProps = async ctx => {
    const token = Token(ctx);

    const {data: {startup, industries, locations, stages}} = await axiosInstance.get('profile-content', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return {
        startup,
        industries,
        locations,
        stages
    }
}

export default auth(Profile);