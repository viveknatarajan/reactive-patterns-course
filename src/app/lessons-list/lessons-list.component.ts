import { Component, OnInit } from '@angular/core';
import { store } from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';
import * as _ from 'lodash';
import { Observer } from 'rxjs';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss']
})
export class LessonsListComponent implements OnInit, Observer<Lesson[]> {

  lessons: Lesson[] = [];


  ngOnInit() {
    store.lessonList$.subscribe(this);
  }

  next(data: Lesson[]) {
    this.lessons = data;
  }

  error(err: any) {
    console.log(err);
  }

  complete() {
    console.log('completed');
  }

  toggleLessonViewed(lesson: Lesson) {
    store.toggleLessonViewed(lesson);
  }

  delete(lesson: Lesson) {
    store.delete(lesson);
  }
}
