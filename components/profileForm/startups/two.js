import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";
import ErrorSpan from "../../UI/ErrorSpan";
import StartupProfileHeader from "./StartupProfileHeader";

export default function ProfileThree({startup}) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const dispatch = useDispatch();

    const {register, handleSubmit, errors} = useForm();
    const hasProduct = () => startup.hasOwnProperty('product_services') && startup.product_services;

    const onSubmitHandler = async data => {
        dispatch(loader());

        try {
            await axiosInstance.post('startups/product-service', data, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(loader());
            dispatch(incrementCurrentState());
        } catch (e) {
            console.log(e);
            dispatch(loader());
        }
    }

    return <>
        <section className="startup-levels">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    <StartupProfileHeader />

                                    <div className="numbers d-md-none num-alone">
                                        <div className="number">3</div>
                                        <p>Product and Services</p>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                                        <div className="row">
                                            <div className="col-md-4 text-center">
                                                // Logo uploaded <br/>
                                                <img className="img-fluid " src="/images/mactavis-logo.png" alt=""/>
                                                // Company name
                                            </div>

                                            <div className="col-md-8">
                                                <div className="input-group-container">
                                                    <input ref={register({required: 'Please enter a product name'})} className="full-width mb-0"
                                                           type="text" name="product_name"
                                                           placeholder="Product/Service Name"
                                                           defaultValue={hasProduct() ? startup.product_services.product_name : ''}/>
                                                    {errors.product_name && <ErrorSpan>{errors.product_name.message}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <textarea ref={register} className="full-width" placeholder="Customer problem" name="customer_problem" rows="4"
                                                              defaultValue={hasProduct() ? startup.product_services.customer_problem : ''}/>
                                                </div>

                                                <div className="input-group-container">
                                                    <textarea ref={register} className="full-width" name="proposed_solution" rows="4" placeholder="Proposed solution"
                                                              defaultValue={hasProduct() ? startup.product_services.proposed_solution : ''}/>
                                                </div>

                                                <div className="input-group-container">
                                                    <textarea ref={register} className="full-width" name="value_proposition" placeholder="Value proposition" rows="4"
                                                          defaultValue={hasProduct() ? startup.product_services.value_proposition : ''}/>
                                                </div>

                                                <div className="input-group-container">
                                                    // Use slim
                                                    <input ref={register} className="full-width" name="product_images"
                                                           placeholder="e.g. https://image.com/one.jpg, https://image.com/two.jpg"
                                                           defaultValue={hasProduct() ? startup.product_services.product_image_string : ''}/>
                                                </div>

                                                <div className="input-group-container">
                                                    <input ref={register} type="url" className="full-width" name="product_video_url"
                                                           placeholder="Product Video (paste your youtube video embed code)"
                                                           defaultValue={hasProduct() ? startup.product_services.product_video_url : ''}/>
                                                </div>

                                                <div className="input-group-container">
                                                    <input ref={register} type="url" className="full-width" name="pitch_video_url"
                                                           placeholder="Pitch Video (paste your youtube video embed code)"
                                                           defaultValue={hasProduct() ? startup.product_services.pitch_video_url : ''}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <button className="btn prev mr-auto" onClick={() => dispatch(decrementCurrentState())} type="button">
                                                <span/> Previous
                                            </button>
                                            <button className="btn next ml-auto" type="submit">Save & Next <span/></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <style jsx>{`
            .customer-problem-label {
                margin-top: 4rem;
            }
        `}</style>
    </>
}