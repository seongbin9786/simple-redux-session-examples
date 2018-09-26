import mockServer from '../server/mockServer';
import { sessionService } from 'redux-react-session';
import SocialSessionPreProcessor from '../utils/SocialSessionPreProcessor';

// Action Types
const REFRESH_TOKEN = 'kubooki/session/REFRESH_TOKEN';
const SAVE_SESSION = 'kubooki/session/SAVE_SESSION';
// Load는 redux-react-session에서 자동으로 하게 된다.
// Load 시 Validate는 직접 해야 한다. 단 이 작업은 Util 함수로 충분하다. (Action - Reducer까지 갈 이유가 없음)

// Action|Thunk Creators
/**
 * ID, PW로 로그인 시 사용할 Action이다.
 * 거북이 Local 계정으로 로그인 시 사용한다.
 * 소셜 로그인의 경우 `loginWithSocial`을 import하여 사용해야 한다.
 * 
 * @param {string} id 아이디
 * @param {string} pw 비밀번호
 */
export const loginWithIdAndPw = (id, pw) => () => {
  mockServer.localLogin(id, pw)
    .then(response => {
      sessionService.saveSession(response)
        .then(() => sessionService.saveUser(response))
        .catch(error => { throw Error("loginWithIdAndPw: " + error) });
    });
};

/**
 * 클라이언트-사이드에서 가져온 엑세스 토큰으로 로그인 시 사용할 Action이다.
 * 네이버, 카카오, 페이스북r   등의 Social 계정으로 로그인 시 사용한다.
 * 거북이 Local 계정으로 로그인 시에는 `loginWithIdAndPw`를 사용한다.
 * 
 * @param {string} socialAccessToken 소셜 계정 엑세스 토큰
 */
export const loginWithSocial = (type) => () => {

  // process 과정 필요
  SocialSessionPreProcessor.preProcessLogin(type)
    .then(userObject => mockServer.socialLogin(userObject))
    .then(response => {
      sessionService.saveSession(response)
        .then(() => sessionService.saveUser(response))
        .catch(error => { throw Error("loginWithSocial: " + error) });
    });
};

export const socialLogout = type => () => {
  SocialSessionPreProcessor.preRrocessLogout(type);
  _deleteSession();
}


export const logout = () => () => _deleteSession();

const _deleteSession = () => {
  sessionService.deleteSession();
  sessionService.deleteUser();
}

/**
 * Refresh Token을 사용하여 서버로부터 새 Access Token과 Refresh Token을 받아온다.
 * 
 * 1. Access Token과 함께 Refresh Token도 만료 기간이 연장된다.
 * 2. 기존에 사용하던 refresh Token은 제거한다.
 * 3. localStorage에도 반영해야 한다.
 * 
 * @param {string} refreshToken 사용자가 발급받은 Refresh Token
 */
export const refreshToken = refreshToken => ({
  type: REFRESH_TOKEN,
  payload: refreshToken
});

/**
 * 서버로부터 받아온 Token과 사용자 정보를 클라이언트-사이드 세션에 저장한다.
 * 세션의 저장소는 기본적으로 localstorage를 사용한다.
 * 
 * @param {string} accessToken Access Token
 * @param {string} refreshToken Refresh Token
 * @param {object} userInfo 사용자 정보
 */
export const saveSession = (accessToken, refreshToken, userInfo) => ({
  type: SAVE_SESSION,
  payload: {
    accessToken,
    refreshToken,
    userInfo
  }
});

// Selectors
export const getUserInfo = ({ user: { userInfo } }) => userInfo;

export const getUserLoggedIn = ({ user: { userInfo } }) => userInfo !== undefined && userInfo !== null && !(Object.keys(userInfo).length === 0 && userInfo.constructor === Object);
