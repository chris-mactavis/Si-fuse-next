import React from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";

const Level3 = () => {
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
                        Vision & Value Proposition
                    </div>

                    <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                        <div className="row">
                            <div className="col-md-8">

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_vision"
                                           value="We have a hypothesis for how we will solve this problem."/>
                                    <span className="checkout-custom"/>
                                    We have a hypothesis for how we will solve this problem.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_vision"
                                           value="Potential customers validate that our solution will solve a key point."/>
                                    <span className="checkout-custom"/>
                                    Potential customers validate that our solution will solve a key point.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_vision"
                                           value="We have evidence that customers will pay our target price."/>
                                    <span className="checkout-custom"/>
                                    We have evidence that customers will pay our target price.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_vision"
                                           value="Customer feedback shows that our solution is better than others."/>
                                    <span className="checkout-custom"/>
                                    Customer feedback shows that our solution is better than others.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_vision"
                                           value="Our initial target customers love the product and keep using it."/>
                                    <span className="checkout-custom"/>
                                    Our initial target customers love the product and keep using it.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_vision"
                                           value="We’re selling beyond our initial target customers."/>
                                    <span className="checkout-custom"/>
                                    We’re selling beyond our initial target customers.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_vision"
                                           value="The majority of our sales in our initial market are inbound."/>
                                    <span className="checkout-custom"/>
                                    The majority of our sales in our initial market are inbound.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_vision"
                                           value="Customers are renewing or repurchasing without much sales effort."/>
                                    <span className="checkout-custom"/>
                                    Customers are renewing or repurchasing without much sales effort.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_vision"
                                           value="We’re recognized as the top solution to this problem."/>
                                    <span className="checkout-custom"/>
                                    We’re recognized as the top solution to this problem.
                                </label>
                            </div>

                            <div className="col-md-4">
                                <InfoBox heading="Vision & Value Proposition" text="First, we would like to know more about the team you are building."/>
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

export default Level3;