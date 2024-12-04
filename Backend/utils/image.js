import multer from 'multer';
import path from 'path';
import fs, { mkdirSync } from "fs";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(fs.existsSync("./uploads")){
            cb(null, "./uploads")
        }else{
            mkdirSync("./uploads")
            cb(null, "./uploads")
        }
    },

    filename: function(req, file, cb){
        const orgName = file.originalname
        const fname = path.parse(orgName).name
        const ext = path.parse(orgName).ext
        const finalName = fname + "-" + Date.now() + ext
        cb(null, finalName)
    }
})

export default storage;