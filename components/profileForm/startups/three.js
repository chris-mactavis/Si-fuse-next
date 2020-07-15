import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";
import {error} from "next/dist/build/output/log";
import ErrorSpan from "../../UI/ErrorSpan";

export default function ProfileThree({startup}) {
    const dispatch = useDispatch();

    const hasFinance = () => startup.hasOwnProperty('finance') && startup.finance;

    const {register, handleSubmit, errors} = useForm();
    const onSubmitHandler = async data => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/finance', data, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(loader());
            dispatch(incrementCurrentState());
        } catch (e) {
            console.log(e);
            dispatch(loader());
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <>
        <section className="profile profile-2 single-post">
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-3">
                        <div className="numbers">
                            <div className="number">1</div>
                            <p>Basic information</p>
                        </div>

                        <div className="numbers only">
                            <div className="number">2</div>
                            <p className="">Your company</p>
                        </div>

                        <div className="numbers">
                            <div className="number">3</div>
                            <p className="">Product and Services</p>
                        </div>

                        <div className="numbers only">
                            <div className="number">4</div>
                            <p className="">Finance</p>
                        </div>

                        <div className="numbers">
                            <div className="number fade">5</div>
                            <p className="fade">Marketing</p>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                            <div className="numbers d-md-none num-alone">
                                <div className="number">4</div>
                                <p>Finance</p>
                            </div>

                            <select name="revenue_type" ref={register({required: 'This field is required'})}
                                    className="mb-0"
                                    defaultValue={hasFinance() ? startup.finance.revenue_type : ''}>
                                <option value="">Company is currently</option>
                                <option value="Post revenue">Post Revenue</option>
                                <option value="Pre revenue">Pre Revenue</option>
                            </select>
                            {errors.revenue_type && <ErrorSpan>{errors.revenue_type.message}</ErrorSpan>}

                            <select name="capital_needed_for" ref={register} className="capital-select"
                                    defaultValue={hasFinance() ? startup.finance.capital_needed_for : ''}>
                                <option value="">Capital Needed for</option>
                                <option value="Proof of concept">Proof of concept</option>
                                <option value="Working capital">Working capital</option>
                                <option value="Growth capital">Growth capital</option>
                                <option value="Bridging Capital">Bridging capital</option>
                            </select>

                            <select name="business_size" ref={register}
                                    defaultValue={hasFinance() ? startup.finance.business_size : ''}>
                                <option value="">Current size of business relative to amount of capital needed.</option>
                                <option value="less than capital needed">Current business worth less than capital needed
                                </option>
                                <option value="more">Current business worth more than capital needed</option>
                                <option value="cannot value">No way to value current business worth</option>
                            </select>

                            <select name="growth_projection" ref={register}
                                    defaultValue={hasFinance() ? startup.finance.growth_projection : ''}>
                                <option value="">Growth Projection</option>
                                <option value="Exponential (J-Growth)">Exponential (J-Growth)</option>
                                <option value="High Growth">High Growth</option>
                                <option value="Stable Growth">Stable Growth</option>
                                <option value="No Growth Expected">No Growth Expected</option>
                            </select>

                            <div className="currency-input">
                                <input ref={register}
                                       defaultValue={hasFinance() ? startup.finance.invested_funding : ''}
                                       className="full-width" type="text" name="invested_funding" id=""
                                       placeholder="How Much has been invested till date? "/>
                            </div>

                            <div className="currency-input">
                                <input ref={register} className="full-width" type="text" name="funding_needed" id=""
                                       defaultValue={hasFinance() ? startup.finance.funding_needed : ''}
                                       placeholder="What is your ask?"/>
                            </div>

                            <select name="funding_stage" ref={register}
                                    defaultValue={hasFinance() ? startup.finance.funding_stage : ''}>
                                <option value="">What funding are you around currently?</option>
                                <option value="Ideation">Ideation</option>
                                <option value="Seed stage">Seed stage</option>
                                <option value="Early stage">Early stage</option>
                                <option value="Late stage">Late stage</option>
                            </select>

                            <select name="investment_ask" ref={register}
                                    defaultValue={hasFinance() ? startup.finance.investment_ask : ''}>
                                <option value="">What is your company’s desired investment ask?</option>
                                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                                <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                                <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                                <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                                <option value="$250,000 - $1,000,000">$250,000 - $1,000,000</option>
                                <option value="$1,000,000 - $2,000,000">$1,000,000 - $2,000,000</option>
                                <option value="$2,000,000 and above">$2,000,000 and above</option>
                            </select>

                            <select name="geographical_focus" id="" ref={register}
                                    defaultValue={hasFinance() ? startup.finance.geographical_focus : ''}>
                                <option value="">Geographical focus</option>
                                <option value="North Africa">North Africa</option>
                                <option value="East Africa">East Africa</option>
                                <option value="South Africa">South Africa</option>
                                <option value="West Africa">West Africa</option>
                                <option value="Central Africa">Central Africa</option>
                            </select>

                            <select name="investor_type" id="" ref={register}
                                    defaultValue={hasFinance() ? startup.finance.investor_type : ''}>
                                <option value="">What type of Investor are you looking for?</option>
                                <option value="Any">Any</option>
                                <option value="Venture Capital">Venture Capital</option>
                                <option value="Angel Investor">Angel Investor</option>
                                <option value="Private Equity">Private Equity</option>
                                <option value="Financial Institute">Financial Institute</option>
                                <option value="Crowd Funding">Crowd Funding</option>
                            </select>

                            <select name="interested_in_mentor" id="" ref={register}
                                    defaultValue={hasFinance() ? startup.finance.interested_in_mentor : ''}>
                                <option value="">Are you interested in a mentor?</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>

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
            .capital-select {
                margin-top: 4rem;
            }
        `}</style>
    </>
}