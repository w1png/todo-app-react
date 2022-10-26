import { useCookies as useReactCookies } from 'react-cookie';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';


const useCookies = () => {
    const [cookies, setCookie] = useReactCookies(['user_id']);

    useEffect(() => {
        if (!cookies.user_id) {
            setCookie('user_id', uuid(), { path: '/' });
        }
    }, [cookies.user_id, setCookie]);

    return cookies;
};

export default useCookies;
