"use client"
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerClose,
  DrawerTrigger,

} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import React, { useState } from 'react'

import { PlusIcon } from "lucide-react"
export default function CreatePost({addpost, setIsLoading}:any) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("")
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    console.log(file)
    setSelectedFile(file); 
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string); 
    };
    reader.readAsDataURL(file);
  }
};
const handlePost = async () => {
  setIsLoading(true)
  const formData = new FormData();
  if (selectedFile)formData.append("file", selectedFile);  
  formData.append("data", JSON.stringify({
    title
  }))
  const res = await fetch("/api/v1/create-post", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log(data.data)
  addpost(data.data)
  setIsLoading(false)
  console.log("Uploaded image URL:", data.url);
};

  return (<>
    <Drawer>
        
      <DrawerTrigger>  <div className="flex h-full items-center rounded-2xl bg-token-bg-active px-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28" className="h-7 w-7"><path fill="currentColor" d="M18.285 4.565a3.642 3.642 0 0 1 5.15 5.15l-6.927 6.927a5.83 5.83 0 0 1-3.3 1.65l-2.543.363a1.167 1.167 0 0 1-1.32-1.32l.363-2.544a5.83 5.83 0 0 1 1.65-3.3zm3.5 1.65c-.51-.511-1.34-.511-1.85 0l-6.927 6.927a3.5 3.5 0 0 0-.99 1.98l-.143 1.003 1.003-.143a3.5 3.5 0 0 0 1.98-.99l6.927-6.927c.51-.511.51-1.34 0-1.85m-8.952-1.55c0 .645-.521 1.168-1.165 1.168-1.165.001-1.987.01-2.63.07-.63.06-1.006.165-1.294.312a3.5 3.5 0 0 0-1.53 1.53c-.156.306-.263.712-.321 1.418-.059.72-.06 1.644-.06 2.97v3.734c0 1.325.001 2.25.06 2.97.058.706.165 1.111.322 1.419a3.5 3.5 0 0 0 1.53 1.529c.307.157.712.264 1.418.322.72.059 1.644.06 2.97.06h3.734c1.326 0 2.25-.001 2.97-.06.706-.058 1.111-.165 1.419-.322a3.5 3.5 0 0 0 1.53-1.53c.146-.287.25-.663.31-1.293.061-.643.07-1.465.07-2.63a1.167 1.167 0 1 1 2.334.002c-.001 1.141-.008 2.077-.081 2.849-.075.785-.224 1.483-.555 2.132a5.83 5.83 0 0 1-2.55 2.549c-.69.352-1.437.499-2.287.568-.826.068-1.846.068-3.11.068h-3.834c-1.264 0-2.284 0-3.11-.068-.85-.07-1.597-.216-2.288-.568a5.83 5.83 0 0 1-2.55-2.55c-.351-.69-.498-1.437-.568-2.288-.067-.825-.067-1.845-.067-3.11v-3.833c0-1.264 0-2.284.067-3.11.07-.85.217-1.597.569-2.288a5.83 5.83 0 0 1 2.55-2.55c.648-.33 1.345-.48 2.13-.554.773-.073 1.708-.08 2.85-.081.644 0 1.167.521 1.167 1.166">
        </path></svg><span className="sr-only">Compose</span></div></DrawerTrigger>
      <DrawerContent className="h-screen">
        <div className="p-7 mb-6">
          <DrawerTitle></DrawerTitle>
          <div className="text-3xl font-bold text-zinc-700 dark:text-zinc-100 mb-3">Create a Post</div>
          <Textarea value={title} onChange={(e)=>setTitle(e.target.value)}  placeholder="Write Somthing on your mind" className="dark:text-zinc-100 h-50" />
          <div className="flex justify-between mt-5 items-center">
            <div className="w-max flex gap-2 items-center">
              {imagePreview && (
                <div className="">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    onContextMenu={(e)=>e.preventDefault()}
                    className=" h-10 w-10 rounded-lg border object-cover active:object-contain  active:border-0  transition active:w-100 active:h-100 active:-translate-y-60"
                    
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="p-2 rounded-full outline cursor-pointer hover:bg-gray-100">
                <PlusIcon />
              </label>
            </div>
            <DrawerClose className="-translate-2 text-right bg-zinc-800 text-white px-3 py-2 rounded-full mt-5 active:bg-zinc-600/10 active:text-black text-xs font-bold" onClick={handlePost}>Create</DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
    </>
  )
}
