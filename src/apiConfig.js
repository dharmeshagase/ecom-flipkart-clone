// export const api = `http://localhost:2000/api`;
const baseURL = "https://flipkart-backend-rest-server.herokuapp.com";
export const api = `${baseURL}/api`;
export const generatePublicImageUrl = (filename)=>{
    return `${baseURL}/public/${filename}`;
}