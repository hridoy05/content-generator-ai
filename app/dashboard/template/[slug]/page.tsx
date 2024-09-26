import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import template from '@/utils/template'
import { Template } from '@/utils/types'
import { ArrowLeft, Copy, Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function page({params}: {params: { slug: string }}) {
  const t = template.find((item) => item.slug === params.slug) as Template
  return (
    <div>
    <div className="flex justify-between mx-5 my-3">
      <Link href="/dashboard">
        <Button>
          <ArrowLeft /> <span className="ml-2">Back</span>
        </Button>
      </Link>

      <Button>
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

        <form className="mt-6">
          {t.form.map((item) => (
            <div className="my-2 flex flex-col gap-2 mb-7">
              <label className="font-bold pb-5">{item.label}</label>

              {item.field === "input" ? (
                <Input
                  name={item.name}
                  // onChange={(e) => setQuery(e.target.value)}
                  required={item.required}
                />
              ) : (
                <Textarea
                  name={item.name}
                  // onChange={(e) => setQuery(e.target.value)}
                  required={item.required}
                />
              )}
            <Button
              type="submit"
              className="w-full py-6"
            > "Generate content"
            </Button>
            </div>
          ))}
        </form>
      </div>
    </div>
  </div>
  )
}

export default page