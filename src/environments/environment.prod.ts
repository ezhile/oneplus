export const environment = {
  production: true,
  api:{
      login:{
          method : "post",
          url : "http://185.16.61.51:8082/api/login"
      },
      register:{
          method : "post",
          url : "http://185.16.61.51:8082/api/register"
      },
      subscribe:{
          method : "post",
          url : "http://185.16.61.51:8082/api/subscribe"
      },
      profileView:{
          method : "get",
          url : "http://185.16.61.51:8082/api/user/{uuid}"
      },
      profileEdit:{
          method : "put",
          url : "http://185.16.61.51:8082/api/user/{uuid}/profile"
      },
      photoUpload:{
          method : "post",
          url : "http://185.16.61.51:8082/api/user/{uuid}/profile/picture"
      },
      preferenceEdit:{
          method : "put",
          url : "http://185.16.61.51:8082/api/user/{uuid}/preference"
      },
      servicesList:{
          method : "get",
          url : "http://185.16.61.51:8082/api/metadata/service"
      }
      
  }
};
