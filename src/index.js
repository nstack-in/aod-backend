const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const result = dotenv.config();
if (result.error) {
    throw result.error;
}
const { PORT, CONNECTION_STRING } = process.env;

let time = Date.now();
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err.message;
    console.log(`Connected to Database in ${Date.now() - time} ms`);
    app.listen(PORT, () => console.log(`App running at http://localhost:${PORT}`));
})
