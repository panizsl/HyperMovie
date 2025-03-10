export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6">
        {/* بخش بالایی */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* لوگو و توضیحات */}
          <div className="mb-6 md:mb-0">
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/stacked-blue-green-7cda66efad78b2a9992da9e6c504f50a9e96bdbb4eecaa32cbbc7d0d22c7cdd6.svg"
              alt=""
              className="h-12 mb-4"
            />
            <p className="text-sm">
              The Movie Database (MovieMate) is a popular, user editable
              database for movies and TV shows.
            </p>
          </div>

          {/* لینک‌ها */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-bold mb-2 text-white">The Basics</h4>
              <ul>
                <li className="mb-1">
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-white">Get Involved</h4>
              <ul>
                <li className="mb-1">
                  <a href="#" className="hover:text-white">
                    Contribution Bible
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-white">
                    Add New Movie
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Add New TV Show
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-white">Community</h4>
              <ul>
                <li className="mb-1">
                  <a href="#" className="hover:text-white">
                    Guidelines
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-white">
                    Discussions
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-white">
                    Leaderboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-white">Legal</h4>
              <ul>
                <li className="mb-1">
                  <a href="#" className="hover:text-white">
                    Terms of Use
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-white">
                    API Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* بخش پایینی */}
        <div className="mt-8 text-center text-sm border-t border-gray-700 pt-6">
          <p>
            © 2025 The Movie Database (MovieMate). All rights reserved. Designed
            by
            <a href="#" className="text-blue-400 hover:text-blue-600 ml-1">
              Paniz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
