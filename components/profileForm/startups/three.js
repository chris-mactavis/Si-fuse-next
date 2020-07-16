import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";
import {error} from "next/dist/build/output/log";
import ErrorSpan from "../../UI/ErrorSpan";
import StartupProfileHeader from "./StartupProfileHeader";

export default function ProfileThree({startup}) {
    const dispatch = useDispatch();

    const hasFinance = () => startup.hasOwnProperty('finance') && startup.finance;

    const {register, handleSubmit, errors} = useForm();
    const onSubmitHandler = async data => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/finance', data, {
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <>
        <section className="startup-levels">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    <StartupProfileHeader/>

                                    <div className="numbers d-md-none num-alone">
                                        <p>Finance</p>
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
                                                     <select name="revenue_type" ref={register({required: 'This field is required'})} className="mb-0" defaultValue={hasFinance() ? startup.finance.revenue_type : ''}>
                                                         <option value="">Revenue state</option>
                                                         <option value="Post revenue">Post Revenue</option>
                                                         <option value="Pre revenue">Pre Revenue</option>
                                                     </select>
                                                     {errors.revenue_type && <ErrorSpan>{errors.revenue_type.message}</ErrorSpan>}
                                                 </div>

                                                 <div className="input-group-container">
                                                     <select name="capital_needed_for" ref={register} className="capital-select"
                                                             defaultValue={hasFinance() ? startup.finance.capital_needed_for : ''}>
                                                         <option value="">Capital Need</option>
                                                         <option value="Proof of concept">Proof of concept</option>
                                                         <option value="Working capital">Working capital</option>
                                                         <option value="Growth capital">Growth capital</option>
                                                         <option value="Bridging Capital">Bridging capital</option>
                                                     </select>
                                                 </div>

                                                 <div className="input-group-container">
                                                     // This is not connected to API
                                                     <select name="business_size" ref={register} defaultValue={hasFinance() ? startup.finance.business_size : ''}>
                                                         <option value="">Current business size relative to capital need</option>
                                                         <option value="cannot value">No way to value current business worth</option>
                                                         <option value="less than capital needed">Current business worth less than capital needed</option>
                                                         <option value="more">Current business worth more than capital needed</option>
                                                     </select>
                                                 </div>

                                                 <div className="input-group-container">
                                                     <select name="" ref={register} defaultValue={""}>
                                                         <option value="">Cash flow projections for the investment</option>
                                                         <option value="">Cash flow positive currently</option>
                                                         <option value="">Cash flow positive during term of investment</option>
                                                         <option value="">Very uncertain cashflow</option>
                                                         <option value="">No projection for positive cashflow</option>
                                                     </select>
                                                 </div>

                                                 <div className="input-group-container">
                                                     <select name="growth_projection" ref={register} defaultValue={hasFinance() ? startup.finance.growth_projection : ''}>
                                                         <option value="">What is your growth projection?</option>
                                                         <option value="No Growth Expected">No Growth Expected</option>
                                                         <option value="Stable Growth">Stable Growth</option>
                                                         <option value="High Growth">High Growth</option>
                                                         <option value="Exponential (J-Growth)">Exponential (J-Growth)</option>
                                                     </select>
                                                 </div>
                                             </div>
                                        </div>

                                        <div className="d-flex">
                                            <button className="btn prev mr-auto" onClick={() => dispatch(decrementCurrentState())} type="button">
                                                <span/> Previous
                                            </button>

                                            <button className="btn next ml-auto" type="submit">
                                                Save & Next <span/>
                                            </button>
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
            
        `}</style>
    </>
}