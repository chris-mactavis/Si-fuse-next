import Layout from "../../components/layout";
import Head from "next/head";
import React from "react";

export default function SingleBlog() {
    return <Layout page="SingleBlog" headerContent={null} headerClass="page-header no-bg" redBar>
        <Head>
            <title>Single Title >>></title>
        </Head>

        <section className="single-post">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <img src="/images/blog-3.jpg" alt="" className="img-fluid blog-image"/>

                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    <div className="content">
                                        <h1>African Future Tech and Energy Summit</h1>

                                        <div className="category">
                                            <p>Post category</p>
                                            <p>10 min. read</p>
                                            <p>2 <sup>nd</sup> Aug 2020</p>
                                        </div>

                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                            laboris nisi ut aliquip ex ea commodo consequat. Duis
                                            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                            eu fugiat nulla Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat.
                                        </p>

                                        <p>
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                            dolore eu fugiat nulla Lorem ipsum dolor sit amet, consectetur
                                            adipiscing
                                            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in reprehenderit in
                                            voluptate velit esse cillum dolore eu fugiat nulla Lorem ipsum dolor sit
                                            amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>

                                        <p>
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                            ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum
                                            dolore eu fugiat nulla Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit, sed do eiusmod tempor incididunt ut
                                            labore et dolore magna aliqua.

                                        </p>

                                        <p>
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                            ut aliquip ex ea commodo consequat. Duis aute
                                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                            fugiat nulla Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.
                                        </p>

                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in reprehenderit in
                                            voluptate velit esse cillum dolore eu fugiat nulla
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}