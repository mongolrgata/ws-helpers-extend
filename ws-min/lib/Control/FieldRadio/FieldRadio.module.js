$ws.declareModule({namespace:"SBIS3.CORE",name:"FieldRadio",imports:["SBIS3.CORE.FieldAbstract","SBIS3.CORE.FieldString"]},function(a,b){$ws.proto.FieldRadio=a.extend({$protected:{_options:{width:"auto",display:"",data:[],name:"",align:"center",columnsCount:1,wordWrap:false,cssClassName:"ws-field-radio",buttonDirection:"",mode:"",textAlign:"left"},_curRadio:"",_readOnlyValue:""},$constructor:function(){this._container.find(".ws-field").addClass("ws-field-radio").addClass(this._options.wordWrap?"ws-prewrap":"ws-nowrap");this._wrapColumns();this.getParent().subscribe("onResize",$.proxy(this._calculateWidth,this)).subscribe("onActivate",$.proxy(this._calculateWidth,this)).subscribe("onAfterShow",$.proxy(this._calculateWidth,this));if(this._options.readonly){this.currentActiveRadio=this._curRadio;}if($ws._const.theme){var c=this._inputControl.find("input");$ws.core.attach("ext/jquery-ui/jquery-ui-1.8.5.custom.min.js").addCallback(function(){$ws.core.attach("ext/radio/ui.checkbox.js").addCallback(function(){c.checkBox();});});}},_initConfig:function(){$ws.proto.FieldRadio.superclass._initConfig.apply(this,arguments);if(!this._options.mode){if(this._options.buttonDirection){var d={inline:"horizontal",inblock:"vertical",auto:"auto"};this._options.mode=d[this._options.buttonDirection];}else{this._options.mode="vertical";}}else{if(this._options.mode==="horizontalSwitcher"){this._options.align="left";this._options.columnsCount=this._options.data.length;for(var e=0,c=this._options.data.length;e<c;++e){this._options.data[e].align=this._options.textAlign;}}}},destroy:function(){try{this._inputControl.find("input").checkBox("destroy");}catch(c){}$ws.proto.FieldRadio.superclass.destroy.apply(this,arguments);},_calculateWidth:function(){if(this._options.align=="center"){this._container.find(".radio-group-col").width(100/this._options.columnsCount+"%");}},_changeState:function(e){var c=this._curval.getValues();for(var d in c){if(c[d]==e){this._curval.set(d);break;}}this._setValueInternal(this._curval);},_createEnum:function(){var d={},c=0,f=0;for(var e in this._options.data){d[c]=this._options.data[e].name||e;if(d[c]==this._options.value){f=c;}c++;}return new $ws.proto.Enum({availableValues:d,currentValue:f});},_curValue:function(){return this._notFormatedVal();},_createMarkup:function(d){var c=b.superclass._createMarkup.apply(this,arguments),e="{{ for(var d in it.data) { }}<div class='radioStr radio-align-{{=it.data[d].align}}' style='float : {{? it.display == 'inline'}}left;{{??}}none;{{?}}'><label class='{{? it.mode == 'horizontalSwitcher' }}ws-field-radio-switcher{{??}}ws-field-radio-standart{{?}} ws-field-radio-align-{{=it.data[d].align}}' title='{{? it.data[d].tooltip }}{{=it.data[d].tooltip}}{{??}}{{=it.data[d].name || d}}{{?}}'><input title='{{=it.data[d].tooltip}}' type='radio' id='{{=it.name}}-{{=it.data[d].name || d}}' style='float:{{? it.data[d].align }}{{=it.data[d].align}}{{??}}left{{?}};'name='{{=it.name}}' value='{{=it.data[d].name || d}}'>{{? it.mode == 'horizontalSwitcher' }}<span class='ws-field-radio-left'></span>{{?}}<span class='ws-field-radio-center'>{{? it.data[d].label }}{{=it.data[d].label}}{{??}}{{=it.data[d].name || d}}{{?}}</span>{{? it.mode == 'horizontalSwitcher' }}<span class='ws-field-radio-right'></span>{{?}}</label></div>{{ } }}";return this._extendMarkup(c,e);},_bindInternals:function(){this._inputControl=this._container.find(".radioStr");},_wrapColumns:function(){var f=this._container.find(".radioStr"),e=f.length,d=(e+(e%this._options.columnsCount))/this._options.columnsCount,c=0;while(c<e){f.slice(c,c+d).wrapAll("<span class='radio-group-col'></span>");c+=d;}this._container.find(".radio-group-col").wrapAll("<form></form>");this._container.find("form").addClass(this._options.textAlign==="right"?"ws-field-radio-align-right":"ws-field-radio-align-left");},_setValueInternal:function(h){var g;if(typeof h==="string"){g=this._getEnumWithValue(h);}else{if(typeof h==="number"){g=this._getEnumWithIndex(h);}else{g=h;}}if(g instanceof $ws.proto.Enum){var d=this,e=g.toObject(),f=e.currentValue,c=d._inputControl.find("input");e=e.availableValues[f];c.removeAttr("checked");this._inputControl.each(function(){if($(this).find("input").val()==e&&$(this).attr("checked")!="checked"){d._curRadio=$(this).find("input").attr("checked","checked");}});if(this._widgetIsApplied()){c.checkBox("reflectUI");}g.set(f);this._curval=g;}},_widgetIsApplied:function(){return"checkBox" in this._inputControl.find("input")&&this._inputControl.find("span.ui-radio").length;},_getElementToFocus:function(){return this._container;},_setDisableAttr:function(d){var c=this._inputControl.find("input");if(!d){c.attr("disabled","disabled");}else{c.removeAttr("disabled");}if(this._widgetIsApplied()){c.checkBox("reflectUI");}},_onValueChangeHandler:function(){var c=$('input[type="radio"]:checked',this._container[0]).val();if(c===this.getStringValue()){return;}this._changeState(c);var d=this._notFormatedVal();this._updateSelfContextValue(d);this._notify("onChange",d);this._notifyOnValueChange(d);},getStringValue:function(){var c=this._curval.get();return c.values[c.current];},_getDefaultValue:function(){return this._createEnum();},getValueAsIndex:function(){return this._curval.valueOf();},getValueAsString:function(){return this.getStringValue();},_getEnumWithIndex:function(d){var c=this._defaultValue.clone();try{c.set(d);return c;}catch(f){$ws.single.ioc.resolve("ILogger").error("FieldRadio",f.message);return undefined;}},setValueByIndex:function(c){var d=this._getEnumWithIndex(c);if(d){this.setValue(d);}},_getEnumWithValue:function(f){var c=this._defaultValue.clone(),e=this._options.data;for(var d in e){if(e.hasOwnProperty(d)){if(f===e[d].name){c.set(d);return c;}}}$ws.single.ioc.resolve("ILogger").error("FieldRadio",'Connot set value by name "'+f+'"');return undefined;},setValueByString:function(d){var c=this._getEnumWithValue(d);if(c){this.setValue(c);}},_redraw:function(c){if((c&&!this._hasMarkup())||!c){if(!$ws.proto.FieldRadio.__markupTemplate){$ws.proto.FieldRadio.__markupTemplate=doT.template(this._getMarkupTemplate());}this._container.html($ws.proto.FieldRadio.__markupTemplate(this._options));}}});return $ws.proto.FieldRadio;});