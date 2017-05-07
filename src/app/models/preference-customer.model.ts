export class PreferenceCustomer {
  constructor(
    public ageRange: any,
    public gender: any,
    public location: any
  ) {  
    this.location={
      "address" : "",
      "longitude" : "",
      "latitude" : ""
    };
	this.gender=[];
  this.ageRange= {
    "min": "0",
    "max": "0"
  };
  }
}

