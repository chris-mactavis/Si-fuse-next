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

    return <section className="profile profile-2 single-post">
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
                        <div className="number">5</div>
                        <p className="">Marketing</p>
                    </div>
                </div>

                <div className="col-md-9">
                    <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                        <div className="numbers d-md-none num-alone">
                            <div className="number">5</div>
                            <p>Marketing</p>
                        </div>
                        <label>What is your addressable Market?</label>
                        <textarea ref={register} defaultValue={hasMarketing() ? startup.market.addressable_market : ''} className="full-width" name="addressable_market" id="" cols="30" rows="5"/>

                        <label>What percentage of Market do you intend to get over time?</label>
                        <input type="number" ref={register} defaultValue={hasMarketing() ? startup.market.percentage_of_market : ''} className="full-width" name="percentage_of_market"/>

                        <label>Marketing Strategy</label>
                        <textarea ref={register} defaultValue={hasMarketing() ? startup.market.marketing_strategy : ''} className="full-width" name="marketing_strategy" id="" cols="30" rows="5"/>

                        <label>Competition</label>
                        <textarea ref={register} defaultValue={hasMarketing() ? startup.market.company_competitors : ''} className="full-width" name="company_competitors" id="" cols="30" rows="5"/>

                        <label>What gives you competitive advantage?</label>
                        <textarea ref={register} defaultValue={hasMarketing() ? startup.market.competitive_advantage : ''} className="full-width" name="competitive_advantage" id="" cols="30" rows="5"/>

                        <div className="d-flex flex-column flex-md-row">
                            <button className="btn btn-sm btn-profile mr-md-2 mb-3 mb-md-0"
                                    onClick={() => dispatch(decrementCurrentState())} type="button">Previous
                            </button>
                            <button className="btn btn-sm btn-profile ml-md-2" type="submit">Save & Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
}