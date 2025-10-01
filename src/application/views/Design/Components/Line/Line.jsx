import styles from './styles.module.css'

function NewDocumentLineComponent({
  component,
  onBlurCallback,
  onFocusCallback,
}) {
  const onBlur = (e) => {
    onBlurCallback(e);
  }

  const onFocus = (e) => {
    onFocusCallback(e);
  }

  return (
    <div
      className={styles['Line']}
      onBlur={onBlur}
      onFocus={onFocus}
      style={{
        width: component.properties.width ? component.properties.width.value * 2 : '30px',
        height: component.properties.height ? component.properties.height.value * 2 : '30px',
        borderRadius: component.properties.borderRadius ? component.properties.borderRadius.value : '0',
        background: component.properties.fill ? component.properties.fill.value : '#444',
        left: `${component.properties.left?.value / 16}em`,
        top: `${component.properties.top?.value / 16}em`,
      }}
      tabIndex={0}
    />
  )
}

export default NewDocumentLineComponent
