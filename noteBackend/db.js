const { connect } = require('mongoose')

const connectToDB = () => new Promise(async (res, rej) => {
    try {
        await connect('mongodb+srv://arturpoghosyan1907:qQTSHk5ZrrndadTe@cluster0.ttyltps.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            // useCreateIndex: true,
            // useUnifiedTopology: true
        })

        console.log('Connected!')
        res()
    } catch (error) {
        console.log("err" + error)
        rej("err" + error)
    }

})

module.exports = connectToDB