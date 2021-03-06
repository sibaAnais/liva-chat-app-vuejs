export function authHeader() {
  // return authorization header with jwt token
  let vuex = JSON.parse(localStorage.getItem('vuex'));
  if (vuex.chat && vuex.chat.chat.token) {
    return { 'Authorization': 'Bearer ' + vuex.chat.chat.token };
  } else {
    return {};
  }
}

export function adminHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token };
  } else {
    return {};
  }
}
