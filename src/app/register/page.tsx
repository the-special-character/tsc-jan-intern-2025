"use client";
import React from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import FormInput from "@/components/formElements/formInput";
import FormSelect from "@/components/formElements/FormSelect";
import FormRadioGroup from "@/components/formElements/FormRadioGroup";
import { useRouter } from "next/navigation";

const fields = [
  {
    component: FormInput,
    name: "email",
    rules: {
      required: {
        value: true,
        message: "Username is required",
      },
    },
    label: "Username",
    placeholder: "shadcn",
  },
  {
    component: FormSelect,
    name: "gender",
    rules: {
      required: {
        value: true,
        message: "Username is required",
      },
    },
    label: "Gender",
    placeholder: "Please Select Gender",
    options: [
      {
        value: "male",
        text: "Male",
      },
      {
        value: "female",
        text: "Female",
      },
    ],
  },
  {
    component: FormRadioGroup,
    name: "batch",
    rules: {
      required: {
        value: true,
        message: "Username is required",
      },
    },
    label: "Batch",
    options: [
      {
        value: "batch1",
        text: "Batch 1",
      },
      {
        value: "batch2",
        text: "Batch 2",
      },
    ],
  },
  {
    component: FormInput,
    name: "password",
    rules: {
      required: {
        value: true,
        message: "Username is required",
      },
    },
    label: "Password",
    placeholder: "Password",
    type: "password",
  },
  {
    component: FormInput,
    name: "confirmPassword",
    rules: {
      required: {
        value: true,
        message: "Confirm Password required",
      },
    },
    label: "Confirm Password",
    placeholder: "Confirm Password",
    type: "password",
  },
];

const Register = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json);
      localStorage.setItem("user", JSON.stringify(json));
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {fields.map(({ component: Component, ...x }) => (
          <Component key={x.name} control={form.control} {...x} />
        ))}

        <Button
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default Register;
