$ws.declareModule({namespace:"SBIS3.CORE",name:"RaphaelDrawerInternal",imports:["SBIS3.CORE.Control"]},function(){var f=$ws.helpers.forEach;function i(r){r={v:r};var q=$ws.core.merge({},r,{clone:true});return q.v;}function h(q,r){return $ws.core.merge(q,r,{clone:true});}function j(q){q.right=q.left+q.width;q.bottom=q.top+q.height;return q;}function l(q){if(q===undefined){return[];}else{if(q instanceof Array){return q;}else{return[q];}}}function e(q){return q instanceof Array;}function a(r,q){var B={},s,t,A,w,v,z,y,x;q=q||{};function u(C){return typeof C==="object"&&C!==null&&!(C instanceof Date);}for(w in r){if(r.hasOwnProperty(w)&&!q.hasOwnProperty(w)){B[w]=u(r[w])?i(r[w]):r[w];}}for(w in q){if(q.hasOwnProperty(w)){s=q[w];if(u(s)){if(r.hasOwnProperty(w)&&u(r[w])){t=r[w];A=e(t);if(e(s)){y=[];for(v=0,z=s.length;v!==z;v++){x=A?(t[v]||{}):t;y.push(h(i(x),s[v]));}B[w]=y;}else{if(A){B[w]=i(s);}else{B[w]=a(t,s);}}}else{B[w]=i(s);}}else{B[w]=s;}}}return B;}function p(q){return q instanceof $ws.proto.Deferred?q:(new $ws.proto.Deferred()).callback(q);}function n(s,r){var q=function(){var t,u=arguments;this._readyDefCallbackWrapperCnt++;try{t=s.apply(this,u);}finally{this._readyDefCallbackWrapperCnt--;}return t;};return r?q.bind(r):q;}function c(r){function t(u){return u instanceof $ws.proto.Deferred&&!u.isReady();}function s(){return this.getReadyDeferred();}function q(w,v){var u;this._readyDefWrapperCnt++;try{u=w.apply(this,v);if(t(u)){if(s.call(this).isReady()){this._resetDeadyDeferred();}this._readyDeferred.push(u);}}finally{this._readyDefWrapperCnt--;if(this._readyDefWrapperCnt===0){if(!s.call(this).isReady()){this._readyDeferred.done();}}}return u;}return function(){var u,w=arguments;if(this._isInitialized){if(this._readyDefCallbackWrapperCnt===0){var v=s.call(this);if(this._readyDefWrapperCnt>0||v.isReady()){u=p(q.call(this,r,w));}else{u=v.addBoth(function(){return q.call(this,r,w);}.bind(this)).createDependent();}}else{u=r.apply(this,w);}}else{u=r.apply(this,w);if(t(u)){this._readyDeferred.push(u);}}return u;};}function b(q){return Array.prototype.slice.call(q);}function m(q){return typeof q==="string"||typeof q==="number"||q===null||q===undefined;}var o=$ws.proto.Abstract.extend({$protected:{_visible:true,_visibleImplicit:true,_drawBounds:null,_chart:null,_graphSet:[],_graphSetPermanent:[],_validState:{drawing:false},_drawBoundsInvalidateParts:["drawing"],_eventNames:{onElementCustomDraw:1,onElementMouseDown:1,onElementMouseUp:1,onElementMouseOver:1,onElementMouseOut:1}},$constructor:function(q){this._visible=(q.visible!==undefined)?q.visible:true;this._chart=q.chart;delete q.chart;f(this._eventNames,function(s,r){this._publish(r);if(q[r]){this.subscribe(r,q[r]);}},this);this._publish("onChange");},_setVisibleImplicit:function(q){this._visibleImplicit=q;},setVisible:function(q){if(this._visible!==q){this._visible=q;this._chart._onComponentChange("element","visible");}},getVisible:function(){return this._visible&&this._visibleImplicit;},_invalidate:function(r){if(r){f(l(r),function(s){this._validState[s]=false;},this);}else{for(var q in this._validState){if(!this._validState.hasOwnProperty(q)){continue;}this._validState[q]=false;}}},_invalidateDrawBounds:function(){f(this._drawBoundsInvalidateParts,function(q){this._invalidate(q);},this);},_needValidatePart:function(q,r){return q[r]&&!this._validState[r];},_setDrawBounds:function(q){this._invalidateDrawBounds();this._drawBounds=q;},_getDrawBounds:function(){return this._drawBounds;},_clearDraw:function(q){f(this._graphSet,function(r){r.remove();});this._graphSet=[];if(q){f(this._graphSetPermanent,function(r){r.remove();});this._graphSetPermanent=[];}},_remove:function(){this._clearDraw(true);f(this._eventNames,function(r,q){this.unbind(q);},this);},_dataChanged:function(){this._invalidate();},_registerElementsBindEvents:function(s,r,t){var q=this;f(s,function(u){if(u.isOld){return;}if(t){q._graphSetPermanent.push(u);}else{q._graphSet.push(u);}if(r){if(q.hasHandlersForEvent("onElementMouseDown")){u.mousedown(function(){q._notify.apply(q,["onElementMouseDown"].concat(r,q));});}if(q.hasHandlersForEvent("onElementMouseUp")){u.mouseup(function(){q._notify.apply(q,["onElementMouseUp"].concat(r,q));});}if(q.hasHandlersForEvent("onElementMouseOver")){u.mouseover(function(){q._notify.apply(q,["onElementMouseOver"].concat(r,q));});}if(q.hasHandlersForEvent("onElementMouseOut")){u.mouseout(function(){q._notify.apply(q,["onElementMouseOut"].concat(r,q));});}}});},_customDrawFn:function(){var q=[],r=this;if(r.hasHandlersForEvent("onElementCustomDraw")){r.enumerateElements(function(){var t=l(r._notify.apply(r,["onElementCustomDraw"].concat(b(arguments)))),s=b(arguments);f(t,function(u){if(u){q.push({element:u,drawEventArgs:s});}});});}return q;}});var k=function(q,s,v,r){var u={start:0,center:0.5,end:1}[s],w={left:{left:0,top:0,x:0,y:1,mLeft:1,mTop:0,mRight:0,mBottom:0,width:0},right:{left:1,top:0,x:0,y:1,mLeft:0,mTop:0,mRight:1,mBottom:0,width:0},top:{left:0,top:0,x:1,y:0,mLeft:0,mTop:1,mRight:0,mBottom:0,width:1},bottom:{left:0,top:1,x:1,y:0,mLeft:0,mTop:0,mRight:0,mBottom:1,width:1}}[q],t={top:null,bottom:null,left:"270",right:"90"};if(w===undefined){throw new Error(v);}if(u===undefined){throw new Error(r);}return{getStartPoint:function(A){var z=A.left+(w.left*A.width)+(u*w.x*A.width),B=A.top+(w.top*A.height)+(u*w.y*A.height);return{x:z,y:B};},getSideKoefs:function(){return w;},getSideRotate:function(){return t;},getPositionElementOnSideDiff:function(D,C,B){var A=C.left+C.width,z=C.top+C.height,y=(A-B)-D.x2,x=(z-B)-D.y2;if(y>0){y=Math.max(0,(C.left+B)-D.x);}if(x>0){x=Math.max(0,(C.top+B)-D.y);}return{x:y,y:x};}};};var g=o.extend({$protected:{_legends:[],_padding:0,_sideKoefs:undefined,_interLegendPadding:undefined,_legendLineWidth:undefined,_legendLineTextPadding:undefined,_textStyle:undefined,_config:undefined,_side:undefined,_explicitWidth:undefined,_explicitHeight:undefined,_sideCalc:undefined,_layout:{layoutMargin:undefined,elementsOrdered:undefined}},$constructor:function(q){this._config=q;this._legends=q.legends;this._padding=parseFloat(q.padding);if(isNaN(this._padding)||(this._padding<0)){throw new Error("Задан неправильный параметр  padding у легенды. "+q.padding+" Он должен быть числом больше или равным нулю.");}this._interLegendPadding=parseFloat(q.interLegendPadding);if(isNaN(this._interLegendPadding)||(this._interLegendPadding<0)){throw new Error("Задан неправильный параметр interLegendPadding у легенды. "+q.interLegendPadding+" Он должен быть числом больше или равным нулю.");}this._legendLineWidth=parseFloat(q.legendLineWidth);if(isNaN(this._legendLineWidth)||(this._legendLineWidth<=0)){throw new Error("Задан неправильный параметр legendLineWidth у легенды. "+q.legendLineWidth+" Он должен быть числом больше нуля.");}this._legendLineTextPadding=parseFloat(q.legendLineTextPadding);if(isNaN(this._legendLineTextPadding)||(this._legendLineTextPadding<=0)){throw new Error("Задан неправильный параметр legendLineTextPadding у легенды. "+q.legendLineTextPadding+" Он должен быть числом больше нуля.");}this._textStyle=q.textStyle;this._frameStyle=q.frameStyle;this._sideCalc=k(q.side,q.sidePosition,"Задан неправильный параметр side у легенды. "+q.side+" Он должен быть одним из вариантов: left/right/top/bottom.","Задан неправильный параметр sidePosition у легенды. "+q.sidePosition+" Он должен быть одним из вариантов: start/center/end.");this._side=q.side;this._sideKoefs=this._sideCalc.getSideKoefs();if(q.width!==undefined){this._explicitWidth=parseFloat(q.width);if(isNaN(this._explicitWidth)){throw new Error("Задан неправильный параметр width у легенды. "+q.width);}}if(q.height!==undefined){this._explicitHeight=q.height;if(isNaN(this._explicitHeight)){throw new Error("Задан неправильный параметр height у легенды. "+q.height);}}},getSide:function(){return this._side;},_setLegends:function(q){this._legends=q;},_clearDraw:function(){var q=g.superclass._clearDraw;q.call(this);this._layout.elementsOrdered=[];},_createLayout:function(){function V(ad,ac,ae){if(isNaN(ad.x)||isNaN(ad.y)||isNaN(ad.height)||isNaN(ad.width)){ad.x=ac;ad.y=ae;ad.height=5;ad.width=5;ad.x2=ad.x+ad.width;ad.y2=ad.y+ad.height;}}var P=this._layout,I=(this._drawBounds.width-this._padding*2)*this._sideKoefs.width,R=this._sideCalc.getStartPoint(this._drawBounds),G=R.x,q=R.y,E=this._chart.getCanvas();P.layoutMargin={left:0,top:0,right:0,bottom:0};P.elementsOrdered=[];if(!E||!this.getVisible()){return;}if(this._explicitWidth!==undefined){I=this._explicitWidth-this._padding*2;}function r(x,ac,y){if(y!==null){x.pop();y.remove();}x.pop();ac.remove();}var Z,T=G,S=q,J=G,Y=G,z=[],U,M,aa,D,u=0,K=0,H=q,ab=G,v,Q,F,W;if(this._explicitHeight!==undefined){W=H+this._explicitHeight-this._padding*2;}else{W=Number.MAX_VALUE;}for(Z=0;Z<this._legends.length;Z++){if(T-G>I){S=S+u+this._interLegendPadding;T=G;u=0;K=0;}U=this._legends[Z];F=parseInt(U.style["stroke-width"],10);if(F&&F>1){T+=F/2;}M=E.rect(T,S,this._legendLineWidth,1).attr(U.style);z.push(M);D=M.getBBox();V(D,T,S);u=Math.max(D.height,u);A=D.height;H=Math.min(H,D.y);ab=Math.min(ab,D.x);Y=J;J=Math.max(J,D.x2);T=D.x2+this._legendLineTextPadding;if(this._textStyle){aa=E.text(T,S,U.description).attr({"text-anchor":"start"}).attr(this._textStyle);z.push(aa);D=aa.getBBox();V(D,T,S);ab=Math.min(ab,D.x);u=Math.max(D.height,u);A=Math.max(D.height,A);T=D.x2+this._interLegendPadding;J=Math.max(J,D.x2);aa.attr({y:S+A/2});}else{aa=null;}M.attr({y:S+A/2});K++;if(S+u-H>W){r(z,M,aa);J=Y;break;}if(K>1&&(D.x2-G>I)){r(z,M,aa);Z--;S=S+u+this._interLegendPadding;T=G;J=Y;u=0;K=0;}}if(this._explicitHeight!==undefined){v=W-H;}else{v=S+u-H;}if(this._explicitWidth!==undefined){Q=Math.max(I,J-ab);}else{Q=J-ab;}var L=Q&&(Q+this._padding*2),X=v&&(v+this._padding*2),N=L&&(L+this._padding*2),A=X&&(X+this._padding*2),C=ab-this._padding*2,B=H-this._padding*2,s=(L&&X&&this._frameStyle)?E.rect(ab-this._padding,H-this._padding,L,X).attr(this._frameStyle):null,O;if(s){z=[s].concat(z);}var w=(G-C)-N/2,t=(q-B)-A/2;C+=w;B+=t;if(B<this._drawBounds.top){t+=this._drawBounds.top-B;}else{if(B+A>this._drawBounds.top+this._drawBounds.height){t-=(B+A-this._drawBounds.top-this._drawBounds.height);}}if(C<this._drawBounds.left){w+=this._drawBounds.left-C;}else{if(C+N>this._drawBounds.left+this._drawBounds.width){w-=(C+N-this._drawBounds.left-this._drawBounds.width);}}for(Z=0,O=z.length;Z!==O;Z++){this._graphSet.push(z[Z]);z[Z].hide();z[Z].attr({x:z[Z].attr("x")+w,y:z[Z].attr("y")+t});}P.elementsOrdered=z;P.layoutMargin={left:N*this._sideKoefs.mLeft,top:A*this._sideKoefs.mTop,right:N*this._sideKoefs.mRight,bottom:A*this._sideKoefs.mBottom};this._validState.drawing=true;},_getLayout:function(){if(!this._validState.drawing){this._createLayout();}return this._layout;},_getLayoutMargin:function(){return this._getLayout().layoutMargin;},_getInsideChart:function(){return !!this._config.insideChart;},_draw:function(){var s=this._getLayout().elementsOrdered,q,r;for(q=0,r=s.length;q!==r;q++){s[q].show().toFront();}}});var d={defaultLegendStyle:{side:"top",sidePosition:"center",visible:true,insideChart:false,padding:10,interLegendPadding:10,legendLineWidth:30,legendLineTextPadding:10,textStyle:{"font-size":14},frameStyle:{stroke:"gray",r:5,"stroke-width":1,fill:"lightgray","fill-opacity":0.8}},side:{left:"left",right:"right",top:"top",bottom:"bottom"}};$ws.proto.RaphaelAbstractGraph=$ws.proto.Control.extend({$protected:{_options:{width:undefined,height:undefined,dataSource:false,recordSet:undefined,margin:{right:0,left:0,top:0,bottom:0},linkedContext:undefined,raphael:null},_recordset:undefined,_chartData:[],_internalChangeCnt:0,_readyDeferred:null,_isInitialized:false,_readyDefWrapperCnt:0,_readyDefCallbackWrapperCnt:0,_firstSetSize:true},$constructor:function(){this._publish("onClick","onHover","onOutHover","onAfterLoad","onRecordSetChange");this._resetDeadyDeferred();this._updateDataHandler=this._updateData.bind(this);this._options.width=parseFloat(this._options.width);this._options.height=parseFloat(this._options.height);if(!this._options.width&&this._container){this._options.width=this._container.width();}if(!this._options.height&&this._container){this._options.height=this._container.height();}var r=this._options.margin;for(var q in r){if(r.hasOwnProperty(q)){r[q]=parseInt(r[q],10);if(isNaN(r[q])){r[q]=0;}else{r[q]=Math.max(0,r[q]);}}}},getReadyDeferred:function(){return this._readyDeferred.getResult();},_resetDeadyDeferred:function(){this._readyDeferred=new $ws.proto.ParallelDeferred();this._readyDeferred.getResult().addCallback(function(){this._notify("onReady");}.bind(this));},_initLibs:c(function(){var r=this,q;if(this._options.raphael){q=(new $ws.proto.Deferred()).callback();}else{q=$ws.core.attach("ext/graphael/raphael-min.js").addCallback(function(){return $ws.core.attach("ext/graphael/g.raphael-min.js").addCallback(function(){r._options.raphael=window.Raphael;});});}return q;}),getCanvas:function(){return this._options.canvas;},_inInternalChange:function(){return this._internalChangeCnt>0;},_runInternalChange:function(q){this._internalChangeCnt++;try{q.call(this);}finally{this._internalChangeCnt--;}},init:function(){this._initLibs().addCallback(function(){this._initChart();this.draw();this._readyDeferred.done();}.bind(this));this._isInitialized=true;$ws.proto.RaphaelAbstractGraph.superclass.init.call(this);},draw:function(){if(this._inInternalChange()||!this._options.canvas){return;}this._drawChart();},_initChart:function(){if(!this._options.canvas){this._options.canvas=this._options.raphael(this._container.get(0),this._options.width,this._options.height);}},_updateData:n(function(){var q,r=[];if(this._recordset){this._recordset.rewind();while((q=this._recordset.next())!==false){r.push(q.toObject());}}this.setData(r);}),_clearData:function(){throw new Error("Method AbstractGraph::_clearData must be implemented");},setDataSource:c(function(u,t){var s=this,r;if("context" in u){delete u.context;}u=i(u);if(t.filterParams){u.filterParams=t.filterParams;}r=i(u);r.context=this._options.linkedContext;u.context=this._options.linkedContext;this._options.dataSource=u;var q=new $ws.proto.Deferred(),v=function(w){if(u.firstRequest){w.once("onAfterLoad",n(function(){s.setRecordSet(w);q.callback();},s));}else{q.callback();}};$ws.core.attachInstance("Source:RecordSet",r).addCallback(v);return q;}),setQuery:c(function(t,q,r){var s=this.getRecordSet();if(s){return s.setQuery(t,q,r);}else{throw new Error("У диаграммы не задан рекордсет, к которому можно было бы делать запрос. Настройте источник данных диаграммы в Джинне или через методы setRecordSet/setDataSource");}}),reload:c(function(){var r=this.getRecordSet(),q;if(r){q=r.reload();}else{q=this.setData(this._chartData||[]);}return q;}),setRecordSet:c(function(r){var q=this._recordset;if(q){q.unsubscribe("onAfterLoad",this._updateDataHandler);}this._recordset=r;if(this._recordset){this._recordset.subscribe("onAfterLoad",this._updateDataHandler);this._updateData();}else{this.setData([]);}this._notify("onRecordSetChange",r,q);}),getRecordSet:function(){return this._recordset;},_getLegendConfig:function(r,q){var s=i(q);return r?h(s,r):(r===undefined?s:h(s,{visible:false}));},setData:c(function(q){this._chartData=q;}),_remove:function(){throw new Error("Method AbstractGraph::_remove must be implemented");},destroy:function(){this._remove();$ws.proto.RaphaelAbstractGraph.superclass.destroy.apply(this,arguments);},_drawChart:function(){throw new Error("Method AbstractGraph::_drawChart must be implemented");},_layout:function(){throw new Error("Method AbstractGraph::_layout must be implemented");},setSize:function(s,q){if(this._options.width!==s||this._options.height!==q||this._firstSetSize){this._firstSetSize=false;this._options.width=s;this._options.height=q;var r=this.getCanvas();if(r){r.setSize(s,q);this.draw();}}},_onResizeHandler:function(){this.setSize(this._container.width(),this._container.height());}});return{RaphaelAbstractGraph:$ws.proto.RaphaelAbstractGraph,CommonGraphConst:d,ChartLegend:g,ChartBaseElement:o,helpers:{clone:i,extend:h,ensureArray:l,extendStyle:a,readyDefWrapper:c,argumentsToArray:b,inBoundsBySideCalc:k,normalizeBounds:j,isSimpleValue:m,isArray:e}};});