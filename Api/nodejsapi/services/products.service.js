var config = require('../server');
const sql = require('mssql');

// Create a Index function to get all values from the database

async function getIndex() {
  try {
    let pool = await sql.connect(config);
    // Use a stored procedure to get all values from the database
    let index = await pool.request().execute('ILC_Moviles.dbo.Sp_Portal_Rendi_DatosGeneral_Select');
    return index.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// Create a liquidacion function to get all values from the database

async function getLiquidacion() {
  try {
    let pool = await sql.connect(config);
    // Use a stored procedure to get all values from the database
    let liquidacion = await pool.request().execute('lczafra.vfp.SP_ZAFPRE_LIQUIDACION_MZ_PortalWeb');
    return liquidacion.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// Create a Portada function to make a request to the database taking $zafra and $cliente as parameters

async function getPortada(zafra, cliente) {
  try {
    let pool = await sql.connect(config);
    let portada = await pool.request()
      .input('zafra', sql.NVarChar, zafra)
      .input('cliente', sql.NVarChar, cliente)
      .query("SELECT CONVERT(DECIMAL(10,2),SUM(TONPRO)) AS TONPRO FROM LCMAESTROZAF..MOVIL_secuenciaformatomovil WHERE ZAFRA = @zafra AND Proveedor = @cliente");
    return portada.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// Create a ComparativoCliente function to get all values from the database

async function getComparativoCliente() {
  try {
    let pool = await sql.connect(config);
    // Use a stored procedure to get all values from the database
    let comparativoCliente = await pool.request().execute('LCMAESTROZAF..ComparativoCliente');
    return comparativoCliente.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// Create a Portal_Rendi_Cortes_Select function to make a request to the database

async function getPortal_Rendi_Cortes_Select() {
  try {
    let pool = await sql.connect(config);
    // Use a stored procedure to get all values from the database
    let portal_Rendi_Cortes_Select = await pool.request().execute('ILC_Moviles.dbo.Sp_Portal_Rendi_Cortes_Select');
    return portal_Rendi_Cortes_Select.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// Create a Sp_Portal_Rendi_Envios_Select function to make a request to the database

async function getSp_Portal_Rendi_Envios_Select() {
  try {
    let pool = await sql.connect(config);
    // Use a stored procedure to get all values from the database
    let sp_Portal_Rendi_Envios_Select = await pool.request().execute('LCMOVZAF.dbo.Sp_Portal_Rendi_Envios_Select');
    return sp_Portal_Rendi_Envios_Select.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// Create a Sp_Portal_Rendi_Proveedores_Select function to make a request to the database

async function getSp_Portal_Rendi_Proveedores_Select() {
  try {
    let pool = await sql.connect(config);
    // Use a stored procedure to get all values from the database
    let sp_Portal_Rendi_Proveedores_Select = await pool.request().execute('ILC_Moviles.dbo.Sp_Portal_Rendi_Proveedores_Select');
    return sp_Portal_Rendi_Proveedores_Select.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// Create a toneladasTotales function to make a request to the database

async function getToneladasTotales() {
  try {
    let pool = await sql.connect(config);
    // Use a stored procedure to get all values from the database
    let toneladasTotales = await pool.request().execute('LCMAESTROZAF..ComparativoCliente');
    return toneladasTotales.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// Create a toneladasTotalesTabla function to make a request to the database taking $zafra, $codProv and $codFinca as parameters

async function getToneladasTotalesTabla(zafra, codProv, codFinca) {
  try {
    let pool = await sql.connect(config);
    let toneladasTotalesTabla = await pool.request()
      .input('zafra', sql.NVarChar, zafra)
      .input('codProv', sql.NVarChar, codProv)
      .input('codFinca', sql.NVarChar, codFinca)
      // Using this query:
      //SELECT Proveedor, nomProvedor, Finca, nomFinca, Lote, nomLote,
      //'' AS RENDIPRO,
      //'' AS HORASQUEMA ,
      //'' AS TONPRO,
      //ZAFRA,
      //CONVERT(VARCHAR(11),LCMAESTROZAF.dbo.FuncGetFechaSecuencia(Proveedor,Finca,Lote,'1',ZAFRA,'1'), 103) AS primeraFert,
      //CONVERT(VARCHAR(11),LCMAESTROZAF.dbo.FuncGetFechaSecuencia(Proveedor,Finca,Lote,'1',ZAFRA,'2'), 103) AS segundaFert,
      //CONVERT(VARCHAR(11),LCMAESTROZAF.dbo.FuncGetFechaSecuencia(Proveedor,Finca,Lote,'1',ZAFRA,'3'), 103) AS terceraFert

      //FROM LCMAESTROZAF..secuencias
      //WHERE ZAFRA = '$zafra'
      //AND Proveedor = '$codProv'
      //AND (Finca =    CASE
      //    WHEN '$codFinca' =  '0' THEN Finca
      //    ELSE '$codFinca'
      //    END)
      //ORDER BY Proveedor, Finca, Lote

    .query("SELECT Proveedor, nomProvedor, Finca, nomFinca, Lote, nomLote, '' AS RENDIPRO, '' AS HORASQUEMA , '' AS TONPRO, ZAFRA, CONVERT(VARCHAR(11),LCMAESTROZAF.dbo.FuncGetFechaSecuencia(Proveedor,Finca,Lote,'1',ZAFRA,'1'), 103) AS primeraFert, CONVERT(VARCHAR(11),LCMAESTROZAF.dbo.FuncGetFechaSecuencia(Proveedor,Finca,Lote,'1',ZAFRA,'2'), 103) AS segundaFert, CONVERT(VARCHAR(11),LCMAESTROZAF.dbo.FuncGetFechaSecuencia(Proveedor,Finca,Lote,'1',ZAFRA,'3'), 103) AS terceraFert FROM LCMAESTROZAF..secuencias WHERE ZAFRA = @zafra AND Proveedor = @codProv AND (Finca = CASE WHEN @codFinca = '0' THEN Finca ELSE @codFinca END) ORDER BY Proveedor, Finca, Lote");
    return toneladasTotalesTabla.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// Create a comboLotes function to make a request to the database taking $zafra and $codProv as parameters

async function getComboLotes(zafra, codProv) {
  try {
    let pool = await sql.connect(config);
    let comboLotes = await pool.request()
      .input('zafra', sql.NVarChar, zafra)
      .input('codProv', sql.NVarChar, codProv)
      // Using this query:
      //SELECT Finca, nomFinca
      //FROM LCMAESTROZAF..secuencias
      //WHERE ZAFRA = '$zafra'
      //AND Proveedor = '$codProv'
      //GROUP BY Finca, nomFinca
      //ORDER BY Finca
    .query("SELECT Finca, nomFinca FROM LCMAESTROZAF..secuencias WHERE ZAFRA = @zafra AND Proveedor = @codProv GROUP BY Finca, nomFinca ORDER BY Finca");
    return comboLotes.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// Create a graficarResumen function to make a request to the database using a stored procedure called ILC_Presupuesto..GetZafraActualAnterior

async function getGraficarResumen() {
  try {
    let pool = await sql.connect(config);
    let graficarResumen = await pool.request().execute('ILC_Presupuesto..GetZafraActualAnterior');
    return graficarResumen.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// Create a detalleEstadoCuenta function to make a request to the database using a stored procedure called LCCREDITOS..SP_VistaRepIndiviInteres_LineaCredito_WEB

async function getDetalleEstadoCuenta() {
  try {
    let pool = await sql.connect(config);
    let detalleEstadoCuenta = await pool.request().execute('LCCREDITOS..SP_VistaRepIndiviInteres_LineaCredito_WEB');
    return detalleEstadoCuenta.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// Create a creditoActivosTabla function to make a request to the database using a stored procedure called LCCREDITOS..SP_VistaRepIndiviInteres_LineaCredito_Resumen

async function getCreditoActivosTabla() {
  try {
    let pool = await sql.connect(config);
    let creditoActivosTabla = await pool.request().execute('LCCREDITOS..SP_VistaRepIndiviInteres_LineaCredito_Resumen');
    return creditoActivosTabla.recordsets;
  } catch (error) {
    console.log(error);
  }
}
