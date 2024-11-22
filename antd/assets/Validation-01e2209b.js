import { F as Form, r as reactExports, j as jsxs, a as jsx, N as NiceForm, B as Button } from "./index-e5f2dcb2.js";
const MOCK_USERNAMES = {
  nate: true,
  bood: true,
  kevin: true
};
const Validation = () => {
  const [form] = Form.useForm();
  const handleSubmit = reactExports.useCallback((values) => {
    console.log("Submit: ", values);
  }, []);
  const meta = {
    fields: [
      {
        key: "username",
        label: "Username",
        extra: "Note: username nate, bood or kevin already exist",
        hasFeedback: true,
        // Show validation status icon in the right
        required: true,
        // this adds an entry to rules: [{ required: true, message: 'Username is required' }]
        rules: [
          {
            validator: (rule, value, callback) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (MOCK_USERNAMES[value]) {
                    reject(new Error(`Username "${value}" already exists.`));
                  } else {
                    resolve(value);
                  }
                }, 1e3);
              });
            }
          }
        ]
      },
      {
        key: "password",
        label: "Password",
        widget: "password",
        onChange: () => {
          if (form.isFieldTouched("confirmPassword")) {
            form.validateFields(["confirmPassword"]);
          }
        },
        rules: [
          // This is equivalent with "required: true"
          {
            required: true,
            message: "Password is required"
          }
        ]
      },
      {
        key: "confirmPassword",
        label: "Confirm Passowrd",
        widget: "password",
        required: true,
        rules: [
          {
            validator: (rule, value, callback) => {
              return new Promise((resolve, reject) => {
                if (value !== form.getFieldValue("password")) {
                  reject(new Error("Two passwords are inconsistent."));
                } else {
                  resolve(value);
                }
              });
            }
          }
        ]
      }
    ]
  };
  return /* @__PURE__ */ jsxs(Form, { form, onFinish: handleSubmit, children: [
    /* @__PURE__ */ jsx(NiceForm, { meta }),
    /* @__PURE__ */ jsx(Form.Item, { wrapperCol: { span: 16, offset: 8 }, children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Register" }) })
  ] });
};
export {
  Validation as default
};
