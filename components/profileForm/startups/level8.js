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

const Level8 = ({startup}) => {
    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const investorExit = () => {
        if (startup.level && startup.level.hasOwnProperty('investor_exit')) {
            let prob = JSON.parse(startup.level.investor_exit);
            if (prob && prob.length > 0) {
                return prob.map(p => p.split('::')[0])
            }
            return []
        }
        return [];
    }

    const nextPageHandler = async data => {
        if (data.investor_exit.length === 0) {
            dispatch(showNotifier('Please choose at least one option', 'danger'));
            return;
        }
        dispatch(loader());
        try {
            await axiosInstance.post('startups/level', {investor_exit: JSON.stringify(data.investor_exit)}, {
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

                                <InfoBox heading="Investor Exit"
                                         text="Finally, how much evidence do you have that you can provide liquidity to your investors?"/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I1')}
                                               value="I1::We know what an exit is and understand its importance to investors."/>
                                        <span className="checkout-custom"/>
                                        We know what an exit is and understand its importance to investors.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I2')}
                                               value="I2::We have a vision of how to ultimately deliver liquidity to investors."/>
                                        <span className="checkout-custom"/>
                                        We have a vision of how to ultimately deliver liquidity to investors.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I3')}
                                               value="I3::Evidence suggests our value proposition is of interest to acquirers"/>
                                        <span className="checkout-custom"/>
                                        Evidence suggests our value proposition is of interest to acquirers
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I4')}
                                               value="I4::Serious companies have made serious investments in our industry."/>
                                        <span className="checkout-custom"/>
                                        Serious companies have made serious investments in our industry.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I5')}
                                               value="I5::We’re seeing inbound interest from large potential acquirers."/>
                                        <span className="checkout-custom"/>
                                        We’re seeing inbound interest from large potential acquirers.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I6')}
                                               value="I6::We’ve identified specific acquirers or other exit options."/>
                                        <span className="checkout-custom"/>
                                        We’ve identified specific acquirers or other exit options.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I7')}
                                               value="I7::We have strong relationships with multiple potential acquirers."/>
                                        <span className="checkout-custom"/>
                                        We have strong relationships with multiple potential acquirers.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I8')}
                                               value="I8::We’ve turned down an acquisition offer already."/>
                                        <span className="checkout-custom"/>
                                        We’ve turned down an acquisition offer already.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="investor_exit"
                                               defaultChecked={investorExit().includes('I9')}
                                               value="I9::We're on the cusp of an exit and reaching the finish line."/>
                                        <span className="checkout-custom"/>
                                        We're on the cusp of an exit and reaching the finish line.
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

export default Level8;