const multer = require('multer')
const path = require("path");

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // Example: 123612783612783612367851-cutiepie.jpg
        cb(null, uniquePrefix + '-' +  file.originalname)
    },
})

// Create the multer instance
const upload = multer(
    { 
        storage,
        limits: { fileSize: 2 * 1024 * 1024 }, // in bytes --> 2mb limit
        fileFilter: function (req, file, callback) {
            // Get File Extension
            const ext = path.extname(file.originalname).toLowerCase();

            // Add Desired File Extensions here
            const allowedFileExtensions = ['.png', '.jpg', '.gif', '.jpeg'];

            if(!allowedFileExtensions.includes(ext)) {
                return callback(new Error('File format not supported.'))
            }
            
            callback(null, true)
        },
    },
)

module.exports = upload
