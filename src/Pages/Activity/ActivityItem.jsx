import React, { useState } from 'react';
import { FaEdit, FaTrash, FaLink, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function ActivityItem({ activity, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  // Helper function to determine if the URL is an image or YouTube video
  const renderMedia = () => {
   // const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
   const youtubeRegex = /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/))([a-zA-Z0-9_-]{11})/i;

   const url = activity.media_url;
   
   // Check if the URL matches the YouTube pattern
   const isYouTube = youtubeRegex.test(url);
   
   // Check if the URL is an image
   const isImage = /\.(jpg|jpeg|png|gif|bmp)$/i.test(url);

    if (isYouTube) {
      const videoId = activity.media_url.match(youtubeRegex)[1];
      return (
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video"
          />
        </div>
      );
    }

    if (isImage) {
      return (
        <img
          src={activity.media_url}
          alt="Activity media"
          className="w-full h-auto rounded-lg shadow-lg mb-4"
        />
      );
    }

    // Fallback for other URLs
    return (
      <a
        href={activity.media_url}
        className="text-blue-500 underline flex items-center mb-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLink className="mr-2" /> {activity.media_url}
      </a>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-2 mb-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between cursor-pointer" onClick={toggleDetails}>
        <h3 className="text-lg font-semibold text-gray-800">
          {activity.title}
        </h3>
        <span className="text-gray-500">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      {isExpanded && (
        <div className="mt-4">
          <p className="text-gray-700 mb-4 text-left">{activity.content}</p>
          {activity.media_url && renderMedia()}
          <div className="flex justify-end">
            <button
              onClick={() => onEdit(activity)}
              className="mr-3 flex items-center px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all"
            >
              <FaEdit className="mr-2" />
            </button>
            <button
              onClick={() => onDelete(activity)}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
            >
              <FaTrash className="mr-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityItem;
