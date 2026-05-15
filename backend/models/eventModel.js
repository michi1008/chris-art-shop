import mongoose from 'mongoose';

const dateBlockSchema = mongoose.Schema({
  day: { type: String, required: true },
  date: { type: String, required: true },
  hours: { type: String, required: true },
  highlights: [{ type: String }],
});

const eventSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    active: { type: Boolean, default: true },
    dates: [dateBlockSchema],
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
