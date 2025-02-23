const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

//affichage de la table
async function displayTables(pool) {
    try {
      // Récupérer la liste des tables
      const [tables] = await pool.execute('SHOW TABLES');
      console.log('\nListe des tables :');
      tables.forEach(table => {
        console.log(`- ${Object.values(table)[0]}`);
      });
  
      // Pour chaque table, récupérer sa structure
      for (const table of tables) {
        const tableName = Object.values(table)[0];
        const [columns] = await pool.execute(`DESCRIBE ${tableName}`);
        console.log(`\nStructure de la table "${tableName}":`);
        columns.forEach(column => {
          console.log(
            `  - ${column.Field}: ${column.Type} | Clé primaire: ${
              column.Key === 'PRI' ? 'Oui' : 'Non'
            } | Null: ${column.Null === 'YES' ? 'Autorisé' : 'Non autorisé'}`
          );
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'affichage des tables :', error.message);
    }
  }

//cretation des base de donner
async function initializeDatabase() {
    try {
      

        // Requêtes SQL pour créer les tables
        const rawData = fs.readFileSync('database/database.json', 'utf8'); // Lire le fichier en mode texte
        const data = JSON.parse(rawData); // Convertir le JSON en objet JavaScript

        // await pool.execute(data.deleteAllTables);

        // Exécuter les requêtes SQL
        await pool.execute(data.createCompteTable);
        await pool.execute(data.createCoiffeurTable);
        await pool.execute(data.createClientTable);
        await pool.execute(data.createRefreshTokensTable);


        // await displayTables(pool);//afficher la base de donner
        
        // const [table] = await pool.execute('select * from Compte;');
        // table.forEach(element => {console.log(element);});

        // console.log("compte client");
        // const [tables] = await pool.execute('select * from Compte_Client;');
        // tables.forEach(element => {console.log(element);});

        // console.log("compte coiffeur");
        // const [tables2] = await pool.execute('select * from Compte_Coiffeur;');
        // tables2.forEach(element => {console.log(element);});
        
        console.log('Base de données initialisée avec succès.');
        } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données :', error.message);
    };
}




module.exports = {pool,initializeDatabase};