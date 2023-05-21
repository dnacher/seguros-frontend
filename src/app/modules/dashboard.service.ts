import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  bigChart() {
    return [{
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
    }, {
      name: 'Africa',
      data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
    }, {
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
      name: 'Oceania',
      data: [2, 2, 2, 6, 13, 30, 46]
    }];
  }

  cards() {
    return [71, 78, 39, 106];
  }

  pieChart() {
    return [{
      name: 'Chrome',
      y: 140.00,
      sliced: true,
      selected: true
    }, {
      name: 'Pepito porque no existe mas',
      y: 10.00
    }, {
      name: 'Firefox',
      y: 3.00
    }, {
      name: 'Edge',
      y:  4.00
    }, {
      name: 'Safari',
      y: 3.00
    }, {
      name: 'Sogou Explorer',
      y: 2.00
    }, {
      name: 'Opera',
      y: 2.0
    }, {
      name: 'QQ',
      y: 2.0
    }, {
      name: 'Other',
      y: 4.0
    }];
  }
}
