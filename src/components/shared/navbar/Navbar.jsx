import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
  const links = (
    <>
    <li><NavLink to={'/'} className= {({isActive})=> isActive?'font-semibold text-[#23BE0A] border border-green-500 bg-base-200':'font-semibold'}>Home</NavLink></li>
    <li><NavLink to={'/books'} className={({isActive})=> isActive?'font-semibold text-[#23BE0A] border border-green-500 bg-base-200':'font-semibold'}>Listed Books</NavLink></li>
    <li><NavLink to={'/pages'} className={({isActive})=> isActive?'font-semibold text-[#23BE0A] border border-green-500 bg-gray-50':'font-semibold'}>Pages to Read</NavLink></li>
    </>
  )
  return (
    <div>
      <div className="navbar container my-3 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <h2 className="text-xl font-bold cursor-pointer">Book Vibe</h2>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal flex gap-3 px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn bg-[#23BE0A] rounded-lg text-white mr-3">Sing in</a>
          <a className="btn bg-[#59C6D2] rounded-lg text-white">Sing up</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;