const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path')

const Storage = multer.diskStorage(

    {
        destination:  'uploads',
        filename: (req, file, callback) => {
            callback(null, uuidv4() + path.extname(file.originalname));
        },
    }
)

const uploads = multer({ storage: Storage })

module.exports = uploads