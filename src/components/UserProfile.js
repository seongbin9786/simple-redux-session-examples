import React from 'react';
import CenterChild from '../elements/CenterChild';

const UserProfile = ({ userInfo: { id, name }, handleLogout }) => {
    return (
        <CenterChild>
            <span>{`${name}[${id}]님 환영합니다.`}</span>
            <button onClick={handleLogout}>로그아웃</button>
        </CenterChild>
    );
}

export default UserProfile;