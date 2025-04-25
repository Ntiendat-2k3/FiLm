import Link from "next/link"
import { SITE_NAME } from "@/lib/constants"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{SITE_NAME}</h3>
            <p className="mb-4">
              Watch the latest movies and TV shows online. Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/danh-sach/phim-le" className="hover:text-red-500 transition-colors">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/danh-sach/phim-bo" className="hover:text-red-500 transition-colors">
                  TV Series
                </Link>
              </li>
              <li>
                <Link href="/danh-sach/hoat-hinh" className="hover:text-red-500 transition-colors">
                  Anime
                </Link>
              </li>
              <li>
                <Link href="/danh-sach/phim-moi" className="hover:text-red-500 transition-colors">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:text-red-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-red-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-red-500 transition-colors">
                  DMCA
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p>
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-sm mt-2 text-gray-500">
            This site does not store any files on its server. All contents are provided by non-affiliated third parties.
          </p>
        </div>
      </div>
    </footer>
  )
}
