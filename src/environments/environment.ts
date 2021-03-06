// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api:{
      login:{
          method : "get",
          url : "../assets/mock/login_success.json"
      },
      register:{
          method : "get",
          url : "../assets/mock/register_success.json"
      },
      subscribe:{
          method : "get",
          url : "../assets/mock/subscribe_success.json"
      },
      profileView:{
          method : "get",
          url : "../assets/mock/profile_view_success.json"
      },
      profileEdit:{
          method : "get",
          url : "../assets/mock/edit_professional_success.json"
      },
      photoUpload:{
          method : "get",
          url : "../assets/mock/profile_view_success.json"
      }
      ,
      preferenceEdit:{
          method : "get",
          url : "../assets/mock/profile_view_success.json"
      },
      servicesList:{
          method : "get",
          url : "../assets/mock/services_list_success.json"
      }
  }
};
