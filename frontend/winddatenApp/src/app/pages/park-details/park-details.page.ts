import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Windpark } from 'src/app/models/windpark/windpark';
import { WindparkService } from 'src/app/services/windpark/windpark.service';

@Component({
  selector: 'app-park-details',
  templateUrl: './park-details.page.html',
  styleUrls: ['./park-details.page.scss'],
})
export class ParkDetailsPage implements OnInit {
  windpark: Windpark;

  constructor(private route: ActivatedRoute, private windparkService: WindparkService) { }

  ngOnInit() {
    this.route.params
    .pipe(
      take(1)
    )
    .subscribe((params) => {
      this.getWindparkData(params.id);
    });
  }

  getWindparkData(id: number) {
    this.windparkService.getWindpark(id)
    .pipe(
      take(1)
    )
    .subscribe((windpark: Windpark) => {
      this.windpark = windpark[0];
      console.log(this.windpark);
    });
  }
}
