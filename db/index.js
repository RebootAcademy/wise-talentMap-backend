const mongoose = require('mongoose')

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      dbName: process.env.DB_NAME,
    })

    console.info(`Connected to WISE-C DB`)
  } catch (err) {
    console.log(err)
    throw new Error(`ERROR: Cannot connect to TARO DB`)
  }
}

module.exports = dbConnect
