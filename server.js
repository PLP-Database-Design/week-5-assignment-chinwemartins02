const express = require('express');
// express is one of the business logic to handle requests and responses
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

// connect to database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    });


    //check if db connection works

    db.connect((err) => {
        // No Connection
        if(err) return console.log("Error connecting to the mysql db")

        //Yes Connection 

        console.log("Connected to mysql successfully as id:", db.threadId)

        
        // USING GET METHOD 
        app.set('view engine', 'ejs')
        app.set('views', __dirname + '/views');

        //Solution for Question 1
        // app.get('/patients', (req,res) => {
        //     // Retrieve data from database
        //     db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) => {
        //         if(err){
        //             console.error(err);
        //             res.status(500).send('Error retrieving patients');
        //         }else{
        //             // render data
        //             res.render('patients', {results: results});
        //         }
        //     });
        // });


        //Solution for Question 2
        app.get('/providers', (req,res) => {
                 // Retrieve data from database
                db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) => {
                    if(err){
                        console.error(err);
                     res.status(500).send('Error retrieving providers');
                     }else{
                         // render data
                         res.render('providers', {results: results});
                     }
                 });
            });


        // Solution forquestion 3
        // GET endpoint to retrieve patients by first name
//         app.get('/patients', (req, res) => {
//             // Read the `first_name` query parameter from the request
//             const firstName = req.query.first_name;
          
//             // If `first_name` is not provided, send an error response
//             if (!firstName) {
//               return res.status(400).send('Error: first_name query parameter is required');
//             }
          
//             // SQL query to retrieve patients with the specified first name
//             const sqlQuery = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
          
//             db.query(sqlQuery, [firstName], (err, results) => {
//               if (err) {
//                 console.error("Error retrieving data:", err);
//                 return res.status(500).send('Error retrieving data');
//               }
          
  
//       // Render data in 'patients.ejs' template
//       res.render('patients', {results});
//     });
//   });
  

        
//Solution for Question 4
// GET endpoint to retrieve all providers by specialty
// app.get('/providersBySpecialty', (req, res) => {
//     const sqlQuery = `
//       SELECT provider_specialty, first_name, last_name 
//       FROM providers 
//       ORDER BY provider_specialty, last_name, first_name
//     `;
  
//     db.query(sqlQuery, (err, results) => {
//       if (err) {
//         console.error('Error retrieving providers:', err);
//         return res.status(500).send('Server error');
//       }
  
//       // Group providers by specialty
//       const providersBySpecialty = results.reduce((acc, provider) => {
//         const { provider_specialty } = provider;
//         if (!acc[provider_specialty]) {
//           acc[provider_specialty] = [];
//         }
//         acc[provider_specialty].push(provider);
//         return acc;
//       }, {});
  
//       res.render('providersBySpecialty', { providersBySpecialty });
//     });
//   });


        app.listen(process.env.PORT, () => {
            // sending a message to browser
            console.log("Sending a message to the browser...")
            app.get('/', (req,res) => {
                res.send('Server started successfully!')
            });
        });

    });