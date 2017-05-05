export class EditCustomer {
  constructor(
    public nickname: string,
    public genderType: string,
    public about: string,
    public location: any
  ) {  
    this.location={
      "address" : "",
      "longitude" : "",
      "latitude" : ""
    };
  }
}

