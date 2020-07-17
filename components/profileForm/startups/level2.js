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
            await axiosInstance.post('startups/level', {vision: JSON.stringify(data.vision), profile_stage: 3}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            })
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
                                         text="First, we would like to know more about the team you are building."/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V1')}
                                               value="V1::We have a hypothesis for how we will solve this problem."/>
                                        <span className="checkout-custom"/>
                                        We have a hypothesis for how we will solve this problem.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V2')}
                                               value="V2::Potential customers validate that our solution will solve a key point."/>
                                        <span className="checkout-custom"/>
                                        Potential customers validate that our solution will solve a key point.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V3')}
                                               value="V3::We have evidence that customers will pay our target price."/>
                                        <span className="checkout-custom"/>
                                        We have evidence that customers will pay our target price.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V4')}
                                               value="V4::Customer feedback shows that our solution is better than others."/>
                                        <span className="checkout-custom"/>
                                        Customer feedback shows that our solution is better than others.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V5')}
                                               value="V5::Our initial target customers love the product and keep using it."/>
                                        <span className="checkout-custom"/>
                                        Our initial target customers love the product and keep using it.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V6')}
                                               value="V6::We’re selling beyond our initial target customers."/>
                                        <span className="checkout-custom"/>
                                        We’re selling beyond our initial target customers.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V7')}
                                               value="V7::The majority of our sales in our initial market are inbound."/>
                                        <span className="checkout-custom"/>
                                        The majority of our sales in our initial market are inbound.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V8')}
                                               value="V8::Customers are renewing or repurchasing without much sales effort."/>
                                        <span className="checkout-custom"/>
                                        Customers are renewing or repurchasing without much sales effort.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="vision"
                                               defaultChecked={vision().includes('V9')}
                                               value="V9::We’re recognized as the top solution to this problem."/>
                                        <span className="checkout-custom"/>
                                        We’re recognized as the top solution to this problem.
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