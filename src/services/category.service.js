import axios from "../helpers/axios";

 
 const getAllCategory = ()=>{

    // console.log("Into get all category service.js");
     return axios.get('category/getcategory').then((response)=>{

        // console.log(response)
         return response.data;
     })
 }

 
 const categoryService = {
    getAllCategory,
 }

 export default categoryService;