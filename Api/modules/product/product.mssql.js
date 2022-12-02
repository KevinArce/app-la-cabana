/* It's importing the file dbconnection.js. */
const mssqlcon = require("../../dbconnection");
/* It's importing the file mssql.js. */
const mssql = require("mssql");
class ProductMSSql {
  // Create an authUsers to make a request to the database taking $user and $pass as parameters
  async getAuthUsers(usuario, pass) {
    //DONE
    console.log(usuario, pass);
    try {
      const conn = await mssqlcon.getConnection();
      const result = await conn
        .request()
        .input("USUARIO", mssql.VarChar, usuario)
        .input("PASS", mssql.VarChar, pass)
        .execute("ILC_Moviles.dbo.Sp_Portal_Rendi_Login_Select");
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Create a Index to get all values from the database
  async getIndex() {
    //DONE
    try {
      const conn = await mssqlcon.getConnection();
      const result = await conn
        .request()
        .execute("ILC_Moviles.dbo.Sp_Portal_Rendi_DatosGeneral_Select");
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Create liquidacion to get all values from the database
  async getLiquidacion(corte, zafra) {
    //DONE
    try {
      const conn = await mssqlcon.getConnection();
      const result = await conn
        .request()
        .input("corte", mssql.VarChar, corte)
        .input("zafra", mssql.VarChar, zafra)
        .execute("lczafra.vfp.SP_ZAFPRE_LIQUIDACION_MZ_PortalWeb");
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Create a Portada to make a request to the database taking $zafra and $cliente as parameters
  async getPortada(ZAFRA, Proveedor) {
    //Pendiente RequestError: Validation failed for parameter 'ZAFRA'. Invalid string.
    try {
      const conn = await mssqlcon.getConnection();
      const result = await conn
        .request()
        .input("ZAFRA", mssql.VarChar, ZAFRA)
        .input("Proveedor", mssql.VarChar, Proveedor)
        .query(
          "SELECT CONVERT(DECIMAL(10,2),SUM(TONPRO)) AS TONPRO FROM LCMAESTROZAF..MOVIL_secuenciaformatomovil WHERE ZAFRA = @ZAFRA AND Proveedor = @Proveedor"
        );
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Create a ComparativoCliente to get all values from the database
  async getComparativoCliente(client) {
    // Pendiente RequestError: Could not find stored procedure 'LCMAESTROZAF..ComparativoCliente'.
    try {
      const conn = await mssqlcon.getConnection();
      const result = await conn
        .request()
        .input("client", mssql.VarChar, client)
        .execute("LCMAESTROZAF..ComparativoCliente");
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Create a Portal_Rendi_Cortes_Select to make a request to the database
  /**
   * It returns a list of records from the database.
   * @param ZAFRA - The year of the harvest.
   * @param CODCLIE - Client code
   */
  async getPortal_Rendi_Cortes_Select(ZAFRA, CODCLIE) {
    //DONE
    try {
      const conn = await mssqlcon.getConnection();
      const result = await conn
        .request()
        .input("ZAFRA", mssql.VarChar, ZAFRA)
        .input("CODCLIE", mssql.VarChar, CODCLIE)
        .execute("ILC_Moviles.dbo.Sp_Portal_Rendi_Cortes_Select");
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Create a Sp_Portal_Rendi_Envios_Select to make a request to the database
  /**
   * It connects to a database, executes a stored procedure, and returns the result
   * @param codProv - String
   * @param zafra - The year of the harvest.
   * @returns An array of objects.
   */
  async getSp_Portal_Rendi_Envios_Select(codProv, zafra) {
    //DONE
    try {
      const conn = await mssqlcon.getConnection();
      const result = await conn
        .request()
        .input("codProv", mssql.VarChar, codProv)
        .input("zafra", mssql.VarChar, zafra)
        .execute("LCMOVZAF.dbo.Sp_Portal_Rendi_Envios_Select");
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Create a Sp_Portal_Rendi_Proveedores_Select to make a request to the database
  /**
   * It connects to the database, executes a stored procedure, and returns the result
   */
  async getSp_Portal_Rendi_Proveedores_Select() {
    //DONE
    try {
      const conn = await mssqlcon.getConnection();
      const result = await conn
        .request()
        .execute("ILC_Moviles.dbo.Sp_Portal_Rendi_Proveedores_Select");
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Create a toneladasTotales to make a request to the database
  /**
   * It connects to a database, executes a stored procedure, and returns the result
   * @returns The result of the query is being returned.
   */
  async getToneladasTotales() {
    // Pendiente RequestError: Could not find stored procedure 'LCMAESTROZAF..ComparativoCliente'.
    try {
      const conn = await mssqlcon.getConnection();
      const result = await conn
        .request()
        .execute("LCMAESTROZAF..ComparativoCliente");
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Create a LCMOVZAF.dbo.Sp_Portal_Rendi_Lotes_Select to make a request to the database taking $ZAFRA and $CORTE and $CODCLIE as parameters
  /**
   * It connects to a database, executes a stored procedure, and returns the result
   * @returns A recordset.
   * @param ZAFRA - The year of the harvest.
   * @param CORTE - The number of the cut.
   * @param CODCLIE - The code of the client.
   * @returns The result of the query is being returned.
   */
  async getSp_Portal_Rendi_Lotes_Select(ZAFRA, CORTE, CODCLIE) {
    //DONE
    try {
      const conn = await mssqlcon.getConnection();
      const result = await conn
        .request()
        .input("ZAFRA", mssql.VarChar, ZAFRA)
        .input("CORTE", mssql.VarChar, CORTE)
        .input("CODCLIE", mssql.VarChar, CODCLIE)
        .execute("LCMOVZAF.dbo.Sp_Portal_Rendi_Lotes_Select");
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Create a toneladasTotalesTabla to make a request to the database taking $zafra, $codProv and $codFinca as parameters
  /**
   * It returns the total tons of a farm.
   * @param zafra - The year of the harvest
   * @param codProv - The code of the provider
   * @param codFinca - 0
   */
  async getToneladasTotalesTabla(zafra, codProv, codFinca) {
    //DONE
    try {
      const conn = await mssqlcon.getConnection();
      const result = await conn
        .request()
        .input("zafra", mssql.VarChar, zafra)
        .input("codProv", mssql.VarChar, codProv)
        .input("codFinca", mssql.VarChar, codFinca)
        .query(
          "SELECT Proveedor, nomProvedor, Finca, nomFinca, Lote, nomLote, '' AS RENDIPRO, '' AS HORASQUEMA , '' AS TONPRO, ZAFRA, CONVERT(VARCHAR(11),LCMAESTROZAF.dbo.FuncGetFechaSecuencia(Proveedor,Finca,Lote,'1',ZAFRA,'1'), 103) AS primeraFert, CONVERT(VARCHAR(11),LCMAESTROZAF.dbo.FuncGetFechaSecuencia(Proveedor,Finca,Lote,'1',ZAFRA,'2'), 103) AS segundaFert, CONVERT(VARCHAR(11),LCMAESTROZAF.dbo.FuncGetFechaSecuencia(Proveedor,Finca,Lote,'1',ZAFRA,'3'), 103) AS terceraFert FROM LCMAESTROZAF..secuencias WHERE ZAFRA = @zafra AND Proveedor = @codProv AND (Finca = CASE WHEN @codFinca = '0' THEN Finca ELSE @codFinca END) ORDER BY Proveedor, Finca, Lote"
        );
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Create a comboLotes to make a request to the database taking $zafra and $codProv as parameters
  /**
   * It returns a list of lots from a given provider and harvest
   * @param zafra - The year of the harvest.
   * @param codProv - The code of the provider.
   * @returns An array of objects.
   */
  async getComboLotes(zafra, codProv) {
    //DONE
    try {
      const conn = await mssqlcon.getConnection();
      const result = await conn
        .request()
        .input("zafra", mssql.VarChar, zafra)
        .input("codProv", mssql.VarChar, codProv)
        .query(
          "SELECT Finca, nomFinca FROM LCMAESTROZAF..secuencias WHERE ZAFRA = @zafra AND Proveedor = @codProv GROUP BY Finca, nomFinca ORDER BY Finca"
        );
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Create a graficarResumen to make a request to the database using a stored procedure called ILC_Presupuesto..GetZafraActualAnterior
  /**
   * It connects to a database and executes a stored procedure.
   * @returns The result of the query is being returned.
   */
  async getGraficarResumen() {
    //DONE
    try {
      const conn = await mssqlcon.getConnection();
      const result = await conn
        .request()
        .execute("ILC_Presupuesto..GetZafraActualAnterior");
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Create a detalleEstadoCuenta to make a request to the database using a stored procedure called LCCREDITOS..SP_VistaRepIndiviInteres_LineaCredito_WEB
  /**
   * It's a function that returns a promise that resolves to an array of objects
   */
  async getDetalleEstadoCuenta() {
    // Pendiente RequestError: Could not find stored procedure 'LCCREDITOS..SP_VistaRepIndiviInteres_LineaCredito_WEB'.
    try {
      const conn = await mssqlcon.getConnection();
      const result = await conn
        .request()
        .execute("LCCREDITOS..SP_VistaRepIndiviInteres_LineaCredito_WEB");
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Create a creditoActivosTabla to make a request to the database using a stored procedure called LCCREDITOS..SP_VistaRepIndiviInteres_LineaCredito_Resumen
  /**
   * It connects to a database, executes a stored procedure, and returns the result
   * @returns The result of the query is being returned.
   */
  async getCreditoActivosTabla() {
    try {
      const conn = await mssqlcon.getConnection();
      const result = await conn
        .request()
        .execute("LCCREDITOS..SP_VistaRepIndiviInteres_LineaCredito_Resumen");
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }
}
/* It's exporting the class ProductMSSql. */
module.exports = new ProductMSSql();
