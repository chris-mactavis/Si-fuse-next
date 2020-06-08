import Layout from "../components/layout";
import Head from "next/head";
import React from "react";
import HeaderContent from "../components/discover/HeaderContent";
import Link from "next/link";
import {auth, profileMiddleWare} from "../components/hoc/auth";
import axiosInstance from "../config/axios";
import {compose} from "redux";
import {User} from "../utils/User";
import Token from "../utils/Token";
import nookies from "nookies";
import Router from "next/router";
import Cookies from 'js-cookie';

const Discover = ({userType, data}) => {
    let {data: users, links, meta} = data;
    console.log(userType, users);

    const StartupComponent = ({user: {company_logo, company_name, funding_stage, location}, key}) => {
        return <div className="col-md-3" key={key}>
            <Link href="startups/[slug]" as={`startups/x-triumphant`}>
                <a className="card">
                    <div className="img-wrapper">
                        <img className="card-img-top img-fluid" src={company_logo}/>
                        <span className="view">view <img src="images/icon/right.png"/></span>
                    </div>

                    <div className="background-text">
                        <p>{company_name}</p>
                        <p>{funding_stage}</p>
                    </div>

                    <div className="event-tag-location">
                        <p className="align-self-start">Fintech</p>
                        {
                            userType === 'Investor' ? <p>{location.country}</p> : null
                        }
                    </div>
                </a>

            </Link>
        </div>
    }

    const InvestorComponent = ({user: {profile, interests}}) => {
        return <div className="col-md-3">
            <Link href="startups/[slug]" as={`startups/x-triumphant`}>
                <a className="card">
                    <div className="img-wrapper">
                        <img className="card-img-top img-fluid" src={profile ? profile.profile_pic_url : null}/>
                        <span className="view">view <img src="images/icon/right.png"/></span>
                    </div>

                    {/*<div className="background-text">*/}
                    {/*    <p>{company_name}</p>*/}
                    {/*    <p>{funding_stage}</p>*/}
                    {/*</div>*/}

                    {/*<div className="event-tag-location">*/}
                    {/*    <p>Fintech</p>*/}
                    {/*    {*/}
                    {/*        userType === 'Investor' ? <p>{location.country}</p> : null*/}
                    {/*    }*/}
                    {/*</div>*/}
                </a>

            </Link>
        </div>
    }

    return <Layout page="Discover" whiteAccount headerClass="discover page-header" headerContent={<HeaderContent/>}>
        <Head>
            <title>Discover</title>
        </Head>

        <section className="events discover">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>{userType === 'Investor' ? 'Startups' : 'Investors'}</h2>
                    </div>
                </div>

                <div className="row">
                    {
                        users.map(user => userType === 'Investor' ? <StartupComponent key={user.id} user={user}/> :
                            <InvestorComponent key={user.id} user={user}/>)
                    }

                    {/*<div className="col-md-3">*/}
                    {/*    <Link href="open-startup">*/}
                    {/*        <a className="card">*/}
                    {/*            <div className="img-wrapper">*/}
                    {/*                <img className="card-img-top img-fluid" src="images/startup-2.png"/>*/}
                    {/*                <span className="view">view <img src="images/icon/right.png" alt=""/></span>*/}
                    {/*            </div>*/}

                    {/*            <div className="background-text">*/}
                    {/*                <p>Target Egypt Forum 2020</p>*/}
                    {/*                <p>Late Stage</p>*/}
                    {/*            </div>*/}

                    {/*            <div className="event-tag-location">*/}
                    {/*                <p>Fintech</p>*/}
                    {/*                <p>Nigeria</p>*/}
                    {/*            </div>*/}
                    {/*        </a>*/}
                    {/*    </Link>*/}
                    {/*</div>*/}

                    {/*<div className="col-md-3">*/}
                    {/*    <Link href="open-startup">*/}
                    {/*        <a className="card">*/}
                    {/*            <div className="img-wrapper">*/}
                    {/*                <img className="card-img-top img-fluid" src="images/startup-1.png"/>*/}
                    {/*                <span className="view">view <img src="images/icon/right.png" alt=""/></span>*/}
                    {/*            </div>*/}

                    {/*            <div className="background-text">*/}
                    {/*                <p>African Future Tech and Energy Summit</p>*/}
                    {/*                <p>Middle Stage</p>*/}
                    {/*            </div>*/}

                    {/*            <div className="event-tag-location">*/}
                    {/*                <p>Fintech</p>*/}
                    {/*                <p>Nigeria</p>*/}
                    {/*            </div>*/}
                    {/*        </a>*/}
                    {/*    </Link>*/}
                    {/*</div>*/}

                    {/*<div className="col-md-3">*/}
                    {/*    <Link href="open-startup">*/}
                    {/*        <a className="card">*/}
                    {/*            <div className="img-wrapper">*/}
                    {/*                <img className="card-img-top img-fluid" src="images/startup-3.png"/>*/}
                    {/*                <span className="view">view <img src="images/icon/right.png" alt=""/></span>*/}
                    {/*            </div>*/}

                    {/*            <div className="background-text">*/}
                    {/*                <p>X-Triumphant</p>*/}
                    {/*                <p>Early Stage</p>*/}
                    {/*            </div>*/}

                    {/*            <div className="event-tag-location">*/}
                    {/*                <p>Fintech</p>*/}
                    {/*                <p>Nigeria</p>*/}
                    {/*            </div>*/}
                    {/*        </a>*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                </div>

                <div className="text-center button mt-5">
                    <a href="#" className="btn">Load more</a>
                </div>
            </div>
        </section>
    </Layout>
};

Discover.getInitialProps = async (ctx) => {
    const user = User(ctx);
    const token = Token(ctx);

    if (!token) {
        if (typeof window === 'undefined') {
            nookies.set(ctx, 'redirectIntended', ctx.pathname, {});
            ctx.res.writeHead(302, {Location: '/login'});
            ctx.res.end();
        } else {
            console.log('adfasdfasdf');
            Cookies.set('redirectIntended', '/discover');
            Router.push('/login');
            return {};
        }
    }

    const userType = user.user_type.user_type;
    const url = userType === 'Investor' ? '/investors/discover' : '/startups/discover';

    try {
        const {data} = await axiosInstance.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return {
            data,
            userType
        }
    } catch (e) {
        console.log(e.response.data.message);
        return {user};
    }


}

export default compose(profileMiddleWare, auth)(Discover);