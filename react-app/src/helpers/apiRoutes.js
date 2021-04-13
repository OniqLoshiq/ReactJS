const url = 'http://127.0.0.1:5050/api'


const apiRoutes = {
    register: `${url}/users/register`,
    signIn: `${url}/users/signin`,
    logout: `${url}/users/logout`,
    auth: `${url}/users/auth`
}


export default apiRoutes;