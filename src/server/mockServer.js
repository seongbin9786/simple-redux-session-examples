class mockServer {
    localLogin = (id, pw) => new Promise(resolve => {

        const response = {
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTM5MjM5MDIyLCJ0eXBlIjoiYWNjZXNzIn0.qkL-JNtKyiGcZffi7lRw1HY2lMdijQBM6jIQhA8UL5o",
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTQwMzQ5MDIyLCJ0eXBlIjoicmVmcmVzaCJ9.nEb1Wkqjuuq0-T0Ci5OiU_vep4MspiUJZhqj1Mq-D-U",
            userInfo: {
                id: 1,
                name: "사용자"
            }
        };
    
        // 1초후 response 보냄
        setTimeout(() => resolve(response),  1000);
    });
    
    socialLogin = userObject => new Promise(resolve => {
    
        const response = {
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTM5MjM5MDIyLCJ0eXBlIjoiYWNjZXNzIn0.qkL-JNtKyiGcZffi7lRw1HY2lMdijQBM6jIQhA8UL5o",
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTQwMzQ5MDIyLCJ0eXBlIjoicmVmcmVzaCJ9.nEb1Wkqjuuq0-T0Ci5OiU_vep4MspiUJZhqj1Mq-D-U",
            userInfo: {
                id: userObject.userID,
                name: "사용자"
            }
        };
    
        // 1초후 response 보냄
        setTimeout(() => resolve(response),  1000);
    });
}
 
export default new mockServer();