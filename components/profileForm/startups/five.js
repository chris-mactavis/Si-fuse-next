import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import Router from "next/router";
import Cookies from 'js-cookie';
import {decrementCurrentState, resetCurrentState} from "../../../store/actions/profile";
import {showNotifier} from "../../../store/actions/notifier";
import StartupProfileHeader from "./StartupProfileHeader";

export default function ProfileFive({startup}) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const dispatch = useDispatch();

    const {register, handleSubmit} = useForm();

    const hasMarketing = () => startup.hasOwnProperty('market') && startup.market;

    const onSubmitHandler = async data => {
        dispatch(loader());
        try {
            await axiosInstance.post('startups/market', data, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(loader());
            dispatch(showNotifier('Signup Complete'));
            let user = JSON.parse(Cookies.get('user'));
            user.has_profile = 1;
            Cookies.set('user', JSON.stringify(user));
            // dispatch(resetCurrentState());
            Router.push('/');
        } catch (e) {
            console.log(e);
            dispatch(loader());
        }
    }

    return <>
        <section className="startup-levels">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    <StartupProfileHeader />

                                    <div className="numbers d-md-none num-alone">
                                        <div className="number">5</div>
                                        <p>Marketing</p>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                                        <div className="row">
                                            <div className="col-md-4 text-center">
                                                // Logo uploaded <br/>
                                                <img className="img-fluid " src="/images/mactavis-logo.png" alt=""/>
                                                // Company name
                                            </div>

                                            <div className="col-md-8">
                                                <div className="input-group-container">
                                                    <textarea ref={register} placeholder="What is your addressable market?"
                                                          defaultValue={hasMarketing() ? startup.market.addressable_market : ''}
                                                          className="full-width" name="addressable_market" id="" rows="4"/>
                                                </div>

                                                <div className="input-group-container">
                                                    <input type="number" ref={register} placeholder="What is your target market percentage?"
                                                           defaultValue={hasMarketing() ? startup.market.percentage_of_market : ''}
                                                           className="full-width" name="percentage_of_market"/>
                                                </div>

                                                <div className="input-group-container">
                                                    <textarea ref={register} placeholder="Marketing strategy"
                                                          defaultValue={hasMarketing() ? startup.market.marketing_strategy : ''}
                                                          className="full-width" name="marketing_strategy" id="" rows="4"/>
                                                </div>

                                                <div className="input-group-container">
                                                    <textarea ref={register} placeholder="Who are your competitors?"
                                                          defaultValue={hasMarketing() ? startup.market.company_competitors : ''}
                                                          className="full-width" name="company_competitors" id="" rows="4"/>
                                                </div>

                                                <div className="input-group-container">
                                                <textarea ref={register} placeholder="What gives you competitive advantage?"
                                                          defaultValue={hasMarketing() ? startup.market.competitive_advantage : ''}
                                                          className="full-width" name="competitive_advantage" id="" rows="4"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <button className="btn prev mr-auto" onClick={() => dispatch(decrementCurrentState())} type="button">
                                                <span/> Previous
                                            </button>

                                            <button className="btn next ml-auto" type="submit">
                                                Save & Next <span/>
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
    </>
}