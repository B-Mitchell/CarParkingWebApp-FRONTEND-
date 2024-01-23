import './globals.css'
import Navbar from './components/Navbar'
import { UserProvider } from '../context/UseContext';


export const metadata = {
  title: 'VDT PROJECT',
  description: 'Built by Big Mitch',
}

export default function RootLayout({ children }) {
  return (
    <UserProvider >
    <html lang="en">
      <body >
      <Navbar />
        {children}
      </body>
    </html>
    </UserProvider>
  )
}
