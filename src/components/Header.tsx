"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { SEED_USERS } from "@/lib/seed-users";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const { user, login, logout } = useAuth();
  const [showUserPicker, setShowUserPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    if (!showUserPicker) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowUserPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserPicker]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-forest/95 text-white shadow-[0_8px_30px_rgb(0_0_0/0.08)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group" aria-label="The Kircuit home">
          <span className="text-xl font-bold tracking-[-0.04em] text-white">
            The <span className="text-brand-lime">Kircuit</span>
          </span>
        </Link>

        <nav
          className="flex items-center gap-3 sm:gap-5"
          aria-label="Main navigation"
        >
          <Link
            href="/members"
            className="text-sm font-semibold text-white/80 hover:text-brand-lime"
          >
            Members
          </Link>
          {user ? (
            <>
              <Link
                href="/profile"
                className="text-sm font-semibold text-white/80 hover:text-brand-lime"
              >
                Profile
              </Link>
              <div className="hidden items-center gap-2 sm:flex">
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-8 w-8 rounded-full ring-2 ring-white/20"
                />
                <span className="text-sm font-medium text-white">
                  {user.name}
                </span>
              </div>
              <button
                onClick={logout}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
              >
                Log out
              </button>
            </>
          ) : (
            <div className="relative" ref={pickerRef}>
              <button
                onClick={() => setShowUserPicker(!showUserPicker)}
                className="rounded-full bg-brand-lime px-5 py-2 text-sm font-bold text-brand-forest shadow-sm hover:-translate-y-0.5 hover:bg-brand-lime-dark"
              >
                Log in
              </button>
              {showUserPicker && (
                <div className="absolute right-0 top-12 z-10 w-64 rounded-2xl border border-gray-200 bg-white p-2.5 text-brand-forest shadow-2xl">
                  <p className="mb-2 px-2 text-xs font-semibold text-gray-700">
                    Pick a user (dev mode)
                  </p>
                  {SEED_USERS.map((seedUser) => (
                    <button
                      key={seedUser.id}
                      onClick={() => {
                        login(seedUser);
                        setShowUserPicker(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-brand-forest hover:bg-gray-100"
                    >
                      <img
                        src={seedUser.image}
                        alt={seedUser.name}
                        className="h-6 w-6 rounded-full"
                      />
                      {seedUser.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
