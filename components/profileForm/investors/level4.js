import React from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";

const Level4 = () => {
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
                        Products
                    </div>

                    <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                        <div className="row">
                            <div className="col-md-8">

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_products"
                                           value="We have the ability to develop a low-fi prototype."/>
                                    <span className="checkout-custom"/>
                                    We have the ability to develop a low-fi prototype.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_products"
                                           value="We’ve built a low-fidelity prototype."/>
                                    <span className="checkout-custom"/>
                                    We’ve built a low-fidelity prototype.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_products"
                                           value="We’ve built a working prototype and have a product roadmap."/>
                                    <span className="checkout-custom"/>
                                    We’ve built a working prototype and have a product roadmap.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_products"
                                           value="Our team understands product management and associated costs."/>
                                    <span className="checkout-custom"/>
                                    Our team understands product management and associated costs.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_products"
                                           value="Our product is almost ready for broad commercial distribution."/>
                                    <span className="checkout-custom"/>
                                    Our product is almost ready for broad commercial distribution.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_products"
                                           value="Our core product is complete, in the market, and gathering feedback."/>
                                    <span className="checkout-custom"/>
                                    Our core product is complete, in the market, and gathering feedback.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_products"
                                           value="Our product is built for scale & new offerings are in progress."/>
                                    <span className="checkout-custom"/>
                                    Our product is built for scale & new offerings are in progress.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_products"
                                           value="Our product is successfully handling dramatic growth."/>
                                    <span className="checkout-custom"/>
                                    Our product is successfully handling dramatic growth.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_products"
                                           value="Our product is recognized as the top in the industry."/>
                                    <span className="checkout-custom"/>
                                    Our product is recognized as the top in the industry.
                                </label>
                            </div>

                            <div className="col-md-4">
                                <InfoBox heading="Products" text="How mature are your product and feedback loops?"/>
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

export default Level4;