import {createBrowserRouter} from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { SimulationFormPage } from './pages/SimulationFormPage'
import { SimulationResultPage } from './pages/SimulationResultPage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: 
          <>
            <SimulationFormPage />
          </>,
      },

      {
        path: '/resultado/:id',
        element: 
        <>
          <SimulationResultPage />
        </>
      },

      {
        path: '/historico',
        element: <h1>Historico de simulacoes</h1>,
      },
    ]
  }
])
