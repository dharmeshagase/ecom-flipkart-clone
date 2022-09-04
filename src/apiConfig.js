export const api = `http://localhost:2000/api`;
export const generatePublicImageUrl = (filename)=>{
    return `http://localhost:2000/public/${filename}`;
}