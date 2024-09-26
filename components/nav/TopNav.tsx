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
import Image from "next/image";
import { ModeToggle } from "@/components/nav/ModeToggle";
import { Toaster } from "react-hot-toast";

export default function TopNav() {
  const { isSignedIn, user } = useUser();
  console.log({ isSignedIn, user });
  return (
    <>
    <nav className="flex justify-between items-center p-2 shadow">
      <Toaster />
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={50}
          className="cursor-pointer"
        />
      </Link>
      <div className="flex items-center">
        {isSignedIn && (
          <Link
            href="/dashboard"
            className="mr-2"
          >{`${user.firstName}'s Dashboard`}</Link>
        )}

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div className="ml-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
    </>
  );
}
