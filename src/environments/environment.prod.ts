export const environment = {
  production: true,
  googleApiKey: 'AIzaSyAsCcoI2j6T92d8DtgUPARUkN7zEE1iaRk',

  tokenWhitelistedDomains: [ new RegExp('192.168.0.10:8080') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
