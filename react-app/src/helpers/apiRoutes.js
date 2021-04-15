const url = 'http://127.0.0.1:5050/api'


const apiRoutes = {
    user: {
        register: `${url}/users/register`,
        signIn: `${url}/users/signin`,
        logout: `${url}/users/logout`,
        auth: `${url}/users/auth`,
        main: `${url}/users`,
    },
    category: {
        main: `${url}/categories`,
        list: `${url}/categories?list=`
    },
    article: {
        main: `${url}/articles`,
    }
}


export default apiRoutes;