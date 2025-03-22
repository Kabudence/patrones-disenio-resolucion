/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 */

import {COLORS} from "../helpers/colors";

//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 * 
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */



 class Query {

    public table: string;
    public formattedFields: string = '*';
    public conditions?: string;
    public orderFields?: string;
    public limit?: string;

    executeQuery()  {
      console.log(this.formattedFields,this.table,this.conditions,this.orderFields,this.limit);
    }

}

class queryBuilder {
   private query: Query;

   constructor() {
     this.query= new Query();
   }

   setTable(table: string): queryBuilder {
     this.query.table = `FROM ${table}`;
     return this;
   }
  setFields(fields: string[]): queryBuilder {
    this.query.formattedFields = fields.length > 0 ? fields.join(', ') : '*';
    this.query.formattedFields= `SELECT ${this.query.formattedFields}`;
    return this;
  }
    setConditions(conditions: string[]): queryBuilder {
        this.query.conditions = conditions.length > 0 ? conditions.join(' AND ') : '*';
        this.query.conditions= `WHERE ${this.query.conditions}`;
        return this;
    }
    setLimit(limit: number): queryBuilder {
        this.query.limit = `LIMIT ${limit};`;
        return this;
    }
    setOderBy(orderBy: string, order: string): queryBuilder {
        this.query.orderFields = `ORDER BY ${orderBy} ${order}`;
        return this;
    }
    build(): Query {
        return this.query;
    }

}
function main(){
    const usersQuery = new queryBuilder()
        .setTable("users")
        .setFields(["id", "name", "email"])
        .setConditions(["age > 18", "country = 'Cri'"])
        .setOderBy("name", "ASC")
        .setLimit(10)
        .build()

    console.log('Consulta: ',);
    usersQuery.executeQuery()
}
main();




























// class QueryBuilder {
//   private table: string;
//   // Usamos una propiedad interna para guardar la cadena de campos formateada.
//   private formattedFields: string = '*';
//   private conditions: string[] = [];
//   private orderClause: string = '';
//   private limitCount?: number;
//
//   constructor(table: string) {
//     this.table = table;
//   }
//
//   // El método select recibe múltiples campos, los itera y los une con comas
//   select(...fields: string[]): QueryBuilder {
//     // Si se pasan campos, se unen con comas, si no, se usa '*' para seleccionar todos.
//     this.formattedFields = fields.length > 0 ? fields.join(', ') : '*';
//     return this;
//   }
//
//   // Agrega una condición. Si se llama varias veces, se unen con AND.
//   where(condition: string): QueryBuilder {
//     this.conditions.push(condition);
//     return this;
//   }
//
//   // Agrega la cláusula ORDER BY con el campo y la dirección
//   orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
//     this.orderClause = ` ORDER BY ${field} ${direction}`;
//     return this;
//   }
//
//   // Define el límite de resultados
//   limit(count: number): QueryBuilder {
//     this.limitCount = count;
//     return this;
//   }
//
//   // Construye la consulta SQL completa usando los datos formateados en cada método
//   execute(): string {
//     let query = `SELECT ${this.formattedFields} FROM ${this.table}`;
//
//     if (this.conditions.length) {
//       query += ' WHERE ' + this.conditions.join(' AND ');
//     }
//
//     if (this.orderClause) {
//       query += this.orderClause;
//     }
//
//     if (this.limitCount !== undefined) {
//       query += ` LIMIT ${this.limitCount}`;
//     }
//
//     // Agregamos el punto y coma final
//     query += ';';
//     return query;
//   }
// }
//
// function main() {
//   const usersQuery = new QueryBuilder('users')
//       .select('id', 'name', 'email')
//       .where('age > 18')
//       .where("country = 'Cri'") // Se unen con AND
//       .orderBy('name', 'ASC')
//       .limit(10)
//       .execute();
//
//   console.log('%cConsulta:\n', 'color: red;');
//   console.log(usersQuery);
// }
//
// main();
