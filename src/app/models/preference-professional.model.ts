export class PreferenceProfessional {
  constructor(
    public ageRange: any,
    public gender: any,
    public location: any,
    public feesRange: any
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
  this.feesRange= {
    "min": "1",
    "max": "25"
  };
  }
}

