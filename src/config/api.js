const isProduction = process.env.REACT_APP_ENVIRONMENT === 'production';

const localApiConfig = {
    baseUrl: 'http://localhost:3000',
};
const prodApiConfig = {
    baseUrl: 'https://user-generated-content-service.vercel.app',
};
// console.log(process.env.REACT_APP_ENVIRONMENT);

let apiConfig = localApiConfig;
if (isProduction) {
    apiConfig = prodApiConfig;
}

export { apiConfig };