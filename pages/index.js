import Head from 'next/head'
import Layout from "../components/layout";
import React, {useEffect} from "react";
import HeaderContent from "../components/header/HeaderContent";
import Link from "next/link";
import {profileMiddleWare} from "../components/hoc/auth";
import axiosInstance from "../config/axios";

const Home = ({events, blogs}) => {
    useEffect(() => {
        $('.event-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            autoplay: true,
        });

        $('.posts-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            autoplay: true,
        });

        $('a[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                let target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    }, [])

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
                    {
                        events.map(({id, date_formatted, image, country, title, slug}) => <div className="col-md-4"
                                                                                               key={id}>
                                <Link href="events/[slug]" as={`events/${slug}`}>
                                    <a>
                                        <div className="card">
                                            <div className="position-relative">
                                                <img className="card-img-top img-fluid" src={image}/>
                                                <a className="view" href="#">view <img src="images/icon/right.png" alt=""/></a>
                                            </div>

                                            <div className="background-text">
                                                <p>{title}</p>
                                            </div>

                                            <div className="meta">
                                                <p>{date_formatted}</p>
                                                <p>{country}</p>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        )

                    }
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
                    {
                        blogs.map(({slug, id, title, image}) => <div className="col-md-3 px-0" key={id}>
                                <Link href="blog/[slug]" as={`blog/${slug}`}>
                                    <a className="post"
                                       style={{backgroundImage: `url(${image})`}}>
                                        <p>{title}</p>
                                    </a>
                                </Link>
                            </div>
                        )

                    }
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

Home.getInitialProps = async ctx => {
    const {data: {blogs, events}} = await axiosInstance.get('home-page');

    return {
        events,
        blogs
    }
}

export default profileMiddleWare(Home);