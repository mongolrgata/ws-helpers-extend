$ws.declareModule({namespace:"SBIS3.CORE",name:"MasterProgress",imports:["SBIS3.CORE.Control","SBIS3.CORE.Marker"]},function(a){var b=160;$ws.proto.MasterProgress=a.Control.extend({$protected:{_options:{masterId:"",changeMaster:false},_stepCount:0,_stepWidth:0,_arrow:undefined,_steps:undefined,_master:undefined,_changed:false,_alowed:{}},$constructor:function(){var c=this;this._publish("onStepClick");$ws.single.ControlStorage.waitChild(this._options.masterId).addCallback(function(d){c._master=d;c._init(d.getSteps());return d;});this.getTopParent().subscribe("onBeforeClose",function(){$ws.single.Marker.hide();});},_redraw:function(){this._container.remove();$ws.single.ControlStorage.waitChild(this._options.masterId).addCallback(function(c){self._master=c;self._init(c.getSteps());return c;});},_init:function(d){var c=this;c._steps=d;c._stepCount=c._steps.length;c._stepWidth=c._container.width()/c._stepCount;c._arrow=$('<div class="ws-master-progress-arrow"></div>');var g=$('<div class="ws-master-progress"></div>');for(var e=0;e<c._stepCount;e++){var h='<div class="ws-master-progress-step"><div class="ws-master-progress-markered"><span id="step-'+(e+1)+'" class="ws-master-progress-title">'+(e+1)+". "+c._steps[e].title+"</span></div></div>";g.append($('<div id="ws-master-progress-'+c._steps[e].id+'" step="'+e+'" class="ws-master-progress-step-container"></div>').append(h).css("width",100/c._stepCount+"%"));c._alowed[e+1]=false;}c._container.append(g.append($('<div class="ws-master-progress-scale"></div>').append(c._arrow)));if(c._options.changeMaster){c._bindClick();}else{$(".ws-master-progress-step-container").addClass("ws-master-progress-step-container-disactive");}c._addEventListener();c._setPadding();var f=c._master.getStep();c.setStepState(f,true);c._setStep(f,false);},_bindClick:function(){var c=this;$(".ws-master-progress-step-container").bind("click",function(){var d=$(this).attr("step");d=parseInt(d,10)+1;if(c._notify("onStepClick",d,c._getId(d))!==false){c._setStep(d,true);}});},_setWidthScale:function(e){var c;for(var d=1;d<=this._stepCount;d++){c=(d<=e);$('.ws-master-progress-step-container[step="'+(d-1)+'"]').toggleClass("ws-master-progress-fill",c);$("#step-"+d).toggleClass("ws-master-progress-title-active",c);}if(e!==this._stepCount){this._arrow.css({left:Math.floor(this._stepWidth*e-8),display:"block"});}else{this._arrow.hide();}$("[step="+(e-1)+"] span").addClass("ws-master-progress-passed");},_setStep:function(d,e){var c=this._master.getStep();if(e&&d!==1&&(d>c)&&!this._master.validate(c)||!this._alowed[d]){return;}this.setStepState(d,true);this.openStep(d+1);this._setWidthScale(d);this._setMarker(d);if(e){this._setStepInMaster(d);}},openStep:function(c){this._alowed[c]=true;$("[step="+(c-1)+"]").css("cursor","pointer");},isOpen:function(c){return this._alowed[c];},_setPadding:function(){for(var e=0;e<this._stepCount;e++){var f=$("#step-"+(e+1)),d=f.parent(),h=d.parent(),g=h.parent(),c=g.width()-f.width()<10?160:f.width()+4;c=c>b?c:b;d.width(c);h.css("padding-top",f.height()>20?10:17);}},_setMarker:function(c){var d=$("#step-"+c).parent();$ws.single.Marker.positionToElement(d,{width:25,left:-11});$ws.single.Marker.setZIndex(this.getTopParent().getZIndex()+1);},_setStepInMaster:function(c){this._changed=true;this._master.setStep(c);},_addEventListener:function(){var c=this;this._master.subscribe("onStepReady",function(f,d){if(c._changed){c._changed=false;}else{c._setStep(d,false);}});},_getId:function(c){return this._steps[c-1].id;},_onResizeHandler:function(){this._stepWidth=this._container.width()/this._stepCount;if(this._stepWidth<180){this._stepWidth=180;}this._setPadding();this._setStep(this._master.getStep(),false);},setStepState:function(d,f){var e,c;if(typeof d=="number"){e=$("[step="+(d-1)+"]");c=d;}else{if(typeof d=="string"){e=$("#ws-master-progress-"+d);c=parseInt(e.attr("step"),10)+1;}else{return false;}}this._alowed[c]=f;e.css("cursor",f?"pointer":"default").toggleClass("ws-master-progress-alow",f);},setSteps:function(c){this._stepCount=c.length;for(var d in this._steps){if(this._steps.hasOwnProperty(d)){this._container.find("#ws-master-progress-"+this._steps[d].id).width(100/this._stepCount+"%").toggle($.inArray(this._steps[d].id,c)!==-1);}}this._notifyOnSizeChanged(this,this);}});return $ws.proto.MasterProgress;});