$ws.declareModule({namespace:"SBIS3.CORE",name:"Menu",imports:["SBIS3.CORE.Control"]},function(a){$ws.single.DependencyResolver.register("SBIS3.CORE.Menu",["/ext/menu/jquery.menu.js"]);$ws._const.Menu={insertItemBeforeAll:-1};$ws.proto.Menu=a.Control.extend({$protected:{_options:{data:[]},_itemEvents:{},_params:{},_menu:undefined},$constructor:function(){this._publish("onClose","onOpen","onMouseEnter","onMouseLeave","onActivated","onItemsChange");if(this._container){this._container.addClass("ws-menu-container");this._container.attr("id",this.getId());}else{$("body").append(this._container=$('<div class="ws-menu-container" id="'+this.getId()+'" />'));}this._container.css("z-index",10000).addClass("ws-menu");this._makeMenu();},isMenu:function(){return true;},_makeMenu:function(){var b=this;this._params={onClick:function(e,c){var d=c.parentMenu;if(!c.subMenu){b._notify("onActivated",e,c);b._activateItemMenuHandler(e,c);while(d!==null){d.hide();d=d.parentMenuItem===null?null:d.parentMenuItem.parentMenu;}}},onHoverIn:function(d,c){b._itemHandlers(d,c,"onHoverIn");},onHoverOut:function(d,c){b._itemHandlers(d,c,"onHoverOut");},onClose:function(c){b._notify("onClose",c);},onOpen:function(){b._notify("onOpen");},onMouseEnter:function(){b._notify("onMouseEnter");},onMouseLeave:function(){b._notify("onMouseLeave");},arrowSrc:"/ws/img/menu/arrow_right.gif",copyClassAttr:true,id:this.getId()};this._prepareMenu(this._options.data);this._rememberItemHandlers(this._options.data);this._menu=this._container.menu(this._params,this._options.data);this._container.Menu.$eDIV.addClass(b._options.cssClassName).find(".menu-separator").each(function(c,d){$(d).prev("*").addClass("ws-menu-before-sep");});this._setImages();this._notify("onReady",this);this._notifyOnSizeChanged(this,this);},_setImages:function(){var d=this._container.Menu.$eUL[0].childNodes,e;for(var c=0,b=d.length;c<b;c++){e=this._options.data[c].imgSrc;if(e){if(e.indexOf("sprite:")!=-1){$(d[c]).removeClass("ws-hasImg");$(d[c]).children("div").prepend("<div class='"+e.split("sprite:")[1]+"'/>");}else{$ws.helpers.makeBackground($(d[c]),$ws.helpers.processImagePath(e));}}}},_prepareMenu:function(d){var b=d.length,c;for(c=0;c<b;c++){this._prepareItem(d[c]);}},_prepareItem:function(b){if(!b.addClass){b.addClass="";}if(b.subMenu){this._prepareMenu(b.subMenu);}if(b.id!==undefined){b.id=this._itemId(b.id);}if(b.renderStyle=="asLink"){b.addClass+=" asLink";}},_rememberItemHandlers:function(c){var b=c.length,e={};for(var d=0;d<b;d++){e=c[d];if(e.id&&!Object.isEmpty(e.handlers)){this._itemEvents[e.id]=e.handlers;}if(e.subMenu){this._rememberItemHandlers(e.subMenu);}}},_createMenu:function(e,h){var c=e.length,k={},g="",m=false,f,b,d,i;for(d=0;d<c;d++){if(e[d].imgSrc){m=true;break;}}for(d=0;d<c;d++){k=e[d];g=k.addClass?k.addClass:"";f="";i=k.caption||"";if(h===this._menuElement){g+=g.indexOf("menumain")===-1?" menumain":"";}else{if(k.imgSrc&&k.caption!==""){f+='style="background-image:url('+k.imgSrc+');background-repeat:no-repeat;background-position:left;"';}}if(k.itemFloat&&k.itemFloat==="right"){g+=" ws-menu-right";}if(k.enable||k.enable===undefined){g+=" enable";}else{g+=" inactive";}if(!i){if(g.indexOf("menumain")>=0){g+=" menu-separator";k.caption="&nbsp;";}}else{if(m){g+=" ws-hasImg";}}h.append(b=$("<li "+(k.id?'id="'+k.id+'"':"")+(g===""?"":'class = "'+String.trim(g)+'" ')+f+" >"+(k.url?'<a href="'+k.url+'" '+(k.target?'target = "'+k.target+'"':"")+">":"")+i+(k.url?"</a>":"")+"</li>"));if(k.subMenu){b.append(b=$("<ul />"));this._createMenu(k.subMenu,b);}}},_activateItemMenuHandler:function(c,b){this._itemHandlers(c,b,"onActivated");},_itemHandlers:function(f,c,b){var d=this._itemEvents[f]?this._itemEvents[f][b]:false;if(d&&typeof(d)=="function"){var e=f.substr(f.indexOf("-")+1);d.apply(this,[e,c]);}},show:function(c,d,b){this._container.showMenu(c,d,b);},hide:function(){this._container.hideMenu();},showItem:function(c){c=this._itemId(c);var b=this._container.find("li#"+c);if(b.length===0){b=$(document.body).find("li#"+c);}b.css("display","list-item");this._notify("onItemsChange");},hideItem:function(c){c=this._itemId(c);var b=this._container.find("li#"+c);if(b.length===0){b=$(document.body).find("li#"+c);}if(!b.hasClass("menumain")){b.css("display","none");}this._notify("onItemsChange");},setEnabledById:function(c,b){c=this._itemId(c);b=!!b;this._container.setEnabledById(c,b);this._container.find("#"+c).toggleClass("enable",b).toggleClass("inactive",!b);},addSubMenu:function(c,b){if(c&&b&&b.constructor===Array){c=this._itemId(c);this._prepareMenu(b);this._rememberItemHandlers(b);this._container.addSubMenu(c,b,this._params);}},hasSubMenu:function(b){if(b){return this._container.hasSubMenu(this._itemId(b));}return false;},destroySubMenu:function(d){if(d){var c=this._container.destroySubMenu(this._itemId(d));for(var e=0,b=c.length;e<b;e++){delete this._itemEvents[c[e]];}}},addItem:function(b){this.insertItem(b);},insertItem:function(b,c){if(b.id){b.id=this._itemId(b.id);if(b.handlers&&b.handlers instanceof Object){this._itemEvents[b.id]=b.handlers;}}if(c){c=this._itemId(c);}this._container.Menu.insertItem(b,c);this._notify("onItemsChange");},removeItem:function(b){if(this.hasItem(b)){this._container.Menu.item(this._itemId(b)).destroy();this._notify("onItemsChange");}},hasItem:function(b){return this._container.Menu.item(this._itemId(b))!==undefined;},_itemId:function(b){return this.getId()+"-"+b;},isVisible:function(){if(!this._container||typeof(this._container.isVisible)!="function"){return $ws.proto.Menu.superclass.isVisible.call(this,arguments);}return this._container.isVisible();},getMinWidth:function(){return 0;},getMinHeight:function(){return 0;},destroy:function(){if(this._menu){this._menu.Menu.destroy();}$ws.proto.Menu.superclass.destroy.call(this,arguments);},setItemText:function(c,b){if(this.hasItem(c)){this._container.Menu.item(this._itemId(c)).setText(b);this._notify("onItemsChange");}},setItemIcon:function(c,b){if(this.hasItem(c)){this._container.Menu.item(this._itemId(c)).setIcon(b);}},setItemClickHandler:function(c,b){this._itemEvents[this._itemId(c)]["onActivated"]=b;},_redraw:function(){this._makeMenu();}});return $ws.proto.Menu;});