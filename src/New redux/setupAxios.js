export default function setupAxios(axios, store) {


  axios.interceptors.request.use(
    config => {
      const {auth: {authToken,user}} = store.getState();
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;        
      }
      ;
      if(user && user.branch){
        config.headers["branchid"] = user.branch._id;
      }

      // config.baseURL = 'http://192.168.1.12:4000';
      config.baseURL = 'http://127.0.0.1:4000';

      return config;
    },
    err => Promise.reject(err)
  );

  axios.interceptors.response.use(function (response) {    
    return response;
  }, function (error) {
        ;
      console.log(error)
      if(error.response  &&error.response.status === 401)
      window.location.href = "/logout";
    return Promise.reject(error);
  });
}
