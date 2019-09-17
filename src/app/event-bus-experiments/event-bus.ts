import * as _ from 'lodash';
import { Lesson } from '../shared/model/lesson';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

class DataStore {

    private lessonListSubject = new BehaviorSubject([]);

    public lessonList$: Observable<Lesson[]> = this.lessonListSubject.asObservable();

    constructor() {
    }

    initializeLessonList(newLessons: Lesson[]) {
        this.lessonListSubject.next(_.cloneDeep(newLessons));
    }

    addLesson(lesson: Lesson) {
        const lessons = this.cloneLessons();
        lessons.push(lesson);
        this.lessonListSubject.next(lessons);
    }

    delete(lesson: Lesson) {
        const lessons = this.cloneLessons();
        _.remove(lessons, ele => ele.id === lesson.id);
        this.lessonListSubject.next(lessons);
    }

    toggleLessonViewed(lesson: Lesson) {
        const lessons = this.cloneLessons();
        const lessonToggle = _.find(lessons, ele => ele.id === lesson.id);
        lessonToggle.completed = !lessonToggle.completed;
        this.lessonListSubject.next(lessons);
    }

    private cloneLessons() {
        return _.cloneDeep(this.lessonListSubject.getValue());
    }
}

export const store = new DataStore();
