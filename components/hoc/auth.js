import Router, {useRouter} from 'next/router'
import Cookies from 'js-cookie'
import nookies from 'nookies';

export const auth = Component => {

    const isServer = typeof window === 'undefined';

    const Wrapper = (props) => {
        if (!props.isLoggedIn && !isServer) {
            Router.push('/login')
        }

        return <Component {...props} />
    }

    Wrapper.getInitialProps = async (ctx) => {

        let isLoggedIn;
        console.log(isServer, 'isServer');
        if (isServer && ctx.res) {
            isLoggedIn = !!ctx.req.cookies.token;
            if (!isLoggedIn) {
                nookies.set(ctx, 'redirectIntended', ctx.pathname, {});
                ctx.res.writeHead(302, {Location: '/login'});
                ctx.res.end();
            }
        } else {
            isLoggedIn = !!Cookies.get('token');
        }

        const componentProps =
            Component.getInitialProps &&
            (await Component.getInitialProps(ctx));

        return {...componentProps, isLoggedIn};
    }

    return Wrapper;
}

export const withoutAuth = Component => {
    const isServer = typeof window === 'undefined';

    const Wrapper = (props) => {
        if (props.isLoggedIn && !isServer) {
            Router.push('/')
        }

        return <Component {...props} />
    }

    Wrapper.getInitialProps = async (ctx) => {

        let isLoggedIn;
        if (isServer && ctx.res) {
            isLoggedIn = !!ctx.req.cookies.token;
            if (isLoggedIn) {
                ctx.res.writeHead(302, {Location: '/'});
                ctx.res.end();
            }
        } else {
            isLoggedIn = !!Cookies.get('token');
        }

        const componentProps =
            Component.getInitialProps &&
            (await Component.getInitialProps(ctx));

        return {...componentProps, isLoggedIn};
    }

    return Wrapper;
}

export const profileMiddleWare = Component => {
    const isServer = typeof window === 'undefined';
    const Wrapper = (props) => {
        console.log(props.currentPage, 'currentPage');
        if (props.isLoggedIn && !props.hasProfile && !isServer && props.currentPage !== '/profile') {
            console.log('got here');
            Router.push('/profile')
        }
        console.log('here now');
        return <Component {...props} />
    }

    Wrapper.getInitialProps = async (ctx) => {

        let isLoggedIn, hasProfile, currentPage;
        if (isServer && ctx.res) {
            isLoggedIn = !!ctx.req.cookies.token;
            hasProfile = !!ctx.req.cookies.hasProfile;
            currentPage = ctx.pathname;
            console.log('looping');
            if (isLoggedIn && !hasProfile && currentPage !== '/profile') {
                ctx.res.writeHead(302, {Location: '/profile'});
                ctx.res.end();
            }
        } else {
            isLoggedIn = !!Cookies.get('token');
            hasProfile = !!Cookies.get('hasProfile');
            currentPage = '/login';
        }

        const componentProps =
            Component.getInitialProps &&
            (await Component.getInitialProps(ctx));

        return {...componentProps, isLoggedIn, hasProfile, currentPage};
    }

    return Wrapper;
}