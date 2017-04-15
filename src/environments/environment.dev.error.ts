export const environment = {
  production: false,
  api:{
      login:{
          method : "get",
          url : "../assets/mock/login_error.json"
      },
      register:{
          method : "get",
          url : "../assets/mock/register_error.json"
      },
      subscribe:{
          method : "get",
          url : "../assets/mock/subscribe_error.json"
      }
  }
};
