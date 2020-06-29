import Layout from "../../components/layout";
import React from "react";
import Head from "next/head";
import Router from "next/router";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import Profile from "../../components/Profile";
import {User} from "../../utils/User";
import {profileMiddleWare} from "../../components/hoc/auth";

const ProfilePage = ({canView, data: {company, product_services: services, finance, market, profile, interests, level, connections}, userType, profileContent}) => {
    if (!canView) {
        Router.push('/profile/edit');
        return null;
    }

    return <>
        <Layout headerContent={null} headerClass="page-header no-bg" redBar>
            <Head>
                <title>My Profile</title>
            </Head>

            <Profile company={company} services={services} finance={finance} market={market} level={level} profile={profile} interests={interests} userType={userType} hasEdit profileContent={profileContent} connections={connections} />
        </Layout>
        <style jsx>{`
            .services-stage {
                text-transform: capitalize;
            }
            .person-logo { max-width: 40% }
        `}</style>
    </>
}

ProfilePage.getInitialProps = async (ctx) => {
    const user = User(ctx);
    const isLoggedIn = Token(ctx);
    const hasProfile = user ? user.has_profile : false;

    const headers = {
        headers: {
            Authorization: `Bearer ${Token(ctx)}`
        }
    };
    const url = user.user_type.user_type === 'Investor' ? 'investors' : 'startups';
    const {data: response} = await axiosInstance.get(url, headers);
    const {data: profileContent} = await axiosInstance.get('profile-content', headers);

    return {
        data: response.data,
        userType: user.user_type.user_type,
        profileContent,
        canView: isLoggedIn && hasProfile
    }
}

export default profileMiddleWare(ProfilePage);
