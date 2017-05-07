export class EditProfessional {
  constructor(
    public nickname: string,
    public genderShow: boolean,
    public about: string,
    public serviceList: string,
    public location: any,
    public gender: any,
    public workingDays: any,
    public workingHours: any
  ) {  
    this.location={
      "address" : "",
      "longitude" : "",
      "latitude" : ""
    };
	this.gender=[];
	this.workingDays=[];
	this.workingHours=[];
  }
}

