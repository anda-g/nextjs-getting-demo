"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAddProductMutation } from "@/lib/api/platziApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  title: z.string().min(4, "Title must be at least 4 character length!"),
  price: z.number("Invalid number").gt(0, "Price must be at least 1$."),
  description: z
    .string()
    .min(10, "Description must be at least 10 character length!"),
  categoryId: z.string(),
  images: z.array(z.string()),
});

export default function CreateProduct() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: "",
      images: [
        "https://www.monde-selection.com/wp-content/uploads/2024/05/1042983-768x768.png",
      ],
    },
  });

  const [addProduct] = useAddProductMutation();

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const result = await addProduct({ ...values }).unwrap();
      console.log("Created product:", result);
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };
  return (
    <div className="w-full rounded-md border-2 border-gray-200 flex justify-center items-center">
      <Button onClick={() => setIsOpen(!isOpen)} variant={"outline"}>
        <Plus />
      </Button>
      {isOpen && (
        <div className="w-screen h-screen  top-0 left-0 absolute z-50 ">
          <div className="h-full w-full bg-black/20 fixed flex justify-center items-center">
            <Card className="w-1/3 fixed">
              <CardHeader>
                <CardTitle className="text-2xl">Create new Product</CardTitle>
                <CardDescription>
                  Type in the following information to create a new product
                </CardDescription>
                <CardAction>
                  <Button variant={"outline"} onClick={() => setIsOpen(false)}>
                    <X />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    id="create-product"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product title</FormLabel>
                          <FormControl>
                            <Input placeholder="Hanuman Beer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              placeholder="10.99"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === ""
                                    ? undefined
                                    : Number(e.target.value)
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Choose a category</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="34">Clothes</SelectItem>
                                <SelectItem value="35">Electronics</SelectItem>
                                <SelectItem value="36">Furniture</SelectItem>
                                <SelectItem value="37">Shoes</SelectItem>
                                <SelectItem value="38">
                                  Miscellaneous
                                </SelectItem>
                              </SelectContent>
                            </Select>
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
                            <Textarea
                              className="resize-none h-20"
                              placeholder="Describe something about your product"
                              {...field}
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
                <Button className="w-full" form="create-product" type="submit">
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
