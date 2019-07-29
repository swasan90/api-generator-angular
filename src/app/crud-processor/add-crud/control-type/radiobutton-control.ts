import { MetaData } from 'src/app/model/metaData';

export class RadioButtonControl extends MetaData<boolean> {
  controlType = 'radio';
  options: {key: string, value: boolean}[] = [{key:"True",value:true},{key:"False",value:false}];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];     
  }
}