const FACEBOOK = 'FB';
const NAVER = 'NAVER';
const KAKAO = 'KAKAO';

class SocialSessionPreProcessor {
    constructor() {
        this._loginMapping = new Map();
        this._loginMapping.set(FACEBOOK, this.loginFacebook);
        this._loginMapping.set(NAVER, this.loginNaver);
        this._loginMapping.set(KAKAO, this.loginKakao);
        
        this._logoutMapping = new Map();
        this._logoutMapping.set(NAVER, this.logoutNaver);
        this._logoutMapping.set(KAKAO, this.logoutKakao);
    }

    getLoginFuncByType = type => this._loginMapping.get(type);

    getLogoutFuncByType = type => this._logoutMapping.get(type);

    preProcessLogin = type => {
        const socialLoginProcessFunc = this.getLoginFuncByType(type);
        if (socialLoginProcessFunc) {
            return socialLoginProcessFunc();
        }
        throw Error('지원하지 않는 방식의 소셜 로그인입니다.');
    }

    preProcessLogout = type => {
        const socialLogoutProcessFunc = this.getLoginFuncByType(type);
        if (socialLogoutProcessFunc) {
            return socialLogoutProcessFunc();
        }
        throw Error('지원하지 않는 방식의 소셜 로그아웃입니다.');
    }

    loginFacebook = () => new Promise(resolve => {
        let authResponse;

        // 'connected' - 이미 로그인했음.
        // 'authorization_expired' - 예전에 로그인한 적이 있지만 다시 인증해야 함.
        // 'not_authorized' - 페이스북에 로그인되어 있지만 내 앱은 아님.
        // 그 외 - 페이스북에 로그인되어 있지 않음.
        window.FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                console.log(response);
                authResponse = response.authResponse;
            } else {
                window.FB.login(loginResponse => {
                    console.log(loginResponse);
                    authResponse = loginResponse.authResponse
                });
            }

            const { userID, accessToken } = authResponse;
            resolve({ userID, accessToken });
        });
    });

    loginNaver = () => new Promise(resolve => {
        const { loginStatus } = window.naverLogin;
        console.log('processNaver - loginStatus:', loginStatus);

        if (loginStatus.status) { // 로그인돼있음
            const { naverUser: { id: userID }, accessToken: { accessToken } } = loginStatus;

            resolve({ userID, accessToken });
        } else {
            window.naverLogin.reprompt();
        }
    });

    loginKakao = () => new Promise(resolve => {
        window.Kakao.Auth.getStatus(status => {
            const accessToken = window.Kakao.Auth.getAccessToken();
            console.log('KAKAO - accessToken:', accessToken);

            if (status !== "not_connected" && accessToken !== null && accessToken !== undefined) {
                const userID = -1; // 없음
                resolve({ userID, accessToken });
            } else {
                window.Kakao.Auth.login(res => console.log('success: ', res), error => console.log('login error:', error));
            }
        });
    });
    

    logoutNaver = () => window.naverLogin.logout();

    logoutKakao = () => window.Kakao.Auth.logout();
}

export default new SocialSessionPreProcessor();