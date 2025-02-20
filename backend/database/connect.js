const mysql = require('mysql2/promise');
require('dotenv').config();
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


// Test de la connexion
// (async () => {
//     try {
//         const [rows] = await pool.execute('SELECT 1');
//         console.log('Connexion réussie au pool !', rows);
//     } catch (err) {
//         console.error('Erreur lors de la connexion au pool :', err);
//     } finally {
//         await pool.end(); // Fermer le pool après utilisation
//     }
// })();

//cretation des base de donner


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

async function initializeDatabase() {
    try {
        // Requêtes SQL pour créer les tables
        const createCompteTable = `
            CREATE TABLE IF NOT EXISTS Compte (
            id_compte INT AUTO_INCREMENT PRIMARY KEY,
            nom VARCHAR(255),
            prenom VARCHAR(255),
            date_de_naissance DATE,
            numero_tel VARCHAR(20),
            adresse_email VARCHAR(255) UNIQUE,
            mot_de_passe VARCHAR(255)
            )
        `;
    
        const createCoiffeurTable = `
            CREATE TABLE IF NOT EXISTS Compte_Coiffeur (
            id_compte INT PRIMARY KEY,
            adresse TEXT,
            FOREIGN KEY (id_compte) REFERENCES Compte(id_compte) ON DELETE CASCADE
            )
        `;
    
        const createClientTable = `
            CREATE TABLE IF NOT EXISTS Compte_Client (
            id_compte INT PRIMARY KEY,
            FOREIGN KEY (id_compte) REFERENCES Compte(id_compte) ON DELETE CASCADE
            )
        `;
    
        // Exécuter les requêtes SQL
        await pool.execute(createCompteTable);
        await pool.execute(createCoiffeurTable);
        await pool.execute(createClientTable);

        // await displayTables(pool);//afficher la base de donner

        // Fermer la connexion
        await pool.end();
        console.log('Base de données initialisée avec succès.');
        } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données :', error.message);
    };
}


        


module.exports = {pool,initializeDatabase};