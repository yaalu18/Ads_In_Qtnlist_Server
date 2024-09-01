
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Question = mongoose.model('Question', QuestionSchema);
export default Question;
