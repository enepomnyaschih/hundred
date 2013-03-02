/*!
	jWidget UI 0.4.
	
	https://github.com/enepomnyaschih/jwui
	
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

JW.UI = {
	template: function(cls, tpls) {
		if (cls.prototype.Templates && cls.prototype.Templates.componentCls == cls) {
			JW.apply(cls.prototype.Templates.prototype, tpls);
		} else {
			cls.prototype.Templates = (cls.superclass.Templates || JW.Class).extend(tpls);
			cls.prototype.Templates.componentCls = cls;
			cls.prototype.templates = new cls.prototype.Templates();
		}
	},
	
	isElement: function(v) {
		return v instanceof jQuery.fn.init;
	}
};

jQuery(function() {
	JW.UI.windowEl = jQuery(window);
	JW.UI.bodyEl   = jQuery(document.body);
});

/*
	JW jQuery element prototype extension.
	
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

JW.apply(jQuery.fn, {
	insert: function(item, index) {
		if (!JW.isSet(index)) {
			this.append(item);
		} else if (index == 0) {
			this.prepend(item);
		} else {
			jQuery(this.children()[index - 1]).after(item);
		}
	},
	
	replaceBy: function(el) {
		var id = this.attr("id"),
			cls = this.attr("class");
		
		el = jQuery(el);
		this.replaceWith(el);
		
		if (id) {
			el.attr("id", id);
		}
		if (cls) {
			el.addClass(cls);
		}
	}
});

/*
	JW browser detection.
	
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

JW.UI.Browsers = (function()
{
	ua = navigator.userAgent.toLowerCase();
	function check(r){
		return r.test(ua);
	};
	
	var isStrict = document.compatMode == "CSS1Compat",
		docMode = document.documentMode,
		isOpera = check(/opera/),
		isOpera10_5 = isOpera && check(/version\/10\.5/),
		isChrome = check(/\bchrome\b/),
		isWebKit = check(/webkit/),
		isSafari = !isChrome && check(/safari/),
		isSafari2 = isSafari && check(/applewebkit\/4/), // unique to Safari 2
		isSafari3 = isSafari && check(/version\/3/),
		isSafari4 = isSafari && check(/version\/4/),
		isSafari5 = isSafari && check(/version\/5/),
		isIE = !isOpera && check(/msie/),
		isIE7 = isIE && (check(/msie 7/) || docMode == 7),
		isIE8 = isIE && (check(/msie 8/) && docMode != 7 && docMode != 9 || docMode == 8),
		isIE9 = isIE && (check(/msie 9/) && docMode != 7 && docMode != 8 || docMode == 9),
		isIE6 = isIE && check(/msie 6/),
		isGecko = !isWebKit && check(/gecko/),
		isGecko2 = isGecko && check(/rv:1\.8/),
		isGecko3 = isGecko && check(/rv:1\.9/),
		isGecko4 = isGecko && check(/rv:2\.0/),
		isGecko5 = isGecko && check(/rv:5\./),
		isFF3_0 = isGecko3 && check(/rv:1\.9\.0/),
		isFF3_5 = isGecko3 && check(/rv:1\.9\.1/),
		isFF3_6 = isGecko3 && check(/rv:1\.9\.2/),
		isBorderBox = isIE && !isStrict,
		isWindows = check(/windows|win32/),
		isMac = check(/macintosh|mac os x/),
		isAir = check(/adobeair/),
		isLinux = check(/linux/),
		isIPad = check(/ipad/),
		isSecure = /^https/i.test(window.location.protocol);
	
	var isPaddingWideTd = !(isWebKit || isIPad);
	
	return {
		isStrict    : isStrict,
		isOpera     : isOpera,
		isOpera10_5 : isOpera10_5,
		isChrome    : isChrome,
		isWebKit    : isWebKit,
		isSafari    : isSafari,
		isSafari2   : isSafari2,
		isSafari3   : isSafari3,
		isSafari4   : isSafari4,
		isSafari5   : isSafari5,
		isIE        : isIE,
		isIE7       : isIE7,
		isIE8       : isIE8,
		isIE9       : isIE9,
		isIE6       : isIE6,
		isGecko     : isGecko,
		isGecko2    : isGecko2,
		isGecko3    : isGecko3,
		isGecko4    : isGecko4,
		isGecko5    : isGecko5,
		isFF3_0     : isFF3_0,
		isFF3_5     : isFF3_5,
		isFF3_6     : isFF3_6,
		isBorderBox : isBorderBox,
		isWindows   : isWindows,
		isMac       : isMac,
		isAir       : isAir,
		isLinux     : isLinux,
		isIPad      : isIPad,
		isSecure    : isSecure,
		
		isPaddingWideTd    : isPaddingWideTd
	};
})();

/*
	jWidget UI source file.
	
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

JW.UI.Component = function(config) {
	JW.UI.Component._super.call(this);
	config = config || {};
	this.rootClass = config.rootClass;
	this.template = config.template;
	this.parent = null;
	this.wasAfterAppend = false;
	this.destroyed = false;
	this.el = null;
	this.children = null;
	this._elements = null;
	this._allChildren = null;
	this._childMapper = null;
	this._arrays = null;
},

JW.extend(JW.UI.Component, JW.Class, {
	/*
	Optional
	String rootClass;
	String template;
	
	Fields
	JW.UI.Component parent;
	Boolean wasAfterAppend;
	Boolean destroyed;
	
	Fields (rendering)
	Element el;
	JW.ObservableMap<JW.UI.Component> children; // named children
	Map<Element> _elements;
	Set<JW.UI.Component> _allChildren; // children + (arrays' contents)
	JW.ObservableMap.Mapper<JW.UI.Component, JW.UI.Component.Child> _childMapper;
	Set<JW.UI.Component.Array> _arrays;
	*/
	
	destroy: function() {
		if (this.parent) {
			throw new Error("JW.UI.Component.destroy must be used for root and detached components only");
		}
		if (this.destroyed) {
			return;
		}
		this.destroyed = true;
		if (this.el) {
			this.el.remove();
			JW.Set.eachByMethod(this._arrays, "destroy");
			this._arrays = null;
			
			this.destroyComponent();
			
			this._childMapper.destroy();
			this._childMapper = null;
			this.children.eachByMethod("destroy");
			this.children.destroy();
			this.children = null;
		}
		this._allChildren = null;
		this._elements = null;
		this.el = null;
		this._super();
	},
	
	beforeRender: function() {},
	
	renderComponent: function() {},
	
	afterAppend: function() {},
	
	destroyComponent: function() {},
	
	render: function() {
		if (this.el) {
			return;
		}
		this.el = jQuery(this.template || this.templates.main);
		this._elements = {};
		this._allChildren = {};
		this.children = new JW.ObservableMap();
		this._arrays = {};
		this.rootClass = this.rootClass || this.el.attr("jwclass");
		if (this.rootClass) {
			this.el.removeAttr("jwclass");
			this.el.addClass(this.rootClass);
		}
		var anchorEls = this.el.find("[jwid]");
		for (var i = 0; i < anchorEls.length; ++i) {
			var anchorEl = jQuery(anchorEls[i]);
			var jwId = anchorEl.attr("jwid");
			this._elements[jwId] = anchorEl;
			anchorEl.removeAttr("jwid");
			anchorEl.addClass(this.getElementClass(jwId));
		}
		this.beforeRender();
		for (var jwId in this._elements) {
			var anchorEl = this._elements[jwId];
			var jwIdCamel = JW.String.camel(jwId);
			var renderMethodName = "render" + JW.String.capitalize(jwIdCamel);
			if (typeof this[renderMethodName] === "function") {
				this.children.set(this[renderMethodName].call(this), jwId);
			}
		}
		this._childMapper = new JW.ObservableMap.Mapper({
			source      : this.children,
			createItem  : function(child, name) { return new JW.UI.Component.Child(this, child, name); },
			destroyItem : function(componentChild) { componentChild.destroy(); },
			scope       : this
		});
		this.renderComponent();
	},
	
	renderTo: function(el) {
		this.render();
		jQuery(el).insert(this.el);
		this._afterAppend();
	},
	
	renderAs: function(el) {
		this.render();
		jQuery(el).replaceBy(this.el);
		this._afterAppend();
	},
	
	remove: function() {
		if (this.parent) {
			throw new Error("JW.UI.Component.remove must be used for root components only");
		}
		this.el.detach();
	},
	
	getElement: function(id) {
		return this._elements[id];
	},
	
	getElementClass: function(id) {
		return JW.Array.map(JW.Array.filter([ this.rootClass, id ], JW.isSet), JW.String.hyphen).join("-");
	},
	
	removeElement: function(id) {
		var el = this._elements[id];
		if (!el) {
			return;
		}
		el.remove();
		delete this._elements[id];
	},
	
	addArray: function(source, el) {
		return new JW.UI.Component.Array(this, source, this._getElement(el));
	},
	
	_afterAppend: function() {
		if (this.wasAfterAppend || !this.el) {
			return;
		}
		if (this.parent && !this.parent.wasAfterAppend) {
			return;
		}
		if (!this.parent && !this.el.parents("body").length) {
			return;
		}
		this.wasAfterAppend = true;
		this.afterAppend();
		JW.Set.eachByMethod(this._allChildren, "_afterAppend");
	},
	
	_initChild: function(component) {
		component.render();
		component.parent = this;
		JW.Set.add(this._allChildren, component);
	},
	
	_doneChild: function(component) {
		JW.Set.remove(this._allChildren, component);
		component.parent = null;
	},
	
	_getElement: function(el) {
		return (typeof el === "string") ? this.getElement(el) : (el || this.el);
	}
});

JW.UI.template(JW.UI.Component, {
	main: '<div />'
});

JW.UI.Component.EventParams = function(sender) {
	JW.UI.Component.EventParams._super.call(this, sender);
};

JW.extend(JW.UI.Component.EventParams, JW.EventParams, {
	/*
	Fields
	JW.UI.Component sender;
	*/
});

/*
	jWidget UI source file.
	
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

JW.UI.Component.Array = function(parent, source, el) {
	JW.UI.Component.Array._super.call(this);
	this.parent = parent;
	JW.Set.add(parent._arrays, this);
	
	this._mapper = source.createMapper({
		createItem  : function(child) { this.parent._initChild(child); return child; },
		destroyItem : function(child) { this.parent._doneChild(child); },
		scope       : this
	});
	
	this._inserter = new JW.UI.Inserter(this._mapper.target, el);
};

JW.extend(JW.UI.Component.Array, JW.Class, {
	/*
	Fields
	JW.UI.Component parent;
	JW.AbstractArray.Mapper<JW.UI.Component, JW.UI.Component> _mapper;
	JW.AbstractArray.Inserter _inserter;
	*/
	
	// override
	destroy: function() {
		this._inserter.destroy();
		this._mapper.destroy();
		JW.Set.remove(this.parent._arrays, this);
		this._super();
	}
});

/*
	jWidget UI source file.
	
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

JW.UI.Component.Child = function(parent, child, name) {
	JW.UI.Component.Child._super.call(this);
	this.parent = parent;
	this.child = child;
	this._el = this.parent.getElement(name);
	this.parent._initChild(this.child);
	this._el.replaceBy(this.child.el);
	this.child._afterAppend();
};

JW.extend(JW.UI.Component.Child, JW.Class, {
	/*
	Fields
	JW.UI.Component parent;
	JW.UI.Component child;
	Element _el;
	*/
	
	destroy: function() {
		this.child.el.replaceWith(this._el);
		this.parent._doneChild(this.child);
		this._super();
	}
});

/*
	JW ordered collection syncher with UI component.
	
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

JW.UI.Inserter = function(source, el) {
	JW.UI.Inserter._super.call(this);
	this.el = el;
	this._inserter = source.createInserter({
		addItem    : this._addItem,
		removeItem : this._removeItem,
		clearItems : this._clearItems,
		scope      : this
	});
};

JW.extend(JW.UI.Inserter, JW.Class, {
	/*
	Fields
	Element el;
	JW.ObservableArray.Inserter<JW.UI.Component> _inserter;
	*/
	
	destroy: function() {
		this._inserter.destroy();
		this._super();
	},
	
	_addItem: function(item, index) {
		this.el.insert(item.el, index);
		item._afterAppend();
	},
	
	_removeItem: function(index, item) {
		item.el.detach();
	},
	
	_clearItems: function() {
		this.el.empty();
	}
});

/*
	JW query string params object.
	
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

JW.UI.Params = {};

(function() {
	if (!location.search.length)
		return;
	
	var params = location.search.substr(1).split("&");
	for (var i = 0; i < params.length; ++i)
	{
		var tokens = params[i].split("=");
		if (tokens.length != 2)
			continue;
		
		JW.UI.Params[tokens[0]] = decodeURIComponent(tokens[1]).replace(/\+/g, " ");
	}
})();
/*
	JW image preloader.
	
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

JW.UI.preloadImage = function(
	src,      // [required] String
	callback, // [optional] Function(image), image is undefined if error
	scope)    // [optional] Object
{
	var image = new Image();
	jQuery(image).
		load(function() {
			if (typeof callback === "function")
				callback.call(scope, image);
		}).
		error(function() {
			if (typeof callback === "function")
				callback.call(scope);
		}).
		attr("src", src);
}
