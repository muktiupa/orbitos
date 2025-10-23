import Head from 'next/head';
import Navbar from '../components/Navbar';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ChatInvite from '@/components/ChatInvite';

export default function Home() {
  return (
    <>
    <div className='body'>
      <Navbar />
      <Head>
        <title>Orbit OS - Marketing Automation & AI Agency</title>
        <meta name="description" content="Space-themed marketing automation and AI agency landing page." />
      </Head>
      <div className="space-bg">
        <div className="stars "></div>
        <div className="stars2 "></div>
        <div className="stars3 "></div>
        {/* Animated planet */}
        <div className="planet hover:scale-110 transition-transform duration-300 "></div>
        {/* Animated orbiting satellite */}
        <div className="satellite-orbit hover:scale-110 transition-transform duration-300">
          <div className="satellite "></div>
        </div>
        <main className="hero relative z-10">
        <DotLottieReact className='h-100  mt-4 hover:scale-110 transition-transform duration-300'
      src="https://lottie.host/75fa6518-27da-4af7-80bb-da49598429d1/z6DGYRrnWh.lottie"
      loop
      autoplay
    />
    <Chat Invite />
          <h2 className='gradient-text'>Marketing Automation & AI Agency</h2>
          <p>
            Launch your brand into orbit with cutting-edge automation and AI solutions.<br />
            We help you reach new heights in digital marketing.
          </p>
          <a href="#contact" className="cta-btn">Get Started</a>
        </main>
      </div>
      </div>
      <style jsx>{`
      .body {
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: "SF Pro Text", "SF Pro Icons", "AOS Icons", "Helvetica Neue", Helvetica, Arial, sans-serif, system-ui;
  background: hsl(0 0% 0%);
  gap: 2rem;
}
        
        .hero {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          color: #e0e7ff;
          text-align: center;
        }
        h1 {
          font-size: 6rem;
          font-weight: 800;
          letter-spacing: 3px;
          margin-bottom: 1rem;
          color: #ffffff;
          
        }
          .gradient-text {
    font-size: 60px;
    font-weight: bold;
    background: linear-gradient(90deg, 
      #3B00A0 0%, 
      #3E019E 10%, 
      #480599 18%, 
      #590B90 25%, 
      #711483 32%, 
      #902073 39%, 
      #B525EF 45%, 
      #E23F48 51%, 
      #FFA439 55%, 
      #FF7828 67%, 
      #FFEE00 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
        h2 {
          font-size: 2rem;
          font-weight: 500;
          margin-bottom: 1rem;
          background: #833AB4;
background: linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%);
          
        }
        p {
          font-size: 1.75rem;
          margin-bottom: 2rem;
          color: white;
        }
        .cta-btn {
          background: linear-gradient(90deg, #2563eb 0%, #1e3a8a 100%);
          color: #fff;
          padding: 1.2rem 3rem;
          border-radius: 999px;
          font-size: 1.3rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 32px rgba(37,99,235,0.4);
          transition: background 0.3s, transform 0.2s;
        }
        .cta-btn:hover {
          background: linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%);
          transform: scale(1.05);
        }
        /* Star animations */
        .stars, .stars2, .stars3 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        .stars {
          background: transparent url('https://raw.githubusercontent.com/klsandbox/star-bg/main/stars.png') repeat top center;
          animation: moveStars 100s linear infinite;
          opacity: 0.7;
        }
        .stars2 {
          background: transparent url('https://raw.githubusercontent.com/klsandbox/star-bg/main/stars2.png') repeat top center;
          animation: moveStars 200s linear infinite;
          opacity: 0.5;
        }
        .stars3 {
          background: transparent url('https://raw.githubusercontent.com/klsandbox/star-bg/main/stars3.png') repeat top center;
          animation: moveStars 300s linear infinite;
          opacity: 0.3;
        }
        @keyframes moveStars {
          from {background-position: 0 0;}
          to {background-position: -10000px 5000px;}
        }
        /* Animated planet */
        .planet {
          position: absolute;
          bottom: 10%;
          left: 10%;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle at 40% 40%, #60a5fa 0%, #1e3a8a 80%);
          border-radius: 50%;
          box-shadow: 0 0 80px 20px #2563eb88;
          z-index: 1;
          animation: planetFloat 6s ease-in-out infinite;
        }
        @keyframes planetFloat {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-30px);}
        }
        /* Satellite orbit animation */
        .satellite-orbit {
          position: absolute;
          bottom: 10%;
          left: 10%;
          width: 220px;
          height: 220px;
          z-index: 2;
          pointer-events: none;
        }
        .satellite {
          position: absolute;
          top: 0;
          left: 50%;
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #fff 60%, #60a5fa 100%);
          border-radius: 50%;
          box-shadow: 0 0 16px 4px #60a5fa;
          transform: translate(-50%, -50%);
          animation: orbitSatellite 8s linear infinite;
        }
        @keyframes orbitSatellite {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg);}
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg);}
        }
      `}</style>
    </>
  );
}
