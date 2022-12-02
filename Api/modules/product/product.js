/* Importing the file product.mssql.js */
const productMssql = require("./product.mssql");
/* Creating a class called product. */
class product {
  //getAuthUsers
  async getAuthUsers(req, res) {
    console.log(req);
    try {
      const result = await productMssql.getAuthUsers(
        req.body.usuario,
        req.body.clave,
        req.body.nomProv
      );

      if (result.length > 0) {
        let _result = {
          usuario: result[0].USUARIO,
          codProv: result[0].codProv,
          nomProv: result[0].nomProv,
          tipo: result[0].tipo,
        };

        let r = {
          error: 0,
          mensaje: "Usuario y contraseña correctos",
          data: _result,
        };
        res.send(r);
      } else {
        let r = {
          error: 1,

          message: "Usuario y/o contraseña incorrecta",
        };
        res.send(r);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //getIndex
  async getIndex(req, res) {
    console.log(req);

    try {
      const result = await productMssql.getIndex();
      req.body = result[0].Zafra;
      if (result.length > 0) {
        let _result = {
          zafra: result[0].Zafra,
        };
        let r = {
          data: _result,
        };
        res.send(r);
      } else {
        let r = {
          error: 1,
          message: "Vacio",
        };
        res.send;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //getLiquidacion
  async getLiquidacion(req, res) {
    try {
      const result = await productMssql.getLiquidacion();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }

  //getPortada
  async getPortada(req, res) {
    try {
      const ZAFRA = req.body;
      const Proveedor = req.body;
      const result = await productMssql.getPortada(ZAFRA, Proveedor);
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }

  //getComparativoCliente
  async getComparativoCliente(req, res) {
    try {
      const result = await productMssql.getComparativoCliente();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }

  //getPortal_Rendi_Cortes_Select
  async getPortal_Rendi_Cortes_Select(req, res) {
    try {
      const result = await productMssql.getPortal_Rendi_Cortes_Select();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }

  //getSp_Portal_Rendi_Envios_Select
  async getSp_Portal_Rendi_Envios_Select(req, res) {
    try {
      const result = await productMssql.getSp_Portal_Rendi_Envios_Select();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }

  //getSp_Portal_Rendi_Proveedores_Select
  async getSp_Portal_Rendi_Proveedores_Select(req, res) {
    try {
      const result = await productMssql.getSp_Portal_Rendi_Proveedores_Select();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }

  //getToneladasTotales
  async getToneladasTotales(req, res) {
    try {
      const result = await productMssql.getToneladasTotales();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }

  //getSp_Portal_Rendi_Lotes_Select
  async getSp_Portal_Rendi_Lotes_Select(req, res) {
    try {
      const result = await productMssql.getSp_Portal_Rendi_Lotes_Select();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }

  //getToneladasTotalesTabla
  async getToneladasTotalesTabla(req, res) {
    try {
      const result = await productMssql.getToneladasTotalesTabla();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }

  //getComboLotes
  async getComboLotes(req, res) {
    try {
      const result = await productMssql.getComboLotes();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }

  //getGraficarResumen
  async getGraficarResumen(req, res) {
    try {
      const result = await productMssql.getGraficarResumen();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }

  //getDetalleEstadoCuenta
  async getDetalleEstadoCuenta(req, res) {
    try {
      const result = await productMssql.getDetalleEstadoCuenta();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }

  //getCreditoActivosTabla
  async getCreditoActivosTabla(req, res) {
    try {
      const result = await productMssql.getCreditoActivosTabla();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new product();
