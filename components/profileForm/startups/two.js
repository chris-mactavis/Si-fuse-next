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

                                    <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                                        <div className="numbers d-md-none num-alone">
                                            <div className="number">3</div>
                                            <p>Product and Services</p>
                                        </div>

                                        <input ref={register({required: 'Please enter a product name'})} className="full-width mb-0"
                                               type="text" name="product_name"
                                               placeholder="Product Name"
                                               defaultValue={hasProduct() ? startup.product_services.product_name : ''}/>
                                        {errors.product_name && <ErrorSpan>{errors.product_name.message}</ErrorSpan>}

                                        <label className="customer-problem-label">Customer Problem</label>
                                        <textarea ref={register} className="full-width" name="customer_problem" id="" cols="30"
                                                  rows="5"
                                                  defaultValue={hasProduct() ? startup.product_services.customer_problem : ''}/>

                                        <label>Proposed Solution</label>
                                        <textarea ref={register} className="full-width" name="proposed_solution" id="" cols="30"
                                                  rows="5"
                                                  defaultValue={hasProduct() ? startup.product_services.proposed_solution : ''}/>

                                        <label>Value Proposition</label>
                                        <textarea ref={register} className="full-width" name="value_proposition" id="" cols="30"
                                                  rows="5"
                                                  defaultValue={hasProduct() ? startup.product_services.value_proposition : ''}/>

                                        <label>Product Images</label>
                                        <input ref={register} className="full-width" name="product_images"
                                               placeholder="e.g. https://image.com/one.jpg, https://image.com/two.jpg"
                                               defaultValue={hasProduct() ? startup.product_services.product_image_string : ''}/>

                                        <label>Product Video</label>
                                        <input ref={register} type="url" className="full-width" name="product_video_url"
                                               placeholder="Product Video Url"
                                               defaultValue={hasProduct() ? startup.product_services.product_video_url : ''}/>

                                        <label>Pitch Video</label>
                                        <input ref={register} type="url" className="full-width" name="pitch_video_url"
                                               placeholder="Pitch Video Url"
                                               defaultValue={hasProduct() ? startup.product_services.pitch_video_url : ''}/>

                                        <div className="d-flex">
                                            <button className="btn btn-sm btn-profile mr-2"
                                                    onClick={() => dispatch(decrementCurrentState())} type="button">Previous
                                            </button>
                                            <button className="btn btn-sm btn-profile ml-2" type="submit">Save & Next</button>
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