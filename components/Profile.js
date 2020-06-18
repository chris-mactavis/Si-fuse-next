import React, {useState} from "react";
import Router from "next/router";
import axiosInstance from "../config/axios";
import Token from "../utils/Token";
import {useDispatch} from "react-redux";
import {loader} from "../store/actions/loader";

const Profile = ({company, services, finance, market, userType, profile, interests, hasEdit = false, id = null, isConnected = null}) => {

    const [connected, setConnected] = useState(isConnected);

    const dispatch = useDispatch();
    const connectHandler = async () => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post(`investors/follows`, {
                follower_id: id
            }, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            setConnected(true);
            dispatch(loader());
        } catch (e) {
            console.log(e.response.data.message);
            dispatch(loader());
        }

    }

    const disconnectHandler = async () => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post(`investors/unfollow`, {
                follower_id: id
            }, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            setConnected(false);
            dispatch(loader());
        } catch (e) {
            console.log(e.response.data.message);
            dispatch(loader());
        }
    }

    return <>
        <section className="startup-content">
            <div className="container">
                {
                    userType.toLowerCase() === 'startup'
                        ? <>
                            <div className="row">
                                <div className="col-12">
                                    <div className="person">
                                        {hasEdit &&
                                        <span className="has-edit" onClick={() => Router.push('/profile/edit')}/>}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="image">
                                                    <img src={company.logo_url} alt="" className="img-fluid person-logo"/>
                                                    <div>
                                                        <p>{company.name}</p>
                                                        <p className="bold-text">Location</p>
                                                        <div className="d-flex mb-4">
                                                            <img src="/images/icon/location.svg" alt=""
                                                                 className="img-fluid small-icons"/>
                                                            <span>{company.location}</span>
                                                        </div>
                                                        <div className="d-flex">
                                                            <a href={`https://facebook.com/${company.facebook}`}
                                                               target="_blank">
                                                                <img src="/images/icon/fb.svg" alt=""
                                                                     className="img-fluid small-icons"/>
                                                            </a>
                                                            <a href={`https://linkedin.com/in/${company.linkedin}`}
                                                               target="_blank">
                                                                <img src="/images/icon/lndk.svg" alt=""
                                                                     className="img-fluid small-icons"/>
                                                            </a>
                                                            <a href={`https://instagram.com/${company.instagram}`}
                                                               target="_blank">
                                                                <img src="/images/icon/ig.svg" alt=""
                                                                     className="img-fluid small-icons"/>
                                                            </a>
                                                            <a href={`https://twitter.com/${company.twitter}`}
                                                               target="_blank">
                                                                <img src="/images/icon/twt.svg" alt=""
                                                                     className="img-fluid"/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="button-togo">
                                                    {
                                                        connected
                                                            ?
                                                            <button type="button" onClick={disconnectHandler}>Disconnect</button>
                                                            : <button type="button" onClick={connectHandler}>Connect</button>
                                                    }
                                                    {/*<button id="message" type="button">Message</button>*/}
                                                    <button type="button"
                                                            onClick={() => window.open(company.website, '_blank')}>Website
                                                    </button>
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
                                                    <p className="bold-text">About {company.name}</p>
                                                    <p className="small-text">{company.summary}</p>

                                                    <div className="d-flex justify-content-between flex-wrap">
                                                        <div className="text-center">
                                                            <p className="bold-text">Target Fund</p>
                                                            <p className="text-sm color-green">$25,000</p>
                                                        </div>

                                                        <div className="text-center">
                                                            <p className="bold-text">Industry</p>
                                                            <p className="text-sm">{company.industries.length > 0 ? company.industries[0].industry.industry : ''}</p>
                                                        </div>

                                                        <div className="text-center">
                                                            <p className="bold-text">Company Stage</p>
                                                            <p className="text-sm services-stage">{services.company_stage}</p>
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
                                                    <img src={services.product_image_url} alt="" className="img-fluid"/>
                                                    <p>Product Image</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="about-person">
                                                    <p className="bold-text">{services.product_name}</p>
                                                    <p className="small-text">{company.location}</p>

                                                    <p className="bold-text">Proposed Solution</p>
                                                    <p className="small-text">{services.proposed_solution}</p>

                                                    <p className="bold-text">Customer Problem</p>
                                                    <p className="small-text">{services.customer_problem}</p>
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
                                                    <p className="small-text">#{finance.funding_needed}</p>

                                                    <p className="bold-text">Invested Funding</p>
                                                    <p className="small-text">#{finance.invested_funding}</p>

                                                    <p className="bold-text">Investment Ask</p>
                                                    <p className="small-text">{finance.investment_ask}</p>

                                                    <p className="bold-text">Business Size</p>
                                                    <p className="small-text">{finance.business_size}</p>


                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="about-person summary">
                                                    <p className="bold-text">Investor Type</p>
                                                    <p className="small-text">{finance.investor_type}</p>

                                                    <p className="bold-text">Revenue Type</p>
                                                    <p className="small-text">{finance.revenue_type}</p>

                                                    <p className="bold-text">Geographical Focus</p>
                                                    <p className="small-text">{finance.geographical_focus}</p>

                                                    <p className="bold-text">Growth Projection</p>
                                                    <p className="small-text">{finance.growth_projection}</p>
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

                                                    <p className="bold-text">Addressable Market</p>
                                                    <p className="small-text">{market.addressable_market}</p>

                                                    <p className="bold-text">Marketing Summary</p>
                                                    <p className="small-text">{market.marketing_strategy}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="about-person summary">
                                                    <p className="bold-text">Company Competitors</p>
                                                    <p className="small-text">{market.company_competitors}</p>

                                                    <p className="bold-text">Competitive Advantage</p>
                                                    <p className="small-text">{market.competitive_advantage}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        : <>
                            <div className="row">
                                <div className="col-12">
                                    <div className="person">
                                        {hasEdit &&
                                        <span className="has-edit" onClick={() => Router.push('/profile/edit')}/>}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="image">
                                                    <img src={profile.profile_pic_url} alt=""
                                                         className="img-fluid person-logo"/>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="about-person">
                                                    <p className="bold-text">About Me</p>
                                                    <p className="small-text">{profile.about}</p>

                                                    <p className="bold-text">Gender</p>
                                                    <p className="small-text text-capitalize">{profile.gender}</p>

                                                    <p className="bold-text">Phone Number</p>
                                                    <p className="small-text text-capitalize">{profile.phone}</p>
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
                                                    <p className="red">Startup Preference</p>

                                                    <p className="bold-text">Investor Type</p>
                                                    <p className="small-text">{interests.investor_type}</p>

                                                    <p className="bold-text">Investment Type</p>
                                                    <p className="small-text">{interests.investment_type}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="about-person summary">
                                                    <p className="bold-text">Geographical Focus</p>
                                                    <p className="small-text">{interests.geographical_focus}</p>

                                                    <p className="bold-text">Investment Range</p>
                                                    <p className="small-text">{interests.investment_range}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
        </section>
        <style jsx>{`
            .person .has-edit {
                content: '';
                background: url(/images/icon/edit.png);
                width: 30px;
                height: 30px;
                position: absolute;
                background-repeat: no-repeat;
                background-size: contain;
                cursor: pointer;
                top: 5px;
                right: 25px;
            }
        `}</style>
    </>
}

export default Profile;