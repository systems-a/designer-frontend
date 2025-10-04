import { getComponentProperty, getComponentPropertyCategory, updateComponentProperty } from '../../../../lib/components';
import styles from './styles.module.css'

function TextComponent({
  columnId,
  component,
  activeDesign,
  onBlurCallback,
  onFocusCallback,
  onMouseDownCallback,
  pageIndex,
  rowId,
  addDesignState,
  scaleFactor,
}) {
  const onBlur = (e) => {
    addDesignState(updateComponentProperty(
      activeDesign,
      pageIndex,
      rowId,
      columnId,
      component.id,
      'text',
      {
        ...getComponentPropertyCategory(activeDesign, pageIndex, rowId, columnId, component.id, 'text'),
        properties: {
          ...getComponentPropertyCategory(activeDesign, pageIndex, rowId, columnId, component.id, 'text').properties,
          textContent: {
            ...getComponentProperty(activeDesign, pageIndex, rowId, columnId, component.id, 'text', 'textContent'),
            value: e.target.innerHTML,
          }
        }
      }
    ))

    onBlurCallback(e);
  }

  const onFocus = (e) => {
    onFocusCallback(e);
  }

  const onMouseDown = (e) => {
    onMouseDownCallback(e);
  }

  return (
    <div
      className={styles['Text']}
      contentEditable
      dangerouslySetInnerHTML={{
        __html: component.properties.text.properties.textContent ?
        component.properties.text.properties.textContent.value :
        'Click to edit'
      }}
      id={component.id}
      onBlur={onBlur}
      onFocus={onFocus}
      onMouseDown={onMouseDown}
      style={{
        background: component.properties.color.properties.fill ? component.properties.color.properties.fill.value : '#444',
        borderColor: `${component.properties.stroke.properties.strokeColor?.value}`,
        borderStyle: 'solid',
        borderWidth: `${component.properties.stroke.properties.strokeWidth?.value / scaleFactor}em`,
        boxShadow: `${component.properties.shadow ? `
          ${component.properties.shadow.properties.shadowOffsetX?.value}px ${component.properties.shadow.properties.shadowOffsetY?.value}px ${component.properties.shadow.properties.shadowBlur?.value}px ${component.properties.shadow.properties.shadowSpread?.value}px ${component.properties.shadow.properties.shadowColor?.value}
        ` : ''}`,
        color: component.properties.color.properties.color ? component.properties.color.properties.color.value : '#444',
        cursor: 'text',
        height: `${component.properties.dimensions.properties.height?.value}`,
        left: `${component.properties.position.properties.left?.value / scaleFactor}em`,
        opacity: `${component.properties.opacity.properties.value.value}`,
        padding: `${component.properties.spacing.properties.paddingTop?.value / scaleFactor}em ${component.properties.spacing.properties.paddingRight?.value / scaleFactor}em ${component.properties.spacing.properties.paddingBottom?.value / scaleFactor}em ${component.properties.spacing.properties.paddingLeft?.value / scaleFactor}em`,
        position: (rowId || columnId) ? 'relative' : 'absolute',
        textShadow: `${parseInt(component.properties.textShadow.properties.textShadowWidth?.value) > 0 ? `
          ${component.properties.textShadow.properties.textShadowWidth?.value / scaleFactor}em ${component.properties.textShadow.properties.textShadowHorizontalOffset?.value / scaleFactor}em ${component.properties.textShadow.properties.textShadowVerticalOffset?.value / scaleFactor}em ${component.properties.textShadow.properties.textShadowColor?.value}
        ` : ''}`,
        top: `${component.properties.position.properties.top?.value / scaleFactor}em`,
        whiteSpace: 'preserve',
        width: `${component.properties.dimensions.properties.width?.value / scaleFactor}em`,
        zIndex: `${component.properties.position.properties.zIndex?.value}`,
      }}
      tabIndex={0}
    />
  )
}

export default TextComponent
