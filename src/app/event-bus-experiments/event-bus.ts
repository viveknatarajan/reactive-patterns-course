import * as _ from 'lodash';
import { Lesson } from '../shared/model/lesson';

export interface Observer {
    next(data: any);
}

export interface Observable {
    subscribe(observer: Observer);
    unsubscribe(observer: Observer);
}

interface Subject extends Observer, Observable {
}

class SubjectImplementation implements Subject {
    private observers: Observer[] = [];

    next(data: any) {
        this.observers.forEach(observer => {
            observer.next(data);
        });
    }
    subscribe(observer: Observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer: Observer) {
        _.remove(this.observers, ele => ele === observer);
    }
}

class DataStore implements Observable {

    private lessons: Lesson[] = [];
    private lessonListSubject = new SubjectImplementation();

    constructor() {

    }

    subscribe(obj) {
        this.lessonListSubject.subscribe(obj);
        obj.next(this.lessons);
    }

    unsubscribe(obj) {
        this.lessonListSubject.unsubscribe(obj)
    }

    initializeLessonList(newLessons: Lesson[]) {
        this.lessons = _.cloneDeep(newLessons);
        this.broadcast();
    }

    addLesson(lesson: Lesson) {
        this.lessons.push(_.cloneDeep(lesson));
        this.broadcast();
    }

    delete(lesson: Lesson) {
        _.remove(this.lessons, ele => ele.id === lesson.id);
        this.broadcast();
    }

    toggleLessonViewed(lesson: Lesson) {
        const lessonToggle = _.find(this.lessons, ele => ele.id === lesson.id);
        lessonToggle.completed = !lessonToggle.completed;
        this.broadcast();
    }


    broadcast() {
        this.lessonListSubject.next(_.cloneDeep(this.lessons));
    }
}

export const store = new DataStore();
