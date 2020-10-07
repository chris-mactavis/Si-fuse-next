import React, {useEffect, useState} from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {incrementCurrentLevelState} from "../../../store/actions/profile";
import {useDispatch, useSelector} from "react-redux";
import LevelHeader from "./LevelHeader";
import LevelButtonsComponent from "./LevelButtons";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {showNotifier} from "../../../store/actions/notifier";
import {setStartupData} from "../../../store/actions/startupProfile";
import Router from "next/router";

const Level1 = ({startup, isEditingLevel}) => {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const problem = () => {
        if (startup.level && startup.level.hasOwnProperty('problem')) {
            let prob = JSON.parse(startup.level.problem);
            if (prob && prob.length > 0) {
                return prob.map(p => p.split('::')[0])
            }
            return []
        }
        return [];
    }

    const nextPageHandler = async data => {
        if (data.problem.length === 0) {
            dispatch(showNotifier('Please choose at least one option', 'danger'));
            return;
        }
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/level', {problem: JSON.stringify(data.problem), profile_stage: 2}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(setStartupData(response.data));
            dispatch(loader());
            if (isEditingLevel) {
                Router.push('/profile');
                return;
            }
            dispatch(incrementCurrentLevelState());
        } catch (e) {
            console.log(e);
            dispatch(loader());
        }
    }

    return <section className="startup-levels">
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="white-bg">
                        <div className="row">
                            <div className="col-md-9 mx-auto">
                                {!isEditingLevel && <LevelHeader isLevel/>}

                                <InfoBox heading="Problem" text="We would like to know the industry need you're addressing"/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P1')}
                                               value="P1::Our team have recognized a specific, important, industry need that requires a solution."/>
                                        <span className="checkout-custom"/>
                                        Our team have recognized a specific, important, industry need that requires a solution.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P2')}
                                               value="P2::Our team have a creative solution that addresses this need with the capability to bring it to life."/>
                                        <span className="checkout-custom"/>
                                        Our team have a creative solution that addresses this need with the capability to bring it to life.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P3')}
                                               value="P3::Our team can eloquently outline the unique value proposition of our creative solution offers"/>
                                        <span className="checkout-custom"/>
                                        Our team can eloquently outline the unique value proposition of our creative solution offers.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P4')}
                                               value="P4::Our team is able to describe the importance of our creative solution in the transforming the industry."/>
                                        <span className="checkout-custom"/>
                                        Our team is able to describe the importance of our creative solution in the transforming the industry.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P5')}
                                               value="P5::Our team can show proof on how our customer's problems are being fixed by our creative solution."/>
                                        <span className="checkout-custom"/>
                                        Our team can show proof on how our customer's problems are being fixed by our creative solution.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P6')}
                                               value="P6::Industry early adopters have started usage of our creative solution and it rapidly being adopted."/>
                                        <span className="checkout-custom"/>
                                        Industry early adopters have started usage of our creative solution and it rapidly being adopted.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P7')}
                                               value="P7::There are evidence that shows our creative solution is being adopted in a large market."/>
                                        <span className="checkout-custom"/>
                                        There are evidence that shows our creative solution is being adopted in a large market.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P8')}
                                               value="P8::Our team is starting systems-wide changes that would aid to better address this industry need."/>
                                        <span className="checkout-custom"/>
                                        Our team is starting systems-wide changes that would aid to better address this industry need.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="problem"
                                               defaultChecked={problem().includes('P9')}
                                               value="P9::We are considered a global leader because of our creative solution."/>
                                        <span className="checkout-custom"/>
                                        We are considered a global leader because of our creative solution.
                                    </label>

                                    <LevelButtonsComponent noPrev nextHandler={handleSubmit(nextPageHandler)}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}

export default Level1;