import { Link, Route } from 'wouter'
import Layout from '../layouts/Layout'

export default function Landing() {
  return (
    <Layout>
    
        <header className='flex flex-col gap-6 max-w-[70ch]'>
          <h1 className='text-8xl text-white my-1'>Basement</h1>
          <h2 className='text-2xl text-white'>
            Crea tus propias dietas de manera gratuita y sin registro
          </h2>
          <h5>
            ¿Qué es lo primero que se te viene a la cabeza cuando escuchas la
            palabra <strong>dieta</strong>?
          </h5>
          <p className='text-lg text-white'>
            Calificativos negativos invaden nuestra mente como sufrimiento,
            pasar hambre, comer cosas que no nos gustan y, en definitiva, algo
            que nos crea rechazo. Cómo la gran inmensa mayoría de las cosas,
            hacer dieta es algo que al principio puede resultar difícil. Hay que
            entender que es un proceso que requiere de tiempo y paciencia, hasta
            que se convierte en un <strong>hábito</strong>. Se tarda en crear un
            hábito entre 21 y 66 días, dependiendo de la persona. El objetivo es
            hacer de esto un estilo de vida, esto es una carrera de fondo, no un
            sprint.
          </p>
          <p>
            Para lo primero no podemos ayudarte, tendrás que armarte de valor y
            dar el primer paso. Pero no todo son malas noticias, porque para lo
            segundo, sí que podemos hacerlo. <strong>Basement</strong> es una
            aplicación web que te permite crear tus propias dietas, a tu gusto,
            para que sea lo más llevadero posible.
          </p>
          <p>
            Para poder ayudarte, necesitamos que respondas únicamente a cuatro
            preguntas para poder calcular tu tasa de metabolismo basal y así
            poder calcular las calorías que necesitas consumir al día.
          </p>
          <Link href='/questionnaire'>
            <a id='start-questionnaire' className='self-center'>
              <span>¡Empieza tu cambio!</span>
            </a>
          </Link>
        </header>
     
    </Layout>
  )
}
