import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppBusiness } from './AppBusiness';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppModel } from './AppModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private componetDestroyed: Subject<null> = new Subject();
  sellerForm: FormGroup;
  Sellers: AppModel[];

  constructor(
    private Business: AppBusiness,
    private fb: FormBuilder,
  ) {
    this.sellerForm = this.fb.group({
      sellerId: ['',],
      lead: ['', ],
    });
  }

  ngOnInit() {
    this.GetSubscribedSellers();
  }

  GetSubscribedSellers() {
    this.Business.GetSubscribedSellers().pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
      this.Sellers = x;
      console.log(this.Sellers);
    }, (error) => {
    });
  }

  UpdateSubscribedSellers() {
    if (this.sellerForm.valid) {
      this.Business.UpdateSubscribedSellers(this.sellerForm.value).pipe(takeUntil(this.componetDestroyed)).subscribe(x => {
        console.log(x);
      }, (error) => {
      });
    }
  }


  ngOnDestroy(): void {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }

}
