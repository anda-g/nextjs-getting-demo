"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.email({
    error: "Email is required",
  }),
  password: z.string().min(8, "Password must be at least 8 character long"),
});
export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(value);
  };

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
            <CardTitle>Log in to our platform</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="log-in-form"
                className="space-y-4"
                action="#"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
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

                <div className="flex justify-between">
                  <div className="flex items-center justify-center">
                    <Checkbox />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-black hover:underline">
                    Lost Password?
                  </a>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col space-y-4 w-full">
              <Button form="log-in-form" type="submit" className="w-full">
                Login to your account
              </Button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <Link
                  href={"/register"}
                  className="text-black hover:underline cursor-pointer"
                >
                  Create account
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
