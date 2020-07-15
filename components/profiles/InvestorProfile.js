import React from "react";
import {useDispatch} from "react-redux";
import Router from "next/router";
import {showImageViewer} from "../../store/actions/imageViewer";
import StartupCard from "../startups/startupCard";

const InvestorProfile = ({profile, interests, connections}) => {
    const dispatch = useDispatch();

    const goTo = url => window.open(url.includes('http') ? url : `http://${url}`, '_blank');

    return <>
        <section className="startup-content">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="investors-description">
                            <div className="investors-profile">
                                <img src={profile.profile_pic_url}
                                     onClick={() => dispatch(showImageViewer(profile.profile_pic_url))} alt=""
                                     className="img-fluid img-profile"/>
                                <p className="investor-name">{`${profile.user.first_name} ${profile.user.last_name}`}</p>
                                <p>
                                    <img className="location-img" src="/images/icon/location.svg" alt=""/> {profile.user.country ? profile.user.country.country : ''}
                                </p>
                                <p className="pointer" onClick={() => goTo(profile.website)}>{profile.website}</p>
                                <button className="edit-investors-profile" onClick={() => Router.push('/profile/edit')}>Edit Profile</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="investors-description">
                            <div className="profile-details">
                                <p className="p-head">About</p>
                                <p>{profile.about}</p>
                                <p className="p-head">Industry</p>
                                <ul>
                                    <li>{interests.industry}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="events discover investors-bg">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Connections</h2>
                    </div>
                </div>

                <div className="row">

                    {
                        connections.length > 0 && <div className="row">
                            {
                                connections.map(user => {
                                    console.log(user);
                                    return <StartupCard key={user.id} startup={user}/>
                                })
                            }
                        </div>
                    }

                </div>

                {/*<div className="text-center button mt-5">*/}
                {/*    <a href="#" className="btn">Load more</a>*/}
                {/*</div>*/}
            </div>
        </section>
    </>
};

export default InvestorProfile;