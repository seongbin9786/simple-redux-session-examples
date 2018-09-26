import React from 'react';
import CenterChild from '../elements/CenterChild';

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
            <CenterChild>
                <div>
                    ID: <input style={{ minWidth: 100 }} value={getValue('id')} onChange={handleInputChange('id')} />
                    <br />
                    PW: <input style={{ minWidth: 100 }} value={getValue('pw')} onChange={handleInputChange('pw')} />
                    <br />
                    <button onClick={handleLocalLogin}>Local 계정으로 로그인하기</button>
                </div>
            </CenterChild>
            <br />
            <CenterChild>
                <button onClick={handleSocialLogin('FB')}>페이스북 계정으로 로그인하기</button>
                <button onClick={handleSocialLogin('NAVER')}>네이버 계정으로 로그인하기</button>
            </CenterChild>
        </React.Fragment>
    );
}

export default LoginMenu;