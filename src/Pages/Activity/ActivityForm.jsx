import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import { get, post } from '../../Helpers/Axios'; // Ensure the path is correct
import { useAuth } from '../../Context/AuthContext';

function ActivityForm({ initialData, onSave, onCancel, isEditing = false }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    media_url: '', // Updated state property name
    status: 'published',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { state } = useAuth();
  const { token } = state;

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isEditing) {
        // Update existing activity
        const response = await post(`/api/posts/${formData.id}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        onSave(response.data);
      } else {
        // Create new activity
        const response = await post('/api/posts', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        onSave(response.data);
      }
    } catch (error) {
      setError('An error occurred while saving the activity.');
      console.error('Error saving activity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label htmlFor="title" className="block text-lg font-medium text-gray-700 text-left">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          placeholder="Enter activity title..."
        />
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-lg font-medium text-gray-700 text-left">
          Content
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={6}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          placeholder="Enter detailed activity content..."
        />
      </div>

      <div className="mb-4">
        <label htmlFor="media_url" className="block text-lg font-medium text-gray-700 text-left">
          Media URL ( Social Media Link)
        </label>
        <input
          type="url"
          id="media_url" // Updated id
          value={formData.media_url} // Updated value
          onChange={handleChange}
          required
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          placeholder="https://example.com"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition-all"
        >
          <FaTimes className="mr-2" /> Cancel
        </button>
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : <><FaSave className="mr-2" /> {isEditing ? 'Update' : 'Save'}</>}
        </button>
      </div>
    </form>
  );
}

export default ActivityForm;
