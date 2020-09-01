import React from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {incrementCurrentLevelState} from "../../../store/actions/profile";
import LevelButtonsComponent from "./LevelButtons";
import LevelHeader from "./LevelHeader";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {showNotifier} from "../../../store/actions/notifier";
import {setStartupData} from "../../../store/actions/startupProfile";

const Level2 = ({startup}) => {
    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const vision = () => {
        if (startup.level && startup.level.hasOwnProperty('vision')) {
            let prob = JSON.parse(startup.level.vision);
            if (prob && prob.length > 0) {
                return prob.map(p => p.split('::')[0])
            }
            return []
        }
        return [];
    }

    const nextPageHandler = async data => {
        if (data.vision.length === 0) {
            dispatch(showNotifier('Please choose at least one option', 'danger'));
            return;
        }
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/level', {vision: JSON.stringify(data.vision), profile_stage: 3}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            })
            dispatch(setStartupData(response.data));
            dispatch(loader());
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
                                <LevelHeader isLevel/>

                                <InfoBox heading="Vision & Value Proposition"
                                         text="What are the proof that your product is needed by target customers?"/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V1')}
                                               value="V1::Our team has developed a theory on how to address this industry need."/>
                                        <span className="checkout-custom"/>
                                        Our team has developed a theory on how to address this industry need.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V2')}
                                               value="V2::The rapid adoption of our creative solution by potential customers proves that we addressing a painpoint."/>
                                        <span className="checkout-custom"/>
                                        The rapid adoption of our creative solution by potential customers proves that we addressing a painpoint.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V3')}
                                               value="V3::Our team has proof that customers will pay a certain amount for our creative solution."/>
                                        <span className="checkout-custom"/>
                                        Our team has proof that customers will pay a certain amount for our creative solution.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V4')}
                                               value="V4::Our customer feedback indicates that our creative solution is way more preferable than others because of our superior offerings."/>
                                        <span className="checkout-custom"/>
                                        Our customer feedback indicates that our creative solution is way more preferable than others because of our superior offerings.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V5')}
                                               value="V5::Our creative solution is loved and still used by our early target consumers."/>
                                        <span className="checkout-custom"/>
                                        Our creative solution is loved and still used by our early target consumers.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V6')}
                                               value="V6::Our team have started making sales far beyond our preliminary target consumers. Which was expected!"/>
                                        <span className="checkout-custom"/>
                                        Our team have started making sales far beyond our preliminary target consumers. Which was expected!
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V7')}
                                               value="V7::A lot of the sales made in the early market were primarily from returning consumers."/>
                                        <span className="checkout-custom"/>
                                        A lot of the sales made in the early market were primarily from returning consumers.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V8')}
                                               value="V8::Customers are renewing or repurchasing without a good deal of marketing effort."/>
                                        <span className="checkout-custom"/>
                                        Customers are renewing or repurchasing without a good deal of marketing effort.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V9')}
                                               value="V9::Our creative solution is identified as a leading solution to this industry need."/>
                                        <span className="checkout-custom"/>
                                        Our creative solution is identified as a leading solution to this industry need.
                                    </label>

                                    <LevelButtonsComponent nextHandler={handleSubmit(nextPageHandler)}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}

export default Level2;