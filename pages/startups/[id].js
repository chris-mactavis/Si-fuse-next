import {useRouter} from "next/router";
import Layout from "../../components/layout";
import React from "react";
import Head from "next/head";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import Profile from "../../components/Profile";

export default function SingleStartup({startup: {company, product_services: services, finance, market}}) {

    return <>
        <Layout headerContent={null} headerClass="page-header no-bg" redBar>
            <Head>
                <title>{company.name}</title>
            </Head>

            <Profile company={company} services={services} finance={finance} market={market} userType="startup" />
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
    const {data: response} = await axiosInstance.get(`investors/startups/${id}`, {
        headers: {
            Authorization: `Bearer ${Token(ctx)}`
        }
    });

    return {
        startup: response.data
    }
}
