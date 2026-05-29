// require('dotenv').config({ path: './config/.env' });
// const app = require("./index")
// const connectDB = require("./db/db");

// const PORT = process.env.PORT;

// connectDB();

// try {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// } catch (err) {
//     console.error(err.message);
//     process.exit(1);
// }   
require('dotenv').config({ path: './config/.env' });
const app = require("./index");
const connectDB = require("./db/db");

// Establish the database connection
connectDB();

// Export the app so Vercel can handle the routing
module.exports = app;