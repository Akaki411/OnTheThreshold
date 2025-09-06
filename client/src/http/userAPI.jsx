import {$authHost, $host} from "./index.jsx";
import * as jwt_decode from 'jwt-decode';

export const Register = async (params) => {
    const {data} = await $host.post('api/user/registration', params)
    localStorage.setItem('token', data.token)
    return jwt_decode.jwtDecode(data.token)
}
export const Login = async (params) => {
    const {data} = await $host.post('api/user/login', params)
    localStorage.setItem('token', data.token)
    return jwt_decode.jwtDecode(data.token)
}
export const Check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode.jwtDecode(data.token)
}
export const CheckNickname = async ({nickname}) => {
    const {data} = await $host.get('api/user/check/nickname?nickname=' + nickname)
    return data.find
}
export const CheckEmail = async ({email}) => {
    const {data} = await $host.get('api/user/check/email?email=' + email)
    return data.find
}
export const CheckRegToken = async ({token}) => {
    const {data} = await $host.get('api/user/check/reg-token?token=' + token)
    return data
}