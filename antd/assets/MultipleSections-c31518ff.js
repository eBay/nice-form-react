import { F as Form, r as reactExports, j as jsxs, a as jsx, N as NiceForm, B as Button } from "./index-1b36a43b.js";
const MultipleSections = () => {
  const [form] = Form.useForm();
  const handleFinish = reactExports.useCallback((values) => {
    console.log("Submit: ", values);
  }, []);
  const meta = {
    columns: 1,
    fields: [
      { key: "name.first", label: "First Name", required: true },
      { key: "name.last", label: "Last Name", required: true },
      { key: "dob", label: "Date of Birth", widget: "date-picker", fullWidth: true },
      {
        key: "email",
        label: "Email",
        rules: [{ type: "email", message: "Invalid email" }]
      },
      {
        key: "security",
        label: "Security Question",
        widget: "select",
        placeholder: "Select a question...",
        options: ["What's your pet's name?", "Your nick name?"]
      },
      { key: "answer", label: "Security Answer" },
      { key: "address", label: "Address" },
      { key: "city", label: "City" },
      { key: "phone", label: "phone" }
    ]
  };
  const meta1 = {
    ...meta,
    fields: meta.fields.slice(0, 3)
  };
  const meta2 = {
    ...meta,
    fields: meta.fields.slice(3, 6)
  };
  const meta3 = {
    ...meta,
    fields: meta.fields.slice(6)
  };
  return /* @__PURE__ */ jsxs(Form, { layout: "horizontal", form, onFinish: handleFinish, style: { width: "500px" }, children: [
    /* @__PURE__ */ jsxs("fieldset", { children: [
      /* @__PURE__ */ jsx("legend", { children: "Personal Information" }),
      /* @__PURE__ */ jsx(NiceForm, { meta: meta1 })
    ] }),
    /* @__PURE__ */ jsxs("fieldset", { children: [
      /* @__PURE__ */ jsx("legend", { children: "Account Information" }),
      /* @__PURE__ */ jsx(NiceForm, { meta: meta2 })
    ] }),
    /* @__PURE__ */ jsxs("fieldset", { children: [
      /* @__PURE__ */ jsx("legend", { children: "Contact Information" }),
      /* @__PURE__ */ jsx(NiceForm, { meta: meta3 })
    ] }),
    /* @__PURE__ */ jsx(Form.Item, { className: "form-footer", wrapperCol: { span: 16, offset: 8 }, children: /* @__PURE__ */ jsx(Button, { htmlType: "submit", type: "primary", children: "Submit" }) })
  ] });
};
export {
  MultipleSections as default
};
