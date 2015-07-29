(function(exports) { 'use strict';

const htmlEscapeObject = { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;', '': '&#47', };
const htmlEscapeRegExp = new RegExp('['+ Object.keys(htmlEscapeObject).join('') +']', 'g');
const escapeHtml = exports.escapeHtml = function escapeHtml(string) {
	return String.prototype.replace.call(string != null ? string : '', htmlEscapeRegExp, function(c) { return htmlEscapeObject[c]; });
};

const escapeString = exports.escapeString = function escapeString(string) {
	return String.prototype.replace.call(string != null ? string : '', /([\\\n\$\`\'\"])/g, '\\$1');
};

const trim = exports.trim = function trim(string) {
	return String.prototype.replace.call(string != null ? string : '', (/[ \t\v\n\s]+/g), ' ');
};

const unescapeUrl = exports.unescapeUrl = function unescapeUrl(string) {
	return decodeURIComponent(string).replace(/\+/g, ' ');
};

const toString = exports.toString = function toString(any) {
	try {
		if (/^(boolean|number|string)$/.test(typeof any)) { return any +''; }
		if (/^function$/.test(typeof any)) { return '[function '+ (any.name || '<unnamed>') +']'; }
		if (/^symbol$/.test(typeof any)) { return '[object Symbol]'; }
		if (any === undefined) { return ''; }
		if (Array.isArray(any)) { return any.map(toString).join(', '); }
		const string = any +'';
		if (/^\[object \w+?\]$/.test(string)) { try {
			return JSON.stringify(any);
		} catch (e) { } }
		return string;
	} catch (e) {
		return Object.prototype.toString.call(any);
	}
};

const removeTags = exports.removeTags = function removeTags(html) {
	const newLine = this && this.newLine || '\n';
	const space = this && this.space || '';
	return String.replace(html, /(<\/?.*?>)+/g, function(match) {
		if (/<(br|\/div)>/.test(match)) {
			return newLine;
		}
		return space;
	});
};

const moduleName = 'es6lib/template/escape'; if (typeof module !== 'undefined') { module.exports = exports; } else if (typeof define === 'function') { define(moduleName, exports); } else if (typeof window !== 'undefined' && typeof module === 'undefined') { window[moduleName] = exports; } return exports; })({ });
