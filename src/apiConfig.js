// export const api = `http://localhost:2000/api`;
const baseURL = "https://ecom-backend-rest-server.onrender.com";
export const api = `${baseURL}/api`;
export const generatePublicImageUrl = (filename)=>{
    return `${baseURL}/public/${filename}`;
}