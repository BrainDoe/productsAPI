const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const hpp = require('hpp');
const connectDB = require('./config/db');
require('dotenv').config();
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');

const app = express();
connectDB();

const productRoute = require('./routes/products.route')

console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(express.json());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// app.use(fileupload());


// Set static folder
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
// app.use(express.static(path.join(__dirname, 'public')));

const baseUrl = process.env.BASE_URL

app.use(`${baseUrl}/products`, productRoute);

// Error Handling  middleware
app.use(errorHandler);

let port = process.env.PORT || 8082
const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close((() => process.exit(1)));
});
