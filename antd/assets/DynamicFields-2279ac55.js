import { F as Form, N as NiceForm, j as jsxs, a as jsx, B as Button } from "./index-54cf509a.js";
const DynamicFields = () => {
  const [form] = Form.useForm();
  Form.useWatch("favoriteFruit", form);
  const handleFinish = (values) => {
    console.log("Submit: ", values);
  };
  const meta = {
    fields: [
      {
        key: "favoriteFruit",
        label: "Favorite Fruit",
        widget: "radio-group",
        options: ["Apple", "Orange", "Other"],
        initialValue: "Apple"
      }
    ]
  };
  if (NiceForm.getFieldValue("favoriteFruit", meta, form) === "Other") {
    meta.fields.push({
      key: "otherFruit",
      label: "Other"
    });
  }
  return /* @__PURE__ */ jsxs(Form, { form, onFinish: handleFinish, children: [
    /* @__PURE__ */ jsx(NiceForm, { meta }),
    /* @__PURE__ */ jsx(Form.Item, { wrapperCol: { span: 16, offset: 8 }, children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Submit" }) })
  ] });
};
export {
  DynamicFields as default
};
