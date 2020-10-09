import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import Router from "next/router";
import {showImageViewer} from "../../store/actions/imageViewer";
import StartupCard from "../startups/startupCard";
import StartupProfileLevels from "./StartupLevels";

const InvestorProfile = ({profile, interests, connections}) => {
    const dispatch = useDispatch();

    const goTo = url => window.open(url.includes('http') ? url : `http://${url}`, '_blank');

    useEffect(() => {
        const overviewBtn = $('#overview-btn');
        const connectionsBtn = $('#connections-btn');

        if ($(window).width() > 768) {
            $(window).scroll(function (e) {
                const $el = $('#sidebar-scroller');
                const isPositionFixed = ($el.css('position') === 'fixed');
                if ($(this).scrollTop() > 140 && !isPositionFixed) {
                    $el.css({'position': 'fixed', 'top': '0px'});
                }
                if ($(this).scrollTop() < 140 && isPositionFixed) {
                    $el.css({'position': 'static', 'top': '0px'});
                }
            })
        }

        overviewBtn.click(function () {
            $('html, body').animate({
                scrollTop: $('#overview').offset().top - 20
            }, 1000);
        });

        connectionsBtn.click(function () {
            $('html, body').animate({
                scrollTop: $('#connections').offset().top - 20
            }, 1000);
        });
    });

    return <>
        <section className="startup-content">
            <div className="container">
                <div className="row">


                    <div className="col-md-4">
                        <div className="startup-sidebar" id="sidebar-scroller">
                            <div className="profile-content">
                                <img id="viewer-image"
                                     onClick={() => dispatch(showImageViewer(profile.profile_pic_url))}
                                     src={profile.profile_pic_url} alt="" className="img-fluid img-profile"/>

                                <div className="social-icons">
                                    <a href={`${profile.facebook}`}
                                       target="_blank">
                                        <img src="/images/icon/fb.svg" alt=""/>
                                    </a>
                                    <a href={`${profile.linkedin}`}
                                       target="_blank">
                                        <img src="/images/icon/lnkd.svg" alt=""/>
                                    </a>
                                    <a href={`${profile.instagram}`}
                                       target="_blank">
                                        <img src="/images/icon/ig.svg" alt=""/>
                                    </a>
                                    <a href={`${profile.twitter}`}
                                       target="_blank" className="mr-0">
                                        <img src="/images/icon/twt.svg" alt=""/>
                                    </a>
                                </div>

                                <p className="profile-name">
                                    {`${profile.user.first_name} ${profile.user.last_name}`}
                                </p>

                                <p><img className="location-img" src="/images/icon/location.svg"
                                        alt=""/> {profile.location ? profile.location.country : ''}</p>

                                <p>{profile.website}</p>

                                <div className="phone-div w-50 mx-auto">
                                    <p>{profile.phone}</p>
                                </div>

                                <button className="edit-investors-profile my-3"
                                        onClick={() => Router.push('/profile/edit')}>Edit Profile
                                </button>
                            </div>
                            <button className="startup-link-view" id="overview-btn">
                                Overview <img src="/images/icon/pie-chart.svg" alt=""/>
                            </button>
                            <button className="startup-link-view" id="connections-btn">
                                Connections <img src="/images/icon/startup-level-icon.svg" alt=""/>
                            </button>
                        </div>
                    </div>

                    <div className="col-md-8">

                        <div className="startup-heading" id="overview">
                            <h5>Overview</h5>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="startup-description text-center text-md-left">
                                        <img src="/images/icon/fund.svg" alt=""/>
                                        <p className="profile-name">
                                            Investment range
                                        </p>
                                        <p className="color-green">
                                            {interests.investment_range}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="startup-description text-center text-md-left">
                                        <img src="/images/icon/industry.svg" alt=""/>
                                        <p className="profile-name">
                                            Industries
                                        </p>
                                        <p>
                                            {interests.industries.join(', ')}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="startup-description text-center text-md-left">
                                        <img src="/images/icon/company-stage.svg" alt=""/>
                                        <p className="profile-name">
                                            Startup Stage
                                        </p>
                                        <p>
                                            {interests.investment_stages.join(', ')}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="startup-description text-center text-md-left">
                                        <img src="/images/icon/fund.svg" alt=""/>
                                        <p className="profile-name">
                                            Geographical Focus
                                        </p>
                                        <p>
                                            {JSON.parse(interests.geographical_focus).join(', ')}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="startup-description text-center text-md-left">
                                        <img src="/images/icon/industry.svg" alt=""/>
                                        <p className="profile-name">
                                            Investment Types
                                        </p>
                                        <p>
                                            {JSON.parse(interests.investment_type).join(', ')}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="startup-description text-center text-md-left">
                                        <img src="/images/icon/company-stage.svg" alt=""/>
                                        <p className="profile-name">
                                            Startup Preference
                                        </p>
                                        <p>
                                            Level {interests.startup_level}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="startup-description">
                                    <img src="/images/icon/about-me-icon.svg" alt=""/>
                                    <p className="profile-name">
                                        About Me
                                    </p>
                                    <p>{profile.about}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="events discover investors-bg" id="connections">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Connections</h2>
                    </div>
                </div>

                {/* <div className="row"> */}

                    {
                        connections.length > 0 && <div>
                            {
                                connections.map(user => {
                                    return <StartupCard key={user.slug} startup={user}/>
                                })
                            }
                        </div>
                    }

                {/* </div> */}

                {/*<div className="text-center button mt-5">*/}
                {/*    <a href="#" className="btn">Load more</a>*/}
                {/*</div>*/}
            </div>
        </section>
    </>
};

export default InvestorProfile;