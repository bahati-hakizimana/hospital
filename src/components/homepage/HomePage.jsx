import React from 'react'
import Navbar from "../Navbar";
import Home from "../Home";
import About from "../About";
import Services from "../Services";
import Doctors from "../Doctors";
import Blogs from "../Blogs";
import Footer from "../Footer";

function HomePage() {
  return (
    <div>
    <Navbar />

    <main>
      <div id="home">
        <Home />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="services">
        <Services />
      </div>

      <div id="doctors">
        <Doctors />
      </div>

      <div id="blog">
        <Blogs />
      </div>
    </main>

    <Footer />
  </div>
  )
}

export default HomePage
