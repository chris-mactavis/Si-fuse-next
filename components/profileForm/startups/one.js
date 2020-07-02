import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";
import {useForm} from "react-hook-form";
import Error from "../../UI/ErrorSpan";
import axiosInstance from "../../../config/axios";
import {loader} from "../../../store/actions/loader";
import Cookies from "js-cookie";
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import {showNotifier} from "../../../store/actions/notifier";

export default function ProfileOne({startup, locations}) {
    const dispatch = useDispatch();
    const token = Cookies.get('token');

    useEffect(() => {
        setProfilePicture({
            result: startup.profile && startup.profile.profile_pic_url ? startup.profile.profile_pic_url : '',
            filename: null,
            filetype: null,
            src: null,
            error: null,
        })

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

        $(".select2").select2({
            templateSelection: formatState
        });
    }, [])

    const hasProfile = () => startup.hasOwnProperty('profile') && startup.profile;

    const {register, handleSubmit, errors} = useForm();

    const [profilePicture, setProfilePicture] = useState({
        result: null,
        filename: null,
        filetype: null,
        src: null,
        error: null,
    });

    const [flag, setFlag] = useState('');

    const [adminError, setAdminError] = useState();

    const getAdminError = type => adminError && adminError.hasOwnProperty(type) ? adminError[type][0] : '';

    const nextPageHandler = async data => {
        dispatch(loader());

        let formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        if (profilePicture.filename) {
            formData.append('profile_pic', profilePicture.result);
        } else {
            formData.append('is_editing', 'true');
        }

        try {
            await axiosInstance.post('startups', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(loader());
            dispatch(incrementCurrentState());
        } catch (e) {
            dispatch(loader());
            dispatch(showNotifier(e.response.data.message, 'danger'));
            setAdminError(e.response.data.errors);
            console.log(e);
        }
    }

    const onChangePicture = value => {
        setProfilePicture(value);
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
                    <div className="col-lg-9 col-12">
                        <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                            <div className="numbers d-md-none num-alone">
                                <div className="number">1</div>
                                <p>Basic information</p>
                            </div>

                            <label htmlFor="profile-pic">Profile Picture</label>
                            <DropNCrop onChange={onChangePicture} cropperOptions={{aspectRatio: 1 / 1}}
                                       value={profilePicture}/>

                            <input ref={register({required: 'This field is required'})} type="hidden"
                                   defaultValue={profilePicture.result}/>
                            {
                                profilePicture.result ? (
                                    <>
                                        <img className="profile-pic img-fluid img-thumbnail mt-5"
                                             src={profilePicture.result}/>
                                    </>) : null
                            }
                            <span className="d-block">
                                {errors.profile_pic &&
                                <Error>Please upload a profile picture!</Error>}
                                {getAdminError('profile_pic') && <Error>{getAdminError('profile_pic')}</Error>}
                            </span>

                            <div className="d-flex">
                                <div className="input-group-container w-25 country-div">
                                    <select name="country_code" className="select2"
                                            ref={register({required: "This field is required"})}
                                            defaultValue={hasProfile() ? startup.profile.country_code : ''}>
                                        {
                                            locations.map(({id, country_area_code, country}) => <option key={id}
                                                                                                        value={id}>{country_area_code} - {country}</option>)
                                        }
                                    </select>
                                    {errors.country_code && <Error>{errors.country_code.message}</Error>}
                                </div>

                                <div className="input-group-container w-75 ml-4">
                                    <input ref={register({required: "This field is required"})}
                                           className="medium-width w-100"
                                           type="number" name="phone" id=""
                                           defaultValue={hasProfile() ? startup.profile.phone : ''}
                                           placeholder="Phone number"/>
                                    {errors.phone && <Error>{errors.phone.message}</Error>}
                                    {getAdminError('phone') && <Error>{getAdminError('phone')}</Error>}
                                </div>
                            </div>

                            <select name="gender"
                                    ref={register({required: "This field is required"})}
                                    className="w-100 small-width mt-0"
                                    defaultValue={hasProfile() ? startup.profile.gender.toLowerCase() : ''}>
                                <option value="">Sex</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                            {errors.gender && <Error>{errors.gender.message}</Error>}

                            <label htmlFor="About" className="about-label">About yourself</label>
                            <textarea ref={register({required: "This field is required"})} id="about"
                                      className="full-width mt-0" name="about" cols="30" rows="5"
                                      defaultValue={hasProfile() ? startup.profile.about : ''}/>
                            {errors.about && <Error>{errors.about.message}</Error>}

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
            .country-div {
                position: relative;
            }
            select.country-code {
                width: 90%;
                padding: 0.28rem 0;
                padding-left: 40px;
                background-position: 100%;
            }
            .flag {
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 35px;
                height: 35px;
                background-image: url(${flag ? flag : locations[0].flag});
                background-size: contain;
                background-repeat: no-repeat;
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