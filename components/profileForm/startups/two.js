import {useDispatch} from "react-redux";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";
import React, {useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Error from "../../UI/ErrorSpan";
import DropNCrop from "@synapsestudios/react-drop-n-crop";
import axiosInstance from "../../../config/axios";
import {loader} from "../../../store/actions/loader";
import Token from "../../../utils/Token";

export default function ProfileTwo({industries, startup, locations}) {
    const dispatch = useDispatch();
    const [size, setSize] = useState(startup.company.teams.length);

    const createArrayWithNumbers = length => {
        return Array.from({length}, (_, k) => k + 0);
    }
    const {register, handleSubmit, errors, getValues, formState, triggerValidation} = useForm();
    const [profilePicture, setProfilePicture] = useState({
        result: null,
        filename: null,
        filetype: null,
        src: null,
        error: null,
    });
    console.log(locations);
    const hasCompany = () => startup.hasOwnProperty('company') && startup.company;

    useEffect(() => {
        setProfilePicture({
            result: startup.company && startup.company.logo_url ? startup.company.logo_url : '',
            filename: null,
            filetype: null,
            src: null,
            error: null,
        })
    }, []);

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
        if (profilePicture.filename) {
            data['logo'] = profilePicture.result;
        } else {
            data['is_editing'] = true;
        }
        dispatch(loader());
        try {
            await axiosInstance.post('startups/company', data, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(loader());
            dispatch(incrementCurrentState());
        } catch (e) {
            console.log(e)
            dispatch(loader());
        }
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
                            <div className="numbers d-md-none num-alone">
                                <div className="number">2</div>
                                <p>Your company</p>
                            </div>
                            <label htmlFor="profile-pic">Company Logo</label>
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
                            <span className="d-block">{errors.logo &&
                            <Error>Please upload a profile picture!</Error>}</span>

                            <label htmlFor="industry" className="mt-4">Your industry</label>
                            <select ref={register({required: 'This field is required'})}
                                    className="w-100 full-width mt-0" name="industry_id"
                                    defaultValue={hasCompany() ? startup.company.industry_id : ''}>
                                <option value="">Your Industry</option>
                                {
                                    industries.map(({industry, id}) => <option key={id} value={id}>{industry}</option>)
                                }
                            </select>
                            <span className="d-block">{errors.industry_id &&
                            <Error>{errors.industry_id.message}</Error>}</span>

                            <input ref={register} className="w-100 full-width" name="tagline"
                                   placeholder="Enter your Tagline"
                                   defaultValue={hasCompany() ? startup.company.tagline : ''}/>

                            <label htmlFor="" className="mt-5">Date of Creation</label>
                            <input ref={register} className="w-100 full-width mt-0" name="doc" type="date"
                                   placeholder="Date of Creation"
                                   defaultValue={hasCompany() ? startup.company.doc : ''}/>

                            <input className="full-width" type="text"
                                   ref={register({required: 'Please enter a company name'})} name="name" id=""
                                   defaultValue={hasCompany() ? startup.company.name : ''}
                                   placeholder="Company name"/>
                            <span className="d-block">{errors.name &&
                            <Error>{errors.name.message}</Error>}</span>

                            <input ref={register({
                                required: 'Please enter a website url',
                                pattern: {
                                    value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                                    message: 'Please enter a valid URL'
                                }
                            })} className="full-width" type="text" id="" name="website"
                                   defaultValue={hasCompany() ? startup.company.website : ''}
                                   placeholder="Company website"/>
                            <span className="d-block">{errors.website &&
                            <Error>{errors.website.message}</Error>}</span>

                            <select ref={register({required: 'Please select a Location'})} name="location_id" id=""
                                    defaultValue={hasCompany() ? startup.company.location_id : ''}>
                                <option value="">Select Country</option>
                                {locations.filter(country => country.continent_code === 'AF').map(({country, id}) => <option value={id} key={id}>{country}</option>)}
                            </select>

                            <input ref={register} className="w-100 full-width" type="email" name="email"
                                   placeholder="Company Email Address"
                                   defaultValue={hasCompany() ? startup.company.email : ''}/>

                            <input ref={register} className="w-100 full-width" type="text" name="phone"
                                   placeholder="Company Phone Number"
                                   defaultValue={hasCompany() ? startup.company.phone : ''}/>

                            <label htmlFor="" className="business_summary">Company Address</label>
                            <textarea ref={register} className="w-100 full-width" name="address" rows="5"
                                      placeholder="Company Address"
                                      defaultValue={hasCompany() ? startup.company.address : ''}/>

                            <select ref={register} className="w-100 full-width mt-0" name="no_of_team"
                                    defaultValue={hasCompany() ? startup.company.no_of_team : ''}>
                                <option>Number of Team</option>
                                <option value="1-10">1 - 10</option>
                                <option value="11-50">11 - 50</option>
                                <option value="50 and above">50 and above</option>
                            </select>

                            <label htmlFor="" className="business_summary mb-0">Team Members and Roles</label>
                            {
                                createArrayWithNumbers(size).map(index => <div
                                        className='d-flex justify-content-between align-items-end' key={index}>
                                        <input type="text" ref={register({required: 'This field is required'})}
                                               name={`team[${index}]`} className="small-width-sm mr-3 mt-4 w-100"
                                               placeholder="Team Members" defaultValue={hasCompany() && startup.company.members.length > 0 ? startup.company.members[index] : ''}/>

                                        <input type="text" ref={register({required: 'This field is required'})}
                                               name={`role[${index}]`} className="small-width-sm mx-3 mt-4 w-100"
                                               placeholder="Roles" defaultValue={hasCompany() && startup.company.roles.length > 0 ? startup.company.roles[index] : ''}/>

                                        <div>
                                            {
                                                index < size - 1 && <div className="team-button minus"
                                                     onClick={() => setSize(size - 1)}></div>
                                            }

                                            {
                                                index === size - 1 && <div className="team-button plus" onClick={() => setSize(size + 1)}></div>
                                            }

                                        </div>
                                    </div>
                                )}

                            <label htmlFor="Social links" className="business_summary">Social links</label>
                            <div className="d-flex flex-column social-links-input">
                                <div className="d-flex justify-content-between">
                                    <div className="link-container facebook w-100">
                                        <input ref={register} name="facebook" type="text"
                                               className="small-width-sm mt-0 mr-3"
                                               defaultValue={hasCompany() ? startup.company.facebook : ''}
                                               placeholder="Facebook"/>
                                    </div>

                                    <div className="link-container second instagram w-100">
                                        <input ref={register} name="instagram" type="text"
                                               className="small-width-sm mt-0 ml-3"
                                               defaultValue={hasCompany() ? startup.company.instagram : ''}
                                               placeholder="Instagram"/>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <div className="link-container twitter w-100">
                                        <input ref={register} name="twitter" type="text"
                                               className="small-width-sm mt-2 mr-3"
                                               defaultValue={hasCompany() ? startup.company.twitter : ''}
                                               placeholder="Twitter"/>
                                    </div>

                                    <div className="link-container second linked-in w-100">
                                        <input ref={register} name="linkedin" type="text"
                                               className="small-width-sm mt-2 ml-3"
                                               defaultValue={hasCompany() ? startup.company.linkedin : ''}
                                               placeholder="LinkedIn"/>
                                    </div>
                                </div>
                            </div>

                            <label htmlFor="About" className="business_summary">Business Summary</label>
                            <textarea ref={register} className="full-width mt-0" name="summary" id="" cols="30"
                                      defaultValue={hasCompany() ? startup.company.summary : ''}
                                      rows="5"/>

                            <label htmlFor="business_summary">Value Proposition</label>
                            <textarea ref={register} className="full-width mt-0" name="value_proposition"
                                      defaultValue={hasCompany() ? startup.company.value_proposition : ''}
                                      id="value-proposition" cols="30" rows="5"/>

                            <select ref={register} multiple className="w-100 full-width mt-0" name="clients_serviced"
                                    defaultValue={hasCompany() ? startup.company.clients_serviced : ''}>
                                <option>Clients Serviced (Multiple Option choice)</option>
                                <option value="B2B">B2B</option>
                                <option value="B2B2B">B2B2B</option>
                                <option value="B2B2C">B2B2C</option>
                                <option value="B2B2G">B2B2G</option>
                                <option value="B2C">B2C</option>
                                <option value="C2C">C2C</option>
                                <option value="Govt. (B2G)">Govt. (B2G)</option>
                                <option value="Non Profit">Non Profit</option>
                            </select>

                            <select name="company_stage" ref={register}
                                    defaultValue={hasCompany() ? startup.company.company_stage : ''}>
                                <option value="">Company Stage</option>
                                <option value="concept">Concept</option>
                                <option value="early stage">Early stage</option>
                                <option value="scaling">Scaling</option>
                                <option value="established">Established</option>
                            </select>

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
            input, select {
                margin-bottom: 0!important;
                margin-top: 4rem;
            }
            .btn {
                margin-top: 4rem;
            }
            .business_summary {
                margin-top: 4rem;
            }
            .profile-pic {
                cursor:pointer;
                width: 300px;
            }
        `}</style>
    </>
}