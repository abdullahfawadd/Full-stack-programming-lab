import { useState } from 'react' 
import TaskLayout from '../../components/TaskLayout' 
 
const palettes = [ 
  { label: 'Sage Canvas', background: 'linear-gradient(135deg, #f6f7f2 0%, #e6efe8 100%)', accent: '#136b5c' }, 
  { label: 'Amber Studio', background: 'linear-gradient(135deg, #fbf5ea 0%, #f1dfc3 100%)', accent: '#9a5b14' }, 
  { label: 'Blue Draft', background: 'linear-gradient(135deg, #eef5ff 0%, #dce8ff 100%)', accent: '#2456c7' }, 
] 
 
function EventAppPage() { 
  const [paletteIndex, setPaletteIndex] = useState(0) 
  const [message, setMessage] = useState('Choose an action to trigger a UI response.') 
  const [activity, setActivity] = useState('Waiting for user interaction.') 
  const [hoveredAction, setHoveredAction] = useState('') 
 
  const activePalette = palettes[paletteIndex] 
  const headingColor = hoveredAction ? activePalette.accent : 'var(--color-text)' 
 
  const handleShowMessage = () => { 
    setMessage('The interface updated through a click event and rendered feedback instantly.') 
    setActivity('Inline message displayed successfully.') 
  } 
 
  const handleChangeBackground = () => { 
    const nextPaletteIndex = (paletteIndex + 1) % palettes.length 
    setPaletteIndex(nextPaletteIndex) 
    setActivity('Background changed to ' + palettes[nextPaletteIndex].label + '.') 
  } 
 
  const handleShowAlert = () => { 
    window.alert('React event handling alert triggered successfully.') 
    setActivity('Browser alert opened successfully.') 
  } 

 
  return ( 
    <TaskLayout taskNumber='3' title='Interactive Buttons App' objective='Practice React event handling with click actions, hover behavior, alerts, and visual state changes.' badges={['onClick', 'onMouseOver', 'Dynamic styling']}> 
      <div className='workspace-grid'> 
        <section className='surface panel interactive-stage' style={{ background: activePalette.background }}> 
          <span className='panel__eyebrow'>Interactive Stage</span> 
          <h2 style={{ color: headingColor }}>{hoveredAction || 'Hover over an action to shift the text color'}</h2> 
          <p className='panel__copy'>{message}</p> 
          <div className='interactive-stage__meta'> 
            <div><span>Theme</span><strong>{activePalette.label}</strong></div> 
            <div><span>Activity</span><strong>{activity}</strong></div> 
          </div> 
        </section> 
        <section className='surface panel'> 
          <span className='panel__eyebrow'>Actions</span> 
          <h2>Event controls</h2> 
          <div className='stack-md'> 
            <button type='button' className='button button--primary button--full' onClick={handleShowMessage} onMouseOver={() => setHoveredAction('Show message')} onMouseOut={() => setHoveredAction('')}>Show message</button> 
            <button type='button' className='button button--secondary button--full' onClick={handleChangeBackground} onMouseOver={() => setHoveredAction('Change background color')} onMouseOut={() => setHoveredAction('')}>Change background color</button> 
            <button type='button' className='button button--ghost button--full' onClick={handleShowAlert} onMouseOver={() => setHoveredAction('Show alert')} onMouseOut={() => setHoveredAction('')}>Show alert</button> 
          </div> 
          <ul className='detail-list detail-list--compact'> 
            <li>All three controls use click events for interaction.</li> 
            <li>Mouse hover updates the heading text color and label context.</li> 
            <li>Background changes cycle across a curated set of visual themes.</li> 
          </ul> 
        </section> 
      </div> 
    </TaskLayout> 
  ) 
} 
 
export default EventAppPage
