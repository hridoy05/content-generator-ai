"use client";
import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

export default function TopNav() {

  const {isSignedIn,user, isLoaded} = useUser()

  return (
    <nav className="flex justify-between items-center p-2 shadow">
        <Link href="/">AI</Link>
        <div className="flex items-center">
            {isSignedIn && <Link href='/dashboard' className="mr-2">{`${user.fullName}`}Dashboard</Link>}
        </div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
    </nav>
  );
}
