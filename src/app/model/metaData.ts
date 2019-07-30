/**
 * Class for metadata object.
 */
export class MetaData<T>{
    value: T;
    fieldName:string;     
    fieldType:string;
    required?:boolean;
    controlType?:string;
    
    constructor(options: {
        value?: T,
        fieldName?: string,         
        required?: boolean,       
        fieldType?: string,
        controlType?: string
      } = {}) {
      this.value = options.value;
      this.fieldName = options.fieldName || '';      
      this.required = !!options.required;    
      this.fieldType = options.fieldType || '';
      this.controlType = options.controlType || '';
    }
}