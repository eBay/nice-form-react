import { NiceFormConfig, ReactComponent } from './types';

const DefaultViewWidget: ReactComponent = ({ value }) => {
  if (value === null || value === undefined) return 'N/A';
  return String(value);
};

const isHtmlTag = {};
const config: NiceFormConfig = {
  defaultWidget: 'input',
  defaultViewWidget: DefaultViewWidget,
  widgetMap: {},
  metaConverters: [],
  adapters: [],
  addAdapter(adapter) {
    config.adapters.push(adapter);
    Object.assign(config.widgetMap, adapter.widgetMap);
    if (adapter.metaConverter) config.metaConverters.push(adapter.metaConverter);
    if (adapter.renderField) config.renderField = adapter.renderField;
    if (adapter.renderFieldWithoutLabel) {
      config.renderFieldWithoutLabel = adapter.renderFieldWithoutLabel;
    }

    if (adapter.defaultWidget) {
      console.log('set default widget');
      config.defaultWidget = adapter.defaultWidget;
    }
    if (adapter.defaultViewWidget) {
      config.defaultViewWidget = adapter.defaultViewWidget;
    }
  },
  defineWidget(name, widget, metaConverter) {
    this.widgetMap[name] = {
      widget,
      metaConverter,
    };
  },

  /**
   *
   * @param widget
   * @returns Get widget definition from widget name or widget definition
   */
  getWidgetDef(widget) {
    if (!widget) return { widget: 'input' };
    if (typeof widget === 'string') {
      // if widget is a string, find it from widget map
      const def = this.widgetMap?.[widget];
      if (!def) {
        // check if it's a native HTML tag
        if (!isHtmlTag.hasOwnProperty(widget)) {
          try {
            const elStr = document.createElement(widget).toString();
            isHtmlTag[widget] = !['[object HTMLElement]', '[object HTMLUnknownElement]'].includes(
              elStr,
            );
          } catch (err) {
            isHtmlTag[widget] = false;
          }
        }
        if (isHtmlTag[widget]) return { widget };
        throw new Error(`Widget '${widget}' not defined. Did you define it?`);
      }
      return def;
    }

    // If widget is a component, just return it
    return { widget };
  },
};

export default config;
