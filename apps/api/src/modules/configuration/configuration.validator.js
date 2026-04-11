import { z } from "zod";

const keyPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const configurationRoleSchema = z.object({
  key: z.string().min(2).max(50).regex(keyPattern, "Use lowercase letters, numbers, and hyphens only"),
  name: z.string().min(2).max(80),
  description: z.string().max(200).default(""),
  productKeys: z.array(z.string().min(1)).default([]),
  isActive: z.boolean().default(true)
});

const configurationProductSchema = z.object({
  key: z.string().min(2).max(50).regex(keyPattern, "Use lowercase letters, numbers, and hyphens only"),
  label: z.string().min(2).max(80),
  description: z.string().max(200).default(""),
  isActive: z.boolean().default(true)
});

export const updateConfigurationSchema = z
  .object({
    roles: z.array(configurationRoleSchema).min(1),
    products: z.array(configurationProductSchema).min(1)
  })
  .superRefine((value, ctx) => {
    const roleKeys = new Set();
    const productKeys = new Set();

    value.roles.forEach((role, index) => {
      const normalizedKey = role.key.toLowerCase();
      if (roleKeys.has(normalizedKey)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["roles", index, "key"],
          message: "Role key must be unique"
        });
      }
      roleKeys.add(normalizedKey);
    });

    value.products.forEach((product, index) => {
      const normalizedKey = product.key.toLowerCase();
      if (productKeys.has(normalizedKey)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["products", index, "key"],
          message: "Product key must be unique"
        });
      }
      productKeys.add(normalizedKey);
    });

    value.roles.forEach((role, roleIndex) => {
      role.productKeys.forEach((productKey, productIndex) => {
        if (!productKeys.has(String(productKey || "").toLowerCase())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["roles", roleIndex, "productKeys", productIndex],
            message: "Role references an unknown product"
          });
        }
      });
    });
  });
