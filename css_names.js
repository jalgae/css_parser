



"use strict"



/**
 * @description Handle to format the text values
 * @param {String} values text values
 */
const formatValues = (values) => {
    console.log(values);
    let colValues = String(values).split(';');

    colValues = colValues.map((val)=>{
        let v = val.trim();
        let attr = v.split(':');
        attr = attr.map((att)=>{
            return att.trim();
        }); 
        return attr;
    });

    colValues = colValues.filter((val)=>{
        return val.length === 2;
    });

    return colValues;
}


/**
 * @description Map the values and name
 * @param {Object[]} data collections
 */
const formatValuesToAttributes = (data) => {
    let _data = data.map((d)=>{

        // Do something here to collect the attributes
        d.value = formatValues(d.value);
        return d;
    }, this);
    console.log('formatValuesToAttributes', _data);
    return _data;
}


/**
 * @description Get the names and value
 * @param {String} text Extracted comment CSS code
 */
export const getCSSNames = (text) => {
    let len = text.length;
    
    let value = false;

    let collection = [];
    let collect = {
        name: '',
        value: ''
    }
    for (let i = 0; i < len; i++) {
        let t = text[i];
        if (t === '{' ) {
            value = true;
            continue;
        } else if (t === '}') {
            value = false;
            
            collect.name = collect.name.trim();
            collect.value = collect.value.trim();

            collection = collection.concat({...collect});
            collect = { name: '', value: '' };
            continue;
        } 
        if ( value ) {
            collect.value += t;
        } else {
            collect.name += t;
        }
    }
    return formatValuesToAttributes(collection)
}