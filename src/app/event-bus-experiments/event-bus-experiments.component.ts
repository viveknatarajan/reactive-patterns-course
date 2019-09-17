import { Component, OnInit } from '@angular/core';

import { store } from './event-bus';
import { testLessons } from '../shared/model/test-lessons';

@Component({
  selector: 'event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.scss']
})
export class EventBusExperimentsComponent implements OnInit {

  ngOnInit() {
    store.initializeLessonList(testLessons.slice(0));
    setTimeout(() => {
      // TODO:
    }, 10000);
  }

  addLesson(lessonText: string) {
    store.addLesson({
      id: Math.random(),
      description: lessonText
    });
  }

}
