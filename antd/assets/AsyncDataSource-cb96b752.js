import { F as Form, r as reactExports, N as NiceForm, j as jsxs, a as jsx, B as Button } from "./index-54cf509a.js";
const MOCK_DATA = {
  China: ["Beijing", "Shanghai", "Nanjing"],
  USA: ["New York", "San Jose", "Washton"],
  France: ["Paris", "Marseille", "Cannes"]
};
const fetchCities = (country) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (MOCK_DATA[country])
        resolve(MOCK_DATA[country]);
      else
        reject(new Error("Not found"));
    }, 1500);
  });
};
const AsyncDataSource = () => {
  const [form] = Form.useForm();
  const [cities, setCities] = reactExports.useState({});
  const updateOnChange = NiceForm.useUpdateOnChange(["country"]);
  const country = form.getFieldValue("country");
  const loading = country && !cities[country];
  const meta = {
    fields: [
      {
        key: "country",
        label: "Country",
        widget: "select",
        options: ["China", "USA", "France"],
        placeholder: "Select country...",
        initialValue: "China",
        widgetProps: {
          onChange: () => {
            form.setFieldsValue({ city: void 0 });
          }
        }
      },
      {
        key: "city",
        label: "City",
        widget: "select",
        options: country ? cities[country] || [] : [],
        placeholder: loading ? "Loading..." : "Select city...",
        widgetProps: { loading },
        disabled: loading || !country
      }
    ]
  };
  const handleFinish = reactExports.useCallback((values) => {
    console.log("Submit: ", values);
  }, []);
  reactExports.useEffect(() => {
    if (country && !cities[country]) {
      fetchCities(country).then((arr) => {
        setCities((p) => ({ ...p, [country]: arr }));
      });
    }
  }, [country, setCities, cities]);
  return /* @__PURE__ */ jsxs(Form, { form, onFinish: handleFinish, onValuesChange: updateOnChange, children: [
    /* @__PURE__ */ jsx(NiceForm, { meta }),
    /* @__PURE__ */ jsx(Form.Item, { wrapperCol: { span: 16, offset: 8 }, children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", children: "Submit" }) })
  ] });
};
export {
  AsyncDataSource as default
};
