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
import StartupComponent from "../components/discover/StartupComponent";

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
                        allStartups.map(user => <StartupComponent key={user.id} user={user}/>)
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