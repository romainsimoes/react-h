// AUTHENTIFICATION
export const UserAuthTokenPath = () => prependServerUrl('/auth/token');

const prependServerUrl = path => `https://localhost:4001/fr${path}`;
