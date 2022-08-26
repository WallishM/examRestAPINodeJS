const productRouter = require('express').Router();
const productController = require('../controllers/productController');

productRouter.get('/', productController.list);
productRouter.post('/', productController.store);
productRouter.get('/:id', productController.show);
productRouter.put('/:id', productController.update);
productRouter.delete('/:id', productController.delete);

module.exports = productRouter;