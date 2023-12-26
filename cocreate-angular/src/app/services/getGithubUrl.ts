function getGithubUrl() {
  const rootUrl = 'https://github.com/login/oauth/authorize';

  const options = {
    client_id: '14e67eed23a86c0be7ef',
    redirect_uri: 'https://api.cocreate.top/api/auth/oauth/github',
    scope: 'user:email read:user', 
    state: 'za7oQzjbVT4udzTW4eTuKKzRamyxNWh5z43uLszojAMI7OiPToAErR908GFd725r', // TODO: store in .env
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

export default getGithubUrl;