import z from "zod";

export const AccountBody = z.object({
  id: z.any().optional(),
  userName: z.string().optional(),
  name: z.string().optional(),
  surname: z.string().optional(),
  emailAddress: z.string().email().optional(),
  isActive: z.boolean().optional(),
  roleNames: z.array(z.string()).optional(),
  password: z.string().optional(),
  fullName: z.string().optional(),
  lastLoginTime: z.any().optional(),
  creationTime: z.any().optional(),
  company: z.number().optional(),
});

export type AccountBodyType = z.TypeOf<typeof AccountBody>;
