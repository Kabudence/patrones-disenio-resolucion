/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 */

/**
 * 	!Descripción:
  1.	Completen las clases SalesReport e InventoryReport para implementar 
      la interfaz Report, generando el contenido de cada reporte en el método generate.
	  
  2.	Implementen las clases SalesReportFactory e InventoryReportFactory 
      para crear instancias de SalesReport y InventoryReport, respectivamente.

	3.	Prueben el programa generando diferentes tipos de reportes usando
      el prompt para seleccionar el tipo de reporte.
 */





// 1. Definir la interfaz Report
interface IReport {
  generate(): void;
  
}

// 2. Clases concretas de Reportes
// Implementar SalesReport e InventoryReport

class SalesReport implements IReport {
    generate() {
        console.log('Generando reporte de ventas...');
    }

}

class InventoryReport implements IReport {

    generate() {
        console.log('Generando reporte de inventario...');
    }
}

// 3. Clase Base ReportFactory con el Método Factory

abstract class ReportFactory {
  abstract createReport(): IReport;

  generateReport(): void {
    const report = this.createReport();
    report.generate();
  }
}

// 4. Clases Concretas de Fábricas de Reportes

class SalesReportFactory extends ReportFactory {
  createReport(): IReport {
    return new SalesReport();
  }
}

class InventoryReportFactory extends ReportFactory {
  createReport(): IReport {
    return new InventoryReport();
  }
  inventoryMethod(){console.log("Informacion extra de inventario")}
}

// 5. Código Cliente para Probar
import readlineSync from 'readline-sync';

function main() {
  let reportFactory: ReportFactory;
  let inventoryReportFactory= new InventoryReportFactory;
  let inventory=new  InventoryReport;
  inventory.generate()
    inventoryReportFactory.generateReport()   
    
    const reportType = readlineSync.question(
    '¿Que tipo de reporte deseas? %c(sales/inventory)',

  );
    
    
  if (reportType === 'sales') {
    reportFactory = new SalesReportFactory();
  } else {
    reportFactory = new InventoryReportFactory();
  }

  reportFactory.generateReport();
}

main();
