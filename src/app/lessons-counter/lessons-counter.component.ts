import { Component, OnInit } from '@angular/core';
import { store } from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';
import { Observer } from 'rxjs';

@Component({
  selector: 'lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.scss']
})
export class LessonsCounterComponent implements OnInit, Observer<Lesson[]> {

  totalLessons = 0;

  next(data: Lesson[]) {
    this.totalLessons = data.length;
  }

  error(err: any) {
    console.log(err);
  }

  complete() {
    console.log('completed');
  }

  ngOnInit() {
    store.lessonList$.subscribe(this);
  }

}
