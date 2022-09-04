import axios from "../helpers/axios";


const getProductPage = (payload)=>{
    // console.log(payload);
    const {cid,type} = payload; 
    return axios.get(`page/${cid}/${type}`).then((response)=>{
        return response.data;
    });
}
 
 const pageService = {
    getProductPage,
 }

 export default pageService;