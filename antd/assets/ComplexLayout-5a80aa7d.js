import { F as Form, r as reactExports, j as jsxs, a as jsx, N as NiceForm, B as Button } from "./index-e5f2dcb2.js";
const ComplexLayout = () => {
  const [form] = Form.useForm();
  const handleFinish = reactExports.useCallback((values) => {
    console.log("Submit: ", values);
  }, []);
  const meta = {
    columns: 4,
    layout: "vertical",
    // Must set for vertical layout
    columnGap: 12,
    fields: [
      {
        key: "label1",
        colSpan: 4,
        render() {
          return /* @__PURE__ */ jsx("fieldset", { children: /* @__PURE__ */ jsx("legend", { children: "Contact Information" }) });
        }
      },
      { key: "address", label: "Address", colSpan: 4 },
      { key: "address2", label: "Address2", colSpan: 4 },
      { key: "city", label: "City", colSpan: 2 },
      { key: "state", label: "State" },
      { key: "zip", label: "Zip Code" },
      {
        key: "label11",
        colSpan: 4,
        render() {
          return /* @__PURE__ */ jsx("fieldset", { children: /* @__PURE__ */ jsx("legend", { children: "Bed & Bath" }) });
        }
      },
      {
        key: "homeType",
        label: "Home Type",
        colSpan: 2,
        widget: "select",
        initialValue: "House",
        options: ["House", "Apartment"]
      },
      {
        key: "roomType",
        label: "Room Type",
        colSpan: 2,
        widget: "select",
        initialValue: "Entire home/apt",
        options: ["Entire home/apt", "Shared"]
      },
      {
        key: "bedrooms",
        label: "Bedrooms",
        colSpan: 2,
        widget: "select",
        options: ["1 Bedroom", "2 Bedrooms"]
      },
      {
        key: "bathrooms",
        label: "Bathrooms",
        colSpan: 2,
        widget: "select",
        options: ["1 Bathroom", "2 Bathrooms"]
      },
      {
        key: "king",
        label: "King",
        widget: "number",
        widgetProps: { style: { width: "100%" } },
        initialValue: 0
      },
      {
        key: "queen",
        label: "Queen",
        widget: "number",
        widgetProps: { style: { width: "100%" } },
        initialValue: 0
      },
      {
        key: "full",
        label: "Full",
        widget: "number",
        widgetProps: { style: { width: "100%" } },
        initialValue: 0
      },
      {
        key: "twin",
        label: "Twin",
        widget: "number",
        widgetProps: { style: { width: "100%" } },
        initialValue: 0
      }
    ]
  };
  return /* @__PURE__ */ jsxs(Form, { form, layout: "vertical", onFinish: handleFinish, children: [
    /* @__PURE__ */ jsx(NiceForm, { meta }),
    /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Button, { htmlType: "submit", type: "primary", style: { width: "100%" }, children: "Submit" }) })
  ] });
};
export {
  ComplexLayout as default
};
