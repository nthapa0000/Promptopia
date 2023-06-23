import '@styles/globals.css';
import { Children } from 'react';
// import React from 'react'
import Nav from '@components/Nav';
// we are calling Nav here as we will use navbar again and again
import Provider from '@components/Provider';

// changing the metadata
export const metadata = {
    title: "Promptopia",
    description : 'Discover & Share AI Prompts'
}
function peompt(){}

// layout will wrap everything
const RootLayout = ({children}) => {
  return (
    <html langang='en'>
    <body>
      <Provider>
        <div className='main'>
            <div className='gradient'/>
        </div>
        <main className='app'>
          <Nav/>
            {children}
            {/* we are also not importing children yet we will import it from prompts */}
        </main>
        </Provider>
    </body>
    </html>
  )
}

export default RootLayout;