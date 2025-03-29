import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { getUserProfile, updateUserProfile } from '../../../lib/api/users';
import { Button, Input } from '../../../components/ui';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const profileData = await getUserProfile(user.id);
      setProfile(profileData);
      setFormData({
        username: profileData.username,
        email: profileData.email,
        password: '',
      });
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(user.id, formData);
      fetchUserProfile();
    } catch (error) {
      console.error('Failed to update user profile:', error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Username</label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
};

export default ProfilePage;
