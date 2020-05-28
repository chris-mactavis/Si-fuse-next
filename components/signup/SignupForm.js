import Link from "next/link";

export default function SignupForm() {
    return <div className="signup-content mt-5 pt-5">
        <h1>Sign Up</h1>
        <p className="text-center">
            <Link href="login">
                <a>Login Instead?</a>
            </Link>
        </p>

        <form className="sign-up">
            <div className="w-100 d-flex">
                <input className="w-50 m-right" type="text" name="Fname" id="fname" placeholder="First Name"/>
                <input className="w-50" type="text" name="Lname" id="lname" placeholder="Last Name"/>
            </div>
            <input className="w-100" type="email" name="Email" id="email" placeholder="Email"/>
            <select className="w-100" name="Country" id="country">
                <option>Country</option>
            </select>
            <input className="w-100" type="password" name="Password" id="pwd" placeholder="Password"/>
            <input className="w-100" type="password" name="Password" id="pwd" placeholder="Confirm Password"/>
            <button onClick="parent.location='profile.html'" type="button" className="btn btn-white">Sign
                up
            </button>
        </form>
    </div>
}