import Head from "next/head";
import Layout from "../../components/layout";
import React from "react";

const aboutUs = () => {
    return <Layout headerContent={<h1>About Us</h1>} page="About" headerClass="page-header faqs">
        <Head>
            <title>About Us</title>
        </Head>
    </Layout>;
}

export default aboutUs;