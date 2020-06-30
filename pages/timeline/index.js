import Head from "next/head";
import Layout from "../../components/layout";
import React from "react";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import Router from "next/router";

const Timeline = ({data: {data: startups}}) => {
    console.log(startups);

    return <Layout page="Timeline" headerClass="page-header no-bg" redBar>
        <Head>
            <title>Timeline</title>
        </Head>

        <section className="timeline">
            <div className="container">

                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">My Timeline</h2>
                    </div>
                </div>

                {
                    startups.map(
                        ({company, finance, level, profile}, index) => <div className="row mb-5 pointer" onClick={() => Router.push('/startups/[id]', `/startups/${profile.user_id}`)} key={index}>
                            <div className="col">
                                <article>
                                    <div className="row">
                                        <div className="col">
                                            <h4>{company.name}</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3 d-flex align-items-center">
                                            <img className="img-fluid startup-logo" src={company.logo_url} alt=""/>
                                        </div>

                                        <div className="col-md-6 d-flex align-items-center tagging">
                                            <div className="tagging-container">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <div className="level perfect">
                                                            <div className="text">
                                                                <img className="icon"
                                                                     src="/images/icon/startup-level-team.svg"
                                                                     alt=""/>
                                                                <span>Team</span>
                                                            </div>

                                                            <p className="grade">Perfect</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-4">
                                                        <div className="level good">
                                                            <div className="text">
                                                                <img className="icon"
                                                                     src="/images/icon/startup-level-problem.svg"
                                                                     alt=""/>
                                                                <span>Problem</span>
                                                            </div>

                                                            <p className="grade">Good</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-4">
                                                        <div className="level fair">
                                                            <div className="text">
                                                                <img className="icon"
                                                                     src="/images/icon/startup-level-vision.svg"
                                                                     alt=""/>
                                                                <span>Value prop.</span>
                                                            </div>

                                                            <p className="grade">Fair</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-4">
                                                        <div className="level perfect">
                                                            <div className="text">
                                                                <img className="icon"
                                                                     src="/images/icon/startup-level-market.svg"
                                                                     alt=""/>
                                                                <span>Market</span>
                                                            </div>

                                                            <p className="grade">Perfect</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-4">
                                                        <div className="level fair">
                                                            <div className="text">
                                                                <img className="icon"
                                                                     src="/images/icon/startup-level-business_model.svg"
                                                                     alt=""/>
                                                                <span>Model</span>
                                                            </div>

                                                            <p className="grade">Fair</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-4">
                                                        <div className="level fair">
                                                            <div className="text">
                                                                <img className="icon"
                                                                     src="/images/icon/startup-level-scale.svg"
                                                                     alt=""/>
                                                                <span>Scale</span>
                                                            </div>

                                                            <p className="grade">Fair</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-4">
                                                        <div className="level good">
                                                            <div className="text">
                                                                <img className="icon"
                                                                     src="/images/icon/startup-level-vision.svg"
                                                                     alt=""/>
                                                                <span>Vision</span>
                                                            </div>

                                                            <p className="grade">Good</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-4">
                                                        <div className="level perfect">
                                                            <div className="text">
                                                                <img className="icon"
                                                                     src="/images/icon/startup-level-investor_exit.svg"
                                                                     alt=""/>
                                                                <span>Exit Strategy</span>
                                                            </div>

                                                            <p className="grade">Perfect</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-4">
                                                        <div className="level fair">
                                                            <div className="text">
                                                                <img className="icon"
                                                                     src="/images/icon/startup-level-products.svg"
                                                                     alt=""/>
                                                                <span>Product</span>
                                                            </div>

                                                            <p className="grade">Fair</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="tags d-flex align-items-center">
                                                <div>
                                                    {company.industry && <span className="tag">{company.industry}</span>}
                                                    {finance.capital_needed_for && <span className="tag">{finance.capital_needed_for}</span>}
                                                    {finance.funding_stage && <span className="tag">{finance.funding_stage}</span>}
                                                    {finance.geographical_focus && <span className="tag">{finance.geographical_focus}</span>}
                                                    {finance.revenue_type && <span className="tag">{finance.revenue_type}</span>}
                                                    {finance.growth_projection && <span className="tag">{finance.growth_projection}</span>}
                                                    {company.clients_serviced ? JSON.parse(company.clients_serviced).map(client => <span className="tag" key={client}>{client}</span>) : null}
                                                    {finance.investor_type && <span className="tag">{finance.investor_type}</span>}
                                                    {finance.funding_stage && <span className="tag">{finance.funding_stage}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>

    </Layout>

}

Timeline.getInitialProps = async (ctx) => {
    try {
        const {data: response} = await axiosInstance.get('investors/discover?show_full=true', {
            headers: {
                'Authorization': `Bearer ${Token(ctx)}`
            }
        });

        return {
            data: response
        }
    } catch (e) {
        console.log(e.response.data.message);
        return {};
    }
}

export default Timeline;