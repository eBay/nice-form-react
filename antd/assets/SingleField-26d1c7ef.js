import { r as reactExports, j as jsxs, F as Form, a as jsx, N as NiceForm, B as Button } from "./index-1b36a43b.js";
const SingleField = () => {
  const handleFinish = reactExports.useCallback((values) => {
    console.log("Submit: ", values);
  }, []);
  return /* @__PURE__ */ jsxs(Form, { layout: "inline", onFinish: handleFinish, children: [
    /* @__PURE__ */ jsx(
      NiceForm,
      {
        meta: { fields: [{ key: "username", widgetProps: { placeholder: "Username" } }] }
      }
    ),
    /* @__PURE__ */ jsx(
      NiceForm,
      {
        meta: {
          fields: [
            { key: "password", widget: "password", widgetProps: { placeholder: "Password" } }
          ]
        }
      }
    ),
    /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Button, { htmlType: "submit", type: "primary", children: "Login" }) })
  ] });
};
export {
  SingleField as default
};
