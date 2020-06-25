import React from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";

const Level5 = () => {
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
                        Market
                    </div>

                    <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                        <div className="row">
                            <div className="col-md-8">

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_market"
                                           value="We know our total addressable market size and target market share."/>
                                    <span className="checkout-custom"/>
                                    We know our total addressable market size and target market share.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_market"
                                           value="We understand applicable regulations & have a strategy for compliance."/>
                                    <span className="checkout-custom"/>
                                    We understand applicable regulations & have a strategy for compliance.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_market"
                                           value="Initial sales provide evidence that we can capture our target market."/>
                                    <span className="checkout-custom"/>
                                    Initial sales provide evidence that we can capture our target market.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_market"
                                           value="We have evidence that our total addressable market is over $1B."/>
                                    <span className="checkout-custom"/>
                                    We have evidence that our total addressable market is over $1B.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_market"
                                           value="Large partners are talking with us about distribution, marketing, etc."/>
                                    <span className="checkout-custom"/>
                                    Large partners are talking with us about distribution, marketing, etc.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_market"
                                           value="Our suppliers & distributors see meaningful benefits from our success."/>
                                    <span className="checkout-custom"/>
                                    Our suppliers & distributors see meaningful benefits from our success.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_market"
                                           value="Our sales cycle meets or beats the industry standard."/>
                                    <span className="checkout-custom"/>
                                    Our sales cycle meets or beats the industry standard.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_market"
                                           value="We have hard-to-beat partnerships for distribution, marketing, growth."/>
                                    <span className="checkout-custom"/>
                                    We have hard-to-beat partnerships for distribution, marketing, growth.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_market"
                                           value="We have a clear line of sight to industry dominance."/>
                                    <span className="checkout-custom"/>
                                    We have a clear line of sight to industry dominance.
                                </label>
                            </div>

                            <div className="col-md-4">
                                <InfoBox heading="Market" text="How much evidence do you have that a large market of customers experiences this problem?"/>
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

export default Level5;