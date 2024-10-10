!function(){var t={5218:function(t,e){"use strict";e.__esModule=!0,e.BoundedPQueue=void 0;var r=function(){function t(t){this.heap=[],this.k=t}return t.prototype.items=function(){return this.heap},t.prototype.parent=function(t){return Math.floor(t/2)},t.prototype.leftChild=function(t){return 2*t+1},t.prototype.rightChild=function(t){return 2*t+2},t.prototype.max=function(){return this.heap[0][0]},t.prototype.maxHeapify=function(t){var e,r=this.leftChild(t),n=this.rightChild(t),i=t;r<this.heap.length&&this.heap[r][0]>this.heap[t][0]&&(i=r),n<this.heap.length&&this.heap[n][0]>this.heap[t][0]&&(i=n),i!=t&&(e=[this.heap[i],this.heap[t]],this.heap[t]=e[0],this.heap[i]=e[1],this.maxHeapify(i))},t.prototype.extractMax=function(){var t=this.heap[0],e=this.heap.pop();return void 0!==e&&this.heap.length>0&&(this.heap[0]=e,this.maxHeapify(0)),t},t.prototype.propagateUp=function(t){for(var e,r=t;0!=r&&this.heap[this.parent(r)][0]<this.heap[r][0];)e=[this.heap[this.parent(r)],this.heap[r]],this.heap[r]=e[0],this.heap[this.parent(r)]=e[1],r=this.parent(r)},t.prototype.heapAppend=function(t,e){this.heap.push([t,e]),this.propagateUp(this.heap.length-1)},t.prototype.add=function(t,e){this.heap.length==this.k?t<this.max()&&(this.extractMax(),this.heapAppend(t,e)):this.heapAppend(t,e)},t}();e.BoundedPQueue=r},8352:function(t,e,r){"use strict";var n=this&&this.__spreadArray||function(t,e){for(var r=0,n=e.length,i=t.length;r<n;r++,i++)t[i]=e[r];return t};e.__esModule=!0,e.KDTree=e.Node=void 0;var i=r(2461),a=r(5218),h=function(){this.next=[]};e.Node=h;var o=function(){function t(t,e){this.points=t,this.dim=e,this.buildTree()}return t.prototype.buildTree=function(){var t=n([],Array(this.points.length)).map(function(t,e){return e});this.root=this.buildTreeRecurse(t,this.points.length,0)},t.prototype.buildTreeRecurse=function(t,e,r){var n=this;if(e<=0)return new h;var a=r%this.dim,o=Math.floor((e-1)/2);i.default(t,o,0,e-1,function(t,e){return n.points[t][a]<n.points[e][a]?-1:n.points[t][a]>n.points[e][a]?1:0});var s=new h;return s.index=t[o],s.axis=a,s.next.push(this.buildTreeRecurse(t,o,r+1)),s.next.push(this.buildTreeRecurse(t.slice(o+1),e-o-1,r+1)),s},t.prototype.knnSearch=function(t,e){var r=new a.BoundedPQueue(e);r=this.knnSearchRecurse(t,this.root,r,e);for(var n=[],i=0;i<r.items().length;i++){var h=r.extractMax();void 0!==h&&n.push(h[1])}return n},t.prototype.distance=function(t,e){for(var r=0,n=0;n<t.length;n++)r+=(t[n]-e[n])*(t[n]-e[n]);return Math.sqrt(r)},t.prototype.knnSearchRecurse=function(t,e,r,n){if(void 0===e)return r;if(void 0!==e.index&&void 0!==e.axis){var i=this.points[e.index],a=this.distance(i,t);r.add(a,e.index);var h=t[e.axis]<i[e.axis]?0:1;r=this.knnSearchRecurse(t,e.next[h],r,n);var o=Math.abs(t[e.axis]-i[e.axis]);(r.items().length<n||o<r.max())&&(r=this.knnSearchRecurse(t,e.next[1-h],r,n))}return r},t}();e.KDTree=o},2461:function(t,e){"use strict";function r(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}e.__esModule=!0,e.default=function(t,e,n,i,a){!function t(e,n,i,a,h){for(;a>i;){if(a-i>600){var o=a-i+1,s=n-i+1,p=Math.log(o),u=.5*Math.exp(2*p/3),f=.5*Math.sqrt(p*u*(o-u)/o)*(s-o/2<0?-1:1),c=Math.max(i,Math.floor(n-s*u/o+f)),l=Math.min(a,Math.floor(n+(o-s)*u/o+f));t(e,n,c,l,h)}var d=e[n],v=i,x=a;for(r(e,i,n),h(e[a],d)>0&&r(e,i,a);v<x;){for(r(e,v,x),v++,x--;0>h(e[v],d);)v++;for(;h(e[x],d)>0;)x--}0===h(e[i],d)?r(e,i,x):r(e,++x,a),x<=n&&(i=x+1),n<=x&&(a=x-1)}}(t,e,n,i,a)}}},e={};!function(){"use strict";var r=function r(n){var i=e[n];if(void 0!==i)return i.exports;var a=e[n]={exports:{}},h=!0;try{t[n].call(a.exports,a,a.exports,r),h=!1}finally{h&&delete e[n]}return a.exports}(8352),n=new Float32Array([.18995,.07176,.23217,.19483,.08339,.26149,.19956,.09498,.29024,.20415,.10652,.31844,.2086,.11802,.34607,.21291,.12947,.37314,.21708,.14087,.39964,.22111,.15223,.42558,.225,.16354,.45096,.22875,.17481,.47578,.23236,.18603,.50004,.23582,.1972,.52373,.23915,.20833,.54686,.24234,.21941,.56942,.24539,.23044,.59142,.2483,.24143,.61286,.25107,.25237,.63374,.25369,.26327,.65406,.25618,.27412,.67381,.25853,.28492,.693,.26074,.29568,.71162,.2628,.30639,.72968,.26473,.31706,.74718,.26652,.32768,.76412,.26816,.33825,.7805,.26967,.34878,.79631,.27103,.35926,.81156,.27226,.3697,.82624,.27334,.38008,.84037,.27429,.39043,.85393,.27509,.40072,.86692,.27576,.41097,.87936,.27628,.42118,.89123,.27667,.43134,.90254,.27691,.44145,.91328,.27701,.45152,.92347,.27698,.46153,.93309,.2768,.47151,.94214,.27648,.48144,.95064,.27603,.49132,.95857,.27543,.50115,.96594,.27469,.51094,.97275,.27381,.52069,.97899,.27273,.5304,.98461,.27106,.54015,.9893,.26878,.54995,.99303,.26592,.55979,.99583,.26252,.56967,.99773,.25862,.57958,.99876,.25425,.5895,.99896,.24946,.59943,.99835,.24427,.60937,.99697,.23874,.61931,.99485,.23288,.62923,.99202,.22676,.63913,.98851,.22039,.64901,.98436,.21382,.65886,.97959,.20708,.66866,.97423,.20021,.67842,.96833,.19326,.68812,.9619,.18625,.69775,.95498,.17923,.70732,.94761,.17223,.7168,.93981,.16529,.7262,.93161,.15844,.73551,.92305,.15173,.74472,.91416,.14519,.75381,.90496,.13886,.76279,.8955,.13278,.77165,.8858,.12698,.78037,.8759,.12151,.78896,.86581,.11639,.7974,.85559,.11167,.80569,.84525,.10738,.81381,.83484,.10357,.82177,.82437,.10026,.82955,.81389,.0975,.83714,.80342,.09532,.84455,.79299,.09377,.85175,.78264,.09287,.85875,.7724,.09267,.86554,.7623,.0932,.87211,.75237,.09451,.87844,.74265,.09662,.88454,.73316,.09958,.8904,.72393,.10342,.896,.715,.10815,.90142,.70599,.11374,.90673,.69651,.12014,.91193,.6866,.12733,.91701,.67627,.13526,.92197,.66556,.14391,.9268,.65448,.15323,.93151,.64308,.16319,.93609,.63137,.17377,.94053,.61938,.18491,.94484,.60713,.19659,.94901,.59466,.20877,.95304,.58199,.22142,.95692,.56914,.23449,.96065,.55614,.24797,.96423,.54303,.2618,.96765,.52981,.27597,.97092,.51653,.29042,.97403,.50321,.30513,.97697,.48987,.32006,.97974,.47654,.33517,.98234,.46325,.35043,.98477,.45002,.36581,.98702,.43688,.38127,.98909,.42386,.39678,.99098,.41098,.41229,.99268,.39826,.42778,.99419,.38575,.44321,.99551,.37345,.45854,.99663,.3614,.47375,.99755,.34963,.48879,.99828,.33816,.50362,.99879,.32701,.51822,.9991,.31622,.53255,.99919,.30581,.54658,.99907,.29581,.56026,.99873,.28623,.57357,.99817,.27712,.58646,.99739,.26849,.59891,.99638,.26038,.61088,.99514,.2528,.62233,.99366,.24579,.63323,.99195,.23937,.64362,.98999,.23356,.65394,.98775,.22835,.66428,.98524,.2237,.67462,.98246,.2196,.68494,.97941,.21602,.69525,.9761,.21294,.70553,.97255,.21032,.71577,.96875,.20815,.72596,.9647,.2064,.7361,.96043,.20504,.74617,.95593,.20406,.75617,.95121,.20343,.76608,.94627,.20311,.77591,.94113,.2031,.78563,.93579,.20336,.79524,.93025,.20386,.80473,.92452,.20459,.8141,.91861,.20552,.82333,.91253,.20663,.83241,.90627,.20788,.84133,.89986,.20926,.8501,.89328,.21074,.85868,.88655,.2123,.86709,.87968,.21391,.8753,.87267,.21555,.88331,.86553,.21719,.89112,.85826,.2188,.8987,.85087,.22038,.90605,.84337,.22188,.91317,.83576,.22328,.92004,.82806,.22456,.92666,.82025,.2257,.93301,.81236,.22667,.93909,.80439,.22744,.94489,.79634,.228,.95039,.78823,.22831,.9556,.78005,.22836,.96049,.77181,.22811,.96507,.76352,.22754,.96931,.75519,.22663,.97323,.74682,.22536,.97679,.73842,.22369,.98,.73,.22161,.98289,.7214,.21918,.98549,.7125,.2165,.98781,.7033,.21358,.98986,.69382,.21043,.99163,.68408,.20706,.99314,.67408,.20348,.99438,.66386,.19971,.99535,.65341,.19577,.99607,.64277,.19165,.99654,.63193,.18738,.99675,.62093,.18297,.99672,.60977,.17842,.99644,.59846,.17376,.99593,.58703,.16899,.99517,.57549,.16412,.99419,.56386,.15918,.99297,.55214,.15417,.99153,.54036,.1491,.98987,.52854,.14398,.98799,.51667,.13883,.9859,.50479,.13367,.9836,.49291,.12849,.98108,.48104,.12332,.97837,.4692,.11817,.97545,.4574,.11305,.97234,.44565,.10797,.96904,.43399,.10294,.96555,.42241,.09798,.96187,.41093,.0931,.95801,.39958,.08831,.95398,.38836,.08362,.94977,.37729,.07905,.94538,.36638,.07461,.94084,.35566,.07031,.93612,.34513,.06616,.93125,.33482,.06218,.92623,.32473,.05837,.92105,.31489,.05475,.91572,.3053,.05134,.91024,.29599,.04814,.90463,.28696,.04516,.89888,.27824,.04243,.89298,.26981,.03993,.88691,.26152,.03753,.88066,.25334,.03521,.87422,.24526,.03297,.8676,.2373,.03082,.86079,.22945,.02875,.8538,.2217,.02677,.84662,.21407,.02487,.83926,.20654,.02305,.83172,.19912,.02131,.82399,.19182,.01966,.81608,.18462,.01809,.80799,.17753,.0166,.79971,.17055,.0152,.79125,.16368,.01387,.7826,.15693,.01264,.77377,.15028,.01148,.76476,.14374,.01041,.75556,.13731,.00942,.74617,.13098,.00851,.73661,.12477,.00769,.72686,.11867,.00695,.71692,.11268,.00629,.7068,.1068,.00571,.6965,.10102,.00522,.68602,.09536,.00481,.67535,.0898,.00449,.66449,.08436,.00424,.65345,.07902,.00408,.64223,.0738,.00401,.63082,.06868,.00401,.61923,.06367,.0041,.60746,.05878,.00427,.5955,.05399,.00453,.58336,.04931,.00486,.57103,.04474,.00529,.55852,.04028,.00579,.54583,.03593,.00638,.53295,.03169,.00705,.51989,.02756,.0078,.50664,.02354,.00863,.49321,.01963,.00955,.4796,.01583,.01055]),i=new Uint8ClampedArray(n.map(t=>Math.floor(255*t))),a=Array(256);for(let t=0;t<a.length;t++){let e=3*t;a[t]=n.subarray(e,e+3)}var h=Array(256);for(let t=0;t<h.length;t++){let e=3*t;h[t]=i.subarray(e,e+3)}var o=new r.KDTree(h,3);let s=new Map;addEventListener("message",t=>{let e=Date.now(),r=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new ArrayBuffer(t.byteLength),r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{cache:new Map},{cache:n}=r,i=t.byteLength,a=new Uint8ClampedArray(e);for(let e=0;e<i;e+=4){let r=new Uint8ClampedArray(t,e,4),i=function(t,e){let r;if(e){r="".concat(t[0],",").concat(t[1],",").concat(t[2]);let n=e.get(r);if(null!=n)return n}let n=o.knnSearch(t,1)[0];return e&&e.set(r,n),n}(r,n);a[e]=i,a[e+1]=i,a[e+2]=i,a[e+3]=r[3]}return e}(t.data.buffer,void 0,{cache:s}),n=Date.now()-e;console.log("convertTurboBufferToGrayscale took ".concat(n,"ms.")),postMessage({buffer:r,width:t.data.width,height:t.data.height,elapsedTimeMs:n},{transfer:[r]})})}(),_N_E={}}();