import React from "react";

function ProfileHeader({ user }) {
  return (
    <>
      <div className="header">
        <p>{user.title}</p>
      </div>
    </>
  );
}

export default ProfileHeader;