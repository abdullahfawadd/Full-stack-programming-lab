import { useState } from 'react' 
import TaskLayout from '../../components/TaskLayout' 
 
const notes = [ 
  'Increment raises the counter by one.', 
  'Decrement is guarded so the count never goes below zero.', 
  'Reset returns the interface to its baseline state.', 
] 
 
function CounterAppPage() { 
  const [count, setCount] = useState(0) 
  const [status, setStatus] = useState('Ready to start counting') 
 
  const handleIncrement = () => { 
    setCount(current => current + 1) 
    setStatus('Counter increased successfully') 
  } 
 
  const handleDecrement = () => { 
    setCount(current => { 
      if (current === 0) { 
        setStatus('Counter is already at zero') 
        return 0 
      } 
      setStatus('Counter decreased successfully') 
      return current - 1 
    }) 
  } 
 
  const handleReset = () => { 
    setCount(0) 
    setStatus('Counter reset to zero') 
  } 
 
  return ( 
    <TaskLayout taskNumber='1' title='Counter Application' objective='Practice using React state to manage dynamic values with increment, decrement, and reset controls.' badges={['useState', 'Dynamic state', 'Zero guard']}> 
      <div className='workspace-grid'> 
        <section className='surface panel panel--spotlight'> 
          <span className='panel__eyebrow'>Live Counter</span> 
          <div className='counter-display'>{count}</div> 
          <p className='panel__copy'>{count === 0 ? 'The decrement action is safely blocked while the count is zero.' : 'The counter is active and ready for the next state update.'}</p> 
          <div className='button-row'> 
            <button type='button' className='button button--primary' onClick={handleIncrement}>Increment</button> 
            <button type='button' className='button button--secondary' onClick={handleDecrement} disabled={count === 0}>Decrement</button> 
            <button type='button' className='button button--ghost' onClick={handleReset}>Reset</button> 
          </div> 
          <div className='status-banner'> 
            <span className='status-dot' /> 
            <span>{status}</span> 
          </div> 
        </section> 
        <section className='surface panel'> 
          <span className='panel__eyebrow'>Behavior</span> 
          <h2>Implementation checklist</h2> 
          <ul className='detail-list'> 
            {notes.map((note) => <li key={note}>{note}</li>)} 
          </ul> 
          <div className='metric-strip'> 
            <div><span>Current value</span><strong>{count}</strong></div> 
            <div><span>Lower bound</span><strong>0</strong></div> 
          </div> 
        </section> 
      </div> 
    </TaskLayout> 
  ) 
} 
 
export default CounterAppPage
