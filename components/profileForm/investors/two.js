import {useForm} from "react-hook-form";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import Router from "next/router";
import Cookies from "js-cookie";
import {incrementCurrentState} from "../../../store/actions/profile";

const InvestorPreference = ({investor, industries}) => {
    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch();

    const onSubmitHandler = async data => {
        dispatch(loader());
        try {
            await axiosInstance.post('investors/interest', data, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(loader());
            dispatch(incrementCurrentState());
        } catch (e) {
            dispatch(loader());
            console.log(e);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const hasInterests = () => investor.hasOwnProperty('interests') && investor.interests;

    return <>
        <section className="profile single-post">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="numbers">
                            <div className="number fade">1</div>
                            <p className="fade">Basic information</p>
                        </div>

                        <div className="numbers only">
                            <div className="number">2</div>
                            <p className="">Startup Preference</p>
                        </div>

                        <div className="numbers only">
                            <div className="number">3</div>
                            <p className="">More About You</p>
                        </div>

                    </div>

                    <div className="col-lg-9 col-12">
                        <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                            <div className="numbers d-md-none num-alone">
                                <div className="number">2</div>
                                <p>Your company</p>
                            </div>

                            <label className="industry-label">Your Industry</label>

                            <select ref={register({required: 'This field is required'})}
                                    className="w-100 full-width mt-0" name="industry_id"
                                    defaultValue={hasInterests() ? investor.interests.industry_id : ''}>
                                <option value="">Your Industry</option>
                                {
                                    industries.map(({industry, id}) => <option key={id} value={id}>{industry}</option>)
                                }
                            </select>

                            <select name="geographical_focus" defaultValue={hasInterests() ? investor.interests.geographical_focus : ''} ref={register}>
                                <option value="">Geographical Focus</option>
                                <option value="North Africa">North Africa</option>
                                <option value="East Africa">East Africa</option>
                                <option value="South Africa">South Africa</option>
                                <option value="West Africa">West Africa</option>
                                <option value="Central Africa">Central Africa</option>
                            </select>

                            <button className="btn btn-profile" type="submit">Save & Next</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <style jsx>{`
            .input-group-container {
                display: flex;
                flex-direction: column;
                margin-bottom: 0;
            }
            input, select, textarea {
                margin-bottom: 0!important;
                margin-top: 4rem;
            }
            .btn {
                margin-top: 4rem;
            }
            input.country-code {
                width: 90%;
            }
            .industry-label, about-label {
                margin-top: 4rem;
            }
            .profile-pic {
                cursor:pointer;
                width: 300px;
            }
        `}</style>
    </>

}

export default InvestorPreference;