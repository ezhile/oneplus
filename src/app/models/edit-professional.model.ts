export class EditProfessional {
  constructor(
    public nickname: string,
    public genderShow: boolean,
    public about: string,
    public serviceList: any,
    public location: any,
    public gender: string,
    public workingDays: any,
    public workingHours: any,
    public hourlyRate:any
  ) {  
    this.location={
      "address" : "",
      "longitude" : "",
      "latitude" : ""
    };
	this.workingDays=[];
	this.workingHours=[];
  this.hourlyRate={
    "amount" : 15.0,
    "currency" : "EUR"
  };
  }
}

