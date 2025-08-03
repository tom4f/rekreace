import { z } from 'zod';

export const contactSchema = z.object({
  emailova_adresa: z
    .email({ message: 'neplatná adresa' })
    .min(1, 'je nutné vyplnit'),
  text: z.string().min(5, 'je nutné vyplnit'),
  antispam_code: z
    .number({ message: 'musí být číslo' })
    .min(0, 'je nutné vyplnit'),
  antispam_code_orig: z.number(),
});

export type ContactFormSchema = z.infer<typeof contactSchema>;
