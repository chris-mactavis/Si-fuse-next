import Layout from "../../components/layout";
import React from "react";
import ProfileOne from "../../components/profileForm/startups/one";
import ProfileTwo from "../../components/profileForm/startups/two";
import ProfileThree from "../../components/profileForm/startups/three";
import ProfileFive from "../../components/profileForm/startups/five";
import Head from "next/head";
import {auth} from "../../components/hoc/auth";
import {useSelector} from "react-redux";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import {ProfileFour} from "../../components/profileForm/startups/four";
import {User} from "../../utils/User";
import InvestorBasicInfo from "../../components/profileForm/investors/one";
import InvestorPreference from "../../components/profileForm/investors/two";
import InvestorMoreInfo from "../../components/profileForm/investors/three";

const Profile = ({startup, industries, locations, stages, loggedInUser, investor}) => {
    const currentProfile = useSelector(state => state.profile.currentState);
    const userType = loggedInUser.user_type.user_type;

    const ProfileComponent = () => {
        switch (currentProfile) {
            case 1:
                return userType === 'Investor' ? <InvestorBasicInfo investor={investor} locations={locations} /> : <ProfileOne startup={startup} locations={locations}/>;
            case 2:
                return userType === 'Investor' ? <InvestorPreference industries={industries} investor={investor} /> : <ProfileTwo startup={startup} locations={locations} industries={industries}/>;
            case 3:
                return userType === 'Investor' ? <InvestorMoreInfo investor={investor} stages={stages} /> : <ProfileThree startup={startup}/>;
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
    const loggedInUser = User(ctx);

    const {data: {startup, industries, locations, stages, investor}} = await axiosInstance.get('profile-content', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return {
        startup,
        industries,
        locations,
        stages,
        loggedInUser,
        investor
    }
}

export default auth(Profile);