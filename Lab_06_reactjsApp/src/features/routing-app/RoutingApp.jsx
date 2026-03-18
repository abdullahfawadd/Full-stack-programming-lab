import { useState } from 'react' 
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom' 
import TaskLayout from '../../components/TaskLayout' 
 
const navigation = [ 
  { label: 'Home', to: '/routing-app/home' }, 
  { label: 'About', to: '/routing-app/about' }, 
  { label: 'Contact Us', to: '/routing-app/contact-us' }, 
  { label: 'Products', to: '/routing-app/products' }, 
] 
 
const products = [ 
  { title: 'Studio Keyboard', description: 'A compact wireless keyboard for focused creative work.', price: '$89' }, 
  { title: 'Precision Mouse', description: 'An ergonomic mouse designed for long editing sessions.', price: '$64' }, 
  { title: 'Desk Light', description: 'A balanced LED light for comfortable reading and late-night coding.', price: '$52' }, 
] 
 
const checklist = [ 
  'Navigation is built with Link.', 
  'Routes cover Home, About, Contact Us, and Products.', 
  'Products include Add to Cart actions.', 
  'A dedicated 404 page handles invalid nested routes.', 
] 
 
function RoutingApp() { 
  const [cartCount, setCartCount] = useState(0) 
  const location = useLocation() 
 
  const handleAddToCart = () => { 
    setCartCount(current => current + 1) 
  } 

 
  return ( 
    <TaskLayout taskNumber='4' title='Multi-Page Website' objective='Practice client-side navigation with React Router by building a multi-page website and nested 404 handling.' badges={['Link', 'Routes', 'Route', '404 page']}> 
      <div className='workspace-grid workspace-grid--routing'> 
        <section className='surface panel mini-site'> 
          <div className='mini-site__header'> 
            <div> 
              <span className='panel__eyebrow'>Routing Demo</span> 
              <h2>Studio Market</h2> 
              <p className='panel__copy'>A compact multi-page experience rendered inside the Lab 06 router.</p> 
            </div> 
            <div className='cart-badge'><span>Cart</span><strong>{cartCount}</strong></div> 
          </div> 
          <nav className='mini-site__nav'> 
            {navigation.map((item) => ( 
              <Link key={item.to} to={item.to} className={location.pathname === item.to ? 'mini-site__link mini-site__link--active' : 'mini-site__link'}>{item.label}</Link> 
            ))} 
          </nav> 
          <div className='mini-site__body'> 
            <Routes> 
              <Route index element={<Navigate to='home' replace />} /> 
              <Route path='home' element={<RoutingHomePage />} /> 
              <Route path='about' element={<RoutingAboutPage />} /> 
              <Route path='contact-us' element={<RoutingContactPage />} /> 
              <Route path='products' element={<RoutingProductsPage products={products} cartCount={cartCount} onAddToCart={handleAddToCart} />} /> 
              <Route path='*' element={<RoutingNotFoundPage />} /> 
            </Routes> 
          </div> 
        </section> 
        <aside className='surface panel panel--accent'> 
          <span className='panel__eyebrow'>Coverage</span> 
          <h2>Routing checklist</h2> 
          <ul className='detail-list'> 
            {checklist.map((item) => <li key={item}>{item}</li>)} 
          </ul> 
          <div className='metric-strip metric-strip--stacked'> 
            <div><span>Current path</span><strong>{location.pathname.replace('/routing-app/', '') || 'home'}</strong></div> 
            <div><span>Items in cart</span><strong>{cartCount}</strong></div> 
          </div> 
        </aside> 
      </div> 
    </TaskLayout> 
  ) 
}
 
function RoutingHomePage() { 
  return ( 
    <div className='routing-page'> 
      <div className='routing-page__header'> 
        <span className='eyebrow'>Home</span> 
        <h3>Welcome to Studio Market</h3> 
        <p>This landing page introduces the website and demonstrates the home route inside the React Router setup.</p> 
      </div> 
      <div className='feature-grid'> 
        <article className='feature-card'><h4>Curated Products</h4><p>Browse a small set of thoughtfully presented products.</p></article> 
        <article className='feature-card'><h4>Direct Navigation</h4><p>Move across pages instantly without a full page refresh.</p></article> 
        <article className='feature-card'><h4>Clean Composition</h4><p>Each route is represented by a focused React component.</p></article> 
      </div> 
    </div> 
  ) 
} 
 
function RoutingAboutPage() { 
  return ( 
    <div className='routing-page'> 
      <div className='routing-page__header'> 
        <span className='eyebrow'>About</span> 
        <h3>About this website</h3> 
        <p>Studio Market is a simple React Router demo that shows how navigation, nested pages, and route-level content can work together in a clean structure.</p> 
      </div> 
      <ul className='detail-list'> 
        <li>The site is organized around small, focused route components.</li> 
        <li>Navigation uses Link so transitions stay client-side and fast.</li> 
        <li>The layout stays readable on both desktop and mobile.</li> 
      </ul> 
    </div> 
  ) 
}
 
function RoutingContactPage() { 
  const [formData, setFormData] = useState({ name: '', email: '', message: '' }) 
  const [submission, setSubmission] = useState(null) 
 
  const handleChange = (event) => { 
    const { name, value } = event.target 
    setFormData(current => ({ ...current, [name]: value })) 
  } 
 
  const handleSubmit = (event) => { 
    event.preventDefault() 
    setSubmission({ name: formData.name.trim(), email: formData.email.trim(), message: formData.message.trim() }) 
    setFormData({ name: '', email: '', message: '' }) 
  } 
 
  return ( 
    <div className='routing-page'> 
      <div className='routing-page__header'> 
        <span className='eyebrow'>Contact Us</span> 
        <h3>Send us a message</h3> 
        <p>This route contains a contact form with name, email, and message fields.</p> 
      </div> 
      <div className='routing-contact'> 
        <form className='stack-lg' onSubmit={handleSubmit}> 
          <label className='field'><span>Name</span><input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Your name' required /></label> 
          <label className='field'><span>Email</span><input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='you@example.com' required /></label> 
          <label className='field'><span>Message</span><textarea name='message' rows='4' value={formData.message} onChange={handleChange} placeholder='Tell us how we can help' required /></label> 
          <button type='submit' className='button button--primary'>Submit Message</button> 
        </form> 
        {submission ? ( 
          <div className='submission-card'> 
            <span className='eyebrow'>Latest Message</span> 
            <strong>{submission.name}</strong> 
            <span>{submission.email}</span> 
            <p>{submission.message}</p> 
          </div> 
        ) : null} 
      </div> 
    </div> 
  ) 
}
 
function RoutingProductsPage({ products, cartCount, onAddToCart }) { 
  return ( 
    <div className='routing-page'> 
      <div className='routing-page__header'> 
        <span className='eyebrow'>Products</span> 
        <h3>Browse available products</h3> 
        <p>Select an item below to add it to the cart. Current cart count: {cartCount}.</p> 
      </div> 
      <div className='product-grid'> 
        {products.map((product) => ( 
          <article key={product.title} className='product-card'> 
            <span className='chip'>{product.price}</span> 
            <h4>{product.title}</h4> 
            <p>{product.description}</p> 
            <button type='button' className='button button--secondary' onClick={onAddToCart}>Add to Cart</button> 
          </article> 
        ))} 
      </div> 
    </div> 
  ) 
} 
 
function RoutingNotFoundPage() { 
  return ( 
    <div className='routing-page routing-page--not-found'> 
      <span className='eyebrow'>404</span> 
      <h3>Page not found inside the routing demo.</h3> 
      <p>The route you requested does not exist in this mini website.</p> 
      <Link to='/routing-app/home' className='button button--primary'>Return to Home</Link> 
    </div> 
  ) 
} 
 
export default RoutingApp
