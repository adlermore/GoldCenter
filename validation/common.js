import { z } from "zod";

export const name = z
  .string()
  .min(1, { message: "This field is required" })
  .min(5, { message: "Name must be at least 5 characters long" })
  .max(50, { message: "Field must be at most 50 characters long" })
  .trim()
  .refine((val) => /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(val), {
    message: "Name must contain only letters, spaces, and hyphens",
  })
  .refine((val) => val.split(" ").length >= 2, {
    message: "Name must include both first name and surname",
  });

export const email_or_phone = z
  .string()
  .min(1, { message: "This field is required" })
  .email({ message: "Invalid email address" })
  .max(50, { message: "Field must be at most 50 characters long" })
  .trim()
  .refine((val) => val.trim().length > 0, {
    message: "Field cannot be empty or just spaces",
  });

export const phone = z
  .string()
  .min(1, { message: "This field is required" })
  .trim()
  .refine((val) => val.length > 0, {
    message: "Field cannot be empty or just spaces",
  });

export const message = z
  .string()
  .min(1, { message: "This field is required" })
  .max(1000, { message: "Field must be at most 1000 characters long" })
  .trim()
  .refine((val) => val.trim().length > 0, {
    message: "Field cannot be empty or just spaces",
  });
