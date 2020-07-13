import React from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";
import LevelButtonsComponent from "./LevelButtons";
import LevelHeader from "./LevelHeader";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {showNotifier} from "../../../store/actions/notifier";

const Level5 = ({startup}) => {
    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const businessModel = () => {
        if (startup.level && startup.level.hasOwnProperty('business_model')) {
            let prob = JSON.parse(startup.level.business_model);
            if (prob && prob.length > 0) {
                return prob.map(p => p.split('::')[0])
            }
            return []
        }
        return [];
    }

    const nextPageHandler = async data => {
        if (data.business_model.length === 0) {
            dispatch(showNotifier('Please choose at least one option', 'danger'));
            return;
        }
        dispatch(loader());
        try {
            await axiosInstance.post('startups/level', {business_model: JSON.stringify(data.business_model), profile_stage: 6}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            })
            dispatch(loader());
            dispatch(incrementCurrentState());
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
                                <LevelHeader/>

                                <InfoBox heading="Business Model" text="How much evidence do you have that your business model will work?"/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM1')}
                                               value="BM1::We have an outline of a revenue model."/>
                                        <span className="checkout-custom"/>
                                        We have an outline of a revenue model.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM2')}
                                               value="BM2::Existing pricing and business models support our revenue model."/>
                                        <span className="checkout-custom"/>
                                        Existing pricing and business models support our revenue model.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM3')}
                                               value="BM3::We can articulate the cost structure & unit economics in our industry."/>
                                        <span className="checkout-custom"/>
                                        We can articulate the cost structure & unit economics in our industry.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM4')}
                                               value="BM4::We have projected revenues and costs and have a strategy to hit them."/>
                                        <span className="checkout-custom"/>
                                        We have projected revenues and costs and have a strategy to hit them.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM5')}
                                               value="BM5::5. Our actual revenues & costs support future positive unit economics."/>
                                        <span className="checkout-custom"/>
                                        Our actual revenues & costs support future positive unit economics.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM6')}
                                               value="BM6::Our customer acquisition costs are going down & pricing is going up."/>
                                        <span className="checkout-custom"/>
                                        Our customer acquisition costs are going down & pricing is going up.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM7')}
                                               value="BM7::We've validated our business model. We have strong unit economics."/>
                                        <span className="checkout-custom"/>
                                        We've validated our business model. We have strong unit economics.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM8')}
                                               value="BM8::We're rapidly growing each month and we've got a path to profitability."/>
                                        <span className="checkout-custom"/>
                                        We're rapidly growing each month and we've got a path to profitability.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="business_model"
                                               defaultChecked={businessModel().includes('BM9')}
                                               value="BM9::Our revenue has met or exceeded investors' targets for multiple years."/>
                                        <span className="checkout-custom"/>
                                        Our revenue has met or exceeded investors' targets for multiple years.
                                    </label>

                                    <LevelButtonsComponent nextHandler={handleSubmit(nextPageHandler)}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
;
}

export default Level5;