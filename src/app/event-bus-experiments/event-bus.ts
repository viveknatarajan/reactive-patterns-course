import * as _ from 'lodash';
import { Lesson } from '../shared/model/lesson';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

class DataStore {

    private lessons: Lesson[] = [];
    private lessonListSubject = new BehaviorSubject([]);

    public lessonList$: Observable<Lesson[]> = this.lessonListSubject.asObservable();

    constructor() {
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
