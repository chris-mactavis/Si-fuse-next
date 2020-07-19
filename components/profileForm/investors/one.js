import DropNCrop from "@synapsestudios/react-drop-n-crop";
import Error from "../../UI/ErrorSpan";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {incrementCurrentState} from "../../../store/actions/profile";
import {showNotifier} from "../../../store/actions/notifier";
import InvestorProfileHeader from "./InvestorProfileHeader";
import Slim from "../../../public/slim/slim.react";

const InvestorBasicInfo = ({investor, locations}) => {
    console.log(investor);

    const dispatch = useDispatch();

    const {register, handleSubmit, errors} = useForm();

    const [adminError, setAdminError] = useState();

    const hasProfilePic = () => investor.hasOwnProperty('profile') && investor.profile;

    const getAdminError = type => adminError && adminError.hasOwnProperty(type) ? adminError[type][0] : '';

    const [profilePicture, setProfilePicture] = useState([]);
    // const onChangePicture = value => {
    //     setProfilePicture(value);
    // }
    const nextPageHandler = async data => {
        if (profilePicture.filename) {
            data['profile_pic'] = profilePicture.result;
        } else {
            data['is_editing'] = true;
        }
        dispatch(loader());
        try {
            await axiosInstance.post('investors', data, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(loader());
            dispatch(incrementCurrentState());
        } catch (e) {
            console.log(e);
            dispatch(showNotifier(e.response.data.message, 'danger'));
            setAdminError(e.response.data.errors);
            dispatch(loader());
        }
    }

    const hasProfile = () => investor.hasOwnProperty('profile') && investor.profile;

    useEffect(() => {
        setProfilePicture([]);

        function formatState(state) {
            if (!state.id) {
                return state.text;
            }

            const baseUrl = locations.find(location => location.id === +state.id).flag

            const $state = $(
                '<span><img class="img-flag" /> <span></span></span>'
            );

            // Use .text() instead of HTML string concatenation to avoid script injection issues
            $state.find("span").text(state.text.split('-')[0]);
            $state.find("img").attr("src", baseUrl);

            return $state;
        };

        setTimeout(() => {
            $(".select2").select2({
                templateSelection: formatState
            });
        }, 2000);

    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const slimService = (formData, progress, success, failure, slim) => {
        console.log(slim)

        setProfilePicture(formData)

        console.log(progress, success, failure)
    }

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
                                        <p>Basic Information</p>
                                    </div>

                                    <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                                        <div className="row">
                                            <div className="col-md-4 profile-pic">
                                                {
                                                    <Slim ratio="1:1"
                                                          service={slimService.bind(this)}
                                                          serviceFormat="file"
                                                          edit="true"
                                                          push={true}
                                                          label="Profile Picture <br> (Click here to upload)"
                                                    >
                                                        {/*didInit={ slimInit.bind(this) }>*/}
                                                        <img src={hasProfilePic() ? investor.profile.profile_pic_url : null} alt=""/>
                                                        <input type="file" name="foo"/>
                                                    </Slim>
                                                }

                                                <input ref={register({required: 'This field is required'})} type="hidden"
                                                       defaultValue={profilePicture.result}/>
                                                {
                                                    profilePicture.result ? (
                                                        <>
                                                            <img className="profile-pic img-fluid img-thumbnail mt-5"
                                                                 src={profilePicture.result}/>
                                                        </>) : null
                                                }
                                                <span className="d-block">{errors.profile_pic &&
                                                <Error>Please upload a profile picture!</Error>}</span>
                                            </div>

                                            <div className="col-md-8">
                                                <div className="input-group-container">
                                                    <input type="text" name="website" ref={
                                                        register({
                                                            pattern: {
                                                                value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                                                                message: 'Please enter a valid URL'
                                                            }
                                                        })
                                                    } placeholder="Company Website" defaultValue={hasProfile() ? investor.profile.website : ''}
                                                           className="full-width w-100"/>
                                                    {errors.website && <Error>{errors.website.message}</Error>}
                                                </div>

                                                <div className="input-group-container">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="facebook social mb-10">
                                                                <input ref={register({required: 'This field is required'})} name="facebook" type="text"
                                                                       className="w-100" defaultValue={hasProfile() ? investor.profile.facebook : ''}
                                                                       placeholder="Facebook profile url"/>
                                                                <span className="d-block">{errors.facebook && <Error>{errors.facebook.message}</Error>}</span>
                                                            </div>
                                                        </div>

                                                        <div className="pl-0 col-6">
                                                            <div className="instagram social mb-10">
                                                                <input ref={register} name="instagram" type="text"
                                                                       className="w-100"
                                                                       defaultValue={hasProfile() ? investor.profile.instagram : ''}
                                                                       placeholder="Instagram profile url"/>
                                                            </div>
                                                        </div>

                                                        <div className="col-6">
                                                            <div className="twitter social">
                                                                <input ref={register} name="twitter" type="text"
                                                                       className="w-100"
                                                                       defaultValue={hasProfile() ? investor.profile.twitter : ''}
                                                                       placeholder="Twitter profile url"/>
                                                            </div>
                                                        </div>

                                                        <div className="col-6 pl-0">
                                                            <div className="linked-in social">
                                                                <input ref={register} name="linkedin" type="text"
                                                                       className="w-100"
                                                                       defaultValue={hasProfile() ? investor.profile.linkedin : ''}
                                                                       placeholder="LinkedIn profile url"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="input-group-container">
                                                    <div className="row">
                                                        <div className="col-3 pr-0">
                                                            <select name="country_code" className="select2 country"
                                                                    ref={register({required: "This field is required"})}
                                                                    defaultValue={hasProfile() ? investor.profile.country_code : ''}>
                                                                {
                                                                    locations.map(({id, country_area_code, country}) => <option key={id}
                                                                                                                                value={id}>{country_area_code} - {country}</option>)
                                                                }
                                                            </select>
                                                            {errors.country_code && <Error>{errors.country_code.message}</Error>}
                                                        </div>

                                                        <div className="col-9">
                                                            <input ref={register({required: "This field is required"})}
                                                                   className="w-100"
                                                                   type="number" name="phone" id=""
                                                                   placeholder="Phone number"
                                                                   defaultValue={hasProfile() ? investor.profile.phone : ''}/>
                                                            {errors.phone && <Error>{errors.phone.message}</Error>}
                                                            {getAdminError('phone') && <Error>{getAdminError('phone')}</Error>}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="gender" ref={register({required: 'This field is required'})}
                                                            defaultValue={hasProfile() ? investor.profile.gender : ''}>
                                                        <option value="">Sex</option>
                                                        <option value="female">Female</option>
                                                        <option value="male">Male</option>
                                                    </select>
                                                    {errors.gender && <Error>{errors.gender.message}</Error>}
                                                </div>

                                                <div className="input-group-container">
                                                    <select ref={register({required: 'Please select a Location'})} name="location_id"
                                                            defaultValue={hasProfile() ? investor.profile.location_id : ''}>
                                                        <option value="">Select Location</option>
                                                        {locations.map(({country, id}) => <option value={id} key={id}>{country}</option>)}
                                                    </select>
                                                    {/*{errors.gender && <Error>{errors.gender.message}</Error>}*/}
                                                </div>

                                                <div className="input-group-container">
                                                    <textarea ref={register({required: 'This field is required'})} className="full-width mt-0"
                                                              name="about" id="" placeholder="About yourself"
                                                              defaultValue={hasProfile() ? investor.profile.about : ''}
                                                              rows="4"/>
                                                    {errors.about && <Error>{errors.about.message}</Error>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex">
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
            // .country-div {
            //     position: relative;
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

export default InvestorBasicInfo;