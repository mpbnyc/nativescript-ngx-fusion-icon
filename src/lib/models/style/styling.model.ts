export class StylingModel { 
    class: string = "";
    dynamicClass: string = "";
    condition: string = "";
    value: string = "";
    style: string = "";
    themeColor: string = "";

	constructor(values: Object = {}) {
		Object.assign(this, values);
        if(this.class==null)
            this.class = "";
        if(this.dynamicClass==null)
            this.dynamicClass = "";
        if(this.style==null)
            this.style = "";
        if(this.themeColor==null)
            this.themeColor = "";
    }
}