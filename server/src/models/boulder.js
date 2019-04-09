import mongoose from 'mongoose';

const boulderSchema = new mongoose.Schema({
  grade: { type: String, required: true },
  flashed: { type: Number },
  completed: { type: Number },
  attempted: { type: Number },
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' }
});

const Boulder = mongoose.model('Boulder', boulderSchema);

export default Boulder;
