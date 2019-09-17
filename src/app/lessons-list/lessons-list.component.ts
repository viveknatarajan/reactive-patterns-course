import { Component, OnInit } from '@angular/core';
import { Observer, store } from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';
import * as _ from 'lodash';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss']
})
export class LessonsListComponent implements OnInit, Observer {

  lessons: Lesson[] = [];


  ngOnInit() {
    store.subscribe(this);
  }

  next(data: Lesson[]) {
    this.lessons = data;
  }

  toggleLessonViewed(lesson: Lesson) {
    store.toggleLessonViewed(lesson);
  }

  delete(lesson: Lesson) {
    store.delete(lesson);
  }
}
