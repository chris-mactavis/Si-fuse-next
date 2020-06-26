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

const Level6 = ({startup}) => {
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
        dispatch(loader());
        try {
            await axiosInstance.post('startups/level', {business_model: JSON.stringify(data.business_model)}, {
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
            <div className="row bg-white startup-levels-row">
                <div className="col-md-12 mx-auto">
                    <LevelHeader/>

                    <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                        <div className="row">
                            <div className="col-md-8">

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="business_model" defaultChecked={businessModel().includes('BM1')}
                                           value="BM1::We know our total addressable market size and target market share."/>
                                    <span className="checkout-custom"/>
                                    We know our total addressable market size and target market share.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="business_model" defaultChecked={businessModel().includes('BM2')}
                                           value="BM2::We understand applicable regulations & have a strategy for compliance."/>
                                    <span className="checkout-custom"/>
                                    We understand applicable regulations & have a strategy for compliance.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="business_model" defaultChecked={businessModel().includes('BM3')}
                                           value="BM3::Initial sales provide evidence that we can capture our target market."/>
                                    <span className="checkout-custom"/>
                                    Initial sales provide evidence that we can capture our target market.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="business_model" defaultChecked={businessModel().includes('BM4')}
                                           value="BM4::We have evidence that our total addressable market is over $1B."/>
                                    <span className="checkout-custom"/>
                                    We have evidence that our total addressable market is over $1B.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="business_model" defaultChecked={businessModel().includes('BM5')}
                                           value="BM5::Large partners are talking with us about distribution, marketing, etc."/>
                                    <span className="checkout-custom"/>
                                    Large partners are talking with us about distribution, marketing, etc.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="business_model" defaultChecked={businessModel().includes('BM6')}
                                           value="BM6::Our suppliers & distributors see meaningful benefits from our success."/>
                                    <span className="checkout-custom"/>
                                    Our suppliers & distributors see meaningful benefits from our success.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="business_model" defaultChecked={businessModel().includes('BM7')}
                                           value="BM7::Our sales cycle meets or beats the industry standard."/>
                                    <span className="checkout-custom"/>
                                    Our sales cycle meets or beats the industry standard.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="business_model" defaultChecked={businessModel().includes('BM8')}
                                           value="BM8::We have hard-to-beat partnerships for distribution, marketing, growth."/>
                                    <span className="checkout-custom"/>
                                    We have hard-to-beat partnerships for distribution, marketing, growth.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="business_model" defaultChecked={businessModel().includes('BM9')}
                                           value="BM9::We have a clear line of sight to industry dominance."/>
                                    <span className="checkout-custom"/>
                                    We have a clear line of sight to industry dominance.
                                </label>
                            </div>

                            <div className="col-md-4">
                                <InfoBox heading="Business Model" text="How much evidence do you have that a large market of customers experiences this problem?"/>
                            </div>
                        </div>

                        <LevelButtonsComponent nextHandler={handleSubmit(nextPageHandler)} />
                    </form>
                </div>
            </div>
        </div>
    </section>;
}

export default Level6;