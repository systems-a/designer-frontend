import styles from './styles.module.css'

function RectangleComponent({
  columnId,
  component,
  onBlurCallback,
  onFocusCallback,
  onKeydownCallback,
  rowId,
}) {
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
      className={styles['Rectangle']}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeydown}
      style={{
        width: component.properties.width ? component.properties.width.value * 2 : '30px',
        height: component.properties.height ? component.properties.height.value * 2 : '30px',
        background: component.properties.fill ? component.properties.fill.value : '#444',
        left: `${component.properties.left?.value / 16}em`,
        position: (rowId || columnId) ? 'relative' : 'absolute',
        top: `${component.properties.top?.value / 16}em`,
        zIndex: component.properties.zIndex?.value,
      }}
      tabIndex={0}
    />
  )
}

export default RectangleComponent
