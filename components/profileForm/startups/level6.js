import React from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import LevelButtonsComponent from "./LevelButtons";
import LevelHeader from "./LevelHeader";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {showNotifier} from "../../../store/actions/notifier";
import {incrementCurrentLevelState} from "../../../store/actions/profile";
import {setStartupData} from "../../../store/actions/startupProfile";

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
            const {data: response} = await axiosInstance.post('startups/level', {team: JSON.stringify(data.team), profile_stage: 7}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            })
            dispatch(setStartupData(response.data));
            dispatch(loader());
            dispatch(incrementCurrentLevelState());
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

                                <LevelHeader isLevel/>

                                <InfoBox heading="Team" text="What kind of team do you have or building?"/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC1')}
                                               value="TC1::Our team is made up of 2 or more co-founders with varying competences."/>
                                        <span className="checkout-custom"/>
                                        Our team is made up of 2 or more co-founders with varying competences.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC2')}
                                               value="TC2::Our team consist of individuals that have experience in the problem."/>
                                        <span className="checkout-custom"/>
                                        Our team consist of individuals that have experience in the problem.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC3')}
                                               value="TC3::Our team consist of individuals that can develop the product that solves the problem and understands the supply chain."/>
                                        <span className="checkout-custom"/>
                                        Our team consist of individuals that can develop the product that solves the problem and understands the supply chain.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC4')}
                                               value="TC4::We understand how our marketplace operates & have a robust industry contacts."/>
                                        <span className="checkout-custom"/>
                                        We understand how our marketplace operates & have a robust industry contacts.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC5')}
                                               value="TC5::Our team have a good understanding of how sales work, and have a strategic approach for market penetration."/>
                                        <span className="checkout-custom"/>
                                        Our team have a good understanding of how sales work, and have a strategic approach for market penetration.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC6')}
                                               value="TC6::Our management, product, & sales team are equipped for growth."/>
                                        <span className="checkout-custom"/>
                                        Our management, product, & sales team are equipped for growth.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC7')}
                                               value="TC7::Our managerial team are well-equipped to lead the organization through exponential growth."/>
                                        <span className="checkout-custom"/>
                                        Our managerial team are well-equipped to lead the organization through exponential growth.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC8')}
                                               value="TC8::Our team comprises of individuals identified as market leaders in the industry."/>
                                        <span className="checkout-custom"/>
                                        Our team comprises of individuals identified as market leaders in the industry.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="team"
                                               defaultChecked={team().includes('TC9')}
                                               value="TC9::Our team is ready to negotiate a merger, acquisition, or IPO."/>
                                        <span className="checkout-custom"/>
                                        Our team is ready to negotiate a merger, acquisition, or IPO.
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