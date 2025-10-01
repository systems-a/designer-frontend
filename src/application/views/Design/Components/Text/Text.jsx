import { updateComponentProperty } from '../../lib/components';
import styles from './styles.module.css'

function TextComponent({
  columnId,
  component,
  doc,
  onBlurCallback,
  onFocusCallback,
  pageIndex,
  rowId,
  setDoc,
}) {
  const factor = 12;

  const onBlur = (e) => {
    setDoc(updateComponentProperty(
      doc,
      pageIndex,
      rowId,
      columnId,
      component.id,
      'textContent',
      { ...component.properties.textContent, value: e.target.innerHTML }
    ))

    onBlurCallback(e);
  }

  const onFocus = (e) => {
    onFocusCallback(e);
  }

  return (
    <div
      className={styles['Text']}
      contentEditable
      dangerouslySetInnerHTML={{
        __html: component.properties.textContent ?
        component.properties.textContent.value :
        'Click to edit'
      }}
      onBlur={onBlur}
      onFocus={onFocus}
      style={{
        background: `${component.properties.fill?.value}`,
        borderColor: `${component.properties.strokeColor?.value}`,
        borderStyle: 'solid',
        borderWidth: `${component.properties.strokeWidth?.value / factor}em`,
        boxShadow: `${`
          ${component.properties.shadowOffsetX?.value}px ${component.properties.shadowOffsetY?.value}px ${component.properties.shadowBlur?.value}px ${component.properties.shadowSpread?.value}px ${component.properties.shadowColor?.value}
        `}`,
        color: component.properties.color?.value,
        cursor: 'text',
        height: `${component.properties.height?.value}`,
        left: `${component.properties.left?.value / factor}em`,
        opacity: `${component.properties.opacity?.value}`,
        padding: `${component.properties.paddingTop?.value / factor}em ${component.properties.paddingRight?.value / factor}em ${component.properties.paddingBottom?.value / factor}em ${component.properties.paddingLeft?.value / factor}em`,
        position: (rowId || columnId) ? 'relative' : 'absolute',
        textShadow: `${parseInt(component.properties.textShadowWidth?.value) > 0 ? `
          ${component.properties.textShadowWidth?.value / factor}em ${component.properties.textShadowHorizontalOffset?.value / factor}em ${component.properties.textShadowVerticalOffset?.value / factor}em ${component.properties.textShadowColor?.value}
        ` : ''}`,
        top: `${component.properties.top?.value / factor}em`,
        whiteSpace: 'preserve',
        width: `${component.properties.width?.value}`,
        zIndex: `${component.properties.zIndex?.value}`,
      }}
      tabIndex={0}
    />
  )
}

export default TextComponent
