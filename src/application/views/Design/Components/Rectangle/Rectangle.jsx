import styles from './styles.module.css'

function RectangleComponent({
  columnId,
  component,
  onBlurCallback,
  onContextMenuCallback,
  onFocusCallback,
  onKeyDownCallback,
  onMouseDownCallback,
  onMouseUpCallback,
  rowId,
  scaleFactor,
}) {
  const onBlur = (e) => {
    onBlurCallback(e);
  }

  const onFocus = (e) => {
    onFocusCallback(e);
  }

  const onKeyDown = (e) => {
    onKeyDownCallback(e);
  }

  const onMouseDown = (e) => {
    onMouseDownCallback(e);
  }

  const onMouseUp = (e) => {
    onMouseUpCallback(e);
  }

  const onContextMenu = (e) => {
    onContextMenuCallback(e);
  }

  return (
    <div
      className={styles['Rectangle']}
      draggable={false}
      id={component.id}
      onBlur={onBlur}
      onContextMenu={onContextMenu}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{
        background: component.properties.color.properties.fill ? component.properties.color.properties.fill.value : '#444',
        borderBottomLeftRadius: `${component.properties.radius.properties.bottomLeft?.value / scaleFactor}em`,
        borderBottomRightRadius: `${component.properties.radius.properties.bottomRight?.value / scaleFactor}em`,
        borderColor: `${component.properties.stroke.properties.strokeColor?.value}`,
        borderStyle: 'solid',
        borderTopLeftRadius: `${component.properties.radius.properties.topLeft?.value / scaleFactor}em`,
        borderTopRightRadius: `${component.properties.radius.properties.topRight?.value / scaleFactor}em`,
        borderWidth: `${component.properties.stroke.properties.strokeWidth?.value / scaleFactor}em`,
        boxShadow: `${component.properties.shadow ? `
          ${component.properties.shadow.properties.shadowOffsetX?.value}px ${component.properties.shadow.properties.shadowOffsetY?.value}px ${component.properties.shadow.properties.shadowBlur?.value}px ${component.properties.shadow.properties.shadowSpread?.value}px ${component.properties.shadow.properties.shadowColor?.value}
        ` : ''}`,
        height: `${component.properties.dimensions.properties.height?.value / scaleFactor}em`,
        left: `${component.properties.position.properties.left?.value / scaleFactor}em`,
        opacity: `${component.properties.opacity.properties.value.value}`,
        position: (rowId || columnId) ? 'relative' : 'absolute',
        top: `${component.properties.position.properties.top?.value / scaleFactor}em`,
        width: `${component.properties.dimensions.properties.width?.value / scaleFactor}em`,
        zIndex: `${component.properties.position.properties.zIndex?.value}`,
      }}
      tabIndex={0}
    />
  )
}

export default RectangleComponent
