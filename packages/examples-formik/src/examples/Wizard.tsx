import { useState } from 'react';
import NiceForm from '@ebay/nice-form-react';
import type { Dayjs } from 'dayjs';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Divider from '@mui/material/Divider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const DateView = ({ value }: { value: Dayjs }) => (value ? value.format('MMM Do YYYY') : 'N/A');

NiceForm.defineWidget('date-view', DateView);

const wizardMeta = {
  steps: [
    {
      title: 'Personal Information',
      formMeta: {
        columns: 2,
        rowGap: 18,
        columnGap: 18,
        fields: [
          { key: 'name.first', label: 'First Name', initialValue: 'Nate', required: true },
          { key: 'name.last', label: 'Last Name', initialValue: 'Wang', required: true },
          { key: 'dob', label: 'Date of Birth', widget: 'date-picker', viewWidget: 'date-view' },
          {
            key: 'noAccountInfo',
            label: 'No Account Info',
            widget: 'switch',
            tooltip: 'Switch on to remove account step',
          },
        ],
      },
    },
    {
      title: 'Account Information',
      formMeta: {
        columns: 2,
        rowGap: 18,
        columnGap: 18,
        fields: [
          {
            key: 'email',
            label: 'Email',
            clear: 'right',
            rules: [{ type: 'email', message: 'Invalid email' }],
          },
          {
            key: 'security',
            label: 'Security Question',
            widget: 'select',
            fullWidth: true,
            placeholder: 'Select a question...',
            options: ["What's your pet's name?", 'Your nick name?'],
          },
          { key: 'answer', label: 'Security Answer' },
        ],
      },
    },
    {
      title: 'Contact Information',
      formMeta: {
        columns: 2,
        rowGap: 18,
        columnGap: 18,
        fields: [
          { key: 'address', label: 'Address', colSpan: 2 },
          { key: 'city', label: 'City' },
          { key: 'phone', label: 'phone' },
        ],
      },
    },
  ],
};

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Clone the meta for dynamic change
  const newWizardMeta = JSON.parse(JSON.stringify(wizardMeta));

  // In a wizard, every field should be preserved when swtich steps.
  // newWizardMeta.steps.forEach(s => s.formMeta.fields.forEach(f => (f.preserve = true)))
  // if (values.noAccountInfo) {
  //   newWizardMeta.steps.splice(1, 1);
  // }
  // Generate a general review step
  const reviewFields: object[] = [];
  newWizardMeta.steps.forEach((s: Step, i: number) => {
    reviewFields.push(
      {
        key: 'review' + i,
        colSpan: 2,
        render() {
          return (
            <header>
              <span style={{ lineHeight: '32px', color: 'rgba(0,0,0,0.45)' }}>{s.title}</span>
              <Divider></Divider>
            </header>
          );
        },
      },
      ...s.formMeta.fields,
    );
  });

  newWizardMeta.steps.push({
    key: 'review',
    title: 'Review',
    formMeta: {
      columns: 2,
      rowGap: 18,
      fields: reviewFields,
    },
  });

  const stepsLength = newWizardMeta.steps.length;

  const handleNext = (validateForm) => {
    validateForm(newWizardMeta.steps?.[currentStep]?.formMeta?.fields?.map((f) => f.key)).then(
      () => {
        setCurrentStep(currentStep + 1);
      },
    );
  };

  const handleBack = (validateForm) => {
    validateForm(newWizardMeta.steps?.[currentStep]?.formMeta?.fields?.map((f) => f.key)).then(
      () => {
        setCurrentStep(currentStep - 1);
      },
    );
  };

  const isReview = currentStep === stepsLength - 1;
  return (
    <Formik initialValues={{ name: { first: 'Nate', last: 'Wang' } }}>
      {(form) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Form style={{ width: '880px' }}>
              <Stepper activeStep={currentStep}>
                {newWizardMeta.steps.map((step, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={index} {...stepProps}>
                      <StepLabel {...labelProps}>{step.title}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <div style={{ background: '#f7f7f7', padding: '20px', margin: '30px 0' }}>
                <NiceForm
                  meta={{
                    ...newWizardMeta.steps[currentStep].formMeta,
                    viewMode: currentStep === stepsLength - 1,
                    initialValues: form.values,
                  }}
                />
              </div>
              {currentStep > 0 && (
                <Button
                  onClick={() => handleBack(form.validateForm)}
                  style={{ float: 'left', marginTop: '5px' }}
                  variant="outlined"
                >
                  Back
                </Button>
              )}
              <Button
                style={{ float: 'right', marginLeft: '15px' }}
                variant="contained"
                onClick={
                  isReview
                    ? () => form.submitForm()
                    : () => {
                        handleNext(form.validateForm);
                      }
                }
              >
                {isReview ? 'Submit' : 'Next'}
              </Button>
              &nbsp; &nbsp;
              <Button onClick={form.handleReset} style={{ float: 'right' }} variant="outlined">
                Reset
              </Button>
            </Form>
          </LocalizationProvider>
        );
      }}
    </Formik>
  );
};
export default Wizard;
