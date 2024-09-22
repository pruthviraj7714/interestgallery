import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
        <div className="text-2xl font-extrabold">
              <span className="text-orange-400">
                Interest
                <span className="text-pink-400">Gallery</span>
              </span>
            </div>
          <p className="mt-2 text-gray-400">
            Discover and share the world&apos;s best ideas. Stay inspired with
            InterestGallery.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-pink-300 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-pink-300 transition"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-pink-300 transition">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-pink-300 transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-300 transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-300 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-300 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-300 transition"
            >
              <FaPinterest size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-400 text-white"
            />
            <button className="bg-pink-300 text-black p-2 rounded-md hover:bg-pink-400 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 border-t border-gray-700 pt-4">
        <p>&copy; 2024 InterestGallery. All rights reserved.</p>
      </div>
    </footer>
  );
}
