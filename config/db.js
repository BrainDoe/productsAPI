const mongoose = require('mongoose');


// const connectDB = () => {
//   try {
//      mongoose.connect(db_local, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(con => {
//       console.log(con.connection);
//        console.log('Database connection established')
//      })
//   } catch(error) {
//     console.error(error);
//     process.exit(1);
//   }
// }



const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDB;