import Head from "next/head";
import Layout from "../../components/layout";
import React from "react";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import StartupCard from "../../components/startups/startupCard";

const Timeline = ({data: {data: startups}}) => {

    return <Layout page="Timeline" headerClass="page-header no-bg" redBar>
        <Head>
            <title>Timeline</title>
        </Head>

        <section className="timeline">
            <div className="container">

                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">My Timeline</h2>
                    </div>
                </div>

                {
                    startups.map(
                        (startup, index) => <StartupCard key={index} startup={startup} />
                    )
                }
            </div>
        </section>

    </Layout>

}

Timeline.getInitialProps = async (ctx) => {
    try {
        const {data: response} = await axiosInstance.get('investors/timeline', {
            headers: {
                'Authorization': `Bearer ${Token(ctx)}`
            }
        });

        return {
            data: response
        }
    } catch (e) {
        console.log(e.response.data.message);
        return {};
    }
}

export default Timeline;