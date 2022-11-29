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
        router.get('/liquidacion', product.getLiquidacion);

        // getPortada
        router.get('/portada', product.getPortada);

        //getComparativoCliente
        router.get('/comparativoCliente', product.getComparativoCliente);

        //getPortal_Rendi_Cortes_Select
        router.get('/portalRendiCortesSelect', product.getPortal_Rendi_Cortes_Select);
        
        //getSp_Portal_Rendi_Envios_Select
        router.get('/portalRendiEnviosSelect', product.getSp_Portal_Rendi_Envios_Select);

        //getSp_Portal_Rendi_Proveedores_Select
        router.get('/portalRendiProveedoresSelect', product.getSp_Portal_Rendi_Proveedores_Select);

        //getToneladasTotales
        router.get('/toneladasTotales', product.getToneladasTotales);

        //getToneladasTotalesTabla
        router.get('/toneladasTotalesTabla', product.getToneladasTotalesTabla);

        //getComboLotes
        router.get('/comboLotes', product.getComboLotes);

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