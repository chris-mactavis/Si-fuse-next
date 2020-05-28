import Layout from "../../components/layout";
import Head from "next/head";
import React from "react";
import Link from "next/link";

export default function Events() {
    return <Layout page="Events" headerClass="page-header events" headerContent={<h1>Events</h1>}>
        <Head>
            <title>Events</title>
        </Head>

        <section className="events">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="position-relative">
                                <img className="card-img-top img-fluid" src="/images/blog-6.jpg"/>
                                <Link href="events/[slug]" as={`events/x-triumphant`}>
                                    <a className="view">view <img src="/images/icon/right.png"
                                                                  alt=""/></a>

                                </Link>
                            </div>

                            <div className="background-text">
                                <p>X-Triumphant</p>
                            </div>

                            <div className="meta">
                                <p>Sat. 9, Jun. 2020</p>
                                <p>Nigeria</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="position-relative">
                                <img className="card-img-top img-fluid" src="/images/blog-5.jpg"/>
                                <Link href="single-event">
                                    <a className="view">view <img src="/images/icon/right.png"
                                                                  alt=""/></a>

                                </Link>
                            </div>

                            <div className="background-text">
                                <p>Target Egypt Forum 2020</p>
                            </div>

                            <div className="meta">
                                <p>Mon. 24, Nov. 2020</p>
                                <p>Kenya</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="position-relative">
                                <img className="card-img-top img-fluid" src="/images/blog-4.jpg"/>
                                <Link href="single-event">
                                    <a className="view">view <img src="/images/icon/right.png"
                                                                  alt=""/></a>

                                </Link>
                            </div>

                            <div className="background-text">
                                <p>African Future Tech and Energy <br/> Summit</p>
                            </div>

                            <div className="meta">
                                <p>Tue. 01, Oct. 2020</p>
                                <p>Nigeria</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="position-relative">
                                <img className="card-img-top img-fluid" src="/images/blog-6.jpg"/>
                                <Link href="single-event">
                                    <a className="view">view <img src="/images/icon/right.png"
                                                                  alt=""/></a>

                                </Link>
                            </div>

                            <div className="background-text">
                                <p>X-Triumphant</p>
                            </div>

                            <div className="meta">
                                <p>Sat. 9, Jun. 2020</p>
                                <p>Nigeria</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="position-relative">
                                <img className="card-img-top img-fluid" src="/images/blog-5.jpg"/>
                                <Link href="single-event">
                                    <a className="view">view <img src="/images/icon/right.png"
                                                                  alt=""/></a>

                                </Link>
                            </div>

                            <div className="background-text">
                                <p>Target Egypt Forum 2020</p>
                            </div>

                            <div className="meta">
                                <p>Mon. 24, Nov. 2020</p>
                                <p>Kenya</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="position-relative">
                                <img className="card-img-top img-fluid" src="/images/blog-4.jpg"/>
                                <Link href="single-event">
                                    <a className="view" href="#">view <img src="/images/icon/right.png" alt=""/></a>

                                </Link>
                            </div>

                            <div className="background-text">
                                <p>African Future Tech and Energy <br/> Summit</p>
                            </div>

                            <div className="meta">
                                <p>Tue. 01, Oct. 2020</p>
                                <p>Nigeria</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center button">
                    <a href="#" className="btn">Load more</a>
                </div>
            </div>
        </section>
    </Layout>
}