import Cookies from 'js-cookie';

export const User = (ctx) => {
    const isServer = typeof window === 'undefined';

    if (isServer && ctx) {
        return JSON.parse(ctx.req.cookies.user);
    }

    return JSON.parse(Cookies.get('user'));
}