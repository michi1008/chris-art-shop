import { apiSlice } from './apiSlice';

const EVENTS_URL = '/api/events';

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({ url: EVENTS_URL }),
      keepUnusedDataFor: 5,
    }),
    getEventDetails: builder.query({
      query: (id) => ({ url: `${EVENTS_URL}/${id}` }),
      keepUnusedDataFor: 5,
    }),
    createEvent: builder.mutation({
      query: () => ({ url: EVENTS_URL, method: 'POST' }),
    }),
    updateEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENTS_URL}/${data.eventId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Event'],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({ url: `${EVENTS_URL}/${id}`, method: 'DELETE' }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventDetailsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApiSlice;
