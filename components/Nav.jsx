/* {alert(providers)} */
/* there is problem that navbar is not showing so lets check what the problem  */
/* alert(providers) it will show null which it should   */
/* alert(session?.user?)  it will show undefined which it 
should*/
"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
// whenever we use client side functionality we must mark it as client
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  // const isUserLoggedIn=true;
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
      console.log(response)
    }
    setProviders();

  }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
        {/* //this class will make the text invisible if the screen size decreases */}
      </Link>


      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >

                </button>
              })}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          // check whether user exist
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                // to reset the navigation
                >
                  Create Prompt
                </Link>
                <button
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black-btn"
                >Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >

                </button>
              })}
          </>
        )}
      </div>
    </nav>
  )
}
// it will show error sice it work only on client component we need to use use client

export default Nav