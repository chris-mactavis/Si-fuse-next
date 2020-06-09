import Layout from "../../components/layout";
import React from "react";
import Head from "next/head";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import Profile from "../../components/Profile";
import {User} from "../../utils/User";

export default function ProfilePage({startup: {company, product_services: services, finance, market, profile, interests}, userType}) {
    console.log(userType, interests);
    return <>
        <Layout headerContent={null} headerClass="page-header no-bg" redBar>
            <Head>
                <title>My Profile</title>
            </Head>

            <Profile company={company} services={services} finance={finance} market={market} profile={profile} interests={interests} userType={userType} hasEdit />
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
    const url = user.user_type.user_type === 'Investor' ? 'investors' : 'startups';
    const {data: response} = await axiosInstance.get(url, {
        headers: {
            Authorization: `Bearer ${Token(ctx)}`
        }
    });

    return {
        startup: response.data,
        userType: user.user_type.user_type
    }
}
