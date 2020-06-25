import React from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {incrementCurrentState} from "../../../store/actions/profile";
import {useDispatch} from "react-redux";

const Level1 = () => {

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
                        Problem
                    </div>

                    <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                        <div className="row">
                            <div className="col-md-8">

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_problem"
                                           value="We're a global leader in solving this problem."/>
                                    <span className="checkout-custom"/>
                                    We're a global leader in solving this problem.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_problem"
                                           value="We’re beginning to have systems-level change in solving our problem."/>
                                    <span className="checkout-custom"/>
                                    We’re beginning to have systems-level change in solving our problem.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_problem"
                                           value="Our vision is proving attainable in a major market."/>
                                    <span className="checkout-custom"/>
                                    Our vision is proving attainable in a major market.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_problem"
                                           value="Our vision is being realized with early adopters and gaining ground."/>
                                    <span className="checkout-custom"/>
                                    Our vision is being realized with early adopters and gaining ground.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_problem"
                                           value="We have evidence that we're solving our customers' problem."/>
                                    <span className="checkout-custom"/>
                                    We have evidence that we're solving our customers' problem.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_problem"
                                           value="We can explain how this solution will transform the industry."/>
                                    <span className="checkout-custom"/>
                                    We can explain how this solution will transform the industry.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_problem"
                                           value="We can articulate why our vision offers a superior value proposition."/>
                                    <span className="checkout-custom"/>
                                    We can articulate why our vision offers a superior value proposition.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_problem"
                                           value="We have a vision for how to solve the problem and can execute on it."/>
                                    <span className="checkout-custom"/>
                                    We have a vision for how to solve the problem and can execute on it.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="level_problem"
                                           value="We’ve identified a specific, important, and large problem."/>
                                    <span className="checkout-custom"/>
                                    We’ve identified a specific, important, and large problem.
                                </label>
                            </div>

                            <div className="col-md-4">
                                <InfoBox heading="Problem" text="Tell us about the problem you're tackling"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8">
                                <div className="d-flex justify-content-center mt-5">
                                    {/*<button className="btn mr-2 prev" type="button"><span/> Previous</button>*/}
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

export default Level1;