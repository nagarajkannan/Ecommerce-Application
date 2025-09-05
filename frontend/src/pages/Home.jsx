import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import Bestseller from '../components/Bestseller';
import Ourpolicy from '../components/Ourpolicy';
import Newsletterbox from '../components/Newsletterbox';


const Home = () => {
  return (
    <div className="max-w-9xl min-h-screen  text-gray-800 ">

    
      <section className="pb-16">
        <Hero />  
      </section>

      <section className="pb-16">
        <LatestCollection />
      </section>

      <section className="pb-16">
        <Bestseller />
      </section>

      <section className="pb-20">
        <Ourpolicy />
      </section>

     

    </div>
  );
};

export default Home;
