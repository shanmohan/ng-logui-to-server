!function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.printStackTrace=b()}(this,function(){function a(b){b=b||{guess:!0};var c=b.e||null,d=!!b.guess,e=b.mode||null,f=new a.implementation,g=f.run(c,e);return d?f.guessAnonymousFunctions(g):g}return a.implementation=function(){},a.implementation.prototype={run:function(a,b){return a=a||this.createException(),b=b||this.mode(a),"other"===b?this.other(arguments.callee):this[b](a)},createException:function(){try{this.undef()}catch(a){return a}},mode:function(a){return"undefined"!=typeof window&&window.navigator.userAgent.indexOf("PhantomJS")>-1?"phantomjs":a.arguments&&a.stack?"chrome":a.stack&&a.sourceURL?"safari":a.stack&&a.number?"ie":a.stack&&a.fileName?"firefox":a.message&&a["opera#sourceloc"]?a.stacktrace?a.message.indexOf("\n")>-1&&a.message.split("\n").length>a.stacktrace.split("\n").length?"opera9":"opera10a":"opera9":a.message&&a.stack&&a.stacktrace?a.stacktrace.indexOf("called from line")<0?"opera10b":"opera11":a.stack&&!a.fileName?"chrome":"other"},instrumentFunction:function(b,c,d){b=b||window;var e=b[c];b[c]=function(){return d.call(this,a().slice(4)),b[c]._instrumented.apply(this,arguments)},b[c]._instrumented=e},deinstrumentFunction:function(a,b){a[b].constructor===Function&&a[b]._instrumented&&a[b]._instrumented.constructor===Function&&(a[b]=a[b]._instrumented)},chrome:function(a){return(a.stack+"\n").replace(/^[\s\S]+?\s+at\s+/," at ").replace(/^\s+(at eval )?at\s+/gm,"").replace(/^([^\(]+?)([\n$])/gm,"{anonymous}() ($1)$2").replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm,"{anonymous}() ($1)").replace(/^(.+) \((.+)\)$/gm,"$1@$2").split("\n").slice(0,-1)},safari:function(a){return a.stack.replace(/\[native code\]\n/m,"").replace(/^(?=\w+Error\:).*$\n/m,"").replace(/^@/gm,"{anonymous}()@").split("\n")},ie:function(a){return a.stack.replace(/^\s*at\s+(.*)$/gm,"$1").replace(/^Anonymous function\s+/gm,"{anonymous}() ").replace(/^(.+)\s+\((.+)\)$/gm,"$1@$2").split("\n").slice(1)},firefox:function(a){return a.stack.replace(/(?:\n@:0)?\s+$/m,"").replace(/^(?:\((\S*)\))?@/gm,"{anonymous}($1)@").split("\n")},opera11:function(a){for(var b="{anonymous}",c=/^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/,d=a.stacktrace.split("\n"),e=[],f=0,g=d.length;g>f;f+=2){var h=c.exec(d[f]);if(h){var i=h[4]+":"+h[1]+":"+h[2],j=h[3]||"global code";j=j.replace(/<anonymous function: (\S+)>/,"$1").replace(/<anonymous function>/,b),e.push(j+"@"+i+" -- "+d[f+1].replace(/^\s+/,""))}}return e},opera10b:function(a){for(var b=/^(.*)@(.+):(\d+)$/,c=a.stacktrace.split("\n"),d=[],e=0,f=c.length;f>e;e++){var g=b.exec(c[e]);if(g){var h=g[1]?g[1]+"()":"global code";d.push(h+"@"+g[2]+":"+g[3])}}return d},opera10a:function(a){for(var b="{anonymous}",c=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,d=a.stacktrace.split("\n"),e=[],f=0,g=d.length;g>f;f+=2){var h=c.exec(d[f]);if(h){var i=h[3]||b;e.push(i+"()@"+h[2]+":"+h[1]+" -- "+d[f+1].replace(/^\s+/,""))}}return e},opera9:function(a){for(var b="{anonymous}",c=/Line (\d+).*script (?:in )?(\S+)/i,d=a.message.split("\n"),e=[],f=2,g=d.length;g>f;f+=2){var h=c.exec(d[f]);h&&e.push(b+"()@"+h[2]+":"+h[1]+" -- "+d[f+1].replace(/^\s+/,""))}return e},phantomjs:function(a){for(var b="{anonymous}",c=/(\S+) \((\S+)\)/i,d=a.stack.split("\n"),e=[],f=1,g=d.length;g>f;f++){d[f]=d[f].replace(/^\s+at\s+/gm,"");var h=c.exec(d[f]);e.push(h?h[1]+"()@"+h[2]:b+"()@"+d[f])}return e},other:function(a){for(var b,c,d="{anonymous}",e=/function(?:\s+([\w$]+))?\s*\(/,f=[],g=10,h=Array.prototype.slice;a&&f.length<g;){b=e.test(a.toString())?RegExp.$1||d:d;try{c=h.call(a.arguments||[])}catch(i){c=["Cannot access arguments: "+i]}f[f.length]=b+"("+this.stringifyArguments(c)+")";try{a=a.caller}catch(i){f[f.length]="Cannot access caller: "+i;break}}return f},stringifyArguments:function(a){for(var b=[],c=Array.prototype.slice,d=0;d<a.length;++d){var e=a[d];void 0===e?b[d]="undefined":null===e?b[d]="null":e.constructor&&(b[d]=e.constructor===Array?e.length<3?"["+this.stringifyArguments(e)+"]":"["+this.stringifyArguments(c.call(e,0,1))+"..."+this.stringifyArguments(c.call(e,-1))+"]":e.constructor===Object?"#object":e.constructor===Function?"#function":e.constructor===String?'"'+e+'"':e.constructor===Number?e:"?")}return b.join(",")},sourceCache:{},ajax:function(a){var b=this.createXMLHTTPObject();if(b)try{return b.open("GET",a,!1),b.send(null),b.responseText}catch(c){}return""},createXMLHTTPObject:function(){for(var a,b=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],c=0;c<b.length;c++)try{return a=b[c](),this.createXMLHTTPObject=b[c],a}catch(d){}},isSameDomain:function(a){return"undefined"!=typeof location&&-1!==a.indexOf(location.hostname)},getSource:function(a){return a in this.sourceCache||(this.sourceCache[a]=this.ajax(a).split("\n")),this.sourceCache[a]},guessAnonymousFunctions:function(a){for(var b=0;b<a.length;++b){var c=/\{anonymous\}\(.*\)@(.*)/,d=/^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/,e=a[b],f=c.exec(e);if(f){var g=d.exec(f[1]);if(g){var h=g[1],i=g[2],j=g[3]||0;if(h&&this.isSameDomain(h)&&i){var k=this.guessAnonymousFunction(h,i,j);a[b]=e.replace("{anonymous}",k)}}}}return a},guessAnonymousFunction:function(a,b){var c;try{c=this.findFunctionName(this.getSource(a),b)}catch(d){c="getSource failed with url: "+a+", exception: "+d.toString()}return c},findFunctionName:function(a,b){for(var c,d,e,f=/function\s+([^(]*?)\s*\(([^)]*)\)/,g=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/,h=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/,i="",j=Math.min(b,20),k=0;j>k;++k)if(c=a[b-k-1],e=c.indexOf("//"),e>=0&&(c=c.substr(0,e)),c){if(i=c+i,d=g.exec(i),d&&d[1])return d[1];if(d=f.exec(i),d&&d[1])return d[1];if(d=h.exec(i),d&&d[1])return d[1]}return"(?)"}},a});