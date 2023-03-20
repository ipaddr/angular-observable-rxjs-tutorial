import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  booleanOfSubeject = new Subject<boolean>();

  constructor() { }
}
