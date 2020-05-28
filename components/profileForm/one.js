import React from "react";

export default function ProfileOne() {
    return <section className="profile single-post">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="numbers">
                        <div className="number">1</div>
                        <p>Basic information</p>
                    </div>

                    <div className="numbers only">
                        <div className="number fade">2</div>
                        <p className="fade">Your company</p>
                    </div>

                    <div className="numbers">
                        <div className="number fade">3</div>
                        <p className="fade">Finance</p>
                    </div>
                </div>
                <div className="col-md-9">
                    <form action="#" className="profile-details">
                        <label htmlFor="profile-pic">Profile Picture</label>
                        <input id="image-upload" title="&nbsp;" type="file" name="profile_photo" required="" capture/>
                        <div className="d-flex">
                            <input className="small-width" type="number" name="Country code" id=""
                                   placeholder="Country code"/>
                            <input className="medium-width" type="number" name="Phone number" id=""
                                   placeholder="Phone number"/>
                        </div>
                        <input className="full-width" type="text" name="Sex" id="" placeholder="Sex"/>
                        <label htmlFor="About">About yourself</label>
                        <textarea className="full-width" name="" id="" cols="30" rows="10"/>
                        <button className="btn btn-profile" type="submit">Save & Next</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
}