export class PreferenceProfessional {
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
    "min": "1",
    "max": "25"
  };
  }
}

