
import { NavLink } from 'react-router-dom';
import backImg from '../assets/back.svg'
export default function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${backImg})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>

      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-3xl font-bold">
            You travel the World. <br />{" "}
            <span className="text-secondary">Travel-wise</span> keeps track of
            your <br /> adventures.
          </h1>
          <p className="mb-5">
            A world map that tracks your footsteps into every city you can think
            of.Never forget your wonderful experiences, and show your friends
            how you have wandered the world
          </p>
          <NavLink to="/app">
            <button className="btn btn-primary">Start Tracking Journey</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
