const productMssql = require('./product.mssql');
class product {

    //getAllProducts 
    /**
     * The function is called getAllProducts, it takes in a request and a response, and it returns all
     * the products from the database
     * @param req - The request object.
     * @param res - The response object.
     */
    async getAllProducts(req, res) {
        try {
            const output = await productMssql.getAllProducts();
            res.send(output);
        }
        catch (error) {
        console.log(error);
        }
    }

    //getAuthUsers
    async getAuthUsers(req, res) {
        try {
            const user = req.body;
            const result = await productMssql.getAuthUsers(user);
            const json = JSON.parse(result);
            // Using the Store Procedure called "ILC_Moviles.dbo.Sp_Portal_Rendi_Login_Select" to login
            if (json.length > 0) {
                res.send(json);
            }
            else {
                res.send('Usuario o contraseña incorrectos');
            }
            
        }

        catch (error) {
            console.log(error);
        }

    }

    //getIndex
    async getIndex(req, res) {
        try {
            const result = await productMssql.getIndex();
            res.send(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    //getLiquidacion
    async getLiquidacion(req, res) {
        try {
            const result = await productMssql.getLiquidacion();
            res.send(result);
        }
        catch (error) {
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
        }
        catch (error) {
            console.log(error);
        }
    }

    //getComparativoCliente
    async getComparativoCliente(req, res) {
        try {
            const result = await productMssql.getComparativoCliente();
            res.send(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    //getPortal_Rendi_Cortes_Select
    async getPortal_Rendi_Cortes_Select(req, res) {
        try {
            const result = await productMssql.getPortal_Rendi_Cortes_Select();
            res.send(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    //getSp_Portal_Rendi_Envios_Select
    async getSp_Portal_Rendi_Envios_Select(req, res) {
        try {
            const result = await productMssql.getSp_Portal_Rendi_Envios_Select();
            res.send(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    //getSp_Portal_Rendi_Proveedores_Select
    async getSp_Portal_Rendi_Proveedores_Select(req, res) {
        try {
            const result = await productMssql.getSp_Portal_Rendi_Proveedores_Select();
            res.send(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    //getToneladasTotales
    async getToneladasTotales(req, res) {
        try {
            const result = await productMssql.getToneladasTotales();
            res.send(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    //getSp_Portal_Rendi_Lotes_Select
    async getSp_Portal_Rendi_Lotes_Select(req, res) {
        try {
            const result = await productMssql.getSp_Portal_Rendi_Lotes_Select();
            res.send(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    //getToneladasTotalesTabla
    async getToneladasTotalesTabla(req, res) {
        try {
            const result = await productMssql.getToneladasTotalesTabla();
            res.send(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    //getComboLotes
    async getComboLotes(req, res) {
        try {
            const result = await productMssql.getComboLotes();
            res.send(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    //getGraficarResumen
    async getGraficarResumen(req, res) {
        try {
            const result = await productMssql.getGraficarResumen();
            res.send(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    //getDetalleEstadoCuenta
    async getDetalleEstadoCuenta(req, res) {
        try {
            const result = await productMssql.getDetalleEstadoCuenta();
            res.send(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    //getCreditoActivosTabla
    async getCreditoActivosTabla(req, res) {
        try {
            const result = await productMssql.getCreditoActivosTabla();
            res.send(result);
        }
        catch (error) {
            console.log(error);
        }
    }
    
}
module.exports = new product();