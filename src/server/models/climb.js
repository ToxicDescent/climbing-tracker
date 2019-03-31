import mongoose from 'mongoose';

const climbSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true
  },
  status: {
    flashed: {
      type: Number,
      required: true
    },
    completed: {
      type: Number,
      required: true
    },
    attempted: {
      type: Number,
      required: true
    }
  },
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' }
});

const Climb = mongoose.model('Climb', climbSchema);

export default Climb;
