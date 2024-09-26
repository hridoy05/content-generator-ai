"use client";
import React from "react";
import { Button } from "@/components/ui/button";

export default function Billing() {

  return (
    <div>
      <div className="p-10 my-5 mx-5 mb-5 rounded-lg bg-slate-200 dark:bg-slate-800 flex flex-col justify-center items-center">
        <h1 className="text-xl">Billing</h1>
        <p>Manage your subscription plan</p>
      </div>

      <div className="p-5">
        <Button>Access Stripe Customer Portal</Button>
      </div>
    </div>
  );
}
