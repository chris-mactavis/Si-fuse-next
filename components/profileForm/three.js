import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import {useDispatch} from "react-redux";
import {loader} from "../../store/actions/loader";
import {incrementCurrentState} from "../../store/actions/profile";

export default function ProfileThree({startup}) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const dispatch = useDispatch();

    const {register, handleSubmit} = useForm();
    const hasProduct = () => startup.hasOwnProperty('product_services') && startup.product_services;

    const onSubmitHandler = async data => {
        dispatch(loader());
        let formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'pitch_video' && data[key].length > 0) {
                formData.append(key, data[key][0]);
            } else if (key === 'product_image' && data[key].length > 0) {
                formData.append(key, data[key][0]);
            } else {
                formData.append(key, data[key]);
            }
        });

        try {
            await axiosInstance.post('startups/product-service', formData, {
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

    return <section className="profile profile-2 single-post">
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-3">
                    <div className="numbers">
                        <div className="number">1</div>
                        <p>Basic information</p>
                    </div>

                    <div className="numbers only">
                        <div className="number">2</div>
                        <p className="">Your company</p>
                    </div>

                    <div className="numbers">
                        <div className="number">3</div>
                        <p className="">Product and Services</p>
                    </div>

                    <div className="numbers only">
                        <div className="number fade">4</div>
                        <p className="fade">Finance</p>
                    </div>

                    <div className="numbers">
                        <div className="number fade">5</div>
                        <p className="fade">Marketing</p>
                    </div>
                </div>
                <div className="col-md-9">
                    <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">

                        <label htmlFor="industry">Company Stage</label>

                        <div className="d-flex flex-wrap mb-4">
                            <label className="checkout-label">
                                <input ref={register} type="radio" value="concept" name="company_stage" id=""/>
                                <span className="checkout-custom"/>
                                Concept
                            </label>
                            <label className="checkout-label">
                                <input ref={register} type="radio" value="early stage" name="company_stage" id=""/>
                                <span className="checkout-custom"/>
                                Early stage
                            </label>
                            <label className="checkout-label">
                                <input ref={register} type="radio" value="scaling" name="company_stage" id=""/>
                                <span className="checkout-custom"/>
                                Scaling
                            </label>
                            <label className="checkout-label">
                                <input ref={register} type="radio" value="established" name="company_stage" id=""/>
                                <span className="checkout-custom"/>
                                Established
                            </label>
                        </div>

                        <input ref={register} className="full-width" type="text" name="product_name"
                               placeholder="Product Name" defaultValue={hasProduct() ? startup.product_services.product_name : ''}/>

                        <label>Customer Problem</label>
                        <textarea ref={register} className="full-width" name="customer_problem" id="" cols="30"
                                  rows="5" defaultValue={hasProduct() ? startup.product_services.customer_problem : ''}/>

                        <label>Proposed Solution</label>
                        <textarea ref={register} className="full-width" name="proposed_solution" id="" cols="30"
                                  rows="5" defaultValue={hasProduct() ? startup.product_services.proposed_solution : ''}/>

                        <label>Value Proposition</label>
                        <textarea ref={register} className="full-width" name="value_proposition" id="" cols="30"
                                  rows="5" defaultValue={hasProduct() ? startup.product_services.value_proposition : ''}/>

                        <label id="video-upload">
                            <input ref={register} className="input-file" title="&nbsp;" type="file" name="product_video"
                                   required="" capture/>
                            Product Video
                        </label>

                        <label id="video-upload" className="mt-5">
                            <input ref={register} className="input-file" title="&nbsp;" type="file" name="product_image"
                                   required="" capture/>
                            Profile Picture
                        </label>

                        <label id="video-upload" className="mt-5">
                            <input ref={register} className="input-file" title="&nbsp;" type="file" name="pitch_video"
                                   required="" capture/>
                            Pitch Video
                        </label>

                        <button className="btn btn-profile" type="submit">Save & Next</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
}