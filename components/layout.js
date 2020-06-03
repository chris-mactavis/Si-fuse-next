import Head from 'next/head'
import React from "react";
import TopBar from "./layouts/TopBar";
import SideBar from "./layouts/SideBar";
import HeaderScroll from "./header/HeaderScroll";
import Link from "next/link";
import Footer from "./layouts/Footer";
import Loader from "./UI/Loader";
import {useSelector} from "react-redux";

export default function Layout({children, page, headerClass, headerContent, redBar = false, whiteAccount = false}) {
    const isLoggedIn = useSelector(state => state.auth.loggedIn);
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <link rel="icon" href="/favicon.ico"/>
                {/*<meta*/}
                {/*    name="description"*/}
                {/*    content="Learn how to build a personal website using Next.js"*/}
                {/*/>*/}
                {/*<meta*/}
                {/*    property="og:image"*/}
                {/*    content={`https://og-image.now.sh/${encodeURI(*/}
                {/*        siteTitle*/}
                {/*    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}*/}
                {/*/>*/}
                {/*<meta name="og:title" content={siteTitle} />*/}
                {/*{meta}*/}
                <meta charSet="utf-8"/>
                <meta name="description" content=""/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>

                <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16"
                      href="/images/favicon/favicon-16x16.png"/>

                <link rel="stylesheet"
                      href="/css/bootstrap.min.css"/>
                {/*<link rel="stylesheet" href="/css/main.css"/>*/}

                <link rel="stylesheet" type="text/css" href="/slick/slick.css"/>
                <link rel="stylesheet" type="text/css"
                      href="/slick/slick-theme.css"/>

                <script src="https://code.jquery.com/jquery-3.4.1.min.js"
                        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
                        crossOrigin="anonymous"/>
                <script type="text/javascript" src="/slick/slick.min.js"/>
                <script src="/js/bootstrap.min.js"/>
                <script src="/js/main.js"/>
            </Head>

            <Loader />

            <header className={headerClass}>
                <TopBar redBar={redBar} isLoggedIn={isLoggedIn} whiteAccount={whiteAccount}/>

                {headerContent}

                <SideBar isLoggedIn={isLoggedIn}/>

                {page === 'Home' ? <HeaderScroll/> : null}
            </header>

            {children}

            <Footer />


        </>
    )
}