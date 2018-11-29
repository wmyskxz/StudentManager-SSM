/*！
 * jQuery JavaScript Library v1.9.1
 * http://jquery.com/
 *
 *包括Sizzle.js
 * http://sizzlejs.com/
 *
 *版权所有2005,2012 jQuery Foundation，Inc。和其他贡献者
 *根据MIT许可证发布
 * http://jquery.org/license
 *
 *日期：2013-2-4
 * /
（function（window，undefined）{

//无法做到这一点，因为有几个应用程序包括ASP.NET跟踪
//堆栈通过arguments.caller.callee和Firefox死掉if
//你试图追踪“使用严格”的调用链。（＃13335）
//支持：Firefox 18+
//“使用严格”;
VAR
	//在DOM准备就绪时使用的延迟
	readyList，

	//对根jQuery（文档）的中心引用
	rootjQuery，

	//支持：IE <9
	//对于`typeof node.method`而不是`node.method！== undefined`
	core_strundefined = typeof undefined，

	//使用窗口参数（沙箱）相应地使用正确的文档
	document = window.document，
	location = window.location，

	//在覆盖的情况下映射jQuery
	_jQuery = window.jQuery，

	//在覆盖的情况下覆盖$
	_ $ = window。$，

	// [[Class]]  - >类型对
	class2type = {}，

	//已删除的数据缓存ID列表，因此我们可以重复使用它们
	core_deletedIds = []，

	core_version =“1.9.1”，

	//保存对某些核心方法的引用
	core_concat = core_deletedIds.concat，
	core_push = core_deletedIds.push，
	core_slice = core_deletedIds.slice，
	core_indexOf = core_deletedIds.indexOf，
	core_toString = class2type.toString，
	core_hasOwn = class2type.hasOwnProperty，
	core_trim = core_version.trim，

	//定义jQuery的本地副本
	jQuery = function（selector，context）{
		// jQuery对象实际上只是init构造函数'enhanced'
		返回新的jQuery.fn.init（selector，context，rootjQuery）;
	}，

	//用于匹配数字
	core_pnum = / [+  - ]？（？：\ d * \。|）\ d+（？：[eE] [+  - ]？\ d+ || /。source，

	//用于在空格上拆分
	core_rnotwhite = / \ S + / g，

	//确保我们修剪BOM和NBSP（这里看着你，Safari 5.0和IE）
	rtrim = / ^ [\ s \ uFEFF \ xA0] + | [\ s \ uFEFF \ xA0] + $ / g，

	//检查HTML字符串的简单方法
	//优先#id <tag>以避免XSS通过location.hash（＃9521）
	//严格的HTML识别（＃11290：必须以<开头）
	rquickExpr = / ^（？：（<[\ w \ W] +>）[^>] * |＃（[\ w  - ] *））$ /，

	//匹配独立标记
	rsingleTag = / ^ <（\ w +）\ s * \ /？>（？：<\ / \ 1> |）$ /，

	// JSON RegExp
	rvalidchars = / ^ [\]，：{} \ s] * $ /，
	rvalidbraces = /（？：^ |：|，）（？：\ s * \ [）+ / g，
	rvalidescape = / \\（？：[“\\\ / bfnrt] | u [\ da-fA-F] {4}）/ g，
	rvalidtokens = /“[^”\\\ r \ n] *“| true | false | null |  - ？（？：\ d + \。|）\ d +（？：[eE] [+  - ]？\ d + | ）/G，

	//匹配虚线字符串以进行驼峰化
	rmsPrefix = / ^  -  ms- /，
	rdashAlpha = /  - （[\ da-z]）/ gi，

	//由jQuery.camelCase用作replace（）的回调
	fcamelCase = function（all，letter）{
		return letter.toUpperCase（）;
	}，

	//就绪事件处理程序
	completed = function（event）{

		// readyState ===“完成”足以让我们在oldIE中调用dom
		if（document.addEventListener || event.type ===“load”|| document.readyState ===“complete”）{
			分离（）;
			jQuery.ready（）;
		}
	}，
	//用于dom ready事件的清理方法
	detach = function（）{
		if（document.addEventListener）{
			document.removeEventListener（“DOMContentLoaded”，completed，false）;
			window.removeEventListener（“load”，completed，false）;

		} else {
			document.detachEvent（“onreadystatechange”，已完成）;
			window.detachEvent（“onload”，已完成）;
		}
	};

jQuery.fn = jQuery.prototype = {
	//正在使用的jQuery的当前版本
	jquery：core_version，

	构造函数：jQuery，
	init：function（selector，context，rootjQuery）{
		var match，elem;

		// HANDLE：$（“”），$（null），$（undefined），$（false）
		if（！selector）{
			归还这个;
		}

		//处理HTML字符串
		if（typeof selector ===“string”）{
			if（selector.charAt（0）===“<”&& selector.charAt（selector.length  -  1）===“>”&& selector.length> = 3）{
				//假设以<>开头和结尾的字符串是HTML并跳过正则表达式检查
				match = [null，selector，null];

			} else {
				match = rquickExpr.exec（selector）;
			}

			//匹配html或确保没有为#id指定上下文
			if（match &&（match [1] ||！context））{

				// HANDLE：$（html） - > $（数组）
				if（match [1]）{
					context =上下文实例jQuery？context [0]：context;

					//对于back-compat，脚本为true
					jQuery.merge（this，jQuery.parseHTML（
						匹配[1]，
						context && context.nodeType？context.ownerDocument || 上下文：文件，
						真正
					））;

					// HANDLE：$（html，props）
					if（rsingleTag.test（match [1]）&& jQuery.isPlainObject（context））{
						for（在上下文中匹配）{
							//如果可能，将上下文的属性称为方法
							if（jQuery.isFunction（this [match]））{
								这[匹配]（context [match]）;

							// ...并以其他方式设置为属性
							} else {
								this.attr（match，context [match]）;
							}
						}
					}

					归还这个;

				// HANDLE：$（＃id）
				} else {
					elem = document.getElementById（match [2]）;

					//检查parentNode以便在Blackberry 4.6返回时捕获
					//不再在文档＃6963中的节点
					if（elem && elem.parentNode）{
						//处理IE和Opera返回项目的情况
						//按名称而不是ID
						if（elem.id！== match [2]）{
							return rootjQuery.find（selector）;
						}

						//否则，我们将元素直接注入jQuery对象
						this.length = 1;
						这[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					归还这个;
				}

			// HANDLE：$（expr，$（...））
			} else if（！context || context.jquery）{
				return（context || rootjQuery）.find（selector）;

			// HANDLE：$（expr，context）
			//（这相当于：$（context）.find（expr）
			} else {
				return this.constructor（context）.find（selector）;
			}

		//手柄：$（DOMElement）
		} else if（selector.nodeType）{
			this.context = this [0] = selector;
			this.length = 1;
			归还这个;

		//手柄：$（功能）
		//准备文件的快捷方式
		} else if（jQuery.isFunction（selector））{
			return rootjQuery.ready（selector）;
		}

		if（selector.selector！== undefined）{
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray（selector，this）;
	}，

	//以空选择器开头
	选择器：“”，

	// jQuery对象的默认长度为0
	长度：0，

	//匹配元素集中包含的元素数
	size：function（）{
		return this.length;
	}，

	toArray：function（）{
		return core_slice.call（this）;
	}，

	//获取匹配元素集OR中的第N个元素
	//将整个匹配的元素集作为干净数组
	get：function（num）{
		return num == null？

			//返回一个'干净'数组
			this.toArray（）：

			//只返回对象
			（num <0？this [this.length + num]：this [num]）;
	}，

	//获取一系列元素并将其推入堆栈
	//（返回新的匹配元素集）
	pushStack：function（elems）{

		//构建一个新的jQuery匹配元素集
		var ret = jQuery.merge（this.constructor（），elems）;

		//将旧对象添加到堆栈中（作为参考）
		ret.prevObject = this;
		ret.context = this.context;

		//返回新形成的元素集
		返回;
	}，

	//对匹配集中的每个元素执行回调。
	//（您可以使用args数组对参数进行种子处理，但这是
	//仅在内部使用。）
	each：function（callback，args）{
		return jQuery.each（this，callback，args）;
	}，

	ready：function（fn）{
		//添加回调
		jQuery.ready.promise（）。done（fn）;

		归还这个;
	}，

	slice：function（）{
		return this.pushStack（core_slice.apply（this，arguments））;
	}，

	第一：function（）{
		return this.eq（0）;
	}，

	last：function（）{
		return this.eq（-1）;
	}，

	eq：function（i）{
		var len = this.length，
			j = + i +（i <0？len：0）;
		return this.pushStack（j> = 0 && j <len？[this [j]]：[]）;
	}，

	map：function（callback）{
		return this.pushStack（jQuery.map（this，function（elem，i）{
			return callback.call（elem，i，elem）;
		}））;
	}，

	结束：function（）{
		返回this.prevObject || this.constructor（NULL）;
	}，

	// 仅限内部使用。
	//表现得像一个Array的方法，而不是像jQuery方法。
	push：core_push，
	sort：[] .sort，
	拼接：[] .splice
};

//为init函数提供jQuery原型以供以后实例化
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function（）{
	var src，copyIsArray，copy，name，options，clone，
		target = arguments [0] || {}，
		i = 1，
		length = arguments.length，
		deep = false;

	//处理深层复制情况
	if（typeof target ===“boolean”）{
		深=目标;
		target = arguments [1] || {};
		//跳过布尔值和目标
		i = 2;
	}

	//当目标是字符串或其他东西时处理大小写（可能在深层副本中）
	if（typeof target！==“object”&&！jQuery.isFunction（target））{
		target = {};
	}

	//如果只传递一个参数，则扩展jQuery本身
	if（length === i）{
		target = this;
		- 一世;
	}

	for（; i <length; i ++）{
		//只处理非null / undefined值
		if（（options = arguments [i]）！= null）{
			//扩展基础对象
			for（选项中的名称）{
				src = target [name];
				copy = options [name];

				//防止永无止境的循环
				if（target === copy）{
					继续;
				}

				//如果我们合并普通对象或数组，则递归
				if（deep && copy &&（jQuery.isPlainObject（copy）||（copyIsArray = jQuery.isArray（copy））））{
					if（copyIsArray）{
						copyIsArray = false;
						clone = src && jQuery.isArray（src）？src：[];

					} else {
						clone = src && jQuery.isPlainObject（src）？src：{};
					}

					//永远不要移动原始对象，克隆它们
					target [name] = jQuery.extend（deep，clone，copy）;

				//不要引入未定义的值
				} else if（copy！== undefined）{
					target [name] = copy;
				}
			}
		}
	}

	//返回修改后的对象
	回归目标;
};

jQuery.extend（{
	noConflict：function（deep）{
		if（window。$ === jQuery）{
			窗口。$ = _ $;
		}

		if（deep && window.jQuery === jQuery）{
			window.jQuery = _jQuery;
		}

		return jQuery;
	}，

	// DOM是否可以使用？一旦发生，设置为true。
	isReady：false，

	//一个计数器，用于跟踪之前要等待的项目数
	//就绪事件触发。见＃6781
	readyWait：1，

	//保持（或释放）就绪事件
	holdReady：function（hold）{
		if（hold）{
			jQuery.readyWait ++;
		} else {
			jQuery.ready（true）;
		}
	}，

	// DOM准备就绪时处理
	ready：function（wait）{

		//如果有待处理的暂停或我们已经准备就绪中止
		if（wait === true？--jQuery.readyWait：jQuery.isReady）{
			返回;
		}

		//确保身体存在，至少，以防IE变得有点过分（票＃5443）。
		if（！document.body）{
			return setTimeout（jQuery.ready）;
		}

		//记住DOM准备好了
		jQuery.isReady = true;

		//如果正常的DOM Ready事件被触发，则减少，并在需要时等待
		if（等等！== true && --jQuery.readyWait> 0）{
			返回;
		}

		//如果有绑定的函数，则执行
		readyList.resolveWith（document，[jQuery]）;

		//触发任何绑定的就绪事件
		if（jQuery.fn.trigger）{
			jQuery（document）.trigger（“ready”）。off（“ready”）;
		}
	}，

	//有关isFunction的详细信息，请参阅test / unit / core.js。
	//从1.3版开始，DOM方法和函数如alert
	//不受支持。它们在IE上返回false（＃2968）。
	isFunction：function（obj）{
		return jQuery.type（obj）===“function”;
	}，

	isArray：Array.isArray || function（obj）{
		return jQuery.type（obj）===“array”;
	}，

	isWindow：function（obj）{
		return obj！= null && obj == obj.window;
	}，

	isNumeric：function（obj）{
		return！isNaN（parseFloat（obj））&& isFinite（obj）;
	}，

	type：function（obj）{
		if（obj == null）{
			return String（obj）;
		}
		return typeof obj ===“object”|| typeof obj ===“function”？
			class2type [core_toString.call（obj）] || “对象”：
			对象类型;
	}，

	isPlainObject：function（obj）{
		//必须是一个对象。
		//由于IE，我们还必须检查构造函数属性的存在。
		//确保DOM节点和窗口对象也不会通过
		if（！obj || jQuery.type（obj）！==“object”|| obj.nodeType || jQuery.isWindow（obj））{
			返回虚假;
		}

		尝试{
			//不是自己的构造函数属性必须是Object
			if（obj.constructor &&
				！core_hasOwn.call（obj，“constructor”）&&
				！core_hasOwn.call（obj.constructor.prototype，“isPrototypeOf”））{
				返回虚假;
			}
		} catch（e）{
			// IE8,9将在某些主机对象上抛出异常＃9897
			返回虚假;
		}

		//首先列举自己的属性，以便加快速度，
		//如果最后一个属于自己，那么所有属性都是自己的。

		var键;
		for（key in obj）{}

		返回键=== undefined || core_hasOwn.call（obj，key）;
	}，

	isEmptyObject：function（obj）{
		var name;
		for（obj中的名字）{
			返回虚假;
		}
		返回true;
	}，

	错误：function（msg）{
		抛出新错误（msg）;
	}，

	// data：html的字符串
	// context（可选）：如果指定，将在此上下文中创建片段，默认为document
	// keepScripts（可选）：如果为true，将包含在html字符串中传递的脚本
	parseHTML：function（data，context，keepScripts）{
		if（！data || typeof data！==“string”）{
			return null;
		}
		if（typeof context ===“boolean”）{
			keepScripts = context;
			context = false;
		}
		context = context || 文献;

		var parsed = rsingleTag.exec（data），
			scripts =！keepScripts && [];

		//单个标签
		if（已解析）{
			return [context.createElement（parsed [1]）];
		}

		parsed = jQuery.buildFragment（[data]，context，scripts）;
		if（scripts）{
			jQuery（脚本）.remove（）;
		}
		return jQuery.merge（[]，parsed.childNodes）;
	}，

	parseJSON：function（data）{
		//首先尝试使用本机JSON解析器进行解析
		if（window.JSON && window.JSON.parse）{
			return window.JSON.parse（data）;
		}

		if（data === null）{
			返回数据;
		}

		if（typeof data ===“string”）{

			//确保删除前导/尾随空格（IE无法处理）
			data = jQuery.trim（data）;

			if（data）{
				//确保传入的数据是实际的JSON
				//来自http://json.org/json2.js的逻辑
				if（rvalidchars.test（data.replace（rvalidescape，“@”））
					.replace（rvalidtokens，“]”）
					.replace（rvalidbraces，“”）））{

					return（new Function（“return”+ data））（）;
				}
			}
		}

		jQuery.error（“无效的JSON：”+数据）;
	}，

	//跨浏览器xml解析
	parseXML：function（data）{
		var xml，tmp;
		if（！data || typeof data！==“string”）{
			return null;
		}
		尝试{
			if（window.DOMParser）{//标准
				tmp = new DOMParser（）;
				xml = tmp.parseFromString（data，“text / xml”）;
			} else {// IE
				xml = new ActiveXObject（“Microsoft.XMLDOM”）;
				xml.async =“false”;
				xml.loadXML（data）;
			}
		} catch（e）{
			xml =未定义;
		}
		if（！xml ||！xml.documentElement || xml.getElementsByTagName（“parsererror”）。length）{
			jQuery.error（“无效的XML：”+数据）;
		}
		return xml;
	}，

	noop：function（）{}，

	//在全局上下文中评估脚本
	//基于Jim Driscoll的调查结果的变通方法
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval：function（data）{
		if（data && jQuery.trim（data））{
			//我们在Internet Explorer上使用execScript
			//我们使用匿名函数，以便上下文是窗口
			//而不是Firefox中的jQuery
			（window.execScript || function（data）{
				window [“eval”] .call（window，data）;
			}）（数据）;
		}
	}，

	//将虚线转换为camelCase; 由css和数据模块使用
	//微软忘了驼峰他们的供应商前缀（＃9572）
	camelCase：function（string）{
		return string.replace（rmsPrefix，“ms-”）.replace（rdashAlpha，fcamelCase）;
	}，

	nodeName：function（elem，name）{
		return elem.nodeName && elem.nodeName.toLowerCase（）=== name.toLowerCase（）;
	}，

	// args仅供内部使用
	each：function（obj，callback，args）{
		var值，
			i = 0，
			length = obj.length，
			isArray = isArraylike（obj）;

		if（args）{
			if（isArray）{
				for（; i <length; i ++）{
					value = callback.apply（obj [i]，args）;

					if（value === false）{
						打破;
					}
				}
			} else {
				for（i in obj）{
					value = callback.apply（obj [i]，args）;

					if（value === false）{
						打破;
					}
				}
			}

		//一个特殊的，快速的案例，供每个人最常用
		} else {
			if（isArray）{
				for（; i <length; i ++）{
					value = callback.call（obj [i]，i，obj [i]）;

					if（value === false）{
						打破;
					}
				}
			} else {
				for（i in obj）{
					value = callback.call（obj [i]，i，obj [i]）;

					if（value === false）{
						打破;
					}
				}
			}
		}

		返回obj;
	}，

	//尽可能使用本机String.trim函数
	trim：core_trim &&！core_trim.call（“\ uFEFF \ xA0”）？
		function（text）{
			return text == null？
				“”：
				core_trim.call（text）;
		}：

		//否则使用我们自己的修剪功能
		function（text）{
			return text == null？
				“”：
				（text +“”）.replace（rtrim，“”）;
		}，

	//结果仅供内部使用
	makeArray：function（arr，results）{
		var ret = results || [];

		if（arr！= null）{
			if（isArraylike（Object（arr）））{
				jQuery.merge（ret，
					typeof arr ===“string”？
					[arr]：arr
				）;
			} else {
				core_push.call（ret，arr）;
			}
		}

		返回;
	}，

	inArray：function（elem，arr，i）{
		var len;

		if（arr）{
			if（core_indexOf）{
				return core_indexOf.call（arr，elem，i）;
			}

			len = arr.length;
			我=我？我<0？Math.max（0，len + i）：i：0;

			for（; i <len; i ++）{
				//在稀疏数组中跳过访问
				if（我在arr && arr [i] === elem）{
					回归我;
				}
			}
		}

		返回-1;
	}，

	合并：功能（第一，第二）{
		var l = second.length，
			i = first.length，
			j = 0;

		if（typeof l ===“number”）{
			for（; j <l; j ++）{
				first [i ++] = second [j];
			}
		} else {
			while（second [j]！== undefined）{
				first [i ++] = second [j ++];
			}
		}

		first.length = i;

		先回来;
	}，

	grep：function（elems，callback，inv）{
		var retVal，
			ret = []，
			i = 0，
			length = elems.length;
		inv = !! inv;

		//浏览数组，只保存项目
		//传递验证器函数
		for（; i <length; i ++）{
			retVal = !!回调（elems [i]，i）;
			if（inv！== retVal）{
				ret.push（elems [i]）;
			}
		}

		返回;
	}，

	// arg仅供内部使用
	map：function（elems，callback，arg）{
		var值，
			i = 0，
			length = elems.length，
			isArray = isArraylike（elems），
			ret = [];

		//浏览数组，将每个项目翻译成他们的
		if（isArray）{
			for（; i <length; i ++）{
				value = callback（elems [i]，i，arg）;

				if（value！= null）{
					ret [ret.length] = value;
				}
			}

		//浏览对象上的每个键，
		} else {
			for（i in elems）{
				value = callback（elems [i]，i，arg）;

				if（value！= null）{
					ret [ret.length] = value;
				}
			}
		}

		//展平任何嵌套数组
		return core_concat.apply（[]，ret）;
	}，

	//对象的全局GUID计数器
	guid：1，

	//将函数绑定到上下文，可选择部分应用任何函数
	//参数
	proxy：function（fn，context）{
		var args，proxy，tmp;

		if（typeof context ===“string”）{
			tmp = fn [context];
			context = fn;
			fn = tmp;
		}

		//在规范中快速检查以确定目标是否可调用
		//这会抛出一个TypeError，但我们只返回undefined。
		if（！jQuery.isFunction（fn））{
			返回undefined;
		}

		//模拟绑定
		args = core_slice.call（arguments，2）;
		proxy = function（）{
			return fn.apply（context || this，args.concat（core_slice.call（arguments）））;
		};

		//将唯一处理程序的guid设置为原始处理程序的guid，以便可以将其删除
		proxy.guid = fn.guid = fn.guid || jQuery.guid ++;

		返回代理;
	}，

	//获取和设置集合值的多功能方法
	//如果值是函数，则可以选择执行值/ s
	access：function（elems，fn，key，value，chainable，emptyGet，raw）{
		var i = 0，
			length = elems.length，
			bulk = key == null;

		//设置许多值
		if（jQuery.type（key）===“object”）{
			chainable = true;
			for（i in key）{
				jQuery.access（elems，fn，i，key [i]，true，emptyGet，raw）;
			}

		//设置一个值
		} else if（value！== undefined）{
			chainable = true;

			if（！jQuery.isFunction（value））{
				raw = true;
			}

			if（bulk）{
				//批量操作针对整个集合运行
				if（raw）{
					fn.call（elems，value）;
					fn = null;

				// ...执行函数值时除外
				} else {
					bulk = fn;
					fn = function（elem，key，value）{
						return bulk.call（jQuery（elem），value）;
					};
				}
			}

			if（fn）{
				for（; i <length; i ++）{
					fn（elems [i]，key，raw？value：value.call（elems [i]，i，fn（elems [i]，key）））;
				}
			}
		}

		返回可链接？
			元素：

			//获取
			块 ？
				fn.call（elems）：
				长度 ？fn（elems [0]，key）：emptyGet;
	}，

	now：function（）{
		return（new Date（））。getTime（）;
	}
}）;

jQuery.ready.promise = function（obj）{
	if（！readyList）{

		readyList = jQuery.Deferred（）;

		//捕获在浏览器事件发生后调用$（document）.ready（）的情况。
		//我们曾经尝试过在这里使用readyState“interactive”，但它引起了类似问题
		//由ChrisS在这里发现：http：//bugs.jquery.com/ticket/12282#comment：15
		if（document.readyState ===“complete”）{
			//异步处理它以使脚本有机会延迟准备
			setTimeout（jQuery.ready）;

		//基于标准的浏览器支持DOMContentLoaded
		} else if（document.addEventListener）{
			//使用方便的事件回调
			document.addEventListener（“DOMContentLoaded”，completed，false）;

			//回退到window.onload，这将始终有效
			window.addEventListener（“load”，completed，false）;

		//如果使用IE事件模型
		} else {
			//确保在上传之前开火，也许迟到但对于iframe来说也是安全的
			document.attachEvent（“onreadystatechange”，已完成）;

			//回退到window.onload，这将始终有效
			window.attachEvent（“onload”，已完成）;

			//如果IE而不是框架
			//不断检查文档是否准备好
			var top = false;

			尝试{
				top = window.frameElement == null && document.documentElement;
			} catch（e）{}

			if（top && top.doScroll）{
				（function doScrollCheck（）{
					if（！jQuery.isReady）{

						尝试{
							//使用Diego Perini的技巧
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll（ “左”）;
						} catch（e）{
							return setTimeout（doScrollCheck，50）;
						}

						//分离所有dom准备好的事件
						分离（）;

						//并执行任何等待函数
						jQuery.ready（）;
					}
				}）（）;
			}
		}
	}
	return readyList.promise（obj）;
};

//填充class2type映射
jQuery.each（“布尔值数字字符串函数数组日期RegExp对象错误”.split（“”），函数（i，name）{
	class2type [“[object”+ name +“]”] = name.toLowerCase（）;
}）;

function isArraylike（obj）{
	var length = obj.length，
		type = jQuery.type（obj）;

	if（jQuery.isWindow（obj））{
		返回虚假;
	}

	if（obj.nodeType === 1 && length）{
		返回true;
	}

	返回类型===“数组”|| 输入！==“功能”&&
		（长度=== 0 ||
		typeof length ===“number”&& length> 0 &&（length  -  1）in obj）;
}

//所有jQuery对象都应该指向这些对象
rootjQuery = jQuery（document）;
// String to Object选项格式缓存
var optionsCache = {};

//将字符串格式的选项转换为对象格式的选项并存储在缓存中
function createOptions（options）{
	var object = optionsCache [options] = {};
	jQuery.each（options.match（core_rnotwhite）|| []，function（_，flag）{
		object [flag] = true;
	}）;
	返回对象;
}

/ *
 *使用以下参数创建回调列表：
 *
 *选项：一个可选的空格分隔选项列表，它将改变方式
 *回调列表表现或更传统的选项对象
 *
 *默认情况下，回调列表将像事件回调列表一样，可以
 *多次“解雇”。
 *
 *可能的选择：
 *
 *一次：将确保回调列表只能被触发一次（如延期）
 *
 * memory：将跟踪以前的值并将调用添加的任何回调
 *列表被立即用最新的“记忆”点燃后
 *值（如延期）
 *
 * unique：将确保回调只能添加一次（列表中没有重复）
 *
 * stopOnFalse：当回调返回false时中断调用
 *
 * /
jQuery.Callbacks = function（options）{

	//如果需要，将选项从String格式转换为Object格式
	//（我们先检查缓存）
	options = typeof options ===“string”？
		（optionsCache [options] || createOptions（options））：
		jQuery.extend（{}，options）;

	var //标记列表当前是否正在触发的标志
		射击，
		//最后一次火灾值（对于不可忘记的列表）
		记忆，
		//标记是否已触发列表
		解雇，
		//射击时循环结束
		firingLength，
		//当前触发回调的索引（如果需要，可以删除）
		firingIndex，
		//第一次回火（由add和fireWith内部使用）
		firingStart，
		//实际回调列表
		list = []，
		//堆栈的火灾需要可重复的列表
		stack =！options.once && []，
		// Fire回调
		fire = function（data）{
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for（; list && firingIndex <firingLength; firingIndex ++）{
				if（list [firingIndex] .apply（data [0]，data [1]）=== false && options.stopOnFalse）{
					memory = false; //防止使用add进一步调用
					打破;
				}
			}
			fired = false;
			if（list）{
				if（stack）{
					if（stack.length）{
						fire（stack.shift（））;
					}
				} else if（memory）{
					list = [];
				} else {
					self.disable（）;
				}
			}
		}，
		//实际回调对象
		self = {
			//将回调或回调集合添加到列表中
			add：function（）{
				if（list）{
					//首先，我们保存当前的长度
					var start = list.length;
					（function add（args）{
						jQuery.each（args，function（_，arg）{
							var type = jQuery.type（arg）;
							if（type ===“function”）{
								if（！options.unique ||！self.has（arg））{
									list.push（arg）;
								}
							} else if（arg && arg.length && type！==“string”）{
								//递归检查
								add（arg）;
							}
						}）;
					}）（参数）;
					//我们需要将回调添加到
					//当前烧制批次？
					if（fired）{
						firingLength = list.length;
					//对于记忆，如果我们没有射击那么
					//我们应该立刻打电话
					} else if（memory）{
						firingStart = start;
						火（记忆）;
					}
				}
				归还这个;
			}，
			//从列表中删除回调
			remove：function（）{
				if（list）{
					jQuery.each（arguments，function（_，arg）{
						var指数;
						while（（index = jQuery.inArray（arg，list，index））> -1）{
							list.splice（index，1）;
							//处理触发索引
							if（fired）{
								if（index <= firingLength）{
									firingLength--;
								}
								if（index <= firingIndex）{
									firingIndex--;
								}
							}
						}
					}）;
				}
				归还这个;
			}，
			//检查给定的回调是否在列表中。
			//如果没有给出参数，则返回列表是否附加了回调。
			has：function（fn）{
				返回fn？jQuery.inArray（fn，list）> -1：!!（list && list.length）;
			}，
			//从列表中删除所有回调
			empty：function（）{
				list = [];
				归还这个;
			}，
			//列表不再做任何事了
			disable：function（）{
				list = stack = memory = undefined;
				归还这个;
			}，
			//它被禁用了吗？
			disabled：function（）{
				return！list;
			}，
			//将列表锁定为当前状态
			lock：function（）{
				stack = undefined;
				if（！memory）{
					self.disable（）;
				}
				归还这个;
			}，
			//它被锁定了吗？
			已锁定：function（）{
				返回！堆栈;
			}，
			//使用给定的上下文和参数调用所有回调
			fireWith：function（context，args）{
				args = args || [];
				args = [context，args.slice？args.slice（）：args];
				if（list &&（！fired || stack））{
					if（fired）{
						stack.push（args）;
					} else {
						火（args）;
					}
				}
				归还这个;
			}，
			//使用给定的参数调用所有回调
			fire：function（）{
				self.fireWith（this，arguments）;
				归还这个;
			}，
			//知道回调函数是否至少被调用过一次
			fired：function（）{
				返回!!解雇
			}
		};

	回归自我;
};
jQuery.extend（{

	延期：function（func）{
		var tuples = [
				//动作，添加侦听器，侦听器列表，最终状态
				[“resolve”，“done”，jQuery.Callbacks（“曾经记忆”），“已解决”]，
				[“拒绝”，“失败”，jQuery.Callbacks（“一次记忆”），“拒绝”]，
				[“notify”，“progress”，jQuery.Callbacks（“memory”）]
			]
			state =“pending”，
			promise = {
				state：function（）{
					返回状态;
				}，
				总是：function（）{
					deferred.done（arguments）.fail（arguments）;
					归还这个;
				}，
				then：function（/ * fnDone，fnFail，fnProgress * /）{
					var fns = arguments;
					return jQuery.Deferred（function（newDefer）{
						jQuery.each（元组，函数（i，tuple）{
							var action = tuple [0]，
								fn = jQuery.isFunction（fns [i]）&& fns [i];
							//延迟[完成| 失败| 将动作转发到newDefer的进度]
							deferred [tuple [1]]（function（）{
								var returns = fn && fn.apply（this，arguments）;
								if（返回&& jQuery.isFunction（returned.promise））{
									returned.promise（）
										.done（newDefer.resolve）
										.fail（newDefer.reject）
										.progress（newDefer.notify）;
								} else {
									newDefer [action +“With”]（这= = promise？newDefer.promise（）：this，fn？[return]：arguments）;
								}
							}）;
						}）;
						fns = null;
					}）。诺言（）;
				}，
				//获得延期的承诺
				//如果提供了obj，则将promise方面添加到对象中
				promise：function（obj）{
					return obj！= null？jQuery.extend（obj，promise）：promise;
				}
			}，
			deferred = {};

		//保持管道以进行反算
		promise.pipe = promise.then;

		//添加特定于列表的方法
		jQuery.each（元组，函数（i，tuple）{
			var list = tuple [2]，
				stateString = tuple [3];

			//承诺[完成| 失败| 进展] = list.add
			promise [tuple [1]] = list.add;

			//处理状态
			if（stateString）{
				list.add（function（）{
					// state = [已解决| 被拒绝 ]
					state = stateString;

				// [reject_list | resolve_list] .disable; progress_list.lock
				}，tuples [i ^ 1] [2] .disable，tuples [2] [2] .lock）;
			}

			//延迟[resolve | 拒绝| 通知]
			deferred [tuple [0]] = function（）{
				deferred [tuple [0] +“With”]（这= = deferred？promise：this，arguments）;
				归还这个;
			};
			deferred [tuple [0] +“With”] = list.fireWith;
		}）;

		//使延期承诺
		promise.promise（延期）;

		//如果有的话调用给定的函数
		if（func）{
			func.call（延迟，延期）;
		}

		// 全部完成！
		延期退货;
	}，

	//延期帮助者
	when：function（subordinate / *，...，subordinateN * /）{
		var i = 0，
			resolveValues = core_slice.call（arguments），
			length = resolveValues.length，

			//未完成的下属的数量
			剩余=长度！== 1 || （subordinate && jQuery.isFunction（subordinate.promise））？长度：0，

			//主人延期。如果resolveValues只包含一个Deferred，那就使用它。
			延迟=剩余=== 1？subordinate：jQuery.Deferred（），

			//更新解析和进度值的功能
			updateFunc = function（i，contexts，values）{
				return函数（值）{
					上下文[i] =这个;
					values [i] = arguments.length> 1？core_slice.call（arguments）：value;
					if（values === progressValues）{
						deferred.notifyWith（contexts，values）;
					} else if（！（--remaining））{
						deferred.resolveWith（contexts，values）;
					}
				};
			}，

			progressValues，progressContexts，resolveContexts;

		//将侦听器添加到Deferred下属; 把别人视为已解决
		if（length> 1）{
			progressValues = new Array（length）;
			progressContexts = new Array（length）;
			resolveContexts = new Array（length）;
			for（; i <length; i ++）{
				if（resolveValues [i] && jQuery.isFunction（resolveValues [i] .promise））{
					resolveValues [i] .promise（）
						.done（updateFunc（i，resolveContexts，resolveValues））
						.fail（deferred.reject）
						.progress（updateFunc（i，progressContexts，progressValues））;
				} else {
					--remaining;
				}
			}
		}

		//如果我们不等任何事情，请解决主人问题
		if（！remaining）{
			deferred.resolveWith（resolveContexts，resolveValues）;
		}

		return deferred.promise（）;
	}
}）;
jQuery.support =（function（）{

	var support，all，a，
		输入，选择，片段，
		opt，eventName，isSupported，i，
		div = document.createElement（“div”）;

	// 建立
	div.setAttribute（“className”，“t”）;
	div.innerHTML =“<link /> <table> </ table> <a href='/a'> a </a> <input type ='checkbox'/>”;

	//支持测试不会在某些有限或非浏览器环境中运行
	all = div.getElementsByTagName（“*”）;
	a = div.getElementsByTagName（“a”）[0];
	if（！all ||！a ||！all.length）{
		return {};
	}

	//第一批测试
	select = document.createElement（“select”）;
	opt = select.appendChild（document.createElement（“option”））;
	input = div.getElementsByTagName（“input”）[0];

	a.style.cssText =“top：1px; float：left; opacity：.5”;
	support = {
		//在camelCase类上测试setAttribute。如果它有效，我们在执行get / setAttribute时需要attrFix（即6/7）
		getSetAttribute：div.className！==“t”，

		//当使用.innerHTML时，IE会删除前导空格
		leadingWhitespace：div.firstChild.nodeType === 3，

		//确保不会自动插入tbody元素
		// IE会将它们插入空表中
		tbody：！div.getElementsByTagName（“tbody”）。length，

		//确保链接元素由innerHTML正确序列化
		//这需要IE中的包装元素
		htmlSerialize：!! div.getElementsByTagName（“link”）。length，

		//从getAttribute获取样式信息
		//（IE使用.cssText代替）
		style：/top/.test（a.getAttribute（“style”）），

		//确保不操纵URL
		//（IE默认将其标准化）
		hrefNormalized：a.getAttribute（“href”）===“/ a”，

		//确保元素不透明度存在
		//（IE使用过滤器代替）
		//使用正则表达式来解决WebKit问题。见＃5145
		不透明度：/^0.5/.test(a.style.opacity），

		//验证样式浮点存在
		//（IE使用styleFloat而不是cssFloat）
		cssFloat：!! a.style.cssFloat，

		//检查默认复选框/无线电值（WebKit上的“”;其他地方的“on”）
		checkOn：!! input.value，

		//确保选择的默认选项具有可用的选定属性。
		//（WebKit默认为false而不是true，IE也是如果它在optgroup中）
		optSelected：opt.selected，

		//测试表单上的enctype支持（＃6743）
		enctype：!! document.createElement（“form”）。enctype，

		//确保克隆html5元素不会导致问题
		//如果outerHTML未定义，这仍然有效
		html5Clone：document.createElement（“nav”）。cloneNode（true）.outerHTML！==“<：nav> </：nav>”，

		// jQuery.support.boxModel在1.8中已弃用，因为我们不支持Quirks模式
		boxModel：document.compatMode ===“CSS1Compat”，

		//稍后会定义
		deleteExpando：true，
		noCloneEvent：true，
		inlineBlockNeedsLayout：false，
		shrinkWrapBlocks：false，
		reliableMarginRight：true，
		boxSizingReliable：true，
		pixelPosition：false
	};

	//确保已正确克隆已检查状态
	input.checked = true;
	support.noCloneChecked = input.cloneNode（true）.checked;

	//确保禁用选项内的选项未标记为已禁用
	//（WebKit将它们标记为已禁用）
	select.disabled = true;
	support.optDisabled =！opt.disabled;

	//支持：IE <9
	尝试{
		删除div.test;
	} catch（e）{
		support.deleteExpando = false;
	}

	//检查我们是否可以信任getAttribute（“value”）
	input = document.createElement（“input”）;
	input.setAttribute（“value”，“”）;
	support.input = input.getAttribute（“value”）===“”;

	//在成为收音机后检查输入是否保持其值
	input.value =“t”;
	input.setAttribute（“type”，“radio”）;
	support.radioValue = input.value ===“t”;

	//＃11217  - 当名称在checked属性之后时，WebKit将丢失检查
	input.setAttribute（“checked”，“t”）;
	input.setAttribute（“name”，“t”）;

	fragment = document.createDocumentFragment（）;
	fragment.appendChild（input）;

	//检查断开连接的复选框是否会保留其选中状态
	//附加到DOM后的值为true（IE6 / 7）
	support.appendChecked = input.checked;

	// WebKit不会在片段中正确克隆已检查状态
	support.checkClone = fragment.cloneNode（true）.cloneNode（true）.lastChild.checked;

	//支持：IE <9
	// Opera不会克隆事件（并且typeof div.attachEvent === undefined）。
	// IE9-10克隆通过attachEvent绑定的事件，但它们不会通过.click（）触发
	if（div.attachEvent）{
		div.attachEvent（“onclick”，function（）{
			support.noCloneEvent = false;
		}）;

		div.cloneNode（true）.click（）;
	}

	//支持：IE <9（缺少提交/更改泡泡），Firefox 17+（缺乏focusin事件）
	//谨防CSP限制（https://developer.mozilla.org/en/Security/CSP），test / csp.php
	for（i in {submit：true，change：true，focusin：true}）{
		div.setAttribute（eventName =“on”+ i，“t”）;

		支持[i +“Bubbles”] =窗口中的eventName || div.attributes [eventName] .expando === false;
	}

	div.style.backgroundClip =“content-box”;
	div.cloneNode（true）.style.backgroundClip =“”;
	support.clearCloneStyle = div.style.backgroundClip ===“content-box”;

	//在doc准备好的情况下运行需要正文的测试
	jQuery（function（）{
		var container，marginDiv，tds，
			divReset =“padding：0; margin：0; border：0; display：block; box-sizing：content-box; -moz-box-sizing：content-box; -webkit-box-sizing：content-box;” ，
			body = document.getElementsByTagName（“body”）[0];

		if（！body）{
			//返回没有正文的框架集文档
			返回;
		}

		container = document.createElement（“div”）;
		container.style.cssText =“border：0; width：0; height：0; position：absolute; top：0; left：-9999px; margin-top：1px”;

		body.appendChild（container）.appendChild（div）;

		//支持：IE8
		//检查表格单元格在设置时是否仍具有offsetWidth / Height
		//显示：无，并且还有其他可见的表格单元格
		//表格行; 如果是这样，offsetWidth / Height在使用时不可靠
		//确定是否已直接使用隐藏元素
		// display：none（如果父元素是，则使用偏移量仍然是安全的
		//隐藏; 戴安全护目镜并查看bug＃4512了解更多信息）。
		div.innerHTML =“<table> <tr> <td> </ td> <td> t </ td> </ tr> </ table>”;
		tds = div.getElementsByTagName（“td”）;
		tds [0] .style.cssText =“padding：0; margin：0; border：0; display：none”;
		isSupported =（tds [0] .offsetHeight === 0）;

		tds [0] .style.display =“”;
		tds [1] .style.display =“none”;

		//支持：IE8
		//检查空表格单元格是否仍具有offsetWidth / Height
		support.reliableHiddenOffsets = isSupported &&（tds [0] .offsetHeight === 0）;

		//检查框大小和边距行为
		div.innerHTML =“”;
		div.style.cssText =“box-sizing：border-box; -moz-box-sizing：border-box; -webkit-box-sizing：border-box; padding：1px; border：1px; display：block; width ：4像素;边距：1％;位置：绝对的;顶部：1％;“;
		support.boxSizing =（div.offsetWidth === 4）;
		support.doesNotIncludeMarginInBodyOffset =（body.offsetTop！== 1）;

		//使用window.getComputedStyle，因为node.js上的jsdom会在没有它的情况下中断。
		if（window.getComputedStyle）{
			support.pixelPosition =（window.getComputedStyle（div，null）|| {}）。top！==“1％”;
			support.boxSizingReliable =（window.getComputedStyle（div，null）|| {width：“4px”}）。width ===“4px”;

			//检查div是否具有明确的宽度且没有右边的错误
			//根据容器的宽度计算margin-right。（＃3333）
			// 2011年2月之前在WebKit中失败
			// WebKit Bug 13343  -  getComputedStyle为margin-right返回错误的值
			marginDiv = div.appendChild（document.createElement（“div”））;
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width =“0”;
			div.style.width =“1px”;

			support.reliableMarginRight =
				！parseFloat（（window.getComputedStyle（marginDiv，null）|| {}）。marginRight）;
		}

		if（typeof div.style.zoom！== core_strundefined）{
			//支持：IE <8
			//检查本机块级元素是否像内联块一样
			//将元素设置为“内联”并给予时的元素
			//他们的布局
			div.innerHTML =“”;
			div.style.cssText = divReset +“width：1px; padding：1px; display：inline; zoom：1”;
			support.inlineBlockNeedsLayout =（div.offsetWidth === 3）;

			//支持：IE6
			//检查带有布局的元素是否收缩包装其子元素
			div.style.display =“block”;
			div.innerHTML =“<div> </ div>”;
			div.firstChild.style.width =“5px”;
			support.shrinkWrapBlocks =（div.offsetWidth！== 3）;

			if（support.inlineBlockNeedsLayout）{
				//防止IE 6影响定位元素＃11048的布局
				//防止IE在IE 7模式下缩小正文＃12869
				//支持：IE <8
				body.style.zoom = 1;
			}
		}

		body.removeChild（container）;

		//空元素以避免IE中的泄漏
		container = div = tds = marginDiv = null;
	}）;

	//空元素以避免IE中的泄漏
	all = select = fragment = opt = a = input = null;

	返回支持;
}）（）;

var rbrace = /（？：\ {[\ s \ S] * \} | \ [[\ s \ S] * \]）$ /，
	rmultiDash = /（[AZ]）/ g;

function internalData（elem，name，data，pvt / *仅供内部使用* /）{
	if（！jQuery.acceptData（elem））{
		返回;
	}

	var thisCache，ret，
		internalKey = jQuery.expando，
		getByName = typeof name ===“string”，

		//我们必须以不同的方式处理DOM节点和JS对象，因为IE6-7
		//无法跨DOM-JS边界正确引用GC对象
		isNode = elem.nodeType，

		//只有DOM节点需要全局jQuery缓存; JS对象数据是
		//直接附加到对象，因此GC可以自动发生
		cache = isNode？jQuery.cache：elem，

		//只有在JS对象的缓存已存在的情况下才允许为其定义ID
		//与没有缓存的DOM节点在同一路径上快捷方式的代码
		id = isNode？elem [internalKey]：elem [internalKey] && internalKey;

	//在尝试获取数据时，避免做任何比我们需要的工作更多的工作
	//根本没有数据的对象
	if（（！id ||！cache [id] ||（！pvt &&！cache [id] .data））&& getByName && data === undefined）{
		返回;
	}

	if（！id）{
		//只有DOM节点需要为每个元素提供一个新的唯一ID，因为它们的数据
		//最终进入全局缓存
		if（isNode）{
			elem [internalKey] = id = core_deletedIds.pop（）|| jQuery.guid ++;
		} else {
			id = internalKey;
		}
	}

	if（！cache [id]）{
		cache [id] = {};

		//避免在对象上暴露普通JS对象上的jQuery元数据
		//使用JSON.stringify序列化
		if（！isNode）{
			cache [id] .toJSON = jQuery.noop;
		}
	}

	//可以将对象传递给jQuery.data而不是键/值对; 这得到了
	//浅被复制到现有缓存上
	if（typeof name ===“object”|| typeof name ===“function”）{
		if（pvt）{
			cache [id] = jQuery.extend（cache [id]，name）;
		} else {
			cache [id] .data = jQuery.extend（cache [id] .data，name）;
		}
	}

	thisCache = cache [id];

	// jQuery data（）存储在对象内部数据中的单独对象中
	//缓存以避免内部数据与用户定义之间的密钥冲突
	//数据
	if（！pvt）{
		if（！thisCache.data）{
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if（data！== undefined）{
		thisCache [jQuery.camelCase（name）] = data;
	}

	//检查转换为camel和未转换的数据属性名称
	//如果指定了数据属性
	if（getByName）{

		//首先尝试查找原样属性数据
		ret = thisCache [name];

		//测试null |未定义的属性数据
		if（ret == null）{

			//尝试找到camelCased属性
			ret = thisCache [jQuery.camelCase（name）];
		}
	} else {
		ret = thisCache;
	}

	返回;
}

function internalRemoveData（elem，name，pvt）{
	if（！jQuery.acceptData（elem））{
		返回;
	}

	var i，l，thisCache，
		isNode = elem.nodeType，

		//有关更多信息，请参阅jQuery.data
		cache = isNode？jQuery.cache：elem，
		id = isNode？elem [jQuery.expando]：jQuery.expando;

	//如果此对象已经没有缓存条目，则没有
	//目的继续
	if（！cache [id]）{
		返回;
	}

	if（name）{

		thisCache = pvt？cache [id]：cache [id] .data;

		if（thisCache）{

			//支持数据键的数组或空格分隔的字符串名称
			if（！jQuery.isArray（name））{

				//在任何操作之前尝试将字符串作为键
				if（thisCache中的名字）{
					name = [name];
				} else {

					//除非存在包含空格的键，否则用空格分割camel cased版本
					name = jQuery.camelCase（name）;
					if（thisCache中的名字）{
						name = [name];
					} else {
						name = name.split（“”）;
					}
				}
			} else {
				//如果“name”是一个键数组......
				//最初创建数据时，通过（“key”，“val”）签名，
				//键将转换为camelCase。
				//由于没有办法告诉_how_添加了一个密钥，请删除
				//都是普通键和camelCase键。＃12786
				//这只会惩罚数组参数路径。
				name = name.concat（jQuery.map（name，jQuery.camelCase））;
			}

			for（i = 0，l = name.length; i <l; i ++）{
				删除thisCache [name [i]];
			}

			//如果缓存中没有剩余数据，我们希望继续
			//让缓存对象本身被破坏
			if（！（pvt？isEmptyDataObject：jQuery.isEmptyObject）（thisCache））{
				返回;
			}
		}
	}

	//有关更多信息，请参阅jQuery.data
	if（！pvt）{
		delete cache [id] .data;

		//除非内部数据对象，否则不要销毁父缓存
		//是唯一遗留下来的东西
		if（！isEmptyDataObject（cache [id]））{
			返回;
		}
	}

	//销毁缓存
	if（isNode）{
		jQuery.cleanData（[elem]，true）;

	//当支持expandos时使用delete或者`cache`不是每个isWindow的窗口（＃10080）
	} else if（jQuery.support.deleteExpando || cache！= cache.window）{
		delete cache [id];

	//当其他所有方法都失败时，为null
	} else {
		cache [id] = null;
	}
}

jQuery.extend（{
	缓存：{}，

	//对于页面上的每个jQuery副本都是唯一的
	//删除非数字以匹配rinlinejQuery
	expando：“jQuery”+（core_version + Math.random（））.replace（/ \ D / g，“”），

	//如果你，以下元素会抛出无法捕获的异常
	//尝试向其添加expando属性。
	没有数据： {
		“嵌入”：是的，
		//禁止除Flash之外的所有对象（处理expandos）
		“对象”：“clsid：D27CDB6E-AE6D-11cf-96B8-444553540000”，
		“applet”：是的
	}，

	hasData：function（elem）{
		elem = elem.nodeType？jQuery.cache [elem [jQuery.expando]]：elem [jQuery.expando];
		return !! elem &&！isE​​mptyDataObject（elem）;
	}，

	data：function（elem，name，data）{
		return internalData（elem，name，data）;
	}，

	removeData：function（elem，name）{
		return internalRemoveData（elem，name）;
	}，

	// 仅限内部使用。
	_data：function（elem，name，data）{
		return internalData（elem，name，data，true）;
	}，

	_removeData：function（elem，name）{
		return internalRemoveData（elem，name，true）;
	}，

	//确定DOM节点是否可以处理数据expando的方法
	acceptData：function（elem）{
		//不要在非元素上设置数据，因为它不会被清除（＃8335）。
		if（elem.nodeType && elem.nodeType！== 1 && elem.nodeType！== 9）{
			返回虚假;
		}

		var noData = elem.nodeName && jQuery.noData [elem.nodeName.toLowerCase（）];

		//节点接受数据，除非另有说明; 拒绝可以是有条件的
		return！noData || noData！== true && elem.getAttribute（“classid”）=== noData;
	}
}）;

1.3中（{
	data：function（key，value）{
		var attrs，name，
			elem = this [0]，
			i = 0，
			data = null;

		//获取所有值
		if（key === undefined）{
			if（this.length）{
				data = jQuery.data（elem）;

				if（elem.nodeType === 1 &&！jQuery._data（elem，“parsedAttrs”））{
					attrs = elem.attributes;
					for（; i <attrs.length; i ++）{
						name = attrs [i] .name;

						if（！name.indexOf（“data-”））{
							name = jQuery.camelCase（name.slice（5））;

							dataAttr（elem，name，data [name]）;
						}
					}
					jQuery._data（elem，“parsedAttrs”，true）;
				}
			}

			返回数据;
		}

		//设置多个值
		if（typeof key ===“object”）{
			return this.each（function（）{
				jQuery.data（this，key）;
			}）;
		}

		return jQuery.access（this，function（value）{

			if（value === undefined）{
				//首先尝试获取任何内部存储的数据
				返回elem？dataAttr（elem，key，jQuery.data（elem，key））：null;
			}

			this.each（function（）{
				jQuery.data（this，key，value）;
			}）;
		}，null，value，arguments.length> 1，null，true）;
	}，

	removeData：function（key）{
		return this.each（function（）{
			jQuery.removeData（this，key）;
		}）;
	}
}）;

function dataAttr（elem，key，data）{
	//如果在内部找不到任何内容，请尝试获取任何内容
	//来自HTML5 data- *属性的数据
	if（data === undefined && elem.nodeType === 1）{

		var name =“data-”+ key.replace（rmultiDash，“ -  $ 1”）。toLowerCase（）;

		data = elem.getAttribute（name）;

		if（typeof data ===“string”）{
			尝试{
				data = data ===“true”？是的：
					data ===“false”？假的：
					data ===“null”？空值 ：
					//如果不更改字符串，则仅转换为数字
					+ data +“”===数据？+数据：
					rbrace.test（数据）？jQuery.parseJSON（数据）：
						数据;
			} catch（e）{}

			//确保我们设置数据，以便以后不会更改
			jQuery.data（elem，key，data）;

		} else {
			data = undefined;
		}
	}

	返回数据;
}

//检查缓存对象是否空虚
function isEmptyDataObject（obj）{
	var name;
	for（obj中的名字）{

		//如果公共数据对象为空，则private仍为空
		if（name ===“data”&& jQuery.isEmptyObject（obj [name]））{
			继续;
		}
		if（name！==“toJSON”）{
			返回虚假;
		}
	}

	返回true;
}
jQuery.extend（{
	queue：function（elem，type，data）{
		var queue;

		if（elem）{
			type =（type ||“fx”）+“queue”;
			queue = jQuery._data（elem，type）;

			//如果这只是一次查找，可以通过快速退出来加速出队
			if（data）{
				if（！queue || jQuery.isArray（data））{
					queue = jQuery._data（elem，type，jQuery.makeArray（data））;
				} else {
					queue.push（data）;
				}
			}
			返回队列|| [];
		}
	}，

	dequeue：function（elem，type）{
		type = type || “FX”;

		var queue = jQuery.queue（elem，type），
			startLength = queue.length，
			fn = queue.shift（），
			hooks = jQuery._queueHooks（elem，type），
			next = function（）{
				jQuery.dequeue（elem，type）;
			};

		//如果fx队列出列，请始终删除进度sentinel
		if（fn ===“inprogress”）{
			fn = queue.shift（）;
			startLength--;
		}

		hooks.cur = fn;
		if（fn）{

			//添加进度sentinel以防止fx队列进入
			//自动出列
			if（type ===“fx”）{
				queue.unshift（“inprogress”）;
			}

			//清除最后一个队列停止功能
			delete hooks.stop;
			fn.call（elem，next，hooks）;
		}

		if（！startLength && hooks）{
			hooks.empty.fire（）;
		}
	}，

	//不打算供公众使用 - 生成queueHooks对象，或返回当前对象
	_queueHooks：function（elem，type）{
		var key = type +“queueHooks”;
		返回jQuery._data（elem，key）|| jQuery._data（elem，key，{
			empty：jQuery.Callbacks（“once memory”）。add（function（）{
				jQuery._removeData（elem，type +“queue”）;
				jQuery._removeData（elem，key）;
			}）
		}）;
	}
}）;

1.3中（{
	queue：function（type，data）{
		var setter = 2;

		if（typeof type！==“string”）{
			data = type;
			type =“fx”;
			setter--;
		}

		if（arguments.length <setter）{
			return jQuery.queue（this [0]，type）;
		}

		返回数据=== undefined？
			这个 ：
			this.each（function（）{
				var queue = jQuery.queue（this，type，data）;

				//确保此队列的挂钩
				jQuery._queueHooks（this，type）;

				if（type ===“fx”&& queue [0]！==“inprogress”）{
					jQuery.dequeue（this，type）;
				}
			}）;
	}，
	dequeue：function（type）{
		return this.each（function（）{
			jQuery.dequeue（this，type）;
		}）;
	}，
	//基于Clint Helfers的插件，经过许可。
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	延迟：功能（时间，类型）{
		time = jQuery.fx？jQuery.fx.speeds [time] || 时间：时间;
		type = type || “FX”;

		return this.queue（type，function（next，hooks）{
			var timeout = setTimeout（next，time）;
			hooks.stop = function（）{
				clearTimeout（超时）;
			};
		}）;
	}，
	clearQueue：function（type）{
		return this.queue（type ||“fx”，[]）;
	}，
	//获取某个类型的队列时解析的承诺
	//被清空（默认情况下fx是类型）
	promise：function（type，obj）{
		var tmp，
			count = 1，
			defer = jQuery.Deferred（），
			要素=这个，
			i = this.length，
			resolve = function（）{
				if（！（ -  count））{
					defer.resolveWith（elements，[elements]）;
				}
			};

		if（typeof type！==“string”）{
			obj = type;
			type = undefined;
		}
		type = type || “FX”;

		当我 -  ） {
			tmp = jQuery._data（elements [i]，type +“queueHooks”）;
			if（tmp && tmp.empty）{
				计数++;
				tmp.empty.add（resolve）;
			}
		}
		解决（）;
		return defer.promise（obj）;
	}
}）;
var nodeHook，boolHook，
	rclass = / [\ t \ r \ n] / g，
	rreturn = / \ r / g，
	rfocusable = / ^（？：input | select | textarea | button | object）$ / i，
	rclickable = / ^（？：a | area）$ / i，
	rboolean = / ^（？：checked | selected | autofocus | autoplay | async | controls | defer | disabled | hidden | loop | multiple | open | readonly | required | scoped）$ / i，
	ruseDefault = / ^（？：选中|选中）$ / i，
	getSetAttribute = jQuery.support.getSetAttribute，
	getSetInput = jQuery.support.input;

1.3中（{
	attr：function（name，value）{
		返回jQuery.access（this，jQuery.attr，name，value，arguments.length> 1）;
	}，

	removeAttr：function（name）{
		return this.each（function（）{
			jQuery.removeAttr（this，name）;
		}）;
	}，

	prop：function（name，value）{
		返回jQuery.access（this，jQuery.prop，name，value，arguments.length> 1）;
	}，

	removeProp：function（name）{
		name = jQuery.propFix [name] || 名称;
		return this.each（function（）{
			// try / catch处理IE balks的情况（例如删除窗口上的属性）
			尝试{
				这个[名字] =未定义;
				删除此[名称];
			} catch（e）{}
		}）;
	}，

	addClass：function（value）{
		var classes，elem，cur，clazz，j，
			i = 0，
			len = this.length，
			proceed = typeof value ===“string”&& value;

		if（jQuery.isFunction（value））{
			return this.each（function（j）{
				jQuery（this）.addClass（value.call（this，j，this.className））;
			}）;
		}

		if（继续）{
			//这里的分离是为了更好的压缩性（参见removeClass）
			classes =（value ||“”）。match（core_rnotwhite）|| [];

			for（; i <len; i ++）{
				elem = this [i];
				cur = elem.nodeType === 1 &&（elem.className？
					（“”+ elem.className +“”）。replace（rclass，“”）：
					“”
				）;

				if（cur）{
					j = 0;
					while（（clazz = classes [j ++]））{
						if（cur.indexOf（“”+ clazz +“”）<0）{
							cur + = clazz +“”;
						}
					}
					elem.className = jQuery.trim（cur）;

				}
			}
		}

		归还这个;
	}，

	removeClass：function（value）{
		var classes，elem，cur，clazz，j，
			i = 0，
			len = this.length，
			proceed = arguments.length === 0 || typeof value ===“string”&& value;

		if（jQuery.isFunction（value））{
			return this.each（function（j）{
				jQuery（this）.removeClass（value.call（this，j，this.className））;
			}）;
		}
		if（继续）{
			classes =（value ||“”）。match（core_rnotwhite）|| [];

			for（; i <len; i ++）{
				elem = this [i];
				//此表达式用于提高压缩性（请参阅addClass）
				cur = elem.nodeType === 1 &&（elem.className？
					（“”+ elem.className +“”）。replace（rclass，“”）：
					“”
				）;

				if（cur）{
					j = 0;
					while（（clazz = classes [j ++]））{
						//删除* all *实例
						while（cur.indexOf（“”+ clazz +“”）> = 0）{
							cur = cur.replace（“”+ clazz +“”，“”）;
						}
					}
					elem.className = value？jQuery.trim（cur）：“”;
				}
			}
		}

		归还这个;
	}，

	toggleClass：function（value，stateVal）{
		var type = typeof value，
			isBool = typeof stateVal ===“boolean”;

		if（jQuery.isFunction（value））{
			return this.each（function（i）{
				jQuery（this）.toggleClass（value.call（this，i，this.className，stateVal），stateVal）;
			}）;
		}

		return this.each（function（）{
			if（type ===“string”）{
				//切换单个类名
				var className，
					i = 0，
					self = jQuery（this），
					state = stateVal，
					classNames = value.match（core_rnotwhite）|| [];

				while（（className = classNames [i ++]））{
					//检查给定的每个className，空格分隔列表
					state = isBool？state：！self.hasClass（className）;
					自我[状态？“addClass”：“removeClass”]（className）;
				}

			//切换整个班级名称
			} else if（type === core_strundefined || type ===“boolean”）{
				if（this.className）{
					//如果设置，则存储className
					jQuery._data（this，“__ className__”，this.className）;
				}

				//如果元素有类名或者我们传递“false”，
				//然后删除整个类名（如果有的话，上面保存了它）。
				//否则带回以前保存过的东西（如果有的话），
				//如果没有存储，则回退到空字符串。
				this.className = this.className || 值===假？“”：jQuery._data（this，“__ className__”）|| “”;
			}
		}）;
	}，

	hasClass：function（selector）{
		var className =“”+ selector +“”，
			i = 0，
			l = this.length;
		for（; i <l; i ++）{
			if（this [i] .nodeType === 1 &&（“”+ this [i] .className +“”）。replace（rclass，“”）。indexOf（className）> = 0）{
				返回true;
			}
		}

		返回虚假;
	}，

	val：function（value）{
		var ret，hooks，isFunction，
			elem = this [0];

		if（！arguments.length）{
			if（elem）{
				hooks = jQuery.valHooks [elem.type] || jQuery.valHooks [elem.nodeName.toLowerCase（）];

				if（hooks &&“get”in hooks &&（ret = hooks.get（elem，“value”））！== undefined）{
					返回;
				}

				ret = elem.value;

				return typeof ret ===“string”？
					//处理最常见的字符串案例
					ret.replace（rreturn，“”）：
					//处理value为null / undef或number的情况
					ret == null？“”：ret;
			}

			返回;
		}

		isFunction = jQuery.isFunction（value）;

		return this.each（function（i）{
			var val，
				self = jQuery（this）;

			if（this.nodeType！== 1）{
				返回;
			}

			if（isFunction）{
				val = value.call（this，i，self.val（））;
			} else {
				val =值;
			}

			//将null / undefined视为“”; 将数字转换为字符串
			if（val == null）{
				val =“”;
			} else if（typeof val ===“number”）{
				val + =“”;
			} else if（jQuery.isArray（val））{
				val = jQuery.map（val，function（value）{
					返回值== null？“”：值+“”;
				}）;
			}

			hooks = jQuery.valHooks [this.type] || jQuery.valHooks [this.nodeName.toLowerCase（）];

			//如果set返回undefined，则回退到正常设置
			if（！hooks ||！（挂钩中的“set”）|| hooks.set（this，val，“value”）=== undefined）{
				this.value = val;
			}
		}）;
	}
}）;

jQuery.extend（{
	valHooks：{
		选项： {
			get：function（elem）{
				//在Blackberry 4.7中未定义attributes.value但是
				//使用.value。见＃6932
				var val = elem.attributes.value;
				return！val || val.specified？elem.value：elem.text;
			}
		}，
		选择： {
			get：function（elem）{
				var值，选项，
					options = elem.options，
					index = elem.selectedIndex，
					one = elem.type ===“select-one”|| 指数<0，
					值=一？空值 ： []，
					最大=一？index + 1：options.length，
					i =指数<0？
						最大值：
						一个？指数：0;

				//遍历所有选定的选项
				for（; i <max; i ++）{
					option = options [i];

					//表单重置后，oldIE未更新（＃2551）
					if（（option.selected || i === index）&&
							//不返回已禁用的选项或禁用的optgroup中的选项
							（jQuery.support.optDisabled？！option.disabled：option.getAttribute（“disabled”）=== null）&&
							（！option.parentNode.disabled ||！jQuery.nodeName（option.parentNode，“optgroup”）））{

						//获取选项的特定值
						value = jQuery（option）.val（）;

						//我们不需要一个选择的数组
						如果一个 ） {
							回报值;
						}

						// Multi-Selects返回一个数组
						values.push（value）;
					}
				}

				回报值;
			}，

			set：function（elem，value）{
				var values = jQuery.makeArray（value）;

				jQuery（elem）.find（“option”）。each（function（）{
					this.selected = jQuery.inArray（jQuery（this）.val（），values）> = 0;
				}）;

				if（！values.length）{
					elem.selectedIndex = -1;
				}
				回报值;
			}
		}
	}，

	attr：function（elem，name，value）{
		var hooks，notxml，ret，
			nType = elem.nodeType;

		//不要在文本，注释和属性节点上获取/设置属性
		if（！elem || nType === 3 || nType === 8 || nType === 2）{
			返回;
		}

		//在不支持属性时回退到prop
		if（typeof elem.getAttribute === core_strundefined）{
			return jQuery.prop（elem，name，value）;
		}

		notxml = nType！== 1 || ！jQuery.isXMLDoc（elem）;

		//所有属性都是小写的
		//如果定义了一个必需的钩子
		if（notxml）{
			name = name.toLowerCase（）;
			hooks = jQuery.attrHooks [name] || （rboolean.test（name）？boolHook：nodeHook）;
		}

		我f（值！==未定义）{

			if（value === null）{
				jQuery.removeAttr（elem，name）;

			} else if（hooks && notxml &&“set”in hooks &&（ret = hooks.set（elem，value，name））！== undefined）{
				返回;

			} else {
				elem.setAttribute（name，value +“”）;
				回报值;
			}

		} else if（hooks && notxml &&“get”in hooks &&（ret = hooks.get（elem，name））！== null）{
			返回;

		} else {

			//在IE9 +中，Flash对象没有.getAttribute（＃12945）
			//支持：IE9 +
			if（typeof elem.getAttribute！== core_strundefined）{
				ret = elem.getAttribute（name）;
			}

			//不存在的属性返回null，我们规范化为undefined
			return ret == null？
				undefined：
				RET;
		}
	}，

	removeAttr：function（elem，value）{
		var name，propName，
			i = 0，
			attrNames = value && value.match（core_rnotwhite）;

		if（attrNames && elem.nodeType === 1）{
			while（（name = attrNames [i ++]））{
				propName = jQuery.propFix [name] || 名称;

				//布尔属性得到特殊处理（＃10870）
				if（rboolean.test（name））{
					//为布尔属性设置相应的属性为false
					//同样清除IE <8的defaultChecked / defaultSelected（如果适用）
					if（！getSetAttribute && ruseDefault.test（name））{
						elem [jQuery.camelCase（“default-”+ name）] =
							elem [propName] = false;
					} else {
						elem [propName] = false;
					}

				//有关此方法的说明，请参阅＃9699（首先设置，然后删除）
				} else {
					jQuery.attr（elem，name，“”）;
				}

				elem.removeAttribute（getSetAttribute？name：propName）;
			}
		}
	}，

	attrHooks：{
		类型：{
			set：function（elem，value）{
				if（！jQuery.support.radioValue && value ===“radio”&& jQuery.nodeName（elem，“input”））{
					//在值重置IE6-9中的值后，在单选按钮上设置类型
					//在创建期间设置值后，将值重置为默认值
					var val = elem.value;
					elem.setAttribute（“type”，value）;
					if（val）{
						elem.value = val;
					}
					回报值;
				}
			}
		}
	}，

	propFix：{
		tabindex：“tabIndex”，
		readonly：“readOnly”，
		“for”：“htmlFor”，
		“class”：“className”，
		maxlength：“maxLength”，
		cellspacing：“cellSpacing”，
		cellpadding：“cellPadding”，
		rowspan：“rowSpan”，
		colspan：“colSpan”，
		usemap：“useMap”，
		frameborder：“frameBorder”，
		contenteditable：“contentEditable”
	}，

	prop：function（elem，name，value）{
		var ret，hooks，notxml，
			nType = elem.nodeType;

		//不要在文本，注释和属性节点上获取/设置属性
		if（！elem || nType === 3 || nType === 8 || nType === 2）{
			返回;
		}

		notxml = nType！== 1 || ！jQuery.isXMLDoc（elem）;

		if（notxml）{
			//修复名称并附加挂钩
			name = jQuery.propFix [name] || 名称;
			hooks = jQuery.propHooks [name];
		}

		if（value！== undefined）{
			if（hooks &&“set”in hooks &&（ret = hooks.set（elem，value，name））！== undefined）{
				返回;

			} else {
				return（elem [name] = value）;
			}

		} else {
			if（hooks &&“get”in hooks &&（ret = hooks.get（elem，name））！== null）{
				返回;

			} else {
				return elem [name];
			}
		}
	}，

	propHooks：{
		tabIndex：{
			get：function（elem）{
				// elem.tabIndex在未明确设置时并不总是返回正确的值
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode（“tabindex”）;

				return attributeNode && attributeNode.specified？
					parseInt（attributeNode.value，10）：
					rfocusable.test（elem.nodeName）|| rclickable.test（elem.nodeName）&& elem.href？
						0：
						不确定的;
			}
		}
	}
}）;

// Hook表示布尔属性
boolHook = {
	get：function（elem，name）{
		VAR
			//使用.prop确定此属性是否被理解为boolean
			prop = jQuery.prop（elem，name），

			//相应地获取它
			attr = typeof prop ===“boolean”&& elem.getAttribute（name），
			detail = typeof prop ===“boolean”？

				getSetInput && getSetAttribute？
					attr！= null：
					// oldIE为缺少的布尔属性构造一个空字符串
					//并将选中/选中的内容混合到attroperties中
					ruseDefault.test（名字）？
						elem [jQuery.camelCase（“default-”+ name）]：
						!! attr：

				//为未识别为boolean的属性获取属性节点
				elem.getAttributeNode（name）;

		返回详细信息&& detail.value！== false？
			name.toLowerCase（）：
			不确定的;
	}，
	set：function（elem，value，name）{
		if（value === false）{
			//设置为false时删除布尔属性
			jQuery.removeAttr（elem，name）;
		} else if（getSetInput && getSetAttribute ||！ruseDefault.test（name））{
			// IE <8需要* property * name
			elem.setAttribute（！getSetAttribute && jQuery.propFix [name] || name，name）;

		//对oldIE使用defaultChecked和defaultSelected
		} else {
			elem [jQuery.camelCase（“default-”+ name）] = elem [name] = true;
		}

		返回名称;
	}
};

//修复oldIE值attroperty
if（！getSetInput ||！getSetAttribute）{
	jQuery.attrHooks.value = {
		get：function（elem，name）{
			var ret = elem.getAttributeNode（name）;
			return jQuery.nodeName（elem，“input”）？

				//使用defaultValue忽略值* property *
				elem.defaultValue：

				ret && ret.specified？ret.value：undefined;
		}，
		set：function（elem，value，name）{
			if（jQuery.nodeName（elem，“input”））{
				//不返回，以便也使用setAttribute
				elem.defaultValue = value;
			} else {
				//如果已定义，则使用no​​deHook（＃1954）; 否则setAttribute没问题
				return nodeHook && nodeHook.set（elem，value，name）;
			}
		}
	};
}

// IE6 / 7不支持使用get / setAttribute获取/设置某些属性
if（！getSetAttribute）{

	//将此用于IE6 / 7中的任何属性
	//这几乎解决了每个IE6 / 7问题
	nodeHook = jQuery.valHooks.button = {
		get：function（elem，name）{
			var ret = elem.getAttributeNode（name）;
			return ret &&（name ===“id”|| name ===“name”|| name ===“coords”？ret.value！==“”：ret.specified）？
				ret.value：
				不确定的;
		}，
		set：function（elem，value，name）{
			//设置现有属性或创建新属性节点
			var ret = elem.getAttributeNode（name）;
			if（！ret）{
				elem.setAttributeNode（
					（ret = elem.ownerDocument.createAttribute（name））
				）;
			}

			ret.value = value + =“”;

			//通过使用setAttribute（＃9646）打破与克隆元素的关联
			返回名称===“值”|| value === elem.getAttribute（name）？
				价值：
				不确定的;
		}
	};

	//在删除时将contenteditable设置为false（＃10429）
	//设置为空字符串会将错误作为无效值抛出
	jQuery.attrHooks.contenteditable = {
		get：nodeHook.get，
		set：function（elem，value，name）{
			nodeHook.set（elem，value ===“”？false：value，name）;
		}
	};

	//在空字符串上将宽度和高度设置为auto而不是0（Bug＃8150）
	//这是为了删除
	jQuery.each（[“width”，“height”]，function（i，name）{
		jQuery.attrHooks [name] = jQuery.extend（jQuery.attrHooks [name]，{
			set：function（elem，value）{
				if（value ===“”）{
					elem.setAttribute（name，“auto”）;
					回报值;
				}
			}
		}）;
	}）;
}


//某些属性需要在IE上进行特殊调用
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if（！jQuery.support.hrefNormalized）{
	jQuery.each（[“href”，“src”，“width”，“height”]，function（i，name）{
		jQuery.attrHooks [name] = jQuery.extend（jQuery.attrHooks [name]，{
			get：function（elem）{
				var ret = elem.getAttribute（name，2）;
				return ret == null？undefined：ret;
			}
		}）;
	}）;

	// href / src属性应获取完整的规范化URL（＃10299 /＃12915）
	jQuery.each（[“href”，“src”]，function（i，name）{
		jQuery.propHooks [name] = {
			get：function（elem）{
				return elem.getAttribute（name，4）;
			}
		};
	}）;
}

if（！jQuery.support.style）{
	jQuery.attrHooks.style = {
		get：function（elem）{
			//在空字符串的情况下返回undefined
			//注意：IE大写css属性名称，但是如果我们是.toLowerCase（）
			// .cssText，会破坏URL中的大小写敏感度，就像在“背景”中一样
			return elem.style.cssText || 不确定的;
		}，
		set：function（elem，value）{
			return（elem.style.cssText = value +“”）;
		}
	};
}

// Safari错误报告选项的默认选定属性
//访问父级的selectedIndex属性可以修复它
if（！jQuery.support.optSelected）{
	jQuery.propHooks.selected = jQuery.extend（jQuery.propHooks.selected，{
		get：function（elem）{
			var parent = elem.parentNode;

			if（parent）{
				parent.selectedIndex;

				//确保它也适用于optgroups，请参阅＃5701
				if（parent.parentNode）{
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	}）;
}

// IE6 / 7调用enctype编码
if（！jQuery.support.enctype）{
	jQuery.propFix.enctype =“encoding”;
}

//无线电和复选框getter / setter
if（！jQuery.support.checkOn）{
	jQuery.each（[“radio”，“checkbox”]，function（）{
		jQuery.valHooks [this] = {
			get：function（elem）{
				//如果未指定值，则处理返回Webkit“”而不是“on”的情况
				return elem.getAttribute（“value”）=== null？“on”：elem.value;
			}
		};
	}）;
}
jQuery.each（[“radio”，“checkbox”]，function（）{
	jQuery.valHooks [this] = jQuery.extend（jQuery.valHooks [this]，{
		set：function（elem，value）{
			if（jQuery.isArray（value））{
				return（elem.checked = jQuery.inArray（jQuery（elem）.val（），value）> = 0）;
			}
		}
	}）;
}）;
var rformElems = / ^（？：input | select | textarea）$ / i，
	rkeyEvent = / ^ key /，
	rmouseEvent = / ^（？：mouse | contextmenu）| click /，
	rfocusMorph = / ^（？：focusinfocus | focusoutblur）$ /，
	rtypenamespace = /^([^.]*)(?:?.(.+)|)$/;

function returnTrue（）{
	返回true;
}

function returnFalse（）{
	返回虚假;
}

/ *
 * Helper功能用于管理事件 - 不是公共接口的一部分。
 *为Dean Edwards的addEvent库提供了许多想法的道具。
 * /
jQuery.event = {

	全球：{}，

	add：function（elem，types，handler，data，selector）{
		var tmp，events，t，handleObjIn，
			special，eventHandle，handleObj，
			处理程序，类型，命名空间，origType，
			elemData = jQuery._data（elem）;

		//不要将事件附加到noData或text / comment节点（但允许普通对象）
		if（！elemData）{
			返回;
		}

		//调用者可以传入自定义数据的对象来代替处理程序
		if（handler.handler）{
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		//确保处理程序具有唯一ID，以后用于查找/删除它
		if（！handler.guid）{
			handler.guid = jQuery.guid ++;
		}

		//初始化元素的事件结构和主处理程序，如果这是第一个
		if（！（events = elemData.events））{
			events = elemData.events = {};
		}
		if（！（eventHandle = elemData.handle））{
			eventHandle = elemData.handle = function（e）{
				//丢弃jQuery.event.trigger（）和的第二个事件
				//在页面卸载后调用事件时
				return typeof jQuery！== core_strundefined &&（！e || jQuery.event.triggered！== e.type）？
					jQuery.event.dispatch.apply（eventHandle.elem，arguments）：
					不确定的;
			};
			//添加elem作为句柄fn的属性，以防止IE非本机事件的内存泄漏
			eventHandle.elem = elem;
		}

		//处理由空格分隔的多个事件
		// jQuery（...）。bind（“mouseover mouseout”，fn）;
		types =（types ||“”）。match（core_rnotwhite）|| [ “”];
		t = types.length;
		while（t--）{
			tmp = rtypenamespace.exec（types [t]）|| [];
			type = origType = tmp [1];
			namespaces =（tmp [2] ||“”）。split（“。”）。sort（）;

			//如果事件更改其类型，请使用特殊事件处理程序来更改类型
			special = jQuery.event.special [type] || {};

			//如果定义了选择器，则确定特殊事件api类型，否则给定类型
			type =（selector？special.delegateType：special.bindType）|| 类型;

			//根据新重置类型更新特殊
			special = jQuery.event.special [type] || {};

			// handleObj被传递给所有事件处理程序
			handleObj = jQuery.extend（{
				类型：类型，
				origType：origType，
				数据：数据，
				handler：handler，
				guid：handler.guid，
				选择器：选择器，
				needsContext：selector && jQuery.expr.match.needsContext.test（selector），
				namespace：namespaces.join（“。”）
			}，handleObjIn）;

			//如果我们是第一个，请启动事件处理程序队列
			if（！（handlers = events [type]））{
				handlers = events [type] = [];
				handlers.delegateCount = 0;

				//如果特殊事件处理程序返回false，则仅使用addEventListener / attachEvent
				if（！special.setup || special.setup.call（elem，data，namespaces，eventHandle）=== false）{
					//将全局事件处理程序绑定到元素
					if（elem.addEventListener）{
						elem.addEventListener（type，eventHandle，false）;

					} else if（elem.attachEvent）{
						elem.attachEvent（“on”+ type，eventHandle）;
					}
				}
			}

			if（special.add）{
				special.add.call（elem，handleObj）;

				if（！handleObj.handler.guid）{
					handleObj.handler.guid = handler.guid;
				}
			}

			//添加到元素的处理程序列表，在前面委托
			if（selector）{
				handlers.splice（handlers.delegateCount ++，0，handleObj）;
			} else {
				handlers.push（handleObj）;
			}

			//跟踪曾经使用过哪些事件，以进行事件优化
			jQuery.event.global [type] = true;
		}

		// Nullify elem以防止IE中的内存泄漏
		elem = null;
	}，

	//从元素中分离事件或事件集
	remove：function（elem，types，handler，selector，mappedTypes）{
		var j，handleObj，tmp，
			origCount，t，事件，
			特殊，处理程序，类型，
			名称空间，origType，
			elemData = jQuery.hasData（elem）&& jQuery._data（elem）;

		if（！elemData ||！（events = elemData.events））{
			返回;
		}

		//对于类型中的每个type.namespace一次; 类型可以省略
		types =（types ||“”）。match（core_rnotwhite）|| [ “”];
		t = types.length;
		while（t--）{
			tmp = rtypenamespace.exec（types [t]）|| [];
			type = origType = tmp [1];
			namespaces =（tmp [2] ||“”）。split（“。”）。sort（）;

			//取消绑定元素的所有事件（在此命名空间上，如果提供）
			if（！type）{
				for（输入事件）{
					jQuery.event.remove（elem，type + types [t]，handler，selector，true）;
				}
				继续;
			}

			special = jQuery.event.special [type] || {};
			type =（selector？special.delegateType：special.bindType）|| 类型;
			处理程序=事件[类型] || [];
			tmp = tmp [2] && new RegExp（“（^ | \\。）”+ namespaces.join（“\\。（？：。* \\。|）”）+“（\\。| $）” ）;

			//删除匹配的事件
			origCount = j = handlers.length;
			while（j--）{
				handleObj = handlers [j];

				if（（mappedTypes || origType === handleObj.origType）&&
					（！handler || handler.guid === handleObj.guid）&&
					（！tmp || tmp.test（handleObj.namespace））&&
					（！selector || selector === handleObj.selector || selector ===“**”&& handleObj.selector））{
					handlers.splice（j，1）;

					if（handleObj.selector）{
						handlers.delegateCount--;
					}
					if（special.remove）{
						special.remove.call（elem，handleObj）;
					}
				}
			}

			//删除通用事件处理程序，如果我们删除了某些内容并且不再存在处理程
			//（避免在删除特殊事件处理程序时无限递归）
			if（origCount &&！handlers.length）{
				if（！special.teardown || special.teardown.call（elem，namespaces，elemData.handle）=== false）{
					jQuery.removeEvent（elem，type，elemData.handle）;
				}

				删除事件[类型];
			}
		}

		//如果不再使用expando，请将其删除
		if（jQuery.isEmptyObject（events））{
			删除elemData.handle;

			// removeData还会检查空白并清除expando（如果为空）
			//所以使用它而不是删除
			jQuery._removeData（elem，“events”）;
		}
	}，

	trigger：function（event，data，elem，onlyHandlers）{
		var handle，ontype，cur，
			bubbleType，special，tmp，i，
			eventPath = [elem || 文件]，
			type = core_hasOwn.call（event，“type”）？event.type：event，
			namespaces = core_hasOwn.call（event，“namespace”）？event.namespace.split（“。”）：[];

		cur = tmp = elem = elem || 文献;

		//不要在文本和注释节点上执行事件
		if（elem.nodeType === 3 || elem.nodeType === 8）{
			返回;
		}

		//聚焦/模糊变形聚焦/聚焦; 确保我们现在不解雇它们
		if（rfocusMorph.test（type + jQuery.event.triggered））{
			返回;
		}

		if（type.indexOf（“。”）> = 0）{
			//命名空间触发器; 创建一个regexp以匹配handle（）中的事件类型
			namespaces = type.split（“。”）;
			type = namespaces.shift（）;
			namespaces.sort（）;
		}
		ontype = type.indexOf（“：”）<0 &&“on”+ type;

		//调用者可以传入jQuery.Event对象，Object或只传递事件类型字符串
		event = event [jQuery.expando]？
			事件：
			new jQuery.Event（type，typeof event ===“object”&& event）;

		event.isTrigger = true;
		event.namespace = namespaces.join（“。”）;
		event.namespace_re = event.namespace？
			new RegExp（“（^ | \\。）”+ namespaces.join（“\\。（？：。* \\。|）”）+“（\\。| $）”）：
			空值;

		//清理事件以防重复使用
		event.result = undefined;
		if（！event.target）{
			event.target = elem;
		}

		//克隆任何传入的数据并在事件前添加，创建处理程序arg列表
		data = data == null？
			[事件]：
			jQuery.makeArray（data，[event]）;

		//允许特殊事件在线外绘制
		special = jQuery.event.special [type] || {};
		if（！onlyHandlers && special.trigger && special.trigger.apply（elem，data）=== false）{
			返回;
		}

		//根据W3C事件规范（＃9951）预先确定事件传播路径
		//冒泡到文档，然后到窗口; 注意全球所有者文档var（＃9724）
		if（！onlyHandlers &&！special.noBubble &&！jQuery.isWindow（elem））{

			bubbleType = special.delegateType || 类型;
			if（！rfocusMorph.test（bubbleType + type））{
				cur = cur.parentNode;
			}
			for（; cur; cur = cur.parentNode）{
				eventPath.push（cur）;
				tmp = cur;
			}

			//如果我们需要文档（例如，不是普通的obj或分离的DOM），只添加窗口
			if（tmp ===（elem.ownerDocument || document））{
				eventPath.push（tmp.defaultView || tmp.parentWindow || window）;
			}
		}

		//事件路径上的消防处理程序
		i = 0;
		while（（cur = eventPath [i ++]）&&！event.isPropagationStopped（））{

			event.type = i> 1？
				bubbleType：
				special.bindType || 类型;

			// jQuery处理程序
			handle =（jQuery._data（cur，“events”）|| {}）[event.type] && jQuery._data（cur，“handle”）;
			if（handle）{
				handle.apply（cur，data）;
			}

			//原生处理程序
			handle = ontype && cur [ontype];
			if（handle && jQuery.acceptData（cur）&& handle.apply && handle.apply（cur，data）=== false）{
				event.preventDefault（）;
			}
		}
		event.type = type;

		//如果没有人阻止默认操作，请立即执行
		if（！onlyHandlers &&！event.isDefaultPrevented（））{

			if（（！special._default || special._default.apply（elem.ownerDocument，data）=== false）&&
				！（type ===“click”&& jQuery.nodeName（elem，“a”））&& jQuery.acceptData（elem））{

				//使用与事件相同的名称在目标上调用本机DOM方法。
				//无法在此处使用.isFunction（）检查，因为IE6 / 7未通过该测试。
				//不要对窗口执行默认操作，这是全局变量的位置（＃6170）
				if（ontype && elem [type] &&！jQuery.isWindow（elem））{

					//当我们调用它的FOO（）方法时，不要重新触发onFOO事件
					tmp = elem [ontype];

					if（tmp）{
						elem [ontype] = null;
					}

					//防止重新触发同一事件，因为我们已经在上面冒了它
					jQuery.event.triggered = type;
					尝试{
						elem [type]（）;
					} catch（e）{
						// IE <9在焦点/模糊时死于隐藏元素（＃1486，＃12518）
						//仅在winXP IE8本机上可重现，而在IE8模式下不是IE9
					}
					jQuery.event.triggered = undefined;

					if（tmp）{
						elem [ontype] = tmp;
					}
				}
			}
		}

		return event.result;
	}，

	dispatch：function（event）{

		//从本机事件对象创建可写的jQuery.Event
		event = jQuery.event.fix（event）;

		var i，ret，handleObj，matched，j，
			handlerQueue = []，
			args = core_slice.call（arguments），
			handlers =（jQuery._data（this，“events”）|| {}）[event.type] || []，
			special = jQuery.event.special [event.type] || {};

		//使用fix-ed jQuery.Event而不是（只读）本机事件
		args [0] =事件;
		event.delegateTarget = this;

		//为映射类型调用preDispatch挂钩，如果需要，让它保释
		if（special.preDispatch && special.preDispatch.call（this，event）=== false）{
			返回;
		}

		//确定处理程序
		handlerQueue = jQuery.event.handlers.call（this，event，handlers）;

		//先运行代理; 他们可能想停止在我们身下传播
		i = 0;
		while（（matched = handlerQueue [i ++]）&&！event.isPropagationStopped（））{
			event.currentTarget = matched.elem;

			j = 0;
			while（（handleObj = matched.handlers [j ++]）&&！event.isImmediatePropagationStopped（））{

				//触发事件必须1）没有命名空间，或者
				// 2）让命名空间成为一个子集或等于绑定事件中的子集（两者都没有命名空间）。
				if（！event.namespace_re || event.namespace_re.test（handleObj.namespace））{

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret =（（jQuery.event.special [handleObj.origType] || {}）。handle || handleObj.handler）
							.apply（matched.elem，args）;

					if（ret！== undefined）{
						if（（event.result = ret）=== false）{
							event.preventDefault（）;
							event.stopPropagation（）;
						}
					}
				}
			}
		}

		//为映射类型调用postDispatch挂钩
		if（special.postDispatch）{
			special.postDispatch.call（this，event）;
		}

		return event.result;
	}，

	处理程序：function（event，handlers）{
		var sel，handleObj，matches，i，
			handlerQueue = []，
			delegateCount = handlers.delegateCount，
			cur = event.target;

		//查找委托处理程序
		//黑洞SVG <use>实例树（＃13180）
		//避免在Firefox中进行非左键单击冒泡（＃3861）
		if（delegateCount && cur.nodeType &&（！event.button || event.type！==“click”））{

			for（; cur！= this; cur = cur.parentNode || this）{

				//不要检查非元素（＃13208）
				//不要处理已禁用元素的点击次数（＃6911，＃8165，＃11382，＃11764）
				if（cur.nodeType === 1 &&（cur.disabled！== true || event.type！==“click”））{
					matches = [];
					for（i = 0; i <delegateCount; i ++）{
						handleObj = handlers [i];

						//不要与Object.prototype属性冲突（＃13203）
						sel = handleObj.selector +“”;

						if（匹配[sel] === undefined）{
							匹配[sel] = handleObj.needsContext？
								jQuery（sel，this）.index（cur）> = 0：
								jQuery.find（sel，this，null，[cur]）。length;
						}
						if（匹配[sel]）{
							matches.push（handleObj）;
						}
					}
					if（matches.length）{
						handlerQueue.push（{elem：cur，handlers：matches}）;
					}
				}
			}
		}

		//添加剩余的（直接绑定的）处理程序
		if（delegateCount <handlers.length）{
			handlerQueue.push（{elem：this，handlers：handlers.slice（delegateCount）}）;
		}

		return handlerQueue;
	}，

	修复：function（event）{
		if（event [jQuery.expando]）{
			回归事件;
		}

		//创建事件对象的可写副本并规范化某些属性
		var i，prop，copy，
			type = event.type，
			originalEvent = event，
			fixHook = this.fixHooks [type];

		if（！fixHook）{
			this.fixHooks [type] = fixHook =
				rmouseEvent.test（类型）？this.mouseHooks：
				rkeyEvent.test（类型）？this.keyHooks：
				{};
		}
		copy = fixHook.props？this.props.concat（fixHook.props）：this.props;

		event = new jQuery.Event（originalEvent）;

		i = copy.length;
		当我 -  ） {
			prop = copy [i];
			event [prop] = originalEvent [prop];
		}

		//支持：IE <9
		//修复目标属性（＃1925）
		if（！event.target）{
			event.target = originalEvent.srcElement || 文献;
		}

		//支持：Chrome 23+，Safari？
		//目标不应该是文本节点（＃504，＃13143）
		if（event.target.nodeType === 3）{
			event.target = event.target.parentNode;
		}

		//支持：IE <9
		//对于鼠标/键事件，metaKey == false，如果它未定义（＃3368，＃11328）
		event.metaKey = !! event.metaKey;

		return fixHook.filter？fixHook.filter（event，originalEvent）：event;
	}，

	//包含KeyEvent和MouseEvent共享的一些事件道具
	道具：“altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view”.split（“”），

	fixHooks：{}，

	keyHooks：{
		道具：“char charCode key keyCode”.split（“”），
		filter：function（event，original）{

			//添加关键事件
			if（event.which == null）{
				event.which = original.charCode！= null？original.charCode：original.keyCode;
			}

			回归事件;
		}
	}，

	mouseHooks：{
		道具：“按钮按钮clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement”.split（“”），
		filter：function（event，original）{
			var body，eventDoc，doc，
				button = original.button，
				fromElement = original.fromElement;

			//如果缺少并且clientX / Y可用，则计算pageX / Y.
			if（event.pageX == null && original.clientX！= null）{
				eventDoc = event.target.ownerDocument || 文献;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +（doc && doc.scrollLeft || body && body.scrollLeft || 0） - （doc && doc.clientLeft || body && body.clientLeft || 0）;
				event.pageY = original.clientY +（doc && doc.scrollTop || body && body.scrollTop || 0） - （doc && doc.clientTop || body && body.clientTop || 0）;
			}

			//如有必要，添加relatedTarget
			if（！event.relatedTarget && fromElement）{
				event.relatedTarget = fromElement === event.target？original.toElement：fromElement;
			}

			//添加点击：1 === left; 2 ===中; 3 ===对
			//注意：按钮未规范化，因此请勿使用它
			if（！event.which && button！== undefined）{
				event.which =（按钮＆1？1 :(按钮＆2？3 :(按钮＆4？2：0）））;
			}

			回归事件;
		}
	}，

	特别：{
		load：{
			//阻止触发的image.load事件从冒泡到window.load
			noBubble：是的
		}，
		点击：{
			//对于复选框，触发本机事件，以便检查状态是正确的
			trigger：function（）{
				if（jQuery.nodeName（this，“input”）&& this.type ===“checkbox”&& this.click）{
					this.click（）;
					返回虚假;
				}
			}
		}，
		焦点：{
			//如果可能，请触发本机事件，以使模糊/焦点序列正确
			trigger：function（）{
				if（this！== document.activeElement && this.focus）{
					尝试{
						this.focus（）;
						返回虚假;
					} catch（e）{
						//支持：IE <9
						//如果我们将焦点错误地隐藏到隐藏元素（＃1486，＃12518），
						//让.trigger（）运行处理程序
					}
				}
			}，
			delegateType：“focusin”
		}，
		模糊：{
			trigger：function（）{
				if（this === document.activeElement && this.blur）{
					this.blur（）;
					返回虚假;
				}
			}，
			delegateType：“focusout”
		}，

		beforeunload：{
			postDispatch：function（event）{

				//即使当returnValue等于未定义时，Firefox仍会显示警告
				if（event.result！== undefined）{
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}，

	模拟：函数（类型，元素，事件，泡沫）{
		//在捐赠者事件上背驮式来模拟不同的事件。
		//假冒原创活动，以避免捐赠者的停止传播，但如果
		//模拟事件防止默认，然后我们在捐赠者上做同样的事情。
		var e = jQuery.extend（
			新的jQuery.Event（），
			事件，
			{type：type，
				isSimulated：是的，
				originalEvent：{}
			}
		）;
		if（bubble）{
			jQuery.event.trigger（e，null，elem）;
		} else {
			jQuery.event.dispatch.call（elem，e）;
		}
		if（e.isDefaultPrevented（））{
			event.preventDefault（）;
		}
	}
};

jQuery.removeEvent = document.removeEventListener？
	function（elem，type，handle）{
		if（elem.removeEventListener）{
			elem.removeEventListener（type，handle，false）;
		}
	}：
	function（elem，type，handle）{
		var name =“on”+ type;

		if（elem.detachEvent）{

			//＃8545，＃7054，防止IE6-8中自定义事件的内存泄漏
			//通过该事件的名称，在元素上detachEvent需要的属性，以正确地将它暴露给GC
			if（typeof elem [name] === core_strundefined）{
				elem [name] = null;
			}

			elem.detachEvent（name，handle）;
		}
	};

jQuery.Event = function（src，props）{
	//允许没有'new'关键字的实例化
	if（！（此实例为jQuery.Event））{
		返回新的jQuery.Event（src，props）;
	}

	//事件对象
	if（src && src.type）{
		this.originalEvent = src;
		this.type = src.type;

		//冒泡文档的事件可能已标记为已阻止
		//由树下面的处理程序组成; 反映正确的价值。
		this.isDefaultPrevented =（src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault（））？returnTrue：returnFalse;

	// 事件类型
	} else {
		this.type = src;
	}

	//将显式提供的属性放在事件对象上
	if（道具）{
		jQuery.extend（this，props）;
	}

	//如果传入的事件没有时间戳，请创建一个时间戳
	this.timeStamp = src && src.timeStamp || jQuery.now（）;

	//将其标记为已修复
	这[jQuery.expando] = true;
};

// jQuery.Event基于ECMAScript语言绑定指定的DOM3事件
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented：returnFalse，
	isPropagationStopped：returnFalse，
	isImmediatePropagationStopped：returnFalse，

	preventDefault：function（）{
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if（！e）{
			返回;
		}

		//如果存在preventDefault，请在原始事件上运行它
		if（e.preventDefault）{
			e.preventDefault（）;

		//支持：IE
		//否则将原始事件的returnValue属性设置为false
		} else {
			e.returnValue = false;
		}
	}，
	stopPropagation：function（）{
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if（！e）{
			返回;
		}
		//如果存在stopPropagation，请在原始事件上运行它
		if（e.stopPropagation）{
			e.stopPropagation（）;
		}

		//支持：IE
		//将原始事件的cancelBubble属性设置为true
		e.cancelBubble = true;
	}，
	stopImmediatePropagation：function（）{
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation（）;
	}
};

//使用鼠标悬停/输出和事件时间检查创建鼠标中心/离开事件
jQuery.each（{
	mouseenter：“mouseover”，
	mouseleave：“mouseout”
}，function（orig，fix）{
	jQuery.event.special [orig] = {
		delegateType：修复，
		bindType：fix，

		handle：function（event）{
			var ret，
				target = this，
				related = event.relatedTarget，
				handleObj = event.handleObj;

			//对于mousenter / leave调用处理程序（如果相关）在目标之外。
			//注意：如果鼠标离开/进入浏览器窗口，则无相关目标
			if（！related ||（related！== target &&！jQuery.contains（target，related）））{
				event.type = handleObj.origType;
				ret = handleObj.handler.apply（this，arguments）;
				event.type = fix;
			}
			返回;
		}
	};
}）;

// IE提交委托
if（！jQuery.support.submitBubbles）{

	jQuery.event.special.submit = {
		setup：function（）{
			//只需要委托表单提交事件
			if（jQuery.nodeName（this，“form”））{
				返回虚假;
			}

			//当可能提交后代表单时，延迟添加提交处理程序
			jQuery.event.add（this，“click._submit keypress._submit”，function（e）{
				//节点名称检查可以避免IE中与VML相关的崩溃（＃9807）
				var elem = e.target，
					form = jQuery.nodeName（elem，“input”）|| jQuery.nodeName（elem，“button”）？elem.form：undefined;
				if（form &&！jQuery._data（form，“submitBubbles”））{
					jQuery.event.add（form，“submit._submit”，function（event）{
						event._submit_bubble = true;
					}）;
					jQuery._data（form，“submitBubbles”，true）;
				}
			}）;
			//返回undefined，因为我们不需要事件监听器
		}，

		postDispatch：function（event）{
			//如果用户提交了表单，请在树中向上冒泡
			if（event._submit_bubble）{
				delete event._submit_bubble;
				if（this.parentNode &&！event.isTrigger）{
					jQuery.event.simulate（“submit”，this.parentNode，event，true）;
				}
			}
		}，

		拆解：function（）{
			//只需要委托表单提交事件
			if（jQuery.nodeName（this，“form”））{
				返回虚假;
			}

			//删除委托处理程序; cleanData最终会收到上面提到的提交处理程序
			jQuery.event.remove（this，“。_ submit”）;
		}
	};
}

// IE更改委派和复选框/无线电修复
if（！jQuery.support.changeBubbles）{

	jQuery.event.special.change = {

		setup：function（）{

			if（rformElems.test（this.nodeName））{
				// IE不会在支票/收音机上发生变化直到模糊; 点击即可触发它
				//在财产变更之后。吃special.change.handle中的模糊变化。
				//这仍然会在模糊后第二次触发检查/收音机。
				if（this.type ===“checkbox”|| this.type ===“radio”）{
					jQuery.event.add（this，“propertychange._change”，function（event）{
						if（event.originalEvent.propertyName ===“checked”）{
							this._just_changed = true;
						}
					}）;
					jQuery.event.add（this，“click._change”，function（event）{
						if（this._just_changed &&！event.isTrigger）{
							this._just_changed = false;
						}
						//允许触发的模拟更改事件（＃11500）
						jQuery.event.simulate（“change”，this，event，true）;
					}）;
				}
				返回虚假;
			}
			//委托活动; 懒惰 - 在后代输入上添加更改处理程序
			jQuery.event.add（this，“beforeactivate._change”，function（e）{
				var elem = e.target;

				if（rformElems.test（elem.nodeName）&&！jQuery._data（elem，“changeBubbles”））{
					jQuery.event.add（elem，“change._change”，function（event）{
						if（this.parentNode &&！event.isSimulated &&！event.isTrigger）{
							jQuery.event.simulate（“change”，this.parentNode，event，true）;
						}
					}）;
					jQuery._data（elem，“changeBubbles”，true）;
				}
			}）;
		}，

		handle：function（event）{
			var elem = event.target;

			//从复选框/广播中吞下原生更改事件，我们已经在上面触发了它们
			if（this！== elem || event.isSimulated || event.isTrigger ||（elem.type！==“radio”&& elem.type！==“checkbox”））{
				return event.handleObj.handler.apply（this，arguments）;
			}
		}，

		拆解：function（）{
			jQuery.event.remove（this，“._ change”）;

			return！rformElems.test（this.nodeName）;
		}
	};
}

//创建“冒泡”焦点并模糊事件
if（！jQuery.support.focusinBubbles）{
	jQuery.each（{focus：“focusin”，blur：“focusout”}，function（orig，fix）{

		//当有人想要焦点/焦点时，附加一个捕获处理程序
		var attaches = 0，
			handler = function（event）{
				jQuery.event.simulate（fix，event.target，jQuery.event.fix（event），true）;
			};

		jQuery.event.special [fix] = {
			setup：function（）{
				if（attaches ++ === 0）{
					document.addEventListener（orig，handler，true）;
				}
			}，
			拆解：function（）{
				if（--attaches === 0）{
					document.removeEventListener（orig，handler，true）;
				}
			}
		};
	}）;
}

1.3中（{

	on：function（types，selector，data，fn，/ * INTERNAL * / one）{
		var type，origFn;

		//类型可以是类型/处理程序的映射
		if（typeof types ===“object”）{
			//（类型 - 对象，选择器，数据）
			if（typeof selector！==“string”）{
				//（类型 - 对象，数据）
				data = data || 选择;
				selector = undefined;
			}
			for（type in types）{
				this.on（类型，选择器，数据，类型[类型]，一个）;
			}
			归还这个;
		}

		if（data == null && fn == null）{
			//（类型，fn）
			fn =选择器;
			data = selector = undefined;
		} else if（fn == null）{
			if（typeof selector ===“string”）{
				//（类型，选择器，fn）
				fn =数据;
				data = undefined;
			} else {
				//（类型，数据，fn）
				fn =数据;
				data = selector;
				selector = undefined;
			}
		}
		if（fn === false）{
			fn = returnFalse;
		} else if（！fn）{
			归还这个;
		}

		if（one === 1）{
			origFn = fn;
			fn = function（event）{
				//可以使用空集，因为事件包含信息
				jQuery（）。off（event）;
				return origFn.apply（this，arguments）;
			};
			//使用相同的guid，以便调用者可以使用origFn删除
			fn.guid = origFn.guid || （origFn.guid = jQuery.guid ++）;
		}
		return this.each（function（）{
			jQuery.event.add（this，types，fn，data，selector）;
		}）;
	}，
	一：函数（类型，选择器，数据，fn）{
		return this.on（types，selector，data，fn，1）;
	}，
	off：function（types，selector，fn）{
		var handleObj，type;
		if（types && types.preventDefault && types.handleObj）{
			//（event）调度jQuery.Event
			handleObj = types.handleObj;
			jQuery（types.delegateTarget）.off（
				handleObj.namespace？handleObj.origType +“。” + handleObj.namespace：handleObj.origType，
				handleObj.selector，
				handleObj.handler
			）;
			归还这个;
		}
		if（typeof types ===“object”）{
			//（types-object [，selector]）
			for（type in types）{
				this.off（type，selector，types [type]）;
			}
			归还这个;
		}
		if（selector === false || typeof selector ===“function”）{
			//（类型[，fn]）
			fn =选择器;
			selector = undefined;
		}
		if（fn === false）{
			fn = returnFalse;
		}
		return this.each（function（）{
			jQuery.event.remove（this，types，fn，selector）;
		}）;
	}，

	bind：function（types，data，fn）{
		return this.on（types，null，data，fn）;
	}，
	unbind：function（types，fn）{
		return this.off（types，null，fn）;
	}，

	delegate：function（selector，types，data，fn）{
		return this.on（types，selector，data，fn）;
	}，
	undelegate：function（selector，types，fn）{
		//（名称空间）或（selector，types [，fn]）
		return arguments.length === 1？this.off（selector，“**”）：this.off（types，selector ||“**”，fn）;
	}，

	trigger：function（type，data）{
		return this.each（function（）{
			jQuery.event.trigger（type，data，this）;
		}）;
	}，
	triggerHandler：function（type，data）{
		var elem = this [0];
		if（elem）{
			return jQuery.event.trigger（type，data，elem，true）;
		}
	}
}）;
/ *！
 * Sizzle CSS Selector Engine
 *版权所有2012 jQuery Foundation和其他贡献者
 *根据MIT许可证发布
 * http://sizzlejs.com/
 * /
（function（window，undefined）{

var i，
	cachedruns，
	EXPR，
	gettext的，
	isXML，
	编译，
	hasDuplicate，
	outermostContext，

	//本地文档变量
	setDocument，
	文献，
	docElem，
	documentIsXML，
	rbuggyQSA，
	rbuggyMatches，
	火柴，
	包含，
	排序，

	//特定于实例的数据
	expando =“sizzle”+  - （new Date（）），
	preferredDoc = window.document，
	support = {}，
	dirruns = 0，
	完成= 0，
	classCache = createCache（），
	tokenCache = createCache（），
	compilerCache = createCache（），

	//通用常量
	strundefined = typeof undefined，
	MAX_NEGATIVE = 1 << 31，

	//数组方法
	arr = []，
	pop = arr.pop，
	push = arr.push，
	slice = arr.slice，
	//如果我们不能使用原生的indexOf，请使用精简的indexOf
	indexOf = arr.indexOf || function（elem）{
		var i = 0，
			len = this.length;
		for（; i <len; i ++）{
			if（this [i] === elem）{
				回归我;
			}
		}
		返回-1;
	}，


	// 常用表达

	//空白字符http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace =“[\\ x20 \\ t \\ r \\ n \\ f]”，
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding =“（？：\\\\。| [\\ w-] | [^ \\ x00  -  \\ xa0]）+”，

	//在CSS标识符字符上松散建模
	//不带引号的值应该是CSS标识符http://www.w3.org/TR/css3-selectors/#attribute-selectors
	//正确的语法：http：//www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace（“w”，“w＃”），

	//可接受的运营商http://www.w3.org/TR/selectors/#attribute-selectors
	operators =“（[* ^ $ |！〜]？=）”，
	attributes =“\\ [”+ whitespace +“*（”+ characterEncoding +“）”+ whitespace +
		“*（？：”+ operator + whitespace +“*（？:( ['\”]）（（？：\\\\。| [^ \\\\]）*？）\\ 3 |（“ + identifier +“）|）|）”+ whitespace +“* \\]”，

	//更喜欢引用的参数，
	//然后不包含pseudos / bracket，
	//然后是属性选择器/非括号表达式，
	//然后别的什么
	//这些首选项用于减少选择器的数量
	//需要在PSEUDO preFilter中进行标记化
	pseudos =“:(”+ characterEncoding +“）（？：\\（（（['\”]）（（？：\\\\。| [^ \\\\]）*？）\\ 3 | （（？：\\\\。| [^ \\\\（）[\\]] |“+ attributes.replace（3,8）+”）*）|。*）\\）|）“，

	//前导和非转义尾随空格，捕获后者之前的一些非空格字符
	rtrim = new RegExp（“^”+ whitespace +“+ |（（？：^ | [^ \\\\]）（？：\\\\。）*）”+ whitespace +“+ $”，“g “），

	rcomma = new RegExp（“^”+ whitespace +“*，”+ whitespace +“*”），
	rcombinators = new RegExp（“^”+空格+“*（[\\ x20 \\ t \\ r \\ n \\ f> +〜]）”+空白+“*”），
	rpseudo =新的RegExp（伪），
	ridentifier = new RegExp（“^”+ identifier +“$”），

	matchExpr = {
		“ID”：新的RegExp（“^＃（”+ characterEncoding +“）”），
		“CLASS”：新的RegExp（“^ \\。（”+ characterEncoding +“）”），
		“NAME”：新的RegExp（“^ \\ [name = ['\ _]]？（”+ characterEncoding +“）['\”]？\\]“），
		“TAG”：新的RegExp（“^（”+ characterEncoding.replace（“w”，“w *”）+“）”），
		“ATTR”：新的RegExp（“^”+属性），
		“PSEUDO”：新的RegExp（“^”+ pseudos），
		“CHILD”：新的RegExp（“^ :(只有|第一个|最后一个|第n个|第n个 - 最后一个） - （孩子的类型）（？：\\（”+ + whitespace +
			“*（偶数|奇数|（（[+  - ] |）（\\ d *）n |）”+空格+“*（？:( [+  - ] |）”+空白+
			“*（\\ d +）|））”+ whitespace +“* \\）|）”，“i”），
		//用于实现.is（）的库
		//我们在`select`中将它用于POS匹配
		“needsContext”：新的RegExp（“^”+空格+“* [> +〜] | :(偶数|奇数| eq | gt | lt | nth | first | last）（？：\\（”+
			空格+“*（（？： -  \\ d）？\\ d *）”+空格+“* \\）|）（？= [^  - ] | $）”，“i”）
	}，

	rsibling = / [\ x20 \ t \ r \ n \ f] * [+〜] /，

	rnative = / ^ [^ {] + \ {\ s * \ [native code /，

	//易于解析/可检索的ID或TAG或CLASS选择器
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\ .( [.w-]+))$/,

	rinputs = / ^（？：input | select | textarea | button）$ / i，
	rheader = / ^ h \ d $ / i，

	rescape = /'| \\ / g，
	rattributeQuotes = / \ = [\ x20 \ t \ r \ n \ f] *（[^'“\]] *）[\ x20 \ t \ r \ n \ f] * \] / g，

	// CSS逃脱http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = /\\（[dd -fA-F] {1,6} [\ x20 \ t \ r \ n \\ n] ||。）/ g，
	funescape = function（_，escaped）{
		var high =“0x”+转义 -  0x10000;
		// NaN表示非代码点
		回报高！==高？
			逃脱：
			// BMP代码点
			高<0？
				String.fromCharCode（high + 0x10000）：
				//补充平面代码点（代理对）
				String.fromCharCode（high >> 10 | 0xD800，high＆0x3FF | 0xDC00）;
	};

//如果我们不能使用原生切片，请使用精简切片
尝试{
	slice.call（preferredDoc.documentElement.childNodes，0）[0] .nodeType;
} catch（e）{
	slice = function（i）{
		var elem，
			results = [];
		while（（elem = this [i ++]））{
			results.push（elem）;
		}
		返回结果;
	};
}

/ **
 *用于特征检测
 * @param {Function} fn测试本机支持的函数
 * /
function isNative（fn）{
	return rnative.test（fn +“”）;
}

/ **
 *创建有限大小的键值缓存
 * @returns {Function（string，Object）}将对象数据存储在自身后，返回对象数据
 *属性名称（带空格的）字符串和（如果缓存大于Expr.cacheLength）
 *删除最旧的条目
 * /
function createCache（）{
	var cache，
		keys = [];

	return（cache = function（key，value）{
		//使用（键+“”）避免与本机原型属性冲突（请参阅问题＃157）
		if（keys.push（key + =“”）> Expr.cacheLength）{
			//仅保留最新的条目
			delete cache [keys.shift（）];
		}
		return（cache [key] = value）;
	}）;
}

/ **
 *标记Sizzle特殊用途的功能
 * @param {Function} fn标记的功能
 * /
function markFunction（fn）{
	fn [expando] = true;
	返回fn;
}

/ **
 *支持使用元素进行测试
 * @param {Function} fn传递创建的div并期望一个布尔结果
 * /
function assert（fn）{
	var div = document.createElement（“div”）;

	尝试{
		return fn（div）;
	} catch（e）{
		返回虚假;
	} finally {
		//在IE中释放内存
		div = null;
	}
}

function Sizzle（选择器，上下文，结果，种子）{
	var match，elem，m，nodeType，
		// QSA变种
		i，groups，old，nid，newContext，newSelector;

	if（（context？context.ownerDocument || context：preferredDoc）！== document）{
		setDocument（context）;
	}

	context = context || 文献;
	结果=结果|| [];

	if（！selector || typeof selector！==“string”）{
		返回结果;
	}

	if（（nodeType = context.nodeType）！== 1 && nodeType！== 9）{
		return [];
	}

	if（！documentIsXML &&！seed）{

		//快捷方式
		if（（match = rquickExpr.exec（selector）））{
			//加速：嘶嘶声（“＃ID”）
			if（（m = match [1]））{
				if（nodeType === 9）{
					elem = context.getElementById（m）;
					//检查parentNode以便在Blackberry 4.6返回时捕获
					//不再在文档＃6963中的节点
					if（elem && elem.parentNode）{
						//处理IE，Opera和Webkit返回项目的情况
						//按名称而不是ID
						if（elem.id === m）{
							results.push（elem）;
							返回结果;
						}
					} else {
						返回结果;
					}
				} else {
					//上下文不是文档
					if（context.ownerDocument &&（elem = context.ownerDocument.getElementById（m））&&
						contains（context，elem）&& elem.id === m）{
						results.push（elem）;
						返回结果;
					}
				}

			//加速：嘶嘶声（“TAG”）
			} else if（match [2]）{
				push.apply（results，slice.call（context.getElementsByTagName（selector），0））;
				返回结果;

			//加速：嘶嘶声（“。CLASS”）
			} else if（（m = match [3]）&& support.getByClassName && context.getElementsByClassName）{
				push.apply（results，slice.call（context.getElementsByClassName（m），0））;
				返回结果;
			}
		}

		// QSA路径
		if（support.qsa &&！rbuggyQSA.test（selector））{
			old = true;
			nid = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA在基于元素的查询上奇怪地工作
			//我们可以通过在根目录上指定一个额外的ID来解决这个问题
			//并从那里开始工作（感谢Andrew Dupont的技术）
			// IE 8不适用于对象元素
			if（nodeType === 1 && context.nodeName.toLowerCase（）！==“object”）{
				groups = tokenize（selector）;

				if（（old = context.getAttribute（“id”）））{
					nid = old.replace（rescape，“\\ $＆”）;
				} else {
					context.setAttribute（“id”，nid）;
				}
				nid =“[id ='”+ nid +“']”;

				i = groups.length;
				当我 -  ） {
					groups [i] = nid + toSelector（groups [i]）;
				}
				newContext = rsibling.test（selector）&& context.parentNode || 上下文;
				newSelector = groups.join（“，”）;
			}

			if（newSelector）{
				尝试{
					push.apply（results，slice.call（newContext.querySelectorAll（
						newSelector
					），0））;
					返回结果;
				} catch（qsaError）{
				} finally {
					if（！old）{
						context.removeAttribute（ “ID”）;
					}
				}
			}
		}
	}

	// 所有其他人
	return select（selector.replace（rtrim，“$ 1”），context，results，seed）;
}

/ **
 *检测xml
 * @param {Element | Object} elem元素或文档
 * /
isXML = Sizzle.isXML = function（elem）{
	//对于尚未存在的情况，会验证documentElement
	//（例如在IE中加载iframe  - ＃4833）
	var documentElement = elem &&（elem.ownerDocument || elem）.documentElement;
	return documentElement？documentElement.nodeName！==“HTML”：false;
};

/ **
 *根据当前文档设置一次与文档相关的变量
 * @param {Element | Object} [doc]用于设置文档的元素或文档对象
 * @returns {Object}返回当前文档
 * /
setDocument = Sizzle.setDocument = function（node）{
	var doc = node？node.ownerDocument || node：preferredDoc;

	//如果没有文档和documentElement可用，请返回
	if（doc === document || doc.nodeType！== 9 ||！doc.documentElement）{
		退货文件;
	}

	//设置我们的文件
	document = doc;
	docElem = doc.documentElement;

	//支持测试
	documentIsXML = isXML（doc）;

	//检查getElementsByTagName（“*”）是否仅返回元素
	support.tagNameNoComments = assert（function（div）{
		div.appendChild（doc.createComment（“”））;
		return！div.getElementsByTagName（“*”）。length;
	}）;

	//检查属性节点是否应检索属性
	support.attributes = assert（function（div）{
		div.innerHTML =“<select> </ select>”;
		var type = typeof div.lastChild.getAttribute（“multiple”）;
		//即使不存在，IE8也会返回某些属性的字符串
		return type！==“boolean”&& type！==“string”;
	}）;

	//检查getElementsByClassName是否可以信任
	support.getByClassName = assert（function（div）{
		// Opera无法找到第二个类名（在9.6中）
		div.innerHTML =“<div class ='hidden e'> </ div> <div class ='hidden'> </ div>”;
		if（！div.getElementsByClassName ||！div.getElementsByClassName（“e”）。length）{
			返回虚假;
		}

		// Safari 3.2缓存类属性，但不捕获更改
		div.lastChild.className =“e”;
		return div.getElementsByClassName（“e”）。length === 2;
	}）;

	//检查getElementById是否按名称返回元素
	//检查getElementsByName权限是否构成控件或按ID返回元素
	support.getByName = assert（function（div）{
		//注入内容
		div.id = expando + 0;
		div.innerHTML =“<a name='" + expando +”'> </a> <div name ='“+ expando +”'> </ div>“;
		docElem.insertBefore（div，docElem.firstChild）;

		//测试
		var pass = doc.getElementsByName &&
			//错误的浏览器将返回少于正确的2
			doc.getElementsByName（expando）。length === 2 +
			//错误的浏览器将返回超过正确的0
			doc.getElementsByName（expando + 0）.length;
		support.getIdNotName =！doc.getElementById（expando）;

		// 清理
		docElem.removeChild（div）;

		回传;
	}）;

	// IE6 / 7返回修改后的属性
	Expr.attrHandle = assert（function（div）{
		div.innerHTML =“<a href='#'> </a>”;
		return div.firstChild && typeof div.firstChild.getAttribute！== strundefined &&
			div.firstChild.getAttribute（“href”）===“＃”;
	}）？
		{}：
		{
			“href”：function（elem）{
				return elem.getAttribute（“href”，2）;
			}，
			“type”：function（elem）{
				return elem.getAttribute（“type”）;
			}
		};

	// ID查找和过滤
	if（support.getIdNotName）{
		Expr.find [“ID”] = function（id，context）{
			if（typeof context.getElementById！== strundefined &&！documentIsXML）{
				var m = context.getElementById（id）;
				//检查parentNode以便在Blackberry 4.6返回时捕获
				//不再在文档＃6963中的节点
				返回m && m.parentNode？[m]：[];
			}
		};
		Expr.filter [“ID”] =函数（id）{
			var attrId = id.replace（runescape，funescape）;
			return函数（elem）{
				return elem.getAttribute（“id”）=== attrId;
			};
		};
	} else {
		Expr.find [“ID”] = function（id，context）{
			if（typeof context.getElementById！== strundefined &&！documentIsXML）{
				var m = context.getElementById（id）;

				回来？
					m.id === id || typeof m.getAttributeNode！== strundefined && m.getAttributeNode（“id”）。value === id？
						[m]：
						undefined：
					[];
			}
		};
		Expr.filter [“ID”] =函数（id）{
			var attrId = id.replace（runescape，funescape）;
			return函数（elem）{
				var node = typeof elem.getAttributeNode！== strundefined && elem.getAttributeNode（“id”）;
				return node && node.value === attrId;
			};
		};
	}

	// 标签
	Expr.find [“TAG”] = support.tagNameNoComments？
		function（tag，context）{
			if（typeof context.getElementsByTagName！== strundefined）{
				return context.getElementsByTagName（tag）;
			}
		}：
		function（tag，context）{
			var elem，
				tmp = []，
				i = 0，
				results = context.getElementsByTagName（tag）;

			//过滤掉可能的评论
			if（tag ===“*”）{
				while（（elem = results [i ++]））{
					if（elem.nodeType === 1）{
						tmp.push（elem）;
					}
				}

				返回tmp;
			}
			返回结果;
		};

	// 名称
	Expr.find [“NAME”] = support.getByName && function（tag，context）{
		if（typeof context.getElementsByName！== strundefined）{
			return context.getElementsByName（name）;
		}
	};

	//类
	Expr.find [“CLASS”] = support.getByClassName && function（className，context）{
		if（typeof context.getElementsByClassName！== strundefined &&！documentIsXML）{
			return context.getElementsByClassName（className）;
		}
	};

	// QSA和matchesSelector支持

	// matchesSelector（：active）在为true时报告为false（IE9 / Opera 11.5）
	rbuggyMatches = [];

	// qSa（：focus）在为true时报告为false（Chrome 21），
	//无需添加到buggyMatches，因为匹配检查buggyQSA
	//支持测试需要太多代码（包括文档就绪）
	rbuggyQSA = [“：focus”];

	if（（support.qsa = isNative（doc.querySelectorAll）））{
		//构建QSA正则表达式
		//来自Diego Perini的正则表达式策略
		断言（function（div）{
			// Select有意设置为空字符串
			//这是为了测试IE的处理不明确
			//设置布尔内容属性，
			//因为它的存在应该足够了
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML =“<select> <option selected =''> </ option> </ select>”;

			// IE8  - 未正确处理某些布尔属性
			if（！div.querySelectorAll（“[selected]”）。length）{
				rbuggyQSA.push（“\\ [”+ whitespace +“*（？：checked | disabled | ismap | multiple | readonly | selected | value）”）;
			}

			// Webkit / Opera  - ：checked应返回选定的选项元素
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8在这里抛出错误，不会看到以后的测试
			if（！div.querySelectorAll（“：checked”）。length）{
				rbuggyQSA.push（ “：检查”）;
			}
		}）;

		断言（function（div）{

			// Opera 10-12 / IE8  -  ^ = $ = * =和空值
			//不应该选择任何东西
			div.innerHTML =“<input type ='hidden'i =''/>”;
			if（div.querySelectorAll（“[i ^ ='']”）。length）{
				rbuggyQSA.push（“[* ^ $] =”+ whitespace +“*（？：\”\“|''）”）;
			}

			// FF 3.5  - ：启用/：禁用和隐藏元素（隐藏元素仍然启用）
			// IE8在这里抛出错误，不会看到以后的测试
			if（！div.querySelectorAll（“：enabled”）。length）{
				rbuggyQSA.push（“：enabled”，“：disabled”）;
			}

			// Opera 10-11不会抛出逗号后的无效伪
			div.querySelectorAll（ “* ,: X”）;
			rbuggyQSA.push（ “*：”）;
		}）;
	}

	if（（support.matchesSelector = isNative（（matches = docElem.matchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.webkitMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector））））{

		断言（function（div）{
			//检查是否可以执行matchesSelector
			//在断开连接的节点上（IE 9）
			support.disconnectedMatch = matches.call（div，“div”）;

			//这应该会失败并出现异常
			// Gecko没有错误，而是返回false
			matches.call（div，“[s！='']：x”）;
			rbuggyMatches.push（“！=”，pseudos）;
		}）;
	}

	rbuggyQSA = new RegExp（rbuggyQSA.join（“|”））;
	rbuggyMatches = new RegExp（rbuggyMatches.join（“|”））;

	//元素包含另一个
	//有目的地没有实现包容性后代
	//如同，元素不包含自身
	contains = isNative（docElem.contains）|| docElem.compareDocumentPosition？
		function（a，b）{
			var adown = a.nodeType === 9？a.documentElement：a，
				bup = b && b.parentNode;
			返回=== bup || !!（bup && bup.nodeType === 1 &&（
				adown.contains？
					adown.contains（bup）：
					a.compareDocumentPosition && a.compareDocumentPosition（bup）＆16
			））;
		}：
		function（a，b）{
			if（b）{
				while（（b = b.parentNode））{
					if（b === a）{
						返回true;
					}
				}
			}
			返回虚假;
		};

	//文档订单排序
	sortOrder = docElem.compareDocumentPosition？
	function（a，b）{
		var比较;

		if（a === b）{
			hasDuplicate = true;
			返回0;
		}

		if（（compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition（b）））{
			if（比较＆1 || a.parentNode && a.parentNode.nodeType === 11）{
				if（a === doc || contains（preferredDoc，a））{
					返回-1;
				}
				if（b === doc || contains（preferredDoc，b））{
					返回1;
				}
				返回0;
			}
			返回比较＆4？-1：1;
		}

		返回a.compareDocumentPosition？-1：1;
	}：
	function（a，b）{
		var cur，
			i = 0，
			aup = a.parentNode，
			bup = b.parentNode，
			ap = [a]，
			bp = [b];

		//如果节点相同，则提前退出
		if（a === b）{
			hasDuplicate = true;
			返回0;

		//无父节点是文档或断开连接
		} else if（！aup ||！bup）{
			返回一个=== doc？-1：
				b === doc？1：
				哎？-1：
				bup？1：
				0;

		//如果节点是兄弟节点，我们可以快速检查
		} else if（aup === bup）{
			return siblingCheck（a，b）;
		}

		//否则我们需要他们的祖先的完整列表进行比较
		cur = a;
		while（（cur = cur.parentNode））{
			ap.unshift（cur）;
		}
		cur = b;
		while（（cur = cur.parentNode））{
			bp.unshift（cur）;
		}

		//走下树寻找差异
		while（ap [i] === bp [i]）{
			我++;
		}

		回来我？
			//做兄弟检查节点是否有共同的祖先
			siblingCheck（ap [i]，bp [i]）：

			//否则我们文档中的节点首先排序
			ap [i] === preferredDoc？-1：
			bp [i] === preferredDoc？1：
			0;
	};

	//如果排序没有，总是假设存在重复项
	//将它们传递给我们的比较功能（如在Google Chrome中）。
	hasDuplicate = false;
	[0,0] .sort（sortOrder）;
	support.detectDuplicates = hasDuplicate;

	退货文件;
};

Sizzle.matches = function（expr，elements）{
	return Sizzle（expr，null，null，elements）;
};

Sizzle.matchesSelector = function（elem，expr）{
	//如果需要，设置文档变量
	if（（elem.ownerDocument || elem）！== document）{
		setDocument（elem）;
	}

	//确保引用属性选择器
	expr = expr.replace（rattributeQuotes，“='$ 1']”）;

	// rbuggyQSA始终包含：focus，因此不需要存在检查
	if（support.matchesSelector &&！documentIsXML &&（！rbuggyMatches ||！rbuggyMatches.test（expr））&&！rbuggyQSA.test（expr））{
		尝试{
			var ret = matches.call（elem，expr）;

			// IE 9的matchesSelector在断开连接的节点上返回false
			if（ret || support.disconnectedMatch ||
					//同样，断开连接的节点也被称为文档
					// IE 9中的片段
					elem.document && elem.document.nodeType！== 11）{
				返回;
			}
		} catch（e）{}
	}

	return Sizzle（expr，document，null，[elem]）。length> 0;
};

Sizzle.contains = function（context，elem）{
	//如果需要，设置文档变量
	if（（context.ownerDocument || context）！== document）{
		setDocument（context）;
	}
	return contains（context，elem）;
};

Sizzle.attr = function（elem，name）{
	var val;

	//如果需要，设置文档变量
	if（（elem.ownerDocument || elem）！== document）{
		setDocument（elem）;
	}

	if（！documentIsXML）{
		name = name.toLowerCase（）;
	}
	if（（val = Expr.attrHandle [name]））{
		返回val（elem）;
	}
	if（documentIsXML || support.attributes）{
		return elem.getAttribute（name）;
	}
	return（（val = elem.getAttributeNode（name））|| elem.getAttribute（name））&& elem [name] === true？
		名称 ：
		val && val.specified？val.value：null;
};

Sizzle.error = function（msg）{
	抛出新错误（“语法错误，无法识别的表达式：”+ msg）;
};

//文档排序和删除重复项
Sizzle.uniqueSort = function（results）{
	var elem，
		duplicates = []，
		i = 1，
		j = 0;

	//除非我们*知道*我们可以检测到重复项，否则请假设它们存在
	hasDuplicate =！support.detectDuplicates;
	results.sort（sortOrder）;

	if（hasDuplicate）{
		for（;（elem = results [i]）; i ++）{
			if（elem === results [i  -  1]）{
				j = duplicates.push（i）;
			}
		}
		while（j--）{
			results.splice（duplicates [j]，1）;
		}
	}

	返回结果;
};

function siblingCheck（a，b）{
	var cur = b && a，
		diff = cur &&（~b.sourceIndex || MAX_NEGATIVE） - （~a.sourceIndex || MAX_NEGATIVE）;

	//如果两个节点都可用，请使用IE sourceIndex
	if（diff）{
		返回差异;
	}

	//检查b是否跟随a
	if（cur）{
		while（（cur = cur.nextSibling））{
			if（cur === b）{
				返回-1;
			}
		}
	}

	回来了？1：-1;
}

//返回在伪输入中用于输入类型的函数
function createInputPseudo（type）{
	return函数（elem）{
		var name = elem.nodeName.toLowerCase（）;
		返回名称===“输入”&& elem.type === type;
	};
}

//返回一个在伪的按钮中使用的函数
function createButtonPseudo（type）{
	return函数（elem）{
		var name = elem.nodeName.toLowerCase（）;
		return（name ===“input”|| name ===“button”）&& elem.type === type;
	};
}

//返回一个在pseudos中用于定位的函数
function createPositionalPseudo（fn）{
	return markFunction（function（argument）{
		argument = + argument;
		return markFunction（function（seed，matches）{
			var j，
				matchIndexes = fn（[]，seed.length，argument），
				i = matchIndexes.length;

			//匹配在指定索引处找到的元素
			当我 -  ） {
				if（seed [（j = matchIndexes [i]）]）{
					seed [j] =！（匹配[j] = seed [j]）;
				}
			}
		}）;
	}）;
}

/ **
 *实用程序函数，用于检索DOM节点数组的文本值
 * @param {Array | Element} elem
 * /
getText = Sizzle.getText = function（elem）{
	var节点，
		ret =“”，
		i = 0，
		nodeType = elem.nodeType;

	if（！nodeType）{
		//如果没有nodeType，那么这应该是一个数组
		for（;（node = elem [i]）; i ++）{
			//不要遍历评论节点
			ret + = getText（node）;
		}
	} else if（nodeType === 1 || nodeType === 9 || nodeType === 11）{
		//对元素使用textContent
		//删除了innerText用法，以保证新行的一致性（参见＃11153）
		if（typeof elem.textContent ===“string”）{
			return elem.textContent;
		} else {
			//穿越它的孩子
			for（elem = elem.firstChild; elem; elem = elem.nextSibling）{
				ret + = getText（elem）;
			}
		}
	} else if（nodeType === 3 || nodeType === 4）{
		return elem.nodeValue;
	}
	//不包括注释或处理指令节点

	返回;
};

Expr = Sizzle.selectors = {

	//可以调整由用户调整
	cacheLength：50，

	createPseudo：markFunction，

	匹配：matchExpr，

	找： {}，

	亲戚：{
		“>”：{dir：“parentNode”，first：true}，
		“”：{dir：“parentNode”}，
		“+”：{dir：“previousSibling”，first：true}，
		“〜”：{dir：“previousSibling”}
	}，

	preFilter：{
		“ATTR”：function（match）{
			match [1] = match [1] .replace（runescape，funescape）;

			//移动给定值以匹配[3]是引用还是不引用
			match [3] =（match [4] || match [5] ||“”）.replace（runescape，funescape）;

			if（match [2] ===“〜=”）{
				match [3] =“”+ match [3] +“”;
			}

			return match.slice（0,4）;
		}，

		“CHILD”：function（match）{
			/ *匹配来自matchExpr [“CHILD”]
				1种类型（仅| nth | ...）
				2什么（孩子的类型）
				3个参数（偶数|奇数| \ d * | \ d * n（[+  - ] \ d +）？| ...）
				xn + y参数的4 xn分量（[+  - ]？\ d * n |）
				xn-component的5个符号
				6 x xn-component
				y分量的7个符号
				y元素8 y
			* /
			match [1] = match [1] .toLowerCase（）;

			if（match [1] .slice（0,3）===“nth”）{
				// nth- *需要参数
				if（！match [3]）{
					Sizzle.error（匹配[0]）;
				}

				// Expr.filter.CHILD的数字x和y参数
				//记住false / true分别为0/1
				match [4] = +（match [4]？match [5] +（match [6] || 1）：2 *（match [3] ===“even”|| match [3] ===“奇怪的“））;
				match [5] = +（（match [7] + match [8]）|| match [3] ===“odd”）;

			//其他类型禁止参数
			} else if（match [3]）{
				Sizzle.error（匹配[0]）;
			}

			回归比赛;
		}，

		“PSEUDO”：function（match）{
			var过剩，
				unquoted =！match [5] && match [2];

			if（matchExpr [“CHILD”]。test（match [0]））{
				return null;
			}

			//按原样接受引用的参数
			if（match [4]）{
				match [2] = match [4];

			//从不带引号的参数中删除多余的字符
			} else if（unquoted && rpseudo.test（unquoted）&&
				//从tokenize中获取多余（递归）
				（excess = tokenize（unquoted，true））&&
				//前进到下一个右括号
				（excess = unquoted.indexOf（“）”，unquoted.length  -  excess） -  unquoted.length））{

				//多余是负指数
				match [0] = match [0] .slice（0，excess）;
				match [2] = unquoted.slice（0，excess）;
			}

			//仅返回伪过滤器方法所需的捕获（类型和参数）
			return match.slice（0,3）;
		}
	}，

	过滤器：{

		“TAG”：function（nodeName）{
			if（nodeName ===“*”）{
				return function（）{return true; };
			}

			nodeName = nodeName.replace（runescape，funescape）.toLowerCase（）;
			return函数（elem）{
				return elem.nodeName && elem.nodeName.toLowerCase（）=== nodeName;
			};
		}，

		“CLASS”：function（className）{
			var pattern = classCache [className +“”];

			返回模式||
				（pattern = new RegExp（“（^ |”+ whitespace +“）”+ className +“（”+ whitespace +“| $）”））&&
				classCache（className，function（elem）{
					return pattern.test（elem.className ||（typeof elem.getAttribute！== strundefined && elem.getAttribute（“class”））||“”）;
				}）;
		}，

		“ATTR”：函数（名称，运算符，检查）{
			return函数（elem）{
				var result = Sizzle.attr（elem，name）;

				if（result == null）{
					return operator ===“！=”;
				}
				if（！operator）{
					返回true;
				}

				结果+ =“”;

				return operator ===“=”？结果===检查：
					operator ===“！=”？结果！==检查：
					operator ===“^ =”？check && result.indexOf（check）=== 0：
					operator ===“* =”？check && result.indexOf（check）> -1：
					operator ===“$ =”？check && result.slice（-check.length）=== check：
					operator ===“〜=”？（“”+ result +“”）。indexOf（check）> -1：
					operator ===“| =”？结果===检查|| result.slice（0，check.length + 1）=== check +“ - ”：
					假;
			};
		}，

		“CHILD”：函数（类型，内容，参数，第一个，最后一个）{
			var simple = type.slice（0,3）！==“nth”，
				forward = type.slice（-4）！==“last”，
				ofType = what ===“of-type”;

			首先返回=== 1 && last === 0？

				//快捷方式：第n  -  *（n）
				function（elem）{
					return !! elem.parentNode;
				}：

				function（elem，context，xml）{
					var cache，outerCache，node，diff，nodeIndex，start，
						dir =简单！==转发？“nextSibling”：“previousSibling”，
						parent = elem.parentNode，
						name = ofType && elem.nodeName.toLowerCase（），
						useCache =！xml &&！ofType;

					if（parent）{

						// :( first | last | only） - （child | of-type）
						if（simple）{
							while（dir）{
								node = elem;
								while（（node = node [dir]））{
									if（ofType？node.nodeName.toLowerCase（）=== name：node.nodeType === 1）{
										返回虚假;
									}
								}
								//反向：仅 -  *（如果我们还没有这样做）
								start = dir = type ===“only”&&！start &&“nextSibling”;
							}
							返回true;
						}

						开始= [前进？parent.firstChild：parent.lastChild];

						// non-xml：nth-​​child（...）将缓存数据存储在`parent`上
						if（forward && useCache）{
							//从先前缓存的索引中搜索`elem`
							outerCache = parent [expando] || （parent [expando] = {}）;
							cache = outerCache [type] || [];
							nodeIndex = cache [0] === dirruns && cache [1];
							diff = cache [0] === dirruns && cache [2];
							node = nodeIndex && parent.childNodes [nodeIndex];

							while（（node = ++ nodeIndex && node && node [dir] ||

								//从一开始就回归寻求“elem”
								（diff = nodeIndex = 0）|| start.pop（）））{

								//找到后，在`parent`上缓存索引并中断
								if（node.nodeType === 1 && ++ diff && node === elem）{
									outerCache [type] = [dirruns，nodeIndex，diff];
									打破;
								}
							}

						//使用先前缓存的元素索引（如果可用）
						} else if（useCache &&（cache =（elem [expando] ||（elem [expando] = {}））[type]）&& cache [0] === dirruns）{
							diff = cache [1];

						// xml：nth-​​child（...）或：nth-​​last-child（...）或：nth（-last）？ -  of-type（...）
						} else {
							//使用与上面相同的循环从头开始寻找“elem”
							while（（node = ++ nodeIndex && node && node [dir] ||
								（diff = nodeIndex = 0）|| start.pop（）））{

								if（（ofType？node.nodeName.toLowerCase（）=== name：node.nodeType === 1）&& ++ diff）{
									//缓存每个遇到元素的索引
									if（useCache）{
										（node [expando] ||（node [expando] = {}））[type] = [dirruns，diff];
									}

									if（node === elem）{
										打破;
									}
								}
							}
						}

						//合并偏移量，然后检查周期大小
						diff  -  = last;
						return diff === first || （diff％first === 0 && diff / first> = 0）;
					}
				};
		}，

		“PSEUDO”：function（伪，参数）{
			//伪类名称不区分大小写
			// http://www.w3.org/TR/selectors/#pseudo-classes
			//如果使用大写字母添加自定义伪，则按大小写区分优先级
			//记住setFilters继承自pseudos
			var args，
				fn = Expr.pseudos [伪] || Expr.setFilters [pseudo.toLowerCase（）] ||
					Sizzle.error（“unsupported pseudo：”+ pseudo）;

			//用户可以使用createPseudo来指示
			//创建过滤函数需要参数
			//正如Sizzle所做的那样
			if（fn [expando]）{
				return fn（argument）;
			}

			//但保持对旧签名的支持
			if（fn.length> 1）{
				args = [伪，伪，“”，参数];
				返回Expr.setFilters.hasOwnProperty（pseudo.toLowerCase（））？
					markFunction（function（seed，matches）{
						var idx，
							匹配= fn（种子，参数），
							i = matched.length;
						当我 -  ） {
							idx = indexOf.call（seed，matched [i]）;
							seed [idx] =！（匹配[idx] = matched [i]）;
						}
					}）：
					function（elem）{
						return fn（elem，0，args）;
					};
			}

			返回fn;
		}
	}，

	伪：{
		//可能是复杂的伪
		“not”：markFunction（function（selector）{
			//修剪传递给编译器的选择器
			//避免处理前导和尾随
			//作为组合子的空格
			var input = []，
				results = []，
				matcher = compile（selector.replace（rtrim，“$ 1”））;

			返回匹配器[expando]？
				markFunction（function（seed，matches，context，xml）{
					var elem，
						unmatched = matcher（seed，null，xml，[]），
						i = seed.length;

					//匹配`matcher`无法匹配的元素
					当我 -  ） {
						if（（elem = unmatched [i]））{
							seed [i] =！（匹配[i] = elem）;
						}
					}
				}）：
				function（elem，context，xml）{
					输入[0] = elem;
					matcher（输入，null，xml，结果）;
					return！results.pop（）;
				};
		}），

		“has”：markFunction（function（selector）{
			return函数（elem）{
				return Sizzle（selector，elem）.length> 0;
			};
		}），

		“contains”：markFunction（function（text）{
			return函数（elem）{
				return（elem.textContent || elem.innerText || getText（elem））。indexOf（text）> -1;
			};
		}），

		//“元素是否由：lang（）选择器表示
		//仅基于元素的语言值
		//等于标识符C，
		//或以标识符C开头，后面紧跟“ - ”。
		// C对元素语言值的匹配是不区分大小写的。
		//标识符C不必是有效的语言名称。“
		// http://www.w3.org/TR/selectors/#lang-pseudo
		“lang”：markFunction（function（lang）{
			// lang值必须是有效的标识符
			if（！ridentifier.test（lang ||“”））{
				Sizzle.error（“不支持lang：”+ lang）;
			}
			lang = lang.replace（runescape，funescape）.toLowerCase（）;
			return函数（elem）{
				var elemLang;
				做{
					if（（elemLang = documentIsXML？
						elem.getAttribute（“xml：lang”）|| elem.getAttribute（“lang”）：
						elem.lang））{

						elemLang = elemLang.toLowerCase（）;
						返回elemLang === lang || elemLang.indexOf（lang +“ - ”）=== 0;
					}
				} while（（elem = elem.parentNode）&& elem.nodeType === 1）;
				返回虚假;
			};
		}），

		//杂项
		“target”：function（elem）{
			var hash = window.location && window.location.hash;
			return hash && hash.slice（1）=== elem.id;
		}，

		“root”：function（elem）{
			return elem === docElem;
		}，

		“焦点”：function（elem）{
			return elem === document.activeElement &&（！document.hasFocus || document.hasFocus（））&& !!（elem.type || elem.href || ~elem.tabIndex）;
		}，

		//布尔属性
		“enabled”：function（elem）{
			return elem.disabled === false;
		}，

		“disabled”：function（elem）{
			return elem.disabled === true;
		}，

		“checked”：function（elem）{
			//在CSS3中，：checked应返回选中和选中的元素
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase（）;
			return（nodeName ===“input”&& !! elem.checked）|| （nodeName ===“option”&& !! elem.selected）;
		}，

		“selected”：function（elem）{
			//访问此属性会默认选中
			// Safari中的选项正常工作
			if（elem.parentNode）{
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		}，

		//内容
		“empty”：function（elem）{
			// http://www.w3.org/TR/selectors/#empty-pseudo
			//：empty仅受元素节点和内容节点（包括text（3），cdata（4））的影响，
			//不评论，处理说明或其他
			//感谢Diego Perini提供的nodeName快捷方式
			//大于“@”表示字母字符（特别是不以“＃”或“？”开头）
			for（elem = elem.firstChild; elem; elem = elem.nextSibling）{
				if（elem.nodeName>“@”|| elem.nodeType === 3 || elem.nodeType === 4）{
					返回虚假;
				}
			}
			返回true;
		}，

		“parent”：function（elem）{
			返回！Expr.pseudos [“empty”]（elem）;
		}，

		//元素/输入类型
		“header”：function（elem）{
			return rheader.test（elem.nodeName）;
		}，

		“input”：function（elem）{
			return rinputs.test（elem.nodeName）;
		}，

		“button”：function（elem）{
			var name = elem.nodeName.toLowerCase（）;
			返回名称===“输入”&& elem.type ===“按钮”|| name ===“button”;
		}，

		“text”：function（elem）{
			var attr;
			// IE6和7会将elem.type映射到'text'以获取新的HTML5类型（搜索等）
			//使用getAttribute来测试这种情况
			return elem.nodeName.toLowerCase（）===“input”&&
				elem.type ===“text”&&
				（（attr = elem.getAttribute（“type”））== null || attr.toLowerCase（）=== elem.type）;
		}，

		//收集位置
		“first”：createPositionalPseudo（function（）{
			return [0];
		}），

		“last”：createPositionalPseudo（function（matchIndexes，length）{
			返回[长度 -  1];
		}），

		“eq”：createPositionalPseudo（function（matchIndexes，length，argument）{
			return [参数<0？argument + length：argument];
		}），

		“even”：createPositionalPseudo（function（matchIndexes，length）{
			var i = 0;
			for（; i <length; i + = 2）{
				matchIndexes.push（i）;
			}
			return matchIndexes;
		}），

		“odd”：createPositionalPseudo（function（matchIndexes，length）{
			var i = 1;
			for（; i <length; i + = 2）{
				matchIndexes.push（i）;
			}
			return matchIndexes;
		}），

		“lt”：createPositionalPseudo（function（matchIndexes，length，argument）{
			var i =参数<0？参数+长度：参数;
			for（; --i> = 0;）{
				matchIndexes.push（i）;
			}
			return matchIndexes;
		}），

		“gt”：createPositionalPseudo（function（matchIndexes，length，argument）{
			var i =参数<0？参数+长度：参数;
			for（; ++ i <length;）{
				matchIndexes.push（i）;
			}
			return matchIndexes;
		}）
	}
};

//添加按钮/输入类型伪
for（i in {radio：true，checkbox：true，file：true，password：true，image：true}）{
	Expr.pseudos [i] = createInputPseudo（i）;
}
for（i in {submit：true，reset：true}）{
	Expr.pseudos [i] = createButtonPseudo（i）;
}

function tokenize（selector，parseOnly）{
	var匹配，匹配，令牌，类型，
		soFar，groups，preFilters，
		cached = tokenCache [selector +“”];

	if（缓存）{
		return parseOnly？0：cached.slice（0）;
	}

	soFar =选择器;
	groups = [];
	preFilters = Expr.preFilter;

	while（soFar）{

		//逗号和第一次运行
		if（！matched ||（match = rcomma.exec（soFar）））{
			if（match）{
				//不要将尾随逗号视为有效
				soFar = soFar.slice（匹配[0] .length）|| 至今;
			}
			groups.push（tokens = []）;
		}

		matched = false;

		//组合
		if（（match = rcombinators.exec（soFar）））{
			matched = match.shift（）;
			tokens.push（{
				价值：匹配，
				//将后代组合子投射到太空
				type：match [0] .replace（rtrim，“”）
			}）;
			soFar = soFar.slice（matched.length）;
		}

		//过滤器
		for（在Expr.filter中输入）{
			if（（match = matchExpr [type] .exec（soFar））&&（！preFilters [type] ||
				（match = preFilters [type]（match））））{
				matched = match.shift（）;
				tokens.push（{
					价值：匹配，
					类型：类型，
					匹配：匹配
				}）;
				soFar = soFar.slice（matched.length）;
			}
		}

		if（！matched）{
			打破;
		}
	}

	//返回无效多余的长度
	//如果我们只是解析
	//否则，抛出错误或返回令牌
	return parseOnly？
		soFar.length：
		至今 ？
			Sizzle.error（选择器）：
			//缓存令牌
			tokenCache（selector，groups）.slice（0）;
}

function toSelector（tokens）{
	var i = 0，
		len = tokens.length，
		selector =“”;
	for（; i <len; i ++）{
		selector + = tokens [i] .value;
	}
	返回选择器;
}

function addCombinator（matcher，combinator，base）{
	var dir = combinator.dir，
		checkNonElements = base && dir ===“parentNode”，
		doneName = done ++;

	返回combinator.first？
		//检查最近的祖先/前一个元素
		function（elem，context，xml）{
			while（（elem = elem [dir]））{
				if（elem.nodeType === 1 || checkNonElements）{
					return matcher（elem，context，xml）;
				}
			}
		}：

		//检查所有祖先/前面的元素
		function（elem，context，xml）{
			var data，cache，outerCache，
				dirkey = dirruns +“”+ doneName;

			//我们无法在XML节点上设置任意数据，因此它们不会受益于dir缓存
			if（xml）{
				while（（elem = elem [dir]））{
					if（elem.nodeType === 1 || checkNonElements）{
						if（matcher（elem，context，xml））{
							返回true;
						}
					}
				}
			} else {
				while（（elem = elem [dir]））{
					if（elem.nodeType === 1 || checkNonElements）{
						outerCache = elem [expando] || （elem [expando] = {}）;
						if（（cache = outerCache [dir]）&& cache [0] === dirkey）{
							if（（data = cache [1]）=== true || data === cachedruns）{
								返回数据=== true;
							}
						} else {
							cache = outerCache [dir] = [dirkey];
							cache [1] = matcher（elem，context，xml）|| cachedruns;
							if（cache [1] === true）{
								返回true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher（matchers）{
	return matchers.length> 1？
		function（elem，context，xml）{
			var i = matchers.length;
			当我 -  ） {
				if（！matchers [i]（elem，context，xml））{
					返回虚假;
				}
			}
			返回true;
		}：
		匹配器[0];
}

function condense（unmatched，map，filter，context，xml）{
	var elem，
		newUnmatched = []，
		i = 0，
		len = unmatched.length，
		mapped = map！= null;

	for（; i <len; i ++）{
		if（（elem = unmatched [i]））{
			if（！filter || filter（elem，context，xml））{
				newUnmatched.push（elem）;
				if（mapped）{
					map.push（i）;
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher（preFilter，selector，matcher，postFilter，postFinder，postSelector）{
	if（postFilter &&！postFilter [expando]）{
		postFilter = setMatcher（postFilter）;
	}
	if（postFinder &&！postFinder [expando]）{
		postFinder = setMatcher（postFinder，postSelector）;
	}
	return markFunction（function（seed，results，context，xml）{
		var temp，i，elem，
			preMap = []，
			postMap = []，
			preexisting = results.length，

			//从种子或上下文中获取初始元素
			elems =种子|| multipleContexts（selector ||“*”，context.nodeType？[context]：context，[]），

			// Prefilter获取匹配器输入，保留种子结果同步的映射
			matcherIn = preFilter &&（seed ||！selector）？
				压缩（elems，preMap，preFilter，context，xml）：
				elems的，

			matcherOut = matcher？
				//如果我们有postFinder，或过滤的种子，或非种子postFilter或预先存在的结果，
				postFinder || （种子？preFilter：preexisting || postFilter）？

					// ...中间处理是必要的
					[]：

					// ...否则直接使用结果
					结果：
				matcherIn;

		//查找主要匹配项
		if（matcher）{
			matcher（matcherIn，matcherOut，context，xml）;
		}

		//应用postFilter
		if（postFilter）{
			temp = condense（matcherOut，postMap）;
			postFilter（temp，[]，context，xml）;

			//通过将失败的元素移回matcherIn来使其失败
			i = temp.length;
			当我 -  ） {
				if（（elem = temp [i]））{
					matcherOut [postMap [i]] =！（matcherIn [postMap [i]] = elem）;
				}
			}
		}

		if（seed）{
			if（postFinder || preFilter）{
				if（postFinder）{
					//通过将此中间项压缩到postFinder上下文中来获取最终的matcherOut
					temp = [];
					i = matcherOut.length;
					当我 -  ） {
						if（（elem = matcherOut [i]））{
							//恢复matcherIn因为elem还不是最终匹配
							temp.push（（matcherIn [i] = elem））;
						}
					}
					postFinder（null，（matcherOut = []），temp，xml）;
				}

				//将匹配的元素从种子移动到结果以使它们保持同步
				i = matcherOut.length;
				当我 -  ） {
					if（（elem = matcherOut [i]）&&
						（temp = postFinder？indexOf.call（seed，elem）：preMap [i]）> -1）{

						seed [temp] =！（results [temp] = elem）;
					}
				}
			}

		//如果已定义，则通过postFinder将元素添加到结果中
		} else {
			matcherOut =浓缩（
				matcherOut ===结果？
					matcherOut.splice（preexisting，matcherOut.length）：
					matcherOut
			）;
			if（postFinder）{
				postFinder（null，results，matcherOut，xml）;
			} else {
				push.apply（results，matcherOut）;
			}
		}
	}）;
}

function matcherFromTokens（tokens）{
	var checkContext，matcher，j，
		len = tokens.length，
		leadingRelative = Expr.relative [tokens [0] .type]，
		implicitRelative = leadingRelative || Expr.relative [“”]，
		我=领先相对？1：0，

		//基础匹配器确保元素可从顶层上下文访问
		matchContext = addCombinator（function（elem）{
			return elem === checkContext;
		}，implicitRelative，true），
		matchAnyContext = addCombinator（function（elem）{
			return indexOf.call（checkContext，elem）> -1;
		}，implicitRelative，true），
		matchers = [function（elem，context，xml）{
			return（！leadingRelative &&（xml || context！== outermostContext））|| （
				（checkContext = context）.nodeType？
					matchContext（elem，context，xml）：
					matchAnyContext（elem，context，xml））;
		}];

	for（; i <len; i ++）{
		if（（matcher = Expr.relative [tokens [i] .type]））{
			matchers = [addCombinator（elementMatcher（matchers），matcher）];
		} else {
			matcher = Expr.filter [tokens [i] .type] .apply（null，tokens [i] .matches）;

			//在看到位置匹配器后返回特殊情况
			if（matcher [expando]）{
				//找到下一个相对运算符（如果有）以便正确处理
				j = ++ i;
				for（; j <len; j ++）{
					if（Expr.relative [tokens [j] .type]）{
						打破;
					}
				}
				return setMatcher（
					i> 1 && elementMatcher（matchers），
					i> 1 && toSelector（tokens.slice（0，i  -  1））。replace（rtrim，“$ 1”），
					匹配，
					我<j && matcherFromTokens（tokens.slice（i，j）），
					j <len && matcherFromTokens（（tokens = tokens.slice（j））），
					j <len && toSelector（令牌）
				）;
			}
			matchers.push（matcher）;
		}
	}

	return elementMatcher（matchers）;
}

function matcherFromGroupMatchers（elementMatchers，setMatchers）{
	//一个计数器，用于指定当前正在匹配的元素
	var matcherCachedRuns = 0，
		bySet = setMatchers.length> 0，
		byElement = elementMatchers.length> 0，
		superMatcher = function（seed，context，xml，results，expandContext）{
			var elem，j，matcher，
				setMatched = []，
				matchedCount = 0，
				i =“0”，
				unmatched = seed && []，
				outermost = expandContext！= null，
				contextBackup = outermostContext，
				//我们必须始终拥有种子元素或上下文
				elems =种子|| byElement && Expr.find [“TAG”]（“*”，expandContext && context.parentNode || context），
				//使用整数dirruns iff这是最外层的匹配器
				dirrunsUnique =（dirruns + = contextBackup == null？1：Math.random（）|| 0.1）;

			if（outermost）{
				outermostContext = context！== document && context;
				cachedruns = matcherCachedRuns;
			}

			//添加将elementMatchers直接传递给结果的元素
			//如果没有元素，请将`i`保留为字符串，以便`matchedCount`在下面为“00”
			for（;（elem = elems [i]）！= null; i ++）{
				if（byElement && elem）{
					j = 0;
					while（（matcher = elementMatchers [j ++]））{
						if（matcher（elem，context，xml））{
							results.push（elem）;
							打破;
						}
					}
					if（outermost）{
						dirruns = dirrunsUnique;
						cachedruns = ++ matcherCachedRuns;
					}
				}

				//跟踪设置过滤器的不匹配元素
				if（bySet）{
					//他们将经历所有可能的匹配
					if（（elem =！matcher && elem））{
						matchedCount--;
					}

					//为每个元素延长数组，匹配与否
					if（seed）{
						unmatched.push（elem）;
					}
				}
			}

			//将集合过滤器应用于不匹配的元素
			matchedCount + = i;
			if（bySet && i！== matchedCount）{
				j = 0;
				while（（matcher = setMatchers [j ++]））{
					matcher（不匹配，setMatched，context，xml）;
				}

				if（seed）{
					//重新整合元素匹配以消除排序的需要
					if（matchedCount> 0）{
						当我 -  ） {
							if（！（unmatched [i] || setMatched [i]））{
								setMatched [i] = pop.call（results）;
							}
						}
					}

					//丢弃索引占位符值以仅获取实际匹配
					setMatched = condense（setMatched）;
				}

				//为结果添加匹配项
				push.apply（results，setMatched）;

				//无核集匹配成功匹配多个成功的匹配器规定排序
				if（outermost &&！seed && setMatched.length> 0 &&
					（matchedCount + setMatchers.length）> 1）{

					Sizzle.uniqueSort（结果）;
				}
			}

			//通过嵌套匹配器覆盖全局变量的操作
			if（outermost）{
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			回归无与伦比;
		};

	返回bySet？
		markFunction（superMatcher）：
		superMatcher;
}

compile = Sizzle.compile = function（selector，group / *仅供内部使用* /）{
	var i，
		setMatchers = []，
		elementMatchers = []，
		cached = compilerCache [selector +“”];

	if（！cached）{
		//生成递归函数的函数，可用于检查每个元素
		if（！group）{
			group = tokenize（selector）;
		}
		i = group.length;
		当我 -  ） {
			cached = matcherFromTokens（group [i]）;
			if（cached [expando]）{
				setMatchers.push（cached）;
			} else {
				elementMatchers.push（cached）;
			}
		}

		//缓存已编译的函数
		cached = compilerCache（selector，matcherFromGroupMatchers（elementMatchers，setMatchers））;
	}
	返回缓存;
};

function multipleContexts（selector，contexts，results）{
	var i = 0，
		len = contexts.length;
	for（; i <len; i ++）{
		Sizzle（选择器，上下文[i]，结果）;
	}
	返回结果;
}

函数选择（选择器，上下文，结果，种子）{
	var i，令牌，令牌，类型，查找，
		match = tokenize（selector）;

	if（！seed）{
		//如果只有一个组，请尝试最小化操作
		if（match.length === 1）{

			//如果根选择器是ID，请选择快捷方式并设置上下文
			tokens = match [0] = match [0] .slice（0）;
			if（tokens.length> 2 &&（token = tokens [0]）。type ===“ID”&&
					context.nodeType === 9 &&！documentIsXML &&
					Expr.relative [tokens [1] .type]）{

				context = Expr.find [“ID”]（token.matches [0] .replace（runescape，funescape），context）[0];
				if（！context）{
					返回结果;
				}

				selector = selector.slice（tokens.shift（）。value.length）;
			}

			//获取从右到左匹配的种子集
			i = matchExpr [“needsContext”]。test（selector）？0：tokens.length;
			当我 -  ） {
				token = tokens [i];

				//如果我们击中组合器就中止
				if（Expr.relative [（type = token.type）]）{
					打破;
				}
				if（（find = Expr.find [type]））{
					//搜索，扩展主要兄弟组合器的上下文
					if（（seed = find（
						token.matches [0] .replace（runescape，funescape），
						rsibling.test（tokens [0] .type）&& context.parentNode || 上下文
					）））{

						//如果种子是空的或没有令牌，我们可以提前返回
						tokens.splice（i，1）;
						selector = seed.length && toSelector（tokens）;
						if（！selector）{
							push.apply（results，slice.call（seed，0））;
							返回结果;
						}

						打破;
					}
				}
			}
		}
	}

	//编译并执行过滤功能
	//如果我们修改了上面的选择器，请提供`match`以避免重新识别
	编译（选择器，匹配）（
		种子，
		背景下，
		documentIsXML，
		结果，
		rsibling.test（选择器）
	）;
	返回结果;
}

//已弃用
Expr.pseudos [“nth”] = Expr.pseudos [“eq”];

//用于创建新setFilters的Easy API
function setFilters（）{}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters（）;

//使用默认文档初始化
setDocument（）;

//覆盖sizzle属性检索
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr [“：”] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


}）（窗口）;
var runtil = /直到$ /，
	rparentsprev = / ^（?: parents | prev（?: Until | All））/，
	isSimple = /^。[^：#\ [。，]，$ /，
	rneedsContext = jQuery.expr.match.needsContext，
	//方法保证在从唯一集开始时生成唯一集
	guaranteeUnique = {
		孩子：是的，
		内容：true，
		下一个：是的，
		上一篇：真的
	};

1.3中（{
	find：function（selector）{
		var i，ret，self，
			len = this.length;

		if（typeof selector！==“string”）{
			self = this;
			return this.pushStack（jQuery（selector）.filter（function（）{
				for（i = 0; i <len; i ++）{
					if（jQuery.contains（self [i]，this））{
						返回true;
					}
				}
			}）;;
		}

		ret = [];
		for（i = 0; i <len; i ++）{
			jQuery.find（selector，this [i]，ret）;
		}

		//需要因为$（选择器，上下文）变成$（context）.find（selector）
		ret = this.pushStack（len> 1？jQuery.unique（ret）：ret）;
		ret.selector =（this.selector？this.selector +“”：“”“）+ selector;
		返回;
	}，

	has：function（target）{
		var i，
			targets = jQuery（target，this），
			len = targets.length;

		return this.filter（function（）{
			for（i = 0; i <len; i ++）{
				if（jQuery.contains（this，targets [i]））{
					返回true;
				}
			}
		}）;
	}，

	not：function（selector）{
		return this.pushStack（winnow（this，selector，false））;
	}，

	filter：function（selector）{
		return this.pushStack（winnow（this，selector，true））;
	}，

	是：function（selector）{
		return !! selector &&（
			typeof selector ===“string”？
				//如果这是位置/相对选择器，请检查返回集合中的成员资格
				// so $（“p：first”）。is（“p：last”）对于带有两个“p”的doc不会返回true。
				rneedsContext.test（selector）？
					jQuery（selector，this.context）.index（this [0]）> = 0：
					jQuery.filter（selector，this）.length> 0：
				this.filter（selector）.length> 0）;
	}，

	最近的：函数（选择器，上下文）{
		var cur，
			i = 0，
			l = this.length，
			ret = []，
			pos = rneedsContext.test（选择器）|| typeof selectors！==“string”？
				jQuery（选择器，上下文|| this.context）：
				0;

		for（; i <l; i ++）{
			cur = this [i];

			while（cur && cur.ownerDocument && cur！== context && cur.nodeType！== 11）{
				if（pos？pos.index（cur）> -1：jQuery.find.matchesSelector（cur，selectors））{
					ret.push（cur）;
					打破;
				}
				cur = cur.parentNode;
			}
		}

		return this.pushStack（ret.length> 1？jQuery.unique（ret）：ret）;
	}，

	//确定元素的位置
	//匹配的元素集
	index：function（elem）{

		//没有参数，在父级中返回索引
		if（！elem）{
			return（this [0] && this [0] .parentNode）？this.first（）。prevAll（）。length：-1;
		}

		//选择器中的索引
		if（typeof elem ===“string”）{
			return jQuery.inArray（this [0]，jQuery（elem））;
		}

		//找到所需元素的位置
		return jQuery.inArray（
			//如果收到jQuery对象，则使用第一个元素
			elem.jquery？elem [0]：elem，this）;
	}，

	add：function（selector，context）{
		var set = typeof selector ===“string”？
				jQuery（选择器，上下文）：
				jQuery.makeArray（selector && selector.nodeType？[selector]：selector），
			all = jQuery.merge（this.get（），set）;

		return this.pushStack（jQuery.unique（all））;
	}，

	addBack：function（selector）{
		return this.add（selector == null？
			this.prevObject：this.prevObject.filter（selector）
		）;
	}
}）;

jQuery.fn.andSelf = jQuery.fn.addBack;

function sibling（cur，dir）{
	做{
		cur = cur [dir];
	} while（cur && cur.nodeType！== 1）;

	回归
}

jQuery.each（{
	parent：function（elem）{
		var parent = elem.parentNode;
		return parent && parent.nodeType！== 11？parent：null;
	}，
	父母：function（elem）{
		return jQuery.dir（elem，“parentNode”）;
	}，
	parentsUntil：function（elem，i，until）{
		返回jQuery.dir（elem，“parentNode”，直到）;
	}，
	下一个：function（elem）{
		返回兄弟（elem，“nextSibling”）;
	}，
	上一篇：function（elem）{
		返回兄弟（elem，“previousSibling”）;
	}，
	nextAll：function（elem）{
		return jQuery.dir（elem，“nextSibling”）;
	}，
	prevAll：function（elem）{
		return jQuery.dir（elem，“previousSibling”）;
	}，
	nextUntil：function（elem，i，until）{
		返回jQuery.dir（elem，“nextSibling”，直到）;
	}，
	prevUntil：function（elem，i，until）{
		返回jQuery.dir（elem，“previousSibling”，直到）;
	}，
	兄弟姐妹：function（elem）{
		return jQuery.sibling（（elem.parentNode || {}）。firstirstChild，elem）;
	}，
	children：function（elem）{
		return jQuery.sibling（elem.firstChild）;
	}，
	内容：function（elem）{
		return jQuery.nodeName（elem，“iframe”）？
			elem.contentDocument || elem.contentWindow.document：
			jQuery.merge（[]，elem.childNodes）;
	}
}，function（name，fn）{
	jQuery.fn [name] = function（until，selector）{
		var ret = jQuery.map（this，fn，until）;

		if（！runtil.test（name））{
			selector = until;
		}

		if（selector && typeof selector ===“string”）{
			ret = jQuery.filter（selector，ret）;
		}

		ret = this.length> 1 &&！guaranteeUnique [name]？jQuery.unique（ret）：ret;

		if（this.length> 1 && rparentsprev.test（name））{
			ret = ret.reverse（）;
		}

		return this.pushStack（ret）;
	};
}）;

jQuery.extend（{
	filter：function（expr，elems，not）{
		如果不 ） {
			expr =“：not（”+ expr +“）”;
		}

		return elems.length === 1？
			jQuery.find.matchesSelector（elems [0]，expr）？[elems [0]]：[]：
			jQuery.find.matches（expr，elems）;
	}，

	dir：function（elem，dir，until）{
		var matched = []，
			cur = elem [dir];

		while（cur && cur.nodeType！== 9 &&（until === undefined || cur.nodeType！== 1 ||！jQuery（cur）.is（until）））{
			if（cur.nodeType === 1）{
				matched.push（cur）;
			}
			cur = cur [dir];
		}
		返回匹配;
	}，

	兄弟：function（n，elem）{
		var r = [];

		for（; n; n = n.nextSibling）{
			if（n.nodeType === 1 && n！== elem）{
				r.push（n）;
			}
		}

		返回r;
	}
}）;

//为过滤器实现相同的功能而不是
function winnow（elements，qualifier，keep）{

	//无法在Firefox 4中将null或undefined传递给indexOf
	//设置为0以跳过字符串检查
	qualifier = qualifier || 0;

	if（jQuery.isFunction（qualifier））{
		return jQuery.grep（elements，function（elem，i）{
			var retVal = !! qualifier.call（elem，i，elem）;
			return retVal === keep;
		}）;

	} else if（qualifier.nodeType）{
		return jQuery.grep（elements，function（elem）{
			return（elem === qualifier）=== keep;
		}）;

	} else if（typeof qualifier ===“string”）{
		var filtered = jQuery.grep（elements，function（elem）{
			return elem.nodeType === 1;
		}）;

		if（isSimple.test（qualifier））{
			return jQuery.filter（qualifier，filtered，！keep）;
		} else {
			qualifier = jQuery.filter（限定符，过滤）;
		}
	}

	return jQuery.grep（elements，function（elem）{
		return（jQuery.inArray（elem，qualifier）> = 0）=== keep;
	}）;
}
function createSafeFragment（document）{
	var list = nodeNames.split（“|”），
		safeFrag = document.createDocumentFragment（）;

	if（safeFrag.createElement）{
		while（list.length）{
			safeFrag.createElement（
				list.pop（）
			）;
		}
	}
	return safeFrag;
}

var nodeNames =“abbr | article | aside | audio | bdi | canvas | data | datalist | details | figcaption | figure | footer |” +
		“头| hgroup |标记|仪表|导航|输出|进展|部分|摘要|时间|视频”，
	rinlinejQuery = / jQuery \ d + =“（？：null | \ d +）”/ g，
	rnoshimcache = new RegExp（“<（？：”+ nodeNames +“）[\\ s />]”，“i”），
	rleadingWhitespace = / ^ \ s + /，
	rxhtmlTag = / <（？！area | br | col | embed | hr | img | input | link | meta | param）（（[\ w：] +）[^>] *）\ /> / gi，
	rtagName = / <（[\ w：] +）/，
	rtbody = / <tbody / i，
	rhtml = / <|＆＃？\ w +; /，
	rnoInnerhtml = / <（？：script | style | link）/ i，
	manipulation_rcheckableType = / ^（？：checkbox | radio）$ / i，
	// checked =“选中”或选中
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = / ^ $ | \ /（？：java | ecma）script / i，
	rscriptTypeMasked = /^true \ /(.*)/,
	rcleanScript = / ^ \ s * <！（？：\ [CDATA \ [|  - ）|（？：\] \] |  - ）> \ s * $ / g，

	//我们必须关闭这些标签才能支持XHTML（＃13200）
	wrapMap = {
		选项：[1，“<select multiple ='multiple'>”，“</ select>”]，
		图例：[1，“<fieldset>”，“</ fieldset>”]，
		area：[1，“<map>”，“</ map>”]，
		param：[1，“<object>”，“</ object>”]，
		thead：[1，“<table>”，“</ table>”]，
		tr：[2，“<table> <tbody>”，“</ tbody> </ table>”]，
		col：[2，“<table> <tbody> </ tbody> <colgroup>”，“</ colgroup> </ table>”]，
		td：[3，“<table> <tbody> <tr>”，“</ tr> </ tbody> </ table>”]，

		// IE6-8无法序列化链接，脚本，样式或任何html5（NoScope）标记，
		//除非包含在前面有非破坏字符的div中。
		_default：jQuery.support.htmlSerialize？[0，“”，“”]：[1，“X <div>”，“</ div>”]
	}，
	safeFragment = createSafeFragment（document），
	fragmentDiv = safeFragment.appendChild（document.createElement（“div”））;

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

1.3中（{
	text：function（value）{
		return jQuery.access（this，function（value）{
			返回值=== undefined？
				jQuery.text（this）：
				this.empty（）。append（（this [0] && this [0] .ownerDocument || document）.createTextNode（value））;
		}，null，value，arguments.length）;
	}，

	wrapAll：function（html）{
		if（jQuery.isFunction（html））{
			return this.each（function（i）{
				jQuery（this）.wrapAll（html.call（this，i））;
			}）;
		}

		if（this [0]）{
			//包围目标的元素
			var wrap = jQuery（html，this [0] .ownerDocument）.eq（0）.clone（true）;

			if（this [0] .parentNode）{
				wrap.insertBefore（this [0]）;
			}

			wrap.map（function（）{
				var elem = this;

				while（elem.firstChild && elem.firstChild.nodeType === 1）{
					elem = elem.firstChild;
				}

				返回元素;
			}）。append（this）;
		}

		归还这个;
	}，

	wrapInner：function（html）{
		if（jQuery.isFunction（html））{
			return this.each（function（i）{
				jQuery（this）.wrapInner（html.call（this，i））;
			}）;
		}

		return this.each（function（）{
			var self = jQuery（this），
				contents = self.contents（）;

			if（contents.length）{
				contents.wrapAll（html）;

			} else {
				self.append（html）;
			}
		}）;
	}，

	wrap：function（html）{
		var isFunction = jQuery.isFunction（html）;

		return this.each（function（i）{
			jQuery（this）.wrapAll（isFunction？html.call（this，i）：html）;
		}）;
	}，

	unwrap：function（）{
		返回this.parent（）。each（function（）{
			if（！jQuery.nodeName（this，“body”））{
				jQuery（this）.replaceWith（this.childNodes）;
			}
		}）。结束（）;
	}，

	append：function（）{
		return this.domManip（arguments，true，function（elem）{
			if（this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9）{
				this.appendChild（elem）;
			}
		}）;
	}，

	prepend：function（）{
		return this.domManip（arguments，true，function（elem）{
			if（this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9）{
				this.insertBefore（elem，this.firstChild）;
			}
		}）;
	}，

	之前：function（）{
		return this.domManip（arguments，false，function（elem）{
			if（this.parentNode）{
				this.parentNode.insertBefore（elem，this）;
			}
		}）;
	}，

	after：function（）{
		return this.domManip（arguments，false，function（elem）{
			if（this.parentNode）{
				this.parentNode.insertBefore（elem，this.nextSibling）;
			}
		}）;
	}，

	// keepData仅供内部使用 - 请勿记录
	remove：function（selector，keepData）{
		var elem，
			i = 0;

		for（;（elem = this [i]）！= null; i ++）{
			if（！selector || jQuery.filter（selector，[elem]）。length> 0）{
				if（！keepData && elem.nodeType === 1）{
					jQuery.cleanData（getAll（elem））;
				}

				if（elem.parentNode）{
					if（keepData && jQuery.contains（elem.ownerDocument，elem））{
						setGlobalEval（getAll（elem，“script”））;
					}
					elem.parentNode.removeChild（elem）;
				}
			}
		}

		归还这个;
	}，

	empty：function（）{
		var elem，
			i = 0;

		for（;（elem = this [i]）！= null; i ++）{
			//删除元素节点并防止内存泄漏
			if（elem.nodeType === 1）{
				jQuery.cleanData（getAll（elem，false））;
			}

			//删除所有剩余的节点
			while（elem.firstChild）{
				elem.removeChild（elem.firstChild）;
			}

			//如果这是一个选择，请确保它显示为空（＃12336）
			//支持：IE <9
			if（elem.options && jQuery.nodeName（elem，“select”））{
				elem.options.length = 0;
			}
		}

		归还这个;
	}，

	clone：function（dataAndEvents，deepDataAndEvents）{
		dataAndEvents = dataAndEvents == null？false：dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null？dataAndEvents：deepDataAndEvents;

		return this.map（function（）{
			return jQuery.clone（this，dataAndEvents，deepDataAndEvents）;
		}）;
	}，

	html：function（value）{
		return jQuery.access（this，function（value）{
			var elem = this [0] || {}，
				i = 0，
				l = this.length;

			if（value === undefined）{
				return elem.nodeType === 1？
					elem.innerHTML.replace（rinlinejQuery，“”）：
					不确定的;
			}

			//看看我们是否可以采用快捷方式并使用innerHTML
			if（typeof value ===“string”&&！rnoInnerhtml.test（value）&&
				（jQuery.support.htmlSerialize ||！rnoshimcache.test（value））&&
				（jQuery.support.leadingWhitespace ||！rleadingWhitespace.test（value））&&
				！wrapMap [（rtagName.exec（value）|| [“”，“”]）[1] .toLowerCase（）]）{

				value = value.replace（rxhtmlTag，“<$ 1> </ $ 2>”）;

				尝试{
					for（; i <l; i ++）{
						//删除元素节点并防止内存泄漏
						elem =这[i] || {};
						if（elem.nodeType === 1）{
							jQuery.cleanData（getAll（elem，false））;
							elem.innerHTML = value;
						}
					}

					elem = 0;

				//如果使用innerHTML引发异常，请使用fallback方法
				} catch（e）{}
			}

			if（elem）{
				this.empty（）。append（value）;
			}
		}，null，value，arguments.length）;
	}，

	replaceWith：function（value）{
		var isFunc = jQuery.isFunction（value）;

		//确保在插入元素之前从DOM中删除元素
		//这可以帮助修复用子元素替换父元素
		if（！isFunc && typeof value！==“string”）{
			value = jQuery（value）.not（this）.detach（）;
		}

		return this.domManip（[value]，true，function（elem）{
			var next = this.nextSibling，
				parent = this.parentNode;

			if（parent）{
				jQuery（this）.remove（）;
				parent.insertBefore（elem，next）;
			}
		}）;
	}，

	detach：function（selector）{
		return this.remove（selector，true）;
	}，

	domManip：function（args，table，callback）{

		//展平任何嵌套数组
		args = core_concat.apply（[]，args）;

		var first，node，hasScripts，
			脚本，doc，片段，
			i = 0，
			l = this.length，
			set = this，
			iNoClone = l  -  1，
			value = args [0]，
			isFunction = jQuery.isFunction（value）;

		//我们无法在WebKit中克隆包含checked的节点片段
		if（isFunction ||！（l <= 1 || typeof value！==“string”|| jQuery.support.checkClone ||！rchecked.test（value）））{
			return this.each（function（index）{
				var self = set.eq（index）;
				if（isFunction）{
					args [0] = value.call（this，index，table？self.html（）：undefined）;
				}
				self.domManip（args，table，callback）;
			}）;
		}

		if（l）{
			fragment = jQuery.buildFragment（args，this [0] .ownerDocument，false，this）;
			first = fragment.firstChild;

			if（fragment.childNodes.length === 1）{
				fragment = first;
			}

			if（first）{
				table = table && jQuery.nodeName（first，“tr”）;
				scripts = jQuery.map（getAll（fragment，“script”），disableScript）;
				hasScripts = scripts.length;

				//使用原始片段代替最后一个项目，因为它可能会结束
				//在某些情况下被错误地清空（＃8070）。
				for（; i <l; i ++）{
					node = fragment;

					if（i！== iNoClone）{
						node = jQuery.clone（node，true，true）;

						//保留对克隆脚本的引用，以便以后恢复
						if（hasScripts）{
							jQuery.merge（scripts，getAll（node，“script”））;
						}
					}

					callback.call（
						table && jQuery.nodeName（this [i]，“table”）？
							findOrAppend（this [i]，“tbody”）：
							这[I]，
						节点，
						一世
					）;
				}

				if（hasScripts）{
					doc = scripts [scripts.length  -  1] .ownerDocument;

					//重新启用脚本
					jQuery.map（scripts，restoreScript）;

					//在第一次文档插入时评估可执行脚本
					for（i = 0; i <hasScripts; i ++）{
						node = scripts [i];
						if（rscriptType.test（node.type ||“”）&&
							！jQuery._data（node，“globalEval”）&& jQuery.contains（doc，node））{

							if（node.src）{
								//希望ajax可用......
								jQuery.ajax（{
									url：node.src，
									类型：“GET”，
									dataType：“script”，
									async：false，
									全球：假，
									“抛出”：是的
								}）;
							} else {
								jQuery.globalEval（（node.text || node.textContent || node.innerHTML ||“”）.replace（rcleanScript，“”））;
							}
						}
					}
				}

				//修复＃11809：避免泄漏内存
				fragment = first = null;
			}
		}

		归还这个;
	}
}）;

function findOrAppend（elem，tag）{
	return elem.getElementsByTagName（tag）[0] || elem.appendChild（elem.ownerDocument.createElement（tag））;
}

//替换/恢复脚本元素的type属性以进行安全的DOM操作
function disableScript（elem）{
	var attr = elem.getAttributeNode（“type”）;
	elem.type =（attr && attr.specified）+“/”+ elem.type;
	返回元素;
}
function restoreScript（elem）{
	var match = rscriptTypeMasked.exec（elem.type）;
	if（match）{
		elem.type = match [1];
	} else {
		elem.removeAttribute（ “输入”）;
	}
	返回元素;
}

//将脚本标记为已经过评估
function setGlobalEval（elems，refElements）{
	var elem，
		i = 0;
	for（;（elem = elems [i]）！= null; i ++）{
		jQuery._data（elem，“globalEval”，！refElements || jQuery._data（refElements [i]，“globalEval”））;
	}
}

function cloneCopyEvent（src，dest）{

	if（dest.nodeType！== 1 ||！jQuery.hasData（src））{
		返回;
	}

	var type，i，l，
		oldData = jQuery._data（src），
		curData = jQuery._data（dest，oldData），
		events = oldData.events;

	if（events）{
		删除curData.handle;
		curData.events = {};

		for（输入事件）{
			for（i = 0，l = events [type] .length; i <l; i ++）{
				jQuery.event.add（dest，type，events [type] [i]）;
			}
		}
	}

	//使克隆的公共数据对象成为原始副本的副本
	if（curData.data）{
		curData.data = jQuery.extend（{}，curData.data）;
	}
}

function fixCloneNodeIssues（src，dest）{
	var nodeName，e，data;

	//我们不需要为非元素做任何事情
	if（dest.nodeType！== 1）{
		返回;
	}

	nodeName = dest.nodeName.toLowerCase（）;

	// IE6-8在使用cloneNode时复制通过attachEvent绑定的事件。
	if（！jQuery.support.noCloneEvent && dest [jQuery.expando]）{
		data = jQuery._data（dest）;

		for（e in data.events）{
			jQuery.removeEvent（dest，e，data.handle）;
		}

		//如果还要复制expando，则会引用事件数据而不是复制事件数据
		dest.removeAttribute（jQuery.expando）;
	}

	// IE克隆脚本时会清空内容，并尝试评估新设置的文本
	if（nodeName ===“script”&& dest.text！== src.text）{
		disableScript（dest）.text = src.text;
		restoreScript（dest）;

	// IE6-10使用classid不正确地克隆了对象元素的子元素。
	//如果parent为null，则IE10抛出NoModificationAllowedError，＃12132。
	} else if（nodeName ===“object”）{
		if（dest.parentNode）{
			dest.outerHTML = src.outerHTML;
		}

		//这条路径对IE9来说是不可避免的。克隆对象时
		// IE9中的元素，上面的outerHTML策略是不够的。
		//如果src有innerHTML且目的地没有，
		//将src.innerHTML复制到dest.innerHTML中。＃10324
		if（jQuery.support.html5Clone &&（src.innerHTML &&！jQuery.trim（dest.innerHTML）））{
			dest.innerHTML = src.innerHTML;
		}

	} else if（nodeName ===“input”&& manipulation_rcheckableType.test（src.type））{
		// IE6-8无法保持克隆复选框的已检查状态
		//或单选按钮 更糟糕的是，IE6-7无法提供克隆元素
		//如果未设置defaultChecked值，则检查外观

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7混淆并最终设置克隆的值
		//复选框/单选按钮指向空字符串而不是“打开”
		if（dest.value！== src.value）{
			dest.value = src.value;
		}

	// IE6-8无法将所选选项返回到所选的默认选项
	//克隆选项时说明
	} else if（nodeName ===“option”）{
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8无法将defaultValue设置为正确的值
	//克隆其他类型的输入字段
	} else if（nodeName ===“input”|| nodeName ===“textarea”）{
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.each（{
	appendTo：“追加”，
	prependTo：“prepend”，
	insertBefore：“before”，
	insertAfter：“after”，
	replaceAll：“replaceWith”
}，function（name，original）{
	jQuery.fn [name] = function（selector）{
		var elems，
			i = 0，
			ret = []，
			insert = jQuery（selector），
			last = insert.length  -  1;

		for（; i <= last; i ++）{
			elems = i ===最后？这个：this.clone（true）;
			jQuery（insert [i]）[original]（elems）;

			//现代浏览器可以将jQuery集合应用为数组，但oldIE需要.get（）
			core_push.apply（ret，elems.get（））;
		}

		return this.pushStack（ret）;
	};
}）;

function getAll（context，tag）{
	var elems，elem，
		i = 0，
		found = typeof context.getElementsByTagName！== core_strundefined？context.getElementsByTagName（tag ||“*”）：
			typeof context.querySelectorAll！== core_strundefined？context.querySelectorAll（tag ||“*”）：
			不确定的;

	if（！found）{
		for（found = []，elems = context.childNodes || context;（elem = elems [i]）！= null; i ++）{
			if（！tag || jQuery.nodeName（elem，tag））{
				found.push（elem）;
			} else {
				jQuery.merge（found，getAll（elem，tag））;
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName（context，tag）？
		jQuery.merge（[context]，found）：
		发现;
}

//在buildFragment中使用，修复defaultChecked属性
function fixDefaultChecked（elem）{
	if（manipulation_rcheckableType.test（elem.type））{
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend（{
	clone：function（elem，dataAndEvents，deepDataAndEvents）{
		var destElements，node，clone，i，srcElements，
			inPage = jQuery.contains（elem.ownerDocument，elem）;

		if（jQuery.support.html5Clone || jQuery.isXMLDoc（elem）||！rnoshimcache.test（“<”+ elem.nodeName +“>”））{
			clone = elem.cloneNode（true）;

		// IE <= 8无法正确克隆分离的未知元素节点
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild（clone = fragmentDiv.firstChild）;
		}

		if（（！jQuery.support.noCloneEvent ||！jQuery.support.noCloneChecked）&&
				（elem.nodeType === 1 || elem.nodeType === 11）&&！jQuery.isXMLDoc（elem））{

			//我们出于性能原因避开了Sizzle：http：//jsperf.com/getall-vs-sizzle/2
			destElements = getAll（clone）;
			srcElements = getAll（elem）;

			//修复所有IE克隆问题
			for（i = 0;（node = srcElements [i]）！= null; ++ i）{
				//确保目标节点不为空; 修复＃9587
				if（destElements [i]）{
					fixCloneNodeIssues（node，destElements [i]）;
				}
			}
		}

		//将事件从原始复制到克隆
		if（dataAndEvents）{
			if（deepDataAndEvents）{
				srcElements = srcElements || getAll（elem）;
				destElements = destElements || getAll（clone）;

				for（i = 0;（node = srcElements [i]）！= null; i ++）{
					cloneCopyEvent（node，destElements [i]）;
				}
			} else {
				cloneCopyEvent（elem，clone）;
			}
		}

		//保留脚本评估历史记录
		destElements = getAll（clone，“script”）;
		if（destElements.length> 0）{
			setGlobalEval（destElements，！inPage && getAll（elem，“script”））;
		}

		destElements = srcElements = node = null;

		//返回克隆的集合
		返回克隆;
	}，

	buildFragment：function（elems，context，scripts，selection）{
		var j，elem，contains，
			tmp，tag，tbody，wrap，
			l = elems.length，

			//确保安全的片段
			safe = createSafeFragment（context），

			nodes = []，
			i = 0;

		for（; i <l; i ++）{
			elem = elems [i];

			if（elem || elem === 0）{

				//直接添加节点
				if（jQuery.type（elem）===“object”）{
					jQuery.merge（nodes，elem.nodeType？[elem]：elem）;

				//将非html转换为文本节点
				} else if（！rhtml.test（elem））{
					nodes.push（context.createTextNode（elem））;

				//将html转换为DOM节点
				} else {
					tmp = tmp || safe.appendChild（context.createElement（“div”））;

					//反序列化标准表示
					tag =（rtagName.exec（elem）|| [“”，“”]）[1] .toLowerCase（）;
					wrap = wrapMap [tag] || wrapMap._default;

					tmp.innerHTML = wrap [1] + elem.replace（rxhtmlTag，“<$ 1> </ $ 2>”）+ wrap [2];

					//通过包装器下降到正确的内容
					j = wrap [0];
					while（j--）{
						tmp = tmp.lastChild;
					}

					//手动添加IE删除的前导空格
					if（！jQuery.support.leadingWhitespace && rleadingWhitespace.test（elem））{
						nodes.push（context.createTextNode（rleadingWhitespace.exec（elem）[0]））;
					}

					//从表片段中删除IE的autoinserted <tbody>
					if（！jQuery.support.tbody）{

						// String是<table>，* may *有假<tbody>
						elem = tag ===“table”&&！rtbody.test（elem）？
							tmp.firstChild：

							// String是一个裸<thead>或<tfoot>
							wrap [1] ===“<table>”&&！rtbody.test（elem）？
								tmp：
								0;

						j = elem && elem.childNodes.length;
						while（j--）{
							if（jQuery.nodeName（（tbody = elem.childNodes [j]），“tbody”）&&！tbody.childNodes.length）{
								elem.removeChild（tbody）;
							}
						}
					}

					jQuery.merge（nodes，tmp.childNodes）;

					//修复＃12392 for WebKit和IE> 9
					tmp.textContent =“”;

					//修复＃12392 for oldIE
					while（tmp.firstChild）{
						tmp.removeChild（tmp.firstChild）;
					}

					//记住顶层容器以进行适当的清理
					tmp = safe.lastChild;
				}
			}
		}

		//修复＃11356：清除片段中的元素
		if（tmp）{
			safe.removeChild（tmp）;
		}

		//为任何无线电和复选框重置defaultChecked
		//即将被附加到IE 6/7中的DOM（＃8060）
		if（！jQuery.support.appendChecked）{
			jQuery.grep（getAll（nodes，“input”），fixDefaultChecked）;
		}

		i = 0;
		while（（elem = nodes [i ++]））{

			//＃4087  - 如果原始元素和目标元素相同，则为
			//那个元素，什么都不做
			if（selection && jQuery.inArray（elem，selection）！== -1）{
				继续;
			}

			contains = jQuery.contains（elem.ownerDocument，elem）;

			//附加到片段
			tmp = getAll（safe.appendChild（elem），“script”）;

			//保留脚本评估历史记录
			if（包含）{
				setGlobalEval（tmp）;
			}

			//捕获可执行文件
			if（scripts）{
				j = 0;
				while（（elem = tmp [j ++]））{
					if（rscriptType.test（elem.type ||“”））{
						scripts.push（elem）;
					}
				}
			}
		}

		tmp = null;

		返回安全;
	}，

	cleanData：function（elems，/ * internal * / acceptData）{
		var elem，type，id，data，
			i = 0，
			internalKey = jQuery.expando，
			cache = jQuery.cache，
			deleteExpando = jQuery.support.deleteExpando，
			special = jQuery.event.special;

		for（;（elem = elems [i]）！= null; i ++）{

			if（acceptData || jQuery.acceptData（elem））{

				id = elem [internalKey];
				data = id && cache [id];

				if（data）{
					if（data.events）{
						for（输入data.events）{
							if（special [type]）{
								jQuery.event.remove（elem，type）;

							//这是避免jQuery.event.remove开销的快捷方式
							} else {
								jQuery.removeEvent（elem，type，data.handle）;
							}
						}
					}

					//只有在jQuery.event.remove尚未删除缓存时才删除缓存
					if（cache [id]）{

						delete cache [id];

						// IE不允许我们从节点中删除expando属性，
						//也没有在Document节点上有removeAttribute函数;
						//我们必须处理所有这些案件
						if（deleteExpando）{
							删除elem [internalKey];

						} else if（typeof elem.removeAttribute！== core_strundefined）{
							elem.removeAttribute（internalKey）;

						} else {
							elem [internalKey] = null;
						}

						core_deletedIds.push（id）;
					}
				}
			}
		}
	}
}）;
var iframe，getStyles，curCSS，
	ralpha = / alpha \（[^]] * \）/ i，
	ropacity = / opacity \ s * = \ s *（[^]] *）/，
	rposition = / ^（top | right | bottom | left）$ /，
	//如果显示为none则可以交换，或者以“table”，“table-cell”或“table-caption”之外的表开头
	//在此处查看显示值：https：//developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = / ^ margin /，
	rnumsplit = new RegExp（“^（”+ core_pnum +“）（。*）$”，“i”），
	rnumnonpx = new RegExp（“^（”+ core_pnum +“）（?! px）[az％] + $”，“i”），
	rrelNum = new RegExp（“^（[+  - ]）=（”+ core_pnum +“）”，“i”），
	elemdisplay = {BODY：“block”}，

	cssShow = {position：“absolute”，visibility：“hidden”，display：“block”}，
	cssNormalTransform = {
		letterSpacing：0，
		fontWeight：400
	}，

	cssExpand = [“Top”，“Right”，“Bottom”，“Left”]，
	cssPrefixes = [“Webkit”，“O”，“Moz”，“ms”];

//返回映射到潜在供应商前缀属性的css属性
function vendorPropName（style，name）{

	//非供应商前缀的名称的快捷方式
	if（样式名称）{
		返回名称;
	}

	//检查供应商前缀名称
	var capName = name.charAt（0）.toUpperCase（）+ name.slice（1），
		origName = name，
		i = cssPrefixes.length;

	当我 -  ） {
		name = cssPrefixes [i] + capName;
		if（样式名称）{
			返回名称;
		}
	}

	return origName;
}

function isHidden（elem，el）{
	// isHidden可能是从jQuery＃filter函数调用的;
	//在这种情况下，element将是第二个参数
	elem = el || ELEM;
	return jQuery.css（elem，“display”）===“none”|| ！jQuery.contains（elem.ownerDocument，elem）;
}

function showHide（elements，show）{
	var display，elem，hidden，
		values = []，
		index = 0，
		length = elements.length;

	for（; index <length; index ++）{
		elem = elements [index];
		if（！elem.style）{
			继续;
		}

		values [index] = jQuery._data（elem，“olddisplay”）;
		display = elem.style.display;
		if（show）{
			//重置此元素的内联显示以了解它是否存在
			//被级联规则隐藏或不隐藏
			if（！values [index] && display ===“none”）{
				elem.style.display =“”;
			}

			//设置已使用display：none覆盖的元素
			//在样式表中，无论默认的浏览器样式是什么
			//对于这样的元素
			if（elem.style.display ===“”&& isHidden（elem））{
				values [index] = jQuery._data（elem，“olddisplay”，css_defaultDisplay（elem.nodeName））;
			}
		} else {

			if（！values [index]）{
				hidden = isHidden（elem）;

				if（display && display！==“none”||！hidden）{
					jQuery._data（elem，“olddisplay”，隐藏？display：jQuery.css（elem，“display”））;
				}
			}
		}
	}

	//在第二个循环中设置大多数元素的显示
	//避免不断的回流
	for（index = 0; index <length; index ++）{
		elem = elements [index];
		if（！elem.style）{
			继续;
		}
		if（！show || elem.style.display ===“none”|| elem.style.display ===“”）{
			elem.style.display = show？值[index] || ““ ： “没有”;
		}
	}

	返回元素;
}

1.3中（{
	css：function（name，value）{
		return jQuery.access（this，function（elem，name，value）{
			var len，styles，
				map = {}，
				i = 0;

			if（jQuery.isArray（name））{
				styles = getStyles（elem）;
				len = name.length;

				for（; i <len; i ++）{
					map [name [i]] = jQuery.css（elem，name [i]，false，styles）;
				}

				返回地图;
			}

			返回值！== undefined？
				jQuery.style（elem，name，value）：
				jQuery.css（elem，name）;
		}，name，value，arguments.length> 1）;
	}，
	show：function（）{
		return showHide（this，true）;
	}，
	hide：function（）{
		return showHide（this）;
	}，
	toggle：function（state）{
		var bool = typeof state ===“boolean”;

		return this.each（function（）{
			if（bool？state：isHidden（this））{
				jQuery（this）.show（）;
			} else {
				jQuery（this）.hide（）;
			}
		}）;
	}
}）;

jQuery.extend（{
	//添加样式属性挂钩以覆盖默认值
	//获取和设置样式属性的行为
	cssHooks：{
		不透明度：{
			get：function（elem，computed）{
				if（computed）{
					//我们应该总是从不透明度中获取一个数字
					var ret = curCSS（elem，“opacity”）;
					return ret ===“”？“1”：ret;
				}
			}
		}
	}，

	//排除以下css属性以添加px
	cssNumber：{
		“columnCount”：是的，
		“fillOpacity”：是的，
		“fontWeight”：是的，
		“lineHeight”：是的，
		“不透明”：是的，
		“孤儿”：是的，
		“寡妇”：是的，
		“zIndex”：是的，
		“缩放”：是的
	}，

	//添加以前要修复其名称的属性
	//设置或获取值
	cssProps：{
		// normalize float css属性
		“float”：jQuery.support.cssFloat？“cssFloat”：“styleFloat”
	}，

	//在DOM节点上获取并设置样式属性
	style：function（elem，name，value，extra）{
		//不要在文本和注释节点上设置样式
		if（！elem || elem.nodeType === 3 || elem.nodeType === 8 ||！elem.style）{
			返回;
		}

		//确保我们使用正确的名称
		var ret，type，hooks，
			origName = jQuery.camelCase（name），
			style = elem.style;

		name = jQuery.cssProps [origName] || （jQuery.cssProps [origName] = vendorPropName（style，origName））;

		//获取前缀版本的钩子
		//后跟未加前缀的版本
		hooks = jQuery.cssHooks [name] || jQuery.cssHooks [origName];

		//检查我们是否设置了值
		if（value！== undefined）{
			type = typeof value;

			//将相对数字字符串（+ =或 -  =）转换为相对数字。＃7345
			if（type ===“string”&&（ret = rrelNum.exec（value）））{
				value =（ret [1] + 1）* ret [2] + parseFloat（jQuery.css（elem，name））;
				//修复了错误＃9237
				type =“number”;
			}

			//确保未设置NaN和null值。见：＃7116
			if（value == null || type ===“number”&& isNaN（value））{
				返回;
			}

			//如果传入了一个数字，请将'px'添加到（某些CSS属性除外）
			if（type ===“number”&&！jQuery.cssNumber [origName]）{
				值+ =“ px”;
			}

			//修复＃8908，通过在cssHooks中指定setter，可以更正确地完成它，
			//但是它意味着定义八个（对于每个有问题的属性）相同的功能
			if（！jQuery.support.clearCloneStyle && value ===“”&& name.indexOf（“background”）=== 0）{
				style [name] =“inherit”;
			}

			//如果提供了一个钩子，请使用该值，否则只需设置指定的值
			if（！hooks ||！（挂钩中的“set”）||（value = hooks.set（elem，value，extra））！== undefined）{

				//包含以防止IE在提供“无效”值时抛出错误
				//修复了错误＃5509
				尝试{
					style [name] = value;
				} catch（e）{}
			}

		} else {
			//如果提供了一个钩子，那么从那里得到非计算值
			if（hooks &&“get”in hooks &&（ret = hooks.get（elem，false，extra））！== undefined）{
				返回;
			}

			//否则只从样式对象中获取值
			返回样式[名称];
		}
	}，

	css：function（elem，name，extra，styles）{
		var num，val，hooks，
			origName = jQuery.camelCase（name）;

		//确保我们使用正确的名称
		name = jQuery.cssProps [origName] || （jQuery.cssProps [origName] = vendorPropName（elem.style，origName））;

		//获取前缀版本的钩子
		//后跟未加前缀的版本
		hooks = jQuery.cssHooks [name] || jQuery.cssHooks [origName];

		//如果提供了一个钩子，那么从那里获取计算值
		if（hooks &&“get”in hooks）{
			val = hooks.get（elem，true，extra）;
		}

		//否则，如果存在获取计算值的方法，请使用它
		if（val === undefined）{
			val = curCSS（elem，name，styles）;
		}

		//将“normal”转换为计算值
		if（val ===“normal”&& cssNormalTransform中的name）{
			val = cssNormalTransform [name];
		}

		//返回，如果强制转换为数字或提供限定符且val看起来是数字
		if（extra ===“”|| extra）{
			num = parseFloat（val）;
			return extra === true || jQuery.isNumeric（num）？num || 0：val;
		}
		返回;
	}，

	//一种快速交换/输出CSS属性以获得正确计算的方法
	swap：function（elem，options，callback，args）{
		var ret，name，
			old = {};

		//记住旧值，然后插入新值
		for（选项中的名称）{
			old [name] = elem.style [name];
			elem.style [name] = options [name];
		}

		ret = callback.apply（elem，args || []）;

		//恢复旧值
		for（选项中的名称）{
			elem.style [name] = old [name];
		}

		返回;
	}
}）;

//注意：我们在window.getComputedStyle中包含了“window”
//因为node.js上的jsdom会在没有它的情况下中断。
if（window.getComputedStyle）{
	getStyles = function（elem）{
		return window.getComputedStyle（elem，null）;
	};

	curCSS = function（elem，name，_computed）{
		var width，minWidth，maxWidth，
			computed = _computed || getStyles（elem），

			//只有IE9中的.css（'filter'）才需要getPropertyValue，参见＃12537
			ret =计算？computed.getPropertyValue（name）|| computed [name]：undefined，
			style = elem.style;

		if（computed）{

			if（ret ===“”&&！jQuery.contains（elem.ownerDocument，elem））{
				ret = jQuery.style（elem，name）;
			}

			//致敬Dean Edwards“令人敬畏的黑客”
			// Chrome <17和Safari 5.0使用“计算值”而非“使用价值”作为保证金权利
			// Safari 5.1.7（至少）返回一组较大值的百分比，但宽度似乎是可靠的像素
			//这违反了CSSOM草案规范：http：//dev.w3.org/csswg/cssom/#resolved-values
			if（rnumnonpx.test（ret）&& rmargin.test（name））{

				//记住原始值
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				//输入新值以获取计算值
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				//恢复更改的值
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		返回;
	};
} else if（document.documentElement.currentStyle）{
	getStyles = function（elem）{
		return elem.currentStyle;
	};

	curCSS = function（elem，name，_computed）{
		var left，rs，rsLeft，
			computed = _computed || getStyles（elem），
			ret =计算？computed [name]：undefined，
			style = elem.style;

		//避免在此处将ret设置为空字符串
		//所以我们不默认为auto
		if（ret == null && style && style [name]）{
			ret = style [name];
		}

		//来自Dean Edwards的精彩黑客
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		//如果我们不处理常规像素数
		//但是数字有一个奇怪的结尾，我们需要将其转换为像素
		//但不是位置css属性，因为它们与父元素成比例
		//而我们无法衡量父母，因为它可能会触发“堆叠玩偶”问题
		if（rnumnonpx.test（ret）&&！rposition.test（name））{

			//记住原始值
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			//输入新值以获取计算值
			if（rsLeft）{
				rs.left = elem.currentStyle.left;
			}
			style.left = name ===“fontSize”？“1em”：ret;
			ret = style.pixelLeft +“px”;

			//恢复更改的值
			style.left = left;
			if（rsLeft）{
				rs.left = rsLeft;
			}
		}

		return ret ===“”？“自动”：ret;
	};
}

function setPositiveNumber（elem，value，subtract）{
	var matches = rnumsplit.exec（value）;
	回归比赛？
		//防止未定义的“减去”，例如，在cssHooks中使用时
		Math.max（0，匹配[1]  - （减去|| 0））+（匹配[2] ||“px”）：
		值;
}

function augmentWidthOrHeight（elem，name，extra，isBorderBox，styles）{
	var i = extra ===（isBorderBox？“border”：“content”）？
		//如果我们已经有了正确的测量，请避免增加
		4：
		//否则初始化水平或垂直属性
		name ===“width”？1：0，

		val = 0;

	for（; i <4; i + = 2）{
		//两个盒子模型都不包括边距，所以如果我们需要，请添加它
		if（extra ===“margin”）{
			val + = jQuery.css（elem，extra + cssExpand [i]，true，styles）;
		}

		if（isBorderBox）{
			// border-box包含填充，如果我们想要内容，请将其删除
			if（extra ===“content”）{
				val  -  = jQuery.css（elem，“padding”+ cssExpand [i]，true，styles）;
			}

			//此时，额外不是边框也不是边距，因此请删除边框
			if（extra！==“margin”）{
				val  -  = jQuery.css（elem，“border”+ cssExpand [i] +“Width”，true，styles）;
			}
		} else {
			//此时，extra不是content，所以添加填充
			val + = jQuery.css（elem，“padding”+ cssExpand [i]，true，styles）;

			//此时，extra不是content也不是padding，所以添加border
			if（extra！==“padding”）{
				val + = jQuery.css（elem，“border”+ cssExpand [i] +“Width”，true，styles）;
			}
		}
	}

	返回;
}

function getWidthOrHeight（elem，name，extra）{

	//以offset属性开头，它相当于border-box值
	var valueIsBorderBox = true，
		val = name ===“width”？elem.offsetWidth：elem.offsetHeight，
		styles = getStyles（elem），
		isBorderBox = jQuery.support.boxSizing && jQuery.css（elem，“boxSizing”，false，styles）===“border-box”;

	//一些非html元素为offsetWidth返回undefined，所以检查null / undefined
	// svg  -  https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML  -  https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if（val <= 0 || val == null）{
		//如果需要，回退到计算然后未计算的css
		val = curCSS（elem，name，styles）;
		if（val <0 || val == null）{
			val = elem.style [name];
		}

		//计算单位不是像素。停在这里然后回来。
		if（rnumnonpx.test（val））{
			返回;
		}

		//如果浏览器返回不可靠的值，我们需要检查样式
		//为getComputedStyle默默地回归到可靠的elem.style
		valueIsBorderBox = isBorderBox &&（jQuery.support.boxSizingReliable || val === elem.style [name]）;

		//标准化“”，自动，并准备额外的
		val = parseFloat（val）|| 0;
	}

	//使用活动的box-sizing模型来添加/减去不相关的样式
	回归（val +
		augmentWidthOrHeight（
			ELEM，
			名称，
			额外的|| （isBorderBox？“border”：“content”），
			valueIsBorderBox，
			款式
		）
	）+“px”;
}

//尝试确定元素的默认显示值
function css_defaultDisplay（nodeName）{
	var doc = document，
		display = elemdisplay [nodeName];

	if（！display）{
		display = actualDisplay（nodeName，doc）;

		//如果简单方法失败，请从iframe内部读取
		if（display ===“none”||！display）{
			//如果可能，请使用已创建的iframe
			iframe =（iframe ||
				jQuery（“<iframe frameborder ='0'width ='0'height ='0'/>”）
				.css（“cssText”，“display：block！important”）
			）.appendTo（doc.documentElement）;

			//总是编写一个新的HTML框架，以便Webkit和Firefox不会重复使用
			doc =（iframe [0] .contentWindow || iframe [0] .contentDocument）.document;
			doc.write（“<！doctype html> <html> <body>”）;
			doc.close（）;

			display = actualDisplay（nodeName，doc）;
			iframe.detach（）;
		}

		//存储正确的默认显示
		elemdisplay [nodeName] = display;
	}

	返回显示;
}

//仅在css_defaultDisplay中调用
function actualDisplay（name，doc）{
	var elem = jQuery（doc.createElement（name））。appendTo（doc.body），
		display = jQuery.css（elem [0]，“display”）;
	elem.remove（）;
	返回显示;
}

jQuery.each（[“height”，“width”]，function（i，name）{
	jQuery.cssHooks [name] = {
		get：function（elem，computed，extra）{
			if（computed）{
				//如果我们无形地显示它们，某些元素可以有维度信息
				//但是，它必须具有可从中受益的当前显示样式
				return elem.offsetWidth === 0 && rdisplayswap.test（jQuery.css（elem，“display”））？
					jQuery.swap（elem，cssShow，function（）{
						return getWidthOrHeight（elem，name，extra）;
					}）：
					getWidthOrHeight（elem，name，extra）;
			}
		}，

		set：function（elem，value，extra）{
			var styles = extra && getStyles（elem）;
			return setPositiveNumber（elem，value，extra？
				augmentWidthOrHeight（
					ELEM，
					名称，
					额外，
					jQuery.support.boxSizing && jQuery.css（elem，“boxSizing”，false，styles）===“border-box”，
					款式
				）：0
			）;
		}
	};
}）;

if（！jQuery.support.opacity）{
	jQuery.cssHooks.opacity = {
		get：function（elem，computed）{
			// IE使用过滤器进行不透明度
			return ropacity.test（（computed && elem.currentStyle？elem.currentStyle.filter：elem.style.filter）||“”）？
				（0.01 * parseFloat（RegExp。$ 1））+“”：
				计算？“1”：“”;
		}，

		set：function（elem，value）{
			var style = elem.style，
				currentStyle = elem.currentStyle，
				opacity = jQuery.isNumeric（value）？“alpha（opacity =”+ value * 100 +“）”：“”，
				filter = currentStyle && currentStyle.filter || style.filter || “”;

			//如果没有布局，IE浏览器会出现不透明问题
			//通过设置缩放级别强制它
			style.zoom = 1;

			//如果将不透明度设置为1，并且不存在其他过滤器 - 尝试删除过滤器属性＃6652
			//如果值===“”，则删除内联不透明度＃12685
			if（（value> = 1 || value ===“”）&&
					jQuery.trim（filter.replace（ralpha，“”））===“”&&
					style.removeAttribute）{

				//将style.filter设置为null，“”和“”仍然在cssText中留下“filter：”
				//如果“filter：”完全存在，则clearType被禁用，我们希望避免这种情况
				// style.removeAttribute是IE Only，但显然是这段代码路径......
				style.removeAttribute（“filter”）;

				//如果在css规则中没有应用过滤器样式或取消设置内联不透明度，我们就完成了
				if（value ===“”|| currentStyle &&！currentStyle.filter）{
					返回;
				}
			}

			//否则，设置新的过滤器值
			style.filter = ralpha.test（过滤器）？
				filter.replace（ralpha，opacity）：
				过滤+“”+不透明度;
		}
	};
}

//在DOM准备好之前，无法添加这些钩子，因为支持测试
//因为它在DOM准备好之后才会运行
jQuery（function（）{
	if（！jQuery.support.reliableMarginRight）{
		jQuery.cssHooks.marginRight = {
			get：function（elem，computed）{
				if（computed）{
					// WebKit Bug 13343  -  getComputedStyle为margin-right返回错误的值
					//通过临时将元素显示设置为内联块来解决此问题
					return jQuery.swap（elem，{“display”：“inline-block”}，
						curCSS，[elem，“marginRight”]）;
				}
			}
		};
	}

	// Webkit bug：https：//bugs.webkit.org/show_bug.cgi？id = 29084
	// getComputedStyle在为top / left / bottom / right指定时返回百分比
	//而不是让css模块依赖于偏移模块，我们只是在这里检查它
	if（！jQuery.support.pixelPosition && jQuery.fn.position）{
		jQuery.each（[“top”，“left”]，function（i，prop）{
			jQuery.cssHooks [prop] = {
				get：function（elem，computed）{
					if（computed）{
						computed = curCSS（elem，prop）;
						//如果curCSS返回百分比，则回退到偏移量
						return rnumnonpx.test（computed）？
							jQuery（elem）.position（）[prop] +“px”：
							计算;
					}
				}
			};
		}）;
	}

}）;

if（jQuery.expr && jQuery.expr.filters）{
	jQuery.expr.filters.hidden = function（elem）{
		//支持：Opera <= 12.12
		// Opera在某些元素上报告offsetWidths和offsetHeights小于零
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
			（！jQuery.support.reliableHiddenOffsets &&（（elem.style && elem.style.display）|| jQuery.css（elem，“display”））===“none”）;
	};

	jQuery.expr.filters.visible = function（elem）{
		return！jQuery.expr.filters.hidden（elem）;
	};
}

//动画使用这些钩子来扩展属性
jQuery.each（{
	保证金：“”，
	填充：“”，
	边框：“宽度”
}，function（prefix，suffix）{
	jQuery.cssHooks [prefix + suffix] = {
		expand：function（value）{
			var i = 0，
				expanded = {}，

				//如果不是字符串，则假定一个数字
				parts = typeof value ===“string”？value.split（“”）：[value];

			for（; i <4; i ++）{
				expanded [prefix + cssExpand [i] + suffix] =
					部分[i] || 零件[i  -  2] || 零件[0];
			}

			回归扩大;
		}
	};

	if（！rmargin.test（prefix））{
		jQuery.cssHooks [prefix + suffix] .set = setPositiveNumber;
	}
}）;
var r20 = /％20 / g，
	rbracket = / \ [\] $ /，
	rCRLF = / \ r？\ n / g，
	rsubmitterTypes = / ^（？：submit | button | image | reset | file）$ / i，
	rsubmittable = / ^（？：input | select | textarea | keygen）/ i;

1.3中（{
	serialize：function（）{
		return jQuery.param（this.serializeArray（））;
	}，
	serializeArray：function（）{
		return this.map（function（）{
			//可以为“元素”添加propHook来过滤或添加表单元素
			var elements = jQuery.prop（this，“elements”）;
			返回元素？jQuery.makeArray（elements）：this;
		}）
		.filter（函数（）{
			var type = this.type;
			//使用.is（“：disabled”）以使fieldset [disabled]起作用
			return this.name &&！jQuery（this）.is（“：disabled”）&&
				rsubmittable.test（this.nodeName）&&！rsubmitterTypes.test（type）&&
				（this.checked ||！manipulation_rcheckableType.test（type））;
		}）
		.map（function（i，elem）{
			var val = jQuery（this）.val（）;

			return val == null？
				空值 ：
				jQuery.isArray（val）？
					jQuery.map（val，function（val）{
						return {name：elem.name，value：val.replace（rCRLF，“\ r \ n”）};
					}）：
					{name：elem.name，value：val.replace（rCRLF，“\ r \ n”）};
		}）。得到（）;
	}
}）;

//序列化一个表单元素数组或一组表单元素
//键/值到查询字符串中
jQuery.param = function（a，traditional）{
	var前缀，
		s = []，
		add = function（key，value）{
			//如果value是一个函数，则调用它并返回其值
			value = jQuery.isFunction（value）？value（）:( value == null？“”：value）;
			s [s.length] = encodeURIComponent（key）+“=”+ encodeURIComponent（value）;
		};

	//将jQuery <= 1.3.2行为的传统设置为true。
	if（传统=== undefined）{
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	//如果传入了一个数组，则假定它是一个表单元素数组。
	if（jQuery.isArray（a）||（a.jquery &&！jQuery.isPlainObject（a）））{
		//序列化表单元素
		jQuery.each（a，function（）{
			add（this.name，this.value）;
		}）;

	} else {
		//如果是传统方式，则编码“旧”方式（1.3.2或更旧的方式）
		//做了它，否则递归编码params。
		for（a中的前缀）{
			buildParams（前缀，[前缀]，繁体，添加）;
		}
	}

	//返回结果序列化
	return s.join（“＆”）.replace（r20，“+”）;
};

function buildParams（prefix，obj，traditional，add）{
	var name;

	if（jQuery.isArray（obj））{
		//序列化数组项。
		jQuery.each（obj，function（i，v）{
			if（traditional || rbracket.test（prefix））{
				//将每个数组项视为标量。
				add（prefix，v）;

			} else {
				// Item是非标量（数组或对象），编码其数字索引。
				buildParams（前缀+“[”+（typeof v ===“object”？i：“”）+“]”，v，traditional，add）;
			}
		}）;

	} else if（！traditional && jQuery.type（obj）===“object”）{
		//序列化对象项。
		for（obj中的名字）{
			buildParams（前缀+“[”+ name +“]”，obj [name]，繁体，添加）;
		}

	} else {
		//序列化标量项。
		add（prefix，obj）;
	}
}
jQuery.each（（“blur focus focusin focusout load resize scroll unload click dblclick”+
	“mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave”+
	“更改选择提交keydown keypress keyup error contextmenu”）。split（“”），function（i，name）{

	//处理事件绑定
	jQuery.fn [name] = function（data，fn）{
		return arguments.length> 0？
			this.on（name，null，data，fn）：
			this.trigger（名字）;
	};
}）;

jQuery.fn.hover = function（fnOver，fnOut）{
	return this.mouseenter（fnOver）.mouseleave（fnOut || fnOver）;
};
VAR
	//文档位置
	ajaxLocParts，
	ajaxLocation，
	ajax_nonce = jQuery.now（），

	ajax_rquery = / \？/，
	rhash = /#.*$/,
	rts = /（[？＆]）_ = [^＆] * /，
	rheaders = / ^（。*？）：[\ t] *（[^ \ r \ n] *）\ r？$ / mg，// IE在EOL留下\ r \ n字符
	//＃7653，＃8125，＃8152：本地协议检测
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res | widget）：$ /，
	rnoContent = / ^（？：GET | HEAD）$ /，
	rprotocol = / ^ \ / \ //，
	rurl = /^([\w.+-]+：）（？：\ / / /（[^] /？＃：] *）（？：:( \ dd +）|）|）/，

	//保留旧加载方法的副本
	_load = jQuery.fn.load，

	/ *预过滤器
	 * 1）它们对于引入自定义数据类型很有用（有关示例，请参阅ajax / jsonp.js）
	 * 2）这些被称为：
	 *  - 在要求运输之前
	 *  - 参数序列化后（如果s.processData为true，则s.data为字符串）
	 * 3）key是dataType
	 * 4）可以使用catchall符号“*”
	 * 5）执行将以transport dataType开始，如果需要，则继续执行“*”
	 * /
	prefilters = {}，

	/ *传输绑定
	 * 1）key是dataType
	 * 2）可以使用catchall符号“*”
	 * 3）选择将以transport dataType开始，然后如果需要则转到“*”
	 * /
	transports = {}，

	//避免使用comment-prolog char序列（＃10098）; 必须安抚棉绒并避免压缩
	allTypes =“* /”。concat（“*”）;

//＃8138，IE访问时可能会抛出异常
//如果已设置document.domain，则来自window.location的字段
尝试{
	ajaxLocation = location.href;
} catch（e）{
	//使用A元素的href属性
	//因为IE会在给定document.location的情况下修改它
	ajaxLocation = document.createElement（“a”）;
	ajaxLocation.href =“”;
	ajaxLocation = ajaxLocation.href;
}

//将位置划分为多个部分
ajaxLocParts = rurl.exec（ajaxLocation.toLowerCase（））|| [];

//用于jQuery.ajaxPrefilter和jQuery.ajaxTransport的基础“构造函数”
function addToPrefiltersOrTransports（structure）{

	// dataTypeExpression是可选的，默认为“*”
	return函数（dataTypeExpression，func）{

		if（typeof dataTypeExpression！==“string”）{
			func = dataTypeExpression;
			dataTypeExpression =“*”;
		}

		var dataType，
			i = 0，
			dataTypes = dataTypeExpression.toLowerCase（）。match（core_rnotwhite）|| [];

		if（jQuery.isFunction（func））{
			//对于dataTypeExpression中的每个dataType
			while（（dataType = dataTypes [i ++]））{
				//如果请求前置
				if（dataType [0] ===“+”）{
					dataType = dataType.slice（1）|| “*”;
					（structure [dataType] = structure [dataType] || []）。unshift（func）;

				//否则追加
				} else {
					（structure [dataType] = structure [dataType] || []）。push（func）;
				}
			}
		}
	};
}

//预滤器和运输的基本检查功能
function inspectPrefiltersOrTransports（structure，options，originalOptions，jqXHR）{

	var检查= {}，
		seekingTransport =（结构===运输）;

	function inspect（dataType）{
		var选择;
		检查[dataType] = true;
		jQuery.each（structure [dataType] || []，function（_，prefilterOrFactory）{
			var dataTypeOrTransport = prefilterOrFactory（options，originalOptions，jqXHR）;
			if（typeof dataTypeOrTransport ===“string”&&！seekingTransport &&！inspectpected [dataTypeOrTransport]）{
				options.dataTypes.unshift（dataTypeOrTransport）;
				inspect（dataTypeOrTransport）;
				返回虚假;
			} else if（seekingTransport）{
				return！（selected = dataTypeOrTransport）;
			}
		}）;
		返回选中;
	}

	return inspect（options.dataTypes [0]）|| ！检查[“*”] && inspect（“*”）;
}

// ajax选项的特殊扩展
//采取“平坦”选项（不要深度扩展）
//修复＃9887
function ajaxExtend（target，src）{
	var deep，key，
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for（key in src）{
		if（src [key]！== undefined）{
			（flatOptions [key]？target :( deep ||（deep = {}）））[key] = src [key];
		}
	}
	if（deep）{
		jQuery.extend（true，target，deep）;
	}

	回归目标;
}

jQuery.fn.load = function（url，params，callback）{
	if（typeof url！==“string”&& _load）{
		return _load.apply（this，arguments）;
	}

	var选择器，响应，类型，
		自我=这个，
		off = url.indexOf（“”）;

	if（off> = 0）{
		selector = url.slice（off，url.length）;
		url = url.slice（0，off）;
	}

	//如果它是一个功能
	if（jQuery.isFunction（params））{

		//我们假设这是回调
		callback = params;
		params = undefined;

	//否则，构建一个参数字符串
	} else if（params && typeof params ===“object”）{
		type =“POST”;
	}

	//如果我们要修改元素，请发出请求
	if（self.length> 0）{
		jQuery.ajax（{
			网址：网址

			//如果“type”变量未定义，则使用“GET”方法
			类型：类型，
			dataType：“html”，
			数据：params
		完成（function（responseText）{

			//保存响应以用于完整回调
			response = arguments;

			self.html（选择器？

				//如果指定了选择器，请在虚拟div中找到正确的元素
				//排除脚本以避免IE'权限被拒绝'错误
				jQuery（“<div>”）。append（jQuery.parseHTML（responseText））。find（selector）：

				//否则使用完整结果
				responseText）;

		}）。完成（回调&&函数（jqXHR，status）{
			self.each（callback，response || [jqXHR.responseText，status，jqXHR]）;
		}）;
	}

	归还这个;
};

//附加一堆函数来处理常见的AJAX事件
jQuery.each（[“ajaxStart”，“ajaxStop”，“ajaxComplete”，“ajaxError”，“ajaxSuccess”，“ajaxSend”]，function（i，type）{
	jQuery.fn [type] = function（fn）{
		return this.on（type，fn）;
	};
}）;

jQuery.each（[“get”，“post”]，function（i，method）{
	jQuery [method] = function（url，data，callback，type）{
		//如果省略data参数，则移位参数
		if（jQuery.isFunction（data））{
			type = type || 打回来;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax（{
			网址：网址
			类型：方法，
			dataType：type，
			数据：数据，
			成功：回调
		}）;
	};
}）;

jQuery.extend（{

	//用于保存活动查询数的计数器
	活跃：0，

	//下次请求的Last-Modified标头缓存
	最后修改： {}，
	etag：{}，

	ajaxSettings：{
		url：ajaxLocation，
		类型：“GET”，
		isLocal：rlocalProtocol.test（ajaxLocParts [1]），
		全球：真的，
		processData：true，
		async：true，
		contentType：“application / x-www-form-urlencoded; charset = UTF-8”，
		/ *
		超时：0，
		数据：null，
		dataType：null，
		用户名：null，
		密码：null，
		cache：null，
		抛出：假，
		传统的：假的，
		标题：{}，
		* /

		接受：{
			“*“： 所有类型，
			文字：“text / plain”，
			html：“text / html”，
			xml：“application / xml，text / xml”，
			json：“application / json，text / javascript”
		}，

		内容：{
			xml：/ xml /，
			html：/ html /，
			json：/ json /
		}，

		responseFields：{
			xml：“responseXML”，
			文字：“responseText”
		}，

		//数据转换器
		//使用单个空格键分隔源（或catchall“*”）和目标类型
		转换器：{

			//将任何内容转换为文本
			“* text”：window.String，

			//文本到html（true =没有转换）
			“text html”：是的，

			//将文本评估为json表达式
			“text json”：jQuery.parseJSON，

			//将文本解析为xml
			“text xml”：jQuery.parseXML
		}，

		//对于不应深度扩展的选项：
		//如果你可以在这里添加自己的自定义选项
		//当你创建一个不应该的
		//深度扩展（参见ajaxExtend）
		flatOptions：{
			url：是的，
			上下文：是的
		}
	}，

	//将完整的成熟设置对象创建到目标中
	//同时具有ajaxSettings和设置字段。
	//如果省略target，则写入ajaxSettings。
	ajaxSetup：function（target，settings）{
		返回设置？

			//构建设置对象
			ajaxExtend（ajaxExtend（target，jQuery.ajaxSettings），设置）：

			//扩展ajaxSettings
			ajaxExtend（jQuery.ajaxSettings，target）;
	}，

	ajaxPrefilter：addToPrefiltersOrTransports（prefilters），
	ajaxTransport：addToPrefiltersOrTransports（transports），

	//主要方法
	ajax：function（url，options）{

		//如果url是一个对象，则模拟1.5之前的签名
		if（typeof url ===“object”）{
			options = url;
			url = undefined;
		}

		//强制选项成为对象
		options = options || {};

		var //跨域检测变量
			部分，
			//循环变量
			一世，
			//没有反缓存参数的URL
			cacheURL，
			//响应标头为字符串
			responseHeadersString，
			//超时句柄
			timeoutTimer，

			//知道是否要调度全局事件
			fireGlobals，

			运输，
			//响应标头
			responseHeaders响应，
			//创建最终选项对象
			s = jQuery.ajaxSetup（{}，options），
			//回调上下文
			callbackContext = s.context || S，
			//全局事件的上下文是callbackContext，如果它是DOM节点或jQuery集合
			globalEventContext = s.context &&（callbackContext.nodeType || callbackContext.jquery）？
				jQuery（callbackContext）：
				jQuery.event，
			//延期
			deferred = jQuery.Deferred（），
			completeDeferred = jQuery.Callbacks（“一次内存”），
			//依赖于状态的回调
			statusCode = s.statusCode || {}，
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 ) {
					isSuccess = true;
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					isSuccess = true;
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	}
});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {
	var conv2, current, conv, tmp,
		converters = {},
		i = 0,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ];

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function() {
		// Abort all pending requests
		var key;
		for ( key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	};

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( err ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, responseHeaders, statusText, responses;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1,
				maxIterations = 20;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var value, name, index, easing, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/*jshint validthis:true */
	var prop, index, length,
		value, dataShow, toggle,
		tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( "hidden" in dataShow ) {
			hidden = dataShow.hidden;
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );
				doAnimation.finish = function() {
					anim.stop( true );
				};
				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.cur && hooks.cur.finish ) {
				hooks.cur.finish.call( this );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.documentElement;
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.documentElement;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// })();
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

