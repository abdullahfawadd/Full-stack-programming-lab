import PageLayout from '../components/PageLayout'
import Greeting from '../components/Greeting'
import './GreetingApp.css'

const greetings = [
  {
    name: 'M Abdullah Fawad',
    timeOfDay: 'Morning',
    bgColor: 'rgba(37, 99, 235, 0.08)',
  },
  {
    name: 'Ahmed Hassan',
    timeOfDay: 'Afternoon',
    bgColor: 'rgba(234, 179, 8, 0.08)',
  },
  {
    name: 'Sara Malik',
    timeOfDay: 'Evening',
    bgColor: 'rgba(124, 58, 237, 0.08)',
  },
  {
    name: 'Usman Ali',
    timeOfDay: 'Night',
    bgColor: 'rgba(30, 30, 60, 0.6)',
  },
]

function GreetingApp() {
  return (
    <PageLayout title="Dynamic Greeting App" taskNumber={3}>
      <p className="task-intro">
        The <code>Greeting</code> component conditionally renders a message and icon
        based on the <code>timeOfDay</code> prop, with a custom <code>bgColor</code>.
      </p>
      <div className="greeting-grid">
        {greetings.map((g, index) => (
          <div key={g.name + g.timeOfDay} className={`fade-in-up stagger-${index + 1}`}>
            <Greeting
              name={g.name}
              timeOfDay={g.timeOfDay}
              bgColor={g.bgColor}
            />
          </div>
        ))}
      </div>
    </PageLayout>
  )
}

export default GreetingApp
