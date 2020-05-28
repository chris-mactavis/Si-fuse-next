import Layout from "../../components/layout";
import Head from "next/head";
import React from "react";

export default function Settings() {
    return <Layout page="Settings" headerContent={null} isLoggedIn headerClass="page-header no-bg" redBar>
        <Head><title>Settings</title></Head>

        <section className="single-post">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <form action="#" className="recovery-pwd">
                            <div className="d-flex">
                                <div className="half-width faded">
                                    <label htmlFor="email">Email</label>
                                    <input className="full-width half-width" type="text"
                                           placeholder="currentEmail@startup.com"/>
                                </div>

                                <div className="half-width faded">
                                    <label htmlFor="phone">Phone</label>
                                    <input className="full-width half-width" type="number"
                                           placeholder="080 XXX XXX XX"/>
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className="half-width faded">
                                    <label htmlFor="password">Change password</label>
                                    <input className="full-width half-width" type="password"
                                           placeholder="New password"/>
                                </div>

                                <div className="half-width faded">
                                    <label>&nbsp;</label>
                                    <input className="full-width half-width" type="password"
                                           placeholder="Confrim Password"/>
                                </div>
                            </div>

                            <div className="half-width faded">
                                <label>Account</label>
                                <button className="del">Delete my account</button>
                            </div>

                            <div className="half-width m-bottom">
                                <label>Enter Current password to edit account</label>
                                <input type="password" className="full-width"/>
                            </div>


                            <div className="text-center">
                                <button type="submit" className="btn m-bottom">
                                    Edit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}