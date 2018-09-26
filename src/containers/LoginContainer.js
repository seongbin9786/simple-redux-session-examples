import React, { Component } from 'react';
import UserProfile from '../components/UserProfile';
import LoginMenu from '../components/LoginMenu';
import { connect } from 'react-redux';
import {
    getUserInfo,
    getUserLoggedIn,
    loginWithIdAndPw,
    loginWithSocial,
    logout,
    socialLogout
} from '../modules/SessionActions';

class LoginContainer extends Component {
    state = {
        id: '',
        pw: '',
    };

    handleInputChange = name => ({ target: { value } }) => this.setState({ [name]: value });

    getValue = name => this.state[name];

    handleLocalLogin = () => {
        const { id, pw } = this.state;
        const { loginWithIdAndPw } = this.props;

        loginWithIdAndPw(id, pw);
    }

    handleSocialLogin = type => () => this.props.loginWithSocial(type);

    handleSocialLogout = type => () => this.props.socialLogout(type);

    handleLogout = () => this.props.logout();

    render() {
        const { userInfo, isLoggedIn } = this.props;

        return isLoggedIn ?
            <UserProfile userInfo={userInfo} handleLogout={this.handleLogout} />
            :
            <LoginMenu
                handleLocalLogin={this.handleLocalLogin}
                handleSocialLogin={this.handleSocialLogin}
                handleInputChange={this.handleInputChange}
                getValue={this.getValue}
            />;
    }
}

const mapStateToProps = ({ session }) => ({
    userInfo: getUserInfo(session),
    isLoggedIn: getUserLoggedIn(session)
});

const mapDispatchToProps = {
    loginWithIdAndPw,
    loginWithSocial,
    logout,
    socialLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);