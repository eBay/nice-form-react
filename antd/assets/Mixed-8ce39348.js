import { F as Form, r as reactExports, j as jsxs, a as jsx, N as NiceForm, ah as Input, B as Button } from "./index-b319c2b3.js";
const Mixed = () => {
  const [form] = Form.useForm();
  const handleFinish = reactExports.useCallback((values) => console.log("Submit: ", values), []);
  const meta1 = {
    fields: [
      { key: "name.first", label: "First Name", required: true },
      { key: "name.last", label: "Last Name", required: true },
      { key: "dob", label: "Date of Birth", widget: "date-picker" }
    ]
  };
  const meta2 = {
    fields: [
      {
        key: "email",
        label: "Email",
        rules: [{ type: "email", message: "Invalid email" }]
      }
    ]
  };
  const prefixMeta = {
    fields: [
      {
        key: "prefix",
        options: ["+86", "+87"],
        widget: "select",
        noStyle: true,
        widgetProps: {
          style: { width: 70 },
          noStyle: true
        }
      }
    ]
  };
  const prefixSelector = /* @__PURE__ */ jsx(NiceForm, { meta: prefixMeta });
  return /* @__PURE__ */ jsxs(Form, { layout: "horizontal", form, onFinish: handleFinish, style: { width: "500px" }, children: [
    /* @__PURE__ */ jsx(NiceForm, { meta: meta1 }),
    /* @__PURE__ */ jsx(
      Form.Item,
      {
        label: "Phone Number",
        name: "phone",
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
        rules: [{ required: true, message: "Please input your phone number!" }],
        children: /* @__PURE__ */ jsx(Input, { addonBefore: prefixSelector, style: { width: "100%" } })
      }
    ),
    /* @__PURE__ */ jsx(NiceForm, { meta: meta2 }),
    /* @__PURE__ */ jsx(Form.Item, { wrapperCol: { span: 16, offset: 8 }, className: "form-footer", children: /* @__PURE__ */ jsx(Button, { htmlType: "submit", type: "primary", children: "Submit" }) })
  ] });
};
export {
  Mixed as default
};
