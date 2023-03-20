import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  userServiceSubscribtion: Subscription = Subscription.EMPTY;
  didActivate = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userServiceSubscribtion = this.userService.booleanOfSubeject.subscribe(
      (data) => {
        this.didActivate = data;
      }
    );
  }

  ngOnDestroy(): void {
      this.userServiceSubscribtion.unsubscribe();
  }
}
