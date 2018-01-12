var auth = {};

var keyCloak = Keycloak();
keyCloak.init({ onLoad: 'login-required' }).success( function () {
    console.log('Login-required complete');
    auth.loggedIn = true;
    auth.authz = keyCloak;
    auth.logoutUrl = keyCloak.authServerUrl + "/realms/" + keyCloak.realm + "/protocol/openid-connect/logout?redirect_uri=http://ec2-54-87-196-13.compute-1.amazonaws.com/index.html";
});


var logout = function(){
    auth.loggedIn = false;
    auth.authz = null;
    window.location = auth.logoutUrl;
};
