import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  template: `
  <div class="container-fluid">
  <div class="row">
    <div class="col">
      <h1>Product</h1>
    </div>
    <div class="col text-right">
      <button id="btn-new" type="button" class="btn btn-primary" (click)="onCreate()">New</button>
    </div>
  </div>
  <div class="row">
    <router-outlet></router-outlet>
  </div>
</div>  `
})
export class ProductComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  onCreate() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
