const productRouter = require('express').Router();
const productController = require('../controllers/productController');
const passportJWT = require('../middleware/passportJWT')();
const { checkProduct } = require('../validations/validators');


productRouter.get('/', passportJWT.authenticate(), productController.list);
productRouter.post('/', passportJWT.authenticate(), checkProduct, productController.store);
productRouter.get('/:id', passportJWT.authenticate(), productController.show);
productRouter.put('/:id', passportJWT.authenticate(), productController.update);
productRouter.delete('/:id', passportJWT.authenticate(), productController.delete);

module.exports = productRouter;