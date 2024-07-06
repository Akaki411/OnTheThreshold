import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const Register = async (params) => {
    const {data} = await $host.post('api/user/registration', params)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const Login = async (params) => {
    const {data} = await $host.post('api/user/login', params)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const Check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}