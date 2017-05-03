export class Profile { 
	public email: string;
    public id: string;
    public enabled: boolean;
    public subscription: any;
    public profileInfo: any;
    public preferences: any;
    public favoritesCount: number;
    public rating: number;
  constructor(profileObj:any) {  
	this.email = profileObj.email;
	this.id = profileObj.id;
	this.enabled = profileObj.enabled;
	this.profileInfo = profileObj.profile;
	this.subscription = profileObj.subscription;
	this.preferences = profileObj.preferences;
	this.favoritesCount = profileObj.favoritesCount;
	this.rating = profileObj.rating;
  }
}

