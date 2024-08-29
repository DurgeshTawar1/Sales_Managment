import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: "dozwvdo2d",
    api_key: 886429937177543,
    api_secret: "dKgaXh4QoaebvqrmYL4L2eln_ew"
});

export default cloudinary;
