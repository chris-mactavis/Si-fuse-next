import React from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import {profileMiddleWare} from "../../components/hoc/auth";

const Blog = () => {
    return <Layout headerContent={<h1>Blog</h1>} page="Blog" headerClass="page-header blog">
        <Head>
            <title>Blog</title>
        </Head>

        <section className="events blog">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <Link href="blog/[slug]" as={`blog/africa-future-tech`}>
                            <a className="blog-post">
                                <div className="position-relative">
                                    <img src="/images/blog-1.jpg" className="img-fluid card-img-top"/>
                                    <span className="view">view <img src="images/icon/right.png" alt=""/></span>
                                </div>

                                <div className="meta">
                                    <p>4 min. read</p>
                                    <p>01/02/20</p>
                                </div>

                                <p className="post-title">Africa Future Tech and Energy Summit</p>
                            </a>
                        </Link>
                    </div>

                    <div className="col-md-6">
                        <Link href="single-blog">
                            <a className="blog-post">
                                <div className="position-relative">
                                    <img src="/images/blog-2.jpg" className="img-fluid card-img-top"/>
                                    <span className="view">view <img src="images/icon/right.png" alt=""/></span>
                                </div>

                                <div className="meta">
                                    <p>4 min. read</p>
                                    <p>01/02/20</p>
                                </div>

                                <p className="post-title">Africa Future Tech and Energy Summit</p>
                            </a>
                        </Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <Link href="single-blog">
                            <a className="blog-post">
                                <div className="position-relative">
                                    <img src="/images/blog-3.jpg" className="img-fluid card-img-top"/>
                                    <span className="view">view <img src="images/icon/right.png" alt=""/></span>
                                </div>

                                <div className="meta">
                                    <p>4 min. read</p>
                                    <p>01/02/20</p>
                                </div>

                                <p className="post-title">Africa Future Tech and Energy Summit</p>
                            </a>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link href="single-blog">
                            <a className="blog-post">
                                <div className="position-relative">
                                    <img src="/images/blog-4.jpg" className="img-fluid card-img-top"/>
                                    <span className="view">view <img src="images/icon/right.png" alt=""/></span>
                                </div>

                                <div className="meta">
                                    <p>4 min. read</p>
                                    <p>01/02/20</p>
                                </div>

                                <p className="post-title">Africa Future Tech and Energy Summit</p>
                            </a>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link href="single-blog">
                            <a className="blog-post">
                                <div className="position-relative">
                                    <img src="/images/blog-5.jpg" className="img-fluid card-img-top"/>
                                    <span className="view">view <img src="images/icon/right.png" alt=""/></span>
                                </div>

                                <div className="meta">
                                    <p>4 min. read</p>
                                    <p>01/02/20</p>
                                </div>

                                <p className="post-title">Africa Future Tech and Energy Summit</p>
                            </a>
                        </Link>
                    </div>
                </div>

                <div className="text-center button">
                    <a href="#" className="btn">Load more</a>
                </div>
            </div>
        </section>
    </Layout>
};

export default profileMiddleWare(Blog);