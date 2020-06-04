import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {incrementCurrentState} from "../../../store/actions/profile";
import {useForm} from "react-hook-form";
import Error from "../../UI/ErrorSpan";
import axiosInstance from "../../../config/axios";
import {loader} from "../../../store/actions/loader";
import Cookies from "js-cookie";

import DropNCrop from '@synapsestudios/react-drop-n-crop';

export default function ProfileOne({startup}) {
    const dispatch = useDispatch();
    const token = Cookies.get('token');

    useEffect(() => {
        setProfilePicture({
            result: startup.profile.profile_pic_url,
            filename: null,
            filetype: null,
            src: null,
            error: null,
        })
    }, [])

    const hasProfile = () => startup.hasOwnProperty('profile') && startup.profile;

    const nextPageHandler = async data => {
        dispatch(loader());

        let formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        try {
            const {data: response} = await axiosInstance.post('startups', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(loader());
            dispatch(incrementCurrentState());
        } catch (e) {
            dispatch(loader());
            console.log(e);
        }
    }

    const {register, handleSubmit, errors} = useForm();
    const [profilePicture, setProfilePicture] = useState({
        result: null,
        filename: null,
        filetype: null,
        src: null,
        error: null,
    });

    const onChangePicture = value => {
        setProfilePicture(value);
        console.log(value);
    }

    return <>
        <section className="profile single-post">
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
                        <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                            <label htmlFor="profile-pic">Profile Picture</label>
                            <DropNCrop onChange={onChangePicture} cropperOptions={{aspectRatio: 1 / 1}}
                                       value={profilePicture}/>

                            <input ref={register({required: 'This field is required'})} type="hidden"
                                   defaultValue={profilePicture.result} name="profile_pic"/>
                            {
                                profilePicture.result ? (
                                    <>
                                        <img className="profile-pic img-fluid img-thumbnail mt-5"
                                             src={profilePicture.result}/>
                                    </>) : null
                            }
                            <span className="d-block">{errors.profile_pic &&
                            <Error>Please upload a profile picture!</Error>}</span>

                            <div className="d-flex">
                                <div className="input-group-container w-25">
                                    <input ref={register({required: "This field is required"})}
                                           className="country-code small-width"
                                           type="number" name="country_code" id=""
                                           defaultValue={hasProfile() ? startup.profile.country_code : ''}
                                           placeholder="Country code"/>
                                    {errors.country_code && <Error>{errors.country_code.message}</Error>}
                                </div>

                                <div className="input-group-container w-75">
                                    <input ref={register({required: "This field is required"})}
                                           className="medium-width w-100"
                                           type="number" name="phone" id=""
                                           defaultValue={hasProfile() ? startup.profile.phone : ''}
                                           placeholder="Phone number"/>
                                    {errors.phone && <Error>{errors.phone.message}</Error>}
                                </div>
                            </div>

                            <input ref={register({required: "This field is required"})} className="full-width"
                                   type="text" name="gender" id="" placeholder="Sex"
                                   defaultValue={hasProfile() ? startup.profile.gender.toUpperCase() : ''}/>
                            {errors.gender && <Error>{errors.gender.message}</Error>}

                            <label htmlFor="About" className="about-label">About yourself</label>
                            <textarea ref={register({required: "This field is required"})} id="about"
                                      className="full-width mt-0" name="about" cols="30" rows="5"
                                      defaultValue={hasProfile() ? startup.profile.about : ''}/>
                            {errors.about && <Error>{errors.about.message}</Error>}

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
            .about-label {
                margin-top: 4rem;
            }
            .profile-pic {
                cursor:pointer;
                width: 300px;
            }
        `}</style>
    </>
}