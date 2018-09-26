const FACEBOOK = 'FB';
const NAVER = 'NAVER';

class SocialLoginPreProcessor {
    constructor() {
        this._mapping = new Map();
        this._mapping.set(FACEBOOK, this.processFacebook);
        this._mapping.set(NAVER, this.processNaver);
    }

    getFuncByType = (type) => this._mapping.get(type);

    preProcess = (type, userID, socialAccessToken) => {
        const socialLoginProcessFunc = this.getFuncByType(type);
        if (socialLoginProcessFunc) {
            return socialLoginProcessFunc(userID, socialAccessToken);
        }
        throw Error('지원하지 않는 방식의 소셜 로그인입니다.');
    }

    processFacebook = () => new Promise(resolve => {
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

    processNaver = () => new Promise(resolve => {
        const { loginStatus } = window.naverLogin;
        console.log('processNaver - loginStatus:', loginStatus);

        if (loginStatus.status) { // 로그인돼있음
            const { naverUser: { id: userID }, accessToken: { accessToken } } = loginStatus;

            resolve({ userID, accessToken });
        } else {
            loginStatus.reprompt();
        }
    });
}

export default new SocialLoginPreProcessor();