import React from 'react';
import ProfileContainer from '../components/profile/ProfileContainer';
import Button from '../components/common/Button';

function Profile() {
  function logout() {
    fetch('/api/user/logout');
  }

  return (
    <div>
      <ProfileContainer />
      <a href="/">
        <Button
          buttonText="Logout"
          buttonAction={logout}
          classNames="social-button"
        />
      </a>
    </div>
  );
}

export default Profile;
