const connection = require('../../utils/database.js');
const { convertBuffer2Boolean } = require('../../utils/helper/helper.js')

class VideoModel {
    getVideos() {
        return new Promise(function(resolve, reject) {
            let sql = ` SELECT video.*, 
                        user.name AS user_name, 
                        tag.NAME AS TAGNAME 
                        FROM video, user, tag 
                        where user.id = video.user_id AND video.TAG_ID = tag.ID 
                        order by video.id`

            connection.query(sql, function(err, videos) {
                if (err) {
                    reject(err)
                }

                videos = videos.map(video => ({
                    ...video,
                    _hide: convertBuffer2Boolean(video.hide),
                    _feature: convertBuffer2Boolean(video.feature),
                }))

                resolve(videos)
            })
        })
    }

    blockVideoById(id) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE video SET HIDE = 1 WHERE ID = ?'

            connection.query(sql, [id], function(err, rows) {
                if (err) {
                    reject(err)
                }

                if (rows.changedRows === 1) {
                    // req.flash('status', 'success')
                    // req.flash('message', 'Đã block video')
                    resolve(['success', 'Đã block video'])
                } else {
                    // req.flash('status', 'danger')
                    // req.flash('message', 'Không thể block video')
                    resolve(['danger', 'Không thể block video'])
                }
            })
        })
    }

    unblockVideoById(id) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE video SET HIDE = 0 WHERE ID = ?'

            connection.query(sql, [id], function(err, rows) {
                if (err) {
                    reject(err)
                }

                if (rows.changedRows === 1) {
                    resolve(['success', 'Đã unblock video'])
                } else {
                    resolve(['danger', 'Không thể ublock video'])
                }
            })
        })
    }

    getUnapprovedVideo() {
        return new Promise(function(resolve, reject) {
            let sql = 'SELECT video.*, user.name AS user_name FROM video, user where user.id = video.user_id and video.status <> 0'

            connection.query(sql, function(err, videos) {
                if (err) {
                    reject(err)
                }

                resolve(videos)
            })
        })
    }

    getUnapprovedVideoById(id) {
        return new Promise(function(resolve, reject) {
            let sql = ` SELECT video.*, 
                        user.NAME AS USERNAME, 
                        TAG.NAME AS TAGNAME 
                        FROM video, user, tag 
                        WHERE video.id = ? AND user.ID = video.USER_ID AND video.TAG_ID = tag.ID`

            connection.query(sql, [id], function(err, video) {
                if (err) {
                    reject(err)
                }

                video = video[0]

                resolve(video)
            })
        })
    }

    approvedVideoById(id) {
        return new Promise(function(resolve, reject) {
            let sql = 'UPDATE video SET STATUS = 0 WHERE ID = ?'

            connection.query(sql, [id], function(err, rows) {
                if (err) {
                    reject(err)
                }

                resolve()
            })
        })
    }

    deleteVideoById(id) {
        return new Promise(function(resolve, reject) {
            let sql = 'DELETE FROM video WHERE ID = ?'

            connection.query(sql, [id], function(err, rows) {
                if (err) {
                    reject(err)
                }

                resolve()
            })
        })
    }

    setFeatureVideo(id) {
        return new Promise(function(resolve, reject) {
            let sql = 'UPDATE video SET FEATURE = 1 WHERE ID = ?'

            connection.query(sql, [id], function(err, rows) {
                if (err) {
                    reject(err)
                }

                resolve(rows.changedRows)
            })
        })
    }

    setUnfeatureVideo(id) {
        return new Promise(function(resolve, reject) {
            let sql = 'UPDATE video SET FEATURE = 0 WHERE ID = ?'

            connection.query(sql, [id], function(err, rows) {
                if (err) {
                    reject(err)
                }

                resolve(rows.changedRows)
            })
        })
    }
}

module.exports = new VideoModel;