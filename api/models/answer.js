const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
     question_id: { 
         type: String, 
         required: true 
    },
    answer: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model("Answer", AnswerSchema);