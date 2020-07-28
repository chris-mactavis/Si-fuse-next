import React from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import LevelButtonsComponent from "./LevelButtons";
import LevelHeader from "./LevelHeader";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {showNotifier} from "../../../store/actions/notifier";
import {incrementCurrentLevelState} from "../../../store/actions/profile";

const Level7 = ({startup}) => {
    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const scale = () => {
        if (startup.level && startup.level.hasOwnProperty('scale')) {
            let prob = JSON.parse(startup.level.scale);
            if (prob && prob.length > 0) {
                return prob.map(p => p.split('::')[0])
            }
            return []
        }
        return [];
    }

    const nextPageHandler = async data => {
        if (data.scale.length === 0) {
            dispatch(showNotifier('Please choose at least one option', 'danger'));
            return;
        }
        dispatch(loader());
        try {
            await axiosInstance.post('startups/level', {scale: JSON.stringify(data.scale), profile_stage: 8}, {
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

                                <InfoBox heading="Scale" text="What scale are you operating at?"/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S1')}
                                               value="S1::We’ve identified multiple possible markets or customer segments."/>
                                        <span className="checkout-custom"/>
                                        We’ve identified multiple possible markets or customer segments.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S2')}
                                               value="S2::We have evidence that multiple markets experience this problem."/>
                                        <span className="checkout-custom"/>
                                        We have evidence that multiple markets experience this problem.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S3')}
                                               value="S3::We have a clear strategy to scale to multiple markets."/>
                                        <span className="checkout-custom"/>
                                        We have a clear strategy to scale to multiple markets.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S4')}
                                               value="S4::Customers in multiple markets find value in our solution."/>
                                        <span className="checkout-custom"/>
                                        Customers in multiple markets find value in our solution.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S5')}
                                               value="S5::Our unit economics are tipping to positive in at least two markets."/>
                                        <span className="checkout-custom"/>
                                        Our unit economics are tipping to positive in at least two markets.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S6')}
                                               value="S6::We’ve cleared regulatory challenges and have a clear IP strategy."/>
                                        <span className="checkout-custom"/>
                                        We’ve cleared regulatory challenges and have a clear IP strategy.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S7')}
                                               value="S7::Our unit economics are positive in multiple markets."/>
                                        <span className="checkout-custom"/>
                                        Our unit economics are positive in multiple markets.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S8')}
                                               value="S8::Growth in our customer base is accelerating month-on-month"/>
                                        <span className="checkout-custom"/>
                                        Growth in our customer base is accelerating month-on-month
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="scale"
                                               defaultChecked={scale().includes('S9')}
                                               value="S9::Unit economics are strong for multiple markets or customer segments."/>
                                        <span className="checkout-custom"/>
                                        Unit economics are strong for multiple markets or customer segments.
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

export default Level7;