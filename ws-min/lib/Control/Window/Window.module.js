$ws.declareModule({namespace:"SBIS3.CORE",name:"Window",imports:["SBIS3.CORE.TemplatedAreaAbstract"]},function(a){$ws._const.TemplatedArea={padding:10};$ws.proto.Window=a.extend({$protected:{_window:undefined,_windowContent:undefined,_titleBar:undefined,_resizeBar:undefined,_resizeBtn:undefined,_isShow:false,_isMinimize:false,_isMaximize:false,_minimizeBtn:undefined,_maximizeMtn:undefined,_left:0,_top:0,_dRender:null,_heightStore:"",_autoResizebleHeight:false,_autoResizebleWidth:false,_zIndex:0,_options:{resizable:true,caption:"",windowState:true,disableActions:false,deprecated:false,border:true,maximize:undefined,top:undefined,left:undefined},_keysWeHandle:[$ws._const.key.esc,$ws._const.key.tab,$ws._const.key.enter],_suppressAutoCenter:false},$constructor:function(b){var c=this;this._zIndex=$ws.single.WindowManager.acquireZIndex(this._isModal);this._suppressAutoCenter=!c._isOptionDefault("left")||!c._isOptionDefault("top");c._dRender=new $ws.proto.Deferred();c._publish("onBeforeClose","onAfterClose");$ws.single.CommandDispatcher.declareCommand(this,"close",this.close);$ws.single.CommandDispatcher.declareCommand(this,"ok",this.ok);$ws.single.CommandDispatcher.declareCommand(this,"cancel",this.cancel);$ws.single.CommandDispatcher.declareCommand(this,"maximize",this._maximizeWindow);c._window=c._createControl().css({left:0,top:0});c._createTitleBar();if(b.resizeable!==undefined){this._options.resizable=b.resizeable;this._optionsOverriden.resizable=this._options.resizable;}c.subscribe("onAfterLoad",function(){if(c._options.deprecated){c.close();$ws.core.alert("У Вас недостаточно прав для просмотра.");return;}if(!c._options.border){c._titleBar.height(0).find(".ws-window-title").hide();}if(c._options.resizable&&!(c._options.autoWidth&&c._options.autoHeight)){c._resizeBtn=$("<div></div>").addClass("ws-window-resize").bind("mousedown",function(f){c._isResizing=true;return c._mouseDown(f);}).appendTo(c._window);}c._container.append('<div style="clear: both;">');if(c._width=="auto"){c._width=400;}if(c._height=="auto"){c._height=300;}c.setSize({width:c._options.autoWidth?"auto":c._width,height:c._options.autoHeight?"auto":c._height,left:c._options.left,top:c._options.top,firstRun:true,centering:true});c._window.css("visibility","");if(!c._options.border){c._maximizeBtn=c._window.find('[sbisname="windowTitleMaximize"]');}if(c._options.maximize!=undefined?c._options.maximize:c._options.windowState&&c._options.windowState=="maximized"){c._maximizeWindow();}if(c._options.caption){c.setTitle(c._options.caption);}c._dRender.callback();var e=c._window.find('div[sbisname="windowTitle"]');if(e.length||!c._options.border){c._windowContent.addClass("with-titlebar");}c.show();c._window.find('[sbisname="windowTitleContainer"]').addClass("sbisname-window-title-container");c._window.find('[sbisname="windowTitleClose"]').addClass("sbisname-window-title-close");c._window.find('[sbisname="windowTitleMaximize"]').addClass("sbisname-window-title-maximize");if(e.length){c._applyDrag(e);}var d=c._window.find('div[sbisname="windowTitleContainer"]');if(d.length){d.css("z-index","1000");}});if($ws._const.browser.isIE){c.subscribe("onBatchFinished",function(){c._window.addClass("clear-box-shadow");c._container.width();c._window.removeClass("clear-box-shadow");});}},describe:function(){return"Window#"+this.getId()+" template: "+(this._currentTemplateInstance&&this._currentTemplateInstance.getName()||this._options.template);},init:function(){$ws.proto.Window.superclass.init.apply(this,arguments);this._loadTemplate();},_setTemplateDimensions:function(b){if(b.width&&!this._options.width){this._width=b.width;}if(b.height&&!this._options.height){this._height=b.height;}},_isAcceptKeyEvents:function(){return true;},_keyboardHover:function(b){if(b.which in this._keysWeHandle){if(b.which==$ws._const.key.esc){this.close();return false;}if(this.isEnabled()){return $ws.proto.Window.superclass._keyboardHover.apply(this,arguments);}else{return true;}}return true;},_createControl:function(){var b=$("<div></div>").appendTo(document.body).css("visibility","hidden").addClass("ws-absolute ws-window shadow radius");if(!this._options.border){b.addClass("ws-window-frameless");}this._windowContent=$("<div></div>").addClass("ws-window-content radius").appendTo(b);this._container.prependTo(this._windowContent);return b;},_createTitleBar:function(){var b=this;this._titleBar=$("<div></div>").addClass("ws-window-titlebar radius").dblclick(function(){b._maximizeWindow();return false;}).prependTo(this._window);this._title.addClass("ws-window-title").prependTo(this._titleBar);this._titleBar.append("<div>&nbsp;</div>");this._window.addClass("ws-window-draggable");this._applyDrag(this._titleBar);},_applyDrag:function(b){b.bind("mousedown",$.proxy(this._mouseDown,this));},applyDrag:function(b){this._applyDrag(b);},_createTitleButtons:function(){if(!this._options.border){return;}var b=this;if(!this._options.disableActions){if(this._options.resizable){this._maximizeBtn=$('<a href="#"></a>').addClass("ws-window-titlebar-action maximize").click(function(){b._maximizeWindow();}).prependTo(this._titleBar);}$('<a href="#"></a>').addClass("ws-window-titlebar-action close").click(function(){b.close();return false;}).prependTo(this._titleBar);}},_updateDocumentTitle:function(){var b=this.getTitle(),c=document.title.lastIndexOf(" - "+b);if(b&&c==-1){document.title=document.title+" - "+b;}},_clearDocumentTitle:function(){var b=document.title.lastIndexOf(" - "+this.getTitle());if(b>0){document.title=document.title.slice(0,b);}},getTitle:function(){return this._title.html();},setTitle:function(b){if(b){this._clearDocumentTitle();this._title.html($ws.helpers.escapeHtml(b));this._window.find('div[sbisname="windowTitle"] span').text(b);this._updateDocumentTitle();}},getZIndex:function(){return this._zIndex;},show:function(){var b=this;if(this._isShow){return;}this._notify("onBeforeShow");this._updateDocumentTitle();$ws.single.WindowManager.setVisible(this._zIndex);this._window.show();this._dRender.addCallback(function(){b._isShow=true;b.moveToTop();b.onBringToFront();b._notifyBatchDelayed("onAfterShow");});},_hideWindow:function(){this._window.hide();this._isShow=false;},hide:function(){if(!this._isShow){return;}this._hideWindow();$ws.single.WindowManager.setHidden(this._zIndex);this._clearDocumentTitle();var b=$ws.single.WindowManager.getMaxZWindow();if(b!==undefined){if(b.getZIndex()===0){b=$ws.single.WindowManager.getLastActiveWindow();}if(b!==undefined){b.moveToTop(true);b.onBringToFront();}}},isShow:function(){return this._isShow;},close:function(b){var c=this;return this.getReadyDeferred().addCallback(function(){var d=c._notify("onBeforeClose",b);if(d!==false){c._notify("onAfterClose",b);c.destroy();}});},_removeContainer:function(){this._window.empty().remove();},destroy:function(){if(this._titleBar){this._titleBar.unbind();this._window.find('div[sbisname="windowTitle"]').unbind();}$ws.single.WindowManager.releaseZIndex(this._zIndex);$ws.proto.Window.superclass.destroy.apply(this,arguments);this.hide();},ok:function(){return this.close(true);},cancel:function(){return this.close(false);},shadowsOff:function(){this._window.removeClass("shadow radius");this._windowContent.removeClass("radius");if(this._titleBar){this._titleBar.removeClass("radius");}},shadowsOn:function(){this._window.addClass("shadow radius");this._windowContent.addClass("radius");if(this._titleBar){this._titleBar.addClass("radius");}},_getBorderSize:function(c){var d,b;d=this._window.outerWidth(false)-this._window.innerWidth()+this._windowContent.outerWidth(true)-this._windowContent.innerWidth()+this._container.outerWidth(true)-this._container.innerWidth();if(!c){d+=(parseInt(this._container.css("padding-left"),10)>=0?parseInt(this._container.css("padding-left"),10):0)+(parseInt(this._container.css("padding-right"),10)>=0?parseInt(this._container.css("padding-right"),10):0);}if(this._heightStore===""||c){b=this._window.outerHeight(false)-this._window.innerHeight()+this._windowContent.outerHeight(true)-this._windowContent.innerHeight()+this._container.outerHeight(true)-this._container.innerHeight()+(this._titleBar?this._titleBar.outerHeight(true):0);if(!c){b+=(parseInt(this._container.css("padding-top"),10)>=0?parseInt(this._container.css("padding-top"),10):0)+(parseInt(this._container.css("padding-bottom"),10)>=0?parseInt(this._container.css("padding-bottom"),10):0);this._heightStore=b;}}else{b=this._heightStore;}return{width:d,height:b};},_getContentSize:function(e,d,b,f){this._heightStore="";var c={width:b-e,height:f-d};c.width=(c.width>0)?c.width:0;c.height=(c.height>0)?c.height:0;return c;},moveWindow:function(c,b){this._suppressAutoCenter=true;this._systemDragWindow({left:c,top:b});},_checkWindowPosition:function(c){var b=$ws._const.$win.width(),f=$ws._const.$win.height(),d=$ws._const.$win.scrollTop(),e=$ws._const.$win.scrollLeft();if(c.left-e+this._width/2+20>b){c.left=Math.max(0,b-this._width/2-20)+e;}else{if(c.left-e<-this._width/2){c.left=-this._width/2+e;}}if(c.top-d+25>f){c.top=Math.max(0,f-25)+d;}else{if(c.top-d<0){c.top=d;}}},resizeToBrowser:function(b,c){this._systemResizeWindow({height:b,width:c});},_systemResizeWindow:function(d){var c={},b=this._getBorderSize(!(d.width||d.height));c.width=d.width===undefined?$ws._const.$win.width()-b.width:parseInt(d.width,10);c.height=d.height===undefined?$ws._const.$win.height()-b.height:parseInt(d.height,10);this._window.addClass("clear-box-shadow");this._container.css(c);this._window.removeClass("clear-box-shadow");},_systemDragWindow:function(b){var c={};this._checkWindowPosition(b);c.top=b.top===undefined?$ws._const.$win.scrollTop():b.top;c.left=b.left===undefined?0:b.left;this._window.css(c);},setSize:function(c){this._heightStore="";var b=this,d=parseInt(this._options.minWidth,10),g=parseInt(this._options.minHeight,10),f=parseInt(this._options.maxWidth,10),e=parseInt(this._options.maxHeight,10);this._width=parseInt(c.width,10);if(isNaN(this._width)){this._width="auto";}this._height=parseInt(c.height,10);if(isNaN(this._height)){this._height="auto";}if(this._width<d){this._width=d;}if(this._height<g){this._height=g;}if(this._width>f){this._width=f;}if(this._height>e){this._height=e;}if(c.centering){this.moveWindowToCenter(c);}b._onResizeHandler();},moveWindowToCenter:function(f){if(this._isMaximize||this._isMinimize){return;}var d=$ws.helpers.getScrollOffset(),g=$ws._const.$win,c=this._getBorderSize();var e=this._width!="auto"?this._width:this._container.width()||f.width,b=this._height!="auto"?this._height:this._container.height()||f.height;if(f&&f.firstRun){if(this._options.autoWidth&&this._options.origWidth>0){e=parseInt(this._options.origWidth,10)||0;}if(this._options.autoHeight&&this._options.origHeight>0){b=parseInt(this._options.origHeight,10)||0;}}this._left=f&&!isNaN(parseInt(f.left,10))?f.left:(g.width()-e-c.width)/2+d.left;this._top=f&&!isNaN(parseInt(f.top,10))?f.top:(g.height()-b-c.height)/2+d.top;if(this._left<0){this._left=0;}if(this._top<0){this._top=0;}this._systemDragWindow({left:this._left,top:this._top});},_moveWindow:function(c,b){this._left=c;this._top=b;this._systemDragWindow({left:c,top:b});},_restoreWindow:function(){this._systemResizeWindow({width:this._width,height:this._height});this._systemDragWindow({left:this._left,top:this._top});this._onResizeHandler();},_maximizeWindow:function(){if(!this._options.resizable){return;}this._isMaximize=!this._isMaximize;this.getContainer().toggleClass("ws-window-maximized",this._isMaximize);if(this._isMaximize){if(this._maximizeBtn){this._maximizeBtn.addClass("fill");}this._window.removeClass("ws-window-draggable");this._systemDragWindow({});this._systemResizeWindow({});if(this._resizeBtn){this._resizeBtn.hide();}}else{if(this._maximizeBtn){this._maximizeBtn.removeClass("fill");}this._window.addClass("ws-window-draggable");this._restoreWindow();if(this._resizeBtn){this._resizeBtn.show();}}this._onResizeHandler();},moveToTop:function(e){if(this._isShow){var b=this,d=$ws.single.WindowManager.getMaxZWindow(function(g){return !g.findParent(function(h){return h===b;});}),c=d&&d.getZIndex()||1000,f=this.getZIndex();if(e||c!=f){$ws.single.WindowManager.releaseZIndex(this._zIndex);this._zIndex=$ws.single.WindowManager.acquireZIndex(this._isModal);$ws.single.WindowManager.setVisible(this._zIndex);}this._window.css("z-index",this._zIndex);$(".ws-window-titlebar.active").removeClass("active");if(this._titleBar){this._titleBar.addClass("active");}return this._zIndex;}else{return -1;}},_mouseDown:function(c){if(this._isMaximize||$(c.target).parents().add(c.target).filter(".ws-window-titlebar-action").length){return true;}this.moveToTop();this.onBringToFront();var d=this._window.offset();this._pageXstart=c.pageX-d.left;this._pageYstart=c.pageY-d.top;this._windowWidthStart=this._container.width();this._windowHeightStart=this._container.height();this._mouseStarted=true;if(this._isResizing){var b=this._windowContent.offset();this._resizeBar=$("<div></div>").addClass("ws-window-resizebar").fadeTo(0,0.8).appendTo(document.body).css({top:b.top-$ws._const.TemplatedArea.padding+parseInt(this._windowContent.css("padding-top"),10),left:b.left-$ws._const.TemplatedArea.padding,width:this._width,height:this._height,"z-index":$ws.single.WindowManager.getMaxZIndex()+10});}$ws._const.$doc.bind("mousemove",$.proxy(this._mouseMove,this)).bind("mouseup",$.proxy(this._mouseUp,this));return c.preventDefault();},_mouseMove:function(c){if(this._mouseStarted){if(this._isResizing){this._resizeBar.css(this._getContentSize(this._left,this._top,c.pageX+this._windowWidthStart-this._pageXstart,c.pageY+this._windowHeightStart-this._pageYstart));}else{if(this._window.hasClass("shadow")){this._windowContent.css("visibility","hidden");if(!$.browser.msie){this._window.fadeTo(0,0.8);}this._window.removeClass("shadow").addClass("move");}var b=c.pageY<0?0:c.pageY;this._suppressAutoCenter=true;this._moveWindow(c.pageX-this._pageXstart,b-this._pageYstart);}}return c.preventDefault();},_mouseUp:function(b){this._windowContent.css("visibility","visible");if(!$.browser.msie){this._window.fadeTo(0,1);}this._window.addClass("shadow").removeClass("move");$ws._const.$doc.unbind("mousemove").unbind("mouseup");this._mouseStarted=false;if(this._isResizing){this._heightStore="";this.setSize(this._getContentSize(this._left,this._top,b.pageX+this._windowWidthStart-this._pageXstart,b.pageY+this._windowHeightStart-this._pageYstart));this._resizeBar.remove();this._isResizing=false;}},_onResizeHandler:function(){$ws.proto.Window.superclass._onResizeHandler.apply(this);if(!this._isMinimize){var b={width:this._width,height:this._height};this._systemResizeWindow(this._isMaximize?{}:b);if(this._canMoveToCenter()){this.moveWindowToCenter(b);}}},_canMoveToCenter:function(){return !this._suppressAutoCenter&&(this._window.offset()["top"]>$(window).scrollTop());},canAcceptFocus:function(){return this.isShow();}});return $ws.proto.Window;});