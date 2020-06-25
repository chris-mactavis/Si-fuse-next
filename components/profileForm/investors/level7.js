import React from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";

const Level7 = () => {
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
                        Scale
                    </div>

                    <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                        <div className="row">
                            <div className="col-md-8">

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_scale"
                                           value="We’ve identified multiple possible markets or customer segments."/>
                                    <span className="checkout-custom"/>
                                    We’ve identified multiple possible markets or customer segments.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_scale"
                                           value="We have evidence that multiple markets experience this problem."/>
                                    <span className="checkout-custom"/>
                                    We have evidence that multiple markets experience this problem.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_scale"
                                           value="We have a clear strategy to scale to multiple markets."/>
                                    <span className="checkout-custom"/>
                                    We have a clear strategy to scale to multiple markets.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_scale"
                                           value="Customers in multiple markets find value in our solution."/>
                                    <span className="checkout-custom"/>
                                    Customers in multiple markets find value in our solution.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_scale"
                                           value="Our unit economics are tipping to positive in at least two markets."/>
                                    <span className="checkout-custom"/>
                                    Our unit economics are tipping to positive in at least two markets.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_scale"
                                           value="We’ve cleared regulatory challenges and have a clear IP strategy."/>
                                    <span className="checkout-custom"/>
                                    We’ve cleared regulatory challenges and have a clear IP strategy.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_scale"
                                           value="Our unit economics are positive in multiple markets."/>
                                    <span className="checkout-custom"/>
                                    Our unit economics are positive in multiple markets.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_scale"
                                           value="Growth in our customer base is accelerating month-on-month"/>
                                    <span className="checkout-custom"/>
                                    Growth in our customer base is accelerating month-on-month
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_scale"
                                           value="Unit economics are strong for multiple markets or customer segments."/>
                                    <span className="checkout-custom"/>
                                    Unit economics are strong for multiple markets or customer segments.
                                </label>
                            </div>

                            <div className="col-md-4">
                                <InfoBox heading="Scale" text="What scale are you operating at?"/>
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

export default Level7;