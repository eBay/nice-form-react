import { F as Form, r as reactExports, j as jsxs, a as jsx, N as NiceForm, B as Button } from "./index-e5f2dcb2.js";
const Coordinated = () => {
  const [form] = Form.useForm();
  const handleFinish = reactExports.useCallback((values) => {
    console.log("Submit: ", values);
  }, []);
  const meta = {
    fields: [
      {
        key: "gender",
        label: "Gender",
        widget: "radio-group",
        options: ["Male", "Female"],
        onChange: (evt) => {
          if (evt.target.value === "Male") {
            form.setFieldsValue({ note: "Hi, man!" });
          } else {
            form.setFieldsValue({ note: "Hi, lady!" });
          }
        }
      },
      { key: "note", label: "Note" }
    ]
  };
  return /* @__PURE__ */ jsxs(Form, { onFinish: handleFinish, form, children: [
    /* @__PURE__ */ jsx(NiceForm, { meta }),
    /* @__PURE__ */ jsx(Form.Item, { wrapperCol: { span: 16, offset: 8 }, children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Submit" }) })
  ] });
};
export {
  Coordinated as default
};
