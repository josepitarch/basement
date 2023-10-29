import { Route, Router } from 'wouter'
import Foods from './pages/Foods'
import Landing from './pages/Landing'
import Questionnaire from './pages/Questionnaire'
import CustomizeMacros from './pages/CustomizeMacros'

export default function App () {
  return (
    <Router>
      <Route path='/' component={Landing} />
      <Route path='/questionnaire' component={Questionnaire} />
      <Route path='/customize-fats-and-proteins' component={CustomizeMacros} />
      <Route path='/foods' component={Foods} />
    </Router>

  )
}
