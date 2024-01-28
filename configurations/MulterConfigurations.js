const multer = require("multer")

//Multer Configurations
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const time = new Date().getTime();
        cb(null, `${time}_${file.originalname}`)
    }
    })

    const upload = multer({ storage: storage })

module.exports = upload