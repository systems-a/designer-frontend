import styles from './styles.module.css'

function CircleComponent({
  columnId,
  rowId,
  component,
  onBlurCallback,
  onFocusCallback,
  onKeydownCallback,
}) {
  const factor = 12;

  const onBlur = (e) => {
    onBlurCallback(e);
  }

  const onFocus = (e) => {
    onFocusCallback(e);
  }

  const onKeydown = (e) => {
    onKeydownCallback(e);
  }

  return (
    <div
      className={styles['Circle']}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeydown}
      style={{
        background: component.properties.fill ? component.properties.fill.value : '#444',
        borderColor: `${component.properties.strokeColor?.value}`,
        borderRadius: '50%',
        borderStyle: 'solid',
        borderWidth: `${component.properties.strokeWidth?.value / factor}em`,
        boxShadow: `${component.properties.shadow?.value ? `
          ${component.properties.shadowOffsetX?.value}px ${component.properties.shadowOffsetY?.value}px ${component.properties.shadowBlur?.value}px ${component.properties.shadowSpread?.value}px ${component.properties.shadowColor?.value}
        ` : ''}`,
        height: component.properties.radius ? component.properties.radius.value * 2 : '30px',
        left: `${component.properties.left?.value / factor}em`,
        opacity: `${component.properties.opacity?.value}`,
        position: (rowId || columnId) ? 'relative' : 'absolute',
        top: `${component.properties.top?.value / factor}em`,
        width: component.properties.radius ? component.properties.radius.value * 2 : '30px',
        zIndex: `${component.properties.zIndex?.value}`,
      }}
      tabIndex={400}
    />
  )
}

export default CircleComponent
