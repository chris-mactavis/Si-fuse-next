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

    const market = () => {
        if (startup.level && startup.level.hasOwnProperty('market')) {
            let prob = JSON.parse(startup.level.market);
            if (prob && prob.length > 0) {
                return prob.map(p => p.split('::')[0])
            }
            return []
        }
        return [];
    }

    const nextPageHandler = async data => {
        if (data.market.length === 0) {
            dispatch(showNotifier('Please choose at least one option', 'danger'));
            return;
        }
        dispatch(loader());
        try {
            await axiosInstance.post('startups/level', {market: JSON.stringify(data.market)}, {
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

                                <InfoBox heading="Market" text="How much evidence do you have that a large market of customers experiences this problem?"/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M1')}
                                               value="M1::We know our total addressable market size and target market share."/>
                                        <span className="checkout-custom"/>
                                        We know our total addressable market size and target market share.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M2')}
                                               value="M2::We understand applicable regulations & have a strategy for compliance."/>
                                        <span className="checkout-custom"/>
                                        We understand applicable regulations & have a strategy for compliance.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M3')}
                                               value="M3::Initial sales provide evidence that we can capture our target market."/>
                                        <span className="checkout-custom"/>
                                        Initial sales provide evidence that we can capture our target market.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M4')}
                                               value="M4::We have evidence that our total addressable market is over $1B."/>
                                        <span className="checkout-custom"/>
                                        We have evidence that our total addressable market is over $1B.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M5')}
                                               value="M5::Large partners are talking with us about distribution, marketing, etc."/>
                                        <span className="checkout-custom"/>
                                        Large partners are talking with us about distribution, marketing, etc.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M6')}
                                               value="M6::Our suppliers & distributors see meaningful benefits from our success."/>
                                        <span className="checkout-custom"/>
                                        Our suppliers & distributors see meaningful benefits from our success.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M7')}
                                               value="M7::Our sales cycle meets or beats the industry standard."/>
                                        <span className="checkout-custom"/>
                                        Our sales cycle meets or beats the industry standard.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M8')}
                                               value="M8::We have hard-to-beat partnerships for distribution, marketing, growth."/>
                                        <span className="checkout-custom"/>
                                        We have hard-to-beat partnerships for distribution, marketing, growth.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="market"
                                               defaultChecked={market().includes('M9')}
                                               value="M9::We have a clear line of sight to industry dominance."/>
                                        <span className="checkout-custom"/>
                                        We have a clear line of sight to industry dominance.
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