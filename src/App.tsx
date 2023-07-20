import { Route, Router } from 'wouter'
import MacrosProvider from './context/MacrosContext'
import Foods from './pages/Foods'
import Landing from './pages/Landing'
import Questionnaire from './pages/Questionnaire'

export default function App() {
  return (
      <MacrosProvider>
        <Router>
          <Route path='/' component={Landing} />
          <Route path='/questionnaire' component={Questionnaire} />
          <Route path='/foods' component={Foods} />
        </Router>
      </MacrosProvider>
  )
}
