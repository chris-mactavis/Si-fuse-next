import React from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";

const Level8 = () => {
    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const nextPageHandler = async data => {
        dispatch(incrementCurrentState());
    }

    return <section className="startup-levels">
        <div className="container">
            <div className="row bg-white startup-levels-row">
                <div className="col-md-12 mx-auto">
                    <div className="level-header">
                        Investor Exit
                    </div>

                    <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                        <div className="row">
                            <div className="col-md-8">

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_investor_exit"
                                           value="We know what an exit is and understand its importance to investors."/>
                                    <span className="checkout-custom"/>
                                    We know what an exit is and understand its importance to investors.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_investor_exit"
                                           value="We have a vision of how to ultimately deliver liquidity to investors."/>
                                    <span className="checkout-custom"/>
                                    We have a vision of how to ultimately deliver liquidity to investors.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_investor_exit"
                                           value="Evidence suggests our value proposition is of interest to acquirers"/>
                                    <span className="checkout-custom"/>
                                    Evidence suggests our value proposition is of interest to acquirers
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_investor_exit"
                                           value="Serious companies have made serious investments in our industry."/>
                                    <span className="checkout-custom"/>
                                    Serious companies have made serious investments in our industry.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_investor_exit"
                                           value="We’re seeing inbound interest from large potential acquirers."/>
                                    <span className="checkout-custom"/>
                                    We’re seeing inbound interest from large potential acquirers.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_investor_exit"
                                           value="We’ve identified specific acquirers or other exit options."/>
                                    <span className="checkout-custom"/>
                                    We’ve identified specific acquirers or other exit options.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_investor_exit"
                                           value="We have strong relationships with multiple potential acquirers."/>
                                    <span className="checkout-custom"/>
                                    We have strong relationships with multiple potential acquirers.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_investor_exit"
                                           value="We’ve turned down an acquisition offer already."/>
                                    <span className="checkout-custom"/>
                                    We’ve turned down an acquisition offer already.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_investor_exit"
                                           value="We're on the cusp of an exit and reaching the finish line."/>
                                    <span className="checkout-custom"/>
                                    We're on the cusp of an exit and reaching the finish line.
                                </label>
                            </div>

                            <div className="col-md-4">
                                <InfoBox heading="Investor Exit" text="Finally, how much evidence do you have that you can provide liquidity to your investors?"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8">
                                <div className="d-flex justify-content-center mt-5">
                                    <button className="btn mr-2 prev" type="button" onClick={() => dispatch(decrementCurrentState())}><span/> Previous</button>
                                    <button className="btn ml-2 next" type="submit">Next <span/></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>;
}

export default Level8;