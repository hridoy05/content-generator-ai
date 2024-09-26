"use client"
import { runAi, saveQuery } from '@/actions/ai'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import template from '@/utils/template'
import { Template } from '@/utils/types'
import { useUser } from '@clerk/nextjs'
import { ArrowLeft, Copy, Link, Loader2Icon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

function page({params}: {params: { slug: string }}) {
    // state
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  // console.log("useUser() in slug page", user);
  const email = user?.primaryEmailAddress?.emailAddress || "";

  const t = template.find((item) => item.slug === params.slug) as Template

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await runAi(t.aiPrompt + query);
      setContent(data);
      console.log(t, email, query, data);
      await saveQuery(t, email, query, data);
    } catch (err) {
      setContent("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }

  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Content copied to clipboard.");
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };
  return (
    <div>
    <div className="flex justify-between mx-5 my-3">
      <Link href="/dashboard">
        <Button>
          <ArrowLeft /> <span className="ml-2">Back</span>
        </Button>
      </Link>

      <Button onClick={handleCopy}>
        <Copy /> <span className="ml-2">Copy</span>
      </Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
      <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
        <div className="flex flex-col gap-3">
          <Image src={t.icon} alt={t.name} width={50} height={50} />
          <h2 className="font-medium text-lg">{t.name}</h2>
          <p className="text-gray-500">{t.desc}</p>
        </div>

        <form className="mt-6" onSubmit={handleSubmit}>
          {t.form.map((item) => (
            <div className="my-2 flex flex-col gap-2 mb-7">
              <label className="font-bold pb-5">{item.label}</label>

              {item.field === "input" ? (
                <Input
                  name={item.name}
                  onChange={(e) => setQuery(e.target.value)}
                  required={item.required}
                />
              ) : (
                <Textarea
                  name={item.name}
                  onChange={(e) => setQuery(e.target.value)}
                  required={item.required}
                />
              )}
            <Button
              type="submit"
              className="w-full py-6"
              disabled={loading}
            > 
            {
              loading ? (
                <Loader2Icon className="animate-spin mr-2" />
              ): (
                "Generate content"
              )
            }
            </Button>
            </div>
          ))}
        </form>
      </div>
      <div className="col-span-2">
      <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            placeholder="Generated content will appear here."
            className="h-96"
          />
        </div>
    </div>
  </div>
  )
}

export default page