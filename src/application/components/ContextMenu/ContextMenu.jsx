import { useEffect, useRef } from 'react';
import { v4 as UUIDv4 } from 'uuid';
import styles from './styles.module.css';

function ContextMenu({
  designPageStyles,
  items,
  hide,
  xPosition,
  yPosition,
}) {
  const contextMenuRef = useRef();

  useEffect(() => {
    if (contextMenuRef.current) {
      contextMenuRef.current.children[0].click();
    }
  }, [])

  return (
    <ul
      className={`${styles['ContextMenu']} ${designPageStyles['Design__Context_Menu']}`}
      onMouseLeave={hide}
      ref={contextMenuRef}
      style={{ top: yPosition, left: xPosition }}
      onFocus={(e) => e.stopPropagation()}
    >
      {
        items.map((item, index) => (
          <li key={UUIDv4()} tabIndex={index} className={`${designPageStyles['Design__Context_Menu']}`}>
            <button
              className={`${designPageStyles['Design__Context_Menu']}`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                item.action(e)
              }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <span className={`${designPageStyles['Design__Context_Menu']}`}>{item.icon}</span>
              <span className={`${designPageStyles['Design__Context_Menu']}`}>{item.label}</span>
            </button>
          </li>
        ))
      }
    </ul>
  )
}

export default ContextMenu
