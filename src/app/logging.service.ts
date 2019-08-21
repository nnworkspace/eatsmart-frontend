import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class LoggingService {
  lastlog: string;

  printLog(msg: string) {
    console.log('last log: ' + this.lastlog);
    console.log('new log: ' + msg);
    this.lastlog = msg;
  }
}
