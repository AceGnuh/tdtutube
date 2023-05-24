const connection = require('../../utils/database.js');
const { convertBuffer2Boolean } = require('../../utils/helper/helper.js')

class UserModel {
    getUsers() {
        return new Promise(function(resolve, reject) {
            let sql = ` SELECT user.*,
                        SUM(video.VIEW_COUNT) AS TOTAL_VIEW_COUNT,
                        COUNT(video.ID) AS TOTAL_VIDEO
                        FROM user LEFT JOIN video ON user.ID = video.user_ID
                        WHERE user.ROLE_ID <> 1
                        GROUP BY user.ID
                        `
            connection.query(sql, (err, users) => {
                if (err) {
                    reject(err)
                }

                if(users){
                    users = users.map(user => ({
                        ...user,
                        _hide: convertBuffer2Boolean(user.hide)
                    }))
    
                    console.log(JSON.stringify(users))
    
                    resolve(users)
                }
                
            })
        })
    }

    getUsersById(id) {
        return new Promise(function(resolve, reject) {

            let sql = ` SELECT user.*,
                        COUNT(*) AS NUM_VIDEO,
                        SUM(video.view_count) AS TOTAL_VIEW,
                        SUM(video.like_count) AS TOTAL_LIKE,
                        SUM(video.comment_count) AS TOTAL_COMMENT
                        FROM user INNER JOIN video ON user.id = video.user
                        WHERE user.ID = ? and WHERE user.ROLE_ID <> 1
                        `

            connection.query(sql, [id], function(err, user) {
                if (err) {
                    reject(err);
                }

                if (!user) {
                    resolve(undefined)
                }

                console.log(JSON.stringify(user))

                user = user[0]

                user.status = convertBuffer2Boolean(user.status)

                resolve(user)
            })
        })
    }

    blockUserById(id) {
        return new Promise(function(resolve, reject) {
            let sql = 'UPDATE user SET HIDE = 1 WHERE ID = ?'

            connection.query(sql, [id], function(err, rows) {
                if (err) {
                    reject(err)
                }

                resolve(rows.changedRows)
            })
        })
    }

    unblockUserById(id) {
        return new Promise(function(resolve, reject) {
            let sql = 'UPDATE user SET HIDE = 0 WHERE ID = ?'

            connection.query(sql, [id], function(err, rows) {
                if (err) {
                    reject(err)
                }

                resolve(rows.changedRows)
            })
        })
    }

    deleteUserById(id) {
        return new Promise(function(resolve, reject) {

        })
    }
}

module.exports = new UserModel