import { debounceTime } from "rxjs/operators";
import { Subject } from "rxjs";

/** Debounces a function to execute on the tail end */
export function debounce(func: Function, timeout: number = 250) {
    let subject = new Subject();

    subject.pipe(debounceTime(timeout)).subscribe(() => {
        func();
    });

    return subject;
}