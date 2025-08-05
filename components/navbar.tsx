"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) return null; // Hide Navbar on admin pages

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 h-16",
          isScrolled
            ? "bg-background/95 backdrop-blur-sm shadow-md"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center h-full">
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={() => setIsOpen(false)}
          >
            <div className="font-bold text-2xl">
              <span className="text-yellow-500">
                <img className="w-16" src="/ehco-logo.svg" alt="Logo" />
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="font-medium hover:text-yellow-500 transition-colors"
            >
              Über uns
            </Link>
            <Link
              href="/services"
              className="font-medium hover:text-yellow-500 transition-colors"
            >
              Leistungen
            </Link>
            <Link
              href="/contact"
              className="font-medium hover:text-yellow-500 transition-colors"
            >
              Kontakt
            </Link>
            <Link href="/booking" passHref>
              <Button
                variant="default"
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Termin buchen
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Thema wechseln"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Thema wechseln"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menü öffnen"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-background border-b shadow-lg">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <Link
                href="/about"
                className="block py-3 text-lg font-medium hover:text-yellow-500 transition-colors border-b border-border"
                onClick={() => setIsOpen(false)}
              >
                Über uns
              </Link>
              <Link
                href="/services"
                className="block py-3 text-lg font-medium hover:text-yellow-500 transition-colors border-b border-border"
                onClick={() => setIsOpen(false)}
              >
                Leistungen
              </Link>
              <Link
                href="/contact"
                className="block py-3 text-lg font-medium hover:text-yellow-500 transition-colors border-b border-border"
                onClick={() => setIsOpen(false)}
              >
                Kontakt
              </Link>
              <div className="pt-4">
                <Link href="/booking" passHref>
                  <Button
                    variant="default"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-lg py-6"
                    onClick={() => setIsOpen(false)}
                  >
                    Termin buchen
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
