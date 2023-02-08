import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const TopNav = () => {
    const { status, data: session } = useSession();

    const logoutClickHandler = () => {
        signOut({ callbackUrl: '/login' });
    };

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            </Head>

            <header className="header-area">
                <div className="header-top-bar padding-right-100px padding-left-100px">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="header-top-content">
                                    <div className="header-left">
                                        <ul className="list-items">
                                            <li><a href="tel:9715667777"> <i className="la la-phone mr-1"></i> +971 52 886 1121</a></li>
                                            <li><a href="mailto:support@mobilies.io"><i className="la la-envelope mr-1"></i>support@mobilies.io</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="header-top-content">
                                    <div className="header-right d-flex align-items-center justify-content-end">
                                        <div className="header-right-action pt-1 pe-2">
                                            { status === 'loading' ? (
                                                'Loading'
                                            ) :   session?.user ? (
                                                <>
                                                    <Link href="/user/profile" className="theme-btn theme-btn-small theme-btn-transparent">{session.user.name}</Link>
                                                    <Link href="#" onClick={logoutClickHandler} className="theme-btn theme-btn-small ml-1">Logout</Link>
                                                </>
                                            ) : (<>
                                                <Link href="/login" className="theme-btn theme-btn-small theme-btn-transparent">Login</Link>
                                                <Link href="/register" className="theme-btn theme-btn-small ml-1">Register</Link>
                                            </>)}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header-menu-wrapper padding-right-100px padding-left-100px">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="menu-wrapper">
                                    <a href="#" className="down-button"><i className="la la-angle-down"></i></a>
                                    <div className="logo">
                                        <Link href="/" style={{borderRadius:5}}>
                                            <img className="imgheader" src="/assets/img/logo.png" alt="logo" />
                                        </Link>
                                        <div className="menu-toggler">
                                            <i className="la la-bars"></i>
                                            <i className="la la-times"></i>
                                        </div>
                                    </div>
                                    
                                    <div className="main-menu-content">
                                        <nav>
                                            <ul>
                                                <li><Link href="/" title="home">HOME</Link></li>
                                                { status === 'loading' ? (
                                                'Loading'
                                                ) : session?.user && <>
                                                    <li><Link href="/user/profile" title="user account">MY ACCOUNT</Link></li>
                                                    <li><Link href="/user/ads" title="my ads">MY ADS</Link></li>
                                                    <li><Link href="/user/adsform" title="create new ads">POST ADS</Link></li>
                                                </>}
                                            </ul>
                                        </nav>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default TopNav