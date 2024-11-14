import React, { useEffect, useState } from 'react';
import ActivityItem from './ActivityItem';
import ActivityForm from './ActivityForm';
import AuthLayout from '../../Layout/AuthLayout';
import ConfirmationModal from './ConfirmationModal';
import { useAuth } from '../../Context/AuthContext';
import { get } from '../../Helpers/Axios';

function Index() {
  const [activities, setActivities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);
  const { state } = useAuth();
  const { user,token } = state;
  const[data,setData]=useState([]);  

  const getData=async()=>{ 
      let response= await get(`/api/posts/postable/${user.id}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

    
      if(response.status==200){
        setData(response.data);
        console.log({response})
      }
  }

  useEffect(()=>{
       getData();
  },[])


  const handleSaveActivity = (activity) => {
    if (isEditing) {
      setActivities((prevActivities) =>
        prevActivities.map((a) => (a.id === activity.id ? activity : a))
      );
      setIsEditing(false);
    } else {
      setActivities([...activities, { ...activity, id: Date.now() }]);
    }
    getData();
    setEditingActivity(null);
    setShowForm(false);
  };

  const handleEditActivity = (activity) => {
    setIsEditing(true);
    setEditingActivity(activity);
    setShowForm(true);
  };

  const handleDeleteActivity = () => {
    setActivities(activities.filter((activity) => activity.id !== activityToDelete.id));
    setShowModal(false);
  };

  const confirmDeleteActivity = (activity) => {
    setShowModal(true);
    setActivityToDelete(activity);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingActivity(null);
    setShowForm(false);
  }; 

  return (
    <AuthLayout userType={'user'}>
      <div className="max-w-7xl mx-auto  py-8 mt-12 sm:mt-6 sm:p-8">
        {/* Header Section */}
        <header className="mb-12 flex flex-row justify-between items-center">
          <h2 className="text-xl font-extrabold text-gray-900">Manage Activities</h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
            >
              + Add 
            </button>
          )}
        </header>

        {/* Activity Form */}
        {showForm && (
          <div className="mb-12">
            <ActivityForm
              initialData={editingActivity}
              onSave={handleSaveActivity}
              onCancel={handleCancelEdit}
            />
          </div>
        )}

        {/* Activity Items */}
        <section>
          {!showForm && data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1">
              {data?.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  activity={activity
                  }
                  onEdit={handleEditActivity}
                  onDelete={() => confirmDeleteActivity(activity)}
                />
              ))}
            </div>
          ) : (
            !showForm && (
              <p className="text-center text-gray-500 text-xl">
                No activities yet. Click "Add Activity" to start.
              </p>
            )
          )}
        </section>

        {/* Confirmation Modal */}
        {showModal && (
          <ConfirmationModal
            onConfirm={handleDeleteActivity}
            onCancel={() => setShowModal(false)}
            message={`Are you sure you want to delete the activity titled "${activityToDelete?.title}"?`}
          />
        )}
      </div>
    </AuthLayout>
  );
}

export default Index;
