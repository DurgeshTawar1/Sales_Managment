import { v2 as cloudinary } from 'cloudinary';
import dontenv from "dotenv";


dontenv.config();

const Cloude_Name = process.env.CLOUD_NAME;
const Cloude_Secret_key = process.env.CLODINARY_SECRET_KEY;
const Cloude_Api_key = process.env.CLODINARY_API_KEY;




(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name:Cloude_Name, 
        api_key:Cloude_Api_key, 
        api_secret: Cloude_Secret_key // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();