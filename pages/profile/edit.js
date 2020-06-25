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
import Level1 from "../../components/profileForm/investors/level1";
import Level2 from "../../components/profileForm/investors/level2";
import Level3 from "../../components/profileForm/investors/level3";
import Level4 from "../../components/profileForm/investors/level4";
import Level5 from "../../components/profileForm/investors/level5";
import Level6 from "../../components/profileForm/investors/level6";
import Level7 from "../../components/profileForm/investors/level7";
import Level8 from "../../components/profileForm/investors/level8";

const Profile = ({startup, industries, locations, stages, loggedInUser, investor}) => {
    const currentProfile = useSelector(state => state.profile.currentState);
    const userType = loggedInUser.user_type.user_type;

    const ProfileComponent = () => {
        if (userType === 'Investor') {
            switch (currentProfile) {
                case 1:
                    return <Level1 investor={investor} />;
                case 2:
                    return <Level2 investor={investor} />;
                case 3:
                    return <Level3 investor={investor} />;
                case 4:
                    return <Level4 investor={investor} />;
                case 5:
                    return <Level5 investor={investor} />;
                case 6:
                    return <Level6 investor={investor} />;
                case 7:
                    return <Level7 investor={investor} />;
                case 8:
                    return <Level8 investor={investor} />;
                case 9:
                    return <InvestorBasicInfo investor={investor} locations={locations}/>;
                case 10:
                    return <InvestorPreference industries={industries} investor={investor}/>;
                case 11:
                    return <InvestorMoreInfo industries={industries} stages={stages} investor={investor} />
            }
        } else {
            switch (currentProfile) {
                case 1:
                    return <ProfileOne startup={startup} locations={locations}/>;
                case 2:
                    return <ProfileTwo startup={startup} locations={locations} industries={industries}/>;
                case 3:
                    return <ProfileThree startup={startup}/>;
                case 4:
                    return <ProfileFour startup={startup}/>;
                case 5:
                    return <ProfileFive startup={startup}/>;
            }
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