import Layout from "../components/layout";
import Head from "next/head";
import React, {useEffect, useState} from "react";
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
import StartupCard from "../components/startups/startupCard";
import {useForm} from "react-hook-form";
import {showNotifier} from "../store/actions/notifier";

const Discover = ({userType, data, industries, countries}) => {
    useEffect(() => {
        localStorage.setItem('discover', JSON.stringify(data));
    }, []);

    let {data: users, links, meta} = data;
    const [allStartups, setStartups] = useState(users);
    const [nextUrl, setNextUrl] = useState(links.next);
    const [lastPage, setLastPage] = useState(meta.last_page);
    const [currentPage, setCurrentPage] = useState(meta.current_page);
    const dispatch = useDispatch();

    const {register, handleSubmit} = useForm();

    const resetFilterHandler = () => {
        const discover = JSON.parse(localStorage.getItem('discover'));
        if (discover) {
            let {data: users, links, meta} = discover;
            setStartups(users);
            setNextUrl(links.next);
            setLastPage(meta.last_page);
            setCurrentPage(meta.current_page);
        }
    }

    const filterHandler = async data => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('investors/filter-discover', {...data, paginate: 4}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            setStartups(response.data);
            setNextUrl(response.links.next);
            setLastPage(response.meta.last_page);
            setCurrentPage(response.meta.current_page);
            dispatch(loader());
        } catch (e) {
            dispatch(loader());
            dispatch(showNotifier(e.response.data.message, 'danger'));
        }
    }

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

    const DiscoverHeaderContent = () => <div className="center-box">
        <h1>Discover</h1>
    </div>

    return <Layout page="Discover" whiteAccount headerClass="discover page-header"
                   headerContent={<DiscoverHeaderContent/>}>
        <Head>
            <title>Discover</title>
            <script src="/js/rater.min.js"/>
        </Head>

        <section className="events discover">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h5>Filter By:</h5>

                        <div className="row">
                            <div className="col-12">
                                <form className="profile-details w-100" onSubmit={handleSubmit(filterHandler)}>

                                    <p className="mb-0">Industry</p>
                                    <select
                                        ref={register}
                                        className="w-100 full-width" name="industry">
                                        <option value="">Choose Industry</option>
                                        {
                                            industries.map(({industry, id}) => <option key={id}
                                                                                       value={id}>{industry}</option>)
                                        }
                                    </select>

                                    <p className="mb-0">Country</p>
                                    <select
                                        ref={register}
                                        className="w-100 full-width" name="country">
                                        <option value="">Choose Country</option>
                                        {
                                            countries.map(({country, id}) => <option key={id}
                                                                                     value={country}>{country}</option>)
                                        }
                                    </select>


                                    <p className="mb-0">Company Stage</p>
                                    <label className="checkout-label">
                                        <input type="radio" name="company_stage" value="concept"
                                               ref={register}
                                        />
                                        <span className="checkout-custom"/>
                                        Concept
                                    </label>
                                    <label className="checkout-label">
                                        <input type="radio" name="company_stage" value="early stage"
                                               ref={register}
                                        />
                                        <span className="checkout-custom"/>
                                        Early Stage
                                    </label>
                                    <label className="checkout-label">
                                        <input type="radio" name="company_stage" value="scaling"
                                               ref={register}
                                        />
                                        <span className="checkout-custom"/>
                                        Scaling
                                    </label>
                                    <label className="checkout-label">
                                        <input type="radio" name="company_stage" value="established"
                                               ref={register}
                                        />
                                        <span className="checkout-custom"/>
                                        Established
                                    </label>

                                    <p className="mb-0">Team Size</p>

                                    <label className="checkout-label">
                                        <input type="radio" name="team_size"
                                               ref={register}
                                               value="1-10"/>
                                        <span className="checkout-custom"/>
                                        1 - 10
                                    </label>
                                    <label className="checkout-label">
                                        <input type="radio" name="team_size"
                                               ref={register}
                                               value="11-50"/>
                                        <span className="checkout-custom"/>
                                        11 - 50
                                    </label>
                                    <label className="checkout-label">
                                        <input type="radio" name="team_size"
                                               ref={register}
                                               value="50 and above"/>
                                        <span className="checkout-custom"/>
                                        50 and above
                                    </label>

                                    <button className="btn btn-sm" type="submit">Apply Filter</button>
                                    <button className="btn btn-sm mt-2" type="reset" onClick={resetFilterHandler}>Reset
                                        Filter
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-9">
                        {/*<div className="row">*/}
                        {/*    <div className="col-12">*/}
                        {/*        <h2>{userType === 'Investor' ? 'Startups' : 'Investors'}</h2>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="row">
                            {
                                allStartups.map((user, index) => <StartupCard key={index} startup={user}/>)
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
        const {data: {industries, countries}} = await axiosInstance.get('discover-page-content');
        return {
            data,
            userType,
            industries,
            countries
        }
    } catch (e) {
        console.log(e.response.data.message);
        return {user};
    }
}

export default compose(profileMiddleWare, auth)(Discover);