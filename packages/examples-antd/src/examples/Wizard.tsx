import { useCallback, useState } from 'react';
import { Form, Button, Steps } from 'antd';
import NiceForm from '@ebay/nice-form-react';
import { NiceFormFieldType } from '@ebay/nice-form-react/lib/esm/NiceFormMeta';
import type { Dayjs } from 'dayjs';

const { Step } = Steps;
const DateView = ({ value }: { value: Dayjs }) => (value ? value.format('MMM Do YYYY') : 'N/A');

NiceForm.defineWidget('date-view', DateView);

interface Step {
  title: string;
  formMeta: {
    columns: number;
    fields: NiceFormFieldType[];
  };
}

interface WizardMeta {
  steps: Step[];
}

const getInitialMeta = () => {
  const wizardMeta: WizardMeta = {
    steps: [
      {
        title: 'Personal Information',
        formMeta: {
          columns: 2,
          fields: [
            { key: 'name.first', label: 'First Name', initialValue: 'Nate', required: true },
            { key: 'name.last', label: 'Last Name', initialValue: 'Wang', required: true },
            { key: 'dob', label: 'Date of Birth', widget: 'date-picker', viewWidget: 'date-view' },
            {
              key: 'noAccountInfo',
              label: 'No Account Info',
              widget: 'switch',
              // dynamic: true,
              tooltip: 'Switch on to remove account step',
            },
          ],
        },
      },
      {
        title: 'Account Information',
        formMeta: {
          columns: 2,
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
};

export default () => {
  const [form] = Form.useForm();
  const updateOnChange = NiceForm.useUpdateOnChange('*');
  const [currentStep, setCurrentStep] = useState(0);
  const handleFinish = useCallback(() => {
    console.log('Submit: ', form.getFieldsValue(true));
  }, [form]);

  // Clone the meta for dynamic change
  const newWizardMeta = getInitialMeta();
  if (form.getFieldValue('noAccountInfo')) {
    newWizardMeta.steps.splice(1, 1);
  }
  // Generate a general review step
  const reviewFields: NiceFormFieldType[] = [];
  newWizardMeta.steps.forEach((s: Step, i: number) => {
    reviewFields.push(
      {
        key: 'review' + i,
        colSpan: 2,
        render() {
          return (
            <fieldset>
              <legend>{s.title}</legend>
            </fieldset>
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
      fields: reviewFields,
    },
  });

  const stepsLength = newWizardMeta.steps.length;

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };
  const handleBack = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep - 1);
    });
  };
  const isReview = currentStep === stepsLength - 1;
  return (
    <Form
      layout="horizontal"
      form={form}
      style={{ width: '880px' }}
      onFinish={handleFinish}
      onValuesChange={updateOnChange}
    >
      <Steps
        current={currentStep}
        items={newWizardMeta.steps.map((s: Step) => ({ key: s.title, title: s.title }))}
      />
      <div style={{ background: '#f7f7f7', padding: '20px', margin: '30px 0' }}>
        <NiceForm
          meta={{
            ...newWizardMeta.steps[currentStep].formMeta,
            viewMode: currentStep === stepsLength - 1,
            initialValues: form.getFieldsValue(true),
          }}
        />
      </div>
      <Form.Item className="form-footer" style={{ textAlign: 'right' }}>
        {currentStep > 0 && (
          <Button onClick={handleBack} style={{ float: 'left', marginTop: '5px' }}>
            Back
          </Button>
        )}
        <Button>Cancel</Button>&nbsp; &nbsp;
        <Button type="primary" onClick={isReview ? () => form.submit() : handleNext}>
          {isReview ? 'Submit' : 'Next'}
        </Button>
      </Form.Item>
    </Form>
  );
};
