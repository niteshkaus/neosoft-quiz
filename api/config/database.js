const mongoose = require('mongoose');

// to avoid global promise warning
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = () => {
    return mongoose.connect('mongodb://localhost:27017/quiz', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};