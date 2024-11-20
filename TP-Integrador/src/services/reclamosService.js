import Reclamos from "../database/reclamos.js";
import InformeService from "./informesService.js";

export default class ReclamosService {
  constructor() {
    this.reclamos = new Reclamos();
    this.informes = new InformeService();
  }

  buscarTodos = () => {
    return this.reclamos.buscarTodos();
  };

  buscarPorId = (idReclamo) => {
    return this.reclamos.buscarPorId(idReclamo);
  };

  crear = (reclamo) => {
    return this.reclamos.crear(reclamo);
  };

  modificar = (idReclamo, datos) => {
    return this.reclamos.modificar(idReclamo, datos);
  };

  generarInforme = async (formato) => {
    if (formato === 'pdf') {
        return await this.reportePdf();
    }else if (formato === 'csv'){
        return await this.reporteCsv();
    }
  }

  reportePdf = async () => {
    const datosReporte = await this.reclamos.buscarDatosReportePdf();

    if (!datosReporte || datosReporte.length === 0) {
        return { estado: false, mensaje: 'Sin datos para el reporte'};
    }
    const pdf = await this.informes.informeReclamosPdf(datosReporte);
    
    return {
        buffer: pdf,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="reporte.pdf"'
        }
    };
  }

  reporteCsv = async () => {
    const datosReporte = await this.reclamos.buscarDatosReporteCsv();

    if (!datosReporte || datosReporte.length === 0) {
        return {estado: false, mensaje: 'Sin datos para el reporte'};
    }

    const csv =  await  this.informes.informeReclamosCsv(datosReporte);
    return {
        path: csv,
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="reporte.csv"'
        }
    };
  }
}
