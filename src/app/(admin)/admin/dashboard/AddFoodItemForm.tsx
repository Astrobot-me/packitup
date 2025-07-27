
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const adminFormSchema = z
  .object({
    title: z
      .string()
      .min(10, { message: "Title must be at least 10 characters." })
      .max(100, { message: "Title cannot be more than 100 characters." }),

    description: z
      .string()
      .min(20, { message: "Description must be at least 20 characters." })
      .max(500, { message: "Description cannot be more than 500 characters." }),

    videoUrl: z
      .string()
      .url({ message: "Please enter a valid video URL." }),

    resourceUrl: z
      .string()
      .url({ message: "Please enter a valid resource URL." })
      .optional()
      .or(z.literal("")),

    thumbnailUrl: z
      .string()
      .url({ message: "Please enter a valid thumbnail URL." })
      .optional()
      .or(z.literal("")),
    tags: z.string().min(1, "Please enter at least one tag.")
  })
 

export type AdminFormValues = z.infer<typeof adminFormSchema>;


export function AddFoodItemForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      resourceUrl: "",
      thumbnailUrl: "",
      tags: "",
    },
  });

  

  async function onSubmit(values: z.infer<typeof adminFormSchema>) {
   
  }

  return (
    <Card className="shadow-lg mt-4">
      <CardHeader>
        <CardTitle>Add a New Resource</CardTitle>
        <CardDescription>Fill out the form below to add a new, pre-approved resource.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Ultimate Guide to CSS Flexbox" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="A detailed description of the resource..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.youtube.com/watch?v=..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resourceUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource Link (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., A blog post or GitHub repo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnailUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://.../image.png" {...field} />
                  </FormControl>
                   <FormDescription>If you leave this blank, a thumbnail will be generated from the YouTube video.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="e.g., React, Next.js, Firebase" {...field} />
                  </FormControl>
                  <FormDescription>Enter comma-separated tags, or generate them with AI.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Resource
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}