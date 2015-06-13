// plugin Find in Text -- anooz
(function($){
	var ElementModel = function DOMElement(element){
			this.element = $(element);
			timeRegex = "";
			datetimeRegex = "";
			emailRegex = "";
			urlRegex = "";
	}
	var regex_date = {
		MMddyyy : new RegExp("([1-9]|0[1-9]|1[0 1 2])([\/]|[-]|[.])([1-9]|0[1-9]|1[1-9]|2[1-9]|3[0 1 2])([\/]|[-]|[.])(20[0-9][0-9]|19[0-9][0-9])"),
		yyyyMMdd : new RegExp("(20[0-9][0-9]|19[0-9][0-9])([\/]|[-]|[.])([1-9]|0[1-9]|1[0 1 2])([\/]|[-]|[.])([1-9]|0[1-9]|1[1-9]|2[1-9]|3[0 1 2])"),
		MMddyy : new RegExp("([1-9]|0[1-9]|1[0 1 2])([\/]|[-]|[.])([1-9]|0[1-9]|1[1-9]|2[1-9]|3[0 1 2])([\/]|[-]|[.])([0-9][0-9])"),
		yyMMdd : new RegExp("([0-9][0-9]([\/]|[-]|[.])([1-9]|0[1-9]|1[0 1 2])([\/]|[-]|[.])([1-9]|0[1-9]|1[1-9]|2[1-9]|3[0 1 2]))"),
		ddddMMMMdyyyy : new RegExp("([sS]aturday|[sS]unday|[mM]onday|[tT]uesday|[wW]ednesday|[tT]hursday|[fF]riday)[,]([\s]|)([jJ]anuary|[fF]ebruary|[mM]arch|[aA]pril|[mM]ay|[jJ]une|[jJ]uly|[aA]ugust|[sS]eptember|[oO]ctober|[nN]ovember|[dD]ecember)[\s]([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0 1 2])[,]([\s]|)(20[0-9][0-9]|19[0-9][0-9])"),
		MMMMdyyyy : new RegExp("([jJ]anuary|[fF]ebruary|[mM]arch|[aA]pril|[mM]ay|[jJ]une|[jJ]uly|[aA]ugust|[sS]eptember|[oO]ctober|[nN]ovember|[dD]ecember)[\s]([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0 1 2])[,]([\s]|)(20[0-9][0-9]|19[0-9][0-9])"),
		dddddMMMMdyyyy : new RegExp("([sS]aturday|[sS]unday|[mM]onday|[tT]uesday|[wW]ednesday|[tT]hursday|[fF]riday)[,]([\s]|)([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0 1 2])[\s]([jJ]anuary|[fF]ebruary|[mM]arch|[aA]pril|[mM]ay|[jJ]une|[jJ]uly|[aA]ugust|[sS]eptember|[oO]ctober|[nN]ovember|[dD]ecember)[,]([\s]|)(20[0-9][0-9]|19[0-9][0-9])"),
		dddddMMMMdyyyy : new RegExp("([\s]|)([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0 1 2])[\s]([jJ]anuary|[fF]ebruary|[mM]arch|[aA]pril|[mM]ay|[jJ]une|[jJ]uly|[aA]ugust|[sS]eptember|[oO]ctober|[nN]ovember|[dD]ecember)[,]([\s]|)(20[0-9][0-9]|19[0-9][0-9])")
	}
	var regex_time = {
		hhmm: new RegExp("([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]"),
		hhmmss: new RegExp("([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]"),
		hhmmampm: new RegExp("([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9][\s](am|AM|pm|PM)"),
		hhmmssampm: new RegExp("([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9][\s](am|AM|pm|PM)")
	}
	var regex_email = {
		email: new RegExp("\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b"),
		emailanother : new RegExp("([a-zA-z.])[a-zA-z0-9.]+@([a-zA-Z]+).([a-zA-Z]{3}|[a-zA-Z]{2})")
	}

	var regex_url = {
		httpwww: new RegExp("(http:\/\/|https:\/\/)(www|)([a-zA-z0-9])+.[a-zA-Z0-9]+.[a-zA-Z]+(\/|)"),
		httpftp: new RegExp("((mailto\:|(news|(ht|f)tp(s?))\://){1}\S+)"),
		www: new RegExp("(www)\.[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU)")
	}
	var regex_phone  ={
		phone: "\b\d{3}[-.]?\d{3}[-.]?\d{4}\b"
	}
	var regex_total = {
		total:"(total|Total|TOTAL)([\s]+|:)(:|\s+|)(\s|)([\s]+|)([\s\S]|[0-9]+)([0-9]+)"
	}

	var find = {
		date:function(elementModel){
			$.each(regex_date, function(key, regex){
				if(!!(matched = elementModel.element.html().match(regex)) ){
					($.fn.defaults.highlightMatched == true) && self._highlight(elementModel, matched);
					!!($.fn.defaults.afterFound) && eval($.fn.defaults.afterFound)(matched);
				}
			});
		},
		time:function(elementModel){
			$.each(regex_time, function(key, regex){
				if(!!(matched = elementModel.element.html().match(regex)) ){
					($.fn.defaults.highlightMatched == true) && self._highlight(elementModel, matched);
					!!($.fn.defaults.afterFound) && eval($.fn.defaults.afterFound)(matched);
				}
			});
		},
		email:function(elementModel){
			$.each(regex_email, function(key, regex){
				if(!!(matched = elementModel.element.html().match(regex)) ){
					($.fn.defaults.highlightMatched == true) && self._highlight(elementModel, matched);
					!!($.fn.defaults.afterFound) && eval($.fn.defaults.afterFound)(matched);
				}
			});	
		},
		url:function(elementModel){
			$.each(regex_url, function(key, regex){
				if(!!(matched = elementModel.element.html().match(regex)) ){
					($.fn.defaults.highlightMatched == true) && self._highlight(elementModel, matched);
					!!($.fn.defaults.afterFound) && eval($.fn.defaults.afterFound)(matched);
				}
			});	
		},
		phone:function(elementModel){
			$.each(regex_phone, function(key, regex){
				if(!!(matched = elementModel.element.html().match(regex)) ){
					($.fn.defaults.highlightMatched == true) && self._highlight(elementModel, matched);
					!!($.fn.defaults.afterFound) && eval($.fn.defaults.afterFound)(matched);
				}
			});	
		},
		total:function(elementModel){
			$.each(regex_total, function(key, regex){
				if(!!(matched = elementModel.element.html().match(regex)) ){
					($.fn.defaults.highlightMatched == true) && self._highlight(elementModel, matched);
					!!($.fn.defaults.afterFound) && eval($.fn.defaults.afterFound)(matched);
				}
			});	
		}
	}

	var self = {
		_highlight:function(elementModel, matched){
			var string = elementModel.element.html();
			var term = matched[0];
			term = term.replace(/(\s+)/,"(<[^>]+>)*$1(<[^>]+>)*");
			var pattern = new RegExp("("+term+")", "gi");
			string = string.replace(pattern, "<mark>$1</mark>");
			string = string.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,"$1</mark>$2<mark>$4");
			elementModel.element.html(string);
		},
		_extendDefaults:function(options){
			return $.extend({},$.fn.defaults,options);
		},
		_initialize:function($elem){
			$elem.each(function(index,element){
				if($(element).length>0 && !!(elementModel = new ElementModel($(element)))){
					$.fn.defaults.date && find.date(elementModel);
					$.fn.defaults.time && find.time(elementModel);
					$.fn.defaults.email && find.email(elementModel);
					$.fn.defaults.url && find.url(elementModel);
				}
			});
		}
	}
	$.extend($.fn, {
		findInText:function(options){
			$elem = $(this);
			$.fn.defaults = self._extendDefaults(options);
			self._initialize($elem);
		},
		defaults: {
			date:true,
			time:true,
			datetime:true,
			email:true,
			url:true,
			phone:true,
			highlightMatched:true,
			afterFound:false
		}
	});

}(jQuery))