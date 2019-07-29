import { MetaData } from 'src/app/model/metaData';

export class TextBoxControl extends MetaData<string> {
    controlType ="textbox";
    type:string;

    constructor(options:{} ={}) {
        super(options);        
        this.type = options['fieldType'] || '';
    }
    
}