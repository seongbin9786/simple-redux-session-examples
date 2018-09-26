import React from 'react';

const UserProfile = ({ name }) => {
    return (
        <div>
            <div>{`${name}님 환영합니다.`}</div>
        </div>
    );
}
 
export default UserProfile;