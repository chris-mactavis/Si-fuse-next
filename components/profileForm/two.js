export default function ProfileTwo() {
    return <section className="profile profile-2 single-post">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="numbers">
                        <div className="number">1</div>
                        <p className="number-1">Basic information</p>
                    </div>

                    <div className="numbers only">
                        <div className="number">2</div>
                        <p>Your company</p>
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

                        <label htmlFor="industry">Your industry</label>
                        <div className="d-flex flex-wrap mb-4">
                            <label className="checkout-label">
                                <input type="checkbox" name="Construction" id=""/>
                                <span className="checkout-custom"/>
                                Construction
                            </label>
                            <label className="checkout-label">
                                <input type="checkbox" name="Energy" id=""/>
                                <span className="checkout-custom"/>
                                Energy
                            </label>
                            <label className="checkout-label">
                                <input type="checkbox" name="Entertainment" id=""/>
                                <span className="checkout-custom"/>
                                Entertainment
                            </label>
                            <label className="checkout-label">
                                <input type="checkbox" name="Education" id=""/>
                                <span className="checkout-custom"/>
                                Education
                            </label>
                            <label className="checkout-label">
                                <input type="checkbox" name="E-commerce" id=""/>
                                <span className="checkout-custom"/>
                                E-commerce
                            </label>
                            <label className="checkout-label">
                                <input type="checkbox" name="Agriculture" id=""/>
                                <span className="checkout-custom"/>
                                Agriculture
                            </label>
                            <label className="checkout-label">
                                <input type="checkbox" name="IT & Communication" id=""/>
                                <span className="checkout-custom"/>
                                IT & Communication
                            </label>
                            <label className="checkout-label">
                                <input type="checkbox" name="Hospitality" id=""/>
                                <span className="checkout-custom"/>
                                Hospitality
                            </label>
                        </div>

                        <input className="full-width" type="text" name="Company name" id=""
                               placeholder="Company name"/>
                        <input className="full-width" type="text" name="Company website" id=""
                               placeholder="Company website"/>

                        <label htmlFor="Social links">Social links</label>
                        <div className="d-flex flex-wrap">
                            <input type="text" className="small-width" placeholder="Facebook"/>
                            <input type="text" className="small-width" placeholder="Instagram"/>
                            <input type="text" className="small-width" placeholder="Twitter"/>
                            <input type="text" className="small-width" placeholder="LinkedIn"/>
                        </div>

                        <label htmlFor="About">Business Summary</label>
                        <textarea className="full-width" name="" id="" cols="30" rows="10"/>

                        <label htmlFor="About">Value Proposition</label>
                        <textarea className="full-width" name="" id="" cols="30" rows="10"/>

                        <label htmlFor="Video/Image">Video / Image of Picture</label>
                        <label id="video-upload">
                            <input className="input-file" title="&nbsp;" type="file" name="Video_image"
                                   required="" capture/>
                            Upload Video
                        </label>

                        <button className="btn btn-profile" type="submit">Save & Next</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

}