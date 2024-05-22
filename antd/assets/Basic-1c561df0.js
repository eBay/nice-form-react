import { r as reactExports, A as AntdIcon, _ as _extends, R as React, c as classNames, K as KeyCode, b as _objectWithoutProperties, d as _slicedToArray, u as useMergedState, e as _defineProperty, p as pickAttrs, g as genStyleHooks, m as merge, f as resetComponent, h as unit, C as ConfigContext, T as Tooltip, F as Form, N as NiceForm, j as jsxs, a as jsx, B as Button } from "./index-54cf509a.js";
var StarFilled$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" } }] }, "name": "star", "theme": "filled" };
const StarFilledSvg = StarFilled$2;
var StarFilled = function StarFilled2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(AntdIcon, _extends({}, props, {
    ref,
    icon: StarFilledSvg
  }));
};
const StarFilled$1 = /* @__PURE__ */ reactExports.forwardRef(StarFilled);
function Star(props, ref) {
  var disabled = props.disabled, prefixCls = props.prefixCls, character = props.character, characterRender = props.characterRender, index = props.index, count = props.count, value = props.value, allowHalf = props.allowHalf, focused = props.focused, onHover = props.onHover, onClick = props.onClick;
  var onInternalHover = function onInternalHover2(e) {
    onHover(e, index);
  };
  var onInternalClick = function onInternalClick2(e) {
    onClick(e, index);
  };
  var onInternalKeyDown = function onInternalKeyDown2(e) {
    if (e.keyCode === KeyCode.ENTER) {
      onClick(e, index);
    }
  };
  var starValue = index + 1;
  var classNameList = /* @__PURE__ */ new Set([prefixCls]);
  if (value === 0 && index === 0 && focused) {
    classNameList.add("".concat(prefixCls, "-focused"));
  } else if (allowHalf && value + 0.5 >= starValue && value < starValue) {
    classNameList.add("".concat(prefixCls, "-half"));
    classNameList.add("".concat(prefixCls, "-active"));
    if (focused) {
      classNameList.add("".concat(prefixCls, "-focused"));
    }
  } else {
    if (starValue <= value) {
      classNameList.add("".concat(prefixCls, "-full"));
    } else {
      classNameList.add("".concat(prefixCls, "-zero"));
    }
    if (starValue === value && focused) {
      classNameList.add("".concat(prefixCls, "-focused"));
    }
  }
  var characterNode = typeof character === "function" ? character(props) : character;
  var start = /* @__PURE__ */ React.createElement("li", {
    className: classNames(Array.from(classNameList)),
    ref
  }, /* @__PURE__ */ React.createElement("div", {
    onClick: disabled ? null : onInternalClick,
    onKeyDown: disabled ? null : onInternalKeyDown,
    onMouseMove: disabled ? null : onInternalHover,
    role: "radio",
    "aria-checked": value > index ? "true" : "false",
    "aria-posinset": index + 1,
    "aria-setsize": count,
    tabIndex: disabled ? -1 : 0
  }, /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-first")
  }, characterNode), /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-second")
  }, characterNode)));
  if (characterRender) {
    start = characterRender(start, props);
  }
  return start;
}
const Star$1 = /* @__PURE__ */ React.forwardRef(Star);
function useRefs() {
  var nodeRef = reactExports.useRef({});
  function getRef(index) {
    return nodeRef.current[index];
  }
  function setRef(index) {
    return function(node) {
      nodeRef.current[index] = node;
    };
  }
  return [getRef, setRef];
}
function getScroll(w) {
  var ret = w.pageXOffset;
  var method = "scrollLeft";
  if (typeof ret !== "number") {
    var d = w.document;
    ret = d.documentElement[method];
    if (typeof ret !== "number") {
      ret = d.body[method];
    }
  }
  return ret;
}
function getClientPosition(elem) {
  var x;
  var y;
  var doc = elem.ownerDocument;
  var body = doc.body;
  var docElem = doc && doc.documentElement;
  var box = elem.getBoundingClientRect();
  x = box.left;
  y = box.top;
  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;
  return {
    left: x,
    top: y
  };
}
function getOffsetLeft(el) {
  var pos = getClientPosition(el);
  var doc = el.ownerDocument;
  var w = doc.defaultView || doc.parentWindow;
  pos.left += getScroll(w);
  return pos.left;
}
var _excluded = ["prefixCls", "className", "defaultValue", "value", "count", "allowHalf", "allowClear", "character", "characterRender", "disabled", "direction", "tabIndex", "autoFocus", "onHoverChange", "onChange", "onFocus", "onBlur", "onKeyDown", "onMouseLeave"];
function Rate$2(props, ref) {
  var _classNames;
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-rate" : _props$prefixCls, className = props.className, defaultValue = props.defaultValue, propValue = props.value, _props$count = props.count, count = _props$count === void 0 ? 5 : _props$count, _props$allowHalf = props.allowHalf, allowHalf = _props$allowHalf === void 0 ? false : _props$allowHalf, _props$allowClear = props.allowClear, allowClear = _props$allowClear === void 0 ? true : _props$allowClear, _props$character = props.character, character = _props$character === void 0 ? "★" : _props$character, characterRender = props.characterRender, disabled = props.disabled, _props$direction = props.direction, direction = _props$direction === void 0 ? "ltr" : _props$direction, _props$tabIndex = props.tabIndex, tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex, autoFocus = props.autoFocus, onHoverChange = props.onHoverChange, onChange = props.onChange, onFocus = props.onFocus, onBlur = props.onBlur, onKeyDown = props.onKeyDown, onMouseLeave = props.onMouseLeave, restProps = _objectWithoutProperties(props, _excluded);
  var _useRefs = useRefs(), _useRefs2 = _slicedToArray(_useRefs, 2), getStarRef = _useRefs2[0], setStarRef = _useRefs2[1];
  var rateRef = React.useRef(null);
  var triggerFocus = function triggerFocus2() {
    if (!disabled) {
      var _rateRef$current;
      (_rateRef$current = rateRef.current) === null || _rateRef$current === void 0 ? void 0 : _rateRef$current.focus();
    }
  };
  React.useImperativeHandle(ref, function() {
    return {
      focus: triggerFocus,
      blur: function blur() {
        if (!disabled) {
          var _rateRef$current2;
          (_rateRef$current2 = rateRef.current) === null || _rateRef$current2 === void 0 ? void 0 : _rateRef$current2.blur();
        }
      }
    };
  });
  var _useMergedState = useMergedState(defaultValue || 0, {
    value: propValue
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), value = _useMergedState2[0], setValue = _useMergedState2[1];
  var _useMergedState3 = useMergedState(null), _useMergedState4 = _slicedToArray(_useMergedState3, 2), cleanedValue = _useMergedState4[0], setCleanedValue = _useMergedState4[1];
  var getStarValue = function getStarValue2(index, x) {
    var reverse = direction === "rtl";
    var starValue = index + 1;
    if (allowHalf) {
      var starEle = getStarRef(index);
      var leftDis = getOffsetLeft(starEle);
      var width = starEle.clientWidth;
      if (reverse && x - leftDis > width / 2) {
        starValue -= 0.5;
      } else if (!reverse && x - leftDis < width / 2) {
        starValue -= 0.5;
      }
    }
    return starValue;
  };
  var changeValue = function changeValue2(nextValue) {
    setValue(nextValue);
    onChange === null || onChange === void 0 ? void 0 : onChange(nextValue);
  };
  var _React$useState = React.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), focused = _React$useState2[0], setFocused = _React$useState2[1];
  var onInternalFocus = function onInternalFocus2() {
    setFocused(true);
    onFocus === null || onFocus === void 0 ? void 0 : onFocus();
  };
  var onInternalBlur = function onInternalBlur2() {
    setFocused(false);
    onBlur === null || onBlur === void 0 ? void 0 : onBlur();
  };
  var _React$useState3 = React.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), hoverValue = _React$useState4[0], setHoverValue = _React$useState4[1];
  var onHover = function onHover2(event, index) {
    var nextHoverValue = getStarValue(index, event.pageX);
    if (nextHoverValue !== cleanedValue) {
      setHoverValue(nextHoverValue);
      setCleanedValue(null);
    }
    onHoverChange === null || onHoverChange === void 0 ? void 0 : onHoverChange(nextHoverValue);
  };
  var onMouseLeaveCallback = function onMouseLeaveCallback2(event) {
    if (!disabled) {
      setHoverValue(null);
      setCleanedValue(null);
      onHoverChange === null || onHoverChange === void 0 ? void 0 : onHoverChange(void 0);
    }
    if (event) {
      onMouseLeave === null || onMouseLeave === void 0 ? void 0 : onMouseLeave(event);
    }
  };
  var onClick = function onClick2(event, index) {
    var newValue = getStarValue(index, event.pageX);
    var isReset = false;
    if (allowClear) {
      isReset = newValue === value;
    }
    onMouseLeaveCallback();
    changeValue(isReset ? 0 : newValue);
    setCleanedValue(isReset ? newValue : null);
  };
  var onInternalKeyDown = function onInternalKeyDown2(event) {
    var keyCode = event.keyCode;
    var reverse = direction === "rtl";
    var nextValue = value;
    if (keyCode === KeyCode.RIGHT && nextValue < count && !reverse) {
      if (allowHalf) {
        nextValue += 0.5;
      } else {
        nextValue += 1;
      }
      changeValue(nextValue);
      event.preventDefault();
    } else if (keyCode === KeyCode.LEFT && nextValue > 0 && !reverse) {
      if (allowHalf) {
        nextValue -= 0.5;
      } else {
        nextValue -= 1;
      }
      changeValue(nextValue);
      event.preventDefault();
    } else if (keyCode === KeyCode.RIGHT && nextValue > 0 && reverse) {
      if (allowHalf) {
        nextValue -= 0.5;
      } else {
        nextValue -= 1;
      }
      changeValue(nextValue);
      event.preventDefault();
    } else if (keyCode === KeyCode.LEFT && nextValue < count && reverse) {
      if (allowHalf) {
        nextValue += 0.5;
      } else {
        nextValue += 1;
      }
      changeValue(nextValue);
      event.preventDefault();
    }
    onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(event);
  };
  React.useEffect(function() {
    if (autoFocus && !disabled) {
      triggerFocus();
    }
  }, []);
  var starNodes = new Array(count).fill(0).map(function(item, index) {
    return /* @__PURE__ */ React.createElement(Star$1, {
      ref: setStarRef(index),
      index,
      count,
      disabled,
      prefixCls: "".concat(prefixCls, "-star"),
      allowHalf,
      value: hoverValue === null ? value : hoverValue,
      onClick,
      onHover,
      key: item || index,
      character,
      characterRender,
      focused
    });
  });
  var classString = classNames(prefixCls, className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction === "rtl"), _classNames));
  return /* @__PURE__ */ React.createElement("ul", _extends({
    className: classString,
    onMouseLeave: onMouseLeaveCallback,
    tabIndex: disabled ? -1 : tabIndex,
    onFocus: disabled ? null : onInternalFocus,
    onBlur: disabled ? null : onInternalBlur,
    onKeyDown: disabled ? null : onInternalKeyDown,
    ref: rateRef,
    role: "radiogroup"
  }, pickAttrs(restProps, {
    aria: true,
    data: true,
    attr: true
  })), starNodes);
}
const Rate$3 = /* @__PURE__ */ React.forwardRef(Rate$2);
const genRateStarStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-star`]: {
      position: "relative",
      display: "inline-block",
      color: "inherit",
      cursor: "pointer",
      "&:not(:last-child)": {
        marginInlineEnd: token.marginXS
      },
      "> div": {
        transition: `all ${token.motionDurationMid}, outline 0s`,
        "&:hover": {
          transform: token.starHoverScale
        },
        "&:focus": {
          outline: 0
        },
        "&:focus-visible": {
          outline: `${unit(token.lineWidth)} dashed ${token.starColor}`,
          transform: token.starHoverScale
        }
      },
      "&-first, &-second": {
        color: token.starBg,
        transition: `all ${token.motionDurationMid}`,
        userSelect: "none"
      },
      "&-first": {
        position: "absolute",
        top: 0,
        insetInlineStart: 0,
        width: "50%",
        height: "100%",
        overflow: "hidden",
        opacity: 0
      },
      [`&-half ${componentCls}-star-first, &-half ${componentCls}-star-second`]: {
        opacity: 1
      },
      [`&-half ${componentCls}-star-first, &-full ${componentCls}-star-second`]: {
        color: "inherit"
      }
    }
  };
};
const genRateRtlStyle = (token) => ({
  [`&-rtl${token.componentCls}`]: {
    direction: "rtl"
  }
});
const genRateStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      display: "inline-block",
      margin: 0,
      padding: 0,
      color: token.starColor,
      fontSize: token.starSize,
      lineHeight: 1,
      listStyle: "none",
      outline: "none",
      // disable styles
      [`&-disabled${componentCls} ${componentCls}-star`]: {
        cursor: "default",
        "> div:hover": {
          transform: "scale(1)"
        }
      }
    }), genRateStarStyle(token)), genRateRtlStyle(token))
  };
};
const prepareComponentToken = (token) => ({
  starColor: token.yellow6,
  starSize: token.controlHeightLG * 0.5,
  starHoverScale: "scale(1.1)",
  starBg: token.colorFillContent
});
const useStyle = genStyleHooks("Rate", (token) => {
  const rateToken = merge(token, {});
  return [genRateStyle(rateToken)];
}, prepareComponentToken);
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
const Rate = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls,
    className,
    rootClassName,
    style,
    tooltips,
    character = /* @__PURE__ */ reactExports.createElement(StarFilled$1, null)
  } = props, rest = __rest(props, ["prefixCls", "className", "rootClassName", "style", "tooltips", "character"]);
  const characterRender = (node, _ref) => {
    let {
      index
    } = _ref;
    if (!tooltips) {
      return node;
    }
    return /* @__PURE__ */ reactExports.createElement(Tooltip, {
      title: tooltips[index]
    }, node);
  };
  const {
    getPrefixCls,
    direction,
    rate
  } = reactExports.useContext(ConfigContext);
  const ratePrefixCls = getPrefixCls("rate", prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(ratePrefixCls);
  const mergedStyle = Object.assign(Object.assign({}, rate === null || rate === void 0 ? void 0 : rate.style), style);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(Rate$3, Object.assign({
    ref,
    character,
    characterRender
  }, rest, {
    className: classNames(className, rootClassName, hashId, cssVarCls, rate === null || rate === void 0 ? void 0 : rate.className),
    style: mergedStyle,
    prefixCls: ratePrefixCls,
    direction
  })));
});
const Rate$1 = Rate;
const Basic = () => {
  const [form] = Form.useForm();
  const updateOnChange = NiceForm.useUpdateOnChange(["checkbox"]);
  const options = ["Apple", "Orange", "Banana"];
  const meta = {
    columns: 1,
    initialValues: { obj: { input: 12 } },
    layout: "horizontal",
    wrapperProps: {
      labelCol: {
        span: 8
      }
    },
    fields: [
      {
        key: "obj.input",
        name: ["obj", "input"],
        label: "Input",
        required: true,
        tooltip: "Name",
        help: "Name"
      },
      {
        key: "checkbox",
        label: "Checkbox",
        widget: "checkbox",
        initialValue: true
      },
      {
        key: "rating",
        label: "Rating",
        widget: Rate$1,
        initialValue: 2,
        condition: () => {
          return NiceForm.getFieldValue("checkbox", meta, form);
        }
      },
      { key: "switch", label: "Switch", widget: "switch", initialValue: true },
      {
        key: "select",
        label: "Select",
        widget: "select",
        required: true,
        options
      },
      {
        key: "checkbox-group",
        label: "Checkbox Group",
        widget: "checkbox-group",
        options
      },
      {
        key: "radio-group",
        label: "Radio Group",
        widget: "radio-group",
        options
      },
      {
        key: "radio-button-group",
        label: "Radio Button Group",
        widget: "radio-group",
        widgetProps: {
          optionType: "button",
          buttonStyle: "solid"
        },
        options
      },
      {
        key: "password",
        label: "Password",
        widget: "password",
        required: true,
        rules: [{ required: true, message: "password is required" }]
      },
      { key: "textarea", label: "Textarea", widget: "textarea" },
      { key: "number", label: "Number", widget: "number", fullWidth: true },
      { key: "date-picker", label: "Date Picker", widget: "date-picker", fullWidth: true }
    ]
  };
  const handleFinish = (values) => {
    form.validateFields().then(() => {
      console.log("on finish: ", values);
    });
  };
  return /* @__PURE__ */ jsxs(Form, { form, onValuesChange: updateOnChange, onFinish: handleFinish, children: [
    /* @__PURE__ */ jsx(NiceForm, { meta }),
    /* @__PURE__ */ jsx(Form.Item, { wrapperCol: { span: 16, offset: 8 }, className: "form-footer", children: /* @__PURE__ */ jsx(Button, { htmlType: "submit", type: "primary", children: "Submit" }) })
  ] });
};
export {
  Basic as default
};
