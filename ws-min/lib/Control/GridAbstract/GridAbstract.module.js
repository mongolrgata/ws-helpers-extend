$ws.declareModule({namespace:"SBIS3.CORE",name:"GridAbstract",imports:["SBIS3.CORE.TemplatedAreaAbstract"]},function(a){$ws.proto.GridAbstract=a.extend({$protected:{_options:{owner:undefined},_haveStretch:false,_isReady:false},$constructor:function(){this._options.owner=this;if(this._context&&this._craftedContext){this._context.destroy();}this._craftedContext=false;this._context=this._context.getPrevious();this._haveStretch=this._horizontalAlignment==="Stretch"||this._verticalAlignment==="Stretch";},_templateInnerCallback:function(){this._isReady=true;this._container.scrollTop(0);this._container.scrollLeft(0);this._notifyOnSizeChanged(this,this,true);this._notify("onReady");this._showControls();},_onSizeChangedBatch:function(){return true;},_skipOnResizeHandler:function(){return(!this._isReady||(!this._haveStretch&&!this._needForceOnResizeHandler()));},registerDefaultButton:function(){var b=this.getParent();if(b&&b.registerDefaultButton){b.registerDefaultButton.apply(b,arguments);}}});return $ws.proto.GridAbstract;});