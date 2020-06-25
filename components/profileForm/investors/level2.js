import React from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";

const Level2 = () => {
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
                        Team capabilities
                    </div>

                    <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                        <div className="row">
                            <div className="col-md-8">

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_team"
                                           value="We have 2+ co-founders with differentiated skills sets."/>
                                    <span className="checkout-custom"/>
                                    We have 2+ co-founders with differentiated skills sets.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_team"
                                           value="Our team has personally experienced the problem."/>
                                    <span className="checkout-custom"/>
                                    Our team has personally experienced the problem.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_team"
                                           value=" Our team can build the product & understand the value chain."/>
                                    <span className="checkout-custom"/>
                                     Our team can build the product & understand the value chain.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_team"
                                           value="We have a clear strategy and understanding of sales."/>
                                    <span className="checkout-custom"/>
                                    We have a clear strategy and understanding of sales.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_team"
                                           value="Our management, product, & sales teams are ready for growth."/>
                                    <span className="checkout-custom"/>
                                    Our management, product, & sales teams are ready for growth.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_team"
                                           value="We understand how our market operates & have strong industry contacts."/>
                                    <span className="checkout-custom"/>
                                    We understand how our market operates & have strong industry contacts.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_team"
                                           value="We have an executive team that can lead the company through growth."/>
                                    <span className="checkout-custom"/>
                                    We have an executive team that can lead the company through growth.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_team"
                                           value="Our team is recognized as market leaders in the industry."/>
                                    <span className="checkout-custom"/>
                                    Our team is recognized as market leaders in the industry.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_team"
                                           value="Our team is prepared to navigate a merger, acquisition, or IPO."/>
                                    <span className="checkout-custom"/>
                                    Our team is prepared to navigate a merger, acquisition, or IPO.
                                </label>
                            </div>

                            <div className="col-md-4">
                                <InfoBox heading="Team" text="First, we would like to know more about the team you are building."/>
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

export default Level2;