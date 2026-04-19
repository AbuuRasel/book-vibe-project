import { Link } from "react-router";
const NoDataUi = ({ message = "No books here yet", subtext = "Books you mark as read or add to your wishlist will show up here." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">

      {/* Illustration */}
      <div className="relative w-28 h-28 mb-6 opacity-80">
        {/* Stacked books */}
        <div className="absolute top-2 left-2 w-14 h-20 bg-gray-100 border border-gray-200 rounded-md"></div>
        <div className="absolute top-1 left-4 w-14 h-20 bg-gray-50 border border-gray-200 rounded-md"></div>
        <div className="absolute top-0 left-6 w-14 h-20 bg-white border border-gray-200 rounded-md flex flex-col gap-1.5 p-3">
          <div className="w-full h-1.5 bg-gray-200 rounded-full"></div>
          <div className="w-4/5 h-1.5 bg-gray-100 rounded-full"></div>
          <div className="w-3/4 h-1.5 bg-gray-100 rounded-full"></div>
          <div className="w-1/2 h-1.5 bg-gray-100 rounded-full"></div>
        </div>
        {/* Search circle */}
        <div className="absolute bottom-0 right-0 w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center">
          <div className="w-3.5 h-0.5 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* Text */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{message}</h3>
      <p className="text-sm text-gray-400 max-w-xs leading-relaxed mb-6">{subtext}</p>

      {/* CTA */}
      <Link
        to="/"
        className="text-sm font-semibold text-white bg-green-500 hover:bg-green-600 active:scale-95 transition-all rounded-full px-5 py-2"
      >
        Browse Books
      </Link>

    </div>
  );
};

export default NoDataUi;