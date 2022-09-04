import axios from "../helpers/axios";

 
 const getProductBySlug = (slug)=>{
     return axios.get(`product/${slug}`).then((response)=>{
        // console.log(response)
         return response.data;
     })
 }

const getProductDetailsById = (payload)=>{
    const {productId} = payload; 
    return axios.get(`product/getDetails/${productId}`).then((response)=>{
        // console.log(response.data);
        return response.data;
    });
}
 
 const productService = {
    getProductBySlug,
    getProductDetailsById,
 }

 export default productService;