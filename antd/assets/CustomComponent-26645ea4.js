import { F as Form, r as reactExports, j as jsxs, ad as Row, a as jsx, ae as Col, N as NiceForm, B as Button, af as Select, ag as InputNumber, ah as Input } from "./index-b319c2b3.js";
const Option = Select.Option;
const PriceInput = ({ value, onChange }) => value ? /* @__PURE__ */ jsxs(Row, { gutter: 10, children: [
  /* @__PURE__ */ jsx(Col, { span: 16, children: /* @__PURE__ */ jsx(
    InputNumber,
    {
      style: { width: "100%" },
      value: value.price,
      onChange: (v) => onChange({ price: v, currency: value.currency })
    }
  ) }),
  /* @__PURE__ */ jsx(Col, { span: 8, children: /* @__PURE__ */ jsxs(
    Select,
    {
      value: value.currency,
      onChange: (v) => onChange({ price: value.price, currency: v }),
      children: [
        /* @__PURE__ */ jsx(Option, { value: "RMB", children: "RMB" }),
        /* @__PURE__ */ jsx(Option, { value: "USD", children: "USD" })
      ]
    }
  ) })
] }) : null;
const CaptchaInput = (props) => /* @__PURE__ */ jsxs(Row, { gutter: 10, children: [
  /* @__PURE__ */ jsxs(Col, { span: 16, children: [
    /* @__PURE__ */ jsx(Input, { ...props }),
    " "
  ] }),
  /* @__PURE__ */ jsxs(Col, { span: 8, children: [
    /* @__PURE__ */ jsx(Button, { children: "Get Captcha" }),
    " "
  ] })
] });
const CustomComponent = () => {
  const [form] = Form.useForm();
  const handleFinish = reactExports.useCallback((values) => {
    console.log("Submit: ", values);
  }, []);
  const meta = {
    fields: [
      { key: "product", label: "Product" },
      {
        key: "_temp_price_currency",
        label: "Price",
        // Set forwardRef to true if use functional component as field widget
        // to avoid warnings
        widget: PriceInput,
        initialValue: { price: 8, currency: "USD" }
      },
      {
        key: "captcha",
        label: "Captcha",
        required: true,
        extra: "We must make sure that your are a human.",
        widget: CaptchaInput
      },
      {
        key: "shipDate",
        label: "Ship Date",
        readOnly: true,
        viewWidget: () => {
          return /* @__PURE__ */ jsxs(Row, { children: [
            /* @__PURE__ */ jsx(Col, { span: 11, children: /* @__PURE__ */ jsx(
              NiceForm,
              {
                meta: {
                  fields: [
                    {
                      key: "startDate",
                      widget: "date-picker",
                      widgetProps: { style: { width: "100%" } },
                      noStyle: true
                    }
                  ]
                }
              }
            ) }),
            /* @__PURE__ */ jsx(Col, { span: 2, style: { textAlign: "center" }, children: "-" }),
            /* @__PURE__ */ jsx(Col, { span: 11, children: /* @__PURE__ */ jsx(
              NiceForm,
              {
                meta: {
                  fields: [
                    {
                      key: "endDate",
                      widget: "date-picker",
                      widgetProps: { style: { width: "100%" } },
                      noStyle: true
                    }
                  ]
                }
              }
            ) })
          ] });
        }
      },
      { key: "note", label: "Note" }
    ]
  };
  return /* @__PURE__ */ jsxs(Form, { form, onFinish: handleFinish, style: { width: "500px" }, children: [
    /* @__PURE__ */ jsx(NiceForm, { meta }),
    /* @__PURE__ */ jsx(Form.Item, { wrapperCol: { span: 16, offset: 8 }, children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Submit" }) })
  ] });
};
export {
  CustomComponent as default
};
