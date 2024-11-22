import { r as reactExports, ai as useResponsiveObserver, aj as useLayoutEffect, d as _slicedToArray, V as canUseDom, k as _typeof, n as _objectSpread2, b as _objectWithoutProperties, _ as _extends, c as classNames, ak as presetPrimaryColors, T as Tooltip, g as genStyleHooks, m as merge, f as resetComponent, h as unit, s as Keyframe, C as ConfigContext, al as omit, x as CloseCircleFilled, z as CloseOutlined, w as CheckCircleFilled, am as CheckOutlined, e as _defineProperty, K as KeyCode, R as React, an as textEllipsis, ao as genFocusOutline, ap as toArray$1, aq as useSize, F as Form, N as NiceForm, a as jsx, j as jsxs, B as Button } from "./index-e5f2dcb2.js";
function useForceUpdate() {
  const [, forceUpdate] = reactExports.useReducer((x) => x + 1, 0);
  return forceUpdate;
}
function useBreakpoint() {
  let refreshOnChange = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
  const screensRef = reactExports.useRef({});
  const forceUpdate = useForceUpdate();
  const responsiveObserver = useResponsiveObserver();
  useLayoutEffect(() => {
    const token = responsiveObserver.subscribe((supportScreens) => {
      screensRef.current = supportScreens;
      if (refreshOnChange) {
        forceUpdate();
      }
    });
    return () => responsiveObserver.unsubscribe(token);
  }, []);
  return screensRef.current;
}
var defaultProps = {
  percent: 0,
  prefixCls: "rc-progress",
  strokeColor: "#2db7f5",
  strokeLinecap: "round",
  strokeWidth: 1,
  trailColor: "#D9D9D9",
  trailWidth: 1,
  gapPosition: "bottom"
};
var useTransitionDuration = function useTransitionDuration2() {
  var pathsRef = reactExports.useRef([]);
  var prevTimeStamp = reactExports.useRef(null);
  reactExports.useEffect(function() {
    var now = Date.now();
    var updated = false;
    pathsRef.current.forEach(function(path) {
      if (!path) {
        return;
      }
      updated = true;
      var pathStyle = path.style;
      pathStyle.transitionDuration = ".3s, .3s, .3s, .06s";
      if (prevTimeStamp.current && now - prevTimeStamp.current < 100) {
        pathStyle.transitionDuration = "0s, 0s";
      }
    });
    if (updated) {
      prevTimeStamp.current = Date.now();
    }
  });
  return pathsRef.current;
};
var uuid = 0;
var isBrowserClient = canUseDom();
function getUUID() {
  var retId;
  if (isBrowserClient) {
    retId = uuid;
    uuid += 1;
  } else {
    retId = "TEST_OR_SSR";
  }
  return retId;
}
const useId = function(id) {
  var _React$useState = reactExports.useState(), _React$useState2 = _slicedToArray(_React$useState, 2), innerId = _React$useState2[0], setInnerId = _React$useState2[1];
  reactExports.useEffect(function() {
    setInnerId("rc_progress_".concat(getUUID()));
  }, []);
  return id || innerId;
};
var Block = function Block2(_ref) {
  var bg = _ref.bg, children = _ref.children;
  return /* @__PURE__ */ reactExports.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: bg
    }
  }, children);
};
function getPtgColors(color, scale) {
  return Object.keys(color).map(function(key) {
    var parsedKey = parseFloat(key);
    var ptgKey = "".concat(Math.floor(parsedKey * scale), "%");
    return "".concat(color[key], " ").concat(ptgKey);
  });
}
var PtgCircle = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var prefixCls = props.prefixCls, color = props.color, gradientId = props.gradientId, radius = props.radius, circleStyleForStack = props.style, ptg = props.ptg, strokeLinecap = props.strokeLinecap, strokeWidth = props.strokeWidth, size = props.size, gapDegree = props.gapDegree;
  var isGradient = color && _typeof(color) === "object";
  var stroke = isGradient ? "#FFF" : void 0;
  var halfSize = size / 2;
  var circleNode = /* @__PURE__ */ reactExports.createElement("circle", {
    className: "".concat(prefixCls, "-circle-path"),
    r: radius,
    cx: halfSize,
    cy: halfSize,
    stroke,
    strokeLinecap,
    strokeWidth,
    opacity: ptg === 0 ? 0 : 1,
    style: circleStyleForStack,
    ref
  });
  if (!isGradient) {
    return circleNode;
  }
  var maskId = "".concat(gradientId, "-conic");
  var fromDeg = gapDegree ? "".concat(180 + gapDegree / 2, "deg") : "0deg";
  var conicColors = getPtgColors(color, (360 - gapDegree) / 360);
  var linearColors = getPtgColors(color, 1);
  var conicColorBg = "conic-gradient(from ".concat(fromDeg, ", ").concat(conicColors.join(", "), ")");
  var linearColorBg = "linear-gradient(to ".concat(gapDegree ? "bottom" : "top", ", ").concat(linearColors.join(", "), ")");
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("mask", {
    id: maskId
  }, circleNode), /* @__PURE__ */ reactExports.createElement("foreignObject", {
    x: 0,
    y: 0,
    width: size,
    height: size,
    mask: "url(#".concat(maskId, ")")
  }, /* @__PURE__ */ reactExports.createElement(Block, {
    bg: linearColorBg
  }, /* @__PURE__ */ reactExports.createElement(Block, {
    bg: conicColorBg
  }))));
});
var VIEW_BOX_SIZE = 100;
var getCircleStyle = function getCircleStyle2(perimeter, perimeterWithoutGap, offset, percent, rotateDeg, gapDegree, gapPosition, strokeColor, strokeLinecap, strokeWidth) {
  var stepSpace = arguments.length > 10 && arguments[10] !== void 0 ? arguments[10] : 0;
  var offsetDeg = offset / 100 * 360 * ((360 - gapDegree) / 360);
  var positionDeg = gapDegree === 0 ? 0 : {
    bottom: 0,
    top: 180,
    left: 90,
    right: -90
  }[gapPosition];
  var strokeDashoffset = (100 - percent) / 100 * perimeterWithoutGap;
  if (strokeLinecap === "round" && percent !== 100) {
    strokeDashoffset += strokeWidth / 2;
    if (strokeDashoffset >= perimeterWithoutGap) {
      strokeDashoffset = perimeterWithoutGap - 0.01;
    }
  }
  var halfSize = VIEW_BOX_SIZE / 2;
  return {
    stroke: typeof strokeColor === "string" ? strokeColor : void 0,
    strokeDasharray: "".concat(perimeterWithoutGap, "px ").concat(perimeter),
    strokeDashoffset: strokeDashoffset + stepSpace,
    transform: "rotate(".concat(rotateDeg + offsetDeg + positionDeg, "deg)"),
    transformOrigin: "".concat(halfSize, "px ").concat(halfSize, "px"),
    transition: "stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s",
    fillOpacity: 0
  };
};
var _excluded$2 = ["id", "prefixCls", "steps", "strokeWidth", "trailWidth", "gapDegree", "gapPosition", "trailColor", "strokeLinecap", "style", "className", "strokeColor", "percent"];
function toArray(value) {
  var mergedValue = value !== null && value !== void 0 ? value : [];
  return Array.isArray(mergedValue) ? mergedValue : [mergedValue];
}
var Circle$2 = function Circle(props) {
  var _defaultProps$props = _objectSpread2(_objectSpread2({}, defaultProps), props), id = _defaultProps$props.id, prefixCls = _defaultProps$props.prefixCls, steps = _defaultProps$props.steps, strokeWidth = _defaultProps$props.strokeWidth, trailWidth = _defaultProps$props.trailWidth, _defaultProps$props$g = _defaultProps$props.gapDegree, gapDegree = _defaultProps$props$g === void 0 ? 0 : _defaultProps$props$g, gapPosition = _defaultProps$props.gapPosition, trailColor = _defaultProps$props.trailColor, strokeLinecap = _defaultProps$props.strokeLinecap, style = _defaultProps$props.style, className = _defaultProps$props.className, strokeColor = _defaultProps$props.strokeColor, percent = _defaultProps$props.percent, restProps = _objectWithoutProperties(_defaultProps$props, _excluded$2);
  var halfSize = VIEW_BOX_SIZE / 2;
  var mergedId = useId(id);
  var gradientId = "".concat(mergedId, "-gradient");
  var radius = halfSize - strokeWidth / 2;
  var perimeter = Math.PI * 2 * radius;
  var rotateDeg = gapDegree > 0 ? 90 + gapDegree / 2 : -90;
  var perimeterWithoutGap = perimeter * ((360 - gapDegree) / 360);
  var _ref = _typeof(steps) === "object" ? steps : {
    count: steps,
    space: 2
  }, stepCount = _ref.count, stepSpace = _ref.space;
  var percentList = toArray(percent);
  var strokeColorList = toArray(strokeColor);
  var gradient = strokeColorList.find(function(color) {
    return color && _typeof(color) === "object";
  });
  var isConicGradient = gradient && _typeof(gradient) === "object";
  var mergedStrokeLinecap = isConicGradient ? "butt" : strokeLinecap;
  var circleStyle = getCircleStyle(perimeter, perimeterWithoutGap, 0, 100, rotateDeg, gapDegree, gapPosition, trailColor, mergedStrokeLinecap, strokeWidth);
  var paths = useTransitionDuration();
  var getStokeList = function getStokeList2() {
    var stackPtg = 0;
    return percentList.map(function(ptg, index) {
      var color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
      var circleStyleForStack = getCircleStyle(perimeter, perimeterWithoutGap, stackPtg, ptg, rotateDeg, gapDegree, gapPosition, color, mergedStrokeLinecap, strokeWidth);
      stackPtg += ptg;
      return /* @__PURE__ */ reactExports.createElement(PtgCircle, {
        key: index,
        color,
        ptg,
        radius,
        prefixCls,
        gradientId,
        style: circleStyleForStack,
        strokeLinecap: mergedStrokeLinecap,
        strokeWidth,
        gapDegree,
        ref: function ref(elem) {
          paths[index] = elem;
        },
        size: VIEW_BOX_SIZE
      });
    }).reverse();
  };
  var getStepStokeList = function getStepStokeList2() {
    var current = Math.round(stepCount * (percentList[0] / 100));
    var stepPtg = 100 / stepCount;
    var stackPtg = 0;
    return new Array(stepCount).fill(null).map(function(_, index) {
      var color = index <= current - 1 ? strokeColorList[0] : trailColor;
      var stroke = color && _typeof(color) === "object" ? "url(#".concat(gradientId, ")") : void 0;
      var circleStyleForStack = getCircleStyle(perimeter, perimeterWithoutGap, stackPtg, stepPtg, rotateDeg, gapDegree, gapPosition, color, "butt", strokeWidth, stepSpace);
      stackPtg += (perimeterWithoutGap - circleStyleForStack.strokeDashoffset + stepSpace) * 100 / perimeterWithoutGap;
      return /* @__PURE__ */ reactExports.createElement("circle", {
        key: index,
        className: "".concat(prefixCls, "-circle-path"),
        r: radius,
        cx: halfSize,
        cy: halfSize,
        stroke,
        strokeWidth,
        opacity: 1,
        style: circleStyleForStack,
        ref: function ref(elem) {
          paths[index] = elem;
        }
      });
    });
  };
  return /* @__PURE__ */ reactExports.createElement("svg", _extends({
    className: classNames("".concat(prefixCls, "-circle"), className),
    viewBox: "0 0 ".concat(VIEW_BOX_SIZE, " ").concat(VIEW_BOX_SIZE),
    style,
    id,
    role: "presentation"
  }, restProps), !stepCount && /* @__PURE__ */ reactExports.createElement("circle", {
    className: "".concat(prefixCls, "-circle-trail"),
    r: radius,
    cx: halfSize,
    cy: halfSize,
    stroke: trailColor,
    strokeLinecap: mergedStrokeLinecap,
    strokeWidth: trailWidth || strokeWidth,
    style: circleStyle
  }), stepCount ? getStepStokeList() : getStokeList());
};
function validProgress(progress) {
  if (!progress || progress < 0) {
    return 0;
  }
  if (progress > 100) {
    return 100;
  }
  return progress;
}
function getSuccessPercent(_ref) {
  let {
    success,
    successPercent
  } = _ref;
  let percent = successPercent;
  if (success && "progress" in success) {
    percent = success.progress;
  }
  if (success && "percent" in success) {
    percent = success.percent;
  }
  return percent;
}
const getPercentage = (_ref2) => {
  let {
    percent,
    success,
    successPercent
  } = _ref2;
  const realSuccessPercent = validProgress(getSuccessPercent({
    success,
    successPercent
  }));
  return [realSuccessPercent, validProgress(validProgress(percent) - realSuccessPercent)];
};
const getStrokeColor = (_ref3) => {
  let {
    success = {},
    strokeColor
  } = _ref3;
  const {
    strokeColor: successColor
  } = success;
  return [successColor || presetPrimaryColors.green, strokeColor || null];
};
const getSize = (size, type, extra) => {
  var _a, _b, _c, _d;
  let width = -1;
  let height = -1;
  if (type === "step") {
    const steps = extra.steps;
    const strokeWidth = extra.strokeWidth;
    if (typeof size === "string" || typeof size === "undefined") {
      width = size === "small" ? 2 : 14;
      height = strokeWidth !== null && strokeWidth !== void 0 ? strokeWidth : 8;
    } else if (typeof size === "number") {
      [width, height] = [size, size];
    } else {
      [width = 14, height = 8] = size;
    }
    width *= steps;
  } else if (type === "line") {
    const strokeWidth = extra === null || extra === void 0 ? void 0 : extra.strokeWidth;
    if (typeof size === "string" || typeof size === "undefined") {
      height = strokeWidth || (size === "small" ? 6 : 8);
    } else if (typeof size === "number") {
      [width, height] = [size, size];
    } else {
      [width = -1, height = 8] = size;
    }
  } else if (type === "circle" || type === "dashboard") {
    if (typeof size === "string" || typeof size === "undefined") {
      [width, height] = size === "small" ? [60, 60] : [120, 120];
    } else if (typeof size === "number") {
      [width, height] = [size, size];
    } else {
      width = (_b = (_a = size[0]) !== null && _a !== void 0 ? _a : size[1]) !== null && _b !== void 0 ? _b : 120;
      height = (_d = (_c = size[0]) !== null && _c !== void 0 ? _c : size[1]) !== null && _d !== void 0 ? _d : 120;
    }
  }
  return [width, height];
};
const CIRCLE_MIN_STROKE_WIDTH = 3;
const getMinPercent = (width) => CIRCLE_MIN_STROKE_WIDTH / width * 100;
const Circle2 = (props) => {
  const {
    prefixCls,
    trailColor = null,
    strokeLinecap = "round",
    gapPosition,
    gapDegree,
    width: originWidth = 120,
    type,
    children,
    success,
    size = originWidth
  } = props;
  const [width, height] = getSize(size, "circle");
  let {
    strokeWidth
  } = props;
  if (strokeWidth === void 0) {
    strokeWidth = Math.max(getMinPercent(width), 6);
  }
  const circleStyle = {
    width,
    height,
    fontSize: width * 0.15 + 6
  };
  const realGapDegree = reactExports.useMemo(() => {
    if (gapDegree || gapDegree === 0) {
      return gapDegree;
    }
    if (type === "dashboard") {
      return 75;
    }
    return void 0;
  }, [gapDegree, type]);
  const gapPos = gapPosition || type === "dashboard" && "bottom" || void 0;
  const isGradient = Object.prototype.toString.call(props.strokeColor) === "[object Object]";
  const strokeColor = getStrokeColor({
    success,
    strokeColor: props.strokeColor
  });
  const wrapperClassName = classNames(`${prefixCls}-inner`, {
    [`${prefixCls}-circle-gradient`]: isGradient
  });
  const circleContent = /* @__PURE__ */ reactExports.createElement(Circle$2, {
    percent: getPercentage(props),
    strokeWidth,
    trailWidth: strokeWidth,
    strokeColor,
    strokeLinecap,
    trailColor,
    prefixCls,
    gapDegree: realGapDegree,
    gapPosition: gapPos
  });
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: wrapperClassName,
    style: circleStyle
  }, width <= 20 ? /* @__PURE__ */ reactExports.createElement(Tooltip, {
    title: children
  }, /* @__PURE__ */ reactExports.createElement("span", null, circleContent)) : /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, circleContent, children));
};
const Circle$1 = Circle2;
const LineStrokeColorVar = "--progress-line-stroke-color";
const Percent = "--progress-percent";
const genAntProgressActive = (isRtl) => {
  const direction = isRtl ? "100%" : "-100%";
  return new Keyframe(`antProgress${isRtl ? "RTL" : "LTR"}Active`, {
    "0%": {
      transform: `translateX(${direction}) scaleX(0)`,
      opacity: 0.1
    },
    "20%": {
      transform: `translateX(${direction}) scaleX(0)`,
      opacity: 0.5
    },
    to: {
      transform: "translateX(0) scaleX(1)",
      opacity: 0
    }
  });
};
const genBaseStyle = (token) => {
  const {
    componentCls: progressCls,
    iconCls: iconPrefixCls
  } = token;
  return {
    [progressCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      display: "inline-block",
      "&-rtl": {
        direction: "rtl"
      },
      "&-line": {
        position: "relative",
        width: "100%",
        fontSize: token.fontSize
      },
      [`${progressCls}-outer`]: {
        display: "inline-block",
        width: "100%"
      },
      [`&${progressCls}-show-info`]: {
        [`${progressCls}-outer`]: {
          marginInlineEnd: `calc(-2em - ${unit(token.marginXS)})`,
          paddingInlineEnd: `calc(2em + ${unit(token.paddingXS)})`
        }
      },
      [`${progressCls}-inner`]: {
        position: "relative",
        display: "inline-block",
        width: "100%",
        overflow: "hidden",
        verticalAlign: "middle",
        backgroundColor: token.remainingColor,
        borderRadius: token.lineBorderRadius
      },
      [`${progressCls}-inner:not(${progressCls}-circle-gradient)`]: {
        [`${progressCls}-circle-path`]: {
          stroke: token.defaultColor
        }
      },
      [`${progressCls}-success-bg, ${progressCls}-bg`]: {
        position: "relative",
        background: token.defaultColor,
        borderRadius: token.lineBorderRadius,
        transition: `all ${token.motionDurationSlow} ${token.motionEaseInOutCirc}`
      },
      [`${progressCls}-bg`]: {
        overflow: "hidden",
        "&::after": {
          content: '""',
          background: {
            _multi_value_: true,
            value: ["inherit", `var(${LineStrokeColorVar})`]
          },
          height: "100%",
          width: `calc(1 / var(${Percent}) * 100%)`,
          display: "block"
        }
      },
      [`${progressCls}-success-bg`]: {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineStart: 0,
        backgroundColor: token.colorSuccess
      },
      [`${progressCls}-text`]: {
        display: "inline-block",
        width: "2em",
        marginInlineStart: token.marginXS,
        color: token.colorText,
        lineHeight: 1,
        whiteSpace: "nowrap",
        textAlign: "start",
        verticalAlign: "middle",
        wordBreak: "normal",
        [iconPrefixCls]: {
          fontSize: token.fontSize
        }
      },
      [`&${progressCls}-status-active`]: {
        [`${progressCls}-bg::before`]: {
          position: "absolute",
          inset: 0,
          backgroundColor: token.colorBgContainer,
          borderRadius: token.lineBorderRadius,
          opacity: 0,
          animationName: genAntProgressActive(),
          animationDuration: token.progressActiveMotionDuration,
          animationTimingFunction: token.motionEaseOutQuint,
          animationIterationCount: "infinite",
          content: '""'
        }
      },
      [`&${progressCls}-rtl${progressCls}-status-active`]: {
        [`${progressCls}-bg::before`]: {
          animationName: genAntProgressActive(true)
        }
      },
      [`&${progressCls}-status-exception`]: {
        [`${progressCls}-bg`]: {
          backgroundColor: token.colorError
        },
        [`${progressCls}-text`]: {
          color: token.colorError
        }
      },
      [`&${progressCls}-status-exception ${progressCls}-inner:not(${progressCls}-circle-gradient)`]: {
        [`${progressCls}-circle-path`]: {
          stroke: token.colorError
        }
      },
      [`&${progressCls}-status-success`]: {
        [`${progressCls}-bg`]: {
          backgroundColor: token.colorSuccess
        },
        [`${progressCls}-text`]: {
          color: token.colorSuccess
        }
      },
      [`&${progressCls}-status-success ${progressCls}-inner:not(${progressCls}-circle-gradient)`]: {
        [`${progressCls}-circle-path`]: {
          stroke: token.colorSuccess
        }
      }
    })
  };
};
const genCircleStyle = (token) => {
  const {
    componentCls: progressCls,
    iconCls: iconPrefixCls
  } = token;
  return {
    [progressCls]: {
      [`${progressCls}-circle-trail`]: {
        stroke: token.remainingColor
      },
      [`&${progressCls}-circle ${progressCls}-inner`]: {
        position: "relative",
        lineHeight: 1,
        backgroundColor: "transparent"
      },
      [`&${progressCls}-circle ${progressCls}-text`]: {
        position: "absolute",
        insetBlockStart: "50%",
        insetInlineStart: 0,
        width: "100%",
        margin: 0,
        padding: 0,
        color: token.circleTextColor,
        fontSize: token.circleTextFontSize,
        lineHeight: 1,
        whiteSpace: "normal",
        textAlign: "center",
        transform: "translateY(-50%)",
        [iconPrefixCls]: {
          fontSize: token.circleIconFontSize
        }
      },
      [`${progressCls}-circle&-status-exception`]: {
        [`${progressCls}-text`]: {
          color: token.colorError
        }
      },
      [`${progressCls}-circle&-status-success`]: {
        [`${progressCls}-text`]: {
          color: token.colorSuccess
        }
      }
    },
    [`${progressCls}-inline-circle`]: {
      lineHeight: 1,
      [`${progressCls}-inner`]: {
        verticalAlign: "bottom"
      }
    }
  };
};
const genStepStyle = (token) => {
  const {
    componentCls: progressCls
  } = token;
  return {
    [progressCls]: {
      [`${progressCls}-steps`]: {
        display: "inline-block",
        "&-outer": {
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        },
        "&-item": {
          flexShrink: 0,
          minWidth: token.progressStepMinWidth,
          marginInlineEnd: token.progressStepMarginInlineEnd,
          backgroundColor: token.remainingColor,
          transition: `all ${token.motionDurationSlow}`,
          "&-active": {
            backgroundColor: token.defaultColor
          }
        }
      }
    }
  };
};
const genSmallLine = (token) => {
  const {
    componentCls: progressCls,
    iconCls: iconPrefixCls
  } = token;
  return {
    [progressCls]: {
      [`${progressCls}-small&-line, ${progressCls}-small&-line ${progressCls}-text ${iconPrefixCls}`]: {
        fontSize: token.fontSizeSM
      }
    }
  };
};
const prepareComponentToken$1 = (token) => ({
  circleTextColor: token.colorText,
  defaultColor: token.colorInfo,
  remainingColor: token.colorFillSecondary,
  lineBorderRadius: 100,
  // magic for capsule shape, should be a very large number
  circleTextFontSize: "1em",
  circleIconFontSize: `${token.fontSize / token.fontSizeSM}em`
});
const useStyle$1 = genStyleHooks("Progress", (token) => {
  const progressStepMarginInlineEnd = token.calc(token.marginXXS).div(2).equal();
  const progressToken = merge(token, {
    progressStepMarginInlineEnd,
    progressStepMinWidth: progressStepMarginInlineEnd,
    progressActiveMotionDuration: "2.4s"
  });
  return [genBaseStyle(progressToken), genCircleStyle(progressToken), genStepStyle(progressToken), genSmallLine(progressToken)];
}, prepareComponentToken$1);
var __rest$2 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const sortGradient = (gradients) => {
  let tempArr = [];
  Object.keys(gradients).forEach((key) => {
    const formattedKey = parseFloat(key.replace(/%/g, ""));
    if (!isNaN(formattedKey)) {
      tempArr.push({
        key: formattedKey,
        value: gradients[key]
      });
    }
  });
  tempArr = tempArr.sort((a, b) => a.key - b.key);
  return tempArr.map((_ref) => {
    let {
      key,
      value
    } = _ref;
    return `${value} ${key}%`;
  }).join(", ");
};
const handleGradient = (strokeColor, directionConfig) => {
  const {
    from = presetPrimaryColors.blue,
    to = presetPrimaryColors.blue,
    direction = directionConfig === "rtl" ? "to left" : "to right"
  } = strokeColor, rest = __rest$2(strokeColor, ["from", "to", "direction"]);
  if (Object.keys(rest).length !== 0) {
    const sortedGradients = sortGradient(rest);
    const background2 = `linear-gradient(${direction}, ${sortedGradients})`;
    return {
      background: background2,
      [LineStrokeColorVar]: background2
    };
  }
  const background = `linear-gradient(${direction}, ${from}, ${to})`;
  return {
    background,
    [LineStrokeColorVar]: background
  };
};
const Line = (props) => {
  const {
    prefixCls,
    direction: directionConfig,
    percent,
    size,
    strokeWidth,
    strokeColor,
    strokeLinecap = "round",
    children,
    trailColor = null,
    success
  } = props;
  const backgroundProps = strokeColor && typeof strokeColor !== "string" ? handleGradient(strokeColor, directionConfig) : {
    [LineStrokeColorVar]: strokeColor,
    background: strokeColor
  };
  const borderRadius = strokeLinecap === "square" || strokeLinecap === "butt" ? 0 : void 0;
  const mergedSize = size !== null && size !== void 0 ? size : [-1, strokeWidth || (size === "small" ? 6 : 8)];
  const [width, height] = getSize(mergedSize, "line", {
    strokeWidth
  });
  const trailStyle = {
    backgroundColor: trailColor || void 0,
    borderRadius
  };
  const percentStyle = Object.assign(Object.assign({
    width: `${validProgress(percent)}%`,
    height,
    borderRadius
  }, backgroundProps), {
    [Percent]: validProgress(percent) / 100
  });
  const successPercent = getSuccessPercent(props);
  const successPercentStyle = {
    width: `${validProgress(successPercent)}%`,
    height,
    borderRadius,
    backgroundColor: success === null || success === void 0 ? void 0 : success.strokeColor
  };
  const outerStyle = {
    width: width < 0 ? "100%" : width,
    height
  };
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-outer`,
    style: outerStyle
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-inner`,
    style: trailStyle
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-bg`,
    style: percentStyle
  }), successPercent !== void 0 ? /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-success-bg`,
    style: successPercentStyle
  }) : null)), children);
};
const Line$1 = Line;
const Steps$3 = (props) => {
  const {
    size,
    steps,
    percent = 0,
    strokeWidth = 8,
    strokeColor,
    trailColor = null,
    prefixCls,
    children
  } = props;
  const current = Math.round(steps * (percent / 100));
  const stepWidth = size === "small" ? 2 : 14;
  const mergedSize = size !== null && size !== void 0 ? size : [stepWidth, strokeWidth];
  const [width, height] = getSize(mergedSize, "step", {
    steps,
    strokeWidth
  });
  const unitWidth = width / steps;
  const styledSteps = new Array(steps);
  for (let i = 0; i < steps; i++) {
    const color = Array.isArray(strokeColor) ? strokeColor[i] : strokeColor;
    styledSteps[i] = /* @__PURE__ */ reactExports.createElement("div", {
      key: i,
      className: classNames(`${prefixCls}-steps-item`, {
        [`${prefixCls}-steps-item-active`]: i <= current - 1
      }),
      style: {
        backgroundColor: i <= current - 1 ? color : trailColor,
        width: unitWidth,
        height
      }
    });
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-steps-outer`
  }, styledSteps, children);
};
const Steps$4 = Steps$3;
var __rest$1 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const ProgressStatuses = ["normal", "exception", "active", "success"];
const Progress = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    steps,
    strokeColor,
    percent = 0,
    size = "default",
    showInfo = true,
    type = "line",
    status,
    format,
    style
  } = props, restProps = __rest$1(props, ["prefixCls", "className", "rootClassName", "steps", "strokeColor", "percent", "size", "showInfo", "type", "status", "format", "style"]);
  const percentNumber = reactExports.useMemo(() => {
    var _a, _b;
    const successPercent = getSuccessPercent(props);
    return parseInt(successPercent !== void 0 ? (_a = successPercent !== null && successPercent !== void 0 ? successPercent : 0) === null || _a === void 0 ? void 0 : _a.toString() : (_b = percent !== null && percent !== void 0 ? percent : 0) === null || _b === void 0 ? void 0 : _b.toString(), 10);
  }, [percent, props.success, props.successPercent]);
  const progressStatus = reactExports.useMemo(() => {
    if (!ProgressStatuses.includes(status) && percentNumber >= 100) {
      return "success";
    }
    return status || "normal";
  }, [status, percentNumber]);
  const {
    getPrefixCls,
    direction,
    progress: progressStyle
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("progress", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$1(prefixCls);
  const progressInfo = reactExports.useMemo(() => {
    if (!showInfo) {
      return null;
    }
    const successPercent = getSuccessPercent(props);
    let text;
    const textFormatter = format || ((number) => `${number}%`);
    const isLineType = type === "line";
    if (format || progressStatus !== "exception" && progressStatus !== "success") {
      text = textFormatter(validProgress(percent), validProgress(successPercent));
    } else if (progressStatus === "exception") {
      text = isLineType ? /* @__PURE__ */ reactExports.createElement(CloseCircleFilled, null) : /* @__PURE__ */ reactExports.createElement(CloseOutlined, null);
    } else if (progressStatus === "success") {
      text = isLineType ? /* @__PURE__ */ reactExports.createElement(CheckCircleFilled, null) : /* @__PURE__ */ reactExports.createElement(CheckOutlined, null);
    }
    return /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-text`,
      title: typeof text === "string" ? text : void 0
    }, text);
  }, [showInfo, percent, percentNumber, progressStatus, type, prefixCls, format]);
  const strokeColorNotArray = Array.isArray(strokeColor) ? strokeColor[0] : strokeColor;
  const strokeColorNotGradient = typeof strokeColor === "string" || Array.isArray(strokeColor) ? strokeColor : void 0;
  let progress;
  if (type === "line") {
    progress = steps ? /* @__PURE__ */ reactExports.createElement(Steps$4, Object.assign({}, props, {
      strokeColor: strokeColorNotGradient,
      prefixCls,
      steps
    }), progressInfo) : /* @__PURE__ */ reactExports.createElement(Line$1, Object.assign({}, props, {
      strokeColor: strokeColorNotArray,
      prefixCls,
      direction
    }), progressInfo);
  } else if (type === "circle" || type === "dashboard") {
    progress = /* @__PURE__ */ reactExports.createElement(Circle$1, Object.assign({}, props, {
      strokeColor: strokeColorNotArray,
      prefixCls,
      progressStatus
    }), progressInfo);
  }
  const classString = classNames(prefixCls, `${prefixCls}-status-${progressStatus}`, `${prefixCls}-${type === "dashboard" && "circle" || steps && "steps" || type}`, {
    [`${prefixCls}-inline-circle`]: type === "circle" && getSize(size, "circle")[0] <= 20,
    [`${prefixCls}-show-info`]: showInfo,
    [`${prefixCls}-${size}`]: typeof size === "string",
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, progressStyle === null || progressStyle === void 0 ? void 0 : progressStyle.className, className, rootClassName, hashId, cssVarCls);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", Object.assign({
    ref,
    style: Object.assign(Object.assign({}, progressStyle === null || progressStyle === void 0 ? void 0 : progressStyle.style), style),
    className: classString,
    role: "progressbar",
    "aria-valuenow": percentNumber
  }, omit(restProps, ["trailColor", "strokeWidth", "width", "gapDegree", "gapPosition", "strokeLinecap", "success", "successPercent"])), progress));
});
const Progress$1 = Progress;
var _excluded$1 = ["className", "prefixCls", "style", "active", "status", "iconPrefix", "icon", "wrapperStyle", "stepNumber", "disabled", "description", "title", "subTitle", "progressDot", "stepIcon", "tailContent", "icons", "stepIndex", "onStepClick", "onClick", "render"];
function isString(str) {
  return typeof str === "string";
}
function Step(props) {
  var _classNames2;
  var className = props.className, prefixCls = props.prefixCls, style = props.style, active = props.active, status = props.status, iconPrefix = props.iconPrefix, icon = props.icon;
  props.wrapperStyle;
  var stepNumber = props.stepNumber, disabled = props.disabled, description = props.description, title = props.title, subTitle = props.subTitle, progressDot = props.progressDot, stepIcon = props.stepIcon, tailContent = props.tailContent, icons = props.icons, stepIndex = props.stepIndex, onStepClick = props.onStepClick, onClick = props.onClick, render = props.render, restProps = _objectWithoutProperties(props, _excluded$1);
  var clickable = !!onStepClick && !disabled;
  var accessibilityProps = {};
  if (clickable) {
    accessibilityProps.role = "button";
    accessibilityProps.tabIndex = 0;
    accessibilityProps.onClick = function(e) {
      onClick === null || onClick === void 0 ? void 0 : onClick(e);
      onStepClick(stepIndex);
    };
    accessibilityProps.onKeyDown = function(e) {
      var which = e.which;
      if (which === KeyCode.ENTER || which === KeyCode.SPACE) {
        onStepClick(stepIndex);
      }
    };
  }
  var renderIconNode = function renderIconNode2() {
    var _classNames;
    var iconNode;
    var iconClassName = classNames("".concat(prefixCls, "-icon"), "".concat(iconPrefix, "icon"), (_classNames = {}, _defineProperty(_classNames, "".concat(iconPrefix, "icon-").concat(icon), icon && isString(icon)), _defineProperty(_classNames, "".concat(iconPrefix, "icon-check"), !icon && status === "finish" && (icons && !icons.finish || !icons)), _defineProperty(_classNames, "".concat(iconPrefix, "icon-cross"), !icon && status === "error" && (icons && !icons.error || !icons)), _classNames));
    var iconDot = /* @__PURE__ */ reactExports.createElement("span", {
      className: "".concat(prefixCls, "-icon-dot")
    });
    if (progressDot) {
      if (typeof progressDot === "function") {
        iconNode = /* @__PURE__ */ reactExports.createElement("span", {
          className: "".concat(prefixCls, "-icon")
        }, progressDot(iconDot, {
          index: stepNumber - 1,
          status,
          title,
          description
        }));
      } else {
        iconNode = /* @__PURE__ */ reactExports.createElement("span", {
          className: "".concat(prefixCls, "-icon")
        }, iconDot);
      }
    } else if (icon && !isString(icon)) {
      iconNode = /* @__PURE__ */ reactExports.createElement("span", {
        className: "".concat(prefixCls, "-icon")
      }, icon);
    } else if (icons && icons.finish && status === "finish") {
      iconNode = /* @__PURE__ */ reactExports.createElement("span", {
        className: "".concat(prefixCls, "-icon")
      }, icons.finish);
    } else if (icons && icons.error && status === "error") {
      iconNode = /* @__PURE__ */ reactExports.createElement("span", {
        className: "".concat(prefixCls, "-icon")
      }, icons.error);
    } else if (icon || status === "finish" || status === "error") {
      iconNode = /* @__PURE__ */ reactExports.createElement("span", {
        className: iconClassName
      });
    } else {
      iconNode = /* @__PURE__ */ reactExports.createElement("span", {
        className: "".concat(prefixCls, "-icon")
      }, stepNumber);
    }
    if (stepIcon) {
      iconNode = stepIcon({
        index: stepNumber - 1,
        status,
        title,
        description,
        node: iconNode
      });
    }
    return iconNode;
  };
  var mergedStatus = status || "wait";
  var classString = classNames("".concat(prefixCls, "-item"), "".concat(prefixCls, "-item-").concat(mergedStatus), className, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-item-custom"), icon), _defineProperty(_classNames2, "".concat(prefixCls, "-item-active"), active), _defineProperty(_classNames2, "".concat(prefixCls, "-item-disabled"), disabled === true), _classNames2));
  var stepItemStyle = _objectSpread2({}, style);
  var stepNode = /* @__PURE__ */ reactExports.createElement("div", _extends({}, restProps, {
    className: classString,
    style: stepItemStyle
  }), /* @__PURE__ */ reactExports.createElement("div", _extends({
    onClick
  }, accessibilityProps, {
    className: "".concat(prefixCls, "-item-container")
  }), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-item-tail")
  }, tailContent), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-item-icon")
  }, renderIconNode()), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-item-content")
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-item-title")
  }, title, subTitle && /* @__PURE__ */ reactExports.createElement("div", {
    title: typeof subTitle === "string" ? subTitle : void 0,
    className: "".concat(prefixCls, "-item-subtitle")
  }, subTitle)), description && /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-item-description")
  }, description))));
  if (render) {
    stepNode = render(stepNode) || null;
  }
  return stepNode;
}
var _excluded = ["prefixCls", "style", "className", "children", "direction", "type", "labelPlacement", "iconPrefix", "status", "size", "current", "progressDot", "stepIcon", "initial", "icons", "onChange", "itemRender", "items"];
function Steps$2(props) {
  var _classNames;
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-steps" : _props$prefixCls, _props$style = props.style, style = _props$style === void 0 ? {} : _props$style, className = props.className;
  props.children;
  var _props$direction = props.direction, direction = _props$direction === void 0 ? "horizontal" : _props$direction, _props$type = props.type, type = _props$type === void 0 ? "default" : _props$type, _props$labelPlacement = props.labelPlacement, labelPlacement = _props$labelPlacement === void 0 ? "horizontal" : _props$labelPlacement, _props$iconPrefix = props.iconPrefix, iconPrefix = _props$iconPrefix === void 0 ? "rc" : _props$iconPrefix, _props$status = props.status, status = _props$status === void 0 ? "process" : _props$status, size = props.size, _props$current = props.current, current = _props$current === void 0 ? 0 : _props$current, _props$progressDot = props.progressDot, progressDot = _props$progressDot === void 0 ? false : _props$progressDot, stepIcon = props.stepIcon, _props$initial = props.initial, initial = _props$initial === void 0 ? 0 : _props$initial, icons = props.icons, onChange = props.onChange, itemRender = props.itemRender, _props$items = props.items, items = _props$items === void 0 ? [] : _props$items, restProps = _objectWithoutProperties(props, _excluded);
  var isNav = type === "navigation";
  var isInline = type === "inline";
  var mergedProgressDot = isInline || progressDot;
  var mergedDirection = isInline ? "horizontal" : direction;
  var mergedSize = isInline ? void 0 : size;
  var adjustedLabelPlacement = mergedProgressDot ? "vertical" : labelPlacement;
  var classString = classNames(prefixCls, "".concat(prefixCls, "-").concat(mergedDirection), className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(mergedSize), mergedSize), _defineProperty(_classNames, "".concat(prefixCls, "-label-").concat(adjustedLabelPlacement), mergedDirection === "horizontal"), _defineProperty(_classNames, "".concat(prefixCls, "-dot"), !!mergedProgressDot), _defineProperty(_classNames, "".concat(prefixCls, "-navigation"), isNav), _defineProperty(_classNames, "".concat(prefixCls, "-inline"), isInline), _classNames));
  var onStepClick = function onStepClick2(next) {
    if (onChange && current !== next) {
      onChange(next);
    }
  };
  var renderStep = function renderStep2(item, index) {
    var mergedItem = _objectSpread2({}, item);
    var stepNumber = initial + index;
    if (status === "error" && index === current - 1) {
      mergedItem.className = "".concat(prefixCls, "-next-error");
    }
    if (!mergedItem.status) {
      if (stepNumber === current) {
        mergedItem.status = status;
      } else if (stepNumber < current) {
        mergedItem.status = "finish";
      } else {
        mergedItem.status = "wait";
      }
    }
    if (isInline) {
      mergedItem.icon = void 0;
      mergedItem.subTitle = void 0;
    }
    if (!mergedItem.render && itemRender) {
      mergedItem.render = function(stepItem) {
        return itemRender(mergedItem, stepItem);
      };
    }
    return /* @__PURE__ */ React.createElement(Step, _extends({}, mergedItem, {
      active: stepNumber === current,
      stepNumber: stepNumber + 1,
      stepIndex: stepNumber,
      key: stepNumber,
      prefixCls,
      iconPrefix,
      wrapperStyle: style,
      progressDot: mergedProgressDot,
      stepIcon,
      icons,
      onStepClick: onChange && onStepClick
    }));
  };
  return /* @__PURE__ */ React.createElement("div", _extends({
    className: classString,
    style
  }, restProps), items.filter(function(item) {
    return item;
  }).map(renderStep));
}
Steps$2.Step = Step;
const genStepsCustomIconStyle = (token) => {
  const {
    componentCls,
    customIconTop,
    customIconSize,
    customIconFontSize
  } = token;
  return {
    [`${componentCls}-item-custom`]: {
      [`> ${componentCls}-item-container > ${componentCls}-item-icon`]: {
        height: "auto",
        background: "none",
        border: 0,
        [`> ${componentCls}-icon`]: {
          top: customIconTop,
          width: customIconSize,
          height: customIconSize,
          fontSize: customIconFontSize,
          lineHeight: `${unit(customIconFontSize)}`
        }
      }
    },
    // Only adjust horizontal customize icon width
    [`&:not(${componentCls}-vertical)`]: {
      [`${componentCls}-item-custom`]: {
        [`${componentCls}-item-icon`]: {
          width: "auto",
          background: "none"
        }
      }
    }
  };
};
const genStepsCustomIconStyle$1 = genStepsCustomIconStyle;
const genStepsInlineStyle = (token) => {
  const {
    componentCls,
    inlineDotSize,
    inlineTitleColor,
    inlineTailColor
  } = token;
  const containerPaddingTop = token.calc(token.paddingXS).add(token.lineWidth).equal();
  const titleStyle = {
    [`${componentCls}-item-container ${componentCls}-item-content ${componentCls}-item-title`]: {
      color: inlineTitleColor
    }
  };
  return {
    [`&${componentCls}-inline`]: {
      width: "auto",
      display: "inline-flex",
      [`${componentCls}-item`]: {
        flex: "none",
        "&-container": {
          padding: `${unit(containerPaddingTop)} ${unit(token.paddingXXS)} 0`,
          margin: `0 ${unit(token.calc(token.marginXXS).div(2).equal())}`,
          borderRadius: token.borderRadiusSM,
          cursor: "pointer",
          transition: `background-color ${token.motionDurationMid}`,
          "&:hover": {
            background: token.controlItemBgHover
          },
          [`&[role='button']:hover`]: {
            opacity: 1
          }
        },
        "&-icon": {
          width: inlineDotSize,
          height: inlineDotSize,
          marginInlineStart: `calc(50% - ${unit(token.calc(inlineDotSize).div(2).equal())})`,
          [`> ${componentCls}-icon`]: {
            top: 0
          },
          [`${componentCls}-icon-dot`]: {
            borderRadius: token.calc(token.fontSizeSM).div(4).equal(),
            "&::after": {
              display: "none"
            }
          }
        },
        "&-content": {
          width: "auto",
          marginTop: token.calc(token.marginXS).sub(token.lineWidth).equal()
        },
        "&-title": {
          color: inlineTitleColor,
          fontSize: token.fontSizeSM,
          lineHeight: token.lineHeightSM,
          fontWeight: "normal",
          marginBottom: token.calc(token.marginXXS).div(2).equal()
        },
        "&-description": {
          display: "none"
        },
        "&-tail": {
          marginInlineStart: 0,
          top: token.calc(inlineDotSize).div(2).add(containerPaddingTop).equal(),
          transform: `translateY(-50%)`,
          "&:after": {
            width: "100%",
            height: token.lineWidth,
            borderRadius: 0,
            marginInlineStart: 0,
            background: inlineTailColor
          }
        },
        [`&:first-child ${componentCls}-item-tail`]: {
          width: "50%",
          marginInlineStart: "50%"
        },
        [`&:last-child ${componentCls}-item-tail`]: {
          display: "block",
          width: "50%"
        },
        "&-wait": Object.assign({
          [`${componentCls}-item-icon ${componentCls}-icon ${componentCls}-icon-dot`]: {
            backgroundColor: token.colorBorderBg,
            border: `${unit(token.lineWidth)} ${token.lineType} ${inlineTailColor}`
          }
        }, titleStyle),
        "&-finish": Object.assign({
          [`${componentCls}-item-tail::after`]: {
            backgroundColor: inlineTailColor
          },
          [`${componentCls}-item-icon ${componentCls}-icon ${componentCls}-icon-dot`]: {
            backgroundColor: inlineTailColor,
            border: `${unit(token.lineWidth)} ${token.lineType} ${inlineTailColor}`
          }
        }, titleStyle),
        "&-error": titleStyle,
        "&-active, &-process": Object.assign({
          [`${componentCls}-item-icon`]: {
            width: inlineDotSize,
            height: inlineDotSize,
            marginInlineStart: `calc(50% - ${unit(token.calc(inlineDotSize).div(2).equal())})`,
            top: 0
          }
        }, titleStyle),
        [`&:not(${componentCls}-item-active) > ${componentCls}-item-container[role='button']:hover`]: {
          [`${componentCls}-item-title`]: {
            color: inlineTitleColor
          }
        }
      }
    }
  };
};
const genStepsInlineStyle$1 = genStepsInlineStyle;
const genStepsLabelPlacementStyle = (token) => {
  const {
    componentCls,
    iconSize,
    lineHeight,
    iconSizeSM
  } = token;
  return {
    [`&${componentCls}-label-vertical`]: {
      [`${componentCls}-item`]: {
        overflow: "visible",
        "&-tail": {
          marginInlineStart: token.calc(iconSize).div(2).add(token.controlHeightLG).equal(),
          padding: `${unit(token.paddingXXS)} ${unit(token.paddingLG)}`
        },
        "&-content": {
          display: "block",
          width: token.calc(iconSize).div(2).add(token.controlHeightLG).mul(2).equal(),
          marginTop: token.marginSM,
          textAlign: "center"
        },
        "&-icon": {
          display: "inline-block",
          marginInlineStart: token.controlHeightLG
        },
        "&-title": {
          paddingInlineEnd: 0,
          paddingInlineStart: 0,
          "&::after": {
            display: "none"
          }
        },
        "&-subtitle": {
          display: "block",
          marginBottom: token.marginXXS,
          marginInlineStart: 0,
          lineHeight
        }
      },
      [`&${componentCls}-small:not(${componentCls}-dot)`]: {
        [`${componentCls}-item`]: {
          "&-icon": {
            marginInlineStart: token.calc(iconSize).sub(iconSizeSM).div(2).add(token.controlHeightLG).equal()
          }
        }
      }
    }
  };
};
const genStepsLabelPlacementStyle$1 = genStepsLabelPlacementStyle;
const genStepsNavStyle = (token) => {
  const {
    componentCls,
    navContentMaxWidth,
    navArrowColor,
    stepsNavActiveColor,
    motionDurationSlow
  } = token;
  return {
    [`&${componentCls}-navigation`]: {
      paddingTop: token.paddingSM,
      [`&${componentCls}-small`]: {
        [`${componentCls}-item`]: {
          "&-container": {
            marginInlineStart: token.calc(token.marginSM).mul(-1).equal()
          }
        }
      },
      [`${componentCls}-item`]: {
        overflow: "visible",
        textAlign: "center",
        "&-container": {
          display: "inline-block",
          height: "100%",
          marginInlineStart: token.calc(token.margin).mul(-1).equal(),
          paddingBottom: token.paddingSM,
          textAlign: "start",
          transition: `opacity ${motionDurationSlow}`,
          [`${componentCls}-item-content`]: {
            maxWidth: navContentMaxWidth
          },
          [`${componentCls}-item-title`]: Object.assign(Object.assign({
            maxWidth: "100%",
            paddingInlineEnd: 0
          }, textEllipsis), {
            "&::after": {
              display: "none"
            }
          })
        },
        [`&:not(${componentCls}-item-active)`]: {
          [`${componentCls}-item-container[role='button']`]: {
            cursor: "pointer",
            "&:hover": {
              opacity: 0.85
            }
          }
        },
        "&:last-child": {
          flex: 1,
          "&::after": {
            display: "none"
          }
        },
        "&::after": {
          position: "absolute",
          top: `calc(50% - ${unit(token.calc(token.paddingSM).div(2).equal())})`,
          insetInlineStart: "100%",
          display: "inline-block",
          width: token.fontSizeIcon,
          height: token.fontSizeIcon,
          borderTop: `${unit(token.lineWidth)} ${token.lineType} ${navArrowColor}`,
          borderBottom: "none",
          borderInlineStart: "none",
          borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${navArrowColor}`,
          transform: "translateY(-50%) translateX(-50%) rotate(45deg)",
          content: '""'
        },
        "&::before": {
          position: "absolute",
          bottom: 0,
          insetInlineStart: "50%",
          display: "inline-block",
          width: 0,
          height: token.lineWidthBold,
          backgroundColor: stepsNavActiveColor,
          transition: `width ${motionDurationSlow}, inset-inline-start ${motionDurationSlow}`,
          transitionTimingFunction: "ease-out",
          content: '""'
        }
      },
      [`${componentCls}-item${componentCls}-item-active::before`]: {
        insetInlineStart: 0,
        width: "100%"
      }
    },
    [`&${componentCls}-navigation${componentCls}-vertical`]: {
      [`> ${componentCls}-item`]: {
        marginInlineEnd: 0,
        "&::before": {
          display: "none"
        },
        [`&${componentCls}-item-active::before`]: {
          top: 0,
          insetInlineEnd: 0,
          insetInlineStart: "unset",
          display: "block",
          width: token.calc(token.lineWidth).mul(3).equal(),
          height: `calc(100% - ${unit(token.marginLG)})`
        },
        "&::after": {
          position: "relative",
          insetInlineStart: "50%",
          display: "block",
          width: token.calc(token.controlHeight).mul(0.25).equal(),
          height: token.calc(token.controlHeight).mul(0.25).equal(),
          marginBottom: token.marginXS,
          textAlign: "center",
          transform: "translateY(-50%) translateX(-50%) rotate(135deg)"
        },
        "&:last-child": {
          "&::after": {
            display: "none"
          }
        },
        [`> ${componentCls}-item-container > ${componentCls}-item-tail`]: {
          visibility: "hidden"
        }
      }
    },
    [`&${componentCls}-navigation${componentCls}-horizontal`]: {
      [`> ${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        visibility: "hidden"
      }
    }
  };
};
const genStepsNavStyle$1 = genStepsNavStyle;
const genStepsProgressStyle = (token) => {
  const {
    antCls,
    componentCls
  } = token;
  return {
    [`&${componentCls}-with-progress`]: {
      [`${componentCls}-item`]: {
        paddingTop: token.paddingXXS,
        [`&-process ${componentCls}-item-container ${componentCls}-item-icon ${componentCls}-icon`]: {
          color: token.processIconColor
        }
      },
      [`&${componentCls}-vertical > ${componentCls}-item `]: {
        paddingInlineStart: token.paddingXXS,
        [`> ${componentCls}-item-container > ${componentCls}-item-tail`]: {
          top: token.marginXXS,
          insetInlineStart: token.calc(token.iconSize).div(2).sub(token.lineWidth).add(token.paddingXXS).equal()
        }
      },
      [`&, &${componentCls}-small`]: {
        [`&${componentCls}-horizontal ${componentCls}-item:first-child`]: {
          paddingBottom: token.paddingXXS,
          paddingInlineStart: token.paddingXXS
        }
      },
      [`&${componentCls}-small${componentCls}-vertical > ${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        insetInlineStart: token.calc(token.iconSizeSM).div(2).sub(token.lineWidth).add(token.paddingXXS).equal()
      },
      [`&${componentCls}-label-vertical`]: {
        [`${componentCls}-item ${componentCls}-item-tail`]: {
          top: token.calc(token.margin).sub(token.calc(token.lineWidth).mul(2).equal()).equal()
        }
      },
      [`${componentCls}-item-icon`]: {
        position: "relative",
        [`${antCls}-progress`]: {
          position: "absolute",
          insetBlockStart: token.calc(token.calc(token.iconSize).sub(token.stepsProgressSize).sub(token.calc(token.lineWidth).mul(2).equal()).equal()).div(2).equal(),
          insetInlineStart: token.calc(token.calc(token.iconSize).sub(token.stepsProgressSize).sub(token.calc(token.lineWidth).mul(2).equal()).equal()).div(2).equal()
        }
      }
    }
  };
};
const genStepsProgressStyle$1 = genStepsProgressStyle;
const genStepsProgressDotStyle = (token) => {
  const {
    componentCls,
    descriptionMaxWidth,
    lineHeight,
    dotCurrentSize,
    dotSize,
    motionDurationSlow
  } = token;
  return {
    [`&${componentCls}-dot, &${componentCls}-dot${componentCls}-small`]: {
      [`${componentCls}-item`]: {
        "&-title": {
          lineHeight
        },
        "&-tail": {
          // Math.floor((token.size - token.lineWidth * 3) / 2)
          top: token.calc(token.dotSize).sub(token.calc(token.lineWidth).mul(3).equal()).div(2).equal(),
          width: "100%",
          marginTop: 0,
          marginBottom: 0,
          marginInline: `${unit(token.calc(descriptionMaxWidth).div(2).equal())} 0`,
          padding: 0,
          "&::after": {
            width: `calc(100% - ${unit(token.calc(token.marginSM).mul(2).equal())})`,
            height: token.calc(token.lineWidth).mul(3).equal(),
            marginInlineStart: token.marginSM
          }
        },
        "&-icon": {
          width: dotSize,
          height: dotSize,
          marginInlineStart: token.calc(token.descriptionMaxWidth).sub(dotSize).div(2).equal(),
          paddingInlineEnd: 0,
          lineHeight: `${unit(dotSize)}`,
          background: "transparent",
          border: 0,
          [`${componentCls}-icon-dot`]: {
            position: "relative",
            float: "left",
            width: "100%",
            height: "100%",
            borderRadius: 100,
            // very large number
            transition: `all ${motionDurationSlow}`,
            /* expand hover area */
            "&::after": {
              position: "absolute",
              top: token.calc(token.marginSM).mul(-1).equal(),
              insetInlineStart: token.calc(dotSize).sub(token.calc(token.controlHeightLG).mul(1.5).equal()).div(2).equal(),
              width: token.calc(token.controlHeightLG).mul(1.5).equal(),
              height: token.controlHeight,
              background: "transparent",
              content: '""'
            }
          }
        },
        "&-content": {
          width: descriptionMaxWidth
        },
        [`&-process ${componentCls}-item-icon`]: {
          position: "relative",
          top: token.calc(dotSize).sub(dotCurrentSize).div(2).equal(),
          width: dotCurrentSize,
          height: dotCurrentSize,
          lineHeight: `${unit(dotCurrentSize)}`,
          background: "none",
          marginInlineStart: token.calc(token.descriptionMaxWidth).sub(dotCurrentSize).div(2).equal()
        },
        [`&-process ${componentCls}-icon`]: {
          [`&:first-child ${componentCls}-icon-dot`]: {
            insetInlineStart: 0
          }
        }
      }
    },
    [`&${componentCls}-vertical${componentCls}-dot`]: {
      [`${componentCls}-item-icon`]: {
        marginTop: token.calc(token.controlHeight).sub(dotSize).div(2).equal(),
        marginInlineStart: 0,
        background: "none"
      },
      [`${componentCls}-item-process ${componentCls}-item-icon`]: {
        marginTop: token.calc(token.controlHeight).sub(dotCurrentSize).div(2).equal(),
        top: 0,
        insetInlineStart: token.calc(dotSize).sub(dotCurrentSize).div(2).equal(),
        marginInlineStart: 0
      },
      // https://github.com/ant-design/ant-design/issues/18354
      [`${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        top: token.calc(token.controlHeight).sub(dotSize).div(2).equal(),
        insetInlineStart: 0,
        margin: 0,
        padding: `${unit(token.calc(dotSize).add(token.paddingXS).equal())} 0 ${unit(token.paddingXS)}`,
        "&::after": {
          marginInlineStart: token.calc(dotSize).sub(token.lineWidth).div(2).equal()
        }
      },
      [`&${componentCls}-small`]: {
        [`${componentCls}-item-icon`]: {
          marginTop: token.calc(token.controlHeightSM).sub(dotSize).div(2).equal()
        },
        [`${componentCls}-item-process ${componentCls}-item-icon`]: {
          marginTop: token.calc(token.controlHeightSM).sub(dotCurrentSize).div(2).equal()
        },
        [`${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
          top: token.calc(token.controlHeightSM).sub(dotSize).div(2).equal()
        }
      },
      [`${componentCls}-item:first-child ${componentCls}-icon-dot`]: {
        insetInlineStart: 0
      },
      [`${componentCls}-item-content`]: {
        width: "inherit"
      }
    }
  };
};
const genStepsProgressDotStyle$1 = genStepsProgressDotStyle;
const genStepsRTLStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`&${componentCls}-rtl`]: {
      direction: "rtl",
      [`${componentCls}-item`]: {
        "&-subtitle": {
          float: "left"
        }
      },
      // nav
      [`&${componentCls}-navigation`]: {
        [`${componentCls}-item::after`]: {
          transform: "rotate(-45deg)"
        }
      },
      // vertical
      [`&${componentCls}-vertical`]: {
        [`> ${componentCls}-item`]: {
          "&::after": {
            transform: "rotate(225deg)"
          },
          [`${componentCls}-item-icon`]: {
            float: "right"
          }
        }
      },
      // progress-dot
      [`&${componentCls}-dot`]: {
        [`${componentCls}-item-icon ${componentCls}-icon-dot, &${componentCls}-small ${componentCls}-item-icon ${componentCls}-icon-dot`]: {
          float: "right"
        }
      }
    }
  };
};
const genStepsRTLStyle$1 = genStepsRTLStyle;
const genStepsSmallStyle = (token) => {
  const {
    componentCls,
    iconSizeSM,
    // stepsSmallIconMargin,
    fontSizeSM,
    fontSize,
    colorTextDescription
  } = token;
  return {
    [`&${componentCls}-small`]: {
      [`&${componentCls}-horizontal:not(${componentCls}-label-vertical) ${componentCls}-item`]: {
        paddingInlineStart: token.paddingSM,
        "&:first-child": {
          paddingInlineStart: 0
        }
      },
      [`${componentCls}-item-icon`]: {
        width: iconSizeSM,
        height: iconSizeSM,
        // margin: stepsSmallIconMargin,
        marginTop: 0,
        marginBottom: 0,
        marginInline: `0 ${unit(token.marginXS)}`,
        fontSize: fontSizeSM,
        lineHeight: `${unit(iconSizeSM)}`,
        textAlign: "center",
        borderRadius: iconSizeSM
      },
      [`${componentCls}-item-title`]: {
        paddingInlineEnd: token.paddingSM,
        fontSize,
        lineHeight: `${unit(iconSizeSM)}`,
        "&::after": {
          top: token.calc(iconSizeSM).div(2).equal()
        }
      },
      [`${componentCls}-item-description`]: {
        color: colorTextDescription,
        fontSize
      },
      [`${componentCls}-item-tail`]: {
        top: token.calc(iconSizeSM).div(2).sub(token.paddingXXS).equal()
      },
      [`${componentCls}-item-custom ${componentCls}-item-icon`]: {
        width: "inherit",
        height: "inherit",
        lineHeight: "inherit",
        background: "none",
        border: 0,
        borderRadius: 0,
        [`> ${componentCls}-icon`]: {
          fontSize: iconSizeSM,
          lineHeight: `${unit(iconSizeSM)}`,
          transform: "none"
        }
      }
    }
  };
};
const genStepsSmallStyle$1 = genStepsSmallStyle;
const genStepsVerticalStyle = (token) => {
  const {
    componentCls,
    iconSizeSM,
    iconSize
  } = token;
  return {
    [`&${componentCls}-vertical`]: {
      display: "flex",
      flexDirection: "column",
      [`> ${componentCls}-item`]: {
        display: "block",
        flex: "1 0 auto",
        paddingInlineStart: 0,
        overflow: "visible",
        [`${componentCls}-item-icon`]: {
          float: "left",
          marginInlineEnd: token.margin
        },
        [`${componentCls}-item-content`]: {
          display: "block",
          minHeight: token.calc(token.controlHeight).mul(1.5).equal(),
          overflow: "hidden"
        },
        [`${componentCls}-item-title`]: {
          lineHeight: `${unit(iconSize)}`
        },
        [`${componentCls}-item-description`]: {
          paddingBottom: token.paddingSM
        }
      },
      [`> ${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        position: "absolute",
        top: 0,
        insetInlineStart: token.calc(iconSize).div(2).sub(token.lineWidth).equal(),
        width: token.lineWidth,
        height: "100%",
        padding: `${unit(token.calc(token.marginXXS).mul(1.5).add(iconSize).equal())} 0 ${unit(token.calc(token.marginXXS).mul(1.5).equal())}`,
        "&::after": {
          width: token.lineWidth,
          height: "100%"
        }
      },
      [`> ${componentCls}-item:not(:last-child) > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        display: "block"
      },
      [` > ${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-content > ${componentCls}-item-title`]: {
        "&::after": {
          display: "none"
        }
      },
      [`&${componentCls}-small ${componentCls}-item-container`]: {
        [`${componentCls}-item-tail`]: {
          position: "absolute",
          top: 0,
          insetInlineStart: token.calc(iconSizeSM).div(2).sub(token.lineWidth).equal(),
          padding: `${unit(token.calc(token.marginXXS).mul(1.5).add(iconSizeSM).equal())} 0 ${unit(token.calc(token.marginXXS).mul(1.5).equal())}`
        },
        [`${componentCls}-item-title`]: {
          lineHeight: `${unit(iconSizeSM)}`
        }
      }
    }
  };
};
const genStepsVerticalStyle$1 = genStepsVerticalStyle;
var StepItemStatusEnum;
(function(StepItemStatusEnum2) {
  StepItemStatusEnum2["wait"] = "wait";
  StepItemStatusEnum2["process"] = "process";
  StepItemStatusEnum2["finish"] = "finish";
  StepItemStatusEnum2["error"] = "error";
})(StepItemStatusEnum || (StepItemStatusEnum = {}));
const genStepsItemStatusStyle = (status, token) => {
  const prefix = `${token.componentCls}-item`;
  const iconColorKey = `${status}IconColor`;
  const titleColorKey = `${status}TitleColor`;
  const descriptionColorKey = `${status}DescriptionColor`;
  const tailColorKey = `${status}TailColor`;
  const iconBgColorKey = `${status}IconBgColor`;
  const iconBorderColorKey = `${status}IconBorderColor`;
  const dotColorKey = `${status}DotColor`;
  return {
    [`${prefix}-${status} ${prefix}-icon`]: {
      backgroundColor: token[iconBgColorKey],
      borderColor: token[iconBorderColorKey],
      [`> ${token.componentCls}-icon`]: {
        color: token[iconColorKey],
        [`${token.componentCls}-icon-dot`]: {
          background: token[dotColorKey]
        }
      }
    },
    [`${prefix}-${status}${prefix}-custom ${prefix}-icon`]: {
      [`> ${token.componentCls}-icon`]: {
        color: token[dotColorKey]
      }
    },
    [`${prefix}-${status} > ${prefix}-container > ${prefix}-content > ${prefix}-title`]: {
      color: token[titleColorKey],
      "&::after": {
        backgroundColor: token[tailColorKey]
      }
    },
    [`${prefix}-${status} > ${prefix}-container > ${prefix}-content > ${prefix}-description`]: {
      color: token[descriptionColorKey]
    },
    [`${prefix}-${status} > ${prefix}-container > ${prefix}-tail::after`]: {
      backgroundColor: token[tailColorKey]
    }
  };
};
const genStepsItemStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow
  } = token;
  const stepsItemCls = `${componentCls}-item`;
  const stepItemIconCls = `${stepsItemCls}-icon`;
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
    [stepsItemCls]: {
      position: "relative",
      display: "inline-block",
      flex: 1,
      overflow: "hidden",
      verticalAlign: "top",
      "&:last-child": {
        flex: "none",
        [`> ${stepsItemCls}-container > ${stepsItemCls}-tail, > ${stepsItemCls}-container >  ${stepsItemCls}-content > ${stepsItemCls}-title::after`]: {
          display: "none"
        }
      }
    },
    [`${stepsItemCls}-container`]: {
      outline: "none",
      [`&:focus-visible`]: {
        [stepItemIconCls]: Object.assign({}, genFocusOutline(token))
      }
    },
    [`${stepItemIconCls}, ${stepsItemCls}-content`]: {
      display: "inline-block",
      verticalAlign: "top"
    },
    [stepItemIconCls]: {
      width: token.iconSize,
      height: token.iconSize,
      marginTop: 0,
      marginBottom: 0,
      marginInlineStart: 0,
      marginInlineEnd: token.marginXS,
      fontSize: token.iconFontSize,
      fontFamily: token.fontFamily,
      lineHeight: `${unit(token.iconSize)}`,
      textAlign: "center",
      borderRadius: token.iconSize,
      border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
      transition: `background-color ${motionDurationSlow}, border-color ${motionDurationSlow}`,
      [`${componentCls}-icon`]: {
        position: "relative",
        top: token.iconTop,
        color: token.colorPrimary,
        lineHeight: 1
      }
    },
    [`${stepsItemCls}-tail`]: {
      position: "absolute",
      top: token.calc(token.iconSize).div(2).sub(token.paddingXXS).equal(),
      insetInlineStart: 0,
      width: "100%",
      "&::after": {
        display: "inline-block",
        width: "100%",
        height: token.lineWidth,
        background: token.colorSplit,
        borderRadius: token.lineWidth,
        transition: `background ${motionDurationSlow}`,
        content: '""'
      }
    },
    [`${stepsItemCls}-title`]: {
      position: "relative",
      display: "inline-block",
      paddingInlineEnd: token.padding,
      color: token.colorText,
      fontSize: token.fontSizeLG,
      lineHeight: `${unit(token.titleLineHeight)}`,
      "&::after": {
        position: "absolute",
        top: token.calc(token.titleLineHeight).div(2).equal(),
        insetInlineStart: "100%",
        display: "block",
        width: 9999,
        height: token.lineWidth,
        background: token.processTailColor,
        content: '""'
      }
    },
    [`${stepsItemCls}-subtitle`]: {
      display: "inline",
      marginInlineStart: token.marginXS,
      color: token.colorTextDescription,
      fontWeight: "normal",
      fontSize: token.fontSize
    },
    [`${stepsItemCls}-description`]: {
      color: token.colorTextDescription,
      fontSize: token.fontSize
    }
  }, genStepsItemStatusStyle(StepItemStatusEnum.wait, token)), genStepsItemStatusStyle(StepItemStatusEnum.process, token)), {
    [`${stepsItemCls}-process > ${stepsItemCls}-container > ${stepsItemCls}-title`]: {
      fontWeight: token.fontWeightStrong
    }
  }), genStepsItemStatusStyle(StepItemStatusEnum.finish, token)), genStepsItemStatusStyle(StepItemStatusEnum.error, token)), {
    [`${stepsItemCls}${componentCls}-next-error > ${componentCls}-item-title::after`]: {
      background: token.colorError
    },
    [`${stepsItemCls}-disabled`]: {
      cursor: "not-allowed"
    }
  });
};
const genStepsClickableStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow
  } = token;
  return {
    [`& ${componentCls}-item`]: {
      [`&:not(${componentCls}-item-active)`]: {
        [`& > ${componentCls}-item-container[role='button']`]: {
          cursor: "pointer",
          [`${componentCls}-item`]: {
            [`&-title, &-subtitle, &-description, &-icon ${componentCls}-icon`]: {
              transition: `color ${motionDurationSlow}`
            }
          },
          "&:hover": {
            [`${componentCls}-item`]: {
              [`&-title, &-subtitle, &-description`]: {
                color: token.colorPrimary
              }
            }
          }
        },
        [`&:not(${componentCls}-item-process)`]: {
          [`& > ${componentCls}-item-container[role='button']:hover`]: {
            [`${componentCls}-item`]: {
              "&-icon": {
                borderColor: token.colorPrimary,
                [`${componentCls}-icon`]: {
                  color: token.colorPrimary
                }
              }
            }
          }
        }
      }
    },
    [`&${componentCls}-horizontal:not(${componentCls}-label-vertical)`]: {
      [`${componentCls}-item`]: {
        paddingInlineStart: token.padding,
        whiteSpace: "nowrap",
        "&:first-child": {
          paddingInlineStart: 0
        },
        [`&:last-child ${componentCls}-item-title`]: {
          paddingInlineEnd: 0
        },
        "&-tail": {
          display: "none"
        },
        "&-description": {
          maxWidth: token.descriptionMaxWidth,
          whiteSpace: "normal"
        }
      }
    }
  };
};
const genStepsStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      display: "flex",
      width: "100%",
      fontSize: 0,
      textAlign: "initial"
    }), genStepsItemStyle(token)), genStepsClickableStyle(token)), genStepsCustomIconStyle$1(token)), genStepsSmallStyle$1(token)), genStepsVerticalStyle$1(token)), genStepsLabelPlacementStyle$1(token)), genStepsProgressDotStyle$1(token)), genStepsNavStyle$1(token)), genStepsRTLStyle$1(token)), genStepsProgressStyle$1(token)), genStepsInlineStyle$1(token))
  };
};
const prepareComponentToken = (token) => ({
  titleLineHeight: token.controlHeight,
  customIconSize: token.controlHeight,
  customIconTop: 0,
  customIconFontSize: token.controlHeightSM,
  iconSize: token.controlHeight,
  iconTop: -0.5,
  // magic for ui experience
  iconFontSize: token.fontSize,
  iconSizeSM: token.fontSizeHeading3,
  dotSize: token.controlHeight / 4,
  dotCurrentSize: token.controlHeightLG / 4,
  navArrowColor: token.colorTextDisabled,
  navContentMaxWidth: "auto",
  descriptionMaxWidth: 140,
  waitIconColor: token.wireframe ? token.colorTextDisabled : token.colorTextLabel,
  waitIconBgColor: token.wireframe ? token.colorBgContainer : token.colorFillContent,
  waitIconBorderColor: token.wireframe ? token.colorTextDisabled : "transparent",
  finishIconBgColor: token.wireframe ? token.colorBgContainer : token.controlItemBgActive,
  finishIconBorderColor: token.wireframe ? token.colorPrimary : token.controlItemBgActive
});
const useStyle = genStyleHooks("Steps", (token) => {
  const {
    colorTextDisabled,
    controlHeightLG,
    colorTextLightSolid,
    colorText,
    colorPrimary,
    colorTextDescription,
    colorTextQuaternary,
    colorError,
    colorBorderSecondary,
    colorSplit
  } = token;
  const stepsToken = merge(token, {
    // Steps component less variable
    processIconColor: colorTextLightSolid,
    processTitleColor: colorText,
    processDescriptionColor: colorText,
    processIconBgColor: colorPrimary,
    processIconBorderColor: colorPrimary,
    processDotColor: colorPrimary,
    processTailColor: colorSplit,
    waitTitleColor: colorTextDescription,
    waitDescriptionColor: colorTextDescription,
    waitTailColor: colorSplit,
    waitDotColor: colorTextDisabled,
    finishIconColor: colorPrimary,
    finishTitleColor: colorText,
    finishDescriptionColor: colorTextDescription,
    finishTailColor: colorPrimary,
    finishDotColor: colorPrimary,
    errorIconColor: colorTextLightSolid,
    errorTitleColor: colorError,
    errorDescriptionColor: colorError,
    errorTailColor: colorSplit,
    errorIconBgColor: colorError,
    errorIconBorderColor: colorError,
    errorDotColor: colorError,
    stepsNavActiveColor: colorPrimary,
    stepsProgressSize: controlHeightLG,
    // Steps inline variable
    inlineDotSize: 6,
    inlineTitleColor: colorTextQuaternary,
    inlineTailColor: colorBorderSecondary
  });
  return [genStepsStyle(stepsToken)];
}, prepareComponentToken);
function filter(items) {
  return items.filter((item) => item);
}
function useLegacyItems(items, children) {
  if (items) {
    return items;
  }
  const childrenItems = toArray$1(children).map((node) => {
    if (/* @__PURE__ */ reactExports.isValidElement(node)) {
      const {
        props
      } = node;
      const item = Object.assign({}, props);
      return item;
    }
    return null;
  });
  return filter(childrenItems);
}
var __rest = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const Steps = (props) => {
  const {
    percent,
    size: customizeSize,
    className,
    rootClassName,
    direction,
    items,
    responsive = true,
    current = 0,
    children,
    style
  } = props, restProps = __rest(props, ["percent", "size", "className", "rootClassName", "direction", "items", "responsive", "current", "children", "style"]);
  const {
    xs
  } = useBreakpoint(responsive);
  const {
    getPrefixCls,
    direction: rtlDirection,
    steps
  } = reactExports.useContext(ConfigContext);
  const realDirectionValue = reactExports.useMemo(() => responsive && xs ? "vertical" : direction, [xs, direction]);
  const size = useSize(customizeSize);
  const prefixCls = getPrefixCls("steps", props.prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const isInline = props.type === "inline";
  const iconPrefix = getPrefixCls("", props.iconPrefix);
  const mergedItems = useLegacyItems(items, children);
  const mergedPercent = isInline ? void 0 : percent;
  const mergedStyle = Object.assign(Object.assign({}, steps === null || steps === void 0 ? void 0 : steps.style), style);
  const stepsClassName = classNames(steps === null || steps === void 0 ? void 0 : steps.className, {
    [`${prefixCls}-rtl`]: rtlDirection === "rtl",
    [`${prefixCls}-with-progress`]: mergedPercent !== void 0
  }, className, rootClassName, hashId, cssVarCls);
  const icons = {
    finish: /* @__PURE__ */ reactExports.createElement(CheckOutlined, {
      className: `${prefixCls}-finish-icon`
    }),
    error: /* @__PURE__ */ reactExports.createElement(CloseOutlined, {
      className: `${prefixCls}-error-icon`
    })
  };
  const stepIconRender = (_ref) => {
    let {
      node,
      status
    } = _ref;
    if (status === "process" && mergedPercent !== void 0) {
      const progressWidth = size === "small" ? 32 : 40;
      return /* @__PURE__ */ reactExports.createElement("div", {
        className: `${prefixCls}-progress-icon`
      }, /* @__PURE__ */ reactExports.createElement(Progress$1, {
        type: "circle",
        percent: mergedPercent,
        size: progressWidth,
        strokeWidth: 4,
        format: () => null
      }), node);
    }
    return node;
  };
  const itemRender = (item, stepItem) => item.description ? /* @__PURE__ */ reactExports.createElement(Tooltip, {
    title: item.description
  }, stepItem) : stepItem;
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(Steps$2, Object.assign({
    icons
  }, restProps, {
    style: mergedStyle,
    current,
    size,
    items: mergedItems,
    itemRender: isInline ? itemRender : void 0,
    stepIcon: stepIconRender,
    direction: realDirectionValue,
    prefixCls,
    iconPrefix,
    className: stepsClassName
  })));
};
Steps.Step = Steps$2.Step;
const Steps$1 = Steps;
const DateView = ({ value }) => value ? value.format("MMM Do YYYY") : "N/A";
NiceForm.defineWidget("date-view", DateView);
const getInitialMeta = () => {
  const wizardMeta = {
    steps: [
      {
        title: "Personal Information",
        formMeta: {
          columns: 2,
          fields: [
            { key: "name.first", label: "First Name", initialValue: "Nate", required: true },
            { key: "name.last", label: "Last Name", initialValue: "Wang", required: true },
            { key: "dob", label: "Date of Birth", widget: "date-picker", viewWidget: "date-view" },
            {
              key: "noAccountInfo",
              label: "No Account Info",
              widget: "switch",
              // dynamic: true,
              tooltip: "Switch on to remove account step"
            }
          ]
        }
      },
      {
        title: "Account Information",
        formMeta: {
          columns: 2,
          fields: [
            {
              key: "email",
              label: "Email",
              clear: "right",
              rules: [{ type: "email", message: "Invalid email" }]
            },
            {
              key: "security",
              label: "Security Question",
              widget: "select",
              placeholder: "Select a question...",
              options: ["What's your pet's name?", "Your nick name?"]
            },
            { key: "answer", label: "Security Answer" }
          ]
        }
      },
      {
        title: "Contact Information",
        formMeta: {
          columns: 2,
          fields: [
            { key: "address", label: "Address", colSpan: 2 },
            { key: "city", label: "City" },
            { key: "phone", label: "phone" }
          ]
        }
      }
    ]
  };
  return wizardMeta;
};
const Wizard = () => {
  const [form] = Form.useForm();
  const updateOnChange = NiceForm.useUpdateOnChange("*");
  const [currentStep, setCurrentStep] = reactExports.useState(0);
  const handleFinish = reactExports.useCallback(() => {
    console.log("Submit: ", form.getFieldsValue(true));
  }, [form]);
  const newWizardMeta = getInitialMeta();
  if (form.getFieldValue("noAccountInfo")) {
    newWizardMeta.steps.splice(1, 1);
  }
  const reviewFields = [];
  newWizardMeta.steps.forEach((s, i) => {
    reviewFields.push(
      {
        key: "review" + i,
        colSpan: 2,
        render() {
          return /* @__PURE__ */ jsx("fieldset", { children: /* @__PURE__ */ jsx("legend", { children: s.title }) });
        }
      },
      ...s.formMeta.fields
    );
  });
  newWizardMeta.steps.push({
    key: "review",
    title: "Review",
    formMeta: {
      columns: 2,
      fields: reviewFields
    }
  });
  const stepsLength = newWizardMeta.steps.length;
  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };
  const handleBack = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep - 1);
    });
  };
  const isReview = currentStep === stepsLength - 1;
  return /* @__PURE__ */ jsxs(
    Form,
    {
      layout: "horizontal",
      form,
      style: { width: "880px" },
      onFinish: handleFinish,
      onValuesChange: updateOnChange,
      children: [
        /* @__PURE__ */ jsx(
          Steps$1,
          {
            current: currentStep,
            items: newWizardMeta.steps.map((s) => ({ key: s.title, title: s.title }))
          }
        ),
        /* @__PURE__ */ jsx("div", { style: { background: "#f7f7f7", padding: "20px", margin: "30px 0" }, children: /* @__PURE__ */ jsx(
          NiceForm,
          {
            meta: {
              ...newWizardMeta.steps[currentStep].formMeta,
              viewMode: currentStep === stepsLength - 1,
              initialValues: form.getFieldsValue(true)
            }
          }
        ) }),
        /* @__PURE__ */ jsxs(Form.Item, { className: "form-footer", style: { textAlign: "right" }, children: [
          currentStep > 0 && /* @__PURE__ */ jsx(Button, { onClick: handleBack, style: { float: "left", marginTop: "5px" }, children: "Back" }),
          /* @__PURE__ */ jsx(Button, { children: "Cancel" }),
          "   ",
          /* @__PURE__ */ jsx(Button, { type: "primary", onClick: isReview ? () => form.submit() : handleNext, children: isReview ? "Submit" : "Next" })
        ] })
      ]
    }
  );
};
export {
  Wizard as default
};
