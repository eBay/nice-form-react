import { r as reactExports, j as jsxs, F as Form, a as jsx, N as NiceForm, B as Button } from "./index-e5f2dcb2.js";
const Simple = () => {
  const meta = {
    layout: "horizontal",
    columns: 1,
    fields: [
      { key: "username", label: "User Name" },
      { key: "password", label: "Password", widget: "password" }
    ]
  };
  const handleFinish = reactExports.useCallback((values) => {
    console.log("Submit: ", values);
  }, []);
  return /* @__PURE__ */ jsxs(Form, { onFinish: handleFinish, layout: "horizontal", children: [
    /* @__PURE__ */ jsx(NiceForm, { meta }),
    /* @__PURE__ */ jsx(Form.Item, { wrapperCol: { span: 16, offset: 8 }, children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Log in" }) })
  ] });
};
export {
  Simple as default
};
