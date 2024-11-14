import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import AuthLayout from '../../Layout/AuthLayout';
import { get, post } from '../../Helpers/Axios';
import { useAuth } from '../../Context/AuthContext';
import MemberPage from './MemberPage';

const roles = [
  { value: 'Member', label: 'Member' },
  { value: 'State Secretary', label: 'State Secretary' },
  { value: 'Vice President', label: 'Vice President' },
  { value: 'District President', label: 'District President' },
  { value: 'State Coordinator', label: 'State Coordinator' },
  { value: 'Division Coordinator', label: 'Division Coordinator' },
  { value: 'District Coordinator', label: 'District Coordinator' },

  // Add more roles as needed
];

const MembersManagement = () => {
  const [members, setMembers] = useState();
  const [loading, setLoading] = useState(true); // State to track loading status

  const { state } = useAuth();
  const { user,token } = state;

  const [editMember, setEditMember] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { control, register, handleSubmit, reset, setValue,watch  } = useForm({
    defaultValues: {
      entity_id:user?.entityMember.entity_id,
      name: '',
      email: '',
      phone: '',
      role: '',
      status: 'active',
      start_date: '',
      end_date: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip_code: '',
      },
    },
  });


  const[selectedMember,setSelectedMember]=useState(false)

  const getData=async()=>{     setLoading(true);

    let response=await get(`/api/entity-member/${user.entityMember.entity_id}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if(response.status==200){
      let data=response.data.data;
      // Check if data is an object
        if (typeof data === 'object' && !Array.isArray(data)) {
          // Convert to array if it's a single object
          data = [data];
        }

      console.log({data})
      setMembers(data);
      setLoading(false);

    }
  }

  useEffect(()=>{
    getData();
  },[])

  console.log('members',members);

  const handleAddOrUpdate = async(data) =>{ setLoading(true);
    let response=await post('/api/entity-member',data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log({response});
    reset();
    getData();
    setShowForm(false);
  };

  const handleEdit = (member) => {
    setEditMember(member);
    reset(member);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };


  const zipCode = watch('address.zip_code');

  // Autofill logic with actual API call
  useEffect(() => {
    if (zipCode && zipCode.length === 6) {
      const fetchAddressDetails = async () => {
        try {
          const response = await fetch(`https://api.postalpincode.in/pincode/${zipCode}`);
          if (!response.ok) {
            throw new Error('Invalid Zip Code');
          }
          const responseData = await response.json();
          if (responseData && responseData[0] && responseData[0].PostOffice) {
            const city = responseData[0].PostOffice[0].District;
            const state = responseData[0].PostOffice[0].State;
         

          // Set the values for city and state
          setValue('address.city', city);
          setValue('address.state', state);
          }
        } catch (error) {
          console.error('Error fetching address details:', error);
        }
      };

      fetchAddressDetails();
    }
  }, [zipCode, setValue]);



  return (
    <AuthLayout userType={'President'}>
    
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader">Please wait ...</div> 
        </div>
      ) : (
        <>
       {!selectedMember?<>
        <div className="max-w-7xl mx-auto p-2 sm:p-6 bg-gray-100 rounded-lg shadow-md mt-16  mb-16 sm:mb-0 sm:mt-2">
        <div className="flex flex-row md:flex-row justify-between items-center mb-6">
          <h2 className="text-lg sm:text-3xl font-bold text-gray-800 mb-4 md:mb-0 animate-fadeIn">Members</h2>
          <button
            onClick={() => {
              setEditMember(null);
              reset();
              setShowForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-full flex items-center hover:bg-blue-700 transition-all transform hover:scale-105 animate-fadeIn"
          >
            <FaUserPlus className="mr-2 animate-bounce" /> Add
          </button>
        </div>

        {/* Conditionally Render Member Form */}
        {showForm && (
          <form onSubmit={handleSubmit(handleAddOrUpdate)} className="bg-white p-6 rounded-lg shadow-sm mb-16 sm:mb-8 space-y-6 animate-slideInUp">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 text-left">Name</label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: true })}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter member's name"
                />
              </div>
              <div className='hidden'>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700 text-left">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register('email', { required: false })}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter member's email"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-lg font-medium text-gray-700 text-left">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', { required: true })}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter member's phone number"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-lg font-medium text-gray-700 text-left">Role</label>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={roles}
                      placeholder="Select role"
                      className="mt-1 text-left"
                      classNamePrefix="select"
                      value={roles.find((option) => option.value === field.value)} // Ensure the selected value is displayed
                      onChange={(selectedOption) => field.onChange(selectedOption.value)}
                    />
                  )}
                />

                
              </div>
              <div>
                <label htmlFor="status" className="block text-lg font-medium text-gray-700 text-left">Status</label>
                <select
                  id="status"
                  {...register('status', { required: true })}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
             
              <div>
                <label className="block text-lg font-medium text-gray-700 text-left">Address</label>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    {...register('address.street')}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Street"
                  />
                   <input
                    type="text"
                    {...register('address.zip_code')}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ZIP Code"
                  />
                  <input
                    type="text"
                    {...register('address.city')}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    {...register('address.state')}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="State"
                  />
                 
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-end space-x-0 md:space-x-4 space-y-2 sm:space-y-0">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all transform hover:scale-105"
                >
                  {editMember ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Members List */}
        {!showForm&& <div className="space-y-6">
          {members&&members?.length > 0 ? (
            members.map((member) => (
              <div key={member.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"onClick={()=>setSelectedMember(member)}>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold">{member?.user.name}</h3>
                  <p className="text-gray-600 hidden">{member.email}</p>
                  <p className="text-gray-600 hidden">{member.phone}</p>
                  <p className="text-gray-600 text-xs">{member.role}</p>
                  <p className="text-gray-600 hidden">{member.status}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(member)}
                    className="text-blue-600 hover:text-blue-700 transition-all transform hover:scale-105"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="text-red-600 hover:text-red-700 transition-all transform hover:scale-105"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No members available</p>
          )}
        </div>}
      </div>
       </>:<>
       <MemberPage member={selectedMember} /></>}

       </>)}
    </AuthLayout>
  );
};

export default MembersManagement;
