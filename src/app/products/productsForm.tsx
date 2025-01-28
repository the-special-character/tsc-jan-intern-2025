import FormInput from "@/components/formElements/formInput";
import { Form } from "@/components/ui/form";
import { Percent } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

const fields = [
  {
    name: "title",
    component: FormInput,
    placeholder: "Enter Title",
  },
  // {
  //   name: "image",
  // },
  {
    name: "price",
    component: FormInput,
    variant: "Currency",
    placeholder: "0.00",
    currencyIcon: "€",
    currencyLabel: "Euro",
  },
  // {
  //   name: "description",
  // },
  // {
  //   name: "description",
  // },
  // {
  //   name: "brand",
  // },
  // {
  //   name: "model",
  // },
  // {
  //   name: "color",
  // },
  // {
  //   name: "category",
  // },
  {
    name: "discount",
    component: FormInput,
    variant: "InputWithEndIcon",
    placeholder: "10",
    icon: Percent,
  },
];

const ProductsForm = ({ id }: Props) => {
  const form = useForm({
    defaultValues: {
      title: "",
      price: "",
      discount: "",
    },
  });

  const onSubmit = (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };

  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {fields.map(({ component: Component, ...x }) => (
          <Component key={x.name} {...x} />
        ))}
      </form>
    </Form>
  );
};

export default ProductsForm;
