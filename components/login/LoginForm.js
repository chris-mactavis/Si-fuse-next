import Link from "next/link";

export default function LoginForm() {
    return <div className="signup-content mt-5 pt-5">
        <h1>Login</h1>
        <p className="text-center">
            <Link href="signup">
                <a>Signup Instead?</a>
            </Link>
        </p>

        <form className="sign-up w-100">
            <input className="w-100" type="email" name="Email" id="email" placeholder="Email" autoComplete="false"/>
            <input className="w-100" type="password" name="Password" id="pwd" placeholder="Password"/>
             {/*Change the button type back to Submit*/}
            <button onClick="parent.location='profile.html'" type="button" className="btn btn-white">Login
            </button>
        </form>
        <p className="text-center">Forgot Password? <a href="#">Click here</a></p>
    </div>
}