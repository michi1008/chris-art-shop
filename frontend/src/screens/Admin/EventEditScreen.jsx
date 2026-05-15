import React, { useState, useEffect } from 'react';
import './EventEditScreen.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Resizer from 'react-image-file-resizer';
import {
  useGetEventDetailsQuery,
  useUpdateEventMutation,
} from '../../slices/eventsApiSlice';

const emptyDate = () => ({ day: '', date: '', hours: '', highlights: '' });

const EventEditScreen = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [active, setActive] = useState(false);
  const [dates, setDates] = useState([emptyDate()]);

  const { data: event, isLoading, error } = useGetEventDetailsQuery(eventId);
  const [updateEvent, { isLoading: loadingUpdate }] = useUpdateEventMutation();

  useEffect(() => {
    if (event) {
      setName(event.name);
      setLocation(event.location);
      setDescription(event.description);
      setImage(event.image || '');
      setActive(event.active);
      setDates(
        event.dates.length > 0
          ? event.dates.map((d) => ({
              day: d.day,
              date: d.date,
              hours: d.hours,
              highlights: d.highlights.join('\n'),
            }))
          : [emptyDate()]
      );
    }
  }, [event]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Resizer.imageFileResizer(
      file, 900, 500, 'JPEG', 85, 0,
      (uri) => setImage(uri),
      'base64'
    );
  };

  const updateDate = (index, field, value) => {
    setDates((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [field]: value } : d))
    );
  };

  const addDate = () => setDates((prev) => [...prev, emptyDate()]);

  const removeDate = (index) =>
    setDates((prev) => prev.filter((_, i) => i !== index));

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateEvent({
        eventId,
        name,
        location,
        description,
        image,
        active,
        dates: dates.map((d) => ({
          day: d.day,
          date: d.date,
          hours: d.hours,
          highlights: d.highlights
            .split('\n')
            .map((h) => h.trim())
            .filter(Boolean),
        })),
      }).unwrap();
      toast.success('Event updated');
      navigate('/admin/eventList');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='event-edit'>
      <Link to='/admin/eventList'>
        <button className='event-edit-back-btn'>← Back to Events</button>
      </Link>

      <div className='event-edit-content'>
        <h1>Edit Event</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='warning'>{error?.data?.message || error.error}</Message>
        ) : (
          <form className='event-edit-form' onSubmit={submitHandler}>

            <div className='event-edit-field'>
              <label htmlFor='name'>Event Name</label>
              <input
                id='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='e.g. Hill Country Art & Wine Festival'
              />
            </div>

            <div className='event-edit-field'>
              <label htmlFor='location'>Location</label>
              <input
                id='location'
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder='e.g. Boerne, TX'
              />
            </div>

            <div className='event-edit-field'>
              <label htmlFor='description'>Description</label>
              <textarea
                id='description'
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Short description of the event'
              />
            </div>

            <div className='event-edit-field'>
              <label>Event Photo</label>
              {image && (
                <div className='event-edit-img-preview'>
                  <img src={image} alt='Event preview' />
                  <button
                    type='button'
                    className='event-edit-remove-img'
                    onClick={() => setImage('')}
                  >
                    Remove photo
                  </button>
                </div>
              )}
              <label className='event-edit-file-label' htmlFor='event-image'>
                {image ? 'Replace photo' : 'Choose photo'}
              </label>
              <input
                id='event-image'
                type='file'
                accept='image/*'
                className='event-edit-file-input'
                onChange={handleImage}
              />
              <p className='event-edit-hint'>JPG or PNG · will be resized automatically</p>
            </div>

            <div className='event-edit-toggle'>
              <input
                id='active'
                type='checkbox'
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
              <label htmlFor='active'>Show on Events page</label>
            </div>

            <hr className='event-edit-rule' />
            <p className='event-edit-section-label'>Date Blocks</p>

            {dates.map((d, i) => (
              <div className='event-edit-date-block' key={i}>
                <div className='event-edit-date-header'>
                  <span className='event-edit-date-num'>Day {i + 1}</span>
                  {dates.length > 1 && (
                    <button
                      type='button'
                      className='event-edit-remove-date'
                      onClick={() => removeDate(i)}
                    >
                      <FaTrash /> Remove
                    </button>
                  )}
                </div>

                <div className='event-edit-date-row'>
                  <div className='event-edit-field'>
                    <label>Day</label>
                    <input
                      type='text'
                      value={d.day}
                      onChange={(e) => updateDate(i, 'day', e.target.value)}
                      placeholder='e.g. Friday'
                    />
                  </div>
                  <div className='event-edit-field'>
                    <label>Date</label>
                    <input
                      type='text'
                      value={d.date}
                      onChange={(e) => updateDate(i, 'date', e.target.value)}
                      placeholder='e.g. May 22'
                    />
                  </div>
                  <div className='event-edit-field'>
                    <label>Hours</label>
                    <input
                      type='text'
                      value={d.hours}
                      onChange={(e) => updateDate(i, 'hours', e.target.value)}
                      placeholder='e.g. 4–8 PM'
                    />
                  </div>
                </div>

                <div className='event-edit-field'>
                  <label>
                    Highlights <span className='event-edit-hint'>one per line</span>
                  </label>
                  <textarea
                    rows={4}
                    value={d.highlights}
                    onChange={(e) => updateDate(i, 'highlights', e.target.value)}
                    placeholder={'Sip & Stroll\nArt Auction\nLive music'}
                  />
                </div>
              </div>
            ))}

            <button type='button' className='event-edit-add-date' onClick={addDate}>
              <FaPlus /> Add Another Day
            </button>

            <hr className='event-edit-rule' />

            <button type='submit' className='event-edit-save-btn'>
              Save Event
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventEditScreen;
