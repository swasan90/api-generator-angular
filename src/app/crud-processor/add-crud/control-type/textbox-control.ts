import { MetaData } from 'src/app/model/metaData';
/**
 * Class to define text button control.
 */
export class TextBoxControl extends MetaData<string> {
    controlType ="textbox";
    type:string;

    constructor(options:{} ={}) {
        super(options);        
        this.type = options['fieldType'] || '';
    }
    
}