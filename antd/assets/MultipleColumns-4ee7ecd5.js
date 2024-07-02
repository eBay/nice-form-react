import { F as Form, r as reactExports, j as jsxs, a as jsx, N as NiceForm, B as Button } from "./index-b319c2b3.js";
const MultipleColumns = () => {
  const [form] = Form.useForm();
  const [columns, setColumns] = reactExports.useState(2);
  const handleFinish = reactExports.useCallback((values) => {
    console.log("Submit: ", values);
  }, []);
  const meta = {
    columns,
    fields: [
      {
        key: "columns",
        label: "Columns",
        widget: "radio-group",
        widgetProps: {
          optionType: "button",
          buttonStyle: "solid",
          onChange: (evt) => setColumns(evt.target.value)
        },
        options: [1, 2, 3, 4],
        initialValue: 2,
        help: "Change columns to show layout change"
      },
      { key: "input", label: "Input", required: true, tooltip: "This is the name." },
      {
        key: "checkbox",
        label: "Checkbox",
        widget: "checkbox",
        initialValue: true
      },
      { key: "select", label: "Select", widget: "select", options: ["Apple", "Orange", "Banana"] },
      { key: "password", label: "Password", widget: "password" },
      { key: "textarea", label: "Textarea", widget: "textarea" },
      { key: "number", label: "Number", widget: "number" },
      { key: "date-picker", label: "Date Picker", widget: "date-picker" }
    ]
  };
  return /* @__PURE__ */ jsxs(Form, { form, layout: "horizontal", onFinish: handleFinish, style: { width: "1000px" }, children: [
    /* @__PURE__ */ jsx(NiceForm, { meta }),
    /* @__PURE__ */ jsx(Form.Item, { className: "form-footer", children: /* @__PURE__ */ jsx(Button, { htmlType: "submit", type: "primary", children: "Submit" }) })
  ] });
};
export {
  MultipleColumns as default
};
