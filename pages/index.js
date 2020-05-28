import Head from 'next/head'
import Layout from "../components/layout";
import React from "react";
import HeaderContent from "../components/header/HeaderContent";
import Link from "next/link";

export default function Home() {
    return <Layout
        page="Home"
        headerContent={<HeaderContent/>}
        headerClass="homepage"
    >
        <Head>
            <title>SI Fuse</title>
        </Head>

        <section id="second-section" className="image-text">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-10 mx-auto">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="investors">
                                    <img className="img-01" src="images/icon/01.png" alt=""/>

                                    <h3>For investors</h3>
                                    <p>Are you seeking investment <br/> opportunities? Find the perfect <br/>
                                        businesses that match your interests <br/> within minutes.
                                    </p>
                                    <a className="link" href="#">Get started <img src="images/icon/arrow-right.png"
                                                                                  alt=""/></a>
                                </div>
                            </div>

                            <div className="col-md-6 offset-md-1">
                                <img className="img-fluid" src="images/investors.png" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <img className="img-fluid" src="images/startups.png" alt=""/>
                    </div>

                    <div className="col-md-6 offset-md-1">
                        <div className="investors startups">
                            <img className="img-01 img-02" src="images/icon/02.png" alt=""/>
                            <h3>For startups</h3>
                            <p>Are you seeking investment <br/> opportunities? Find the perfect <br/>
                                businesses that match your interests <br/> within minutes.
                            </p>
                            <a className="link" href="#">Get started <img src="images/icon/arrow-right.png" alt=""/></a>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section className="events">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Events</h2>
                    </div>
                </div>

                <div className="row event-slider">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="position-relative">
                                <img className="card-img-top img-fluid" src="images/blog-6.jpg"/>
                                <a className="view" href="#">view <img src="images/icon/right.png" alt=""/></a>
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
                                <img className="card-img-top img-fluid" src="images/blog-5.jpg"/>
                                <a className="view" href="#">view <img src="images/icon/right.png" alt=""/></a>
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
                                <img className="card-img-top img-fluid" src="images/blog-4.jpg"/>
                                <a className="view" href="#">view <img src="images/icon/right.png" alt=""/></a>
                            </div>

                            <div className="background-text">
                                <p>African Future Tech and Energy Summit</p>
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
                                <img className="card-img-top img-fluid" src="images/blog-6.jpg"/>
                                <a className="view" href="#">view <img src="images/icon/right.png" alt=""/></a>
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
                                <img className="card-img-top img-fluid" src="images/blog-5.jpg"/>
                                <a className="view" href="#">view <img src="images/icon/right.png" alt=""/></a>
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
                                <img className="card-img-top img-fluid" src="images/blog-4.jpg"/>
                                <a className="view" href="#">view <img src="images/icon/right.png" alt=""/></a>
                            </div>

                            <div className="background-text">
                                <p>African Future Tech and Energy Summit</p>
                            </div>

                            <div className="meta">
                                <p>Tue. 01, Oct. 2020</p>
                                <p>Nigeria</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center button mt-5">
                    <Link href="events">
                        <a className="btn">All events</a>
                    </Link>
                </div>

            </div>
        </section>

        <section className="events posts">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Blog</h2>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row posts-slider">
                    <div className="col-md-3 px-0">
                        <a className="post" href="#" style={{backgroundImage: `url(${require('../public/images/post-1.png')})`}}>
                            <p>Access to Capital And The Future of Fintech in Zambia</p>
                        </a>
                    </div>

                    <div className="col-md-3 px-0">
                        <a className="post" href="#" style={{backgroundImage: `url(${require('../public/images/post-2.png')})`}}>
                            <p>8 Steps to Starting Your Own Business</p>
                        </a>
                    </div>

                    <div className="col-md-3 px-0">
                        <a className="post" href="#" style={{backgroundImage: `url(${require('../public/images/events-1.png')})`}}>
                            <p>The Complete, 12-Step Guide to Starting a Business</p>
                        </a>
                    </div>

                    <div className="col-md-3 px-0">
                        <a className="post" href="#" style={{backgroundImage: `url(${require('../public/images/events-2.png')})`}}>
                            <p>The Complete, 12-Step Guide to Starting a Business</p>
                        </a>
                    </div>

                    <div className="col-md-3 px-0">
                        <a className="post" href="#" style={{backgroundImage: `url(${require('../public/images/post-1.png')})`}}>
                            <p>Access to Capital And The Future of Fintech in Zambia</p>
                        </a>
                    </div>

                    <div className="col-md-3 px-0">
                        <a className="post" href="#" style={{backgroundImage: `url(${require('../public/images/post-2.png')})`}}>
                            <p>8 Steps to Starting Your Own Business</p>
                        </a>
                    </div>

                    <div className="col-md-3 px-0">
                        <a className="post" href="#" style={{backgroundImage: `url(${require('../public/images/events-1.png')})`}}>
                            <p>The Complete, 12-Step Guide to Starting a Business</p>
                        </a>
                    </div>

                    <div className="col-md-3 px-0">
                        <a className="post" href="#" style={{backgroundImage: `url(${require('../public/images/events-2.png')})`}}>
                            <p>The Complete, 12-Step Guide to Starting a Business</p>
                        </a>
                    </div>

                </div>
            </div>

            <div className="text-center button">
                <Link href="blog">
                    <a className="btn">The Blog</a>
                </Link>
            </div>
        </section>


    </Layout>
}
