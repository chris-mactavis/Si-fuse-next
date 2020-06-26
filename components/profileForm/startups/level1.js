import React from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {incrementCurrentState} from "../../../store/actions/profile";
import {useDispatch} from "react-redux";
import LevelHeader from "./LevelHeader";
import LevelButtonsComponent from "./LevelButtons";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";

const Level1 = ({startup}) => {

    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const problem = () => {
        if (startup.level && startup.level.hasOwnProperty('problem')) {
            let prob = JSON.parse(startup.level.problem);
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
            await axiosInstance.post('startups/level', {problem: JSON.stringify(data.problem)}, {
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
                                    <input ref={register} type="checkbox" name="problem" defaultChecked={problem().includes('P1')}
                                           value="P1::We're a global leader in solving this problem."/>
                                    <span className="checkout-custom"/>
                                    We're a global leader in solving this problem.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="problem" defaultChecked={problem().includes('P2')}
                                           value="P2::We’re beginning to have systems-level change in solving our problem."/>
                                    <span className="checkout-custom"/>
                                    We’re beginning to have systems-level change in solving our problem.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="problem" defaultChecked={problem().includes('P3')}
                                           value="P3::Our vision is proving attainable in a major market."/>
                                    <span className="checkout-custom"/>
                                    Our vision is proving attainable in a major market.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="problem" defaultChecked={problem().includes('P4')}
                                           value="P4::Our vision is being realized with early adopters and gaining ground."/>
                                    <span className="checkout-custom"/>
                                    Our vision is being realized with early adopters and gaining ground.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="problem" defaultChecked={problem().includes('P5')}
                                           value="P5::We have evidence that we're solving our customers' problem."/>
                                    <span className="checkout-custom"/>
                                    We have evidence that we're solving our customers' problem.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="problem" defaultChecked={problem().includes('P6')}
                                           value="P6::We can explain how this solution will transform the industry."/>
                                    <span className="checkout-custom"/>
                                    We can explain how this solution will transform the industry.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="problem" defaultChecked={problem().includes('P7')}
                                           value="P7::We can articulate why our vision offers a superior value proposition."/>
                                    <span className="checkout-custom"/>
                                    We can articulate why our vision offers a superior value proposition.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="problem" defaultChecked={problem().includes('P8')}
                                           value="P8::We have a vision for how to solve the problem and can execute on it."/>
                                    <span className="checkout-custom"/>
                                    We have a vision for how to solve the problem and can execute on it.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="problem" defaultChecked={problem().includes('P9')}
                                           value="P9::We’ve identified a specific, important, and large problem."/>
                                    <span className="checkout-custom"/>
                                    We’ve identified a specific, important, and large problem.
                                </label>
                            </div>

                            <div className="col-md-4">
                                <InfoBox heading="Problem" text="Tell us about the problem you're tackling"/>
                            </div>
                        </div>

                        <LevelButtonsComponent noPrev nextHandler={handleSubmit(nextPageHandler)} />
                    </form>
                </div>
            </div>
        </div>
    </section>;
}

export default Level1;