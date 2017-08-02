
import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';

import { Configuration } from '../../config';

@Injectable()
export class ConfigService {
   private config: Configuration;
   constructor(private http:Http) {}
  
  load(url:string) { 
    return new Promise((resolve) => {
      this.http.get(url).map(res=>{
          return res.json()
      })
      .catch((error: any):any => {
                console.log('Configuration file could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            })
        .subscribe(config => {
          this.config = config;
          resolve();
        },
        (err) => { console.log("File not Found"); },
        () => console.log("Done"));
    }).catch((err) => console.log("Promise Catch"));
  }

  getConfiguration():Configuration {
    return this.config;
  }
}