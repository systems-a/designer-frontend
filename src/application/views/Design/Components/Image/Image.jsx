import styles from './styles.module.css'

function ImageComponent({
  columnId,
  rowId,
  component,
  onBlurCallback,
  onContextMenuCallback,
  onFocusCallback,
  onKeyDownCallback,
  onMouseDownCallback,
  onMouseUpCallback,
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
    <img
      className={styles['Image']}
      draggable={false}
      id={component.id}
      onBlur={onBlur}
      onContextMenu={onContextMenu}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      src={component.properties.image.properties.src.value}
      style={{
        background: component.properties.color.properties.fill ? component.properties.color.properties.fill.value : '#444',
        borderColor: `${component.properties.stroke.properties.strokeColor?.value}`,
        borderStyle: 'solid',
        borderWidth: `${component.properties.stroke.properties.strokeWidth?.value / scaleFactor}em`,
        boxShadow: `${component.properties.shadow ? `
          ${component.properties.shadow.properties.shadowOffsetX?.value}px ${component.properties.shadow.properties.shadowOffsetY?.value}px ${component.properties.shadow.properties.shadowBlur?.value}px ${component.properties.shadow.properties.shadowSpread?.value}px ${component.properties.shadow.properties.shadowColor?.value}
        ` : ''}`,
        height: `${component.properties.dimensions.properties.height?.value / scaleFactor}em`,
        left: `${component.properties.position.properties.left?.value / scaleFactor}em`,
        objectFit: `${component.properties.image.properties.imageFit?.value}`,
        opacity: `${component.properties.opacity.properties.value.value}`,
        padding: `${component.properties.spacing.properties.paddingTop?.value / scaleFactor}em ${component.properties.spacing.properties.paddingRight?.value / scaleFactor}em ${component.properties.spacing.properties.paddingBottom?.value / scaleFactor}em ${component.properties.spacing.properties.paddingLeft?.value / scaleFactor}em`,
        position: (rowId || columnId) ? 'relative' : 'absolute',
        top: `${component.properties.position.properties.top?.value / scaleFactor}em`,
        width: `${component.properties.dimensions.properties.width?.value / scaleFactor}em`,
        zIndex: `${component.properties.position.properties.zIndex?.value}`,
      }}
      tabIndex={400}
    />
  )
}

export default ImageComponent
