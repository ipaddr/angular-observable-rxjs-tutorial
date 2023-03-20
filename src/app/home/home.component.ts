import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable, map, filter } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private aSubscription: Subscription = Subscription.EMPTY;
  private customSubscription: Subscription = Subscription.EMPTY;

  constructor() { }

  ngOnInit() {
    this.aSubscription =  interval(1000).subscribe( (params) => {
        console.log(params);
      }
    );

    const aCustomObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => { 
        observer.next(count); 
        if(count === 2)
          observer.complete();
        if(count > 3)
          observer.error(new Error('Counter tidak boleh lebih besar dari 3'));
        count++;
      },1000);
    });

    this.customSubscription = aCustomObservable
    .pipe(
      filter(
        (data) => {
          return (data as number) > 0
        }
      ),
      map(
        (data) => {
            return 'Round : ' + ((data as number) + 1);
        }
      )
    )
    .subscribe((data) => {
        console.log(data);
      }, error => {
        console.log(error);
        alert(error.message);
      }, () => {
        console.log('Completed');
      }
    );
  }

  ngOnDestroy(): void {
      this.aSubscription.unsubscribe();
      this.customSubscription.unsubscribe();
  }

}
