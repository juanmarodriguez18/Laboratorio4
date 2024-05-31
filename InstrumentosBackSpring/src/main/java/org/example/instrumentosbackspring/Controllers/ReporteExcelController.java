package org.example.instrumentosbackspring.Controllers;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.example.instrumentosbackspring.Entities.Pedido;
import org.example.instrumentosbackspring.Entities.PedidoDetalle;
import org.example.instrumentosbackspring.Repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reportes")
public class ReporteExcelController {
    @Autowired
    private PedidoRepository pedidoRepository;

    private static final int MAX_LINES_PER_SHEET = 50;

    @PostMapping("/generarExcel")
    public ResponseEntity<byte[]> generarExcel(@RequestBody FiltroFechas filtro) {
        try {
            List<Pedido> pedidosFiltrados = pedidoRepository.findByFechaPedidoBetween(filtro.getFechaDesde(), filtro.getFechaHasta());

            // Crear workbook de Excel
            Workbook workbook = new XSSFWorkbook();

            // Crear estilo de celda para formato de moneda
            CellStyle currencyStyle = workbook.createCellStyle();
            currencyStyle.setDataFormat(workbook.createDataFormat().getFormat("$#,##0.00"));

            // Crear estilo de fuente para la cabecera
            Font headerFont = workbook.createFont();
            headerFont.setFontName("Cascadia Code SemiBold");
            headerFont.setFontHeightInPoints((short) 12);
            headerFont.setColor(IndexedColors.BLACK.getIndex());

            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            // Crear encabezados de columna
            String[] columns = {"Fecha Pedido", "Instrumento", "Marca", "Modelo", "Cantidad", "Precio", "Subtotal"};

            // Escribir en bloques de MAX_LINES_PER_SHEET líneas por hoja
            int startIndex = 0;
            while (startIndex < pedidosFiltrados.size()) {
                int endIndex = Math.min(startIndex + MAX_LINES_PER_SHEET, pedidosFiltrados.size());
                List<Pedido> sublist = pedidosFiltrados.subList(startIndex, endIndex);

                Sheet sheet = workbook.createSheet("Pedidos - " + (startIndex / MAX_LINES_PER_SHEET + 1));
                Row headerRow = sheet.createRow(0);
                for (int i = 0; i < columns.length; i++) {
                    Cell cell = headerRow.createCell(i);
                    cell.setCellValue(columns[i]);
                    cell.setCellStyle(headerStyle); // Aplicar estilo de cabecera
                }

                int rowNum = 1;
                for (Pedido pedido : sublist) {
                    for (PedidoDetalle detalle : pedido.getDetalles()) {
                        Row row = sheet.createRow(rowNum++);
                        row.createCell(0).setCellValue(pedido.getFechaPedido().toString());
                        row.createCell(1).setCellValue(detalle.getInstrumento().getInstrumento());
                        row.createCell(2).setCellValue(detalle.getInstrumento().getMarca());
                        row.createCell(3).setCellValue(detalle.getInstrumento().getModelo());
                        row.createCell(4).setCellValue(detalle.getCantidad());

                        // Crear celda para precio
                        Cell precioCell = row.createCell(5);
                        precioCell.setCellValue(detalle.getInstrumento().getPrecio());
                        precioCell.setCellStyle(currencyStyle); // Aplicar estilo de moneda

                        // Calcular y crear celda para subtotal
                        Cell subtotalCell = row.createCell(6);
                        subtotalCell.setCellValue(detalle.getCantidad() * detalle.getInstrumento().getPrecio());
                        subtotalCell.setCellStyle(currencyStyle); // Aplicar estilo de moneda
                    }
                }

                startIndex += MAX_LINES_PER_SHEET;
            }

            // Escribir workbook a ByteArrayOutputStream
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            workbook.write(baos);

            // Configurar la respuesta para descargar el archivo Excel
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=pedidos.xlsx");
            headers.set(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            return new ResponseEntity<>(baos.toByteArray(), headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Clase para recibir el filtro de fechas desde el frontend
    static class FiltroFechas {
        private LocalDate fechaDesde;
        private LocalDate fechaHasta;

        public LocalDate getFechaDesde() {
            return fechaDesde;
        }

        public void setFechaDesde(LocalDate fechaDesde) {
            this.fechaDesde = fechaDesde;
        }

        public LocalDate getFechaHasta() {
            return fechaHasta;
        }

        public void setFechaHasta(LocalDate fechaHasta) {
            this.fechaHasta = fechaHasta;
        }
    }
}
