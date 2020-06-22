import {useForm} from "react-hook-form";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import Router from "next/router";
import Cookies from "js-cookie";

const InvestorPreference = ({investor, stages, industries}) => {
    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const onSubmitHandler = async data => {
        data['industry_ids'] = data.industries.filter(industry => !!industry);
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
            // dispatch(resetCurrentState());
            Router.push('/');
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
        <section className="profile single-post">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="numbers">
                            <div className="number fade">1</div>
                            <p className="fade">Basic information</p>
                        </div>

                        <div className="numbers only">
                            <div className="number">2</div>
                            <p className="">Startup Preference</p>
                        </div>

                    </div>

                    <div className="col-lg-9 col-12">
                        <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                            <div className="numbers d-md-none num-alone">
                                <div className="number">2</div>
                                <p>Your company</p>
                            </div>

                            <label>Preferred Startup</label>

                            <label className="industry-label">By Industry</label>
                            <div className="d-flex flex-wrap mb-4">
                                {
                                    industries.map(
                                        ({industry, id}, i) => <label className="checkout-label" key={id}>
                                            <input type="checkbox" name={`industries[${id}]`} id={id} value={id}
                                                   ref={register}/>
                                            <span className="checkout-custom"/>
                                            {industry}
                                        </label>
                                    )
                                }
                            </div>

                            <select name="investor_type" defaultValue={hasInterests() ? investor.interests.investor_type : ''} ref={register}>
                                <option value="">By Investor Type</option>
                                <option value="Any">Any</option>
                                <option value="Venture Capital">Venture Capital</option>
                                <option value="Angel Investor">Angel Investor</option>
                                <option value="Private Equity">Private Equity</option>
                                <option value="Financial Institute">Financial Institute</option>
                                <option value="Crowd Funding">Crowd Funding</option>
                            </select>

                            <select name="geographical_focus" defaultValue={hasInterests() ? investor.interests.geographical_focus : ''} ref={register}>
                                <option value="">By Geographical Focus</option>
                                <option value="North Africa">North Africa</option>
                                <option value="East Africa">East Africa</option>
                                <option value="South Africa">South Africa</option>
                                <option value="West Africa">West Africa</option>
                                <option value="Central Africa">Central Africa</option>
                            </select>

                            <select name="investment_range" defaultValue={hasInterests() ? investor.interests.investment_range : ''} ref={register}>
                                <option value="">By Investment Range</option>
                                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                                <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                                <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                                <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                                <option value="$250,000 - $1,000,000">$250,000 - $1,000,000</option>
                                <option value="$1,000,000 - $2,000,000">$1,000,000 - $2,000,000</option>
                                <option value="$2,000,000 and above">$2,000,000 and above</option>
                            </select>


                            <select name="investment_stage_id" defaultValue={hasInterests() ? investor.interests.investment_stage_id : ''} ref={register}>
                                <option value="">By Funding Stage</option>
                                {stages.map(({stage, id}) => <option key={id} value={id}>{stage}</option>)}

                            </select>

                            <select name="investment_type" defaultValue={hasInterests() ? investor.interests.investment_type : ''} ref={register}>
                                <option value="">By Investment Type</option>
                                <option value="Equity">Equity</option>
                                <option value="Safe">Safe</option>
                                <option value="Debt Financing">Debt Financing</option>
                                <option value="Convertible Notes">Convertible Notes</option>
                                <option value="Grants">Grants</option>
                            </select>

                            <button className="btn btn-profile" type="submit">Save & Next</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <style jsx>{`
            .input-group-container {
                display: flex;
                flex-direction: column;
                margin-bottom: 0;
            }
            input, select, textarea {
                margin-bottom: 0!important;
                margin-top: 4rem;
            }
            .btn {
                margin-top: 4rem;
            }
            input.country-code {
                width: 90%;
            }
            .industry-label, about-label {
                margin-top: 4rem;
            }
            .profile-pic {
                cursor:pointer;
                width: 300px;
            }
        `}</style>
    </>

}

export default InvestorPreference;