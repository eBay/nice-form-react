import { F as Form, j as jsxs, a as jsx, N as NiceForm, B as Button } from "./index-e5f2dcb2.js";
const FieldCondition = () => {
  const [form] = Form.useForm();
  const favoriteFruit = Form.useWatch("favoriteFruit", form);
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
      },
      {
        key: "otherFruit",
        label: "Other",
        condition: () => favoriteFruit === "Other"
      }
    ]
  };
  return /* @__PURE__ */ jsxs(Form, { form, onFinish: handleFinish, children: [
    /* @__PURE__ */ jsx(NiceForm, { meta }),
    /* @__PURE__ */ jsx(Form.Item, { wrapperCol: { span: 16, offset: 8 }, children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Submit" }) })
  ] });
};
export {
  FieldCondition as default
};
