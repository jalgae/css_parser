

"use strict"

import { extractCSSComments } from './extract_comments';
import { getCSSNames } from './css_names';
import { cssStyleDom } from './dom_css_styles';




/**
 * @description This will process the pure text CSS code
 */
export default (text) => {
    console.log('Start CSS Parser');
    let raw_css = extractCSSComments(text);
    let data = getCSSNames(raw_css);
    cssStyleDom(data);
}