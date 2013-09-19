$ws.declareModule({namespace:"SBIS3.CORE",name:"RecordFloatArea",imports:["SBIS3.CORE.DialogRecord","SBIS3.CORE.FloatArea","SBIS3.CORE.ModalOverlay"]},function(c,b,a){$ws.proto.RecordFloatArea=b.extend({$protected:{_options:{readOnly:false,isNewRecord:false,reports:{},isModal:false,doNotLossFocus:false,editFullScreenTemplate:""},_pending:[],_waiting:[],_record:null,_recordSaved:false,_loadingIndicator:undefined,_saving:false,_reportPrinter:null,_printMenu:null,_printMenuIsShow:false,_lastMenuItemList:[],_window:{remove:function(){},hide:function(){},_titleBar:true},_isModal:false,_isClosed:true,_standartYOffset:1,_standartWindowOffset:64,_firstTopOffset:64,_bottomOffset:14},$constructor:function(){this._publish("onBeforeDelete","onRecordDeleted","onBeforeSave","onSave","onSuccess","onFail","onRecordUpdate","onAfterClose","onBeforeClose","onBeforeShowPrintReports","onPrepareReportData","onSelectReportTransform","onChangeRecord");if(this.getReports().length!==0){this._reportPrinter=new $ws.proto.ReportPrinter({});}this.subscribe("onAfterClose",function(){if(this._isModal){a.adjust();}this.destroy();});this.subscribe("onBeforeClose",function(){$(window).unbind("scroll");this._isClosed=true;});this.subscribe("onReady",this._onReady);this.subscribe("onAfterLoad",this._onAfterLoad);this.subscribe("onBeforeShow",function(){this._firstTopOffset=this.getContainer().offset().top;this._bottomOffset=parseInt(this.getContainer().parent().css("bottom"),10);this.setRecordFloatOffset();if(!this._options.editFullScreenTemplate){return;}var e=$('<div class="ws-record-float-area-container"></div>'),i=this._title.text(),h=$('<div class="ws-record-float-area-icon icon-16 icon-NewTab icon-disabled action-hover"></div>'),g=this._title.attr("style"),f=this,d=this.getContainer().find("[sbisname=windowTitle] span pre:first");this._title.html($('<a href="javascript:void(0)">'+$ws.helpers.escapeHtml(i)+"</a>")).attr("style",g);this._title.addClass("ws-record-float-area-title");this._title.append(h);this._title.hover(function(){h.toggleClass("icon-hover","icon-disabled");});if(d.length>0){d.empty().append(e);e.removeClass("ws-record-float-area-container");}else{this.getContainer().find(".ws-area:first").append(e);}this.getContainer().parent().addClass("ws-record-float-area-border");e.append(this._title);this._title.bind("click",function(q){var k=f.getRecord(),m=k.getColumns(),p={},o={id:k.getKey(),parentId:k.getParentKey(),isBranch:k.isBranch()},n=f.getOpener();for(var l=0,j=m.length;l<j;l++){if(k.isChanged(m[l])){p[m[l]]=k.get(m[l]);}}if(n.isHierarchyMode()){n.openWindowRecord(o,n.generateEditPageURL(o.id,o.isBranch,null,false,undefined,p,f._options.editFullScreenTemplate));}else{n.openWindowRecord(o,n.generateEditPageURL(o.id,undefined,p,f._options.editFullScreenTemplate));}f.hide(0);q.stopImmediatePropagation();return false;});});this.subscribe("onAfterShow",function(){this._isClosed=false;this._scrollPosition(this.getContainer().parent().parent());if(this._isModal){a.adjust();}});$ws.single.CommandDispatcher.declareCommand(this,"ok",function(){c.prototype.ok.apply(this,[]);});$ws.single.CommandDispatcher.declareCommand(this,"close",function(){c.prototype.close.apply(this,[]);});$ws.single.CommandDispatcher.declareCommand(this,"cancel",function(){c.prototype.cancel.apply(this,[]);});$ws.single.CommandDispatcher.declareCommand(this,"save",function(d,e){c.prototype.save.apply(this,[d,e]);});$ws.single.CommandDispatcher.declareCommand(this,"delete",function(){c.prototype.delRecord.apply(this,arguments);});$ws.single.CommandDispatcher.declareCommand(this,"print",function(d){c.prototype.print.apply(this,[d]);});$ws.single.CommandDispatcher.declareCommand(this,"printReport",function(d){c.prototype.printReport.apply(this,[d]);});},_onAfterLoad:function(){this.show();},_onReady:function(){var h=this.getChildControls(),f=this,e=function(m,l,k){var n=k?k.getParentWindow():undefined,j=f.getContainer(),i=k?k.getTopParent():undefined;if(k===f.getOpener()){f.moveToTop();return;}if(!f._isClosed&&f._state!=="hide"&&!l&&k&&f.getOpener().getContainer().find(k.getContainer()).length<1&&j.find(k.getContainer()).length<1&&!k.getTopParent().isModal()&&f.getOpener()!==k&&i!==this.getTopParent()&&i.getOpener()!==this&&i!==f){if((!n||!n.getOpener())||(n.getOpener()&&j.find(n.getOpener().getContainer())<1)){f.hide();}}};if(!this._options.doNotLossFocus){return true;}for(var g=0,d=h.length;g<d;g++){h[g].subscribe("onFocusOut",e);}f.subscribe("onFocusOut",e);f.getOpener().subscribe("onFocusOut",e);},_prepareElements:function(){$ws.proto.RecordFloatArea.superclass._prepareElements.apply(this,arguments);},_scrollPosition:function(d){var e=this,f=0;d.addClass("ws-record-float-area-fixed");$(window).scroll(function(){var k=$(window).scrollTop(),j=d.offset().top,g=e.getOpener().getContainer(),i=document.documentElement.clientHeight,h=d.height();if(k>e._firstTopOffset){if(h<=i){d.css({top:(k)+"px"});}else{if(f>k){if(k<=j){d.css({top:(k)+"px"});}f=k;return;}else{if((g.height()+g.offset().top+2)>=(k+i)&&((k+i)>(h+j-e._bottomOffset))){d.css({top:(k+i)-h+e._bottomOffset+"px"});}}}}else{d.css({top:(e._firstTopOffset)+"px"});}f=k;});},_openConfirmDialog:function(j,d){var g=this,f=true,e=new $ws.proto.Deferred;if(!this._options.readOnly&&this.getRecord().isChanged()){var i=false,h=j?!j:true;f=false;$ws.core.attachInstance("SBIS3.CORE.DialogConfirm",{opener:this,resizable:false,message:"Сохранить изменения?",handlers:{onKeyPressed:function(l,k){if(k.keyCode==$ws._const.key.esc){i=true;h=false;}},onConfirm:function(l,k){if(k){g.updateRecord().addBoth(function(){e.callback(k);});return;}else{if(!i){g.getRecord().rollback();}}e.callback(k);},onAfterClose:function(){if(h){g.hide();}}}});}return d?e:f;},isRecordSaved:function(){return this._recordSaved;},updateRecord:function(){return c.prototype.updateRecord.apply(this,[]);},_checkPendingOperations:function(){return c.prototype._checkPendingOperations.apply(this,arguments);},save:function(){return c.prototype.save.apply(this,arguments);},_processError:function(d){c.prototype._processError.apply(this,[d]);},hide:function(){if(!this._isClosed){c.prototype.close.apply(this,arguments);}},ok:function(){c.prototype.ok.apply(this,arguments);},_setEnabledForChildControls:function(){c.prototype._setEnabledForChildControls.apply(this,arguments);},_showLoadingIndicator:function(){c.prototype._showLoadingIndicator.apply(this,arguments);},_hideLoadingIndicator:function(){c.prototype._hideLoadingIndicator.apply(this,arguments);},isAllReady:function(){return c.prototype.isAllReady.apply(this,arguments);},getChildControls:function(){return c.prototype.getChildControls.apply(this,arguments);},getReports:function(){return c.prototype.getReports.apply(this,arguments);},_printMenuItemsIsChanged:function(){return c.prototype._printMenuItemsIsChanged.apply(this,arguments);},_createPrintMenu:function(d){return c.prototype._createPrintMenu.apply(this,arguments);},showReportList:function(d){return c.prototype.showReportList.apply(this,arguments);},printReport:function(d){return c.prototype.printReport.apply(this,arguments);},_showReport:function(d,f,e){return c.prototype._showReport.apply(this,arguments);},print:function(d){return c.prototype.print.apply(this,arguments);},getTitle:function(){return document.title;},_restartShowSlide:function(){this._showSlideAnimate(this._options.animationLength);},_hideWindow:function(){},getRecord:function(){return c.prototype.getRecord.apply(this,arguments);},setReadOnly:function(){c.prototype.setReadOnly.apply(this,arguments);},isNewRecord:function(){return c.prototype.isNewRecord.apply(this,arguments);},setRecordFloatOffset:function(){var d=$(window).scrollTop();if(d>this._standartWindowOffset){this.setOffset({y:d-this._standartWindowOffset-1});}else{this.setOffset({y:this._standartYOffset});}},setRecord:function(d){var e=this;this.setRecordFloatOffset();if(this.getRecord().isChanged()){this._openConfirmDialog(true,true).addCallback(function(){e._setRecord(d);});}else{this._setRecord(d);}},_setRecord:function(e){var d=this.getRecord();this.getLinkedContext().setContextData(e);this._notify("onChangeRecord",e,d);},_dialogRecordSuperClassClose:function(){this.close(arguments[0]);},close:function(){return $ws.proto.RecordFloatArea.superclass.hide.apply(this,arguments);}});return $ws.proto.RecordFloatArea;});