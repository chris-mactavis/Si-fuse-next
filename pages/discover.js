import Layout from "../components/layout";
import Head from "next/head";
import React from "react";
import HeaderContent from "../components/discover/HeaderContent";
import Link from "next/link";

export default function Discover() {
    return <Layout page="Discover" headerClass="discover page-header" headerContent={<HeaderContent/>}>
        <Head>
            <title>Discover</title>
        </Head>

        <section className="events discover">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Startups</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <Link href="startups/[slug]" as={`startups/x-triumphant`}>
                            <a className="card">
                                <div className="img-wrapper">
                                    <img className="card-img-top img-fluid" src="images/startup-3.png"/>
                                    <span className="view">view <img src="images/icon/right.png"/></span>
                                </div>

                                <div className="background-text">
                                    <p>X-Triumphant</p>
                                    <p>Early Stage</p>
                                </div>

                                <div className="event-tag-location">
                                    <p>Fintech</p>
                                    <p>Nigeria</p>
                                </div>
                            </a>

                        </Link>
                    </div>

                    <div className="col-md-3">
                        <Link href="open-startup">
                            <a className="card">
                                <div className="img-wrapper">
                                    <img className="card-img-top img-fluid" src="images/startup-2.png"/>
                                    <span className="view">view <img src="images/icon/right.png" alt=""/></span>
                                </div>

                                <div className="background-text">
                                    <p>Target Egypt Forum 2020</p>
                                    <p>Late Stage</p>
                                </div>

                                <div className="event-tag-location">
                                    <p>Fintech</p>
                                    <p>Nigeria</p>
                                </div>
                            </a>
                        </Link>
                    </div>

                    <div className="col-md-3">
                        <Link href="open-startup">
                            <a className="card">
                                <div className="img-wrapper">
                                    <img className="card-img-top img-fluid" src="images/startup-1.png"/>
                                    <span className="view">view <img src="images/icon/right.png" alt=""/></span>
                                </div>

                                <div className="background-text">
                                    <p>African Future Tech and Energy Summit</p>
                                    <p>Middle Stage</p>
                                </div>

                                <div className="event-tag-location">
                                    <p>Fintech</p>
                                    <p>Nigeria</p>
                                </div>
                            </a>
                        </Link>
                    </div>

                    <div className="col-md-3">
                        <Link href="open-startup">
                            <a className="card">
                                <div className="img-wrapper">
                                    <img className="card-img-top img-fluid" src="images/startup-3.png"/>
                                    <span className="view">view <img src="images/icon/right.png" alt=""/></span>
                                </div>

                                <div className="background-text">
                                    <p>X-Triumphant</p>
                                    <p>Early Stage</p>
                                </div>

                                <div className="event-tag-location">
                                    <p>Fintech</p>
                                    <p>Nigeria</p>
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>

                <div className="text-center button mt-5">
                    <a href="#" className="btn">Load more</a>
                </div>
            </div>
        </section>
    </Layout>
}