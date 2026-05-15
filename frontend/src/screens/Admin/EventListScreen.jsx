import React from 'react';
import './EventListScreen.css';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  useGetEventsQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
} from '../../slices/eventsApiSlice';

const EventListScreen = () => {
  const { data: events, isLoading, error, refetch } = useGetEventsQuery();

  const [createEvent, { isLoading: loadingCreate }] = useCreateEventMutation();
  const [deleteEvent, { isLoading: loadingDelete }] = useDeleteEventMutation();

  const createHandler = async () => {
    if (window.confirm('Create a new event?')) {
      try {
        await createEvent().unwrap();
        refetch();
        toast.success('Event created — click Edit to fill in the details');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Delete this event?')) {
      try {
        await deleteEvent(id).unwrap();
        refetch();
        toast.success('Event deleted');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <section className='event-admin'>
      <h1 className='event-admin-title'>Events</h1>
      <button className='event-admin-create-btn' onClick={createHandler}>
        <FaPlus /> Create Event
      </button>

      {(loadingCreate || loadingDelete) && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='warning'>{error?.data?.message || error.error}</Message>
      ) : (
        <table className='event-admin-table'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>LOCATION</th>
              <th>DATES</th>
              <th>ACTIVE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{event.location}</td>
                <td>
                  {event.dates.map((d, i) => (
                    <span key={i} className='event-admin-date-tag'>
                      {d.day} {d.date}
                    </span>
                  ))}
                </td>
                <td>
                  <span className={`event-admin-badge ${event.active ? 'event-admin-badge--on' : 'event-admin-badge--off'}`}>
                    {event.active ? 'Visible' : 'Hidden'}
                  </span>
                </td>
                <td className='event-admin-actions'>
                  <Link to={`/admin/event/${event._id}/edit`}>
                    <button className='event-admin-edit-btn'><FaEdit /></button>
                  </Link>
                  <button
                    className='event-admin-delete-btn'
                    onClick={() => deleteHandler(event._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default EventListScreen;
