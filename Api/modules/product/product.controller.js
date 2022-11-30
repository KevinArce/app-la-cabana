const product = require('./product');
const express = require('express');
const router = express.Router();
class ProductController {
    constructor(app) {
        //router.get('/test', product.test);
        
        //getAllProducts
        router.get('/', product.getAllProducts);

        //getAuthUsers
        router.post('/authUsers', product.getAuthUsers);

        // getIndex
        router.get('/index', product.getIndex);

        // getLiquidacion
        router.post('/liquidacion', product.getLiquidacion);

        // getPortada
        router.post('/portada', product.getPortada);

        //getComparativoCliente
        router.get('/comparativoCliente', product.getComparativoCliente);

        //getPortal_Rendi_Cortes_Select
        router.post('/portalRendiCortesSelect', product.getPortal_Rendi_Cortes_Select);
        
        //getSp_Portal_Rendi_Envios_Select
        router.post('/portalRendiEnviosSelect', product.getSp_Portal_Rendi_Envios_Select);

        //getSp_Portal_Rendi_Proveedores_Select
        router.get('/portalRendiProveedoresSelect', product.getSp_Portal_Rendi_Proveedores_Select);

        //getToneladasTotales
        router.get('/toneladasTotales', product.getToneladasTotales);

        //getSp_Portal_Rendi_Lotes_Select
        router.post('/portalRendiLotesSelect', product.getSp_Portal_Rendi_Lotes_Select);

        //getToneladasTotalesTabla
        router.post('/toneladasTotalesTabla', product.getToneladasTotalesTabla);

        //getComboLotes
        router.post('/comboLotes', product.getComboLotes);

        //getGraficarResumen
        router.get('/graficarResumen', product.getGraficarResumen);

        //getDetalleEstadoCuenta
        router.get('/detalleEstadoCuenta', product.getDetalleEstadoCuenta);

        //getCreditoActivosTabla
        router.get('/creditoActivosTabla', product.getCreditoActivosTabla);


      app.use('/api/v1', router);
    }
 }
module.exports = ProductController;