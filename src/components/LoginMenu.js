import React from 'react';

/**
 * 로그인 메뉴를 표시하는 컴포넌트이다.
 * 
 * @param {function} handleLocalLogin Id, Pw를 입력하여 로그인 하는 것을 처리하는 함수
 * @param {function} handleSocialLogin 소셜 로그인 처리하는 함수
 * @param {function} handleInputChange Input 입력 값의 state 반영을 처리하는 함수
 * @param {function} getValue Input 입력 값을 반환하는 함수
 */
const LoginMenu = ({ 
    handleLocalLogin, 
    handleSocialLogin,
    handleInputChange,
    getValue
}) => {
    return (
        <React.Fragment>
            <br />
            ID: <input value={getValue('id')} onChange={handleInputChange('id')} />
            <br />
            PW: <input value={getValue('pw')} onChange={handleInputChange('pw')} />
            <br />
            <button onClick={handleLocalLogin}>Local 계정으로 로그인하기</button>
            <br />
            <button onClick={handleSocialLogin}>Social 계정으로 로그인하기</button>
        </React.Fragment>
    );
}
 
export default LoginMenu;