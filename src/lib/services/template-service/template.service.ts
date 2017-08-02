import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

import { TemplateClass } from '../../template';

import { ConfigService } from '../configuration-service/configuration.service';

@Injectable()
export class TemplateService {

	private defaultTemp: TemplateClass;

	private hashtable = [];

  constructor(private http: Http, private configService: ConfigService) {}

	loadTemplateJson(name:string, templatesObject:any, templateFolder): Observable<Object> { 
		let config = this.configService.getConfiguration();
		let url = "";
		let defaultDirectory = "default";
		if(config!=null && config.templateURL!=null)
		{
			url = config.templateURL;
			if(config.defaultDirectory!=null)
				defaultDirectory = config.defaultDirectory;
		}
		if(!url.endsWith("/")) url = url+"/";
		if(templateFolder==null || templateFolder=="") templateFolder = defaultDirectory;

		var path = templateFolder.split("/");
		if(path.length>1)
		{
			if(!templateFolder.endsWith(".json")) templateFolder = templateFolder+".json";
			url = url+templateFolder;
		}
		else
		{
			if(templateFolder=="")
			{
				url = url+name+"-template.json";
			}
			else
			{
				url = url+templateFolder+"/"+name+"-template.json";
			}
		}
		// for(let temp of this.hashtable)
		// {
		// 	if(temp["key"]==url)
		// 	{
		// 		console.log(temp["key"]);
		// 		return temp["value"];
		// 	}
		// }
		return this.http.get(url).map(res=>{
			// console.log("pushing into ",this.hashtable);
			// this.hashtable.push({key:url, value:res.json()});
			console.log(res);
			return res.json();
		})
		.catch((error:any) => { 
			console.log(error);
			return Observable.throw('Server error');});
  }

  getTemplate():TemplateClass {
    return this.defaultTemp;
  }
}