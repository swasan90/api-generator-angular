import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'removeunderscore'})
export class RemoveUnderscorePipe implements PipeTransform{
    transform(value: any, ...args: any[]) {
        return value.replace(/_/g, " ");
    }
    
}