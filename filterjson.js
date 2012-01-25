	function is(o, type) {
		return Object.prototype.toString.call(o).toLowerCase() == "[object "+type+"]";
	}
	
	
var filterJson = function(obj, schema, exclude) {
	
	var error = null;

	var res = cast(obj, schema, exclude);
	
	if(error) {
		console.log('Error found', error);
	}
	
	return res;
	
	function is(o, type) {
		return Object.prototype.toString.call(o).toLowerCase() == "[object "+type+"]";
	}
	
	function filterNulls(arr) {
		var ret = [];
		for(var i = 0, l = arr.length; i < l; i++) {
			if(arr[i] !== null)
				ret.push(arr[i]);
		}
		return ret;
	}
	
	function cast(o, s, e) {

		var ret = null, path, i, j;
		
		if(o === null){}
		else if(is(s, "object") && is(o, "object")) { //s.constructor === Object && o.constructor === Object) {
			ret = {};
	
			for(path in s) {
				if(o[path] === null)
					ret[path] = null;
				else if(o[path] !== undefined && (i = cast(o[path], s[path], e))) {
					ret[path] = i;
				}
			}
		}
		else if(s.constructor == Array) {
			ret = [];
			if(o.constructor === Array) {
				for(i in o) {
					if((j = cast(o[i], s[0], e)) || o[i] === null) {
						ret.push(j);
					}
				}
				var ret2 = filterNulls(ret);
				ret = ret2;
//				console.log(ret, ret2);
			}
		}
		else if(Object.prototype.toString.call(s) == '[object Function]' && s.toString().substr(-17) != '{ [native code] }')
			ret = s.call(o, o);
		else if(s === String)
			ret = o.toString();
		else if(s === Number)
			ret = parseFloat(o) || 0;
		else if(s === Boolean)
			ret =  !!o;
		else if(s === Date) {
			if(o.constructor === Date)
				ret = o;
			else if(o.constructor === Number)
				ret = new Date(o);
			else if(o.constructor === String)
				ret = new Date(o);
		}
		else if(Object.prototype.toString.call(s) == '[object RegExp]') {
			if(o.constructor === String && (i = o.match(s)))
				ret = i[0];
		}
		
		if(ret === null) {
			error = 'null value found';
		}
		return ret;
	}
}

if(module)
	module.exports = filterJson;