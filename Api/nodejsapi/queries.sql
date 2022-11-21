Para la pantalla de login, utiliza esta BD y este SP: ILC_Moviles.dbo.Sp_Portal_Rendi_Login_Select

USE [ILC_Moviles]
GO
/****** Object:  StoredProcedure [dbo].[Sp_Portal_Rendi_Login_Select]    Script Date: 31/10/2022 10:56:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Sp_Portal_Rendi_Login_Select]
(
@USUARIO VARCHAR(30),
@PASS		 VARCHAR(30)
)
AS
BEGIN
DECLARE
@ValidaCliente INT,
@VlidaExiste   INT

SET @ValidaCliente = (SELECT COUNT(*) FROM ILC_Moviles..UsuariosProveedores WHERE CODPROV = @USUARIO)

SET @VlidaExiste = (SELECT COUNT(*) FROM LACABANA..[LACABANA$Customer] WHERE No_ = @USUARIO)

IF @ValidaCliente = 0 AND @VlidaExiste > 0
BEGIN
	INSERT INTO ILC_Moviles..UsuariosProveedores
	(
		CODPROV,
		USUARIO,
		PASS,
		FECHA,
		CAMBIOPASS,
		TIPOUSUARIO
	)
	VALUES
	(
		@USUARIO,
		@USUARIO,
		@USUARIO,
		GETDATE(),
		0,
		'CLIENTE'
	)
END
SELECT TOP 1  * FROM (
SELECT UP.USUARIO,
UP.PASS,
UP.USUARIO AS codProv,
ISNULL(C.Name, UP.CODPROV) AS nomProv,
UP.CAMBIOPASS,
'PROVEEDOR' AS tipo
FROM ILC_Moviles..UsuariosProveedores as UP
    LEFT OUTER JOIN LACABANA..[LACABANA$Customer] AS C
    ON UP.CODPROV COLLATE Latin1_General_100_CS_AS = C.No_
    --WHERE UP.USUARIO = @USUARIO AND UP.PASS = @PASS
UNION ALL

SELECT
USERID,
CONTRASENA,
USERID,
USERNAME COLLATE Latin1_General_100_CS_AS,
1 AS cambioPass,
'INTERNO' AS tipo

FROM ILCMASTER.dbo.USUARIOS  --WHERE
) tab WHERE USUARIO = @USUARIO AND PASS = @PASS

END
Para el index. Utiliza los siguientes SP:  ILC_Moviles.dbo.Sp_Portal_Rendi_DatosGeneral_Select
USE [ILC_Moviles]
GO
/****** Object:  StoredProcedure [dbo].[Sp_Portal_Rendi_DatosGeneral_Select]    Script Date: 31/10/2022 11:37:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Sp_Portal_Rendi_DatosGeneral_Select]
AS
BEGIN
  -- routine body goes here, e.g.
  -- SELECT 'Navicat for SQL Server'

SELECT TOP 1 Zafra FROM LCMOVZAF.dbo.Autorizaciones_Cortes ORDER BY Corr DESC

END
LIQUIDACION: lczafra.vfp.SP_ZAFPRE_LIQUIDACION_MZ_PortalWeb
USE [lczafra]
GO
/****** Object:  StoredProcedure [vfp].[SP_ZAFPRE_LIQUIDACION_MZ_PortalWeb]    Script Date: 31/10/2022 11:42:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [vfp].[SP_ZAFPRE_LIQUIDACION_MZ_PortalWeb]
(
@corte int,
@zafra as varchar(11) ,
@codProv as varchar(20) = NULL
)
AS
BEGIN

DECLARE
@condicion INT

SET @condicion = (SELECT TOP 1 ---No_ VENDORID, V.Name+' '+V.[Name 2] VENDNAME,
CASE
WHEN [Tax Identification Type]= 0 then 1 --Juridica
WHEN [Tax Identification Type]= 1 then 0 --persona fisisca
WHEN [Tax Identification Type]= 2 then 1 --Natural Inscripta
WHEN [Tax Identification Type]= 3 then 0 --Exterior
END Contribuyente
FROM LACABANA..[LACABANA$Vendor] AS V WHERE No_ = @codProv)

IF @condicion = 1 --Cliente si contribuyente
BEGIN
	 EXEC lczafra.vfp.SP_ZAFPRE_CONTRI_MZ_PortalWeb @corte, @zafra, @codProv
END ELSE --Cliente no contribuyente
BEGIN
	 EXEC lczafra.vfp.SP_ZAFPRE_NOCONTRI_MZ_PortalWeb @corte, @zafra, @codProv
END

END
Para la portada lee esta consulta en el php
function tmTotales($zafra,$cliente){
    $totalTM=0;
    require("../SqlConnection/cn.php");
    $sql = "SELECT CONVERT(DECIMAL(10,2),SUM(TONPRO)) AS TONPRO
    FROM LCMAESTROZAF..MOVIL_secuenciaformatomovil
    WHERE ZAFRA = '".$zafra."'AND Proveedor = '".$cliente."' ";
    $query=sqlsrv_query($conexion,$sql);
    while($row=sqlsrv_fetch_array($query))
    {
        $totalTM=floatval($row['TONPRO']);
    }
    return $totalTM;
}

Y este sp: LCMAESTROZAF..ComparativoCliente
USE [LCMAESTROZAF]
GO
/****** Object:  StoredProcedure [dbo].[ComparativoCliente]    Script Date: 31/10/2022 11:50:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[ComparativoCliente](@client varchar(30))
AS
DECLARE @ZafraActual varchar(10)
DECLARE @ZafraAnterior varchar(10)
SET @ZafraActual = (SELECT E.anzaf FROM LCMAESTROZAF..EMPRESA AS E)
SET @ZafraAnterior = ( CONCAT(CONCAT(LEFT(@ZafraActual,4)-1,'-'),RIGHT(@ZafraActual,4)-1) )

SELECT SM.nomFinca, CONVERT(DECIMAL(10,2),SUM(SM.TONPRO)) AS TONPRO
INTO #Actual FROM LCMAESTROZAF..MOVIL_secuenciaformatomovil as SM
WHERE ZAFRA = @ZafraActual AND Proveedor = @client
GROUP BY SM.nomFinca

SELECT SM.nomFinca, CONVERT(DECIMAL(10,2),SUM(SM.TONPRO)) AS TONPRO
INTO #Anterior FROM LCMAESTROZAF..MOVIL_secuenciaformatomovil as SM
WHERE ZAFRA = @ZafraAnterior AND Proveedor = @client
GROUP BY SM.nomFinca

SELECT ISNULL(AC.nomFinca,AN.nomFinca) AS Finca,
AC.TONPRO as TONAC, AN.TONPRO AS TONAN FROM #Actual AS AC
FULL OUTER JOIN #Anterior as AN
ON AC.nomFinca = AN.nomFinca
ORDER BY AC.nomFinca ASC, AN.nomFinca ASC

DROP TABLE #Actual
DROP TABLE #Anterior
ILC_Moviles.dbo.Sp_Portal_Rendi_Cortes_Select
USE [ILC_Moviles]
GO
/****** Object:  StoredProcedure [dbo].[Sp_Portal_Rendi_Cortes_Select]    Script Date: 31/10/2022 15:32:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Sp_Portal_Rendi_Cortes_Select]
(
@ZAFRA	 VARCHAR(9),
@CODCLIE VARCHAR(20)
)
AS
BEGIN
  -- routine body goes here, e.g.
  -- SELECT 'Navicat for SQL Server'


SELECT
(SELECT top 1 FORMAT (z.fecini, 'dd-MM-yyyy')  fecini FROM lczafra.dbo.V_zafcort as z WHERE z.zafra = @ZAFRA AND z.ncorte = CONVERT(INT, CORTE) ) AS fecini,
(SELECT top 1 FORMAT (z.fecfin, 'dd-MM-yyyy')  fecfin FROM lczafra.dbo.V_zafcort as z WHERE z.zafra = @ZAFRA AND z.ncorte = CONVERT(INT, CORTE) ) AS fecfin,
*

FROM(
SELECT ZAFRA, CONVERT(INT, NCORTE) AS CORTE
FROM LCMOVZAF.dbo.ZAFMOV
WHERE ZAFRA = @ZAFRA--'2021-2022'
AND CODCLIE = CASE WHEN @CODCLIE = '0' THEN CODCLIE ELSE @CODCLIE END--'CANA001'
group by ZAFRA, CONVERT(INT, NCORTE)
--order by ZAFRA, CONVERT(INT, NCORTE) desc
) AS TAB
order by ZAFRA, CONVERT(INT, CORTE) desc
END


PARA LA TABLA call LCMOVZAF.dbo.Sp_Portal_Rendi_Envios_Select
USE [LCMOVZAF]
GO
/****** Object:  StoredProcedure [dbo].[Sp_Portal_Rendi_Envios_Select]    Script Date: 31/10/2022 15:47:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Sp_Portal_Rendi_Envios_Select]
(
@codProv VARCHAR(30),
@zafra   VARCHAR(9)
)
AS
BEGIN

SELECT
CAST (mue.fecmov AS DATE) fecmov,
mue.numenv,
ISNULL(100 - isnull(0.08 * (mue.bagazo / 2) + 0.876, 0) - ( ( ( 100-(isnull(0.08 * (mue.bagazo / 2) + 0.876, 0))) * (mue.brix) ) /100), 0) as humeda,
mue.phrsquema,
mue.rendimr,
mue.tonel,
mue.polca,
mue.Ncorte,
mue.codfinca,
mue.lote,
lot.NOMLOTE,
fin.nombre AS NOMFINCA,
CASE WHEN ISNULL(rendiante, 0.00) = 0.00 THEN 'rojo' ELSE 'verde' END estado
FROM LCMOVZAF.dbo.MUESTRAS AS mue
INNER JOIN  LCMAESTROZAF.dbo.ZAFLOTE AS lot ON mue.lote = lot.LOTE
INNER JOIN  LCMAESTROZAF.dbo.ZAFINCA AS fin ON mue.codfinca = fin.codfinca
WHERE mue.ZAFRA = @zafra AND mue.codclie = @codProv
ORDER BY numenv desc
END
EL COMBO QUE ESTA OCULTO PARA CAÑEROS call ILC_Moviles.dbo.Sp_Portal_Rendi_Proveedores_Select
USE [ILC_Moviles]
GO
/****** Object:  StoredProcedure [dbo].[Sp_Portal_Rendi_Proveedores_Select]    Script Date: 31/10/2022 15:53:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Sp_Portal_Rendi_Proveedores_Select](@usuario as varchar(30)=null)
AS
BEGIN
  -- routine body goes here, e.g.
  -- SELECT 'Navicat for SQL Server'



SELECT
RTRIM(finca.idgp) AS idgp
--,CONCAT(C.Name, '') as Name
,C.Name
FROM LCMAESTROZAF.dbo.ZAFINCA AS finca
INNER JOIN LACABANA..[LACABANA$Customer] AS C ON finca.idgp COLLATE Latin1_General_100_CS_AS = C.No_

WHERE finca.idgp in (
select codclie  from Portal_UsuarioCliente u WHERE  usuario =@usuario
)
or @usuario in('') -- los que ven todo

GROUP BY finca.idgp, C.Name
END


PARA DATO DE TONELADAS TOTALES LCMAESTROZAF..ComparativoCliente  código en pagina 3
PARA LA TABLA: LCMOVZAF.dbo.Sp_Portal_Rendi_Lotes_Select
USE [LCMOVZAF]
GO
/****** Object:  StoredProcedure [dbo].[Sp_Portal_Rendi_Lotes_Select]    Script Date: 31/10/2022 16:15:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Sp_Portal_Rendi_Lotes_Select]
(
@ZAFRA   VARCHAR(9),
@CORTE   VARCHAR(2),
@CODCLIE VARCHAR(20)
)
AS
BEGIN
  -- routine body goes here, e.g.
  -- SELECT 'Navicat for SQL Server'
SELECT
mue.ZAFRA,
SUM(TONEL*rendimr)/SUM(TONEL) as rendimr,
SUM(mue.tonel) tonel,
--mue.polca,
mue.Ncorte,
lot.NOMLOTE,
fin.nombre AS NOMFINCA,
CASE WHEN ISNULL(SUM(rendiante), 0.00) = 0.00 THEN 'rojo' ELSE 'verde' END estado
FROM LCMOVZAF.dbo.MUESTRAS AS mue
INNER JOIN  LCMAESTROZAF.dbo.ZAFLOTE AS lot ON mue.lote = lot.LOTE
INNER JOIN  LCMAESTROZAF.dbo.ZAFINCA AS fin ON mue.codfinca = fin.codfinca
WHERE mue.ZAFRA = @ZAFRA AND mue.codclie = @CODCLIE
GROUP BY mue.ZAFRA, mue.Ncorte,
lot.NOMLOTE,
fin.nombre
END

PARA LA TABLA
    $query = "SELECT Proveedor, nomProvedor, Finca, nomFinca, Lote, nomLote,
                                '' AS RENDIPRO,
                                '' AS HORASQUEMA ,
                                '' AS TONPRO,
                                ZAFRA,
                                CONVERT(VARCHAR(11),LCMAESTROZAF.dbo.FuncGetFechaSecuencia(Proveedor,Finca,Lote,'1',ZAFRA,'1'), 103) AS primeraFert,
                                CONVERT(VARCHAR(11),LCMAESTROZAF.dbo.FuncGetFechaSecuencia(Proveedor,Finca,Lote,'1',ZAFRA,'2'), 103) AS segundaFert,
                                CONVERT(VARCHAR(11),LCMAESTROZAF.dbo.FuncGetFechaSecuencia(Proveedor,Finca,Lote,'1',ZAFRA,'3'), 103) AS terceraFert

                                FROM LCMAESTROZAF..secuencias
                                WHERE ZAFRA = '$zafra'
                                AND Proveedor = '$codProv'
                                AND (Finca =    CASE
                                    WHEN '$codFinca' =  '0' THEN Finca
                                    ELSE '$codFinca'
                                    END)
                                ORDER BY Proveedor, Finca, Lote
                    ";

                    $stmt = sqlsrv_query($conexion, $query);
                    $i = 1;
                    do{
                    while ($row=sqlsrv_fetch_array($stmt))
                    {

                    ?>

                    <tr data-codprov="<?php echo $row['Proveedor']; ?>" data-codfinca="<?php echo $row['Finca']; ?>" data-codlote="<?php echo $row['Lote']; ?>" data-zafra="<?php echo $row['ZAFRA']; ?>">
                        <td align="center"><?php echo $row['Finca']; ?></td>
                        <td><?php echo $row['nomFinca']; ?></td>
                        <td align="center"><?php echo $row['Lote']; ?></td>
                        <td><?php echo $row['nomLote']; ?></td>

                        <td><?php echo $row['primeraFert']; ?></td>
                        <td><?php echo $row['segundaFert']; ?></td>
                        <td><?php echo $row['terceraFert']; ?></td>
                        <td><a class="btn btn-yellow" id="myLink" href="javascript:cargarSecuenciaLaboresLote('<?php echo $row['Proveedor']; ?>', '<?php echo $row['Finca']; ?>', '<?php echo $row['Lote']; ?>', '<?php echo $row['ZAFRA']; ?>');">Ver</a></td>
                    </tr>
PARA EL COMBO DE LOTES
$query = " SELECT Finca, nomFinca
                                FROM LCMAESTROZAF..secuencias
                                WHERE ZAFRA = '$zafra'
                                AND Proveedor = '$codProv'
                                GROUP BY Finca, nomFinca
                                ORDER BY Finca ";



PARA LA GRAFICA RESUMEN: es el mismo SP de la pagina 3
ILC_Presupuesto..GetZafraActualAnterior
USE [ILC_Presupuesto]
GO
/****** Object:  StoredProcedure [dbo].[GetZafraActualAnterior]    Script Date: 31/10/2022 17:03:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[GetZafraActualAnterior]
AS
DECLARE @ZafraActual varchar(10)
DECLARE @ZafraAnterior varchar(10)
SET @ZafraActual = (SELECT E.anzaf FROM LCMAESTROZAF..EMPRESA AS E)
SET @ZafraAnterior = ( CONCAT(CONCAT(LEFT(@ZafraActual,4)-1,'-'),RIGHT(@ZafraActual,4)-1) )
SELECT @ZafraActual as Actual,@ZafraAnterior as Anterior
--SELECT @ZafraAnterior





DETALLE DE ESTADO DE CUENTA: LCCREDITOS..SP_VistaRepIndiviInteres_LineaCredito_WEB
USE [LCCREDITOS]
GO
/****** Object:  StoredProcedure [dbo].[SP_VistaRepIndiviInteres_LineaCredito_WEB]    Script Date: 31/10/2022 17:28:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
--SP_VistaRepIndiviInteres_LineaCredito_WEB 'CANA001', ''
ALTER PROCEDURE [dbo].[SP_VistaRepIndiviInteres_LineaCredito_WEB]
(
@CODIGO VARCHAR(15),
@USERID VARCHAR(50)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
SET NOCOUNT ON;

DECLARE @GRUPO_CONTABLE VARCHAR(50)
SET @GRUPO_CONTABLE =( SELECT [Customer Posting Group] from LACABANA..LACABANA$Customer where [No_]= @CODIGO  )
--or [Customer Posting Group] = 'CLIEN-AFIL'

IF @GRUPO_CONTABLE = 'CLIEN-AFIL'
	BEGIN
	EXECUTE LACABANA..SP_Agril_RobotActualizarAgrilca_Especial
	END
--ELSE
--	BEGIN
--	EXECUTE LACABANA..SP_Agril_RobotActualizarAgrilca
--	END

--CASE WHEN @GRUPO_CONTABLE = 'CLIEN-AFIL' THEN 0

CREATE TABLE #MOVIMIENTOSX
(
[IDOIP] VARCHAR(10),
[IDCLIENTE] VARCHAR(15),
[FECHA] DATE,--TIME,
[CONCEPTO] VARCHAR(500),
[DOCUMENTO] VARCHAR(50),
[CARGOS] MONEY,
[ABONOS] MONEY,
[INTERES] MONEY,
[INTT] VARCHAR(1),
[SALDO] MONEY,
[SALDODOC] MONEY,
[TIPODOC] VARCHAR(10),
[INSUMO] VARCHAR(10),
[LLAVE] INT,
[idproveedo] VARCHAR(15),
[pzafprev] DECIMAL(10,2),
[codclie] VARCHAR(15),
[IdSolicitud] VARCHAR(50),
[Zafra] VARCHAR(9)
)

INSERT INTO #MOVIMIENTOSX([IDOIP], [IDCLIENTE], [FECHA], [CONCEPTO], [DOCUMENTO], [CARGOS], [ABONOS], [INTERES], [INTT], [SALDO], [SALDODOC], [TIPODOC], [INSUMO], [LLAVE], [idproveedo], [pzafprev], [codclie], [IdSolicitud], [Zafra])
SELECT [IDOIP], [IDCLIENTE], [FECHA], [CONCEPTO], [DOCUMENTO], [CARGOS], [ABONOS], [INTERES], [INTT], [SALDO], [SALDODOC], [TIPODOC], [INSUMO], [LLAVE], [idproveedo], [pzafprev], [codclie], [IdSolicitud], [Zafra]
FROM [dbo].[MOVIMIENTOSCRT]
WHERE codclie = @CODIGO
UNION ALL
SELECT [IDOIP], [IDCLIENTE], [FECHA], [CONCEPTO], [DOCUMENTO], [CARGOS], [ABONOS], [INTERES], [INTT], [SALDO], [SALDODOC], [TIPODOC], [INSUMO], [LLAVE], [idproveedo], [pzafprev], [codclie], [IdSolicitud], [Zafra]
FROM [dbo].[MOVIMIENTOSCRT_ESPECIAL]
WHERE codclie = @CODIGO

--******

--PROCEDIMIENTO PARA CALULCAR EL INTERES

DECLARE
        @BISIESTOX INT,
		@ANIOX VARCHAR(10),
		@valinteresX decimal(10, 2),
		@EXISTE_PAGPREV INT,
		@FECHAULCINTX VARCHAR(10),
		@ahoraX VARCHAR(10),

		@INTERESTOTAL_Antes DECIMAL(10,5),
		@INTERESTOTAL_Despues DECIMAL(10,5),
		@INTERESTOTAL_SinUltimaFecha DECIMAL(10,5),
		@INTERESTOTALX DECIMAL(10,2),
		@PERCAPITALx DECIMAL(10,2),
		@INTERPENX DECIMAL(10,2),
		@PERIVAX DECIMAL(10,2)
SET @ahoraX = CONVERT(VARCHAR(10), GETDATE(), 103)
SET @ANIOX = (SELECT  CONVERT(VARCHAR(4), YEAR(GETDATE())))

SELECT @BISIESTOX = DATEDIFF(DAY, '01/01/' + @ANIOX , '31/12/' + @ANIOX)+1
SELECT @valinteresX  =CASE WHEN @CODIGO = 'SSERV001' THEN 0.08 ELSE (SELECT ValorInteres FROM InteresILC where Estado = 1)/ 100 END


SET @EXISTE_PAGPREV = (SELECT COUNT(*) FROM #MOVIMIENTOSX where IDPROVEEDO = @CODIGO and INTERES <> 0 AND INTT = 'T')


--AVERIGUAREMOS SI EXISTE UN PAGO DE INTERES PREVIO
--SELECT top 1  IDOIP, IDPROVEEDO, FECHA, CONCEPTO, DOCUMENTO, CARGOS, ABONOS, INTERES, INTT, SALDO, SALDODOC, TIPODOC, INSUMO FROM #MOVIMIENTOSX where IDPROVEEDO = @CODIGO and INTERES <> 0 AND INTT = 'T' order by fecha desc


IF @EXISTE_PAGPREV > 0
	BEGIN
	--'EXISTEN'

	SELECT @FECHAULCINTX = (SELECT top 1  CONVERT(VARCHAR(10), FECHA, 103) FROM #MOVIMIENTOSX where IDPROVEEDO = @CODIGO and INTERES <> 0 AND INTT = 'T' order by fecha desc)

	--SELECT ISNULL(ZAFRA, '') AS ZAFRA, ISNULL(IDSOLICITUD, '') AS IDSOLICITUD, DOCUMENTO, SALDODOC, ((SALDODOC * (CONVERT(INT, (convert(datetime, @ahoraX,103)) -  CONVERT(DATETIME, @FECHAULCINTX))) * @valinteresX  )/ @BISIESTOX ) AS INTERESC FROM #MOVIMIENTOSX where CODCLIE = @CODIGO and CARGOS <> 0 AND FECHA < = @FECHAULCINTX AND INSUMO NOT IN ('03', '05', '07') AND SALDODOC > 0

	--TRAEREMOS TODOS LOS DOCUMENTOS ANTERIORES A LA FECHA DE PAGO DE INTERES
	SELECT @INTERESTOTAL_Antes = SUM( ((SALDODOC * (CONVERT(INT, (convert(datetime, @ahoraX,103)) -  CONVERT(DATETIME, @FECHAULCINTX))) * @valinteresX  )/ @BISIESTOX )) FROM #MOVIMIENTOSX where CODCLIE = @CODIGO and CARGOS <> 0 AND FECHA < = @FECHAULCINTX AND INSUMO NOT IN ('03', '05', '07') AND SALDODOC > 0

	--TRAEREMSO TODOS LOS DOCUMENTOS ADQUIRIDOS DESPUES DE LA FECHA DE CALCULO DE INTERES
	SELECT @INTERESTOTAL_Despues=SUM( (((SALDODOC * (CONVERT(INT, (convert(datetime, @ahoraX,103)) - FECHA))) * @valinteresX )/ @BISIESTOX) )  FROM  #MOVIMIENTOSX where CODCLIE = @CODIGO and CARGOS <> 0 AND FECHA > @FECHAULCINTX AND INSUMO NOT IN ('03', '05', '07') AND SALDODOC > 0

	END
ELSE
			BEGIN
			--NO EXISTEN

			--TRAEREMSO TODOS LOS DOCUMENTOS ADQUIRIDOS Y POR NO EXISTIR FECHA DE PAGO DE INTERES SOLO SE GENERA EL CALCULO
			SELECT @INTERESTOTAL_SinUltimaFecha =SUM(  (((SALDODOC * (CONVERT(INT, (convert(datetime, @ahoraX,103)) -  FECHA))) * @valinteresX )/ @BISIESTOX)  )  FROM #MOVIMIENTOSX where CODCLIE = @CODIGO and CARGOS <> 0  AND INSUMO NOT IN ('03', '05', '07') AND SALDODOC > 0

			END

SELECT @PERCAPITALx = ISNULL(SUM(SALDODOC), 0) FROM #MOVIMIENTOSX where IDPROVEEDO = @CODIGO and CARGOS <> 0  AND  SALDODOC > 0

SELECT @INTERPENX =ISNULL(SUM(INTERES), 0)  FROM #MOVIMIENTOSX where CODCLIE = @CODIGO and INTT = 'P' AND FECHA >  @FECHAULCINTX
SELECT @INTERPENX = CASE WHEN @GRUPO_CONTABLE = 'CLIEN-AFIL' THEN 0 ELSE @INTERPENX END

SET @INTERESTOTALX =CASE WHEN @GRUPO_CONTABLE = 'CLIEN-AFIL' THEN 0 ELSE  ISNULL(@INTERESTOTAL_Antes,0) + ISNULL(@INTERESTOTAL_Despues,0) + ISNULL(@INTERESTOTAL_SinUltimaFecha,0) END

SET @PERIVAX =CASE WHEN @GRUPO_CONTABLE = 'CLIEN-AFIL' THEN 0 ELSE (@INTERESTOTALX) * 0.13 END

--SELECT
--@BISIESTOX AS BICIESTO,
--@valinteresX AS valinteres,
--@FECHAULCINTX AS FECHAULCINTX,
--@ahoraX AS ahoraX,
--@INTERESTOTAL_Antes AS INTERESTOTAL_Antes,
--@INTERESTOTAL_Despues as INTERESTOTAL_Despues,
--@INTERESTOTAL_SinUltimaFecha as INTERESTOTAL_SinUltimaFecha,
--@INTERESTOTALX AS INTERESTOTALX,
--@PERCAPITALx AS PERCAPITALx,
--@PERIVAX AS PERIVAX
--SP_VistaRepIndiviInteres_LineaCredito_WEB 'CANA001', ''


CREATE TABLE #InteresCalculadoX
(
[INTERES] MONEY,
[CAPITAL] MONEY,
[IVA] MONEY,
[INTERPEN] MONEY,
[FECHACALC] DATETIME,
[IDGP] VARCHAR(15)
)


INSERT INTO #InteresCalculadoX (INTERES,CAPITAL,IVA, INTERPEN, FECHACALC, IDGP) VALUES (@INTERESTOTALX , @PERCAPITALx, @PERIVAX, @INTERPENX, @ahoraX,  @CODIGO)

--SELECT * FROM #InteresCalculadoX
--******





SELECT DISTINCT
                      TOP (100) PERCENT LTRIM(RTRIM(#MOVIMIENTOSX.IDOIP)) AS IdOIP, LTRIM(RTRIM(#MOVIMIENTOSX.IDCLIENTE)) AS IDCLIENTE,
                      #MOVIMIENTOSX.FECHA, #MOVIMIENTOSX.CONCEPTO, #MOVIMIENTOSX.DOCUMENTO, #MOVIMIENTOSX.CARGOS,
                      #MOVIMIENTOSX.SALDODOC, #InteresCalculadoX.INTERES - #InteresCalculadoX.INTERPEN AS INTERESCALC, #InteresCalculadoX.CAPITAL,
                      (#InteresCalculadoX.INTERES - #InteresCalculadoX.INTERPEN) * 0.13 AS IVA, #InteresCalculadoX.INTERPEN, #InteresCalculadoX.FECHACALC,
                      #MOVIMIENTOSX.ABONOS, #MOVIMIENTOSX.INTERES, #MOVIMIENTOSX.codclie AS idproveedo,
                      dbo.VistaClientesGP.CUSTNAME AS VENDNAME, case when documento like'%A' AND CARGOS > 0 AND MONTH(#MOVIMIENTOSX.FECHA) = 12 AND DAY(#MOVIMIENTOSX.FECHA)=31 THEN SALDODOC ELSE 0 END AS Capitalizacion
					  ,ISNULL(#MOVIMIENTOSX.ZAFRA, '') AS ZAFRA, ISNULL(#MOVIMIENTOSX.IdSolicitud, '') AS IdSolicitud
FROM         #MOVIMIENTOSX INNER JOIN
                      #InteresCalculadoX ON #MOVIMIENTOSX.codclie = #InteresCalculadoX.IDGP INNER JOIN
                      dbo.VistaClientesGP ON #MOVIMIENTOSX.codclie = dbo.VistaClientesGP.CUSTNMBR LEFT OUTER JOIN
					  LCCREDITOS..OIP ON #MOVIMIENTOSX.IDOIP = LCCREDITOS..OIP.IdOIP
					  WHERE #MOVIMIENTOSX.codclie = @CODIGO
ORDER BY #MOVIMIENTOSX.FECHA

--SP_VistaRepIndiviInteres_LineaCredito_WEB 'CANA001', ''


DROP TABLE #MOVIMIENTOSX
DROP TABLE #InteresCalculadoX

END

PARA TABLA DE CREDITO ACTIVOS
LCCREDITOS..SP_VistaRepIndiviInteres_LineaCredito_Resumen
USE [LCCREDITOS]
GO
/****** Object:  StoredProcedure [dbo].[SP_VistaRepIndiviInteres_LineaCredito_Resumen]    Script Date: 31/10/2022 17:31:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
--SP_VistaRepIndiviInteres_LineaCredito_Resumen 'JARRI002', 'lmartinez'
ALTER PROCEDURE [dbo].[SP_VistaRepIndiviInteres_LineaCredito_Resumen]
(
@CODIGO VARCHAR(15),
@USERID VARCHAR(50)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @ZAFRA_VIGENTE VARCHAR(9)
	SELECT @ZAFRA_VIGENTE = IDPERIODO
FROM            PERIODOS WHERE ACTUAL = 1

--	SELECT LTRIM(RTRIM(dbo.MOVIMIENTOSCRT.IDOIP)) AS IdOIP, LTRIM(RTRIM(dbo.MOVIMIENTOSCRT.IDCLIENTE)) AS IDCLIENTE,
--                      dbo.MOVIMIENTOSCRT.FECHA, dbo.MOVIMIENTOSCRT.CONCEPTO, dbo.MOVIMIENTOSCRT.DOCUMENTO, dbo.MOVIMIENTOSCRT.CARGOS,
--                      dbo.MOVIMIENTOSCRT.SALDODOC, dbo.InteresCalculado.INTERES - dbo.InteresCalculado.INTERPEN AS INTERESCALC, dbo.InteresCalculado.CAPITAL,
--                      (dbo.InteresCalculado.INTERES - dbo.InteresCalculado.INTERPEN) * 0.13 AS IVA, dbo.InteresCalculado.INTERPEN, dbo.InteresCalculado.FECHACALC,
--                      dbo.MOVIMIENTOSCRT.ABONOS, dbo.MOVIMIENTOSCRT.INTERES, dbo.MOVIMIENTOSCRT.codclie AS idproveedo,
--                      dbo.VistaClientesGP.CUSTNAME AS VENDNAME, case when documento like'%A' AND CARGOS > 0 AND MONTH(dbo.MOVIMIENTOSCRT.FECHA) = 12 AND DAY(dbo.MOVIMIENTOSCRT.FECHA)=31 THEN SALDODOC ELSE 0 END AS Capitalizacion
--					  ,ISNULL(LCCREDITOS..OIP.ZAFRA, '') AS ZAFRA, ISNULL(dbo.MOVIMIENTOSCRT.IdSolicitud, '') AS IdSolicitud
--FROM         dbo.MOVIMIENTOSCRT INNER JOIN
--                      dbo.InteresCalculado ON dbo.MOVIMIENTOSCRT.codclie = dbo.InteresCalculado.IDGP INNER JOIN
--                      dbo.VistaClientesGP ON dbo.MOVIMIENTOSCRT.codclie = dbo.VistaClientesGP.CUSTNMBR LEFT OUTER JOIN
--					  LCCREDITOS..OIP ON dbo.MOVIMIENTOSCRT.IDOIP = LCCREDITOS..OIP.IdOIP
--					  WHERE dbo.MOVIMIENTOSCRT.codclie = @CODIGO
--ORDER BY dbo.MOVIMIENTOSCRT.FECHA

CREATE TABLE #LINEAS_CARGOS
(
ZAFRA VARCHAR(9),
IDOIP INT,
IDSOLICITUD VARCHAR(15),
CARGOS DECIMAL(15, 2),
SALDODOC DECIMAL(15, 2)
)
INSERT INTO #LINEAS_CARGOS (ZAFRA, IDOIP, IDSOLICITUD, CARGOS, SALDODOC)
SELECT ISNULL(B.ZAFRA, '') AS ZAFRA, A.IDOIP, A.IdSolicitud, SUM(A.CARGOS) AS CARGOS, SUM(A.SALDODOC) AS SALDODOC
FROM dbo.MOVIMIENTOSCRT A INNER JOIN OIP B ON A.IdOIP = B.IdOIP
WHERE A.CODCLIE = @CODIGO
GROUP BY ISNULL(B.ZAFRA, ''), A.IDOIP, A.IdSolicitud




--SELECT A.ZAFRA, A.IdSolicitud, A.Monto AS Aprobado, A.IDGP, A.IdOIP,  A.TipoSolicitud, A.EstadoCredito, A.EstadoSolici, A.IdContrato
--FROM  V_SolicitudCreditos A INNER JOIN OIP B ON A.IdOIP = B.IdOIP AND A.IDGP = B.IDGP
--WHERE A.IDGP = 'LOSMA001' AND B.EstadoOIP = 0

CREATE TABLE #DETALLE_INTERESES
(
INTERES DECIMAL(10, 2),
CAPITAL DECIMAL(15, 2),
IVA DECIMAL(10, 2),
INTERPEN DECIMAL(10, 2),
IDGP VARCHAR(50),
ZAFRA VARCHAR(50),
IDSOLICITUD VARCHAR(50)
)
INSERT INTO #DETALLE_INTERESES (INTERES, CAPITAL, IVA, INTERPEN, IDGP, ZAFRA, IDSOLICITUD)
SELECT       SUM(INTERES) AS INTERES, SUM(CAPITAL) AS CAPITAL, SUM(IVA) AS IVA, SUM(INTERPEN) AS INTERPEN, IDGP, ZAFRA, IDSOLICITUD
FROM            InteresCalculado_Detalle WHERE IDGP = @CODIGO AND USERID = @USERID
GROUP BY IDGP, ZAFRA, IDSOLICITUD


--SP_VistaRepIndiviInteres_LineaCredito_Resumen 'MQUIJ006', 'lmartinez'

--**************************LINEAS CON SALDO*****************************
SELECT A.ZAFRA, A.IdSolicitud AS Solicitud, A.Monto AS Aprobado, ISNULL(C.CARGOS, 0) AS Cargo, A.Monto - ISNULL(C.CARGOS, 0) AS Disponible, ISNULL(C.SALDODOC, 0) AS SALDODOC, A.TipoSolicitud, ISNULL(D.INTERES, 0) AS INTERES, ISNULL(D.IVA, 0) AS IVA,
(SELECT fp.NomFormaPago FROM LCCREDITOS..FormaPago fp WHERE fp.CodFormaPago = A.TipoFormaPago )TipoFormaPago
--, A.EstadoCredito, A.EstadoSolici, A.IdContrato
FROM  V_SolicitudCreditos A LEFT OUTER JOIN OIP B ON A.IdOIP = B.IdOIP AND A.IDGP = B.IDGP LEFT OUTER JOIN #LINEAS_CARGOS C ON A.ZAFRA = C.ZAFRA AND A.IdOIP = C.IdOIP AND A.IdSolicitud = C.IDSOLICITUD
      LEFT OUTER JOIN #DETALLE_INTERESES D ON A.ZAFRA = D.ZAFRA AND A.IdSolicitud = D.IDSOLICITUD AND A.IDGP = D.IDGP
WHERE A.IDGP = @CODIGO AND A.IDGP <> 'JGRAN005' AND ISNULL(C.SALDODOC, 0)>0

UNION ALL
SELECT A.ZAFRA, A.IdSolicitud AS Solicitud, A.Monto AS Aprobado, ISNULL(C.CARGOS, 0) AS Cargo, A.Monto - ISNULL(C.CARGOS, 0) AS Disponible, ISNULL(C.SALDODOC, 0) AS SALDODOC, A.TipoSolicitud, ISNULL(D.INTERES, 0) AS INTERES, ISNULL(D.IVA, 0) AS IVA,
(SELECT fp.NomFormaPago FROM LCCREDITOS..FormaPago fp WHERE fp.CodFormaPago = A.TipoFormaPago )TipoFormaPago
--, A.EstadoCredito, A.EstadoSolici, A.IdContrato
FROM  V_SolicitudCreditos A LEFT OUTER JOIN OIP B ON A.IdOIP = B.IdOIP AND A.IDGP = B.IDGP LEFT OUTER JOIN #LINEAS_CARGOS C ON A.ZAFRA = C.ZAFRA AND A.IdOIP = C.IdOIP AND A.IdSolicitud = C.IDSOLICITUD
      LEFT OUTER JOIN #DETALLE_INTERESES D ON A.ZAFRA = D.ZAFRA AND A.IdSolicitud = D.IDSOLICITUD AND A.IDGP = D.IDGP
WHERE A.IDGP = @CODIGO AND A.IDGP = 'JGRAN005' AND ISNULL(C.SALDODOC, 0)>0
--**************************LINEAS CON SALDO***********************************************

UNION ALL

--**************************LINEAS SIN SALDO************************************************
SELECT A.ZAFRA, A.IdSolicitud AS Solicitud, A.Monto AS Aprobado, ISNULL(C.CARGOS, 0) AS Cargo, A.Monto - ISNULL(C.CARGOS, 0) AS Disponible, ISNULL(C.SALDODOC, 0) AS SALDODOC, A.TipoSolicitud, ISNULL(D.INTERES, 0) AS INTERES, ISNULL(D.IVA, 0) AS IVA,
(SELECT fp.NomFormaPago FROM LCCREDITOS..FormaPago fp WHERE fp.CodFormaPago = A.TipoFormaPago )TipoFormaPago
--, A.EstadoCredito, A.EstadoSolici, A.IdContrato
FROM  V_SolicitudCreditos A LEFT OUTER JOIN OIP B ON A.IdOIP = B.IdOIP AND A.IDGP = B.IDGP LEFT OUTER JOIN #LINEAS_CARGOS C ON A.ZAFRA = C.ZAFRA AND A.IdOIP = C.IdOIP AND A.IdSolicitud = C.IDSOLICITUD
      LEFT OUTER JOIN #DETALLE_INTERESES D ON A.ZAFRA = D.ZAFRA AND A.IdSolicitud = D.IDSOLICITUD AND A.IDGP = D.IDGP
WHERE A.IDGP = @CODIGO AND A.IDGP <> 'JGRAN005'  AND ISNULL(C.SALDODOC, 0)<=0 AND A.ZAFRA =@ZAFRA_VIGENTE AND A.EstadoCredito = 1

UNION ALL
SELECT A.ZAFRA, A.IdSolicitud AS Solicitud, A.Monto AS Aprobado, ISNULL(C.CARGOS, 0) AS Cargo, A.Monto - ISNULL(C.CARGOS, 0) AS Disponible, ISNULL(C.SALDODOC, 0) AS SALDODOC, A.TipoSolicitud, ISNULL(D.INTERES, 0) AS INTERES, ISNULL(D.IVA, 0) AS IVA,
(SELECT fp.NomFormaPago FROM LCCREDITOS..FormaPago fp WHERE fp.CodFormaPago = A.TipoFormaPago )TipoFormaPago
--, A.EstadoCredito, A.EstadoSolici, A.IdContrato
FROM  V_SolicitudCreditos A LEFT OUTER JOIN OIP B ON A.IdOIP = B.IdOIP AND A.IDGP = B.IDGP LEFT OUTER JOIN #LINEAS_CARGOS C ON A.ZAFRA = C.ZAFRA AND A.IdOIP = C.IdOIP AND A.IdSolicitud = C.IDSOLICITUD
      LEFT OUTER JOIN #DETALLE_INTERESES D ON A.ZAFRA = D.ZAFRA AND A.IdSolicitud = D.IDSOLICITUD AND A.IDGP = D.IDGP
WHERE A.IDGP = @CODIGO AND A.IDGP = 'JGRAN005' AND ISNULL(C.SALDODOC, 0)<=0 AND A.ZAFRA =@ZAFRA_VIGENTE AND A.EstadoCredito = 1
--**************************LINEAS SIN SALDO************************************************************


UNION ALL
SELECT A.Zafra, A.IdSolicitud as Solicitud, SUM(A.CARGOS) AS Aprobado, SUM(A.CARGOS) as Cargo, 0 AS Disponible, SUM(A.SALDODOC) as SALDODOC, 'Línea de Insumos' as TipoSolicitud, ISNULL(D.INTERES, 0) AS INTERES, ISNULL(D.IVA, 0) AS IVA,
'' AS TipoFormaPago
FROM MOVIMIENTOSCRT A LEFT OUTER JOIN #DETALLE_INTERESES D ON A.ZAFRA = D.ZAFRA AND A.IdSolicitud = D.IDSOLICITUD AND A.codclie = D.IDGP
WHERE SUBSTRING(A.IdSolicitud, 1, 2) = 'SI' AND A.SALDODOC > 0 AND A.CODCLIE = @CODIGO
 --AND A.CODCLIE <> 'JGRAN005'
group by A.Zafra, A.IdSolicitud, D.INTERES, D.IVA


DROP TABLE #LINEAS_CARGOS
DROP TABLE #DETALLE_INTERESES


END

