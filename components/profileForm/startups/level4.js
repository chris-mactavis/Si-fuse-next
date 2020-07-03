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

const Level4 = ({startup}) => {
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
            await axiosInstance.post('startups/level', {products: JSON.stringify(data.products)}, {
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
                                    <input ref={register} type="checkbox" name="products" defaultChecked={products().includes('PR1')}
                                           value="PR1::We have the ability to develop a low-fi prototype."/>
                                    <span className="checkout-custom"/>
                                    We have the ability to develop a low-fi prototype.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="products" defaultChecked={products().includes('PR2')}
                                           value="PR2::We’ve built a low-fidelity prototype."/>
                                    <span className="checkout-custom"/>
                                    We’ve built a low-fidelity prototype.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="products" defaultChecked={products().includes('PR3')}
                                           value="PR3::We’ve built a working prototype and have a product roadmap."/>
                                    <span className="checkout-custom"/>
                                    We’ve built a working prototype and have a product roadmap.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="products" defaultChecked={products().includes('PR4')}
                                           value="PR4::Our team understands product management and associated costs."/>
                                    <span className="checkout-custom"/>
                                    Our team understands product management and associated costs.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="products" defaultChecked={products().includes('PR5')}
                                           value="PR5::Our product is almost ready for broad commercial distribution."/>
                                    <span className="checkout-custom"/>
                                    Our product is almost ready for broad commercial distribution.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="products" defaultChecked={products().includes('PR6')}
                                           value="PR6::Our core product is complete, in the market, and gathering feedback."/>
                                    <span className="checkout-custom"/>
                                    Our core product is complete, in the market, and gathering feedback.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="products" defaultChecked={products().includes('PR7')}
                                           value="PR7::Our product is built for scale & new offerings are in progress."/>
                                    <span className="checkout-custom"/>
                                    Our product is built for scale & new offerings are in progress.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="products" defaultChecked={products().includes('PR8')}
                                           value="PR8::Our product is successfully handling dramatic growth."/>
                                    <span className="checkout-custom"/>
                                    Our product is successfully handling dramatic growth.
                                </label>

                                <label className="checkout-label">
                                    <input ref={register} type="checkbox" name="products" defaultChecked={products().includes('PR9')}
                                           value="PR9::Our product is recognized as the top in the industry."/>
                                    <span className="checkout-custom"/>
                                    Our product is recognized as the top in the industry.
                                </label>
                            </div>

                            <div className="col-md-4">
                                <InfoBox heading="Products" text="How mature are your product and feedback loops?"/>
                            </div>
                        </div>

                        <LevelButtonsComponent nextHandler={handleSubmit(nextPageHandler)} />
                    </form>
                </div>
            </div>
        </div>
    </section>;
}

export default Level4;