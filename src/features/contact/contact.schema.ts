import { z } from 'zod';

export const contactSchema = z.object({
  emailova_adresa: z
    .string()
    .min(1, 'je nutné vyplnit')
    .email('neplatná adresa'),
  text: z.string().min(5, 'je nutné vyplnit'),
  antispam_code: z.number({
    required_error: 'je nutné vyplnit',
    invalid_type_error: 'musí být číslo',
  }),
  antispam_code_orig: z.number(),
});

export type ContactFormSchema = z.infer<typeof contactSchema>;
