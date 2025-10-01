import styles from './styles.module.css'

function ImageComponent({
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
      <img
        className={styles['Circle']}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeydown}
        draggable={false}
        src={component.properties.src.value}
        style={{
          background: component.properties.fill ? component.properties.fill.value : '#444',
          borderColor: `${component.properties.strokeColor?.value}`,
          borderStyle: 'solid',
          borderWidth: `${component.properties.strokeWidth?.value / factor}em`,
          boxShadow: `${component.properties.shadow?.value ? `
            ${component.properties.shadowOffsetX?.value}px ${component.properties.shadowOffsetY?.value}px ${component.properties.shadowBlur?.value}px ${component.properties.shadowSpread?.value}px ${component.properties.shadowColor?.value}
          ` : ''}`,
          height: `${component.properties.height?.value / factor}em`,
          left: `${component.properties.left?.value / factor}em`,
          objectFit: `${component.properties.imageFit?.value}`,
          opacity: `${component.properties.opacity?.value}`,
          padding: `${component.properties.paddingTop?.value / factor}em ${component.properties.paddingRight?.value / factor}em ${component.properties.paddingBottom?.value / factor}em ${component.properties.paddingLeft?.value / factor}em`,
          position: (rowId || columnId) ? 'relative' : 'absolute',
          top: `${component.properties.top?.value / factor}em`,
          width: `${component.properties.width?.value / factor}em`,
          zIndex: `${component.properties.zIndex?.value}`,
        }}
        tabIndex={400}
      />
    )
  }

export default ImageComponent
