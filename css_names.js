






"use strict"







/**
 * @description THis will decode the names
 * @param {String} name css name
 */
const extractNames = (name) => {
    let nameData = {};
    
    name = name.split(',');

    if (name.length === 1) {
        let sign = name[0].charAt(0);
        if (sign === '.') {
            let target = name[0].substring(1, name[0].length);
            nameData = {
                type: 'class',
                name: target 
            }
        } 
        else if (sign === '#') {
            let target = name[0].substring(1, name[0].length);
            nameData = {
                type: 'id',
                name: target
            }
        } else {
            //For elements here
        }
    }

    return nameData;
}



/**
 * @description This will handle formatting the names
 */
const formatNames = (data) => {
    data = data.map((css)=>{
        css.name = extractNames(css.name);
        return css;
    }, this);
    return data;
}


/**
 * @description Format CSS attributes to DOM attributes
 */
const formatCssAttrToDomAttr = (attr) => {
    let newAttr = '';

    const upperCaseFirst = (att) => {
        let a = att.charAt(0).toUpperCase();
        return a + att.substring(1, att.length);
    }

    if (attr.charAt(0) == "-") {
        attr = attr.substring(1, attr.length);
        attr = attr.split('-');
        if (attr.length > 1) {
            attr = attr.map((att)=>{
                return upperCaseFirst(att);
            }, this);
            for (let i = 0; i < attr.length; i++) {
                newAttr += attr[i];
            }
        }
    }
    else {
        attr = attr.split('-');
        newAttr += attr[0];
        if (attr.length > 1) {
            for (let i = 1; i < attr.length; i++) {
                newAttr += upperCaseFirst(attr[i]);
            }
        }
    }
    return newAttr;
}


/**
 * @description Handle to format the text values
 * @param {String} values text values
 */
const formatValues = (values) => {
    let value = {};
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

    for (let i = 0; i < colValues.length; i++) {
        let attr = colValues[i][0];
        let val = colValues[i][1];
        if (val.charAt(0) == '"' && val.charAt(val.length - 1) == '"') {
            val = val.substring(1, val.length - 2);
        }
        else if (val.charAt(0) == "'" && val.charAt() == "'") {
            val = val.substring(1, val.length - 2);
        }
        value[formatCssAttrToDomAttr(attr)] = val;
    }
    return value;
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
    _data = formatNames(_data);
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