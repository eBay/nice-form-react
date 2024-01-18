import { CSSProperties, ReactNode } from 'react';
import { NiceFormMeta, NiceFormField } from './types';

/**
 * The layout component of NiceForm based on css grid. It's only used internally.
 * @param param0
 * @returns
 */
const FormLayout: React.FC<{
  elements: { element: ReactNode; field: NiceFormField }[];
  meta: NiceFormMeta;
}> = ({ elements, meta }) => {
  const { columns = 1 } = meta;

  const style = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridColumnGap: meta.columnGap ?? 0,
    gridRowGap: meta.rowGap ?? 0,
  };

  let currentColStart = 0;
  return (
    <div className="nice-form-layout" style={style}>
      {elements.map(({ element, field }) => {
        const colSpan = field.colSpan || 1;
        if (field.clear && ['left', 'both'].includes(field.clear)) {
          currentColStart = 0;
        }
        currentColStart = currentColStart % columns;
        const fieldStyle: CSSProperties = {
          gridColumn: `${currentColStart + 1} / span ${colSpan}`,
          position: 'relative',
        };
        if (field.clear && ['both', 'right'].includes(field.clear)) {
          currentColStart = 0;
        } else {
          currentColStart += colSpan;
        }
        return (
          <div key={field.key} style={fieldStyle}>
            {element}
            {field.extraNode || null}
          </div>
        );
      })}
    </div>
  );
};
export default FormLayout;
