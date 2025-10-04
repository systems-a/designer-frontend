import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css'

import ContextMenu from '../../../../components/ContextMenu/ContextMenu';

function CircleComponent({
  columnId,
  rowId,
  component,
  designPageStyles,
  onBlurCallback,
  onContextMenuActionCallback,
  onContextMenuCallback,
  onFocusCallback,
  onKeyDownCallback,
  onMouseDownCallback,
  onMouseUpCallback,
  scaleFactor,
}) {
  const componentRef = useRef();

  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPositionX, setContextMenuPositionX] = useState(0);
  const [contextMenuPositionY, setContextMenuPositionY] = useState(0);

  const [contextMenuAction, setContextMenuAction] = useState(null);

  const [contextMenuItems] = useState([
    {
      icon: '',
      label: 'Bring to front',
      action: () => setContextMenuAction('bringToFront')
    },
    {
      icon: '',
      label: 'Send to back',
      action: () => setContextMenuAction('sendToBack')
    },
    {
      icon: '',
      label: 'Copy',
      action: () => setContextMenuAction('copy')
    },
    {
      icon: '',
      label: 'Duplicate',
      action: () => setContextMenuAction('duplicate')
    },
    {
      icon: '',
      label: 'Delete',
      action: () => setContextMenuAction('delete')
    },
  ])

  const onBlur = (e) => {
    onBlurCallback(e);
  }

  const onFocus = (e) => {
    setContextMenuVisible(false);
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
    e.preventDefault();
    setContextMenuVisible(true);
    setContextMenuPositionX(e.pageX - scaleFactor);
    setContextMenuPositionY(e.pageY - scaleFactor);
    onContextMenuCallback(e);
  }

  useEffect(() => {
    if (contextMenuAction) {
      onContextMenuActionCallback(component.id, columnId, rowId, contextMenuAction);
      setContextMenuAction(null);
      setContextMenuVisible(false);
    }
  }, [contextMenuAction, component, columnId, rowId, onContextMenuActionCallback]);

  return (
    <>
      <div
        className={styles['Circle']}
        draggable={false}
        id={component.id}
        onContextMenu={onContextMenu}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        ref={componentRef}
        style={{
          background: component.properties.color.properties.fill ? component.properties.color.properties.fill.value : '#444',
          borderColor: `${component.properties.stroke.properties.strokeColor?.value}`,
          borderRadius: '50%',
          borderStyle: 'solid',
          borderWidth: `${component.properties.stroke.properties.strokeWidth?.value / scaleFactor}em`,
          boxShadow: `${component.properties.shadow ? `
            ${component.properties.shadow.properties.shadowOffsetX?.value}px ${component.properties.shadow.properties.shadowOffsetY?.value}px ${component.properties.shadow.properties.shadowBlur?.value}px ${component.properties.shadow.properties.shadowSpread?.value}px ${component.properties.shadow.properties.shadowColor?.value}
          ` : ''}`,
          height: `${component.properties.dimensions.properties.radius?.value / scaleFactor}em`,
          left: `${component.properties.position.properties.left?.value / scaleFactor}em`,
          opacity: `${component.properties.opacity.properties.value.value}`,
          position: (rowId || columnId) ? 'relative' : 'absolute',
          top: `${component.properties.position.properties.top?.value / scaleFactor}em`,
          width: `${component.properties.dimensions.properties.radius?.value / scaleFactor}em`,
          zIndex: `${component.properties.position.properties.zIndex?.value}`,
        }}
        tabIndex={400}
      />

      {
        contextMenuVisible && (
          <ContextMenu
            designPageStyles={designPageStyles}
            hide={() => {
              setContextMenuVisible(false);
              componentRef.current.click();
            }}
            items={contextMenuItems}
            xPosition={contextMenuPositionX}
            yPosition={contextMenuPositionY}
          />
        )
      }
    </>
  )
}

export default CircleComponent
