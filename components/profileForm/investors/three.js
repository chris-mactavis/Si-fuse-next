import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {loader} from "../../../store/actions/loader";
import Router from "next/router";
import Cookies from "js-cookie";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {decrementCurrentState} from "../../../store/actions/profile";
import ErrorSpan from "../../UI/ErrorSpan";
import {showNotifier} from "../../../store/actions/notifier";
import InvestorProfileHeader from "./InvestorProfileHeader";

const InvestorMoreInfo = ({investor, stages}) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, errors} = useForm();

    const onSubmitHandler = async data => {
        dispatch(loader());
        try {
            await axiosInstance.post('investors/interest-level', data, {
                headers: {
                    Authorization: `Bearer ${Token()}`,
                    'Content-Type': 'application/json'
                }
            });
            dispatch(loader());
            dispatch(showNotifier('Signup Complete'));
            let user = JSON.parse(Cookies.get('user'));
            user.has_profile = 1;
            Cookies.set('user', JSON.stringify(user));
            Router.push('/timeline');
        } catch (e) {
            dispatch(loader());
            console.log(e);
        }
    }

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
                                        <h4 className="text-center mb-3">Startup Preference</h4>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                                        <div className="investor-levels">
                                            <input ref={register} type="radio" name="startup_level" id="level-1" value="1"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '1'}/>
                                            <label htmlFor="level-1" className="radio-label">
                                                <span className="input-label">Level 1</span>
                                                <p>The entrepreneurs are off to a great start. The founding team has been
                                                    established, and whether or not they have a product prototype or a
                                                    business
                                                    model, they’ve identified an important problem to solve.</p>
                                            </label>

                                            <input ref={register} type="radio" name="startup_level" id="level-2" value="2"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '2'}/>
                                            <label htmlFor="level-2" className="radio-label">
                                                <span className="input-label">Level 2</span>
                                                <p>The founding team has crafted a vision for how they’ll solve the problem
                                                    they’re
                                                    tackling. Next investors will expect to see validation that the value
                                                    proposition is truly valuable to potential customers.</p>
                                            </label>

                                            <input ref={register} type="radio" name="startup_level" id="level-3" value="3"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '3'}/>
                                            <label htmlFor="level-3" className="radio-label">
                                                <span className="input-label">Level 3</span>
                                                <p>They’re starting to prove that they’re onto something. They have initial
                                                    validation that their solution is valuable. They have begun testing
                                                    their
                                                    pricing with early prototypes and the data shows that customers will pay
                                                    a price
                                                    that could sustain the business.</p>
                                            </label>

                                            <input ref={register} type="radio" name="startup_level" id="level-4" value="4"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '4'}/>
                                            <label htmlFor="level-4" className="radio-label">
                                                <span className="input-label">Level 4</span>
                                                <p>It’s clear they’ve found an opportunity. Reliable public or third-party
                                                    data provides strong evidence that the total addressable market is over $10 million
                                                    and they’re well positioned to enter the market. Next investors will
                                                    want to see evidence that they can build a profitable business within this
                                                    market.
                                                </p>
                                            </label>

                                            <input ref={register} type="radio" name="startup_level" id="level-5" value="5"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '5'}/>
                                            <label htmlFor="level-5" className="radio-label">
                                                <span className="input-label">Level 5</span>
                                                <p>They’ve reached a major inflection point. They have paying customers, are
                                                    lowering acquisition costs, and the data indicate they can reach
                                                    positive unit
                                                    economics. Next investors will want to see the business succeeding with
                                                    customers beyond early adopters.</p>
                                            </label>

                                            <input ref={register} type="radio" name="startup_level" id="level-6" value="6"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '6'}/>
                                            <label htmlFor="level-6" className="radio-label">
                                                <span className="input-label">Level 6</span>
                                                <p>They’ve accomplished a critical step. They’re demonstrating that average
                                                    customers beyond early adopters are finding value in your product. Next
                                                    investors will want to see product-market fit, namely that unit
                                                    economics are
                                                    positive with a healthy margin among average customers.</p>
                                            </label>

                                            <input ref={register} value={7} type="radio" name="startup_level" value="7"
                                                   id="level-7"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '7'}/>
                                            <label htmlFor="level-7" className="radio-label">
                                                <span className="input-label">Level 7</span>
                                                <p>This is perhaps the hardest level to achieve, and they’ve done it.
                                                    They’ve proven
                                                    that they can make a profit from each customer and now just need to
                                                    scale up the
                                                    business. Next investors will be looking to see how rapidly they scale
                                                    sales and
                                                    manage the growing pains of a burgeoning organization.</p>
                                            </label>

                                            <input ref={register} type="radio" name="startup_level" id="level-8" value="8"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '8'}/>
                                            <label htmlFor="level-8" className="radio-label">
                                                <span className="input-label">Level 8</span>
                                                <p>They’re scaling rapidly and have found the formula for success. The value
                                                    proposition, product, and business model are all validated. They’re
                                                    focusing on
                                                    sales, growth, and managing the team as it too scales in new and
                                                    challenging
                                                    ways. Now that they’ve proven it’s a great business most early investors
                                                    will be
                                                    looking for liquidity next.</p>
                                            </label>

                                            <input ref={register} type="radio" name="startup_level" id="level-9" value="9"
                                                   defaultChecked={hasInterests() && investor.interests.startup_level === '9'}/>
                                            <label htmlFor="level-9" className="radio-label">
                                                <span className="input-label">Level 9</span>
                                                <p>They’ve achieved a rare and impressive feat. They’ve acquired substantial
                                                    market
                                                    share and are recognized as a leader in the industry. The team is lining
                                                    up an
                                                    exit for investors, and a new source of capital if they need it. They
                                                    are in the
                                                    midst of serious negotiations and should be signing a deal relatively
                                                    soon.</p>
                                            </label>
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
            .covid-impact {
                margin-top: 4rem;
             }
        `}</style>
    </>
}

export default InvestorMoreInfo;