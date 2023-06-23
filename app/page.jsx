import Feed from "@components/Feed";

const Home = () => {
  return (
    // tailwind
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br />
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center">AI-powered Prompts</span>
      </h1>
      <p className="desc text-center">Promptopia is a open source AI prompting tool for modern world to find the best prompt of the need</p>
      {/* Feed */}
      <Feed />
    </section>
  )
}

export default Home;
// this file will render our the home page 
// import React from 'react'
// in next.js we no need to specify the react import

