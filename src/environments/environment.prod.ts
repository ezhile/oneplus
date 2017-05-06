export const environment = {
  production: true,
  api:{
      login:{
          method : "post",
          url : "http://46.38.242.27:8082/api/login"
      },
      register:{
          method : "post",
          url : "http://46.38.242.27:8082/api/register"
      },
      subscribe:{
          method : "post",
          url : "http://46.38.242.27:8082/api/subscribe"
      },
      profileView:{
          method : "get",
          url : "../assets/mock/profile_view_success.json"
      },
      profileEdit:{
          method : "post",
          url : "http://46.38.242.27:8082/api/user/profile"
      },
      photoUpload:{
          method : "post",
          url : "http://46.38.242.27:8082/api/user/{uuid}/profile/picture"
      }
  }
};
