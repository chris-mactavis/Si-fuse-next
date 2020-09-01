import React from "react";
import InfoBox from "./InfoBox";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {incrementCurrentLevelState} from "../../../store/actions/profile";
import LevelButtonsComponent from "./LevelButtons";
import LevelHeader from "./LevelHeader";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {showNotifier} from "../../../store/actions/notifier";
import {setStartupData} from "../../../store/actions/startupProfile";

const Level3 = ({startup}) => {
    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();
    const products = () => {
        if (startup.level && startup.level.hasOwnProperty('products')) {
            let prob = JSON.parse(startup.level.products);
            if (prob && prob.length > 0) {
                return prob.map(p => p.split('::')[0])
            }
            return []
        }
        return [];
    }

    const nextPageHandler = async data => {
        if (data.products.length === 0) {
            dispatch(showNotifier('Please choose at least one option', 'danger'));
            return;
        }
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/level', {products: JSON.stringify(data.products), profile_stage: 4}, {
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

                                <InfoBox heading="Products" text="Do you have a well developed products and feedback mechanics?"/>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR1')}
                                               value="PR1::Despite not having a lo-fi prototype, our team has the capacity to build one."/>
                                        <span className="checkout-custom"/>
                                        Despite not having a lo-fi prototype, our team has the capacity to build one.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR2')}
                                               value="PR2::Our team have successfully developed a lo-fi prototype. The functionality isn't up to par yet!"/>
                                        <span className="checkout-custom"/>
                                        Our team have successfully developed a lo-fi prototype. The functionality isn't up to par yet!
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR3')}
                                               value="PR3::Our team have successfully developed a functional prototype (after rigour testing) and a featured product roadmap for upgrades."/>
                                        <span className="checkout-custom"/>
                                        Our team have successfully developed a functional prototype (after rigour testing) and a featured product roadmap for upgrades.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR4')}
                                               value="PR4::We have a good knowledge of product management and its costing."/>
                                        <span className="checkout-custom"/>
                                        We have a good knowledge of product management and its costing.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR5')}
                                               value="PR5::Our product (creative solution) is nearly ready for mainstream distribution"/>
                                        <span className="checkout-custom"/>
                                        Our product (creative solution) is nearly ready for mainstream distribution
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR6')}
                                               value="PR6::Our key product is complete and currently in mainstream market. Our team are also collecting feedbacks for product enhancement."/>
                                        <span className="checkout-custom"/>
                                        Our key product is complete and currently in mainstream market. Our team are also collecting feedbacks for product enhancement.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR7')}
                                               value="PR7::Our product is developed for improvement & with feedbacks collected, new product propositions are currently in the works."/>
                                        <span className="checkout-custom"/>
                                        Our product is developed for improvement & with feedbacks collected, new product propositions are currently in the works.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR8')}
                                               value="PR8::With new product propositions, our product is successfully dealing with substantial growth."/>
                                        <span className="checkout-custom"/>
                                        With new product propositions, our product is successfully dealing with substantial growth.
                                    </label>

                                    <label className="checkout-label">
                                        <input ref={register} type="checkbox" name="products"
                                               defaultChecked={products().includes('PR9')}
                                               value="PR9::Our product is being identified as an industry leader because of our outstanding product offerings."/>
                                        <span className="checkout-custom"/>
                                        Our product is being identified as an industry leader because of our outstanding product offerings.
                                    </label>

                                    <LevelButtonsComponent nextHandler={handleSubmit(nextPageHandler)}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        ;
}

export default Level3;