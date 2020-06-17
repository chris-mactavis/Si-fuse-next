import Head from "next/head";
import Layout from "../../components/layout";
import React from "react";

const ContactUs = () => {
    return <Layout headerContent={<h1>Contact Us</h1>} page="Contact Us" headerClass="page-header contact-us">
        <Head>
            <title>Contact Us</title>
        </Head>
    </Layout>
}

export default ContactUs;