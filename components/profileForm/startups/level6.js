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

const Level6 = ({startup}) => {
    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const team = () => {
        if (startup.level && startup.level.hasOwnProperty('team')) {
            let prob = JSON.parse(startup.level.team);
            if (prob && prob.length > 0) {
                return prob.map(p => p.split('::')[0])
            }
            return []
        }
        return [];
    }

    const nextPageHandler = async data => {
        if (data.team.length === 0) {
            dispatch(showNotifier('Please choose at least one option', 'danger'));
            return;
        }
        dispatch(loader());
        try {
            await axiosInstance.post('startups/level', {team: JSON.stringify(data.team)}, {
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

                                <InfoBox heading="Team" text="First, we would like to know more about the team you are building."/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC1')}
                                               value="TC1::We have 2+ co-founders with differentiated skills sets."/>
                                        <span className="checkout-custom"/>
                                        We have 2+ co-founders with differentiated skills sets.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC2')}
                                               value="TC2::Our team has personally experienced the problem."/>
                                        <span className="checkout-custom"/>
                                        Our team has personally experienced the problem.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC3')}
                                               value="TC3::Our team can build the product & understand the value chain."/>
                                        <span className="checkout-custom"/>
                                        Our team can build the product & understand the value chain.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC4')}
                                               value="TC4::We have a clear strategy and understanding of sales."/>
                                        <span className="checkout-custom"/>
                                        We have a clear strategy and understanding of sales.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC5')}
                                               value="TC5::Our management, product, & sales teams are ready for growth."/>
                                        <span className="checkout-custom"/>
                                        Our management, product, & sales teams are ready for growth.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC6')}
                                               value="TC6::We understand how our market operates & have strong industry contacts."/>
                                        <span className="checkout-custom"/>
                                        We understand how our market operates & have strong industry contacts.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC7')}
                                               value="TC7::We have an executive team that can lead the company through growth."/>
                                        <span className="checkout-custom"/>
                                        We have an executive team that can lead the company through growth.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC8')}
                                               value="TC8::Our team is recognized as market leaders in the industry."/>
                                        <span className="checkout-custom"/>
                                        Our team is recognized as market leaders in the industry.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC9')}
                                               value="TC9::Our team is prepared to navigate a merger, acquisition, or IPO."/>
                                        <span className="checkout-custom"/>
                                        Our team is prepared to navigate a merger, acquisition, or IPO.
                                    </label>

                                    <LevelButtonsComponent nextHandler={handleSubmit(nextPageHandler)}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}

export default Level6;