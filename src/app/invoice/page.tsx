"use client";

import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/formElements/formInput";
import FormSelect from "@/components/formElements/FormSelect";
import FormDatePicker from "@/components/formElements/FormDatepicker";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const address = {
  streatAddress: "",
  city: "",
  postCode: "",
  country: "",
};

const Address = ({ control, name }) => {
  return (
    <>
      <FormInput
        control={control}
        name={`${name}.streatAddress`}
        rules={{}}
        label="Steat Address"
      />
      <div className="flex gap-2">
        <FormInput
          control={control}
          name={`${name}.city`}
          rules={{}}
          label="City"
        />
        <FormInput
          control={control}
          name={`${name}.postCode`}
          rules={{}}
          label="Post Code"
        />
        <FormInput
          control={control}
          name={`${name}.country`}
          rules={{}}
          label="Country"
        />
      </div>
    </>
  );
};

const InvoiceForm = () => {
  const form = useForm({
    defaultValues: {
      billFrom: {
        ...address,
      },
      billTo: {
        clientName: "",
        clientEmail: "",
        ...address,
      },
      invoiceDate: "",
      paymentTerms: "",
      projectDescription: "",
      itemList: [],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control,
      name: "itemList",
    }
  );

  const { itemList } = form.watch();

  const onSubmit = async (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };

  return (
    <Form {...form}>
      <form
        id="invoice-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <fieldset>
          <legend>Bill From</legend>
          <Address control={form.control} name="billFrom" />
        </fieldset>
        <fieldset>
          <legend>Bill To</legend>
          <FormInput
            control={form.control}
            name="billTo.clientName"
            rules={{}}
            label="Client Name"
          />
          <FormInput
            control={form.control}
            name="billTo.clientEmail"
            rules={{}}
            label="Client Email"
          />
          <Address control={form.control} name="billTo" />
        </fieldset>
        <div className="flex gap-2">
          <FormDatePicker
            control={form.control}
            name="invoiceDate"
            label="Invoice Date"
            placeholder="Select Invoice Date"
            rules={{}}
            calendarProps={{
              disabled: (date) => date < new Date(),
            }}
          />
          <FormSelect
            control={form.control}
            name="paymentTerms"
            label="Payment Terms"
            placeholder="Please Select Payment Terms"
            rules={{}}
            options={[
              {
                value: "7Days",
                text: "Next 7 Days",
              },
              {
                value: "15Days",
                text: "Next 15 Days",
              },
              {
                value: "30Days",
                text: "Next 30 Days",
              },
            ]}
          />
        </div>
        <FormInput
          control={form.control}
          name="projectDescription"
          rules={{}}
          label="Project Description"
        />
        <fieldset>
          <legend>Item List</legend>
          <Table>
            {fields.length > 0 && (
              <TableHeader>
                <TableRow>
                  <TableHead className="w-2/5">Item name</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
            )}
            <TableBody>
              {fields.map((item, index) => {
                const { quantity, price } = itemList[index];
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <FormInput
                        control={form.control}
                        name={`itemList.${index}.itemName`}
                        rules={{}}
                      />
                    </TableCell>
                    <TableCell>
                      <FormInput
                        control={form.control}
                        name={`itemList.${index}.quantity`}
                        rules={{}}
                      />
                    </TableCell>
                    <TableCell>
                      <FormInput
                        control={form.control}
                        name={`itemList.${index}.price`}
                        rules={{}}
                      />
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("en-IN", {
                        currency: "INR",
                        style: "currency",
                      }).format((quantity || 0) * (price || 0))}
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <TrashIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      append({ itemName: "", quantity: "", price: "" });
                    }}
                  >
                    Add New Item
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </fieldset>
      </form>
    </Form>
  );
};

const Invoices = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full !max-w-screen-sm p-0">
        <ScrollArea className="grid gap-4 py-4 h-screen p-6">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>

          <InvoiceForm />

          <SheetFooter>
            <SheetClose asChild>
              <Button type="reset" variant="secondary" form="invoice-form">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit" form="invoice-form">
              Save changes
            </Button>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default Invoices;
