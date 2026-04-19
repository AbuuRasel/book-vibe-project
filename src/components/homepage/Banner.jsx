import React from 'react';
import book from '../../assets/pngwing_1-removebg-preview.png'

const Homepage = () => {
  return (
    <div className='p-10'>
      <div className="hero container mx-auto bg-[#f7f7f7] min-h-[70vh] rounded-4xl mt-10">
        <div className="hero-content flex-col lg:flex-row-reverse w-full justify-around">
          <img
            src={book}
            className="max-w-sm rounded-lg"
          />
          <div>
            <h1 className="text-5xl font-bold text-[#131313] leading-1.8">Books to freshen up <br /> your bookshelf</h1>
            <a className="btn bg-[#23BE0A] rounded-lg text-white my-10">View The List</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;