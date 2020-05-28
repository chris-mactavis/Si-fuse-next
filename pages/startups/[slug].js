import {useRouter} from "next/router";
import Layout from "../../components/layout";
import React from "react";
import Head from "next/head";

export default function SingleStartup(props) {
    // const router = useRouter();
    // const {slug} = router.query;

    return <Layout headerContent={null} headerClass="page-header no-bg" redBar>
        <Head>
            <title>SingleStartup</title>
        </Head>

        <section className="startup-content">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="person">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="image">
                                        <img src="/images/sizani-africa.png" alt="" className="img-fluid person-logo"/>
                                        <div>
                                            <p>Sizani</p>
                                            <p className="bold-text">Location</p>
                                            <div className="d-flex mb-4">
                                                <img src="/images/icon/location.svg" alt=""
                                                     className="img-fluid small-icons"/>
                                                <span>Lagos, Nigeria</span>
                                            </div>
                                            <div className="d-flex">
                                                <a href="#">
                                                    <img src="/images/icon/fb.svg" alt=""
                                                         className="img-fluid small-icons"/>
                                                </a>
                                                <a href="#">
                                                    <img src="/images/icon/lndk.svg" alt=""
                                                         className="img-fluid small-icons"/>
                                                </a>
                                                <a href="#">
                                                    <img src="/images/icon/ig.svg" alt=""
                                                         className="img-fluid small-icons"/>
                                                </a>
                                                <a href="#">
                                                    <img src="/images/icon/twt.svg" alt="" className="img-fluid"/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="button-togo">
                                        <button type="button">Connect</button>
                                        <button id="message" type="button">Message</button>
                                        <button type="button">Website</button>
                                    </div>

                                    <form className="startup-message" id="st-message">
                                        <textarea name="message" id="message" cols="47" rows="10"
                                                  placeholder="Compose Message"/>
                                        <div className="text-right">
                                            <button type="submit">Send</button>
                                        </div>
                                    </form>
                                </div>

                                <div className="col-md-6">
                                    <div className="about-person">
                                        <p className="bold-text">About Sizani</p>
                                        <p className="small-text">Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                            nisi ut aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                            eu fugiat nulla </p>

                                        <div className="d-flex justify-content-between flex-wrap">
                                            <div className="text-center">
                                                <p className="bold-text">Target Fund</p>
                                                <p className="text-sm color-green">$25,000</p>
                                            </div>

                                            <div className="text-center">
                                                <p className="bold-text">Industry</p>
                                                <p className="text-sm">Construction</p>
                                            </div>

                                            <div className="text-center">
                                                <p className="bold-text">Company Stage</p>
                                                <p className="text-sm">Concept</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="person">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="startup-info">
                                        <p className="red">Products and Services</p>
                                        <img src="/images/product-img.png" alt="" className="img-fluid"/>
                                        <p>Product Image</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="about-person">
                                        <p className="bold-text">Product Name</p>
                                        <p className="small-text">Lagos, Nigeria</p>

                                        <p className="bold-text">Business Summary</p>
                                        <p className="small-text">Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit, sed do eiusmod tempor incididunt ut
                                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut aliquip ex
                                            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                            velit esse cillum dolore eu fugiat nulla
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="person">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="startup-info">
                                        <p className="red">Finance</p>
                                        <p className="bold-text">Capital Needed</p>
                                        <p className="small-text">Lagos, Nigeria</p>

                                        <p className="bold-text">Business Summary</p>
                                        <p className="small-text">Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit, sed do eiusmod tempor incididunt ut
                                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut aliquip ex
                                            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                            velit esse cillum dolore eu fugiat nulla
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="about-person summary">
                                        <p className="bold-text">Business Summary</p>
                                        <p className="small-text">Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit, sed do eiusmod tempor incididunt ut
                                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut aliquip ex
                                            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                            velit esse cillum dolore eu fugiat nulla
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="person">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="startup-info">
                                        <p className="red">Marketing Summary</p>
                                        <p className="bold-text">Adressable Market</p>
                                        <p className="small-text">Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit, sed do eiusmod tempor incididunt ut
                                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut aliquip ex
                                            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                            velit esse cillum dolore eu fugiat nulla
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="about-person summary">
                                        <p className="bold-text">Marketing Summary</p>
                                        <p className="small-text">Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit, sed do eiusmod tempor incididunt ut
                                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut aliquip ex
                                            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                            velit esse cillum dolore eu fugiat nulla
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