export interface IOptions {
	speed?: number;
	curvature?: number;
	progress?: () => void;
	complete?: () => void;
	[key: string]: any;
}

export interface Coordinate {
	x: number;
	y: number;
}


export interface Parabola {
	mark: Function;
	position: Function;
	move: () => Parabola;
	init: () => Parabola;
}

/**
 * 
 * @param element 移动的元素
 * @param target 目的地元素
 * @param options 配置项
 * @returns 
 */
export const funParabola = function (element: HTMLElement, target: HTMLElement, options: IOptions) {
	/*
	 * 网页模拟现实需要一个比例尺
	 * 如果按照1像素就是1米来算，显然不合适，因为页面动不动就几百像素
	 * 页面上，我们放两个物体，200~800像素之间，我们可以映射为现实世界的2米到8米，也就是100:1
	 * 不过，本方法没有对此有所体现，因此不必在意
	*/

	const defaults: IOptions = {
		speed: 166.67, // 每帧移动的像素大小，每帧（对于大部分显示屏）大约16~17毫秒
		curvature: 0.001,  // 实际指焦点到准线的距离，你可以抽象成曲率，这里模拟扔物体的抛物线，因此是开口向下的
		progress: function () { },
		complete: function () { }
	};

	/**
	 * params = 传入的配置项 & 默认的配置项 (好处在于防止默认的配置项被污染);
	 */
	const params: (IOptions | any) = {};
	options = options || {};


	for (let key in defaults) {
		params[key] = options[key] || defaults[key];
	}

	var exports = {
		mark: function () { return this; },
		position: function () { return this; },
		move: function () { return this; },
		init: function () { return this; }
	};

	/* 确定移动的方式 
	 * IE6-IE8 是margin位移
	 * IE9+使用transform
	*/
	let moveStyle: string = "margin";
	const testDiv = document.createElement("div");
	if ("oninput" in testDiv) { // 区分IE9 还是IE9以下
		["", "ms", "webkit"].forEach(function (prefix) { // transform兼容处理
			const transform = prefix + (prefix ? "T" : "t") + "ransform";
			if (transform in testDiv.style) {
				moveStyle = transform;
			}
		});
	}

	// 根据两点坐标以及曲率确定运动曲线函数（也就是确定a, b的值）
	/* 公式： y = a*x*x + b*x + c;
	*/
	const a = params.curvature;
	let b = 0;

	// 是否执行运动的标志量
	let flagMove = true;

	if (element && target && element.nodeType === 1 && target.nodeType === 1) {

		let rectElement: any;
		let rectTarget: any;

		// 移动元素的中心点位置，目标元素的中心点位置
		let centerElement: Coordinate;
		let centerTarget: Coordinate;

		// 目标元素的坐标位置
		let coordElement: Coordinate;
		let coordTarget: Coordinate;

		// 标注当前元素的坐标
		exports.mark = function () {
			if (flagMove === false) return this;
			if (!coordElement || !coordElement.x) this.position();
			element.setAttribute("data-center", [coordElement.x, coordElement.y].join());
			target.setAttribute("data-center", [coordTarget.x, coordTarget.y].join());
			return this;
		};

		exports.position = function () {
			if (flagMove === false) return this;

			const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
			const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

			// 初始位置
			if (moveStyle === "margin") {
				element.style.marginLeft = "0px";
				element.style.marginTop = "0px";
			} else {
				element.style[(moveStyle as any)] = "translate(0, 0)";
			}

			// 四边缘的坐标
			rectElement = element.getBoundingClientRect();
			rectTarget = target.getBoundingClientRect();


			// 移动元素的中心点坐标
			centerElement = {
				x: rectElement.left + (rectElement.right - rectElement.left) / 2 + scrollLeft,
				y: rectElement.top + (rectElement.bottom - rectElement.top) / 2 + scrollTop,
			};

			// 目标元素的中心点位置
			centerTarget = {
				x: rectTarget.left + (rectTarget.right - rectTarget.left) / 2 + scrollLeft,
				y: rectTarget.top + (rectTarget.bottom - rectTarget.top) / 2 + scrollTop,
			};


			// 转换成相对坐标位置
			coordElement = {
				x: 0,
				y: 0,
			};

			coordTarget = {
				x: -1 * ((centerElement.x - centerTarget.x) === 0 ? 0.0001 : centerElement.x - centerTarget.x),
				y:  -1 * (centerElement.y - centerTarget.y)	
			};

			/*
			 * 因为经过(0, 0), 因此c = 0
			 * 于是：
			 * y = a * x*x + b*x;
			 * y1 = a * x1*x1 + b*x1;
			 * y2 = a * x2*x2 + b*x2;
			 * 利用第二个坐标：
			 * b = (y2+ a*x2*x2) / x2
			*/
			// 于是
			b = (coordTarget.y - a * coordTarget.x * coordTarget.x) / coordTarget.x;

			return this;
		};

		// 按照这个曲线运动
		exports.move = function () {
			// 如果曲线运动还没有结束，不再执行新的运动
			if (flagMove === false) return this;

			let startx = 0;
			const rate = coordTarget.x > 0 ? 1 : -1;

			const step = function () {
				// 切线 y'=2ax+b
				const tangent = 2 * a * startx + b;
				// 下面是根据确定的移动速度，得到当前切线下x也就是水平方向移动的大小
				// 已知两点之间的距离为
				// Math.sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1));
				// 因此应当是
				// Math.sqrt(△x*△x + △y*△y) = speed
				// 因为写这段代码的时候，脑子不在线，所以，根号忘记了
				// 就套用了下面的公式（导致很多小伙伴不理解，这里说声抱歉）
				// 不过对于大功能并不影响，就是这个speed参数值有些大，哈哈
				// y*y + x*x = speed
				// (tangent * x)^2 + x*x = speed
				// x = Math.sqr(speed / (tangent * tangent + 1));
				startx += rate * Math.sqrt(params.speed / (tangent * tangent + 1));

				// 防止过界
				if ((rate === 1 && startx > coordTarget.x) || (rate === -1 && startx < coordTarget.x)) {
					startx = coordTarget.x;
				}
				const x = startx;
				const y = a * x * x + b * x;
				// 标记当前位置，这里有测试使用的嫌疑，实际使用可以将这一行注释
				element.setAttribute("data-center", [Math.round(x), Math.round(y)].join());

				// x, y目前是坐标，需要转换成定位的像素值
				if (moveStyle === "margin") {
					element.style.marginLeft = x + "px";
					element.style.marginTop = y + "px";
				} else {
					element.style[(moveStyle as any)] = `translate(${x}px,${y}px)`;
				}

				if (startx !== coordTarget.x) {
					params.progress(x, y);
					window.requestAnimationFrame(step);
				} else {
					// 运动结束，回调执行
					params.complete();
					flagMove = true;
				}
			};
			window.requestAnimationFrame(step);
			flagMove = false;

			return this;
		};

		// 初始化方法
		exports.init = function () {
			this.position().mark().move();
			return this;
		};
	}

	return exports;
};



(function () {
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = (window as any)[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = (window as any)[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
			(window as any)[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) {
		(window as any).requestAnimationFrame = function (callback: Function) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
			var id = window.setTimeout(function () {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
	}
}());



/**
   var funDrag = function (element, callback) {
		callback = callback || function () { };
		var params = {
			left: 0,
			top: 0,
			currentX: 0,
			currentY: 0,
			flag: false
		};
		//获取相关CSS属性
		var getCss = function (o, key) {
			return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
		};

		//拖拽的实现
		if (getCss(element, "left") !== "auto") {
			params.left = getCss(element, "left");
		}
		if (getCss(element, "top") !== "auto") {
			params.top = getCss(element, "top");
		}
		//o是移动对象
		element.onmousedown = function (event) {
			params.flag = true;
			event = event || window.event;
			params.currentX = event.clientX;
			params.currentY = event.clientY;
		};
		document.onmouseup = function () {
			params.flag = false;
			if (getCss(element, "left") !== "auto") {
				params.left = getCss(element, "left");
			}
			if (getCss(element, "top") !== "auto") {
				params.top = getCss(element, "top");
			}
			callback();
		};
		document.onmousemove = function (event) {
			event = event || window.event;
			if (params.flag) {
				var nowX = event.clientX, nowY = event.clientY;
				var disX = nowX - params.currentX, disY = nowY - params.currentY;
				element.style.left = parseInt(params.left) + disX + "px";
				element.style.top = parseInt(params.top) + disY + "px";
			}
		}
	};



	var element = document.getElementById("element"), target = document.getElementById("target");

	// 抛物线元素的的位置标记
	var parabola = funParabola(element, target).mark();
	//拖拽
	funDrag(target);
	// 抛物线运动的触发
	document.body.onclick = function () {
		element.style.marginLeft = "0px";
		element.style.marginTop = "0px";
		// parabola.init();
		funParabola(element, target).mark().init();
	};

 */