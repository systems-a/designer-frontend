import { useEffect, useRef } from 'react'
import styles from './styles.module.css'

function Popup({
  children,
  close,
  expanded,
}) {
  const popupRef =  useRef();
  const popupContentRef =  useRef();

  useEffect(() => {
    if (!popupRef.current) return;

    const popup = popupRef.current;

    const clickEventListener = (e) => {
      if (e.target === popup) close();
    }

    const keydownEventListener = (e) => {
      if (e.key === 'Escape') close();
    }

    popup.addEventListener('click', clickEventListener);
    window.addEventListener('keydown', keydownEventListener);

    Array.from(popupContentRef.current.getElementsByTagName('input'))[0]?.focus();

    return () => {
      popup.removeEventListener('click', clickEventListener)
      window.removeEventListener('keydown', keydownEventListener)
    }
  }, [popupRef, close]);

  return (
    <div className={styles['Popup']} ref={popupRef}>
      <div className={`${expanded ? styles['Popup__Content_Expanded'] : ''} ${styles['Popup__Content']}`} ref={popupContentRef}>
        {children}
      </div>
    </div>
  )
}

export default Popup
