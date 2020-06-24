import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../store/actions/loader";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import {showNotifier} from "../../store/actions/notifier";
import {showImageViewer, showVideoViewer} from "../../store/actions/imageViewer";

const StartupProfile = ({company, services: product_services, finance, market, profile, hasEdit = false, profileContent: {startup, industries, locations, stages}}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const overviewBtn = $('#overview-btn');
        const productServiceBtn = $('#product-services-btn');
        const financeBtn = $('#finance-btn');
        const marketingSummaryBtn = $('#marketing-summary-btn');

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

        productServiceBtn.click(function () {
            $('html, body').animate({
                scrollTop: $('#productServices').offset().top - 20
            }, 1000);
        });

        financeBtn.click(function () {
            $('html, body').animate({
                scrollTop: $('#finance').offset().top - 20
            }, 1000);
        });

        marketingSummaryBtn.click(function () {
            $('html, body').animate({
                scrollTop: $('#marketingSummary').offset().top - 20
            }, 1000);
        });

    }, []);

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

    const [startupProf, setStartupProfile] = useState({company, product_services, finance, market, profile});
    let startupIndustries = [];
    if (startupProf.company.industries.length > 0) {
        startupIndustries = startupProf.company.industries.map(industry => industry.industry.industry);
    }

    const {register, handleSubmit} = useForm();

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
            const {data: response} = await axiosInstance.post('startups/product-service', {...data, is_editing: true}, {
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

    const connectHandler = async data => {
        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post(`connect`, null, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            console.log(response);
            dispatch(showNotifier('Connected Successfully'));
            dispatch(loader());
        } catch (e) {
            dispatch(showNotifier(e.response.data.message, 'danger'));
            dispatch(loader());
            console.log(e);
        }
    }

    return <section className="startup-content">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="startup-sidebar" id="sidebar-scroller">
                        <div className="profile-content">
                            <img id="viewer-image"
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
                            { !hasEdit && <button onSubmit={connectHandler} className="btn">Connect</button>}
                        </div>
                        <button className="startup-link-view" id="overview-btn">
                            Overview <img src="/images/icon/pie-chart.svg" alt=""/>
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
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="startup-heading" id="overview">
                        <h5>Overview</h5>
                        <div className="row">
                            <div className="col-12">
                                <div className="startup-description">
                                    {hasEdit &&
                                    <img onClick={() => toggleFormHandler('about')} className="edit-icon" title="Edit"
                                         src="/images/icon/pencil-icon.svg" alt=""/>}

                                    <img src="/images/icon/building.svg" alt=""/>
                                    <p className="profile-name">
                                        About {startupProf.company.name}
                                    </p>
                                    {
                                        !toggleAbout && <p className="text-description">
                                            {startupProf.profile.about}
                                        </p>
                                    }
                                    {
                                        toggleAbout && <form onSubmit={handleSubmit(onSubmitHandler)}
                                                             className="profile-details overview-form w-100">
                                            <textarea rows="5" name="about" ref={register}
                                                      className="full-width edit-input"
                                                      defaultValue={startupProf.profile.about}/>
                                            <button className="btn btn-sm" type={"submit"}>Update</button>
                                        </form>
                                    }
                                    <div className="text-right">
                                        <a href="#">Read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>

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
                                            ${startupProf.finance.funding_needed}
                                        </p>
                                    }
                                    {
                                        toggleFund && <form onSubmit={handleSubmit(onSubmitFinanceHandler)}
                                                            className="profile-details overview-form w-100">
                                            <input type="text" ref={register} name="funding_needed"
                                                   className="full-width edit-input"
                                                   defaultValue={startupProf.finance.funding_needed}/>
                                            <button className="btn btn-sm" type={"submit"}>Update</button>
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
                                        Industries
                                    </p>

                                    {
                                        !toggleIndustry && <p className="p-move-down industry-paragraph">
                                            {startupIndustries.length > 0 ? startupIndustries.map((industry, index) =>
                                                <span key={index}
                                                      className="industry-span">{industry}</span>) : 'N/A'}
                                        </p>
                                    }

                                    {
                                        toggleIndustry && <form onSubmit={handleSubmit(onSubmitCompanyHandler)}
                                                                className="profile-details overview-form w-100">
                                            <select multiple name="industry_ids" ref={register}>
                                                <option value="">Select Industry</option>
                                                {industries.map(industry => <option key={industry.id}
                                                                                    value={industry.id}
                                                                                    selected={startupIndustries.includes(industry.industry)}>{industry.industry}</option>)}
                                            </select>
                                            <button className="btn btn-sm" type={"submit"}>Update</button>
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
                                            <button className="btn btn-sm" type={"submit"}>Update</button>
                                        </form>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="startup-heading" id="productServices">
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
                                            <button className="btn btn-sm" type={"submit"}>Update</button>
                                        </form>
                                    }
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div className="startup-description">
                                    <img className="edit-icon" onClick={() => toggleFormHandler('productImages')} title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>
                                    <p className="profile-name">
                                        Product Images
                                    </p>

                                    {
                                        !toggleProductImages && <div className="product-img-list">
                                            {startupProf.product_services.hasOwnProperty('product_image_array') ? startupProf.product_services.product_image_array.map((image, index) => <img
                                                className="pointer" key={index}
                                                onClick={() => dispatch(showImageViewer(image))} src={image} alt=""/>) : null}
                                        </div>
                                    }
                                    {
                                        toggleProductImages && <form onSubmit={handleSubmit(onSubmitServiceHandler)}
                                                                   className="profile-details overview-form w-100">
                                            <input name="product_images" ref={register} className="full-width edit-input"
                                                   type="text"
                                                   defaultValue={startupProf.product_services.hasOwnProperty('product_image_array') ? startupProf.product_services.product_image_string : null}/>
                                            <button className="btn btn-sm" type={"submit"}>Update</button>
                                        </form>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="startup-description">
                                    <img className="edit-icon" onClick={() => toggleFormHandler('productVideo')} title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>
                                    <img src="/images/icon/play.svg" alt=""/>
                                    <p className="profile-name">
                                        Product Video
                                    </p>

                                    {
                                        !toggleProductVideo &&<div className="player-thumbnail" onClick={() => dispatch(showVideoViewer(startupProf.product_services.product_video_url))}>
                                            <video src={startupProf.product_services.product_video_url}/>
                                        </div>
                                    }
                                    {
                                        toggleProductVideo && <form onSubmit={handleSubmit(onSubmitServiceHandler)}
                                                                     className="profile-details overview-form w-100">
                                            <input name="product_video_url" ref={register} className="full-width edit-input"
                                                   type="text"
                                                   defaultValue={startupProf.product_services.product_video_url}/>
                                            <button className="btn btn-sm" type={"submit"}>Update</button>
                                        </form>
                                    }
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="startup-description">
                                    <img onClick={() => toggleFormHandler('pitchVideo')} className="edit-icon" title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>
                                    <img src="/images/icon/play.svg" alt=""/>
                                    <p className="profile-name">
                                        Pitch Video
                                    </p>

                                    {
                                        !togglePitchVideo && <div className="player-thumbnail" onClick={() => dispatch(showVideoViewer(startupProf.product_services.pitch_video_url))}>
                                            <video src={startupProf.product_services.pitch_video_url}/>
                                        </div>
                                    }
                                    {
                                        togglePitchVideo && <form onSubmit={handleSubmit(onSubmitServiceHandler)}
                                                                    className="profile-details overview-form w-100">
                                            <input name="pitch_video_url" ref={register} className="full-width edit-input"
                                                   type="text"
                                                   defaultValue={startupProf.product_services.pitch_video_url}/>
                                            <button className="btn btn-sm" type={"submit"}>Update</button>
                                        </form>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="startup-description">
                                    {hasEdit &&
                                    <img onClick={() => toggleFormHandler('valueProposition')} className="edit-icon"
                                         title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>}
                                    <img src="/images/icon/book.svg" alt=""/>
                                    <p className="profile-name">
                                        Value Proposition
                                    </p>
                                    {!toggleValueProposition &&
                                    <p className="text-description">{startupProf.company.value_proposition}</p>}

                                    {
                                        toggleValueProposition && <form onSubmit={handleSubmit(onSubmitCompanyHandler)}
                                                                        className="profile-details overview-form w-100">
                                            <textarea name="value_proposition" ref={register} rows="5"
                                                      className="full-width edit-input"
                                                      defaultValue={startupProf.company.value_proposition}/>
                                            <button className="btn btn-sm" type={"submit"}>Update</button>
                                        </form>
                                    }
                                    <div className="text-right">
                                        <a href="#">Read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                        toggleCapitalFor && <form onSubmit={handleSubmit(onSubmitFinanceHandler)}
                                                                  className="profile-details overview-form w-100">
                                            <select name="capital_needed_for" ref={register}
                                                    defaultValue={startupProf.finance.capital_needed_for}>
                                                <option value="">Capital Needed for</option>
                                                <option value="Proof of concept">Proof of concept</option>
                                                <option value="Working capital">Working capital</option>
                                                <option value="Growth capital">Growth capital</option>
                                                <option value="Bridging Capital">Bridging capital</option>
                                            </select>
                                            <button className="btn btn-sm" type={"submit"}>Update</button>
                                        </form>
                                    }
                                    <div className="text-right">
                                        <a href="#">Read more</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="startup-description">
                                    {hasEdit &&
                                    <img onClick={() => toggleFormHandler('businessSummary')} className="edit-icon"
                                         title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>}
                                    <img src="/images/icon/book.svg" alt=""/>
                                    <p className="profile-name">
                                        Business Summary
                                    </p>
                                    {!toggleBusinessSummary &&
                                    <p className="text-description">{startupProf.company.summary}</p>}
                                    {
                                        toggleBusinessSummary && <form onSubmit={handleSubmit(onSubmitCompanyHandler)}
                                                                       className="profile-details overview-form w-100">
                                            <textarea ref={register} name="summary" rows="5"
                                                      className="full-width edit-input"
                                                      defaultValue={startupProf.company.summary}/>
                                            <button className="btn btn-sm" type={"submit"}>Update</button>
                                        </form>
                                    }
                                    <div className="text-right">
                                        <a href="#">Read more</a>
                                    </div>
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
                                    <img onClick={() => toggleFormHandler('addressableMarket')} className="edit-icon"
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
                                            <button className="btn btn-sm" type={"submit"}>Update</button>
                                        </form>
                                    }
                                    <div className="text-right">
                                        <a href="#">Read more</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="startup-description">
                                    {hasEdit &&
                                    <img onClick={() => toggleFormHandler('marketingStrategy')} className="edit-icon"
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
                                            <button className="btn btn-sm" type={"submit"}>Update</button>
                                        </form>
                                    }
                                    <div className="text-right">
                                        <a href="#">Read more</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="startup-description">
                                    {hasEdit &&
                                    <img onClick={() => toggleFormHandler('companyCompetitors')} className="edit-icon"
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
                                            <button className="btn btn-sm" type={"submit"}>Update</button>
                                        </form>
                                    }
                                    <div className="text-right">
                                        <a href="#">Read more</a>
                                    </div>
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
                                            <button className="btn btn-sm" type={"submit"}>Update</button>
                                        </form>
                                    }
                                    <div className="text-right">
                                        <a href="#">Read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

}

export default StartupProfile;