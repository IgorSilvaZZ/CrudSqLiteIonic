import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db: SQLiteObject;
  databaseName: string = 'contatos.db';

  constructor(private sqlite: SQLite, private sqLitePorter: SQLitePorter) { }

  async OpenDataBase(){
    try {
      this.db = await this.sqlite.create({name: this.databaseName, location: 'default'});
      await this.createDatabase();
    } catch (error) {
      console.error('Ocorreu um erro ao criar o banco de dados!',error);
    }
  }

  async createDatabase(){
    const sqlCreateDatabase  = this.getCreateTable();
    const result = await this.sqLitePorter.importSqlToDb(this.db,sqlCreateDatabase);
    return result ? true : false;
  }

  getCreateTable(){
    const sqls = [];
    sqls.push('CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(100));');
    return sqls.join('\n');
  }

  executeSQL(sql: string, params?:any[]){
    return this.db.executeSql(sql, params);
  }

}
