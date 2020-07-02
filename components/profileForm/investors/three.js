import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import Router from "next/router";
import Cookies from "js-cookie";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {decrementCurrentState} from "../../../store/actions/profile";
import ErrorSpan from "../../UI/ErrorSpan";

const InvestorMoreInfo = ({investor, stages}) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, errors} = useForm();
    const onSubmitHandler = async data => {
        dispatch(loader());
        try {
            await axiosInstance.post('investors/interest', data, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(loader());
            let user = JSON.parse(Cookies.get('user'));
            user.has_profile = 1;
            Cookies.set('user', JSON.stringify(user));
            Router.push('/');
        } catch (e) {
            dispatch(loader());
            console.log(e);
        }
    }

    const hasInterests = () => investor.hasOwnProperty('interests') && investor.interests;

    return <>
        <section className="profile single-post">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="numbers">
                            <div className="number fade">1</div>
                            <p className="fade">Basic information</p>
                        </div>

                        <div className="numbers only">
                            <div className="number fade">2</div>
                            <p className="">Startup Preference</p>
                        </div>

                        <div className="numbers only">
                            <div className="number">3</div>
                            <p className="">More About You</p>
                        </div>

                    </div>

                    <div className="col-lg-9 col-12">
                        <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                            <div className="numbers d-md-none num-alone">
                                <div className="number">3</div>
                                <p>More About You</p>
                            </div>

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

                            <select name="investment_stage_id"
                                    className="mb-0"
                                    defaultValue={hasInterests() ? investor.interests.investment_stage_id : ''}
                                    ref={register({required: 'This field is required'})}>
                                <option value="">What stage of company do you invest in?</option>
                                {stages.map(({stage, id}) => <option key={id} value={id}>{stage}</option>)}
                            </select>
                            {errors.investment_stage_id && <ErrorSpan>{errors.investment_stage_id.message}</ErrorSpan>}

                            <select name="covid_impact"
                                    className="covid-impact"
                                    defaultValue={hasInterests() ? investor.interests.covid_impact : ''} ref={register}>
                                <option value="">How do you see COVID-19 pandemic impacting your investment decision
                                    making?
                                </option>
                                <option value="negative">Negative</option>
                                <option value="positive">Positive</option>
                                <option value="no impact at all">No impact at all</option>
                            </select>

                            <select name="investor_objective"
                                    defaultValue={hasInterests() ? investor.interests.investor_objective : ''}
                                    ref={register}>
                                <option value="">Investor’s objective when meeting a startup</option>
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

                            <select name="decision_time"
                                    defaultValue={hasInterests() ? investor.interests.decision_time : ''}
                                    ref={register}>
                                <option value="">How long does it typically take to come to a decision to invest from
                                    the first meeting?
                                </option>
                                <option value="< 1 Month">&lt; 1 Month</option>
                                <option value="1 - 3 Months">1 - 3 Months</option>
                                <option value="3 - 6 Months">3 - 6 Months</option>
                                <option value="> 6 Months">&gt; 6 Months</option>
                            </select>

                            <select name="critical_decision_factor"
                                    defaultValue={hasInterests() ? investor.interests.critical_decision_factor : ''}
                                    ref={register}>
                                <option value="">What factor do you consider the most critical during investment
                                    decision making?
                                </option>
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

                            <select name="dealflow_channel"
                                    defaultValue={hasInterests() ? investor.interests.dealflow_channel : ''}
                                    ref={register}>
                                <option value="">What channels are you using for your dealflow now, with social
                                    distancing?
                                </option>
                                <option value="Online events & demo days">Online events & demo days</option>
                                <option value="Crunchbase">Crunchbase</option>
                                <option value="Linkedin">Linkedin</option>
                                <option value="Referrals">Referrals</option>
                                <option value="Investor network">Investor network</option>
                                <option value="Business Angel networks like ABAN">Business Angel networks like ABAN
                                </option>
                                <option value="Existing channels">Existing channels</option>
                            </select>

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

                            <p>I am interested in startups where:</p>
                            <div className="investor-levels">
                                <input ref={register} type="radio" name="startup_level" id="level-1" value="1"
                                       defaultChecked={hasInterests() && investor.interests.startup_level === '1'}/>
                                <label htmlFor="level-1" className="radio-label">
                                    <span className="input-label">Level 1</span>
                                    <p>The entrepreneurs are off to a great start. The founding team has been
                                        established, and whether or not they have a product prototype or a business
                                        model, they’ve identified an important problem to solve.</p>
                                </label>

                                <input ref={register} type="radio" name="startup_level" id="level-2" value="2"
                                       defaultChecked={hasInterests() && investor.interests.startup_level === '2'}/>
                                <label htmlFor="level-2" className="radio-label">
                                    <span className="input-label">Level 2</span>
                                    <p>The founding team has crafted a vision for how they’ll solve the problem they’re
                                        tackling. Next investors will expect to see validation that the value
                                        proposition is truly valuable to potential customers.</p>
                                </label>

                                <input ref={register} type="radio" name="startup_level" id="level-3" value="3"
                                       defaultChecked={hasInterests() && investor.interests.startup_level === '3'}/>
                                <label htmlFor="level-3" className="radio-label">
                                    <span className="input-label">Level 3</span>
                                    <p>They’re starting to prove that they’re onto something. They have initial
                                        validation that their solution is valuable. They have begun testing their
                                        pricing with early prototypes and the data shows that customers will pay a price
                                        that could sustain the business.</p>
                                </label>

                                <input ref={register} type="radio" name="startup_level" id="level-4" value="4"
                                       defaultChecked={hasInterests() && investor.interests.startup_level === '4'}/>
                                <label htmlFor="level-4" className="radio-label">
                                    <span className="input-label">Level 4</span>
                                    <p>It’s clear they’ve found an opportunity. Reliable public or third-party data
                                        provides strong evidence that the total addressable market is over $1 billion
                                        and they’re well positioned to enter the market. Next investors will want to see
                                        evidence that they can build a profitable business within this market.</p>
                                </label>

                                <input ref={register} type="radio" name="startup_level" id="level-5" value="5"
                                       defaultChecked={hasInterests() && investor.interests.startup_level === '5'}/>
                                <label htmlFor="level-5" className="radio-label">
                                    <span className="input-label">Level 5</span>
                                    <p>They’ve reached a major inflection point. They have paying customers, are
                                        lowering acquisition costs, and the data indicate they can reach positive unit
                                        economics. Next investors will want to see the business succeeding with
                                        customers beyond early adopters.</p>
                                </label>

                                <input ref={register} type="radio" name="startup_level" id="level-6" value="6"
                                       defaultChecked={hasInterests() && investor.interests.startup_level === '6'}/>
                                <label htmlFor="level-6" className="radio-label">
                                    <span className="input-label">Level 6</span>
                                    <p>They’ve accomplished a critical step. They’re demonstrating that average
                                        customers beyond early adopters are finding value in your product. Next
                                        investors will want to see product-market fit, namely that unit economics are
                                        positive with a healthy margin among average customers.</p>
                                </label>

                                <input ref={register} value={7} type="radio" name="startup_level" value="7"
                                       id="level-7"
                                       defaultChecked={hasInterests() && investor.interests.startup_level === '7'}/>
                                <label htmlFor="level-7" className="radio-label">
                                    <span className="input-label">Level 7</span>
                                    <p>This is perhaps the hardest level to achieve, and they’ve done it. They’ve proven
                                        that they can make a profit from each customer and now just need to scale up the
                                        business. Next investors will be looking to see how rapidly they scale sales and
                                        manage the growing pains of a burgeoning organization.</p>
                                </label>

                                <input ref={register} type="radio" name="startup_level" id="level-8" value="8"
                                       defaultChecked={hasInterests() && investor.interests.startup_level === '8'}/>
                                <label htmlFor="level-8" className="radio-label">
                                    <span className="input-label">Level 8</span>
                                    <p>They’re scaling rapidly and have found the formula for success. The value
                                        proposition, product, and business model are all validated. They’re focusing on
                                        sales, growth, and managing the team as it too scales in new and challenging
                                        ways. Now that they’ve proven it’s a great business most early investors will be
                                        looking for liquidity next.</p>
                                </label>

                                <input ref={register} type="radio" name="startup_level" id="level-9" value="9"
                                       defaultChecked={hasInterests() && investor.interests.startup_level === '9'}/>
                                <label htmlFor="level-9" className="radio-label">
                                    <span className="input-label">Level 9</span>
                                    <p>They’ve achieved a rare and impressive feat. They’ve acquired substantial market
                                        share and are recognized as a leader in the industry. The team is lining up an
                                        exit for investors, and a new source of capital if they need it. They are in the
                                        midst of serious negotiations and should be signing a deal relatively soon.</p>
                                </label>
                            </div>

                            <div className="d-flex">
                                <button className="btn btn-sm btn-profile mr-2"
                                        onClick={() => dispatch(decrementCurrentState())} type="button">Previous
                                </button>
                                <button className="btn btn-sm btn-profile ml-2" type="submit">Save & Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <style jsx>{`
            .covid-impact {
                margin-top: 4rem;
             }
        `}</style>
    </>
}

export default InvestorMoreInfo;