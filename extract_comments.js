

"use strict"

const _startComment = '/';
const _blockComment = '/*';
const _lineComment = '//';


/**
 * @description This will extract comments
 * @param {String} text The while text css code
 */
export const extractCSSComments = (text) => {
    let len = text.length;
    let startComment = null;
    let expectedClose = null;
    let comment = false;
    let read = '';
    let start = '';

    for (let i = 0; i < len; i++) {

        let t = text[i];
        
        if (t == _startComment || comment) {
            
            if (startComment == null) {
                start += t;
            } else {
                start = t
            }
            
            comment = true;
            if (start.trim() === _blockComment) {
                expectedClose = '/';
                startComment = start;
                start = '';
            }
            else if (start.trim() === _lineComment) {
                expectedClose = '\n';
                startComment = start;
                start = '';
            }
            if (expectedClose === start && expectedClose != null) {
                comment = false;
                start = '';
                startComment = null;
                expectedClose = null;
            } 
            if (start.length === 2) {start = '';} 
        } else {
            start = '';
            read += t;
        }
    }

    if (read != '') {
        return read.trim();
    } else {
        return null;
    }
}
