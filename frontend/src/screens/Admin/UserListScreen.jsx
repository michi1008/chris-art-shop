import React from 'react';
import './UserListScren.css';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserListScreen = () => {
    const {data: users, refetch, isLoading, error } = useGetUsersQuery();

    const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
    return (
      <div className='admin-userList' >
        <h1 className='admin-userList-title'>Users</h1>
        {isLoading ? (
          <Loader />
          ) : error ? (
          <Message variant='warning'>{error?.data?.message || 'Failed to load users'}</Message>
          ) : (
          <table className='user-list-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'var(--clr-green)' }} />
                  ) : (
                    <FaTimes style={{ color: 'var(--clr-red' }} />
                  )}
                </td>
                <td>
                {!user.isAdmin && (
                    <>
                      <Link
                        to={`/admin/user/${user._id}/edit`}
                      >
                        <button className='admin-userList-edit'>
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        className='admin-userList-delete'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: 'var(--clr-white' }}/>
                      </button>
                    </>
                  )}
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
    )
  }
  

export default UserListScreen