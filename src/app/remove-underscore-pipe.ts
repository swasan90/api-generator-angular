import { PipeTransform, Pipe } from '@angular/core';
/**
 * Class to implement RemoveUnderscorePipe to remove underscrore from the string.
 */

@Pipe({ name: 'removeunderscore' })
export class RemoveUnderscorePipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        return value.replace(/_/g, " ");
    }

}