import axios from 'axios';


//We are using AXIOS to manage API calls.
//This is where we are going to configure the default values of the API.
let Api = axios.create({
       baseURL: 'https://api-dot-present-staging.appspot.com/api',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
    });

export default Api;
