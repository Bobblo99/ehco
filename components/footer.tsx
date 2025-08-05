import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-500">EHCO</h3>
            <p className="text-gray-300">
              Ihr Partner für innovative Kühlungslösungen, die das Wohlbefinden
              von Sportlern und aktiven Menschen fördern.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="hover:text-yellow-500 transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="hover:text-yellow-500 transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="hover:text-yellow-500 transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Schnelle Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Startseite
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Leistungen
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/termin-buchen"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Termin buchen
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Leistungen</h3>
            {/* <ul className="space-y-2">
              <li>
                <Link
                  href="/services#installation"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Installation
                </Link>
              </li>
              <li>
                <Link
                  href="/services#maintenance"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Wartung
                </Link>
              </li>
              <li>
                <Link
                  href="/services#repair"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Reparatur
                </Link>
              </li>
              <li>
                <Link
                  href="/services#consulting"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  Beratung
                </Link>
              </li>
            </ul> */}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="flex-shrink-0 text-yellow-500" />
                <span className="text-gray-300">
                  123 Kühlstraße, Froststadt, FZ 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0 text-yellow-500" />
                <span className="text-gray-300">+49 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0 text-yellow-500" />
                <span className="text-gray-300">info@ehco.de</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} EHCO. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
