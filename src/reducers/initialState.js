var sessionStorage = window.sessionStorage;
export default {  
  session: typeof sessionStorage.deviceIdentityToken !=="undefined" && !! sessionStorage.deviceIdentityToken
}