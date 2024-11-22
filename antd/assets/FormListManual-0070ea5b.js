import { r as reactExports, A as AntdIcon, _ as _extends, F as Form, j as jsxs, I as Fragment, a as jsx, N as NiceForm, B as Button } from "./index-e5f2dcb2.js";
var MinusCircleOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" } }, { "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }] }, "name": "minus-circle", "theme": "outlined" };
const MinusCircleOutlinedSvg = MinusCircleOutlined$2;
var MinusCircleOutlined = function MinusCircleOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(AntdIcon, _extends({}, props, {
    ref,
    icon: MinusCircleOutlinedSvg
  }));
};
const MinusCircleOutlined$1 = /* @__PURE__ */ reactExports.forwardRef(MinusCircleOutlined);
const FormListManual = () => {
  const meta = {
    layout: "horizontal",
    columns: 1,
    initialValues: {
      username: "username",
      items: ["ddd", "xxx"]
    },
    fields: [
      { key: "username", label: "User Name" },
      { key: "password", label: "Password", widget: "password" },
      {
        key: "items",
        label: "Items",
        widget: Form.List,
        widgetProps: { name: "items" },
        children: (fields, { add, remove }) => {
          return /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              NiceForm,
              {
                meta: {
                  fields: fields.map((field, i) => {
                    return {
                      ...field,
                      name: [field.name],
                      style: {
                        marginBottom: "10px"
                      },
                      extraNode: /* @__PURE__ */ jsx(Fragment, { children: fields.length > 1 ? /* @__PURE__ */ jsx(
                        MinusCircleOutlined$1,
                        {
                          style: {
                            position: "absolute",
                            right: "-24px",
                            top: "9px",
                            color: "red"
                          },
                          className: "dynamic-delete-button",
                          onClick: () => remove(field.name)
                        }
                      ) : null })
                    };
                  })
                }
              }
            ),
            /* @__PURE__ */ jsx(Button, { type: "link", onClick: () => add(""), children: "+ Add Item" })
          ] });
        }
      }
    ]
  };
  const handleFinish = reactExports.useCallback((values) => {
    console.log("Submit: ", values);
  }, []);
  return /* @__PURE__ */ jsxs(Form, { onFinish: handleFinish, layout: "horizontal", children: [
    /* @__PURE__ */ jsx(NiceForm, { meta }),
    /* @__PURE__ */ jsx(Form.Item, { wrapperCol: { offset: 8 }, children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Log in" }) })
  ] });
};
export {
  FormListManual as default
};
