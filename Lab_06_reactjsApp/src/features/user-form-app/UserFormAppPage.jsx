import { useState } from 'react' 
import TaskLayout from '../../components/TaskLayout' 
 
function UserFormAppPage() { 
  const [formData, setFormData] = useState({ name: '', email: '' }) 
  const [submittedProfile, setSubmittedProfile] = useState(null) 
  const [status, setStatus] = useState('Complete the form and submit to store the entry') 
 
  const isSubmitDisabled = !formData.name.trim() || !formData.email.trim() 
 
  const handleChange = (event) => { 
    const { name, value } = event.target 
    setFormData(current => ({ ...current, [name]: value })) 
  } 
 
  const handleSubmit = (event) => { 
    event.preventDefault() 
    setSubmittedProfile({ 
      name: formData.name.trim(), 
      email: formData.email.trim(), 
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
    }) 
    setFormData({ name: '', email: '' }) 
    setStatus('Submission saved and form fields cleared') 
  } 
 
  return ( 
    <TaskLayout taskNumber='2' title='User Form App' objective='Practice controlled inputs, state updates, and form submission handling with React.' badges={['State + events', 'Controlled inputs', 'Submit flow']}> 
      <div className='workspace-grid'> 
        <section className='surface panel'> 
          <span className='panel__eyebrow'>User Form</span> 
          <h2>Capture user details</h2> 
          <form className='stack-lg' onSubmit={handleSubmit}> 
            <label className='field'> 
              <span>Name</span> 
              <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Enter full name' required /> 
            </label> 
            <label className='field'> 
              <span>Email</span> 
              <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='name@example.com' required /> 
            </label> 
            <button type='submit' className='button button--primary' disabled={isSubmitDisabled}>Submit</button> 
          </form> 
          <div className='status-banner'> 
            <span className='status-dot' /> 
            <span>{status}</span> 
          </div> 
        </section> 
        <section className='surface panel panel--accent'> 
          <span className='panel__eyebrow'>Submitted Data</span> 
          <h2>Latest submission</h2> 
          {submittedProfile ? ( 
            <div className='profile-card'> 
              <div className='profile-card__item'><span>Name</span><strong>{submittedProfile.name}</strong></div> 
              <div className='profile-card__item'><span>Email</span><strong>{submittedProfile.email}</strong></div> 
              <div className='profile-card__item'><span>Submitted</span><strong>{submittedProfile.submittedAt}</strong></div> 
            </div> 
          ) : ( 
            <div className='empty-state'>No data submitted yet. Your saved values will appear here after form submission.</div> 
          )} 
        </section> 
      </div> 
    </TaskLayout> 
  ) 
} 
 
export default UserFormAppPage
