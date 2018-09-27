import mockServer from '../server/mockServer';
import { sessionService } from 'redux-react-session';
import SocialSessionPreProcessor from '../utils/SocialSessionPreProcessor';

// Action Types
const REFRESH_TOKEN = 'kubooki/session/REFRESH_TOKEN';

// Action|Thunk Creators
/**
 * ID, PW로 로그인 시 사용할 Action이다.
 * Local 계정으로 로그인 시 사용한다.
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
        .catch(error => { throw Error('loginWithIdAndPw: ' + error); });
    });
};

/**
 * 클라이언트-사이드에서 가져온 엑세스 토큰으로 로그인 시 사용할 Action이다.
 * 네이버, 카카오, 페이스북 등의 Social 계정으로 로그인 시 사용한다.
 * Local 계정으로 로그인 시에는 `loginWithIdAndPw`를 사용한다.
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
        .catch(error => { throw Error('loginWithSocial: ' + error); });
    });
};

export const socialLogout = type => () => {
  SocialSessionPreProcessor.preRrocessLogout(type);
  _deleteSession();
};

export const logout = () => () => _deleteSession();

const _deleteSession = () => {
  sessionService.deleteSession();
  sessionService.deleteUser();
};

// Selectors
export const getUserInfo = ({ user: { userInfo } }) => userInfo;

export const getUserLoggedIn = ({ user: { userInfo } }) => userInfo !== undefined && userInfo !== null && !(Object.keys(userInfo).length === 0 && userInfo.constructor === Object);
