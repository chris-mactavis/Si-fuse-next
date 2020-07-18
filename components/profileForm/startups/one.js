import {useDispatch} from "react-redux";
import {incrementCurrentState, setCompanyProfileImage} from "../../../store/actions/profile";
import React, {useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Error from "../../UI/ErrorSpan";
import axiosInstance from "../../../config/axios";
import {loader} from "../../../store/actions/loader";
import Token from "../../../utils/Token";
import {showNotifier} from "../../../store/actions/notifier";
import StartupProfileHeader from "./StartupProfileHeader";
import Router from "next/router";
import Slim from "../../../public/slim/slim.react";
import {FilePond} from "react-filepond";

export default function ProfileOne({industries, startup, locations}) {
    const dispatch = useDispatch();
    const [size, setSize] = useState(startup.company && startup.company.hasOwnProperty('teams') ? startup.company.teams.length : 1);
    const [adminError, setAdminError] = useState();
    const [localImage, setLocalImage] = useState(null);

    const createArrayWithNumbers = length => {
        return Array.from({length}, (_, k) => k + 0);
    }
    const {register, handleSubmit, errors, getValues, formState, triggerValidation} = useForm();
    // const [profilePicture, setProfilePicture] = useState({
    //     result: null,
    //     filename: null,
    //     filetype: null,
    //     src: null,
    //     error: null,
    // });
    const hasCompany = () => startup.hasOwnProperty('company') && startup.company;
    const [profilePicture, setProfilePicture] = useState(hasCompany() ? startup.company.logo_url : '');

    const getAdminError = type => adminError && adminError.hasOwnProperty(type) ? adminError[type][0] : '';

    const submitHandler = async data => {
        let formData = new FormData();
        Object.keys(data).forEach(dataItem => {
            if (dataItem !== 'team') {
                formData.append(dataItem, data[dataItem])
            }
        });
        data.team.forEach(t => formData.append('team[]', t));
        formData.append('logo', profilePicture[0]);
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/company', formData, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(loader());
            dispatch(setCompanyProfileImage({companyProfileImage: response.data.company.logo_url, companyName: data.name}));
            dispatch(incrementCurrentState());
        } catch (e) {
            console.log(e)
            dispatch(showNotifier(e.response.data.message, 'danger'));
            setAdminError(e.response.data.errors);
            dispatch(loader());
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [profilePicture]);

    // // called when slim has initialized
    // const slimInit = (data, slim) => {
    //     // slim instance reference
    //     console.log(slim);
    //
    //     // current slim data object and slim reference
    //     console.log(data);
    // }

    const slimService = (formData, progress, success, failure, slim) => {
        // slim instance reference
        console.log(slim)

        // form data to post to server
        // set serviceFormat to "file" to receive an array of files
        setProfilePicture(formData)

        // call these methods to handle upload state
        // console.log(progress, success, failure)

        success('done');
    }

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
                                        <p>Your company</p>
                                    </div>

                                    <form onSubmit={handleSubmit(submitHandler)} className="profile-details">
                                        <div className="row">
                                            <div className="col-md-4">
                                                {/*<DropNCrop onChange={onChangePicture}*/}
                                                {/*           cropperOptions={{aspectRatio: 1 / 1}}*/}
                                                {/*           value={profilePicture}/>*/}

                                                {/*<FilePond*/}
                                                {/*    // ref={ref => (this.pond = ref)}*/}
                                                {/*    files={profilePicture}*/}
                                                {/*    allowMultiple={false}*/}
                                                {/*    labelIdle=""*/}
                                                {/*    name="files"*/}
                                                {/*    onupdatefiles={fileItems => {*/}
                                                {/*        setProfilePicture(fileItems.map(fileItem => fileItem.file))*/}
                                                {/*    }}*/}
                                                {/*/>*/}


                                                {
                                                    <Slim ratio="1:1"
                                                          service={slimService.bind(this)}
                                                          serviceFormat="file"
                                                          push={true}>
                                                        <img src={hasCompany() ? startup.company.logo_url : ''} alt=""/>
                                                        <input type="file" name="foo"/>
                                                    </Slim>
                                                }

                                                <input ref={register({required: 'This field is required'})}
                                                       type="hidden"
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
                                            </div>

                                            <div className="col-md-8">
                                                <div className="input-group-container">
                                                    <input className="full-width" type="text"
                                                           ref={register({required: 'Please enter a company name'})}
                                                           name="name" id=""
                                                           defaultValue={hasCompany() ? startup.company.name : ''}
                                                           placeholder="Company name"/>
                                                    <span className="d-block">
                                                        {errors.name && <Error>{errors.name.message}</Error>}
                                                        {getAdminError('name') &&
                                                        <Error>{getAdminError('name')}</Error>}
                                                    </span>
                                                </div>

                                                <div className="input-group-container">
                                                    <input ref={register({required: 'This field is required'})}
                                                           className="w-100 full-width" name="tagline"
                                                           placeholder="Company tagline"
                                                           defaultValue={hasCompany() ? startup.company.tagline : ''}/>
                                                    {errors.tagline && <Error>{errors.tagline.message}</Error>}
                                                </div>

                                                <div className="input-group-container">
                                                    <select ref={register({required: 'This field is required'})}
                                                            className="w-100 full-width mt-0" name="industry_id"
                                                            defaultValue={hasCompany() ? startup.company.industry_id : ''}>
                                                        <option value="">Industry</option>
                                                        {industries.map(({industry, id}) => <option key={id}
                                                                                                    value={id}>{industry}</option>)}
                                                    </select>
                                                    <span className="d-block">{errors.industry_id &&
                                                    <Error>{errors.industry_id.message}</Error>}</span>
                                                </div>

                                                <div className="input-group-container">
                                                    <div className="row align-items-center">
                                                        <div className="col-3">
                                                            <div>Date founded</div>
                                                        </div>
                                                        <div className="col-9">
                                                            <input ref={register({required: 'This field is required'})}
                                                                   className="w-100 full-width mt-0"
                                                                   name="doc" type="date" placeholder="Date of Creation"
                                                                   defaultValue={hasCompany() ? startup.company.doc : ''}/>
                                                            {errors.doc && <Error>{errors.doc.message}</Error>}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="input-group-container">
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
                                                </div>

                                                <div className="input-group-container">
                                                    <input
                                                        ref={register({required: 'Please enter your company email address'})}
                                                        className="w-100 full-width" type="email"
                                                        name="email"
                                                        placeholder="Company email address"
                                                        defaultValue={hasCompany() ? startup.company.email : ''}/>
                                                    <span className="d-block">{errors.email &&
                                                    <Error>{errors.email.message}</Error>}</span>
                                                </div>

                                                <div className="input-group-container">
                                                    <input ref={register({required: 'This field is required'})}
                                                           className="w-100 full-width" type="text"
                                                           name="phone"
                                                           placeholder="Company phone number"
                                                           defaultValue={hasCompany() ? startup.company.phone : ''}/>
                                                    <span className="d-block">{errors.phone &&
                                                    <Error>{errors.phone.message}</Error>}</span>
                                                </div>

                                                <div className="input-group-container">
                                                    <input ref={register({required: 'This field is required'})}
                                                           className="w-100 full-width mt-0"
                                                           name="address"
                                                           placeholder="Company address"
                                                           defaultValue={hasCompany() ? startup.company.address : ''}/>
                                                    <span className="d-block">{errors.address &&
                                                    <Error>{errors.address.message}</Error>}</span>
                                                </div>

                                                <div className="input-group-container">
                                                    <select ref={register({required: 'Please select a Location'})}
                                                            name="location_id" id=""
                                                            defaultValue={hasCompany() ? startup.company.location_id : ''}>
                                                        <option value="">Country of operation</option>
                                                        {locations.filter(country => country.continent_code === 'AF').map(({country, id}) =>
                                                            <option value={id} key={id}>{country}</option>)}
                                                    </select>
                                                    {errors.location_id && <Error>{errors.location_id.message}</Error>}
                                                    {getAdminError('location_id') &&
                                                    <Error>{getAdminError('location_id')}</Error>}
                                                </div>

                                                <div className="input-group-container">
                                                    <select ref={register({required: 'This field is required'})}
                                                            className="w-100 full-width"
                                                            name="no_of_team"
                                                            defaultValue={hasCompany() ? startup.company.no_of_team : ''}>
                                                        <option value="">Team size</option>
                                                        <option value="1-10">1 - 10</option>
                                                        <option value="11-50">11 - 50</option>
                                                        <option value="50 and above">50 and above</option>
                                                    </select>
                                                    <span className="d-block">{errors.no_of_team &&
                                                    <Error>{errors.no_of_team.message}</Error>}</span>
                                                </div>

                                                <div className="input-group-container">
                                                    {
                                                        createArrayWithNumbers(size).map(index => <div
                                                                className='team-founders d-flex justify-content-between align-items-center'
                                                                key={index}>
                                                                <input type="text"
                                                                       ref={register({required: 'This field is required'})}
                                                                       name={`team[${index}]`}
                                                                       className="small-width-sm mr-3 w-100"
                                                                       placeholder="Founder name"
                                                                       defaultValue={hasCompany() && startup.company.members.length > 0 ? startup.company.members[index] : ''}/>

                                                                <input type="text"
                                                                       ref={register({required: 'This field is required'})}
                                                                       name={`role[${index}]`}
                                                                       className="small-width-sm mx-3 w-100"
                                                                       placeholder="Role(s)"
                                                                       defaultValue={hasCompany() && startup.company.roles.length > 0 ? startup.company.roles[index] : ''}/>

                                                                <div>
                                                                    {
                                                                        index < size - 1 && <div className="team-button"
                                                                                                 onClick={() => setSize(size - 1)}>
                                                                            <img src="/images/icon/minus.svg"/>
                                                                        </div>
                                                                    }

                                                                    {
                                                                        index === size - 1 && <div className="team-button"
                                                                                                   onClick={() => setSize(size + 1)}>
                                                                            <img src="/images/icon/plus.svg"/>
                                                                        </div>
                                                                    }

                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>

                                                <div className="input-group-container">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="facebook social mb-10">
                                                                <input
                                                                    ref={register({required: 'This field is required'})}
                                                                    name="facebook" type="text"
                                                                    className="w-100"
                                                                    defaultValue={hasCompany() ? startup.company.facebook : ''}
                                                                    placeholder="Facebook profile url"/>
                                                                <span className="d-block">{errors.facebook &&
                                                                <Error>{errors.facebook.message}</Error>}</span>
                                                            </div>
                                                        </div>

                                                        <div className="pl-0 col-6">
                                                            <div className="instagram social mb-10">
                                                                <input
                                                                    ref={register({required: 'This field is required'})}
                                                                    name="instagram" type="text"
                                                                    className="w-100"
                                                                    defaultValue={hasCompany() ? startup.company.instagram : ''}
                                                                    placeholder="Instagram profile url"/>
                                                                <span className="d-block">{errors.instagram &&
                                                                <Error>{errors.instagram.message}</Error>}</span>
                                                            </div>
                                                        </div>

                                                        <div className="col-6">
                                                            <div className="twitter social">
                                                                <input
                                                                    ref={register({required: 'This field is required'})}
                                                                    name="twitter" type="text"
                                                                    className="w-100"
                                                                    defaultValue={hasCompany() ? startup.company.twitter : ''}
                                                                    placeholder="Twitter profile url"/>
                                                                <span className="d-block">{errors.twitter &&
                                                                <Error>{errors.twitter.message}</Error>}</span>
                                                            </div>
                                                        </div>

                                                        <div className="pl-0 col-6">
                                                            <div className="linked-in social">
                                                                <input
                                                                    ref={register({required: 'This field is required'})}
                                                                    name="linkedin" type="text"
                                                                    className="w-100"
                                                                    defaultValue={hasCompany() ? startup.company.linkedin : ''}
                                                                    placeholder="LinkedIn profile url"/>
                                                                <span className="d-block">{errors.linkedin &&
                                                                <Error>{errors.linkedin.message}</Error>}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="input-group-container">
                                                    <textarea ref={register({required: 'This field is required'})}
                                                              className="full-width mt-0" name="summary"
                                                              id="" cols="30"
                                                              defaultValue={hasCompany() ? startup.company.summary : ''}
                                                              placeholder="Company summary" rows="4"/>
                                                    <span className="d-block">{errors.summary &&
                                                    <Error>{errors.summary.message}</Error>}</span>
                                                </div>

                                                {/*<div className="input-group-container">*/}
                                                {/*    <textarea ref={register} className="full-width mt-0" name="value_proposition"*/}
                                                {/*              defaultValue={hasCompany() ? startup.company.value_proposition : ''}*/}
                                                {/*              placeholder="Value Proposition" id="value-proposition" cols="30" rows="4"/>*/}
                                                {/*</div>*/}

                                                <div className="input-group-container">
                                                    <select ref={register({required: 'This field is required'})}
                                                            className="w-100 full-width mt-0"
                                                            name="clients_serviced"
                                                            defaultValue={hasCompany() ? startup.company.clients_serviced : ''}>
                                                        <option value="">Clients Serviced</option>
                                                        <option value="B2B">B2B</option>
                                                        <option value="B2B2B">B2B2B</option>
                                                        <option value="B2B2C">B2B2C</option>
                                                        <option value="B2B2G">B2B2G</option>
                                                        <option value="B2C">B2C</option>
                                                        <option value="C2C">C2C</option>
                                                        <option value="Govt. (B2G)">Govt. (B2G)</option>
                                                        <option value="Non Profit">Non Profit</option>
                                                    </select>
                                                    <span className="d-block">{errors.clients_serviced &&
                                                    <Error>{errors.clients_serviced.message}</Error>}</span>
                                                </div>

                                                <div className="input-group-container">
                                                    <select name="company_stage"
                                                            ref={register({required: 'This field is required'})}
                                                            defaultValue={hasCompany() ? startup.company.company_stage : ''}>
                                                        <option value="">Company Stage</option>
                                                        <option value="concept">Concept</option>
                                                        <option value="early stage">Early stage</option>
                                                        <option value="scaling">Scaling</option>
                                                        <option value="established">Established</option>
                                                    </select>
                                                    <span className="d-block">{errors.company_stage &&
                                                    <Error>{errors.company_stage.message}</Error>}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <button className="btn prev mr-auto"
                                                    onClick={() => Router.push('/profile/edit-levels')} type="button">
                                                <span/> Prev
                                            </button>

                                            <button className="btn next ml-auto" type="submit">
                                                Next <span/>
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
            input, select {
                // margin-bottom: 0!important;
                // margin-top: 4rem;
            }
            // .btn {
            //     margin-top: 4rem;
            // }
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