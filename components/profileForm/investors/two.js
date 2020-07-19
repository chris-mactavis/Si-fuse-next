import {useForm} from "react-hook-form";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import Router from "next/router";
import Cookies from "js-cookie";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";
import ErrorSpan from "../../UI/ErrorSpan";
import InvestorProfileHeader from "./InvestorProfileHeader";

const InvestorPreference = ({investor, industries}) => {
    const {register, handleSubmit, errors} = useForm();

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
        <section className="startup-levels">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    <InvestorProfileHeader/>

                                    <div className="numbers d-md-none num-alone">
                                        <p>Startup Preference</p>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                                        <div className="row">
                                            <div className="col-md-4">
                                                {/*<img className="img-fluid "*/}
                                                {/*     src={savedCompanyProfileImage || startup.company.logo_url} alt=""/>*/}
                                                {/*<br/>*/}
                                                {/*<h4 className="mt-2">{savedCompanyName || startup.company.name}</h4>*/}
                                            </div>
                                        </div>

                                        <div className="col-md-8">
                                            <div className="input-group-container">
                                                <select ref={register({required: 'This field is required'})}
                                                        className="w-100 full-width mt-0" name="industry_id"
                                                        defaultValue={hasInterests() ? investor.interests.industry_id : ''}>
                                                    <option value="">Your Industry</option>
                                                    {
                                                        industries.map(({industry, id}) => <option key={id} value={id}>{industry}</option>)
                                                    }
                                                </select>
                                                {errors.industry_id && <ErrorSpan>{errors.industry_id.message}</ErrorSpan>}
                                            </div>

                                            <div className="input-group-container">
                                                <select name="geographical_focus" defaultValue={hasInterests() ? investor.interests.geographical_focus : ''} ref={register}>
                                                    <option value="">Geographical Focus</option>
                                                    <option value="North Africa">North Africa</option>
                                                    <option value="East Africa">East Africa</option>
                                                    <option value="South Africa">South Africa</option>
                                                    <option value="West Africa">West Africa</option>
                                                    <option value="Central Africa">Central Africa</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <button className="btn prev ml-auto"
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
            // .input-group-container {
            //     display: flex;
            //     flex-direction: column;
            //     margin-bottom: 0;
            // }
            // input, select, textarea {
            //     margin-bottom: 0!important;
            //     margin-top: 4rem;
            // }
            // .btn {
            //     margin-top: 4rem;
            // }
            // input.country-code {
            //     width: 90%;
            // }
            // .industry-label, about-label {
            //     margin-top: 4rem;
            // }
            // .profile-pic {
            //     cursor:pointer;
            //     width: 300px;
            // }
        `}</style>
    </>

}

export default InvestorPreference;