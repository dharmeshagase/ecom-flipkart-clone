import axios from "../helpers/axios";

const getAddress = () => {
    return axios.get(`user/address/getAddress`).then((response) => {
        if (response.status == 200){
            // console.log(response.data);
            return response.data}
        else
            return response.error;
    })
}

const addAddress = (payload) => {
    console.log(payload);
    return axios.post(`user/address/create`,payload).then((response) => {
        if (response.status == 200)
            return response.data
        else
            return response.error;

    })
}
const addressService = {
    getAddress,
    addAddress
}
export default addressService