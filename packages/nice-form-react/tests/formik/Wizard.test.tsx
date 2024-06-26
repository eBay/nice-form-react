import React, { useState } from 'react';
import type { Dayjs } from 'dayjs';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Divider from '@mui/material/Divider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NiceForm from '../../src/NiceForm';
import config from '../../src/config';
import formikMuiAdapter, { FormikMuiNiceFormField } from '../../src/adapters/formikMuiAdapter';
import formikAdapter from '../../src/adapters/formikAdapter';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

config.addAdapter(formikAdapter);
config.addAdapter(formikMuiAdapter);
const DateView = ({ value }: { value: Dayjs }) => (value ? value.format('MMM Do YYYY') : 'N/A');

NiceForm.defineWidget('date-view', DateView, ({ field }) => field);

const getInitialMeta = () => {
  const wizardMeta = {
    steps: [
      {
        key: 'personal',
        title: 'Personal Information',
        formMeta: {
          columns: 2,
          rowGap: 18,
          columnGap: 18,
          fields: [
            { key: 'name.first', label: 'First Name', initialValue: 'Nate', required: true },
            { key: 'name.last', label: 'Last Name', initialValue: 'Wang', required: true },
            {
              key: 'noAccountInfo',
              label: 'No Account Info',
              widget: 'switch',
            },
          ],
        },
      },
      {
        key:'account',
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
        key: 'contact',
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
  return wizardMeta;
}

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Clone the meta for dynamic change
  const newWizardMeta = getInitialMeta();

  // In a wizard, every field should be preserved when swtich steps.
  // newWizardMeta.steps.forEach(s => s.formMeta.fields.forEach(f => (f.preserve = true)))
  // if (values.noAccountInfo) {
  //   newWizardMeta.steps.splice(1, 1);
  // }
  // Generate a general review step
  const reviewFields: FormikMuiNiceFormField[] = [] ;
  newWizardMeta.steps.forEach((s: any, i: number) => {
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
      columnGap: 18, // Add the missing property with value 18
      fields: reviewFields.map((field) => ({
        ...field,
        label: String(field.label),
      })),
    },
  });

  const stepsLength = newWizardMeta.steps.length;

  const handleNext = (validateForm: any) => {
    validateForm(newWizardMeta.steps?.[currentStep]?.formMeta?.fields?.map((f: any) => f.key)).then(
      () => {
        setCurrentStep(currentStep + 1);
      },
    );
  };

  const handleBack = (validateForm: any) => {
    validateForm(newWizardMeta.steps?.[currentStep]?.formMeta?.fields?.map((f: any) => f.key)).then(
      () => {
        setCurrentStep(currentStep - 1);
      },
    );
  };

  const isReview = currentStep === stepsLength - 1;
  return (
    <Formik
      initialValues={{ name: { first: 'Nate', last: 'Wang' } }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(form) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Form style={{ width: '880px' }}>
              <Stepper activeStep={currentStep}>
                {newWizardMeta.steps.map((step: any, index: any) => {
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
                    fields: newWizardMeta.steps[currentStep].formMeta.fields.map((field: any) => ({
                      ...field,
                      clear: undefined,
                    })),
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

describe('formik/Wizard', () => {
  it('renders Wizard Form using formik', async () => {
    render(<Wizard />);
    const firstName = screen.getByText('First Name');
    waitFor(() => expect(firstName).toBeInTheDocument(), { timeout: 3000 });
  });
});
