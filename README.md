# Simple-Redux-Session-Examples

React 환경에서 기본 로그인과 소셜 로그인을 `redux-react-session` 라이브러리를 적용하여 구현한 예제입니다.

## 구조

1. `LoginContainer[fire action]` -> `SessionActions[Action Creator + Selector]` -> `SocialSessionPreProcessor[social 작업]` -> `mockServer[가짜 백엔드 서버]` -> `LoginContainer[get info]` 순의 흐름을 갖게 됩니다.

2. Redux Store와 localStorage 관련 작업은 `session` 값을 관리하는 `sessionReducer`에서 담당합니다.

3. `index.html`에 소셜 로그인에 필요한 SDK를 불러오는 `<script>` 코드가 있습니다.

4. 나머지 구성 요소는 Presentational Component입니다.

### 페이스북 로그인 정리

1. 이미 로그인 된 경우에는 `window.FB.getLoginStatus`를 호출하고 Callback으로 정보를 받으면 됩니다.

2. 로그인하지 않은 경우에는 `window.FB.login`을 호출하고 Callback으로 정보를 받으면 됩니다. 이후에는 [1]의 방법으로 정보를 가져오면 됩니다.

### 네이버 로그인 정리

1. 이미 로그인 된 경우에는 `window.naverLogin.loginStatus`의 값을 읽으면 됩니다.

2. 로그인하지 않은 경우에는 `window.naverLogin.reprompt`를 호출하면 됩니다. Callback 방식이 아닌 Redirect 방식입니다. React-Router를 사용하여 QueryString을 직접 파싱해서 해결해야 합니다. 

3. 따라서 `/login/naver`의 `Route`를 만들고, 해당 Route에 표시되는 리액트 요소에서 `액션 호출` 및 메인 페이지로 `history.push`한다.

### 카카오 로그인 정리

1. 네이버와 다르고 Facebook과 유사한 방식의 API

2. 로그인 하지 않은 경우에는 `window.Kakao.Auth.login();`

3. 로그아웃 `window.Kakao.Auth.logout();`

4. 로그인 한 상태는 [5]와 [6]를 모두 체크해야 잘 작동하는 듯 함. (네이버의 경우와 마찬가지로 Status API를 호출하여야 토큰이 갱신되는 듯)

5. 현재 로그인 상태 가져오기 `window.Kakao.Auth.getStatus(status => console.log(status));`

6. Access Token 가져오기 `window.Kakao.Auth.getAccessToken();`