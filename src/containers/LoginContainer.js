import React, { Component } from 'react';
import UserProfile from '../components/UserProfile';
import LoginMenu from '../components/LoginMenu';
import { connect } from 'react-redux';
import {
    getUserInfo,
    getUserLoggedIn,
    loginWithIdAndPw,
    loginWithSocial

} from '../modules/Session';

class LoginContainer extends Component {
    state = {
        id: '',
        pw: '',        
    };

    handleInputChange = name => ({ target: { value }}) => this.setState({ [name]: value });

    getValue = name => this.state[name];

    handleLocalLogin = () => {
        const { id, pw } = this.state;
        const { loginWithIdAndPw } = this.props;

        loginWithIdAndPw(id, pw);
    }

    handleSocialLogin = f => f;

    render() {
        const { userInfo, isLoggedIn } = this.props;
        
        return isLoggedIn ? <UserProfile userInfo={userInfo} /> : <LoginMenu 
            handleLocalLogin={this.handleLocalLogin}
            handleSocialLogin={this.handleSocialLogin}
            handleInputChange={this.handleInputChange}
            getValue={this.getValue}
        />;
    }
}

// Plain Object로 반환이 왜 안되는거지?
const mapStateToProps = ({ session }) => ({
   userInfo: getUserInfo(session),
   isLoggedIn: getUserLoggedIn(session)
});

// Return as Plain Object
const mapDispatchToProps = {
    loginWithIdAndPw,
    loginWithSocial
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);