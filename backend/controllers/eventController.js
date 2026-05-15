import asyncHandler from '../middleware/asyncHandler.js';
import Event from '../models/eventModel.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).sort({ createdAt: -1 });
  res.json(events);
});

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Private/Admin
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Create event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const event = new Event({
    name: 'New Event',
    location: 'Location, TX',
    description: 'Event description',
    active: false,
    dates: [],
  });
  const created = await event.save();
  res.status(201).json(created);
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const { name, location, description, image, active, dates } = req.body;
  const event = await Event.findById(req.params.id);
  if (event) {
    event.name = name ?? event.name;
    event.location = location ?? event.location;
    event.description = description ?? event.description;
    event.image = image ?? event.image;
    event.active = active ?? event.active;
    event.dates = dates ?? event.dates;
    const updated = await event.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    await Event.deleteOne({ _id: event._id });
    res.json({ message: 'Event removed' });
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

export { getEvents, getEventById, createEvent, updateEvent, deleteEvent };
