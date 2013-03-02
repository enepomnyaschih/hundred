/*!
	jWidget Lib 0.4.
	
	https://github.com/enepomnyaschih/jwlib
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

if (typeof JW !== "undefined") {
	throw new Error("Can't initialize jWidget Lib: JW namespace already defined");
}

(typeof window === "undefined" ? global : window).JW = {};

JW.global = (typeof window === "undefined" ? global : window);

JW.apply = function(target /*, sources */) {
	for (var i = 1; i < arguments.length; ++i) {
		var source = arguments[i];
		if (!source) {
			continue;
		}
		for (var key in source) {
			if (typeof source[key] !== "undefined") {
				target[key] = source[key];
			}
		}
	}
	return target;
};

JW.apply(JW, {
	isUndefined: function(v) {
		return v === undefined;
	},
	
	isDefined: function(v) {
		return v !== undefined;
	},
	
	isNull: function(v) {
		return v === null;
	},
	
	isSet: function(v) {
		return (v !== undefined) && (v !== null);
	},
	
	isInt: function(v) {
		return (typeof v === "number") && Math.round(v) === v;
	},
	
	isNumber: function(v) {
		return typeof v === "number";
	},
	
	isString: function(v) {
		return typeof v === "string";
	},
	
	isBoolean: function(v) {
		return typeof v === "boolean";
	},
	
	isFunction: function(v) {
		return typeof v === "function";
	},
	
	isArray: function(v) {
		return Object.prototype.toString.apply(v) === '[object Array]';
	},
	
	isObject: function(v) {
		return Object.prototype.toString.apply(v) === '[object Object]';
	},
	
	isRegExp: function(v) {
		return Object.prototype.toString.apply(v) === '[object RegExp]';
	},
	
	isDate: function(v) {
		return Object.prototype.toString.apply(v) === '[object Date]';
	},
	
	isBlank: function(v) {
		return !v;
	},
	
	def: function(v, d) {
		return JW.isDefined(v) ? v : d;
	},
	
	defn: function(v, d) {
		return JW.isSet(v) ? v : d;
	},
	
	applyIf: function(target /*, sources */) {
		for (var i = 1; i < arguments.length; ++i) {
			var source = arguments[i];
			if (!source) {
				continue;
			}
			for (var key in source) {
				if (JW.isDefined(source[key]) && !JW.isDefined(target[key])) {
					target[key] = source[key];
				}
			}
		}
		return target;
	},
	
	applyIfn: function(target /*, sources */) {
		for (var i = 1; i < arguments.length; ++i) {
			var source = arguments[i];
			if (!source) {
				continue;
			}
			for (var key in source) {
				if (JW.isDefined(source[key]) && !JW.isSet(target[key])) {
					target[key] = source[key];
				}
			}
		}
		return target;
	},
	
	clean: function(source) {
		var result = {};
		for (var i in source) {
			if (JW.isDefined(source[i])) {
				result[i] = source[i];
			}
		}
		return result;
	},
	
	cleann: function(source) {
		var result = {};
		for (var i in source) {
			if (JW.isSet(source[i])) {
				result[i] = source[i];
			}
		}
		return result;
	},
	
	args: function(a, index, count) {
		index = index || 0;
		count = count || (a.length - index);
		var r = [];
		for (var i = 0; i < count; ++i) {
			r.push(a[index + i]);
		}
		return r;
	},
	
	emptyFn: function() {},
	
	cmp: function(x, y, caseInsensitive) {
		if (typeof x === "boolean" && typeof y === "boolean") {
			return x ? (y ? 0 : 1) : (y ? -1 : 0);
		}
		if (JW.isArray(x) && JW.isArray(y)) {
			return JW.Array.cmp(x, y, caseInsensitive);
		}
		if (caseInsensitive) {
			if (typeof x === "string") {
				x = x.toLowerCase();
			}
			if (typeof y === "string") {
				y = y.toLowerCase();
			}
		}
		if (x > y) return 1;
		if (x < y) return -1;
		return 0;
	},
	
	cmpCaseInsensitive: function(x, y) {
		return JW.cmp(x, y, true);
	},
	
	get: function(obj, field, def) {
		if (!field) {
			return JW.def(obj, def);
		}
		field = field.split(".");
		for (var i = 0; i < field.length; ++i) {
			if (!obj) {
				return def;
			}
			obj = obj[field[i]];
		}
		return JW.def(obj, def);
	},
	
	eq: function(x, y) {
		return x == y;
	},
	
	seq: function(x, y) {
		return x === y;
	},
	
	mod: function(value, mod) {
		return value - mod * Math.floor(value / mod);
	},
	
	smod: function(value, mod) {
		return value - mod * Math.round(value / mod);
	},
	
	sgn: function(value) {
		return !value ? 0 : value > 0 ? 1 : -1;
	},
	
	sgnnz: function(value) {
		return value >= 0 ? 1 : -1;
	},
	
	inScope: function(func, scope) {
		return function() {
			return func.apply(scope, arguments);
		};
	}
});

JW.toArray = JW.args;

/*
	JW simple inheritance.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ClassUtil = {
	_iid: 0,
	
	_fnTest: /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/,
	
	extend: function(subc, supc, body) {
		body = body || {};
		
		var F = function() {};
		F.prototype = supc.prototype;
		subc.prototype = new F();
		subc.prototype.constructor = subc;
		subc.superclass = supc.prototype;
		subc._super = supc;
		for (var i in body) {
			subc.prototype[i] = JW.ClassUtil.extendMethod(body[i], supc.prototype[i]);
		}
		subc.extend = function(body) {
			var f = function() {
				subc.apply(this, arguments);
			};
			JW.extend(f, subc, body);
			return f;
		};
		return subc;
	},
	
	extendMethod: function(sub, sup) {
		if ((typeof sup !== "function") ||
			(typeof sub !== "function") ||
			sub.superclass ||
			!JW.ClassUtil._fnTest.test(sub)) {
			return sub;
		}
		return function() {
			var tmp = this._super;
			this._super = sup;
			var result = sub.apply(this, arguments);
			this._super = tmp;
			return result;
		}
	}
};

JW.extend = JW.ClassUtil.extend;

JW.Class = function() {
	this._iid = ++JW.ClassUtil._iid;
	this._super = null;
};

JW.extend(JW.Class, Object, {
	destroy: function() {}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Event = function() {
	JW.Event._super.call(this);
	this.attachments = {};
};

JW.extend(JW.Event, JW.Class, {
	/*
	Fields
	Map<JW.EventAttachment> attachments;
	*/
	
	destroy: function() {
		this.purge();
	},
	
	bind: function(callback, scope) {
		var attachment = new JW.EventAttachment(this, callback, scope);
		this.attachments[attachment._iid] = attachment;
		return attachment;
	},
	
	unbind: function(attachment) {
		delete this.attachments[attachment._iid];
	},
	
	purge: function() {
		this.attachments = {};
	},
	
	trigger: function(params) {
		// haven't splitted to simpler methods for debugging purposes
		for (var iid in this.attachments) {
			var attachment = this.attachments[iid];
			attachment.callback.call(attachment.scope || attachment, params);
		}
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.EventAttachment = function(event, callback, scope) {
	JW.EventAttachment._super.call(this);
	this.event = event;
	this.callback = callback;
	this.scope = scope;
};

JW.extend(JW.EventAttachment, JW.Class, {
	/*
	Fields
	JW.Event<? extends JW.EventParams> event;
	Function callback;
	Object scope;
	*/
	
	destroy: function() {
		this.event.unbind(this);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.EventParams = function(sender) {
	JW.EventParams._super.call(this);
	this.sender = sender;
};

JW.extend(JW.EventParams, JW.Class, {
	/*
	Fields
	JW.Class sender;
	*/
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ValueEventParams = function(sender, value) {
	JW.ValueEventParams._super.call(this, sender);
	this.value = value;
};

JW.extend(JW.ValueEventParams/*<T extends Any>*/, JW.EventParams, {
	/*
	Fields
	T value;
	*/
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ItemValueEventParams = function(sender, item, value) {
	JW.ItemValueEventParams._super.call(this, sender, value);
	this.item = item;
};

JW.extend(JW.ItemValueEventParams/*<I extends Any, V extends Any>*/, JW.ValueEventParams/*<V>*/, {
	/*
	Fields
	I item;
	*/
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Alg = {
	_createBy: function(algorithm) {
		return function(target, field, value) {
			return algorithm(target, function(item) {
				return JW.get(item, field) === value;
			});
		};
	},
	
	_createByField: function(algorithm) {
		return function(target, field) {
			return algorithm(target, function(item) {
				return JW.get(item, field);
			});
		};
	},
	
	_createByMethod: function(algorithm) {
		return function(target, method, args) {
			args = args || []; // IE fix
			return algorithm(target, function(item) {
				return item[method].apply(item, args);
			});
		};
	},
	
	_every: function(target, callback, scope) {
		return target.every(callback, scope);
	},
	
	_createEmpty: function(target) {
		return target.createEmpty();
	},
	
	_pushItem: function(target, item, key) {
		return target.pushItem(item, key);
	}
};

/*
	JW simple collection methods.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Alg.createSimpleFunctions = function(every) {
	var namespace = {};
	
	namespace.everyBy = JW.Alg._createBy(every);
	namespace.everyByMethod = JW.Alg._createByMethod(every);
	
	namespace.each = function(target, callback, scope) {
		every(target, function() {
			callback.apply(this, arguments);
		}, scope);
		return target;
	};
	
	namespace.forEach = namespace.each; // alias
	namespace.eachByMethod = JW.Alg._createByMethod(namespace.each);
	namespace.forEachByMethod = namespace.eachByMethod; // alias
	
	namespace.some = function(target, callback, scope) {
		return !every(target, function() {
			return callback.apply(this, arguments) === false;
		}, scope);
	};
	
	namespace.someBy = JW.Alg._createBy(namespace.some);
	namespace.someByMethod = JW.Alg._createByMethod(namespace.some);
	
	namespace.find = function(target, callback, scope) {
		var result;
		every(target, function(item, key) {
			if (callback.apply(this, arguments) !== false) {
				result = key;
				return false;
			}
		}, scope);
		return result;
	};
	
	namespace.findBy = JW.Alg._createBy(namespace.find);
	namespace.findByMethod = JW.Alg._createByMethod(namespace.find);
	
	namespace.search = function(target, callback, scope) {
		var result;
		every(target, function(item) {
			if (callback.apply(this, arguments) !== false) {
				result = item;
				return false;
			}
		}, scope);
		return result;
	};
	
	namespace.searchBy = JW.Alg._createBy(namespace.search);
	namespace.searchByMethod = JW.Alg._createByMethod(namespace.search);
	
	namespace.indexOf = function(target, value) {
		var result;
		every(target, function(item, key) {
			if (item === value) {
				result = key;
				return false;
			}
		});
		return result;
	};
	
	namespace.index = function(target, callback, scope) {
		var result = {};
		every(target, function(item) {
			if (item === undefined) {
				return;
			}
			var key = callback.apply(this, arguments);
			if (JW.isSet(key)) {
				result[key] = item;
			}
		}, scope);
		return result;
	};
	
	namespace.indexBy = JW.Alg._createByField(namespace.index);
	namespace.indexByMethod = JW.Alg._createByMethod(namespace.index);
	
	namespace.getKeysArray = function(target) {
		var result = [];
		every(target, function(item, key) {
			result.push(key);
		});
		return result;
	};
	
	namespace.getValuesArray = function(target) {
		var result = [];
		every(target, function(item) {
			result.push(item);
		});
		return result;
	};
	
	namespace.getSize = function(target) {
		var result = 0;
		every(target, function() {
			++result;
		});
		return result;
	};
	
	namespace.getLength = namespace.getSize; // alias
	
	namespace.isEmpty = function(target) {
		return every(target, function() { return false; });
	};
	
	return namespace;
};

JW.Alg.SimpleObjectFunctions = JW.Alg.createSimpleFunctions(JW.Alg._every);

JW.Alg.SimpleMethods = {
	everyBy         : function(field, value)    { return JW.Alg.SimpleObjectFunctions.everyBy        (this, field, value);    },
	everyByMethod   : function(method, args)    { return JW.Alg.SimpleObjectFunctions.everyByMethod  (this, method, args);    },
	each            : function(callback, scope) { return JW.Alg.SimpleObjectFunctions.each           (this, callback, scope); },
	eachByMethod    : function(method, args)    { return JW.Alg.SimpleObjectFunctions.eachByMethod   (this, method, args);    },
	forEach         : function(callback, scope) { return JW.Alg.SimpleObjectFunctions.forEach        (this, callback, scope); },
	forEachByMethod : function(method, args)    { return JW.Alg.SimpleObjectFunctions.forEachByMethod(this, method, args);    },
	some            : function(callback, scope) { return JW.Alg.SimpleObjectFunctions.some           (this, callback, scope); },
	someBy          : function(field, value)    { return JW.Alg.SimpleObjectFunctions.someBy         (this, field, value);    },
	someByMethod    : function(method, args)    { return JW.Alg.SimpleObjectFunctions.someByMethod   (this, method, args);    },
	find            : function(callback, scope) { return JW.Alg.SimpleObjectFunctions.find           (this, callback, scope); },
	findBy          : function(field, value)    { return JW.Alg.SimpleObjectFunctions.findBy         (this, field, value);    },
	findByMethod    : function(method, args)    { return JW.Alg.SimpleObjectFunctions.findByMethod   (this, method, args);    },
	search          : function(callback, scope) { return JW.Alg.SimpleObjectFunctions.search         (this, callback, scope); },
	searchBy        : function(field, value)    { return JW.Alg.SimpleObjectFunctions.searchBy       (this, field, value);    },
	searchByMethod  : function(method, args)    { return JW.Alg.SimpleObjectFunctions.searchByMethod (this, method, args);    },
	indexOf         : function(value)           { return JW.Alg.SimpleObjectFunctions.indexOf        (this, value);           },
	index           : function(callback, scope) { return JW.Alg.SimpleObjectFunctions.index          (this, callback, scope); },
	indexBy         : function(field)           { return JW.Alg.SimpleObjectFunctions.indexBy        (this, field);           },
	indexByMethod   : function(method, args)    { return JW.Alg.SimpleObjectFunctions.indexByMethod  (this, method, args);    },
	getKeysArray    : function()                { return JW.Alg.SimpleObjectFunctions.getKeysArray   (this);                  },
	getValuesArray  : function()                { return JW.Alg.SimpleObjectFunctions.getValuesArray (this);                  },
	getSize         : function()                { return JW.Alg.SimpleObjectFunctions.getSize        (this);                  },
	getLength       : function()                { return JW.Alg.SimpleObjectFunctions.getLength      (this);                  },
	isEmpty         : function()                { return JW.Alg.SimpleObjectFunctions.isEmpty        (this);                  }
};

/*
	JW collection building methods.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Alg.createBuildFunctions = function(every, createEmpty, pushItem) {
	var namespace = JW.Alg.createSimpleFunctions(every);
	
	namespace.merge = function(target, source) {
		every(source, function(item, key) {
			pushItem(target, item, key);
		});
		return target;
	};
	
	namespace.clone = function(target) {
		var result = createEmpty(target);
		return namespace.merge(result, target);
	};
	
	namespace.filter = function(target, callback, scope) {
		var result = createEmpty(target);
		every(target, function(item, key) {
			if (callback.apply(this, arguments) !== false) {
				pushItem(result, item, key);
			}
		}, scope);
		return result;
	};
	
	namespace.filterBy = JW.Alg._createBy(namespace.filter);
	namespace.filterByMethod = JW.Alg._createByMethod(namespace.filter);
	
	namespace.map = function(target, callback, scope) {
		var result = createEmpty(target);
		every(target, function(item, key) {
			pushItem(result, callback.apply(this, arguments), key);
		}, scope);
		return result;
	};
	
	namespace.mapBy = JW.Alg._createByField(namespace.map);
	namespace.mapByMethod = JW.Alg._createByMethod(namespace.map);
	
	namespace.mapFields = function(target) {
		var result = {};
		every(target, function(item) {
			for (var key in item) {
				result[key] = namespace.mapBy(target, key);
			}
			return false;
		});
		return result;
	};
	
	return namespace;
};

JW.Alg.BuildObjectFunctions = JW.Alg.createBuildFunctions(JW.Alg._every, JW.Alg._createEmpty, JW.Alg._pushItem);

JW.Alg.BuildMethods = JW.apply({}, JW.Alg.SimpleMethods, {
	merge          : function(source)          { return JW.Alg.BuildObjectFunctions.merge         (this, source);          },
	clone          : function()                { return JW.Alg.BuildObjectFunctions.clone         (this);                  },
	filter         : function(callback, scope) { return JW.Alg.BuildObjectFunctions.filter        (this, callback, scope); },
	filterBy       : function(field, value)    { return JW.Alg.BuildObjectFunctions.filterBy      (this, field, value);    },
	filterByMethod : function(method, args)    { return JW.Alg.BuildObjectFunctions.filterByMethod(this, method, args);    },
	map            : function(callback, scope) { return JW.Alg.BuildObjectFunctions.map           (this, callback, scope); },
	mapBy          : function(field)           { return JW.Alg.BuildObjectFunctions.mapBy         (this, field);           },
	mapByMethod    : function(method, args)    { return JW.Alg.BuildObjectFunctions.mapByMethod   (this, method, args);    },
	mapFields      : function()                { return JW.Alg.BuildObjectFunctions.mapFields     (this);                  }
});

/*
	JW array extension.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Array = function(items) {
	JW.Array._super.call(this);
	this.items = items ? items.concat() : [];
};

JW.extend(JW.Array, JW.Class, {
	get: function(index) {
		return this.items[index];
	},
	
	set: function(item, index) {
		this.items[index] = item;
	},
	
	add: function(item, index) {
		JW.Array.add(this.items, item, index);
	},
	
	addAll: function(items, index) {
		JW.Array.addAll(this.items, items, index);
	},
	
	remove: function(index, count) {
		return JW.Array.remove(this.items, index, count);
	},
	
	move: function(fromIndex, toIndex) {
		return JW.Array.move(this.items, fromIndex, toIndex);
	},
	
	clear: function() {
		return JW.Array.clear(this.items);
	},
	
	every: function(callback, scope) {
		return JW.Array.every(this.items, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.Array();
	},
	
	createEmptyMap: function() {
		return new JW.Map();
	},
	
	createEmptySet: function() {
		return new JW.Set();
	},
	
	removeItem: function(item) {
		return JW.Array.removeItem(this.items, item);
	},
	
	removeBy: function(field, value) {
		return JW.Array.removeBy(this.items, field, value);
	},
	
	equal: function(arr) {
		return JW.Array.equal(this.items, arr);
	},
	
	pushAll: function(items) {
		return JW.Array.pushAll(this.items, items);
	},
	
	sortBy: function(field, order) {
		return JW.Array.sortBy(this.items, field, order);
	},
	
	top: function() {
		return JW.Array.top(this.items);
	},
	
	collapse: function(depth) {
		return JW.Array.collapse(this.items, depth);
	},
	
	indexOf: function(item) {
		return JW.Array.indexOf(this.items, item);
	},
	
	getSize: function() {
		return this.items.length;
	},
	
	isEmpty: function() {
		return this.items.length === 0;
	},
	
	clone: function() {
		return this.items.concat();
	},
	
	getItems: function() {
		return this.items;
	},
	
	createIndexer: function(config) {
		return new JW.Array.Indexer(this, config);
	},
	
	createInserter: function(config) {
		return new JW.Array.Inserter(this, config);
	},
	
	createLister: function(config) {
		return new JW.Array.Lister(this, config);
	},
	
	createMapper: function(config) {
		return new JW.Array.Mapper(this, config);
	},
	
	createSplitter: function(config) {
		return new JW.Array.Splitter(this, config);
	}
});

JW.Array.prototype.getLength = JW.Array.prototype.getSize;
JW.Array.prototype.pushItem = JW.Array.prototype.set;

JW.applyIf(JW.Array.prototype, JW.Alg.BuildMethods);

JW.apply(JW.Array, {
	add: function(target, item, index) {
		target.splice(JW.def(index, target.length), 0, item);
	},
	
	addAll: function(target, items, index) {
		target.splice.apply(target, [ JW.def(index, target.length), 0 ].concat(items));
	},
	
	remove: function(target, index, count) {
		var items = target.splice(index, JW.def(count, 1));
		return (count === undefined) ? items[0] : items;
	},
	
	move: function(target, fromIndex, toIndex) {
		var item = target[fromIndex];
		if (fromIndex === toIndex) {
			return item;
		}
		target.splice(fromIndex, 1);
		target.splice(toIndex, 0, item);
		return item;
	},
	
	clear: function(target) {
		return target.splice(0, target.length);
	},
	
	every: function(target, callback, scope) {
		for (var i = 0, l = target.length; i < l; ++i) {
			if (callback.call(scope || target, target[i], i, target) === false) {
				return false;
			}
		}
		return true;
	},
	
	removeItem: function(target, item) {
		for (var i = 0; i < target.length; ++i) {
			if (target[i] === item) {
				target.splice(i, 1);
				--i;
			}
		}
		return target;
	},
	
	removeBy: function(target, field, value) {
		for (var i = 0; i < target.length; ++i) {
			if (JW.get(target[i], field) === value) {
				target.splice(i, 1);
				--i;
			}
		}
		return target;
	},
	
	equal: function(target, arr) {
		if (target === arr) {
			return true;
		}
		if (target.length !== arr.length) {
			return false;
		}
		for (var i = 0, l = target.length; i < l; ++i) {
			if (target[i] !== arr[i]) {
				return false;
			}
		}
		return true;
	},
	
	pushAll: function(target, items) {
		if (!items) {
			return target.length;
		}
		return target.push.apply(target, items);
	},
	
	sortBy: function(target, field, order) {
		order = order || 1;
		target.sort(function(x, y) {
			return JW.cmp(JW.get(x, field), JW.get(y, field)) * order;
		});
		return target;
	},
	
	top: function(target) {
		return target[target.length - 1];
	},
	
	collapse: function(target, depth) {
		var result = [];
		for (var i = 0, l = target.length; i < l; ++i) {
			if (!JW.isArray(target[i])) {
				result.push(target[i]);
				continue;
			}
			if (!JW.isSet(depth)) {
				JW.Array.pushAll(result, JW.Array.collapse(target[i]));
				continue;
			}
			if (depth) {
				JW.Array.pushAll(result, JW.Array.collapse(target[i], depth - 1));
				continue;
			}
			result.push(target[i]);
		}
		return result;
	},
	
	indexOf: Array.prototype.indexOf ? function(target, item) {
		return target.indexOf(item);
	} : function(target, item) {
		for (var i = 0, l = target.length; i < l; ++i) {
			if (target[i] === item) {
				return i;
			}
		}
		return -1;
	},
	
	getSize: function(target) {
		return target.length;
	},
	
	isEmpty: function(target) {
		return target.length === 0;
	},
	
	clone: function(target) {
		return target.concat();
	},
	
	cmp: function(x, y, caseInsensitive) {
		var n = Math.min(x.length, y.length);
		for (var i = 0; i < n; ++i) {
			var result = JW.cmp(x[i], y[i], caseInsensitive);
			if (result) {
				return result;
			}
		}
		return JW.cmp(x.length, y.length);
	},
	
	shuffle: function(n) {
		var result = new Array(n);
		for (var i = 0; i < n; ++i) {
			result[i] = i;
		}
		for (var i = 0; i < n; ++i) {
			var j = i + Math.floor(Math.random() * (n - i));
			var t = result[i];
			result[i] = result[j];
			result[j] = t;
		}
		return result;
	}
});

JW.Array.getLength = JW.Array.getSize; // alias

JW.applyIf(
	JW.Array,
	JW.Alg.createBuildFunctions(
		JW.Array.every,
		function() { return []; },
		function(target, item) { target.push(item); }
	)
);

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Array.Indexer = function(source, config) {
	JW.Array.Indexer._super.call(this);
	this.source = source;
	this.getKey = config.getKey;
	this._targetCreated = !config.target;
	this.target = config.target || this.source.createEmptyMap();
	this.scope = config.scope;
	this.target.setAll(this._index(this.source.getItems()));
};

JW.extend(JW.Array.Indexer/*<T extends Any>*/, JW.Class, {
	/*
	Required
	JW.Array<T> source;
	String getKey(T item);
	
	Optional
	JW.Map<T> target;
	Object scope;
	
	Fields
	Boolean _targetCreated;
	*/
	
	destroy: function() {
		this.target.removeAll(this._keys(this.source.getItems()));
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_index: function(items) {
		return JW.Array.index(items, this.getKey, this.scope || this);
	},
	
	_keys: function(items) {
		return JW.Array.map(items, this.getKey, this.scope || this);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Array.Inserter = function(source, config) {
	JW.Array.Inserter._super.call(this);
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.scope = config.scope;
	this.clearItems = config.clearItems;
	this._fill();
};

JW.extend(JW.Array.Inserter/*<T extends Any>*/, JW.Class, {
	/*
	Required
	JW.Array<T> source;
	void addItem(T item, Integer index);
	void removeItem(Integer index, T item);
	
	Optional
	Object scope; // defaults to this
	void clearItems(Array<T> items);
	*/
	
	destroy: function() {
		this._clear(this.source.getItems());
		this._super();
	},
	
	_addItem: function(item, index) {
		this.addItem.call(this.scope || this, item, index);
	},
	
	_addItems: function(items, index) {
		for (var i = 0; i < items.length; ++i) {
			this._addItem(items[i], i + index);
		}
	},
	
	_removeItem: function(item, index) {
		this.removeItem.call(this.scope || this, index, item);
	},
	
	_removeItems: function(items, index) {
		for (var i = items.length - 1; i >= 0; --i) {
			this._removeItem(items[i], i + index);
		}
	},
	
	_fill: function() {
		this._addItems(this.source.getItems().concat(), 0);
	},
	
	_clear: function(items) {
		if (items.length === 0) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope || this, items);
		} else {
			this._removeItems(items, 0);
		}
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Array.Lister = function(source, config) {
	JW.Array.Lister._super.call(this);
	this.source = source;
	this._targetCreated = !config.target;
	this.target = config.target || this.source.createEmptySet();
	this.target.addAll(this.source.getItems());
};

JW.extend(JW.Array.Lister/*<T extends JW.Class>*/, JW.Class, {
	/*
	Required
	JW.Array<T> source;
	
	Optional
	JW.Set<T> target;
	
	Fields
	Boolean _targetCreated;
	*/
	
	destroy: function() {
		this.target.removeAll(this.source.getItems());
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Array.Mapper = function(source, config) {
	JW.Array.Mapper._super.call(this);
	this.source = source;
	this.createItem = config.createItem;
	this.destroyItem = config.destroyItem;
	this._targetCreated = !config.target;
	this.target = config.target || this.source.createEmpty();
	this.scope = config.scope;
	this.target.addAll(this._fill());
};

JW.extend(JW.Array.Mapper/*<S extends JW.Class, T extends JW.Class>*/, JW.Class, {
	/*
	Required
	JW.Array<S> source;
	T createItem(S data);
	void destroyItem(T item, S data);
	
	Optional
	JW.Array<T> target;
	Object scope; // defaults to this
	
	Fields
	Boolean _targetCreated;
	*/
	
	destroy: function() {
		this._clear(this.source.getItems());
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_clear: function(datas) {
		var items = this.target.clear();
		for (var i = items.length - 1; i >= 0; --i) {
			this.destroyItem.call(this.scope || this, items[i], datas[i]);
		}
	},
	
	_fill: function() {
		return JW.Array.map(this.source.getItems(), this.createItem, this.scope || this);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Array.Splitter = function(source, config) {
	JW.Array.Splitter._super.call(this);
	this.source = source;
	this._rowsCreated = !config.rows;
	this.rows = config.rows || this.source.createEmpty();
	this.capacity = config.capacity || 1;
	this._length = 0;
	
	this._inserter = this.source.createInserter({
		addItem    : this._addItem,
		removeItem : this._removeItem,
		clearItems : this._clearItems,
		scope      : this
	});
};

JW.extend(JW.Array.Splitter/*<T extends Any, R extends JW.Array<T>>*/, JW.Class, {
	/*
	Required
	JW.Array<T> source;
	
	Optional
	JW.Array<R> rows;
	Integer capacity;
	
	Fields
	Boolean _rowsCreated;
	Integer _length;
	JW.Array.Inserter<T> _inserter;
	*/
	
	destroy: function() {
		this._inserter.destroy();
		if (this._rowsCreated) {
			this.rows.destroy();
		}
		this._super();
	},
	
	createRow: function() {
		return this.source.createEmpty();
	},
	
	destroyRow: function(row) {
		row.destroy();
	},
	
	_addItem: function(item, index) {
		if (this._length % this.capacity === 0) {
			this.rows.add(this.createRow.call(this.scope || this));
		}
		var firstRow = Math.floor(index / this.capacity);
		for (var i = this.rows.getLength() - 1; i > firstRow; --i) {
			var broughtItem = this.rows.get(i - 1).remove(this.capacity - 1);
			this.rows.get(i).add(broughtItem, 0);
		}
		this.rows.get(firstRow).add(item, index % this.capacity);
		++this._length;
	},
	
	_removeItem: function(index) {
		var firstRow = Math.floor(index / this.capacity);
		this.rows.get(firstRow).remove(index % this.capacity);
		for (var i = firstRow + 1; i < this.rows.getLength(); ++i) {
			var broughtItem = this.rows.get(i).remove(0);
			this.rows.get(i - 1).add(broughtItem, this.capacity - 1);
		}
		--this._length;
		if (this._length % this.capacity === 0) {
			this.destroyRow.call(this.scope || this, this.rows.remove(this.rows.getLength() - 1));
		}
	},
	
	_clearItems: function() {
		var rows = this.rows.clear();
		this._length = 0;
		JW.Array.each(rows, this.destroyRow, this.scope || this);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
	
	----
	
	This is an adapter of array that triggers events about modifications.
	Events are taken from ActionScript's CollectionEventKind (with small
	reasonable changes).
*/

JW.Map = function(json) {
	JW.Map._super.call(this);
	this.json = {};
	this.size = 0;
	if (json) {
		this._setAll(json);
	}
};

JW.extend(JW.Map/*<T extends Any>*/, JW.Class, {
	/*
	Fields
	Map<T> json;
	Integer size;
	*/
	
	getSize: function() {
		return this.size;
	},
	
	isEmpty: function() {
		return this.size === 0;
	},
	
	contains: function(key) {
		return this.json.hasOwnProperty(key);
	},
	
	get: function(key) {
		return this.json[key];
	},
	
	set: function(item, key) {
		if (!this.json.hasOwnProperty(key)) {
			++this.size;
		}
		this.json[key] = item;
	},
	
	setAll: function(json) {
		for (var key in json) {
			this.set(json[key], key);
		}
	},
	
	remove: function(key) {
		if (this.json.hasOwnProperty(key)) {
			delete this.json[key];
			--this.size;
		}
	},
	
	removeAll: function(keys) {
		for (var i = 0, l = keys.length; i < l; ++i) {
			this.remove(keys[i]);
		}
	},
	
	clear: function() {
		this.json = {};
		this.size = 0;
	},
	
	every: function(callback, scope) {
		return JW.Map.every(this.json, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.Map();
	},
	
	equal: function(map) {
		if (this === map) {
			return true;
		}
		if (this.getSize() !== map.getSize()) {
			return false;
		}
		var json = this.json;
		for (var key in json) {
			if (map.get(key) !== json[key]) {
				return false;
			}
		}
		return true;
	}
});

JW.Map.prototype.getLength = JW.Map.prototype.getSize;
JW.Map.prototype.pushItem = JW.Map.prototype.set;

JW.applyIf(JW.Map.prototype, JW.Alg.BuildMethods);

JW.apply(JW.Map, {
	get: function(target, key) {
		return target[key];
	},
	
	set: function(target, item, key) {
		target[key] = item;
	},
	
	setAll: function(target, map) {
		for (var key in map) {
			target[key] = map[key];
		}
	},
	
	remove: function(target, key) {
		delete target[key];
	},
	
	removeAll: function(target, keys) {
		for (var i = 0, l = keys.length; i < l; ++i) {
			delete target[keys[i]];
		}
	},
	
	clear: function(target) {
		var keys = [];
		for (var key in target) {
			keys.push(key);
		}
		for (var i = 0, l = keys.length; i < l; ++i) {
			delete target[keys[i]];
		}
	},
	
	every: function(target, callback, scope) {
		for (var key in target) {
			if (callback.call(scope || target, target[key], key, target) === false) {
				return false;
			}
		}
		return true;
	},
	
	equal: function(x, y) {
		if (x === y) {
			return true;
		}
		var size = JW.Map.getSize(y);
		for (var key in x) {
			if ((--size < 0) || (x[key] !== y[key])) {
				return false;
			}
		}
		return size === 0;
	},
	
	clone: function(target) {
		return JW.apply({}, target);
	}
});

JW.applyIf(
	JW.Map,
	JW.Alg.createBuildFunctions(
		JW.Map.every,
		function() { return {}; },
		function(target, item, key) { target[key] = item; }
	)
);

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
	
	----
	
	This is an adapter of array that triggers events about modifications.
	Events are taken from ActionScript's CollectionEventKind (with small
	reasonable changes).
*/

JW.Set = function(json) {
	JW.Set._super.call(this);
	this.json = {};
	this.size = 0;
	if (json) {
		this._addAll(json);
	}
};

JW.extend(JW.Set/*<T extends JW.Class>*/, JW.Class, {
	/*
	Fields
	Map<T> json;
	Integer size;
	*/
	
	getSize: function() {
		return this.size;
	},
	
	isEmpty: function() {
		return this.size === 0;
	},
	
	contains: function(item) {
		return this.json.hasOwnProperty(item._iid);
	},
	
	add: function(item) {
		if (!this.json.hasOwnProperty(item._iid)) {
			this.json[item._iid] = item;
			++this.size;
		}
	},
	
	addAll: function(items) {
		for (var i = 0, l = items.length; i < l; ++i) {
			this.add(items[i]);
		}
	},
	
	remove: function(item) {
		if (this.json.hasOwnProperty(item._iid)) {
			delete this.json[item._iid];
			--this.size;
		}
	},
	
	removeAll: function(items) {
		for (var i = 0, l = items.length; i < l; ++i) {
			this.remove(items[i]);
		}
	},
	
	clear: function() {
		this.json = {};
		this.size = 0;
	},
	
	every: function(callback, scope) {
		return JW.Set.every(this.json, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.Set();
	}
});

JW.Set.prototype.getLength = JW.Set.prototype.getSize;
JW.Set.prototype.pushItem = JW.Set.prototype.add;

JW.applyIf(JW.Set.prototype, JW.Alg.BuildMethods);

JW.apply(JW.Set, {
	contains: function(target, item) {
		return target.hasOwnProperty(item._iid);
	},
	
	add: function(target, item) {
		target[item._iid] = item;
	},
	
	addAll: function(target, items) {
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			target[item._iid] = item;
		}
	},
	
	remove: function(target, item) {
		delete target[item._iid];
	},
	
	removeAll: function(target, items) {
		for (var i = 0, l = items.length; i < l; ++i) {
			delete target[items[i]._iid];
		}
	},
	
	clear: JW.Map.clear,
	
	every: function(target, callback, scope) {
		for (var key in target) {
			if (callback.call(scope || target, target[key], undefined, target) === false) {
				return false;
			}
		}
		return true;
	},
	
	clone: JW.Map.clone
});

JW.applyIf(
	JW.Set,
	JW.Alg.createBuildFunctions(
		JW.Set.every,
		function() { return {}; },
		function(target, item) { target[item._iid] = item; }
	)
);

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// TODO: tests for bulk changes

JW.ObservableArray = function(items) {
	JW.ObservableArray._super.call(this);
	this.array = [];
	this.addEvent = new JW.Event();
	this.removeEvent = new JW.Event();
	this.replaceEvent = new JW.Event();
	this.moveEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.reorderEvent = new JW.Event();
	this.filterEvent = new JW.Event();
	this.resetEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.lengthChangeEvent = new JW.Event();
	this.bulkCount = 0;
	this.bulkDirty = false;
	this.bulkLength = 0;
	if (items) {
		this.addAll(items);
	}
};

JW.extend(JW.ObservableArray/*<T extends Any>*/, JW.Class, {
	/*
	Fields
	Array<T> array;
	JW.Event<JW.ObservableArray.ItemRangeEventParams<T>> addEvent;
	JW.Event<JW.ObservableArray.ItemRangeEventParams<T>> removeEvent;
	JW.Event<JW.ObservableArray.ReplaceEventParams<T>> replaceEvent;
	JW.Event<JW.ObservableArray.MoveEventParams<T>> moveEvent;
	JW.Event<JW.ObservableArray.ItemsEventParams<T>> clearEvent;
	JW.Event<JW.ObservableArray.ItemsEventParams<T>> reorderEvent;
	JW.Event<JW.ObservableArray.ItemsEventParams<T>> filterEvent;
	JW.Event<JW.ObservableArray.ItemsEventParams<T>> resetEvent;
	JW.Event<JW.ObservableArray.EventParams<T>> changeEvent;
	JW.Event<JW.ObservableArray.LengthChangeEventParams<T>> lengthChangeEvent;
	Integer bulkCount;
	Boolean bulkDirty;
	Integer bulkLength;
	*/
	
	destroy: function() {
		this.clear();
		this.lengthChangeEvent.destroy();
		this.changeEvent.destroy();
		this.resetEvent.destroy();
		this.filterEvent.destroy();
		this.reorderEvent.destroy();
		this.clearEvent.destroy();
		this.moveEvent.destroy();
		this.replaceEvent.destroy();
		this.removeEvent.destroy();
		this.addEvent.destroy();
		this._super();
	},
	
	getSize: function() {
		return this.array.length;
	},
	
	isEmpty: function() {
		return this.array.length === 0;
	},
	
	get: function(index) {
		return this.array[index];
	},
	
	add: function(item, index) {
		if (index === undefined) {
			index = this.getLength();
		}
		this.array.splice(index, 0, item);
		this.addEvent.trigger(new JW.ObservableArray.ItemRangeEventParams(this, [ item ], index));
		this._triggerChange();
	},
	
	addAll: function(items, index) {
		if (items.length === 0) {
			return;
		}
		if (index === undefined) {
			index = this.getLength();
		}
		JW.Array.addAll(this.array, items, index);
		this.addEvent.trigger(new JW.ObservableArray.ItemRangeEventParams(this, items, index));
		this._triggerChange();
	},
	
	remove: function(index, count) {
		var items = this.array.splice(index, JW.def(count, 1));
		this.removeEvent.trigger(new JW.ObservableArray.ItemRangeEventParams(this, items, index));
		this._triggerChange();
		return (count === undefined) ? items[0] : items;
	},
	
	set: function(item, index) {
		var oldItem = this.array[index];
		if (oldItem === item) {
			return oldItem;
		}
		this.array[index] = item;
		this.replaceEvent.trigger(new JW.ObservableArray.ReplaceEventParams(this, index, oldItem, item));
		this._triggerChange();
		return oldItem;
	},
	
	move: function(fromIndex, toIndex) {
		var item = this.array[fromIndex];
		if (fromIndex === toIndex) {
			return item;
		};
		JW.Array.move(this.array, fromIndex, toIndex);
		this.moveEvent.trigger(new JW.ObservableArray.MoveEventParams(this, fromIndex, toIndex, item));
		this._triggerChange();
		return item;
	},
	
	clear: function() {
		if (this.isEmpty()) {
			return [];
		}
		var items = JW.Array.clear(this.array);
		this.clearEvent.trigger(new JW.ObservableArray.ItemsEventParams(this, items));
		this._triggerChange();
		return items;
	},
	
	performReorder: function(callback, scope) {
		this._perform(this.reorderEvent, callback, scope);
	},
	
	performFilter: function(callback, scope) {
		this._perform(this.filterEvent, callback, scope);
	},
	
	performReset: function(callback, scope) {
		this._perform(this.resetEvent, callback, scope);
	},
	
	startBulkChange: function() {
		if (this.bulkCount === 0) {
			this.bulkDirty = false;
		}
		++this.bulkCount;
	},
	
	stopBulkChange: function() {
		if (this.bulkCount === 0) {
			return;
		}
		--this.bulkCount;
		if (this.bulkDirty) {
			this._triggerChange();
		}
	},
	
	every: function(callback, scope) {
		return JW.Array.every(this.array, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.ObservableArray();
	},
	
	createEmptyMap: function() {
		return new JW.ObservableMap();
	},
	
	createEmptySet: function() {
		return new JW.ObservableSet();
	},
	
	getItems: function() {
		return this.array;
	},
	
	createIndexer: function(config) {
		return new JW.ObservableArray.Indexer(this, config);
	},
	
	createInserter: function(config) {
		return new JW.ObservableArray.Inserter(this, config);
	},
	
	createLister: function(config) {
		return new JW.ObservableArray.Lister(this, config);
	},
	
	createMapper: function(config) {
		return new JW.ObservableArray.Mapper(this, config);
	},
	
	createSplitter: function(config) {
		return new JW.Array.Splitter(this, config);
	},
	
	_triggerChange: function() {
		if (this.bulkCount !== 0) {
			this.bulkDirty = true;
			return;
		}
		this.changeEvent.trigger(new JW.ObservableArray.EventParams(this));
		var length = this.getLength();
		if (this.bulkLength !== length) {
			this.lengthChangeEvent.trigger(new JW.ObservableArray.LengthChangeEventParams(this, this.bulkLength, length));
			this.bulkLength = length;
		}
	},
	
	_perform: function(event, callback, scope) {
		var params = new JW.ObservableArray.ItemsEventParams(this, this.array.concat());
		var items = callback.call(scope || this, this.array);
		if (items && (items !== this.array)) {
			JW.Array.clear(this.array);
			JW.Array.pushAll(this.array, items);
		}
		event.trigger(params);
		this._triggerChange();
	}
});

JW.ObservableArray.prototype.getLength = JW.ObservableArray.prototype.getSize;
JW.ObservableArray.prototype.pushItem = JW.ObservableArray.prototype.add;

JW.apply(JW.ObservableArray.prototype, JW.Alg.BuildMethods);

JW.ObservableArray.EventParams = function(sender) {
	JW.ObservableArray.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableArray.EventParams/*<T extends Any>*/, JW.EventParams, {
	/*
	Fields
	JW.ObservableArray<T> sender;
	*/
});

JW.ObservableArray.ItemRangeEventParams = function(sender, items, index) {
	JW.ObservableArray.ItemRangeEventParams._super.call(this, sender);
	this.items = items;
	this.index = index;
};

JW.extend(JW.ObservableArray.ItemRangeEventParams/*<T extends Any>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/*
	Fields
	Array<T> items;
	Integer index;
	*/
});

JW.ObservableArray.ItemsEventParams = function(sender, items) {
	JW.ObservableArray.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableArray.ItemsEventParams/*<T extends Any>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/*
	Fields
	Array<T> items;
	*/
});

JW.ObservableArray.LengthChangeEventParams = function(sender, oldLength, newLength) {
	JW.ObservableArray.LengthChangeEventParams._super.call(this, sender);
	this.oldLength = oldLength;
	this.newLength = newLength;
};

JW.extend(JW.ObservableArray.LengthChangeEventParams/*<T extends Any>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/*
	Fields
	Integer oldLength;
	Integer newLength;
	*/
});

JW.ObservableArray.MoveEventParams = function(sender, fromIndex, toIndex, item) {
	JW.ObservableArray.MoveEventParams._super.call(this, sender);
	this.fromIndex = fromIndex;
	this.toIndex = toIndex;
	this.item = item;
};

JW.extend(JW.ObservableArray.MoveEventParams/*<T extends Any>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/*
	Fields
	Integer fromIndex;
	Integer toIndex;
	T item;
	*/
});

JW.ObservableArray.ReplaceEventParams = function(sender, index, oldItem, newItem) {
	JW.ObservableArray.ReplaceEventParams._super.call(this, sender);
	this.index = index;
	this.oldItem = oldItem;
	this.newItem = newItem;
};

JW.extend(JW.ObservableArray.ReplaceEventParams/*<T extends Any>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/*
	Fields
	Integer index;
	T oldItem;
	T newItem;
	*/
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ObservableArray.Indexer = function(source, config) {
	JW.ObservableArray.Indexer._super.call(this, source, config);
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this._replaceEventAttachment = this.source.replaceEvent.bind(this._onReplace, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
	this._filterEventAttachment = this.source.filterEvent.bind(this._onFilter, this);
	this._resetEventAttachment = this.source.resetEvent.bind(this._onReset, this);
};

JW.extend(JW.ObservableArray.Indexer/*<T extends Any>*/, JW.Array.Indexer/*<T>*/, {
	/*
	Required
	JW.ObservableArray<T> source;
	
	Optional
	JW.ObservableMap<T> target;
	
	Fields
	EventAttachment _addEventAttachment;
	EventAttachment _removeEventAttachment;
	EventAttachment _replaceEventAttachment;
	EventAttachment _clearEventAttachment;
	EventAttachment _filterEventAttachment;
	EventAttachment _resetEventAttachment;
	*/
	
	destroy: function() {
		this._resetEventAttachment.destroy();
		this._filterEventAttachment.destroy();
		this._clearEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._removeEventAttachment.destroy();
		this._addEventAttachment.destroy();
		this._super();
	},
	
	_onAdd: function(params) {
		this.target.setAll(this._index(params.items));
	},
	
	_onRemove: function(params) {
		this.target.removeAll(this._keys(params.items));
	},
	
	_onReplace: function(params) {
		this.target._remove(this.getKey.call(this.scope || this, params.oldItem));
		this.target._set(params.newItem, this.getKey.call(this.scope || this, params.newItem));
		this.target._triggerChange();
	},
	
	_onClear: function(params) {
		this.target.removeAll(this._keys(params.items));
	},
	
	_onFilter: function(params) {
		var map = this._index(this.source.array);
		var keys = this._keys(params.items);
		this.target.removeAll(JW.Array.filter(keys, function(key) {
			return !map.hasOwnProperty(key);
		}, this));
	},
	
	_onReset: function(params) {
		this.target._removeAll(this._keys(params.items));
		this.target._setAll(this._index(this.source.array));
		this.target._triggerChange();
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// TODO: Filter from end to begin

JW.ObservableArray.Inserter = function(source, config) {
	JW.ObservableArray.Inserter._super.call(this, source, config);
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this._replaceEventAttachment = this.source.replaceEvent.bind(this._onReplace, this);
	this._moveEventAttachment = this.source.moveEvent.bind(this._onMove, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
	this._reorderEventAttachment = this.source.reorderEvent.bind(this._onReorder, this);
	this._filterEventAttachment = this.source.filterEvent.bind(this._onFilter, this);
	this._resetEventAttachment = this.source.resetEvent.bind(this._onReset, this);
};

JW.extend(JW.ObservableArray.Inserter/*<T extends Any>*/, JW.Array.Inserter/*<T>*/, {
	/*
	Required
	JW.ObservableArray<T> source;
	
	Fields
	EventAttachment _addEventAttachment;
	EventAttachment _removeEventAttachment;
	EventAttachment _replaceEventAttachment;
	EventAttachment _moveEventAttachment;
	EventAttachment _clearEventAttachment;
	EventAttachment _reorderEventAttachment;
	EventAttachment _filterEventAttachment;
	EventAttachment _resetEventAttachment;
	*/
	
	destroy: function() {
		this._addEventAttachment.destroy();
		this._removeEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._moveEventAttachment.destroy();
		this._clearEventAttachment.destroy();
		this._reorderEventAttachment.destroy();
		this._filterEventAttachment.destroy();
		this._resetEventAttachment.destroy();
		this._super();
	},
	
	_onAdd: function(params) {
		this._addItems(params.items, params.index);
	},
	
	_onRemove: function(params) {
		this._removeItems(params.items, params.index);
	},
	
	_onReplace: function(params) {
		this._removeItem(params.oldItem, params.index);
		this._addItem(params.newItem, params.index);
	},
	
	_onMove: function(params) {
		this._removeItem(params.item, params.fromIndex);
		this._addItem(params.item, params.toIndex);
	},
	
	_onClear: function(params) {
		this._clear(params.items);
	},
	
	_onReorder: function(params) {
		this._clear(params.items);
		this._fill();
	},
	
	_onFilter: function(params) {
		var array = this.source.array;
		var items = params.items;
		
		// if there is an effective clearing function, just reset the controller
		if (this.clearItems && (3 * array.length < items.length)) {
			this._clear(items);
			this._fill();
			return;
		}
		
		// else, remove specific elements
		var arrayIndex = 0;
		for (var itemsIndex = 0, l = items.length; itemsIndex < l; ++itemsIndex) {
			var item = items[itemsIndex];
			if (item === array[arrayIndex]) {
				++arrayIndex;
			} else {
				this._removeItem(item, arrayIndex);
			}
		}
	},
	
	_onReset: function(params) {
		this._clear(params.items);
		this._fill();
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ObservableArray.Lister = function(source, config) {
	JW.ObservableArray.Lister._super.call(this, source, config);
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this._replaceEventAttachment = this.source.replaceEvent.bind(this._onReplace, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
	this._filterEventAttachment = this.source.filterEvent.bind(this._onFilter, this);
	this._resetEventAttachment = this.source.resetEvent.bind(this._onReset, this);
};

JW.extend(JW.ObservableArray.Lister/*<T extends JW.Class>*/, JW.Array.Lister/*<T>*/, {
	/*
	Required
	JW.ObservableArray<T> source;
	
	Optional
	JW.ObservableSet<T> target;
	
	Fields
	EventAttachment _addEventAttachment;
	EventAttachment _removeEventAttachment;
	EventAttachment _replaceEventAttachment;
	EventAttachment _clearEventAttachment;
	EventAttachment _filterEventAttachment;
	EventAttachment _resetEventAttachment;
	*/
	
	destroy: function() {
		this._resetEventAttachment.destroy();
		this._filterEventAttachment.destroy();
		this._clearEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._removeEventAttachment.destroy();
		this._addEventAttachment.destroy();
		this._super();
	},
	
	_onAdd: function(params) {
		this.target.addAll(params.items);
	},
	
	_onRemove: function(params) {
		this.target.removeAll(params.items);
	},
	
	_onReplace: function(params) {
		this.target._remove(params.oldItem);
		this.target._add(params.newItem);
		this.target._triggerChange();
	},
	
	_onClear: function() {
		this.target.clear();
	},
	
	_onFilter: function() {
		var map = JW.Array.indexBy(this.source.array, "_iid");
		var items = [];
		var json = this.target.set.json;
		for (var iid in json) {
			if (!map.hasOwnProperty(iid)) {
				items.push(json[iid]);
			}
		}
		this.target.removeAll(items);
	},
	
	_onReset: function() {
		this.target._clear();
		this.target._addAll(this.source.array);
		this.target._triggerChange();
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// TODO: Synchronize changeEvent and lengthChangeEvent in bulk operations
// TODO: Filter from end to begin

JW.ObservableArray.Mapper = function(source, config) {
	JW.ObservableArray.Mapper._super.call(this, source, config);
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this._replaceEventAttachment = this.source.replaceEvent.bind(this._onReplace, this);
	this._moveEventAttachment = this.source.moveEvent.bind(this._onMove, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
	this._reorderEventAttachment = this.source.reorderEvent.bind(this._onReorder, this);
	this._filterEventAttachment = this.source.filterEvent.bind(this._onFilter, this);
	this._resetEventAttachment = this.source.resetEvent.bind(this._onReset, this);
};

JW.extend(JW.ObservableArray.Mapper/*<S extends JW.Class, T extends JW.Class>*/, JW.Array.Mapper/*<S, T>*/, {
	/*
	Required
	JW.ObservableArray<S> source;
	
	Optional
	JW.ObservableArray<T> target;
	
	Fields
	EventAttachment _addEventAttachment;
	EventAttachment _removeEventAttachment;
	EventAttachment _replaceEventAttachment;
	EventAttachment _moveEventAttachment;
	EventAttachment _clearEventAttachment;
	EventAttachment _reorderEventAttachment;
	EventAttachment _filterEventAttachment;
	EventAttachment _resetEventAttachment;
	*/
	
	destroy: function() {
		this._addEventAttachment.destroy();
		this._removeEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._moveEventAttachment.destroy();
		this._clearEventAttachment.destroy();
		this._reorderEventAttachment.destroy();
		this._filterEventAttachment.destroy();
		this._resetEventAttachment.destroy();
		this._super();
	},
	
	getKey: function(data) {
		return data._iid;
	},
	
	_onAdd: function(params) {
		var items = new Array(params.items.length);
		for (var i = 0; i < items.length; ++i) {
			items[i] = this.createItem.call(this.scope || this, params.items[i]);
		}
		this.target.addAll(items, params.index);
	},
	
	_onRemove: function(params) {
		var items = this.target.remove(params.index, params.items.length);
		for (var i = 0; i < items.length; ++i) {
			this.destroyItem.call(this.scope || this, items[i], params.items[i]);
		}
	},
	
	_onReplace: function(params) {
		var newItem = this.createItem.call(this.scope || this, params.newItem);
		var oldItem = this.target.set(newItem, params.index);
		this.destroyItem.call(this.scope || this, oldItem, params.oldItem);
	},
	
	_onMove: function(params) {
		this.target.move(params.fromIndex, params.toIndex);
	},
	
	_onClear: function(params) {
		this._clear(params.items);
	},
	
	_onReorder: function(params) {
		this.target.performReorder(function(items) {
			var datas = params.items;
			var itemMap = {};
			for (var i = 0, l = datas.length; i < l; ++i) {
				var data = datas[i];
				var item = items[i];
				var key = this.getKey.call(this.scope || this, data);
				itemMap[key] = itemMap[key] || [];
				itemMap[key].push([ data, item ]);
			}
			
			JW.Array.clear(items);
			JW.Array.every(this.source.array, function(data, index) {
				var arr = itemMap[this.getKey.call(this.scope || this, data)];
				var pair = JW.Array.searchBy(arr, "0", data);
				var item = pair[1];
				items.push(item);
			}, this);
		}, this);
	},
	
	_onFilter: function(params) {
		var deletedItems = [];
		
		this.target.performFilter(function(items) {
			var datas = params.items;
			var snapshot = JW.Array.clear(items);
			
			var collectionIndex = 0;
			JW.Array.every(datas, function(snapshotData, snapshotIndex) {
				var item = snapshot[snapshotIndex];
				var collectionData = this.source.get(collectionIndex);
				if (snapshotData !== collectionData) {
					deletedItems.push([ item, snapshotData ]);
					return;
				}
				items.push(item);
				++collectionIndex;
			}, this);
		}, this);
		
		for (var i = 0; i < deletedItems.length; ++i) {
			var pair = deletedItems[i];
			this.destroyItem.call(this.scope || this, pair[0], pair[1]);
		}
	},
	
	_onReset: function(params) {
		var datas = params.items;
		var snapshot;
		
		this.target.performReset(function(items) {
			snapshot = JW.Array.clear(items);
			JW.Array.addAll(items, this._fill());
		}, this);
		
		for (var i = 0; i < snapshot.length; ++i) {
			this.destroyItem.call(this.scope || this, snapshot[i], datas[i]);
		}
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
	
	----
	
	This is an adapter of array that triggers events about modifications.
	Events are taken from ActionScript's CollectionEventKind (with small
	reasonable changes).
*/

JW.ObservableMap = function(json) {
	JW.ObservableMap._super.call(this);
	this.map = new JW.Map();
	this.addEvent = new JW.Event();
	this.removeEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.sizeChangeEvent = new JW.Event();
	this.bulkCount = 0;
	this.bulkDirty = false;
	this.bulkSize = 0;
	if (json) {
		this._setAll(json);
	}
};

JW.extend(JW.ObservableMap/*<T extends Any>*/, JW.Class, {
	/*
	Fields
	JW.Map<T> map;
	JW.Event<JW.ObservableMap.ItemEventParams<T>> addEvent;
	JW.Event<JW.ObservableMap.ItemEventParams<T>> removeEvent;
	JW.Event<JW.ObservableMap.EventParams<T>> changeEvent;
	JW.Event<JW.ObservableMap.SizeChangeEventParams<T>> sizeChangeEvent;
	Integer bulkCount;
	Boolean bulkDirty;
	Integer bulkSize;
	*/
	
	destroy: function() {
		this.clear();
		this.sizeChangeEvent.destroy();
		this.changeEvent.destroy();
		this.removeEvent.destroy();
		this.addEvent.destroy();
		this._super();
	},
	
	getSize: function() {
		return this.map.size;
	},
	
	isEmpty: function() {
		return this.map.size === 0;
	},
	
	contains: function(key) {
		return this.map.json.hasOwnProperty(key);
	},
	
	get: function(key) {
		return this.map.json[key];
	},
	
	set: function(item, key) {
		if (this._set(item, key)) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	setAll: function(map) {
		if (this._setAll(map)) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	remove: function(key) {
		var item = this._remove(key);
		if (item !== undefined) {
			this._triggerChange();
		}
		return item;
	},
	
	removeAll: function(keys) {
		if (this._removeAll(keys)) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	clear: function() {
		if (this._clear()) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	startBulkChange: function() {
		++this.bulkCount;
		if (this.bulkCount !== 1) {
			return;
		}
		this.bulkDirty = false;
	},
	
	stopBulkChange: function() {
		if (this.bulkCount === 0) {
			return;
		}
		--this.bulkCount;
		if (this.bulkDirty) {
			this._triggerChange();
		}
	},
	
	every: function(callback, scope) {
		return JW.Map.every(this.map.json, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.ObservableMap();
	},
	
	_set: function(item, key) {
		if (item === undefined) {
			return false;
		}
		var oldItem = this.map.json[key];
		if (oldItem === item) {
			return false;
		}
		this._remove(key);
		this.map.set(item, key);
		this.addEvent.trigger(new JW.ObservableMap.ItemEventParams(this, item, key));
		return true;
	},
	
	_setAll: function(map) {
		var changed = false;
		for (var key in map) {
			changed = this._set(map[key], key) || changed;
		}
		return changed;
	},
	
	_remove: function(key) {
		if (!this.map.json.hasOwnProperty(key)) {
			return undefined;
		}
		var item = this.map.json[key];
		this.map.remove(key);
		this.removeEvent.trigger(new JW.ObservableMap.ItemEventParams(this, item, key));
		return item;
	},
	
	_removeAll: function(keys) {
		var changed = false;
		for (var i = 0, l = keys.length; i < l; ++i) {
			changed = (this._remove(keys[i]) === undefined) ? changed : true;
		}
		return changed;
	},
	
	_clear: function() {
		if (this.map.size === 0) {
			return false;
		}
		var json = JW.Map.clone(this.map.json);
		for (var key in json) {
			this._remove(key);
		}
		return true;
	},
	
	_triggerChange: function() {
		if (this.bulkCount !== 0) {
			this.bulkDirty = true;
			return;
		}
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		if (this.bulkSize !== this.map.size) {
			this.sizeChangeEvent.trigger(new JW.ObservableMap.SizeChangeEventParams(this, this.bulkSize, this.map.size));
			this.bulkSize = this.map.size;
		}
	}
});

JW.ObservableMap.prototype.getLength = JW.ObservableMap.prototype.getSize;
JW.ObservableMap.prototype.pushItem = JW.ObservableMap.prototype.set;

JW.applyIf(JW.ObservableMap.prototype, JW.Alg.BuildMethods);

JW.ObservableMap.EventParams = function(sender) {
	JW.ObservableMap.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableMap.EventParams/*<T extends Any>*/, JW.EventParams, {
	/*
	Fields
	JW.ObservableMap<T> sender;
	*/
});

JW.ObservableMap.ItemEventParams = function(sender, item, key) {
	JW.ObservableMap.ItemEventParams._super.call(this, sender);
	this.item = item;
	this.key = key;
};

JW.extend(JW.ObservableMap.ItemEventParams/*<T extends Any>*/, JW.ObservableMap.EventParams/*<T>*/, {
	/*
	Fields
	T item;
	String key;
	*/
});

JW.ObservableMap.SizeChangeEventParams = function(sender, oldSize, newSize) {
	JW.ObservableMap.SizeChangeEventParams._super.call(this, sender);
	this.oldSize = oldSize;
	this.newSize = newSize;
};

JW.extend(JW.ObservableMap.SizeChangeEventParams/*<T extends Any>*/, JW.ObservableMap.EventParams/*<T>*/, {
	/*
	Fields
	Integer oldSize;
	Integer newSize;
	*/
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ObservableMap.Lister = function(config) {
	JW.ObservableMap.Lister._super.call(this);
	this.source = config.source;
	this._targetCreated = !config.target;
	this.target = config.target || new JW.ObservableSet();
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this._changeEventAttachment = this.source.changeEvent.bind(this._onChange, this);
	this.target.addAll(this.source.getValuesArray());
};

JW.extend(JW.ObservableMap.Lister/*<T extends JW.Class>*/, JW.Class, {
	/*
	Required
	JW.ObservableMap<T> source;
	
	Optional
	JW.ObservableSet<T> target;
	
	Fields
	Boolean _targetCreated;
	EventAttachment _addEventAttachment;
	EventAttachment _removeEventAttachment;
	EventAttachment _changeEventAttachment;
	*/
	
	destroy: function() {
		this.target.clear();
		this._changeEventAttachment.destroy();
		this._removeEventAttachment.destroy();
		this._addEventAttachment.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_add: function(item) {
		this.target._add(item);
	},
	
	_remove: function(item) {
		this.target._remove(item);
	},
	
	_onAdd: function(params) {
		this._add(params.item);
	},
	
	_onRemove: function(params) {
		this._remove(params.item);
	},
	
	_onChange: function() {
		this.target._triggerChange();
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ObservableMap.Mapper = function(config) {
	JW.ObservableMap.Mapper._super.call(this);
	this.source = config.source;
	this.createItem = config.createItem;
	this.destroyItem = config.destroyItem;
	this._targetCreated = !config.target;
	this.target = config.target || new JW.ObservableMap();
	this.scope = config.scope;
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this._changeEventAttachment = this.source.changeEvent.bind(this._onChange, this);
	this._destructionQueue = [];
	this.target.setAll(JW.Map.map(this.source.map.json, this.createItem, this.scope || this));
};

JW.extend(JW.ObservableMap.Mapper/*<S extends Any, T extends Any>*/, JW.Class, {
	/*
	Required
	JW.ObservableMap<S> source;
	T createItem(S data, String key);
	void destroyItem(T item, S data, String key);
	
	Optional
	JW.ObservableMap<T> target;
	Object scope; // defaults to this
	
	Fields
	Boolean _targetCreated;
	EventAttachment _addEventAttachment;
	EventAttachment _removeEventAttachment;
	EventAttachment _changeEventAttachment;
	Array<Array> _destructionQueue;
	*/
	
	destroy: function() {
		if (!this.source.isEmpty()) {
			this.source.every(this._remove, this);
			this._change();
		}
		this._changeEventAttachment.destroy();
		this._removeEventAttachment.destroy();
		this._addEventAttachment.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_remove: function(data, key) {
		this._destructionQueue.push([ this.target._remove(key), data, key ]);
	},
	
	_change: function() {
		this.target._triggerChange();
		for (var i = 0; i < this._destructionQueue.length; ++i) {
			var params = this._destructionQueue[i];
			this.destroyItem.call(this.scope || this, params[0], params[1], params[2]);
		}
		this._destructionQueue = [];
	},
	
	_onAdd: function(params) {
		this.target._set(this.createItem.call(this.scope || this, params.item, params.key), params.key);
	},
	
	_onRemove: function(params) {
		this._remove(params.item, params.key);
	},
	
	_onChange: function(params) {
		this._change();
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
	
	----
	
	This is an adapter of array that triggers events about modifications.
	Events are taken from ActionScript's CollectionEventKind (with small
	reasonable changes).
*/

JW.ObservableSet = function(items) {
	JW.ObservableSet._super.call(this);
	this.set = new JW.Set();
	this.addEvent = new JW.Event();
	this.removeEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.sizeChangeEvent = new JW.Event();
	this.bulkCount = 0;
	this.bulkDirty = false;
	this.bulkSize = 0;
	if (items) {
		this._addAll(items);
	}
};

JW.extend(JW.ObservableSet/*<T extends JW.Class>*/, JW.Class, {
	/*
	Fields
	JW.Set<T> set;
	JW.Event<JW.ObservableSet.ItemEventParams<T>> addEvent;
	JW.Event<JW.ObservableSet.ItemEventParams<T>> removeEvent;
	JW.Event<JW.ObservableSet.EventParams<T>> changeEvent;
	JW.Event<JW.ObservableSet.SizeChangeEventParams<T>> sizeChangeEvent;
	Integer bulkCount;
	Boolean bulkDirty;
	Integer bulkSize;
	*/
	
	destroy: function() {
		this.clear();
		this.sizeChangeEvent.destroy();
		this.changeEvent.destroy();
		this.removeEvent.destroy();
		this.addEvent.destroy();
		this._super();
	},
	
	getSize: function() {
		return this.set.size;
	},
	
	isEmpty: function() {
		return this.set.size === 0;
	},
	
	contains: function(item) {
		return this.set.json.hasOwnProperty(item._iid);
	},
	
	add: function(item) {
		if (this._add(item)) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	addAll: function(items) {
		if (this._addAll(items)) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	remove: function(item) {
		if (this._remove(item)) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	removeAll: function(items) {
		var changed = false;
		for (var i = 0, l = items.length; i < l; ++i) {
			changed = this._remove(items[i]) || changed;
		}
		if (changed) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	clear: function() {
		if (this._clear()) {
			this._triggerChange();
			return true;
		}
		return false;
	},
	
	startBulkChange: function() {
		++this.bulkCount;
		if (this.bulkCount !== 1) {
			return;
		}
		this.bulkDirty = false;
	},
	
	stopBulkChange: function() {
		if (this.bulkCount === 0) {
			return;
		}
		--this.bulkCount;
		if (this.bulkDirty) {
			this._triggerChange();
		}
	},
	
	every: function(callback, scope) {
		return JW.Set.every(this.set.json, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.ObservableSet();
	},
	
	_add: function(item) {
		if (this.set.json[item._iid]) {
			return false;
		}
		this.set.add(item);
		this.addEvent.trigger(new JW.ObservableSet.ItemEventParams(this, item));
		return true;
	},
	
	_addAll: function(items) {
		var changed = false;
		for (var i = 0, l = items.length; i < l; ++i) {
			changed = this._add(items[i]) || changed;
		}
		return changed;
	},
	
	_remove: function(item) {
		if (!this.set.json[item._iid]) {
			return false;
		}
		this.set.remove(item);
		this.removeEvent.trigger(new JW.ObservableSet.ItemEventParams(this, item));
		return true;
	},
	
	_clear: function() {
		if (this.set.size === 0) {
			return false;
		}
		var json = JW.Set.clone(this.set.json);
		for (var key in json) {
			this._remove(json[key]);
		}
		return true;
	},
	
	_triggerChange: function() {
		if (this.bulkCount !== 0) {
			this.bulkDirty = true;
			return;
		}
		this.changeEvent.trigger(new JW.ObservableSet.EventParams(this));
		if (this.bulkSize !== this.set.size) {
			this.sizeChangeEvent.trigger(new JW.ObservableSet.SizeChangeEventParams(this, this.bulkSize, this.set.size));
			this.bulkSize = this.set.size;
		}
	}
});

JW.ObservableSet.prototype.getLength = JW.ObservableSet.prototype.getSize;
JW.ObservableSet.prototype.pushItem = JW.ObservableSet.prototype.add;

JW.applyIf(JW.ObservableSet.prototype, JW.Alg.BuildMethods);

JW.ObservableSet.EventParams = function(sender) {
	JW.ObservableSet.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableSet.EventParams/*<T extends JW.Class>*/, JW.EventParams, {
	/*
	Fields
	JW.ObservableSet<T> sender;
	*/
});

JW.ObservableSet.ItemEventParams = function(sender, item) {
	JW.ObservableSet.ItemEventParams._super.call(this, sender);
	this.item = item;
};

JW.extend(JW.ObservableSet.ItemEventParams/*<T extends JW.Class>*/, JW.ObservableSet.EventParams/*<T>*/, {
	/*
	Fields
	T item;
	*/
});

JW.ObservableSet.SizeChangeEventParams = function(sender, oldSize, newSize) {
	JW.ObservableSet.SizeChangeEventParams._super.call(this, sender);
	this.oldSize = oldSize;
	this.newSize = newSize;
};

JW.extend(JW.ObservableSet.SizeChangeEventParams/*<T extends JW.Class>*/, JW.ObservableSet.EventParams/*<T>*/, {
	/*
	Fields
	Integer oldSize;
	Integer newSize;
	*/
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ObservableSet.Indexer = function(config) {
	JW.ObservableSet.Indexer._super.call(this);
	this.source = config.source;
	this.getKey = config.getKey;
	this._targetCreated = !config.target;
	this.target = config.target || new JW.ObservableMap();
	this.scope = config.scope;
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this._changeEventAttachment = this.source.changeEvent.bind(this._onChange, this);
	if (!this.source.isEmpty()) {
		this.source.every(this._add, this);
		this.target._triggerChange();
	}
};

JW.extend(JW.ObservableSet.Indexer/*<T extends JW.Class>*/, JW.Class, {
	/*
	Required
	JW.ObservableSet<T> source;
	String getKey(T item);
	
	Optional
	JW.ObservableMap<T> target;
	Object scope;
	
	Fields
	Boolean _targetCreated;
	EventAttachment _addEventAttachment;
	EventAttachment _removeEventAttachment;
	EventAttachment _changeEventAttachment;
	*/
	
	destroy: function() {
		if (!this.source.isEmpty()) {
			this.source.every(this._remove, this);
			this.target._triggerChange();
		}
		this._changeEventAttachment.destroy();
		this._removeEventAttachment.destroy();
		this._addEventAttachment.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_add: function(item) {
		this.target._set(item, this.getKey.call(this.scope || this, item));
	},
	
	_remove: function(item) {
		this.target._remove(this.getKey.call(this.scope || this, item));
	},
	
	_onAdd: function(params) {
		this._add(params.item);
	},
	
	_onRemove: function(params) {
		this._remove(params.item);
	},
	
	_onChange: function() {
		this.target._triggerChange();
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ObservableSet.Mapper = function(config) {
	JW.ObservableSet.Mapper._super.call(this);
	this.source = config.source;
	this.createItem = config.createItem;
	this.destroyItem = config.destroyItem;
	this._targetCreated = !config.target;
	this.target = config.target || new JW.ObservableSet();
	this.scope = config.scope;
	this._items = {};
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this._changeEventAttachment = this.source.changeEvent.bind(this._onChange, this);
	this._destructionQueue = [];
	if (!this.source.isEmpty()) {
		this.source.every(this._add, this);
		this._change();
	}
};

JW.extend(JW.ObservableSet.Mapper/*<S extends JW.Class, T extends JW.Class>*/, JW.Class, {
	/*
	Required
	JW.ObservableSet<S> source;
	T createItem(S data);
	void destroyItem(T item, S data);
	
	Optional
	JW.ObservableSet<T> target;
	Object scope; // defaults to this
	
	Fields
	Boolean _targetCreated;
	Map<T> _items;
	EventAttachment _addEventAttachment;
	EventAttachment _removeEventAttachment;
	EventAttachment _changeEventAttachment;
	Array<Array> _destructionQueue;
	*/
	
	destroy: function() {
		if (!this.source.isEmpty()) {
			this.source.every(this._remove, this);
			this._change();
		}
		this._changeEventAttachment.destroy();
		this._removeEventAttachment.destroy();
		this._addEventAttachment.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_add: function(data) {
		var item = this.createItem.call(this.scope || this, data);
		this.target._add(item);
		this._items[data._iid] = item;
	},
	
	_remove: function(data) {
		var item = this._items[data._iid];
		delete this._items[data._iid];
		this.target._remove(item);
		this._destructionQueue.push([ item, data ]);
	},
	
	_change: function() {
		this.target._triggerChange();
		for (var i = 0; i < this._destructionQueue.length; ++i) {
			var params = this._destructionQueue[i];
			this.destroyItem.call(this.scope || this, params[0], params[1]);
		}
		this._destructionQueue = [];
	},
	
	_onAdd: function(params) {
		this._add(params.item);
	},
	
	_onRemove: function(params) {
		this._remove(params.item);
	},
	
	_onChange: function(params) {
		this._change();
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.makeFactory = function(cls, idField) {
	idField = idField || "id";
	
	JW.apply(cls, {
		items: {},
		
		registerItem: function(item) {
			cls.items[item[idField]] = item;
		},
		
		getItem: function(value) {
			return (value instanceof cls) ? value : cls.items[value];
		},
		
		getId: function(value) {
			return (value instanceof cls) ? value[idField] : value;
		}
	});
	
	return cls;
};

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Proxy = function(value) {
	JW.Proxy._super.call(this);
	this.value = value;
};

JW.extend(JW.Proxy/*<T extends Any>*/, JW.Class, {
	/*
	T value;
	*/
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.setInterval = function(callback, ms) {
	if (!ms) {
		return setInterval(callback, ms);
	}
	if (typeof callback == "string") {
		callback = function() { eval(callback); };
	}
	
	var lastTime = Date.getTime();
	
	function onInterval() {
		var curTime = Date.getTime();
		
		// Prevent inactive time lapses
		if (curTime - lastTime > 10 * ms) {
			lastTime = curTime - ms;
		}
		var b = true;
		while (b || (lastTime < curTime)) {
			b = false;
			lastTime += ms;
			callback();
		}
	}
	
	return setInterval(onInterval, ms);
};

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.String = {
	htmlEncode: function(target) {
		return String(target).
			replace(/&/g, "&amp;").
			replace(/>/g, "&gt;").
			replace(/</g, "&lt;").
			replace(/"/g, "&quot;");
	},
	
	htmlDecode: function(target) {
		return String(target).
			replace(/&quot;/g, '"').
			replace(/&lt;/g, "<").
			replace(/&gt;/g, ">").
			replace(/&amp;/g, "&");
	},
	
	removeScripts: function(target) {
		target = String(target);
		var result = [];
		var index = 0;
		while (true) {
			var from = target.indexOf("<script", index);
			if (from === -1) {
				break;
			}
			result.push(target.substr(index, from - index));
			index = target.indexOf("</script>", from) + 9;
			if (index === -1) {
				return result.join("");
			}
		}
		result.push(target.substr(index));
		return result.join("");
	},
	
	ellipsis: function(target, length, ellipsis) {
		target = String(target);
		if (target.length <= length) {
			return target;
		}
		ellipsis = ellipsis || "...";
		return target.substr(0, length - ellipsis.length) + ellipsis;
	},
	
	prepend: function(target, length, ch) {
		target = String(target);
		var buf = [];
		length -= target.length;
		for (var i = 0; i < length; ++i) {
			buf.push(ch);
		}
		buf.push(target);
		return buf.join("");
	},
	
	capitalize: function(target) {
		return String(target).charAt(0).toUpperCase() + target.substr(1);
	},
	
	camel: function(target) {
		return String(target).replace(/-([a-z])/ig, JW.String._fcamel);
	},
	
	hyphen: function(target) {
		return String(target).replace(/([A-Z])/g, JW.String._fhyphen);
	},
	
	trim: function(target) {
		return String(target).replace(/^\s*/, "").replace(/\s*$/, "");
	},
	
	_fcamel: function(a, b) {
		return b.toUpperCase();
	},
	
	_fhyphen: function(a, b) {
		return "-" + b.toLowerCase();
	}
};

/*
	JW timer.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Timer = function(delay, repeat, sensitive) {
	JW.Timer._super.call(this);
	this.tickEvent = new JW.Event();
	this.delay = delay;
	this.repeat = repeat;
	this.sensitive = sensitive;
	this._handle = 0;
	this._onTimeout = JW.inScope(this._onTimeout, this);
};

JW.extend(JW.Timer, JW.Class, {
	/*
	Fields
	JW.Event<JW.Timer.EventParams> tickEvent;
	Number delay;
	Boolean repeat;
	Boolean sensitive;
	Integer _handle;
	*/
	
	destroy: function() {
		this.stop();
		this.tickEvent.destroy();
		this._super();
	},
	
	start: function() {
		if (this.isStarted()) {
			return;
		}
		var runner = this._getRunner();
		this._handle = runner(this._onTimeout, this.delay);
	},
	
	stop: function() {
		if (!this.isStarted()) {
			return;
		}
		var stopper = this._getStopper();
		stopper(this._handle);
		this._handle = 0;;
	},
	
	restart: function() {
		this.stop();
		this.start();
	},
	
	isStarted: function() {
		return this._handle !== 0;
	},
	
	_getRunner: function() {
		return !this.repeat ? setTimeout : this.sensitive ? JW.setInterval : setInterval;
	},
	
	_getStopper: function() {
		return this.repeat ? clearInterval : clearTimeout;
	},
	
	_onTimeout: function() {
		this.tickEvent.trigger(new JW.Timer.EventParams(this));
	}
});

JW.Timer.EventParams = function(sender) {
	JW.Timer.EventParams._super.call(this, sender);
};

JW.extend(JW.Timer.EventParams, JW.EventParams, {
	/*
	Fields
	JW.Timer sender;
	*/
});
