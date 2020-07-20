import {useForm} from "react-hook-form";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import Router from "next/router";
import Cookies from "js-cookie";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";
import ErrorSpan from "../../UI/ErrorSpan";
import InvestorProfileHeader from "./InvestorProfileHeader";

const InvestorPreference = ({investor, industries, stages}) => {

    const {register, handleSubmit, errors} = useForm();

    const dispatch = useDispatch();

    const onSubmitHandler = async data => {
        dispatch(loader());
        try {
            await axiosInstance.post('investors/interest', data, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(loader());
            dispatch(incrementCurrentState());
        } catch (e) {
            dispatch(loader());
            console.log(e);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const hasInterests = () => investor.hasOwnProperty('interests') && investor.interests;

    return <>
        <section className="startup-levels">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    <InvestorProfileHeader/>

                                    <div className="d-md-none">
                                        <h4 className="text-center mb-3">Investment Composition</h4>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img className="img-fluid" src={investor.profile.profile_pic_url} alt=""/>
                                                <br/>
                                                <h5 className="mt-2">{investor.profile.user.first_name} {investor.profile.user.last_name}</h5>
                                            </div>

                                            <div className="col-md-8">
                                                <div className="input-group-container">
                                                    // Make multi-select
                                                    <select ref={register({required: 'This field is required'})} name="industry_id"
                                                            defaultValue={hasInterests() ? investor.interests.industry_id : ''}>
                                                        <option value="">Industry focus</option>
                                                        {
                                                            industries.map(({industry, id}) => <option key={id} value={id}>{industry}</option>)
                                                        }
                                                    </select>
                                                    {errors.industry_id && <ErrorSpan>{errors.industry_id.message}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="investor_type"
                                                            defaultValue={hasInterests() ? investor.interests.investor_type : ''}
                                                            ref={register}>
                                                        <option value="">What kind of investor are you?</option>
                                                        <option value="Any">Any</option>
                                                        <option value="Venture Capital">Venture Capital</option>
                                                        <option value="Angel Investor">Angel Investor</option>
                                                        <option value="Private Equity">Private Equity</option>
                                                        <option value="Financial Institute">Financial Institute</option>
                                                        <option value="Crowd Funding">Crowd Funding</option>
                                                    </select>
                                                </div>

                                                <div className="input-group-container">
                                                    // Make multi-select
                                                    <select name="geographical_focus" defaultValue={hasInterests() ? investor.interests.geographical_focus : ''} ref={register}>
                                                        <option value="">Geographical focus</option>
                                                        <option value="North Africa">North Africa</option>
                                                        <option value="East Africa">East Africa</option>
                                                        <option value="South Africa">South Africa</option>
                                                        <option value="West Africa">West Africa</option>
                                                        <option value="Central Africa">Central Africa</option>
                                                    </select>
                                                </div>

                                                <div className="input-group-container">
                                                    // Connect to API
                                                    <select name="investment-range" id="">
                                                        <option value="">Your Investment Range</option>
                                                        <option value="">$5,0000 - $10,000</option>
                                                        <option value="">$10,0000 - $50,000</option>
                                                        <option value="">$50,0000 - $100,000</option>
                                                        <option value="">$100,0000 - $250,000</option>
                                                        <option value="">$250,0000 - $1,000,000</option>
                                                        <option value="">$1,000,0000 - $2,000,000</option>
                                                        <option value="">$2,000,0000 and above</option>
                                                    </select>
                                                </div>

                                                <div className="input-group-container">
                                                    // Connect to API, Make multi select
                                                    {/*<select name="investment_stage_id" defaultValue={hasInterests() ? investor.interests.investment_stage_id : ''} ref={register({required: 'This field is required'})}>*/}
                                                    <select name="investment_stage_id" defaultValue={hasInterests() ? investor.interests.investment_stage_id : ''}>
                                                        <option value="">Target Startup Stage</option>
                                                        <option value="">dummy option</option>
                                                        {/*{stages.map(({stage, id}) => <option key={id} value={id}>{stage}</option>)}*/}
                                                    </select>
                                                    {errors.investment_stage_id && <ErrorSpan>{errors.investment_stage_id.message}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="covid_impact"
                                                            className="covid-impact"
                                                            defaultValue={hasInterests() ? investor.interests.covid_impact : ''} ref={register}>
                                                        <option value="">COVID-19 impact on investments</option>
                                                        <option value="negative">Negative</option>
                                                        <option value="positive">Positive</option>
                                                        <option value="no impact at all">No impact at all</option>
                                                    </select>
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="investor_objective"
                                                            defaultValue={hasInterests() ? investor.interests.investor_objective : ''}
                                                            ref={register}>
                                                        <option value="">Your aim when meeting a startup</option>
                                                        <option value="Get to know the business opportunities">Get to know the business
                                                            opportunities
                                                        </option>
                                                        <option value="Get to know the person">Get to know the person</option>
                                                        <option value="Learn about the product and services">Learn about the product and
                                                            services
                                                        </option>
                                                        <option value="Build Relationship">Build Relationship</option>
                                                        <option value="Learn more about the specific sector">Learn more about the specific
                                                            sector
                                                        </option>
                                                        <option value="Understanding the team and culture">Understanding the team and culture
                                                        </option>
                                                    </select>
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="decision_time"
                                                            defaultValue={hasInterests() ? investor.interests.decision_time : ''}
                                                            ref={register}>
                                                        <option value="">Investment decision duration</option>
                                                        <option value="< 1 Month">&lt; 1 Month</option>
                                                        <option value="1 - 3 Months">1 - 3 Months</option>
                                                        <option value="3 - 6 Months">3 - 6 Months</option>
                                                        <option value="> 6 Months">&gt; 6 Months</option>
                                                    </select>
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="critical_decision_factor"
                                                            defaultValue={hasInterests() ? investor.interests.critical_decision_factor : ''}
                                                            ref={register}>
                                                        <option value="">Most critical decision factor?</option>
                                                        <option value="Founder’s ability to adapt into this new situation">Founder’s ability to
                                                            adapt into this new situation
                                                        </option>
                                                        <option value="The likeability of the founder(s)">The likeability of the founder(s)
                                                        </option>
                                                        <option value="Sales or growth projections">Sales or growth projections</option>
                                                        <option value="Shareholder and investor references">Shareholder and investor
                                                            references
                                                        </option>
                                                        <option value="Traction">Traction</option>
                                                        <option value="Good quality materials">Good quality materials</option>
                                                        <option value="Good quality materials">Good quality materials</option>
                                                        <option value="Due diligence">Due diligence</option>
                                                        <option value="Online demo">Online demo</option>
                                                    </select>
                                                </div>

                                                <div className="input-group-container">
                                                    // Make multi-select
                                                    <select name="dealflow_channel"
                                                            defaultValue={hasInterests() ? investor.interests.dealflow_channel : ''}
                                                            ref={register}>
                                                        <option value="">Social distancing dealflow channels?</option>
                                                        <option value="Online events & demo days">Online events & demo days</option>
                                                        <option value="Crunchbase">Crunchbase</option>
                                                        <option value="Linkedin">Linkedin</option>
                                                        <option value="Referrals">Referrals</option>
                                                        <option value="Investor network">Investor network</option>
                                                        <option value="Business Angel networks like ABAN">Business Angel networks like ABAN
                                                        </option>
                                                        <option value="Existing channels">Existing channels</option>
                                                    </select>
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="investment_range"
                                                            defaultValue={hasInterests() ? investor.interests.investment_range : ''}
                                                            ref={register}>
                                                        <option value="">Investment Range</option>
                                                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                                                        <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                                                        <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                                                        <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                                                        <option value="$250,000 - $1,000,000">$250,000 - $1,000,000</option>
                                                        <option value="$1,000,000 - $2,000,000">$1,000,000 - $2,000,000</option>
                                                        <option value="$2,000,000 and above">$2,000,000 and above</option>
                                                    </select>
                                                </div>

                                                <div className="input-group-container">
                                                    // Make multi-select
                                                    <select name="investment_type"
                                                            defaultValue={hasInterests() ? investor.interests.investment_type : ''}
                                                            ref={register}>
                                                        <option value="">Investment Type</option>
                                                        <option value="Equity">Equity</option>
                                                        <option value="Safe">Safe</option>
                                                        <option value="Debt Financing">Debt Financing</option>
                                                        <option value="Convertible Notes">Convertible Notes</option>
                                                        <option value="Grants">Grants</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <button className="btn prev mr-auto" onClick={() => dispatch(decrementCurrentState())} type="button">
                                                <span/> Prev
                                            </button>

                                            <button className="btn next ml-auto" type="submit">
                                                Save <span/>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <style jsx>{`
            // .input-group-container {
            //     display: flex;
            //     flex-direction: column;
            //     margin-bottom: 0;
            // }
            // input, select, textarea {
            //     margin-bottom: 0!important;
            //     margin-top: 4rem;
            // }
            // .btn {
            //     margin-top: 4rem;
            // }
            // input.country-code {
            //     width: 90%;
            // }
            // .industry-label, about-label {
            //     margin-top: 4rem;
            // }
            // .profile-pic {
            //     cursor:pointer;
            //     width: 300px;
            // }
        `}</style>
    </>

}

export default InvestorPreference;