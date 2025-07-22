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
  const [isSelectOpen, setIsSelectOpen] = useState(false); // Track Select menu state
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
    if (isSelectOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden"; // Disable scrolling
      document.body.style.paddingRight = `${scrollBarWidth}px`; // Adjust for scrollbar width
    } else {
      document.body.style.overflow = ""; // Enable scrolling
      document.body.style.paddingRight = ""; // Remove padding
    }
  }, [isSelectOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 h-16",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-full">
        <Link href="/" className="flex items-center space-x-2">
          <div className="font-bold text-2xl">
            <span className="text-yellow-500">EHCO</span>
          </div>
        </Link>
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
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
