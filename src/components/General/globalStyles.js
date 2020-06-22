export const clearfix = {
  display: 'table',
  clear: 'both',
  width: '100%',
  content: '""',
}

export const button = {
  backgroundColor: '#435460',
  color: '#fff',
  border: 'none',
  padding: '5px 8px',
  cursor: 'pointer',
  fontWeight: '400',
  borderRadius: '1px',
  marginLeft: '5px',

}

export const panel = {
  background: '#fff',
  borderRadius: '3px',
  boxShadow: '0 3px 8px -5px rgba(0,0,0,0.56)',
  padding: '12px',
  marginBottom: '16px',
}

export const configPanel = {
  border: '1px solid rgba(255,255,255,0.04)',
  background: '#25262c',
  padding: '5px',
  boxShadow: '0 2px 18px rgba(0,0,0,0.2)',
  color: '#25262c'
}

export const absCenter = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  marginRight: '-50%',
}

export const fixedCenter = {
  ...absCenter,
  position: 'fixed'
}

export const absCenterY = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  left: 'auto',
}

export const absCenterX = {
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  marginRight: '-50%',
}

export const absFill = {
  position: 'absolute',
  left: 0, right: 0, top: 0, bottom: 0,
}

export const fixedFill = {
  ...absFill,
  position: 'fixed'
}

export const surface = {
    borderRadius: '5px',
    background: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    border: '1px solid rgba(0,0,0,0.13)',
}
const sharedCols = {float: 'left'}
export const oneHalf = {
  ...sharedCols,
  width: '50%',
}
export const oneFourth = {
  ...sharedCols,
  width: '25%',
}
export const threeFourths = {
  ...sharedCols,
  width: '75%',
}
export const oneFifth = {
  ...sharedCols,
  width: '20%',
}
export const threeFifths = {
  ...sharedCols,
  width: '60%',
}
export const fourFifths = {
  ...sharedCols,
  width: '80%',
}
export const oneThird = {
  ...sharedCols,
  width: '33.333%',
}
export const twoThirds = {
  ...sharedCols,
  width: '66.666%'
}
