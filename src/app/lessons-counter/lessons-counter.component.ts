import { Component, OnInit } from '@angular/core';
import { Observer, store } from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.scss']
})
export class LessonsCounterComponent implements OnInit, Observer {

  constructor() {
    store.subscribe(this);
  }

  totalLessons = 0;

  next(data: Lesson[]) {
    this.totalLessons = data.length;
  }

  ngOnInit() {
  }

}
