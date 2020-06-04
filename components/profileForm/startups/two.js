import {useDispatch} from "react-redux";
import {incrementCurrentState} from "../../../store/actions/profile";
import React, {useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Error from "../../UI/ErrorSpan";
import DropNCrop from "@synapsestudios/react-drop-n-crop";
import axiosInstance from "../../../config/axios";
import {loader} from "../../../store/actions/loader";
import Token from "../../../utils/Token";

export default function ProfileTwo({industries, startup, locations}) {
    const dispatch = useDispatch();
    const {register, handleSubmit, errors, getValues, formState, triggerValidation} = useForm();
    const [profilePicture, setProfilePicture] = useState({
        result: null,
        filename: null,
        filetype: null,
        src: null,
        error: null,
    });

    const hasCompany = () => startup.hasOwnProperty('company') && startup.company;

    useEffect(() => {
        setProfilePicture({
            result: startup.company.logo_url,
            filename: null,
            filetype: null,
            src: null,
            error: null,
        })
    }, [])


    const handleChange = useCallback(
        evt => {
            const {name, value} = evt.target;

            console.log('onChange:', {name, value});
            triggerValidation({name});
        },
        [formState.touched, triggerValidation]
    );

    const hasError = field => errors[field] !== undefined;
    const getError = field => hasError(field) && errors[field].message;

    const validateIndustries = () => {
        const values = getValues({nest: true});

        return (
            (values.industries.filter(industry => Boolean(industry)).length >= 1) || "Select at least one industry!"
        );
    }

    const onChangePicture = value => {
        setProfilePicture(value);
    }

    const submitHandler = async data => {
        data['industry_ids'] = data.industries.filter(industry => !!industry);
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/company', data, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            console.log(response);
        } catch (e) {
            console.log(e)
        }
        dispatch(loader());
        dispatch(incrementCurrentState());
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <>
        <section className="profile profile-2 single-post">
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-3">
                        <div className="numbers">
                            <div className="number">1</div>
                            <p>Basic information</p>
                        </div>

                        <div className="numbers only">
                            <div className="number fade">2</div>
                            <p className="fade">Your company</p>
                        </div>

                        <div className="numbers">
                            <div className="number fade">3</div>
                            <p className="fade">Product and Services</p>
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
                        <form onSubmit={handleSubmit(submitHandler)} className="profile-details">

                            <label htmlFor="profile-pic">Profile Picture</label>
                            <DropNCrop onChange={onChangePicture} cropperOptions={{aspectRatio: 1 / 1}}
                                       value={profilePicture}/>

                            <input ref={register({required: 'This field is required'})} type="hidden"
                                   defaultValue={profilePicture.result} name="logo"/>
                            {
                                profilePicture.result ? (
                                    <>
                                        <img className="profile-pic img-fluid img-thumbnail mt-5"
                                             src={profilePicture.result}/>
                                    </>) : null
                            }
                            <span className="d-block">{errors.logo &&
                            <Error>Please upload a profile picture!</Error>}</span>

                            <label htmlFor="industry">Your industry</label>
                            <div className="d-flex flex-wrap mb-4">
                                {
                                    industries.map(
                                        ({industry, id}, i) => <label className="checkout-label" key={id}>
                                            <input type="checkbox" name={`industries[${id}]`} id={id} value={id} defaultChecked={true}
                                                   onChange={handleChange} ref={register}/>
                                            <span className="checkout-custom"/>
                                            {industry}
                                        </label>
                                    )
                                }
                                <span className="d-block">{hasError("industries[0]") &&
                                <Error>{getError("industries[0]")}</Error>}</span>
                            </div>

                            <input className="full-width mt-0" type="text"
                                   ref={register({required: 'Please enter a company name'})} name="name" id="" defaultValue={hasCompany() ? startup.company.name : ''}
                                   placeholder="Company name"/>
                            <span className="d-block">{errors.name &&
                            <Error>{errors.name.message}</Error>}</span>

                            <input ref={register({
                                required: 'Please enter a website url'
                            })} className="full-width" type="url" id="" name="website" defaultValue={hasCompany() ? startup.company.website : ''}
                                   placeholder="Company website"/>
                            <span className="d-block">{errors.website &&
                            <Error>{errors.website.message}</Error>}</span>

                            <select ref={register({required: 'Please select a Location'})} name="location_id" id="" defaultValue={hasCompany() ? startup.company.location_id : ''}>
                                <option value="">Select Location</option>
                                {locations.map(({country, id}) => <option value={id} key={id}>{country}</option> )}
                            </select>

                            <label htmlFor="Social links" className="social-links">Social links</label>
                            <div className="d-flex flex-wrap">
                                <input ref={register} name="facebook" type="text" className="small-width mt-0" defaultValue={hasCompany() ? startup.company.facebook : ''}
                                       placeholder="Facebook"/>
                                <input ref={register} name="instagram" type="text" className="small-width mt-0" defaultValue={hasCompany() ? startup.company.instagram : ''}
                                       placeholder="Instagram"/>
                                <input ref={register} name="twitter" type="text" className="small-width mt-0" defaultValue={hasCompany() ? startup.company.twitter : ''}
                                       placeholder="Twitter"/>
                                <input ref={register} name="linkedin" type="text" className="small-width" defaultValue={hasCompany() ? startup.company.linkedin : ''}
                                       placeholder="LinkedIn"/>
                            </div>

                            <label htmlFor="About" className="business_summary">Business Summary</label>
                            <textarea ref={register} className="full-width mt-0" name="summary" id="" cols="30" defaultValue={hasCompany() ? startup.company.summary : ''}
                                      rows="5"/>

                            <label htmlFor="value-proposition">Value Proposition</label>
                            <textarea ref={register} className="full-width mt-0" name="value_proposition" defaultValue={hasCompany() ? startup.company.value_proposition : ''}
                                      id="value-proposition" cols="30" rows="5"/>

                            <label htmlFor="Video/Image">Video / Image of Picture</label>
                            <label id="video-upload">
                                <input className="input-file" title="&nbsp;" type="file" name="Video_image"
                                       required="" capture/>
                                Upload Video
                            </label>

                            <button className="btn btn-profile" type="submit">Save & Next</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <style jsx>{`
            input, select {
                margin-bottom: 0!important;
                margin-top: 4rem;
            }
            .btn {
                margin-top: 4rem;
            }
            .social-links, .business_summary {
                margin-top: 4rem;
            }
            .profile-pic {
                cursor:pointer;
                width: 300px;
            }
        `}</style>
    </>
}