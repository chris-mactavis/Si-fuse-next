import {useRouter} from "next/router";
import Layout from "../../components/layout";
import React from "react";
import Head from "next/head";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import Profile from "../../components/Profile";

export default function SingleStartup({startup: {profile, company, product_services: services, finance, market}, id, isConnected, profileContent}) {
    return <>
        <Layout headerContent={null} headerClass="page-header no-bg" redBar>
            <Head>
                <title>{company.name}</title>
            </Head>

            <Profile profile={profile} company={company} services={services} finance={finance} market={market} userType="startup" id={id} isConnected={isConnected} profileContent={profileContent} />
        </Layout>
        <style jsx>{`
            .services-stage {
                text-transform: capitalize;
            }
            .person-logo { max-width: 40% }
        `}</style>
    </>
}

SingleStartup.getInitialProps = async (ctx) => {
    const id = ctx.query.id;
    const headers = {
        headers: {
            Authorization: `Bearer ${Token(ctx)}`
        }
    };
    const {data: response} = await axiosInstance.get(`investors/startups/${id}`, headers);
    const {data: profileContent} = await axiosInstance.get('profile-content', headers);

    return {
        startup: response.data,
        isConnected: response.is_connected,
        id,
        profileContent
    }
}
