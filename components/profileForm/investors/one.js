import DropNCrop from "@synapsestudios/react-drop-n-crop";
import Error from "../../UI/ErrorSpan";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {incrementCurrentState} from "../../../store/actions/profile";

const InvestorBasicInfo = ({investor, locations}) => {
    const dispatch = useDispatch();

    const {register, handleSubmit, errors} = useForm();
    const [flag, setFlag] = useState('');

    const [profilePicture, setProfilePicture] = useState({
        result: null,
        filename: null,
        filetype: null,
        src: null,
        error: null,
    });
    const onChangePicture = value => {
        setProfilePicture(value);
    }
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
            dispatch(loader());
        }
    }

    const hasProfile = () => investor.hasOwnProperty('profile') && investor.profile;

    useEffect(() => {
        setProfilePicture({
            result: hasProfile() ? investor.profile.profile_pic_url : '',
            filename: null,
            filetype: null,
            src: null,
            error: null,
        })
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                            <p className="fade">Startup Preference</p>
                        </div>

                        <div className="numbers only">
                            <div className="number">3</div>
                            <p className="">More About You</p>
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
                            <span className="d-block">{errors.profile_pic &&
                            <Error>Please upload a profile picture!</Error>}</span>

                            <input type="text" name="website" ref={
                                register({
                                    pattern: {
                                        value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                                        message: 'Please enter a valid URL'
                                    }
                                })
                            } placeholder="Company Website" defaultValue={hasProfile() ? investor.profile.website : ''} className="full-width w-100" />
                                {errors.website && <Error>{errors.website.message}</Error>}

                            {/*<div className="d-flex">*/}
                            {/*    <div className="input-group-container w-50 pr-3">*/}
                            {/*        <input ref={register({required: "This field is required"})} className="full-width"*/}
                            {/*               type="text" name="first_name" id="" placeholder="First Name"*/}
                            {/*        />*/}
                            {/*        {errors.first_name && <Error>{errors.first_name.message}</Error>}*/}
                            {/*    </div>*/}

                            {/*    <div className="input-group-container w-50 pl-3">*/}
                            {/*        <input ref={register({required: "This field is required"})} className="full-width"*/}
                            {/*               type="text" name="last_name" id="" placeholder="Last Name"*/}
                            {/*        />*/}
                            {/*        {errors.last_name && <Error>{errors.last_name.message}</Error>}*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <label htmlFor="Social links" className="social-links mt-4">Social links</label>
                            <div className="d-flex flex-column social-links-input">
                                <div className="d-flex justify-content-between">
                                    <div className="link-container facebook">
                                        <input ref={register} name="facebook" type="text"
                                               className="small-width-sm mt-0 mr-3"
                                               defaultValue={hasProfile() ? investor.profile.facebook : ''}
                                               placeholder="Facebook"/>
                                    </div>

                                    <div className="link-container second instagram">
                                        <input ref={register} name="instagram" type="text"
                                               className="small-width-sm mt-0 ml-3"
                                               defaultValue={hasProfile() ? investor.profile.instagram : ''}
                                               placeholder="Instagram"/>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <div className="link-container twitter">
                                        <input ref={register} name="twitter" type="text"
                                               className="small-width-sm mt-2 mr-3"
                                               defaultValue={hasProfile() ? investor.profile.twitter : ''}
                                               placeholder="Twitter"/>
                                    </div>

                                    <div className="link-container second linked-in">
                                        <input ref={register} name="linkedin" type="text"
                                               className="small-width-sm mt-2 ml-3"
                                               defaultValue={hasProfile() ? investor.profile.linkedin : ''}
                                               placeholder="LinkedIn"/>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex mt-5">
                                <div className="input-group-container w-25 country-div">
                                    <select name="country_code"
                                            onChange={(e) => {
                                                setFlag(locations.find(location => location.id === +e.target.value).flag);
                                            }}
                                            ref={register({required: "This field is required"})}
                                            className="country-code small-width mt-0"
                                            defaultValue={hasProfile() ? investor.profile.country_code : ''}>
                                        {
                                            locations.map(({id, country_area_code}) => <option key={id}
                                                                                               value={id}>{country_area_code}</option>)
                                        }
                                    </select>
                                    <div className="flag"/>
                                    {errors.country_code && <Error>{errors.country_code.message}</Error>}
                                </div>

                                <div className="input-group-container w-75">
                                    <input ref={register({required: "This field is required"})}
                                           className="medium-width w-100 mt-0"
                                           type="number" name="phone" id=""
                                           placeholder="Phone number" defaultValue={hasProfile() ? investor.profile.phone : ''}/>
                                    {errors.phone && <Error>{errors.phone.message}</Error>}
                                </div>
                            </div>

                            <select name="gender" ref={register({required: 'This field is required'})} defaultValue={hasProfile() ? investor.profile.gender : ''} >
                                <option value="">Sex</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                            {errors.gender && <Error>{errors.gender.message}</Error>}

                            <select ref={register({required: 'Please select a Location'})} name="location_id" defaultValue={hasProfile() ? investor.profile.location_id : ''}>
                                <option value="">Select Location</option>
                                {locations.map(({country, id}) => <option value={id} key={id}>{country}</option> )}
                            </select>
                            {/*{errors.gender && <Error>{errors.gender.message}</Error>}*/}

                            <label className="industry-label">About yourself (200 words)</label>
                            <textarea ref={register({required: 'This field is required'})} className="full-width mt-0" name="about" id="" cols="30" defaultValue={hasProfile() ? investor.profile.about : ''}
                                      rows="5"/>
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

export default InvestorBasicInfo;