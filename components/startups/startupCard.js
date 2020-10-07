import Router from "next/router";
import React, {useEffect, useState} from "react";
import {getFairness, startupLevel} from "../../helpers";
import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";
import {showNotifier} from "../../store/actions/notifier";

const StartupCard = ({startup: {company, finance, level, profile, slug, rating}}) => {
    const {team, products, investor_exit, vision, scale, business_model, market, problem} = startupLevel(level);

    const [starRating, setStarRating] = useState(rating || {formatted_rating: 0, overall_rating: 0, total_rating: 0});

    useEffect(() => {
        const options = {
            max_value: 5,
            step_size: 1,
            initial_value: 1,
            change_once: true,
            cursor: 'default',
            readonly: true
        }

        setTimeout(() => {
            $(".rater-js").rate(options);
        }, 1000);
    }, []);

    const getClientsServiced = clientsServiced => {
        if (clientsServiced) {
            let clients = JSON.parse(clientsServiced);
            return clients.join(', ');
        }
        return '';
    }

    return <div className="row mb-5 pointer" onClick={() => Router.push('/startups/[id]', `/startups/${slug}`)}>
        <div className="col">
            <article>
                <div className="row">
                    <div className="col">
                        <h4>{company.name}</h4>
                        {/*<div>*/}
                        {/*    <div className="rater-js" data-rate-value="6"/>*/}
                        {/*    <span className="rate-total">{starRating.formatted_rating}</span>*/}
                        {/*    <br/>*/}
                        {/*    <span className="rating-count">{starRating.total_rating} {starRating.total_rating > 1 ? 'Ratings' : 'Rating'}</span>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 d-flex align-items-center">
                        <img className="img-fluid startup-logo" src={company.logo_url} alt=""/>
                    </div>

                    <div className="col-md-6 d-flex align-items-center tagging">
                        <div className="tagging-container">
                            <div className="row">
                                <div className="col-4">
                                    <div className={`level ${getFairness(team)}`}>
                                        <div className="text">
                                            <img className="icon"
                                                 src="/images/icon/startup-level-team.svg"
                                                 alt=""/>
                                            <span>Team</span>
                                        </div>

                                        <p className="grade">{getFairness(team)}</p>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className={`level ${getFairness(problem)}`}>
                                        <div className="text">
                                            <img className="icon"
                                                 src="/images/icon/startup-level-problem.svg"
                                                 alt=""/>
                                            <span>Problem</span>
                                        </div>

                                        <p className="grade">{getFairness(problem)}</p>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className={`level ${getFairness(vision)}`}>
                                        <div className="text">
                                            <img className="icon"
                                                 src="/images/icon/startup-level-vision.svg"
                                                 alt=""/>
                                            <span>Value prop.</span>
                                        </div>

                                        <p className="grade">{getFairness(vision)}</p>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className={`level ${getFairness(market)}`}>
                                        <div className="text">
                                            <img className="icon"
                                                 src="/images/icon/startup-level-market.svg"
                                                 alt=""/>
                                            <span>Market</span>
                                        </div>

                                        <p className="grade">{getFairness(market)}</p>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className={`level ${getFairness(business_model)}`}>
                                        <div className="text">
                                            <img className="icon"
                                                 src="/images/icon/startup-level-business_model.svg"
                                                 alt=""/>
                                            <span>Model</span>
                                        </div>

                                        <p className="grade">{getFairness(business_model)}</p>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className={`level ${getFairness(scale)}`}>
                                        <div className="text">
                                            <img className="icon"
                                                 src="/images/icon/startup-level-scale.svg"
                                                 alt=""/>
                                            <span>Scale</span>
                                        </div>

                                        <p className="grade">{getFairness(scale)}</p>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className={`level ${getFairness(vision)}`}>
                                        <div className="text">
                                            <img className="icon"
                                                 src="/images/icon/startup-level-vision.svg"
                                                 alt=""/>
                                            <span>Vision</span>
                                        </div>

                                        <p className="grade">{getFairness(vision)}</p>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className={`level ${getFairness(investor_exit)}`}>
                                        <div className="text">
                                            <img className="icon"
                                                 src="/images/icon/startup-level-investor_exit.svg"
                                                 alt=""/>
                                            <span>Exit Strategy</span>
                                        </div>

                                        <p className="grade">{getFairness(investor_exit)}</p>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className={`level ${getFairness(products)}`}>
                                        <div className="text">
                                            <img className="icon"
                                                 src="/images/icon/startup-level-products.svg"
                                                 alt=""/>
                                            <span>Product</span>
                                        </div>

                                        <p className="grade">{getFairness(products)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="tags d-flex align-items-center">
                            <div>
                                {company.industry && <span className="tag">{company.industry}</span>}
                                {finance.capital_needed_for &&
                                <span className="tag">{finance.capital_needed_for}</span>}
                                {finance.funding_stage && <span className="tag">{finance.funding_stage}</span>}
                                {finance.geographical_focus &&
                                <span className="tag">{finance.geographical_focus}</span>}
                                {finance.revenue_type && <span className="tag">{finance.revenue_type}</span>}
                                {finance.growth_projection && <span className="tag">{finance.growth_projection}</span>}
                                {(company.clients_serviced && company.clients_serviced !== 'null') && <span className="tag">{getClientsServiced(company.clients_serviced)}</span>}
                                {finance.investor_type && <span className="tag">{finance.investor_type}</span>}
                                {finance.funding_stage && <span className="tag">{finance.funding_stage}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
}

export default StartupCard;