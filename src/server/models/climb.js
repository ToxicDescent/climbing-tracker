import mongoose from 'mongoose';

const climbSchema = new mongoose.Schema({
  grade: { type: String, required: true },
  flashed: { type: Number },
  completed: { type: Number },
  attempted: { type: Number },
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' }
});

const Climb = mongoose.model('Climb', climbSchema);

export default Climb;
