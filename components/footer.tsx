import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Angebot</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/leistungen#kaelte-akut"
                  className="hover:text-yellow-500 transition-colors"
                >
                  Akute Schmerztherapie
                </Link>
              </li>
              <li>
                <Link
                  href="/leistungen#kaelte-chronisch"
                  className="hover:text-yellow-500 transition-colors"
                >
                  Chronische Schmerzen
                </Link>
              </li>
              <li>
                <Link
                  href="/leistungen#kaelte-sport"
                  className="hover:text-yellow-500 transition-colors"
                >
                  Sport & Regeneration
                </Link>
              </li>
              <li>
                <Link
                  href="/leistungen#kaelte-neuro"
                  className="hover:text-yellow-500 transition-colors"
                >
                  Neurologische Anwendung
                </Link>
              </li>
              <li>
                <Link
                  href="/termin-buchen"
                  className="hover:text-yellow-500 transition-colors"
                >
                  Termin buchen
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="flex-shrink-0 text-yellow-500" />
                <span>
                  Untere au 12
                  <br />
                  74239 Hardthausen am Kocher
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0 text-yellow-500" />
                <span>+49 0160 - 98988048</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0 text-yellow-500" />
                <span> info@eh-co.com</span>
              </li>
            </ul>
          </div>

          {/* Über uns + Logo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Über uns</h3>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                EHCO steht für moderne, effektive Kältetherapie auf Basis von
                Alpha Cooling®. Unser Ziel: weniger Schmerzen, mehr
                Lebensqualität – ganz ohne Medikamente.
              </p>
              <Link href="/">
                <Image
                  src="/ehco-logo.svg"
                  width={120}
                  height={80}
                  alt="EHCO-Logo"
                  className="flex-shrink-0 self-center"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} EHCO. Alle Rechte vorbehalten.
          </p>
          <div className="space-x-4">
            <Link
              href="/impressum"
              className="hover:text-yellow-500 transition-colors"
            >
              Impressum
            </Link>
            <span>|</span>
            <Link
              href="/datenschutz"
              className="hover:text-yellow-500 transition-colors"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
