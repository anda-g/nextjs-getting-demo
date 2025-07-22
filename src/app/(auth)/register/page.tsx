"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// file validation constants
const MAX_FILE_SIZE = 0.5 * 1024 * 1024; // 1MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const passwordRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

const formSchema = z.object({
  name: z
    .string()
    .min(7, "Please enter your full name (at least 7 characters)."),
  email: z.email({
    error: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      passwordRegex,
      "Password must include uppercase, lowercase, number, and special character."
    ),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      passwordRegex,
      "Password must include uppercase, lowercase, number, and special character."
    ),
  file: z
    .any()
    .refine((file) => file instanceof File, "File is required")
    .refine((file) => file?.size >= MAX_FILE_SIZE, "Max file size is 2MB")
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Only .jpeg .jpg, .png, .pdf files are allowed"
    ),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      file: null,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const [passwordType, setPasswordType] = useState("password");

  return (
    <div
      id="authentication-modal"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: 500, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative p-4 w-full max-w-md max-h-full"
      >
        <Card>
          <CardHeader>
            <CardTitle>Sign up to our platform</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="sign-up-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                action="#"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your name</FormLabel>
                      <FormControl>
                        <Input placeholder="Kung Sovannda" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="kungsovannda@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-between">
                          <Input
                            type={passwordType}
                            placeholder="••••••••"
                            {...field}
                          />
                          <button
                            onClick={() => {
                              setPasswordType(
                                passwordType === "password"
                                  ? "text"
                                  : "password"
                              );
                            }}
                            className="absolute right-14 cursor-pointer"
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { onChange, ref } }) => (
                    <FormItem>
                      <FormLabel>Upload File</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              onChange(e.target.files[0]);
                            }
                          }}
                          {...ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div className="flex-col w-full space-y-4">
              <Button type="submit" form="sign-up-form" className="w-full">
                Sign up your account
              </Button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Already have an account?{" "}
                <Link
                  href={"/login"}
                  className="text-black hover:underline cursor-pointer"
                >
                  Log in
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
