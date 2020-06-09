import Layout from "../components/layout";
import Head from "next/head";
import React, {useState} from "react";
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
import {useDispatch} from "react-redux";
import {loader} from "../store/actions/loader";

const Discover = ({userType, data}) => {
    let {data: users, links, meta} = data;
    const [allStartups, setStartups] = useState(users);
    const [nextUrl, setNextUrl] = useState(links.next);
    const [lastPage, setLastPage] = useState(meta.last_page);
    const [currentPage, setCurrentPage] = useState(meta.current_page);

    const dispatch = useDispatch();

    const nextPageHandler = async e => {
        e.preventDefault();
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.get(`${nextUrl}&paginate=4`, {
                headers: {
                    'Authorization': `Bearer ${Token()}`
                }
            });
            console.log(response);
            setStartups(state => state.concat(response.data));
            setNextUrl(response.links.next);
            setLastPage(response.meta.last_page);
            setCurrentPage(response.meta.current_page);
            dispatch(loader());
        } catch (error) {
            console.log(error);
            dispatch(loader());
        }
    }
    console.log(userType, users);

    const StartupComponent = ({user: {company_logo, company_name, funding_stage, location, user_id}, key}) => {
        return <div className="col-md-3" key={key}>
            <Link href="startups/[id]" as={`startups/${user_id}`}>
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
                        allStartups.map(
                            user => userType === 'Investor'
                                ? <StartupComponent key={user.id} user={user}/>
                                : <InvestorComponent key={user.id} user={user}/>
                        )
                    }
                </div>

                {
                    currentPage < lastPage
                        ? <div className="text-center button mt-5">
                            <a href="#" onClick={nextPageHandler} className="btn">Load more</a>
                        </div>
                        : null
                }
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
            Cookies.set('redirectIntended', '/discover');
            Router.push('/login');
            return {};
        }
    }

    const userType = user.user_type.user_type;
    const url = userType === 'Investor' ? '/investors/discover?paginate=4' : '/startups/discover?paginate=4';

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