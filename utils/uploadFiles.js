const multer  = require('multer');

module.exports.upload = multer({storage:multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"files")
    },
    filename:(req,file,callback)=>{
        callback(null, file.originalname)
    }
})})