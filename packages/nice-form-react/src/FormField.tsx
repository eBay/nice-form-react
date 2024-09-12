import { CSSProperties } from 'react';
import config from './config';
import { NiceFormMeta, NiceFormField, NormalizedFormField } from './types';

/**
 * FormField only manages the layout of the field, and delegates the rendering of the field to the adapter.
 *
 * @param param0
 * @returns
 */
const FormField = ({
  meta,
  field,
}: {
  meta: NiceFormMeta;
  field: NiceFormField;
}): React.ReactNode => {
  if (
    field.condition &&
    typeof field.condition === 'function' &&
    !field.condition({ meta, field })
  ) {
    return null;
  }

  if (field.render) {
    return field.render({ field: field as NormalizedFormField, meta });
  }

  const viewMode = meta.viewMode || field.viewMode;

  const FormWidget = field.widget;
  const ViewWidget = field.viewWidget;
  const widgetProps = { ...field.widgetProps };

  const { renderField, renderFieldWithoutLabel } = config;
  const content = renderField ? (
    renderField({
      meta,
      field: field as NormalizedFormField,
    })
  ) : renderFieldWithoutLabel ? (
    renderFieldWithoutLabel({ meta, field: field as NormalizedFormField })
  ) : viewMode ? (
    field.renderView ? (
      field.renderView!(field.initialValue, { field, meta })
    ) : (
      //@ts-ignore
      <ViewWidget {...field.viewWidgetProps} value={field.initialValue}></ViewWidget>
    )
  ) : (
    //@ts-ignore
    <FormWidget {...widgetProps}>{field.children || null}</FormWidget>
  );

  if (renderField) return content;

  // If some field has label, then we need to set the label width
  const hasLabel = meta.fields.some((f) => f.label);

  const { layout = 'horizontal' } = meta;
  const isVertical = layout === 'vertical';

  let labelWidth: string = '';
  if (!isVertical && hasLabel) {
    labelWidth = String(field.labelWidth || meta.labelWidth || '33%');
    if (labelWidth.endsWith('%')) {
      labelWidth = parseFloat(labelWidth) / (field.colSpan || 1) + '%';
    }
  }

  const style = {
    display: 'grid',
    gridTemplateColumns: !isVertical && hasLabel ? `${labelWidth} 1fr` : '1fr',
    alignContent: 'center',
  };

  let label = null;
  if (hasLabel) {
    const labelStyle: CSSProperties = {
      textAlign: viewMode || isVertical ? 'left' : 'right',
      marginRight: '8px',
    };
    if (field.required) {
      Object.assign(labelStyle, {
        '::before': {
          content: '"*"',
          color: 'red',
        },
      });
    }
    label = (
      <label style={labelStyle} className="nice-form-field-label">
        {field.label}
      </label>
    );
  }
  let help = null;

  // if renderFieldWithoutLabel method exists, it means the adapter has already handled the extra content
  if (!renderFieldWithoutLabel && field.help) {
    const helpStyle: CSSProperties = {
      transform: 'scale(0.7)',
      transformOrigin: 'left',
      opacity: 0.6,
    };
    help = [
      <span key="help-content" style={helpStyle} className="nice-form-field-help">
        {field.help}
      </span>,
    ];
    if (hasLabel && !isVertical) {
      // an empty cell for just layout purpose
      help.unshift(<span key="empty-cell"></span>);
    }
  }

  return (
    <span style={style} className="nice-form-field">
      {label}
      <span>{content}</span>
      {help}
    </span>
  );
};

export default FormField;
