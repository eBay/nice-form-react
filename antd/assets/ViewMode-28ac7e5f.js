import { i as dayjs, a as jsx, j as jsxs, N as NiceForm } from "./index-1b36a43b.js";
const DateView = ({ value }) => value.format("MMM Do YYYY");
const ViewMode = () => {
  const personalInfo = {
    name: { first: "Nate", last: "Wang" },
    email: "myemail@gmail.com",
    gender: "Male",
    dateOfBirth: dayjs("2100-01-01"),
    phone: "15988888888",
    city: "Shanghai",
    address: "No.1000 Some Road, Zhangjiang Park, Pudong New District"
  };
  const meta = {
    columns: 2,
    viewMode: true,
    initialValues: personalInfo,
    fields: [
      { key: "name.first", label: "First Name", tooltip: "First name" },
      { key: "name.last", label: "Last Name" },
      { key: "gender", label: "Gender" },
      {
        key: "dateOfBirth",
        label: "Date of Birth",
        viewWidget: DateView
      },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "address", label: "Address", colSpan: 2 },
      { key: "city", label: "City" },
      { key: "zipCode", label: "Zip Code" }
    ]
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { style: { width: "800px" }, children: [
    /* @__PURE__ */ jsx("h1", { children: "Personal Information" }),
    /* @__PURE__ */ jsx(NiceForm, { meta })
  ] }) });
};
export {
  ViewMode as default
};
