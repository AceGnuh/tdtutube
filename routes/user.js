const express = require('express');
const multer = require('multer');
const router = express.Router();

const userController = require('../controllers/user/UserController.js');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //console.log("Data file upload: " + JSON.stringify(file));

        if (file.filename === 'thumbnail') {
            cb(null, 'public/Uploads/thumbnails/')
        } else {
            if (file.filename === 'video') {
                cb(null, 'public/Uploads/videos/')
            } else {
                cb(null, 'public/Uploads/')
            }
        }

    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

// const upload = multer({ dest: 'public/Uploads/' })
const thumbnailAndVideoUpload = upload.fields([{ name: 'thumbnail' }, { name: 'video' }])

const storage_thumbnails = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/thumbnails');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload_thumbnails = multer({ storage_thumbnails });

const storage_avatars = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/Uploads/avatars');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload_avatars = multer({ storage: storage_avatars });

// User watch history page
router.get('/history', userController.history);

// User subscriptions page
router.get('/subscriptions', userController.subscriptions);

// User like videos page
router.get('/liked', userController.liked);

// Check login
router.use(userController.checkLogin);

// User channel
router.get('/', userController.index);

// Edit user information
router.get('/settings', userController.settings);
router.post('/settings', upload_avatars.single('avatar'), userController.updateProfile);
router.post('/changepassword', userController.changePassword);

// Change video information page
router.post('/editvideo', userController.editVideo);
router.post('/updatevideo', upload_thumbnails.single('thumbnail'), userController.updateVideo);

// Upload video page
router.get('/uploadvideo', userController.upload);
router.post('/uploadvideo', thumbnailAndVideoUpload, userController.uploadVideo);

// Update like and subscribe
router.put('/like', userController.putLike);
router.put('/subscribe', userController.putSubscribe);
// Comment video
router.post('/comment', userController.postComment);

// Add new playlist
router.post('/playlist', userController.postPlaylist);
// Add new playlist content
router.post('/playlist/content', userController.postPlaylistContent);
// Delete playlist content
router.delete('/playlist/content', userController.deletePlaylistContent);

module.exports = router;