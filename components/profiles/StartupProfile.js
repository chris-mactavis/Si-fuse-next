import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../store/actions/loader";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import {showNotifier} from "../../store/actions/notifier";
import {showImageViewer, showVideoViewer} from "../../store/actions/imageViewer";
import StartupProfileLevels from "./StartupLevels";
import {startupLevel} from "../../helpers";
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const StartupProfile = ({rating, startupComments, company, services: product_services, finance, market, level, profile, hasEdit = false, profileContent: {startup, industries, locations, stages}, loggedInUser, pendingPermission: pendingPerm, hasPermission, isConnected}) => {
    const dispatch = useDispatch();
    const createMarkup = (content) => ({__html: content});

    let levelKeys = [];

    const userType = loggedInUser.user_type.user_type;

    const [connected, setConnected] = useState(isConnected);
    const [pendingPermission, setPendingPermission] = useState(pendingPerm);

    let theStartupComments = userType === 'Investor' ? startupComments : startup.comments;

    let startupRating = userType === 'Investor' ? rating : startup.rating;

    const [comments, setComment] = useState(theStartupComments.map(comment => {
        comment['showReply'] = false;
        comment['showReplyForm'] = false;
        return comment;
    }));

    const stlevel = startupLevel(level);

    if (level) {
        levelKeys = Object.keys(level);
        level = levelKeys.filter(l => l !== 'all').map(key => {
            if (level[key]) {
                return JSON.parse(level[key]).map(item => item.split('::')[1]);
            }
            return '';
        })
    }

    const requestPermissionHandler = async () => {
        dispatch(loader());
        try {
            await axiosInstance.post(`investors/request-permission`, {
                startup_id: company.user_id
            }, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            })
            setPendingPermission(true);
            dispatch(loader());
            dispatch(showNotifier('Profile request sent!'));
        } catch (e) {
            console.log(e);
            dispatch(loader());
            dispatch(showNotifier(e.response.data.message));
        }
    }

    useEffect(() => {
        const overviewBtn = $('#overview-btn');
        const startupLevelBtn = $('#startup-level-btn');
        const productServiceBtn = $('#product-services-btn');
        const financeBtn = $('#finance-btn');
        const marketingSummaryBtn = $('#marketing-summary-btn');
        const commentsBtn = $('#comments-btn');

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

        startupLevelBtn.click(function () {
            $('html, body').animate({
                scrollTop: $('#startupLevel').offset().top - 20
            }, 1000);
        });

        productServiceBtn.click(function () {
            $('html, body').animate({
                scrollTop: $('#productServices').offset().top - 20
            }, 1000);
        });

        financeBtn.click(function () {
            if (!hasPermission) {
                $('html, body').animate({
                    scrollTop: $('#productServices').offset().top - 20
                }, 1000);
                return;
            }
            $('html, body').animate({
                scrollTop: $('#finance').offset().top - 20
            }, 1000);
        });

        marketingSummaryBtn.click(function () {
            if (!hasPermission) {
                $('html, body').animate({
                    scrollTop: $('#productServices').offset().top - 20
                }, 1000);
                return;
            }
            $('html, body').animate({
                scrollTop: $('#marketingSummary').offset().top - 20
            }, 1000);
        });

        commentsBtn.click(function () {
            if (!hasPermission) return;
            $('html, body').animate({
                scrollTop: $('#comments').offset().top - 20
            }, 1000);
        });

    }, [hasPermission]);

    const [toggleAbout, setAbout] = useState(false);
    const [toggleFund, setFund] = useState(false);
    const [toggleIndustry, setIndustry] = useState(false);
    const [toggleCompanyStage, setCompanyStage] = useState(false);
    const [toggleProductName, setProductName] = useState(false);
    const [toggleValueProposition, setValueProposition] = useState(false);
    const [toggleCapitalFor, setCapitalFor] = useState(false);
    const [toggleBusinessSummary, setBusinessSummary] = useState(false);
    const [toggleAddressableMarket, setAddressableMarket] = useState(false);
    const [toggleMarketingStrategy, setMarketingStrategy] = useState(false);
    const [toggleCompanyCompetitors, setCompanyCompetitors] = useState(false);
    const [toggleCompetitiveAdvantage, setCompetitiveAdvantage] = useState(false);
    const [toggleProductImages, setProductImages] = useState(false);
    const [toggleProductVideo, setProductVideo] = useState(false);
    const [togglePitchVideo, setPitchVideo] = useState(false);
    const [togglePhone, setPhone] = useState(false);
    const [starRating, setStarRating] = useState(startupRating || {
        formatted_rating: 0,
        overall_rating: 0,
        total_rating: 0
    });

    const [startupProf, setStartupProfile] = useState({company, product_services, finance, market, profile, level});
    const [productImages, setProdImages] = useState(startup.product_services ? startup.product_services.product_image_array.map(img => ({source: img})) : []);

    const {register, handleSubmit, reset} = useForm();

    const toggleFormHandler = (item) => {
        closeAllForms();
        switch (item) {
            case 'about':
                return setAbout(state => !state);
            case 'fund':
                return setFund(state => !state);
            case 'industry':
                return setIndustry(state => !state);
            case 'companyStage':
                return setCompanyStage(state => !state);
            case 'productName':
                return setProductName(state => !state);
            case 'valueProposition':
                return setValueProposition(state => !state);
            case 'capitalFor':
                return setCapitalFor(state => !state);
            case 'businessSummary':
                return setBusinessSummary(state => !state);
            case 'addressableMarket':
                return setAddressableMarket(state => !state);
            case 'marketingStrategy':
                return setMarketingStrategy(state => !state);
            case 'companyCompetitors':
                return setCompanyCompetitors(state => !state);
            case 'competitiveAdvantage':
                return setCompetitiveAdvantage(state => !state);
            case 'productImages':
                return setProductImages(state => !state);
            case 'productVideo':
                return setProductVideo(state => !state);
            case 'pitchVideo':
                return setPitchVideo(state => !state);
            case 'phone':
                return setPhone(state => !state);
            default:
                return true;
        }
    }

    const closeAllForms = () => {
        setAbout(false);
        setFund(false);
        setIndustry(false);
        setCompanyStage(false);
        setProductName(false);
        setValueProposition(false);
        setBusinessSummary(false);
        setAddressableMarket(false);
        setMarketingStrategy(false);
        setCompanyCompetitors(false);
        setCompetitiveAdvantage(false);
        setCapitalFor(false);
        setProductImages(false);
        setProductVideo(false);
        setPitchVideo(false);
        setPhone(false);
    }

    const onSubmitHandler = async data => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups', {...data, is_editing: true}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            closeAllForms();
            setStartupProfile(response.data);
            dispatch(showNotifier('Updated Successfully!'));
            dispatch(loader());
        } catch (e) {
            dispatch(showNotifier(e.response.data.message, 'danger'));
            dispatch(loader());
            console.log(e);
        }
    }

    const onSubmitFinanceHandler = async data => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/finance', {...data, is_editing: true}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            closeAllForms();
            console.log(response);
            setStartupProfile(response.data);
            dispatch(showNotifier('Updated Successfully!'));
            dispatch(loader());
        } catch (e) {
            console.log(e);
            dispatch(showNotifier(e.response.data.message, 'danger'));
            dispatch(loader());
        }
    }

    const onSubmitCompanyHandler = async data => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/company', {...data, is_editing: true}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            closeAllForms();
            setStartupProfile(response.data);
            dispatch(showNotifier('Updated Successfully!'));
            dispatch(loader());
        } catch (e) {
            dispatch(showNotifier(e.response.data.message, 'danger'));
            dispatch(loader());
        }
    }

    const onSubmitServiceHandler = async data => {
        dispatch(loader());
        try {
            let formData = new FormData();
            Object.keys(data).forEach(dataItem => formData.append(dataItem, data[dataItem]));
            if (!(productImages.length > 0 && productImages[0].hasOwnProperty('source'))) {
                productImages.forEach(pImage => formData.append('product_images[]', pImage));
            }
            const {data: response} = await axiosInstance.post('startups/product-service', formData, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            closeAllForms();
            setStartupProfile(response.data);
            dispatch(showNotifier('Updated Successfully!'));
            dispatch(loader());
        } catch (e) {
            console.log(e);
            dispatch(showNotifier(e.response.data.message, 'danger'));
            dispatch(loader());
        }
    }

    const onSubmitMarketHandler = async data => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('startups/market', {...data, is_editing: true}, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            closeAllForms();
            setStartupProfile(response.data);
            dispatch(showNotifier('Updated Successfully!'));
            dispatch(loader());
        } catch (e) {
            console.log(e);
            dispatch(showNotifier(e.response.data.message, 'danger'));
            dispatch(loader());
        }
    }

    const disconnectHandler = async () => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post(`investors/unfollow`, {
                follower_id: id
            }, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            setConnected(false);
            dispatch(loader());
        } catch (e) {
            console.log(e.response.data.message);
            dispatch(loader());
        }
    }

    const connectHandler = async () => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post(`investors/follows`, {
                follower_id: company.user_id
            }, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            setConnected(true);
            dispatch(showNotifier('Connected Successfully'));
            dispatch(loader());
        } catch (e) {
            dispatch(showNotifier(e, 'danger'));
            dispatch(loader());
            console.log(e);
        }
    }

    const commentHandler = async data => {
        if (data.comment) {
            try {
                const {data: {data: response}} = await axiosInstance.post('investors/comments', {
                    ...data,
                    owner_id: company.user_id
                }, {
                    headers: {
                        Authorization: `Bearer ${Token()}`
                    }
                });

                response['showReply'] = false;
                response['showReplyForm'] = false;

                setComment(comments => comments.concat(response));

                reset();

            } catch (e) {
                dispatch(showNotifier(e.response.data.message, 'danger'));
            }
        }
    }

    const replyHandler = async data => {
        if (data.reply) {
            try {
                const {data: {data: response}} = await axiosInstance.post('replies', data, {
                    headers: {
                        Authorization: `Bearer ${Token()}`
                    }
                });

                const theCommentIndex = comments.findIndex(comment => comment.id === +data.comment_id);
                const prevComment = comments[theCommentIndex];
                const replies = prevComment.replies.concat(response);

                prevComment.replies = replies;
                reset();

            } catch (e) {
                dispatch(showNotifier(e.response.data.message, 'danger'));
            }
        }
    }

    const showReplyHandler = commentId => {
        setComment(comments => {
            return [...comments].map(x => {
                if (+x.id === +commentId) {
                    x.showReply = true;
                }
                return x;
            })
        });
    }

    const showReplyFormHandler = commentId => {
        setComment(comm => {
            return [...comm].map(x => {
                if (x.id === commentId) {
                    x.showReply = true;
                    x.showReplyForm = true;
                }
                return x;
            })
        });
    }

    function selectedCountHandler(count) {
        setSelectedStarCount(count);
    }


    useEffect(() => {
        const options = {
            max_value: 5,
            step_size: 1,
            initial_value: 1,
            change_once: true,
            cursor: 'pointer',
            readonly: userType !== 'Investor'
        }

        setTimeout(() => {
            $(".rater-js").rate(options);

            $(".rater-js").on("change", async function (ev, data) {
                try {
                    const {data: response} = await axiosInstance.post('rate', {
                        rating: data.to,
                        startup_id: company.user_id
                    }, {
                        headers: {
                            Authorization: `Bearer ${Token()}`
                        }
                    });

                    setStarRating(response.data);
                } catch (e) {
                    dispatch(showNotifier('Cannot rate at the moment. Please try later!', 'danger'));
                }
            });
        }, 1000);
    }, []);

    return <section className="startup-content">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="startup-sidebar" id="sidebar-scroller">
                        <div className="profile-content">
                            {/* <img id="viewer-image"
                                 onClick={() => dispatch(showImageViewer(startupProf.company.logo_url))}
                                 src={startupProf.company.logo_url} alt="" className="img-fluid img-profile"/>

                            <div className="social-icons">
                                <a href={`https://facebook.com/${startupProf.company.facebook}`}
                                   target="_blank">
                                    <img src="/images/icon/fb.svg" alt=""/>
                                </a>
                                <a href={`https://linkedin.com/in/${startupProf.company.linkedin}`}
                                   target="_blank">
                                    <img src="/images/icon/lnkd.svg" alt=""/>
                                </a>
                                <a href={`https://instagram.com/${startupProf.company.instagram}`}
                                   target="_blank">
                                    <img src="/images/icon/ig.svg" alt=""/>
                                </a>
                                <a href={`https://twitter.com/${startupProf.company.twitter}`}
                                   target="_blank">
                                    <img src="/images/icon/twt.svg" alt=""/>
                                </a>
                            </div>

                            <p className="profile-name">
                                {startupProf.company.name}
                            </p>

                            <p><img className="location-img" src="/images/icon/location.svg" alt=""/> Lagos, Nigeria</p>

                            <p>{startupProf.company.website}</p>

                            {
                                !togglePhone && <div className="phone-div w-50 mx-auto">
                                    <p>{startupProf.company.phone}</p>
                                    {
                                        hasEdit && <img
                                            onClick={() => toggleFormHandler('phone')}
                                            className="edit-icon"
                                            title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>
                                    }
                                </div>
                            }

                            {
                                togglePhone && <form onSubmit={handleSubmit(onSubmitCompanyHandler)}
                                                     className="profile-details overview-form">
                                    <input type="text" name="phone" ref={register}
                                           className="full-width edit-input"
                                           defaultValue={startupProf.company.phone}/>
                                    <button className="btn btn-sm" type={"submit"}>Update</button>
                                </form>
                            }

                            {(!hasEdit && !connected) &&
                            <button onClick={connectHandler} className="btn">Connect</button>} */}

                            <div className="head-info d-flex align-items-center">
                                <img id="viewer-image"
                                    onClick={() => dispatch(showImageViewer(startupProf.company.logo_url))}
                                    src={startupProf.company.logo_url} alt="" className="img-fluid img-profile" />
                                <p className="profile-name mb-0">
                                    {startupProf.company.name}
                                </p>
                            </div>
                            <p><img className="location-img" src="/images/icon/location.svg" alt=""/> Lagos, Nigeria</p>
                            <p>{startupProf.company.website}</p>
                            <p>{startupProf.company.phone}</p>
                            <div className="social-icons">
                                <a href={`https://facebook.com/${startupProf.company.facebook}`}
                                   target="_blank">
                                    <img src="/images/icon/fb-colored.svg" alt=""/>
                                </a>
                                <a href={`https://linkedin.com/in/${startupProf.company.linkedin}`}
                                   target="_blank">
                                    <img src="/images/icon/lnkd-colored.svg" alt=""/>
                                </a>
                                <a href={`https://instagram.com/${startupProf.company.instagram}`}
                                   target="_blank">
                                    <img src="/images/icon/ig-colored.svg" alt=""/>
                                </a>
                                <a href={`https://twitter.com/${startupProf.company.twitter}`}
                                   target="_blank">
                                    <img src="/images/icon/twt-colored.svg" alt=""/>
                                </a>
                            </div>
                            {(!hasEdit && !connected) &&
                            <button onClick={connectHandler} className="btn">Connect</button>}
                        </div>
                        
                        <div className="profile-content">
                            <div className="d-flex">
                                
                            </div>
                        </div>

                        <button className="startup-link-view" id="overview-btn">
                            Overview <img src="/images/icon/pie-chart.svg" alt=""/>
                        </button>
                        <button className="startup-link-view" id="startup-level-btn">
                            Startup Level <img src="/images/icon/startup-level-icon.svg" alt=""/>
                        </button>
                        <button className="startup-link-view" id="product-services-btn">
                            Product and Services <img src="/images/icon/product-service-icon.svg" alt=""/>
                        </button>
                        <button className="startup-link-view" id="finance-btn">
                            Finance <img src="/images/icon/finance-white-icon.svg" alt=""/>
                        </button>
                        <button className="startup-link-view" id="marketing-summary-btn">
                            Marketing Summary <img src="/images/icon/market-summary-white.svg" alt=""/>
                        </button>
                        <button
                            className="startup-link-view" id="comments-btn">
                            Comments <img src="/images/icon/market-summary-white.svg" alt=""/>
                        </button>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="startup-heading" id="overview">
                        <h5>Overview</h5>
                        {/*<div className="row">*/}
                        {/*    <div className="col-12">*/}
                        {/*        <div className="startup-description">*/}
                        {/*            {*/}
                        {/*                hasEdit &&*/}
                        {/*                <img onClick={() => toggleFormHandler('about')} className="edit-icon"*/}
                        {/*                     title="Edit"*/}
                        {/*                     src="/images/icon/pencil-icon.svg" alt=""/>*/}
                        {/*            }*/}

                        {/*            <img src="/images/icon/building.svg" alt=""/>*/}
                        {/*            <p className="profile-name">*/}
                        {/*                About {startupProf.company.name}*/}
                        {/*            </p>*/}
                        {/*            {*/}
                        {/*                !toggleAbout && <p className="text-description">*/}
                        {/*                    {startupProf.profile.about}*/}
                        {/*                </p>*/}
                        {/*            }*/}
                        {/*            {*/}
                        {/*                toggleAbout && <form onSubmit={handleSubmit(onSubmitHandler)}*/}
                        {/*                                     className="profile-details overview-form w-100">*/}
                        {/*                    <textarea rows="5" name="about" ref={register}*/}
                        {/*                              className="full-width edit-input"*/}
                        {/*                              defaultValue={startupProf.profile.about}/>*/}
                        {/*                    <button className="btn btn-sm" type={"submit"}>Update</button>*/}
                        {/*                </form>*/}
                        {/*            }*/}
                        {/*            <div className="text-right">*/}
                        {/*                <a href="#">Read more</a>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="row">
                            <div className="col-md-4">
                                <div className="startup-description text-center text-md-left">
                                    {hasEdit &&
                                    <img onClick={() => toggleFormHandler('fund')} className="edit-icon" title="Edit"
                                         src="/images/icon/pencil-icon.svg" alt=""/>}
                                    <img src="/images/icon/fund.svg" alt=""/>
                                    <p className="profile-name">
                                        Target Fund
                                    </p>
                                    {
                                        !toggleFund && <p className="color-green">
                                            {startupProf.finance.investment_ask}
                                        </p>
                                    }
                                    {
                                        toggleFund && <form onSubmit={handleSubmit(onSubmitFinanceHandler)}
                                                            className="profile-details overview-form w-100">
                                            <select name="investment_ask"
                                                    ref={register}
                                                    defaultValue={startupProf.finance.investment_ask}>
                                                <option value="">What is your investment ask?</option>
                                                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                                                <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                                                <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                                                <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                                                <option value="$250,000 - $1,000,000">$250,000 - $1,000,000
                                                </option>
                                                <option value="$1,000,000 - $2,000,000">$1,000,000 -
                                                    $2,000,000
                                                </option>
                                                <option value="$2,000,000 and above">$2,000,000 and above
                                                </option>
                                            </select>
                                            <button className="btn btn-xs mr-2" type={"button"}
                                                    onClick={() => setFund(false)}>Cancel
                                            </button>
                                            <button className="btn btn-xs" type={"submit"}>Update</button>
                                        </form>
                                    }
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="startup-description text-center text-md-left">
                                    {hasEdit && <img onClick={() => toggleFormHandler('industry')} className="edit-icon"
                                                     title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>}
                                    <img src="/images/icon/industry.svg" alt=""/>
                                    <p className="profile-name">
                                        Industry
                                    </p>

                                    {
                                        !toggleIndustry && <p className="p-move-down">
                                            <span className="industry-span">{startupProf.company.industry}</span>
                                        </p>
                                    }

                                    {
                                        toggleIndustry && <form onSubmit={handleSubmit(onSubmitCompanyHandler)}
                                                                className="profile-details overview-form w-100">
                                            <select name="industry_id" ref={register}
                                                    defaultValue={startupProf.company.industry_id}>
                                                <option value="">Select Industry</option>
                                                {industries.map(industry => <option key={industry.id}
                                                                                    value={industry.id}
                                                >{industry.industry}</option>)}
                                            </select>
                                            <button className="btn btn-xs mr-2" type={"button"}
                                                    onClick={() => setIndustry(false)}>Cancel
                                            </button>
                                            <button className="btn btn-xs" type={"submit"}>Update</button>
                                        </form>
                                    }

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="startup-description text-center text-md-left">
                                    {hasEdit &&
                                    <img onClick={() => toggleFormHandler('companyStage')} className="edit-icon"
                                         title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>}
                                    <img src="/images/icon/company-stage.svg" alt=""/>
                                    <p className="profile-name">
                                        Company Stage
                                    </p>

                                    {
                                        !toggleCompanyStage && <p className="text-capitalize">
                                            {startupProf.product_services.company_stage}
                                        </p>
                                    }

                                    {
                                        toggleCompanyStage && <form onSubmit={handleSubmit(onSubmitServiceHandler)}
                                                                    className="profile-details overview-form w-100">
                                            <select name="company_stage" ref={register}
                                                    defaultValue={startupProf.product_services.company_stage}>
                                                <option value="">Select Stage</option>
                                                <option value="concept">Concept</option>
                                                <option value="early stage">Early stage</option>
                                                <option value="scaling">Scaling</option>
                                                <option value="established">Established</option>
                                            </select>
                                            <button className="btn btn-xs mr-2" type={"button"}
                                                    onClick={() => setCompanyStage(false)}>Cancel
                                            </button>
                                            <button className="btn btn-xs" type={"submit"}>Update</button>
                                        </form>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="startup-heading startup-level" id="startupLevel">
                        <h5>Startup Level</h5>
                        {
                            level
                                ? level.map((startupLevel, index) => <StartupProfileLevels startupLevel={startupLevel}
                                                                                           key={index} index={index}
                                                                                           hasEdit={hasEdit}
                                                                                           fairness={stlevel[levelKeys[index]]}
                                                                                           levelKeys={levelKeys}/>)
                                : null
                        }
                    </div>

                    <div
                        className={`startup-heading product-services ${!hasPermission && userType !== 'Startup' ? 'fade-out' : ''}`}
                        id="productServices">
                        <h5>Products and Services</h5>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="startup-description text-center text-md-left">
                                    {hasEdit &&
                                    <img onClick={() => toggleFormHandler('productName')} className="edit-icon"
                                         title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>}
                                    <img src="/images/icon/product-name.svg" alt=""/>
                                    <p className="profile-name">
                                        Product Name
                                    </p>
                                    {
                                        !toggleProductName && <p>
                                            {startupProf.product_services.product_name}
                                        </p>
                                    }
                                    {
                                        toggleProductName && <form onSubmit={handleSubmit(onSubmitServiceHandler)}
                                                                   className="profile-details overview-form w-100">
                                            <input name="product_name" ref={register} className="full-width edit-input"
                                                   type="text"
                                                   defaultValue={startupProf.product_services.product_name}/>
                                            <button className="btn btn-xs mr-2" type={"button"}
                                                    onClick={() => setProductName(false)}>Cancel
                                            </button>
                                            <button className="btn btn-xs" type={"submit"}>Update</button>
                                        </form>
                                    }
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div className="startup-description">
                                    <img className="edit-icon" onClick={() => toggleFormHandler('productImages')}
                                         title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>
                                    <p className="profile-name">
                                        Product Images
                                    </p>

                                    {
                                        !toggleProductImages && <div className="product-img-list">
                                            {startupProf.product_services.hasOwnProperty('product_image_array') ? startupProf.product_services.product_image_array.map((image, index) =>
                                                <img
                                                    className="pointer" key={index}
                                                    onClick={() => dispatch(showImageViewer(image))} src={image}
                                                    alt=""/>) : null}
                                        </div>
                                    }
                                    {
                                        toggleProductImages && <form onSubmit={handleSubmit(onSubmitServiceHandler)}
                                                                     className="profile-details overview-form w-100">
                                            <FilePond
                                                files={productImages}
                                                allowMultiple={true}
                                                labelIdle="Product Images (Click here to upload)"
                                                name="files"
                                                onupdatefiles={fileItems => {
                                                    setProdImages(fileItems.map(fileItem => fileItem.file))
                                                }}
                                            />
                                            {/*<input name="product_images" ref={register}*/}
                                            {/*       className="full-width edit-input"*/}
                                            {/*       type="text"*/}
                                            {/*       defaultValue={startupProf.product_services.hasOwnProperty('product_image_array') ? startupProf.product_services.product_image_string : null}/>*/}
                                            <button className="btn btn-xs mr-2" type={"button"}
                                                    onClick={() => setProductImages(false)}>Cancel
                                            </button>
                                            <button className="btn btn-xs" type={"submit"}>Update</button>
                                        </form>
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            (userType === 'Startup' || hasPermission) &&
                            <>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="startup-description">
                                            <img className="edit-icon" onClick={() => toggleFormHandler('productVideo')}
                                                 title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>
                                            <img src="/images/icon/play.svg" alt=""/>
                                            <p className="profile-name">
                                                Product Video
                                            </p>

                                            {
                                                !toggleProductVideo && <div className="player-thumbnail"
                                                                            onClick={() => dispatch(showVideoViewer(startupProf.product_services.product_video_url))}>
                                                    <div
                                                        dangerouslySetInnerHTML={createMarkup(startupProf.product_services.product_video_url)}/>
                                                </div>
                                            }
                                            {
                                                toggleProductVideo &&
                                                <form onSubmit={handleSubmit(onSubmitServiceHandler)}
                                                      className="profile-details overview-form w-100">
                                                    <span className="small">Enter Youtube Embed Code</span>
                                                    <input name="product_video_url" ref={register}
                                                           className="full-width edit-input"
                                                           type="text"
                                                           defaultValue={startupProf.product_services.product_video_url}/>
                                                    <button className="btn btn-xs mr-2" type={"button"}
                                                            onClick={() => setProductVideo(false)}>Cancel
                                                    </button>
                                                    <button className="btn btn-xs" type={"submit"}>Update</button>
                                                </form>
                                            }
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="startup-description">
                                            <img onClick={() => toggleFormHandler('pitchVideo')} className="edit-icon"
                                                 title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>
                                            <img src="/images/icon/play.svg" alt=""/>
                                            <p className="profile-name">
                                                Pitch Video
                                            </p>

                                            {
                                                !togglePitchVideo && <div className="player-thumbnail"
                                                                          onClick={() => dispatch(showVideoViewer(startupProf.product_services.pitch_video_url))}>
                                                    <div
                                                        dangerouslySetInnerHTML={createMarkup(startupProf.product_services.pitch_video_url)}/>
                                                </div>
                                            }
                                            {
                                                togglePitchVideo &&
                                                <form onSubmit={handleSubmit(onSubmitServiceHandler)}
                                                      className="profile-details overview-form w-100">
                                                    <span className="small">Enter Youtube Embed Code</span>
                                                    <input name="pitch_video_url" ref={register}
                                                           className="full-width edit-input"
                                                           type="text"
                                                           defaultValue={startupProf.product_services.pitch_video_url}/>
                                                    <button className="btn btn-xs mr-2" type={"button"}
                                                            onClick={() => setPitchVideo(false)}>Cancel
                                                    </button>
                                                    <button className="btn btn-xs" type={"submit"}>Update</button>
                                                </form>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="startup-description">
                                            {hasEdit &&
                                            <img onClick={() => toggleFormHandler('valueProposition')}
                                                 className="edit-icon"
                                                 title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>}
                                            <img src="/images/icon/book.svg" alt=""/>
                                            <p className="profile-name">
                                                Value Proposition
                                            </p>
                                            {!toggleValueProposition &&
                                            <p className="text-description">{startupProf.product_services.value_proposition}</p>}

                                            {
                                                toggleValueProposition &&
                                                <form onSubmit={handleSubmit(onSubmitServiceHandler)}
                                                      className="profile-details overview-form w-100">
                                                        <textarea name="value_proposition" ref={register} rows="5"
                                                                  className="full-width edit-input"
                                                                  defaultValue={startupProf.product_services.value_proposition}/>
                                                    <button className="btn btn-xs mr-2" type={"button"}
                                                            onClick={() => setValueProposition(false)}>Cancel
                                                    </button>
                                                    <button className="btn btn-xs" type={"submit"}>Update</button>
                                                </form>
                                            }
                                            {/*<div className="text-right">*/}
                                            {/*    <a href="#">Read more</a>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>

                    {
                        !hasPermission && userType !== 'Startup' &&
                        <div
                            className="request-access d-flex flex-column align-items-center justify-content-center w-100">
                            <img src="/images/icon/lock.svg" alt=""/>
                            {pendingPermission && <p className="permission-requested">Profile Permission Requested!</p>}
                            {!hasPermission && !pendingPermission && <button className="btn" onClick={requestPermissionHandler}>Request Permission</button>}
                        </div>
                    }


                    {
                        (userType === 'Startup' || hasPermission) && <>
                            <div className="startup-heading" id="finance">
                                <h5>Finance</h5>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="startup-description">
                                            {hasEdit &&
                                            <img onClick={() => toggleFormHandler('capitalFor')} className="edit-icon"
                                                 title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>}
                                            <img src="/images/icon/finance.svg" alt=""/>
                                            <p className="profile-name">
                                                Capital Needed For
                                            </p>
                                            {!toggleCapitalFor &&
                                            <p className="text-description">{startupProf.finance.capital_needed_for}</p>}
                                            {
                                                toggleCapitalFor &&
                                                <form onSubmit={handleSubmit(onSubmitFinanceHandler)}
                                                      className="profile-details overview-form w-100">
                                                    <select name="capital_needed_for" ref={register}
                                                            defaultValue={startupProf.finance.capital_needed_for}>
                                                        <option value="">Capital Needed for</option>
                                                        <option value="Proof of concept">Proof of concept</option>
                                                        <option value="Working capital">Working capital</option>
                                                        <option value="Growth capital">Growth capital</option>
                                                        <option value="Bridging Capital">Bridging capital</option>
                                                    </select>
                                                    <button className="btn btn-xs mr-2" type={"button"} onClick={() => setCapitalFor(false)}>Cancel</button>
                                                    <button className="btn btn-xs" type={"submit"}>Update</button>
                                                </form>
                                            }
                                            {/*<div className="text-right">*/}
                                            {/*    <a href="#">Read more</a>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="startup-description">
                                            {hasEdit &&
                                            <img onClick={() => toggleFormHandler('businessSummary')}
                                                 className="edit-icon"
                                                 title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>}
                                            <img src="/images/icon/book.svg" alt=""/>
                                            <p className="profile-name">
                                                Business Summary
                                            </p>
                                            {!toggleBusinessSummary &&
                                            <p className="text-description">{startupProf.company.summary}</p>}
                                            {
                                                toggleBusinessSummary &&
                                                <form onSubmit={handleSubmit(onSubmitCompanyHandler)}
                                                      className="profile-details overview-form w-100">
                                                        <textarea ref={register} name="summary" rows="5"
                                                                  className="full-width edit-input"
                                                                  defaultValue={startupProf.company.summary}/>
                                                    <button className="btn btn-xs mr-2" type={"button"} onClick={() => setBusinessSummary(false)}>Cancel</button>
                                                    <button className="btn btn-xs" type={"submit"}>Update</button>
                                                </form>
                                            }
                                            {/*<div className="text-right">*/}
                                            {/*    <a href="#">Read more</a>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="startup-heading" id="marketingSummary">
                                <h5>Marketing Summary</h5>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="startup-description">
                                            {hasEdit &&
                                            <img onClick={() => toggleFormHandler('addressableMarket')}
                                                 className="edit-icon"
                                                 title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>}
                                            <img src="/images/icon/address-market.svg" alt=""/>
                                            <p className="profile-name">
                                                Adressable Market
                                            </p>
                                            {!toggleAddressableMarket &&
                                            <p className="text-description text-capitalize">{startupProf.market.addressable_market}</p>}
                                            {
                                                toggleAddressableMarket &&
                                                <form onSubmit={handleSubmit(onSubmitMarketHandler)}
                                                      className="profile-details overview-form w-100">
                                                        <textarea ref={register} name="addressable_market" rows="5"
                                                                  className="full-width edit-input"
                                                                  defaultValue={startupProf.market.addressable_market}/>
                                                    <button className="btn btn-xs mr-2" type={"button"} onClick={() => setAddressableMarket(false)}>Cancel</button>
                                                    <button className="btn btn-xs" type={"submit"}>Update</button>
                                                </form>
                                            }
                                            {/*<div className="text-right">*/}
                                            {/*    <a href="#">Read more</a>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="startup-description">
                                            {hasEdit &&
                                            <img onClick={() => toggleFormHandler('marketingStrategy')}
                                                 className="edit-icon"
                                                 title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>}
                                            <img src="/images/icon/marketing-summary.svg" alt=""/>
                                            <p className="profile-name">
                                                Marketing Strategy
                                            </p>
                                            {!toggleMarketingStrategy &&
                                            <p className="text-description text-capitalize">{startupProf.market.marketing_strategy}</p>}
                                            {
                                                toggleMarketingStrategy &&
                                                <form onSubmit={handleSubmit(onSubmitMarketHandler)}
                                                      className="profile-details overview-form w-100">
                                                        <textarea ref={register} name="marketing_strategy" rows="5"
                                                                  className="full-width edit-input"
                                                                  defaultValue={startupProf.market.marketing_strategy}/>
                                                    <button className="btn btn-xs mr-2" type={"button"} onClick={() => setMarketingStrategy(false)}>Cancel</button>
                                                    <button className="btn btn-xs" type={"submit"}>Update</button>
                                                </form>
                                            }
                                            {/*<div className="text-right">*/}
                                            {/*    <a href="#">Read more</a>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="startup-description">
                                            {hasEdit &&
                                            <img onClick={() => toggleFormHandler('companyCompetitors')}
                                                 className="edit-icon"
                                                 title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>}
                                            <img src="/images/icon/marketing-summary.svg" alt=""/>
                                            <p className="profile-name">
                                                Company Competitors
                                            </p>
                                            {!toggleCompanyCompetitors &&
                                            <p className="text-description text-capitalize">{startupProf.market.company_competitors}</p>}
                                            {
                                                toggleCompanyCompetitors &&
                                                <form onSubmit={handleSubmit(onSubmitMarketHandler)}
                                                      className="profile-details overview-form w-100">
                                                        <textarea ref={register} name="company_competitors" rows="5"
                                                                  className="full-width edit-input"
                                                                  defaultValue={startupProf.market.company_competitors}/>
                                                    <button className="btn btn-xs mr-2" type={"button"}
                                                            onClick={() => setCompanyCompetitors(false)}>Cancel
                                                    </button>
                                                    <button className="btn btn-xs" type={"submit"}>Update</button>
                                                </form>
                                            }
                                            {/*<div className="text-right">*/}
                                            {/*    <a href="#">Read more</a>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="startup-description">
                                            {hasEdit && <img onClick={() => toggleFormHandler('competitiveAdvantage')}
                                                             className="edit-icon"
                                                             title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>}
                                            <img src="/images/icon/marketing-summary.svg" alt=""/>
                                            <p className="profile-name">
                                                Competitive Advantage
                                            </p>
                                            {!toggleCompetitiveAdvantage &&
                                            <p className="text-description text-capitalize">{startupProf.market.competitive_advantage}</p>}
                                            {
                                                toggleCompetitiveAdvantage &&
                                                <form onSubmit={handleSubmit(onSubmitMarketHandler)}
                                                      className="profile-details overview-form w-100">
                                                        <textarea ref={register} name="competitive_advantage" rows="5"
                                                                  className="full-width edit-input"
                                                                  defaultValue={startupProf.market.competitive_advantage}/>
                                                    <button className="btn btn-xs mr-2" type={"button"} onClick={() => setCompetitiveAdvantage(false)}>Cancel</button>
                                                    <button className="btn btn-xs" type={"submit"}>Update</button>
                                                </form>
                                            }
                                            {/*<div className="text-right">*/}
                                            {/*    <a href="#">Read more</a>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                    <div className="startup-heading startup-comments mt-4" id="comments">

                        <div className="d-flex justify-content-between">
                            <h5 className={!hasPermission ? 'mt-5' : ''}>Comments ({comments.length})</h5>
                            <div className="startup-ratings-section">
                                <div className="startup-ratings">
                                    <span className="mr-5">Rate Startup</span>
                                    <div className="rater-js" data-rate-value={starRating.overall_rating}/>
                                    <span className="rate-total">{starRating.formatted_rating}</span>
                                </div>
                                <span
                                    className="rating-count">{starRating.total_rating} {starRating.total_rating > 1 ? 'Ratings' : 'Rating'}</span>
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-12">
                                {
                                    comments.map(comment => <div key={comment.id}
                                                                 className="startup-description comment">
                                        <div>
                                            {comment.comment}
                                        </div>

                                        <div className="comment-info">
                                            <span>{comment.commentator} • {comment.date_added}</span>
                                        </div>

                                        <div className="comment-replies">
                                            <div className="reply-actions">
                                                <a
                                                    onClick={() => comment.replies.length > 0 ? showReplyHandler(comment.id) : null}>
                                                    {comment.replies.length > 0 ? `${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}` : 'No replies yet'}
                                                </a>
                                                {
                                                    hasPermission && <>&nbsp;•&nbsp; <a
                                                        onClick={() => showReplyFormHandler(comment.id)}>Reply</a></>
                                                }
                                            </div>

                                            {
                                                (comment.showReply && comment.showReplyForm) &&
                                                <form className="w-100 profile-details"
                                                      onSubmit={handleSubmit(replyHandler)}>
                                                    <textarea ref={register} className="full-width mb-0" name="reply"
                                                              rows="1"
                                                              placeholder="Reply" required/>
                                                    <input type="hidden" name="comment_id" ref={register}
                                                           defaultValue={comment.id}/>

                                                    <button className="btn btn-sm" type="submit">Reply</button>
                                                </form>
                                            }

                                            {
                                                comment.showReply && <div className="replies">
                                                    {
                                                        comment.replies.map(reply => <div key={reply.id}
                                                                                          className="reply">
                                                            <div>{reply.reply}</div>

                                                            <div className="comment-info">
                                                                <span>{reply.replier} • {reply.date_added}</span>
                                                            </div>
                                                        </div>)
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </div>)
                                }
                            </div>

                            {
                                userType === 'Investor' && hasPermission && <div className="col-12 mb-4">
                                    <form className="w-100 profile-details" onSubmit={handleSubmit(commentHandler)}>
                                    <textarea className="full-width mb-0" ref={register} name="comment" rows="5"
                                              placeholder="Drop your comment here" required/>

                                        <button className="btn btn-sm" type="submit">Comment</button>
                                    </form>
                                </div>
                            }
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </section>

}

export default StartupProfile;