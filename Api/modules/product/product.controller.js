/* Importing the product.js file. */
const product = require("./product");
/* Importing the express module. */
const express = require("express");

const cors = require("cors");

/* Creating a new router object. */
const router = express.Router();
/* The ProductController class is a class that contains a constructor that takes in an app parameter.
The constructor then defines the routes for the API */
class ProductController {
  constructor(app) {
    // getAuthUsers
    router.post("/authUsers", cors(), product.getAuthUsers);

    // getIndex
    router.get("/index", cors(), product.getIndex);

    // getLiquidacion
    router.post("/liquidacion", cors(), product.getLiquidacion);

    // getPortada
    router.post("/portada", cors(), product.getPortada);

    // getComparativoCliente
    router.post("/comparativoCliente", cors(), product.getComparativoCliente);

    // getPortal_Rendi_Cortes_Select
    router.post(
      "/portalRendiCortesSelect",
      cors(),
      product.getPortal_Rendi_Cortes_Select
    );

    // getSp_Portal_Rendi_Envios_Select
    router.post(
      "/portalRendiEnviosSelect",
      cors(),
      product.getSp_Portal_Rendi_Envios_Select
    );

    // getSp_Portal_Rendi_Proveedores_Select
    router.get(
      "/portalRendiProveedoresSelect",
      cors(),
      product.getSp_Portal_Rendi_Proveedores_Select
    );

    // getToneladasTotales
    router.get("/toneladasTotales", cors(), product.getToneladasTotales);

    // getSp_Portal_Rendi_Lotes_Select
    router.post(
      "/portalRendiLotesSelect",
      cors(),
      product.getSp_Portal_Rendi_Lotes_Select
    );

    // getToneladasTotalesTabla
    router.post(
      "/toneladasTotalesTabla",
      cors(),
      product.getToneladasTotalesTabla
    );

    // getComboLotes
    router.post("/comboLotes", cors(), product.getComboLotes);

    // getGraficarResumen
    router.get("/graficarResumen", cors(), product.getGraficarResumen);

    // getDetalleEstadoCuenta
    router.get("/detalleEstadoCuenta", cors(), product.getDetalleEstadoCuenta);

    // getCreditoActivosTabla
    router.get("/creditoActivosTabla", cors(), product.getCreditoActivosTabla);

    /* Telling the app to use the router object for the routes that start with /api/v1. */
    app.use("/api/v1", router);
  }
}
module.exports = ProductController;
