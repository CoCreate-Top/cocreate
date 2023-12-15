// helper function to get google oauth url
// client_id pa redirect_uri sta v .env sam je angular shit pa noce met env fajla

function getGoogleOAuthURL() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: "http://localhost:8000/api/sessions/oauth/google",
      client_id: "525076490-52m6noqmec0fb2j27e01pr5gp27348ls.apps.googleusercontent.com",
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ].join(" ")
    };
  
    
    const qs = new URLSearchParams(options);
  
    return `${rootUrl}?${qs.toString()}`;
  }
  
  export default getGoogleOAuthURL;