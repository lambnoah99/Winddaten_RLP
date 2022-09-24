import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Windpark } from 'src/app/models/windpark/windpark';
import { WindparkService } from 'src/app/services/windpark/windpark.service';

@Component({
  selector: 'app-park-list',
  templateUrl: './park-list.page.html',
  styleUrls: ['./park-list.page.scss'],
})
export class ParkListPage implements OnInit, OnDestroy {

  windparks: Windpark[] = [];

  // Used to prevent Memory Leaks
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(private windparkService: WindparkService) { }

  ngOnInit() {
    this.windparkService.getWindparks()
    .pipe(
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe((windparks: Windpark[]) => this.windparks = windparks)
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
