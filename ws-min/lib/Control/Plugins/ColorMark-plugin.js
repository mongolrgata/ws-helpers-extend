$ws.declareModule({name:"ColorMarkPlugin",namespace:"SBIS3.CORE.PLUGINS",imports:["SBIS3.CORE.FloatArea"]},function(b){var k=134217728,h=67108864,j=33554432,m=16777216,c={},a=["#000000","#EF463A","#72BE44","#0055BB","#A426D9","#999999"],n;n=b.extend({$protected:{_spec:false,_history:[],_options:{offset:{x:0,y:-4},browserName:"",side:"right",animation:"fade",autoHide:true,verticalAlign:"top",direction:"left",fitWindow:true,template:"colorize",spec:"",fullShadow:true}},$constructor:function(){this._publish("onApply");this.subscribe("onBeforeShow",function(){var o=this;if(this._history.length===0){this._loadHistory().addCallback(function(){o._drawHistory();});}else{this._drawHistory();}});this.subscribe("onReady",function(){var s=this,o=this.getChildControlByName("Цвета"),q=this.getChildControlByName("Стили"),p=this.getChildControlByName("Пометить"),r=this.getChildControlByName("ПримерИстория");o.setContent(this._createColorsBlockHtml());o.getContainer().find(".ws-colorize-colors").delegate(".ws-colorize-color","click",function(){var t=$(this);$(".ws-colorize-active").removeClass("ws-colorize-active");t.addClass("ws-colorize-active");s._spec.color=t.data("color");s._updateSample();});r.setContent(this._createSampleBlockHtml());r.getContainer().find(".ws-colorize-history").delegate(".ws-colorize-history-item","click",function(){s._notify("onApply",e($(this).data("spec")));s.hide();});q.subscribe("onChange",function(u,t,v){s._spec[v]=t.get(v);s._updateSample();});$ws.helpers.forEach(q.getChildControls(true),function(t){t.getContainer().addClass("ws-colorize-altered-"+t.getName());});p.subscribe("onActivated",function(){var t=e(s._spec);s._notify("onApply",t);if(t!==0&&Array.indexOf(s._history,t)==-1){if(s._history.length===3){s._history.pop();}s._history.unshift(t);s._saveHistory();}s.hide();});if(this._spec===false){this.setSpec(this._options.spec);}});},_drawHistory:function(){var o=this;this.getChildControlByName("ПримерИстория").editContent(function(r){var p="",q="";$ws.helpers.forEach(o._history,function(t,s){var u=i(t);if(!u){u=f(t,true);q+=c[u];}p+='<li data-spec="'+t+'" class="ws-colorize-history-item '+u+'">Тип '+(s+1)+"</li>";});if(q){$ws.helpers.insertCss(q);}r.find(".ws-colorize-history").html(p);});},_loadHistory:function(){var o=this;return $ws.single.UserConfig.getParam("colorize-history").addCallback(function(p){p=p||"";if(p.length){o._history=p.split("|");}else{o._history=[];}return o._history;});},_saveHistory:function(){return $ws.single.UserConfig.setParam("colorize-history",this._history.join("|"));},setSpec:function(p){var q=this.getChildControlByName("Стили"),r=q.getValue(),o;o=this._spec=d(p);this._updateSample();this.getChildControlByName("Цвета").getContainer().find(".ws-colorize-active").removeClass("ws-colorize-active").end().find('[data-color="'+o.color+'"]').addClass("ws-colorize-active");$ws.helpers.forEach(Object.keys(o),function(s){if(s.substr(0,2)=="is"){r.set(s,o[s]);}});q.setValue(r);},_updateSample:function(){var o=this.getChildControlByName("ПримерИстория"),p=this;o.editContent(function(q){q.find(".ws-colorize-sample").removeClass().addClass("ws-colorize-sample "+f(p._spec));});},_createColorsBlockHtml:function(){var o='<div class="ws-colorize-colors">';$ws.helpers.forEach(a,function(q,p){o+='<div class="ws-colorize-color'+(p?"":" ws-colorize-active")+'" data-color="'+q+'" style="border-color: '+q+"; background: "+q+'"><div class="ws-colorize-box" style="background: '+q+'"></div></div>';});o+="</div>";return o;},_createSampleBlockHtml:function(){return'<div class="ws-colorize-sample-and-history"><p class="ws-colorize-sample">Образец</p><ul class="ws-colorize-history"></ul></div>';}});function l(o){var p="000000";return p.substr(0,6-o.length)+o;}function e(p){if(!p){return 0;}else{if(typeof p=="string"){p=Number(p);if(isNaN(p)){p=0;}}else{if(typeof p=="object"){var o=Number((p.color||"0").replace("#","0x"));o|=p.isBold?k:0;o|=p.isItalic?h:0;o|=p.isUnderline?j:0;o|=p.isStrike?m:0;return o;}}}return p;}function d(o){o=e(o);return{color:"#"+l((o&16777215).toString(16)).toUpperCase(),isBold:!!(o&k),isItalic:!!(o&h),isUnderline:!!(o&j),isStrike:!!(o&m)};}function g(o){var p=d(o),q;q=["color: "+p.color+" !important"];if(p.isBold){q.push("font-weight: bold !important");}if(p.isItalic){q.push("font-style: italic !important");}if(p.isUnderline||p.isStrike){q.push("text-decoration: "+[p.isUnderline?"underline":"",p.isStrike?"line-through":""].join(" ")+" !important");}return".ws-colorize-"+o+"{"+q.join(";")+"}";}function f(o,p){o=e(o);if(!isNaN(o)){var q="ws-colorize-"+o;if(!c[q]){c[q]=g(o);if(p!==true){$ws.helpers.insertCss(c[q]);}}return q;}else{return"";}}function i(o){o=e(o);if(!isNaN(o)){var p="ws-colorize-"+o;if(c[p]){return p;}else{return false;}}else{return false;}}$ws.proto.TableView.ColorMarkPlugin={},$ws.proto.TableView.extendPlugin({$protected:{_colorizeWindow:"",_options:{colorMark:false,colorDataColumn:"",colorMarkedColumns:[]}},$constructor:function(){this._initPlugin();},$condition:function(){return this._options.colorMark&&this._options.colorDataColumn&&this._options.colorMarkedColumns&&this._options.colorMarkedColumns.length>0;},_createColorizeWindow:function(p,q,o){if(!this._colorizeWindow){this._colorizeWindow=new n({target:$(p),opener:this,spec:q.data("current-colorize-spec")});this._colorizeWindow.init();}else{this._colorizeWindow.show();this._colorizeWindow.setSpec(q.data("current-colorize-spec"));}this._colorizeWindow.unbind("onApply").subscribe("onApply",o);},_initPlugin:function(){var o=this;this._wrapRowRender();this.addRowOption({title:"Выделение цветом",icon:"sprite:icon-16 icon-Colorize icon-primary",name:"ws-colorize-plugin",before:$ws._const.Browser.rowOptionBeforeAll,isMainOption:true,callback:function(p,r,q){o._createColorizeWindow(q,r,function(t,s){o._colorize(r,s,f(s));p.set(o._options.colorDataColumn,s);p.update();});}});},_isColumnCanMark:function(o){var p=(this.getColumns()||[]);return p[o]&&Array.indexOf(this._options.colorMarkedColumns,p[o].title)!=-1;},_colorize:function(s,p,q){var o=this,r=s.data("current-colorize-class");s.data({"current-colorize-spec":p,"current-colorize-class":q});s.find("td").each(function(){var u=$(this),t=u.attr("coldefindex");if(o._isColumnCanMark(t)){if(r){u.removeClass(r);}u.addClass(q);}});},_rowRenderColorize:function(o,q){if(o.hasColumn(this._options.colorDataColumn)){var p=e(o.get(this._options.colorDataColumn));this._colorize(q,p,f(p));}},_wrapRowRender:function(){var o=this;if(!this._options.display.rowRender){this._options.display.rowRender=this._rowRenderColorize.bind(this);}else{(function(p){o._options.display.rowRender=function(q,r){p.apply(o,arguments);o._rowRenderColorize(q,r);};})(this._options.display.rowRender);}},setRowRender:function(){this._wrapRowRender();},destroy:function(){this._colorizeWindow.destroy();}});$ws.proto.TableView.ColorMarkPlugin.BOLD=k;$ws.proto.TableView.ColorMarkPlugin.ITALIC=h;$ws.proto.TableView.ColorMarkPlugin.UNDERLINE=j;$ws.proto.TableView.ColorMarkPlugin.STRIKE=m;$ws.proto.TableView.ColorMarkPlugin.specToObject=d;$ws.proto.TableView.ColorMarkPlugin.specToNumber=e;return $ws.proto.TableView.ColorMarkPlugin;});