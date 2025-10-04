import { v4 as UUIDv4 } from 'uuid'

const getRectangleProperties = (initial) => ({
  name: {
    id: UUIDv4(),
    dataType: 'text',
    value: 'Rectangle component',
  },
  dimensions: {
    id: UUIDv4(),
    name: 'Dimensions',
    properties: {
      width: {
        id: UUIDv4(),
        name: 'Width',
        dataType: 'number',
        value: 20,
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"/>
            <polyline points="8 8 4 12 8 16"/>
            <polyline points="16 8 20 12 16 16"/>
          </svg>
        `
      },
      height: {
        id: UUIDv4(),
        name: 'Height',
        dataType: 'number',
        value: 20,
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="4" x2="12" y2="20"/>
            <polyline points="8 8 12 4 16 8"/>
            <polyline points="8 16 12 20 16 16"/>
          </svg>
        `
      },
    }
  },
  color: {
    id: UUIDv4(),
    name: 'Color',
    properties: {
      fill: {
        id: UUIDv4(),
        name: 'Fill Color',
        dataType: 'color',
        value: '#aaaaaa',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 2l6 6-10 10-6-6L16 2z"/>
            <path d="M20 20a2 2 0 1 1-4 0c0-1.5 2-3 2-3s2 1.5 2 3z"/>
          </svg>
        `
      },
    }
  },
  position: {
    id: UUIDv4(),
    name: 'Position',
    properties: {
      left: {
        id: UUIDv4(),
        name: 'X',
        dataType: 'number',
        value: 0,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="2" y1="12" x2="22" y2="12"/>
            <line x1="12" y1="2" x2="12" y2="22"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </svg>
        `
      },
      top: {
        id: UUIDv4(),
        name: 'Y',
        dataType: 'number',
        value: 0,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="2" y1="12" x2="22" y2="12"/>
            <line x1="12" y1="2" x2="12" y2="22"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </svg>
        `
      },
      zIndex: {
        id: UUIDv4(),
        name: 'Z',
        dataType: 'number',
        value: 1,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="2" y1="12" x2="22" y2="12"/>
            <line x1="12" y1="2" x2="12" y2="22"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </svg>
        `
      },
    }
  },
  radius: {
    id: UUIDv4(),
    name: 'Radius',
    properties: {
      topLeft: {
        id: UUIDv4(),
        name: 'Top left',
        dataType: 'number',
        value: 0,
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 60 60">
            <rect x="10" y="10" width="40" height="40" fill="none" stroke="black" strokeWidth="2" />
            <path d="M10,30 A20,20 0 0 1 30,10" stroke="black" strokeWidth="2" fill="currentColor" />
          </svg>
        `
      },
      topRight: {
        id: UUIDv4(),
        name: 'Top right',
        dataType: 'number',
        value: 0,
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 60 60">
            <rect x="10" y="10" width="40" height="40" fill="none" stroke="black" strokeWidth="2" />

            <path d="M30,10 A20,20 0 0 1 50,30" stroke="black" strokeWidth="2" fill="currentColor" />
          </svg>
        `
      },
      bottomLeft: {
        id: UUIDv4(),
        name: 'Bottom left',
        dataType: 'number',
        value: 0,
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 60 60">
            <rect x="10" y="10" width="40" height="40" fill="none" stroke="black" strokeWidth="2" />
            <path d="M10,30 A20,20 0 0 0 30,50" stroke="black" strokeWidth="2" fill="currentColor" />
          </svg>
        `
      },
      bottomRight: {
        id: UUIDv4(),
        name: 'Bottom right',
        dataType: 'number',
        value: 0,
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 60 60">
            <rect x="10" y="10" width="40" height="40" fill="none" stroke="black" strokeWidth="2" />
            <path d="M30,50 A20,20 0 0 0 50,30" stroke="black" strokeWidth="2" fill="currentColor" />
          </svg>
        `
      },
    }
  },
  stroke: {
    id: UUIDv4(),
    name: 'Stroke',
    properties: {
      strokeWidth: {
        id: UUIDv4(),
        name: 'Stroke Width',
        dataType: 'number',
        value: 0,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="8" x2="20" y2="8" strokeWidth="1"/>
          <line x1="4" y1="12" x2="20" y2="12" strokeWidth="2"/>
          <line x1="4" y1="16" x2="20" y2="16" strokeWidth="4"/>
        </svg>`
      },
      strokeColor: {
        id: UUIDv4(),
        name: 'Stroke Color',
        dataType: 'color',
        value: '#000000',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="18" y2="12" />
            <circle cx="20" cy="12" r="3" fill="white" stroke="none" />
          </svg>
        `
      },
    }
  },
  shadow: {
    id: UUIDv4(),
    name: 'Shadow',
    properties: {
      shadowColor: {
        id: UUIDv4(),
        name: 'Shadow Color',
        dataType: 'color',
        value: '#000000',
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="6" width="10" height="10" fill="white" opacity="0.5" />

            <rect x="4" y="4" width="10" height="10" fill="black" />
          </svg>
        `
      },
      shadowBlur: {
        id: UUIDv4(),
        name: 'Shadow Blur',
        dataType: 'number',
        value: 0,
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48">
            <defs>
              <filter id="blurShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="4" dy="4" stdDeviation="2" flood-color="white" flood-opacity="0.6"/>
              </filter>
            </defs>

            <circle cx="20" cy="20" r="10" fill="black" filter="url(#blurShadow)" />
          </svg>
        `
      },
      shadowSpread: {
        id: UUIDv4(),
        name: 'Shadow Spread',
        dataType: 'number',
        value: 0,
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 60 60">
            <defs>
              <filter id="spreadShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
                <feMorphology in="blur" operator="dilate" radius="2" result="spread" />
                <feFlood floodColor="white" />
                <feComposite in2="spread" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect x="15" y="15" width="30" height="30" fill="black" filter="url(#spreadShadow)" />
          </svg>
        `
      },
      shadowOffsetX: {
        id: UUIDv4(),
        name: 'Shadow Offset X',
        dataType: 'number',
        value: 0,
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 60 60">
            <defs>
              <filter id="offsetXWhiteGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feOffset in="SourceAlpha" dx="8" dy="0" result="offset" />
                <feGaussianBlur in="offset" stdDeviation="3" result="blur" />
                <feFlood floodColor="white" floodOpacity="1" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle cx="20" cy="30" r="12" fill="black" filter="url(#offsetXWhiteGlow)" />
          </svg>
        `
      },
      shadowOffsetY: {
        id: UUIDv4(),
        name: 'Shadow Offset Y',
        dataType: 'number',
        value: 0,
        shadowOffsetY: {
        id: UUIDv4(),
        name: 'Shadow Offset Y',
        dataType: 'number',
        value: 0,
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 60 60">
            <defs>
              <filter id="offsetYShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feOffset in="SourceAlpha" dx="0" dy="8" result="offset" />
                <feGaussianBlur in="offset" stdDeviation="3" result="blur" />
                <feFlood floodColor="white" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle cx="30" cy="20" r="12" fill="black" filter="url(#offsetYShadow)" />
          </svg>
        `
      },
      },
    }
  },
  opacity: {
    id: UUIDv4(),
    name: 'Opacity',
    properties: {
      value: {
        id: UUIDv4(),
        name: 'Opacity',
        dataType: 'number',
        value: 1,
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 120 40">
            <circle cx="20" cy="20" r="12" fill="black" opacity="1" />

            <circle cx="60" cy="20" r="12" fill="black" opacity="0.5" />

            <circle cx="100" cy="20" r="12" fill="black" opacity="0.2" />
          </svg>
        `
      },
    },
  },
  ...initial,
})

export {
  getRectangleProperties
}
