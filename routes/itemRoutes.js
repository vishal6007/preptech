const { Router } = require('express');
const itemController = require('../controllers/itemController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

const router = Router();

router.get('/myrequest',requireAuth,itemController.myrequest_get);
router.get('/requestitem',requireAuth,itemController.requestitem_get);
router.post('/requestitem',requireAuth,itemController.requestitem_post);
router.get('/donatable', requireAuth, itemController.donatable);
router.get('/edititem',requireAuth,itemController.edititem_get);
router.post('/edititem',requireAuth,itemController.edititem_post);
router.get('/deleteitem',requireAuth,itemController.deleteitem);
router.get('/viewitem',requireAuth,itemController.viewitem);

module.exports = router;
