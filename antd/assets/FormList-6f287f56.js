import { r as reactExports, j as jsxs, F as Form, a as jsx, N as NiceForm, B as Button } from "./index-10df278e.js";
const FormList = () => {
  const meta = {
    layout: "horizontal",
    columns: 1,
    initialValues: {
      username: "username",
      items: [""]
    },
    fields: [
      { key: "username", label: "User Name" },
      { key: "items", label: "Items", widget: "form-list" },
      {
        key: "cities",
        label: "Cities",
        widget: "form-list",
        listItemMeta: {
          widget: "select",
          options: ["Beijing", "Shanghai", "Nanjing"]
        }
      },
      { key: "items", label: "Items", widget: "form-list" }
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
  FormList as default
};
