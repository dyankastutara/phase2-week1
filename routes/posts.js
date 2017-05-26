const express = require('express')
const router = express.Router()
const controllerPost = require('../controllers/posts')
const passport = require('passport')
const helperJwt = require('../helpers/jwtVerify')

router.get('/',controllerPost.read)
router.post('/',helperJwt.verifyToken,controllerPost.create)
router.post('/delete',helperJwt.verifyToken,controllerPost.deletePost)
router.put('/:id',helperJwt.verifyToken,controllerPost.update)
router.post('/validate',helperJwt.verifyToken,controllerPost.read)

module.exports = router