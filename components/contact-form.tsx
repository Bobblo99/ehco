"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Der Name muss mindestens 2 Zeichen enthalten." }),
  email: z
    .string()
    .email({ message: "Bitte gib eine gültige E-Mail-Adresse ein." }),
  phone: z
    .string()
    .min(10, { message: "Bitte gib eine gültige Telefonnummer ein." }),
  subject: z.string().min(2, { message: "Bitte gib einen Betreff ein." }),
  message: z.string().min(10, {
    message: "Die Nachricht muss mindestens 10 Zeichen enthalten.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Kontakt-API fehlgeschlagen");

      toast({
        title: "Nachricht gesendet",
        description: "Vielen Dank für Ihre Anfrage. Wir melden uns bald.",
      });

      form.reset();
    } catch (error) {
      console.error("⚠️ Kontaktformular Fehler:", error);
      toast({
        title: "Fehler",
        description: "Ihre Nachricht konnte nicht gesendet werden.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Ihr Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input placeholder="Ihre E-Mail-Adresse" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefonnummer</FormLabel>
                <FormControl>
                  <Input placeholder="z.B. 0171 1234567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Betreff</FormLabel>
              <FormControl>
                <Input placeholder="Geben Sie den Betreff ein" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nachricht</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Bitte teilen Sie uns Ihr Anliegen mit..."
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Wird gesendet...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" /> Nachricht senden
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
