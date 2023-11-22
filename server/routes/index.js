const Router = require('express')
const router = new Router();
const productRouter = require('./productRouter');
const adminRouter = require('./adminRouter')

router.use('/product', productRouter);
router.use('/admin', adminRouter);

module.exports = router