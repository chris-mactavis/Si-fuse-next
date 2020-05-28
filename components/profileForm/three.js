import React from "react";

export default function ProfileThree() {
    return <section className="profile profile-2 single-post">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="numbers">
                        <div className="number">1</div>
                        <p className="number-1">Basic information</p>
                    </div>

                    <div className="numbers only only-1">
                        <div className="number">2</div>
                        <p className="number-1">Your company</p>
                    </div>

                    <div className="numbers">
                        <div className="number">3</div>
                        <p>Finance</p>
                    </div>
                </div>
                <div className="col-md-9">
                    <form action="#" className="profile-details">
                        <label htmlFor="industry">Company Stage</label>
                        <div className="d-flex flex-wrap mb-4">
                            <label className="checkout-label">
                                <input type="checkbox" name="Concept" id=""/>
                                <span className="checkout-custom"/>
                                Concept
                            </label>
                            <label className="checkout-label">
                                <input type="checkbox" name="Early stage" id=""/>
                                <span className="checkout-custom"/>
                                Early stage
                            </label>
                            <label className="checkout-label">
                                <input type="checkbox" name="Scaling" id=""/>
                                <span className="checkout-custom"/>
                                Scaling
                            </label>
                            <label className="checkout-label">
                                <input type="checkbox" name="Established" id=""/>
                                <span className="checkout-custom"/>
                                Established
                            </label>
                        </div>

                        <input className="full-width" type="text" name="Post Revenue" id="" placeholder="Post Revenue"/>
                        <input className="full-width" type="text" name="Pre Revenue" id=""
                               placeholder="Pre Revenue"/>


                        <label htmlFor="POC">Proof of Conception</label>
                        <textarea className="full-width" name="" id="" cols="30" rows="10"/>

                        <select name="Capital" id="">
                            <option>Capital Needed for</option>
                            <option value="Female Owned">Female Owned</option>
                            <option value="Female Led">Female Led</option>
                            <option value="Gender Bias">Gender Bias</option>
                        </select>

                        <button className="btn btn-profile" type="submit">Save & Next</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
}