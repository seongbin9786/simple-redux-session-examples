import React from 'react';
import { connect } from 'react-redux';

import { loginWithSocial } from '../modules/SessionActions'

const NaverLoginCallbackPage = ({ loginWithSocial, history }) => {

    // 해당 페이지로 REDIRECT된 후, getLoginStatus를 호출하지 않으면
    // window.naverLogin.loginStatus.status가 계속 false이다.
    // 따라서 이 곳에서 콜백 함수 호출 이후,
    // Action을 발생시킨 후 메인 페이지로 이동한다.
    window.naverLogin.getLoginStatus(() => {

        console.log(loginWithSocial);
        
        loginWithSocial('NAVER');

        history.push('/');
    });

    // 보여줄 요소 하나도 없음
    return <React.Fragment />;
}

const mapDispatchToProps = {
    loginWithSocial
};

export default connect(null, mapDispatchToProps)(NaverLoginCallbackPage);