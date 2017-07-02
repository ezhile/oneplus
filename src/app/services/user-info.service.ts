import { Injectable } from '@angular/core';

@Injectable()
export class UserInfoService {

	public userInfo:any;
	constructor() {		
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));       
	}
	
	set(item: any) {
		sessionStorage.setItem('userInfo', JSON.stringify(item));
		this.userInfo = JSON.parse(sessionStorage.getItem('userInfo')); 
	}

	get(item:any){
		let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
		if(!userInfo){
			document.location.href="/";
			return false;
		}
		return userInfo[item];
	}
	test(){
		let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
		if(userInfo){
			return true;
		}else{
			document.location.href="/";
			return false;
		}
	}
}
