

"use strict"

import { extractCSSComments } from './extract_comments';
import { getCSSNames } from './css_names';

export default (text) => {
    console.log('Start CSS Parser');
    let raw_css = extractCSSComments(text);
    console.log(raw_css);
    let data = getCSSNames(raw_css);
}