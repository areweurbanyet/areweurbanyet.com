import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { z } from "astro:content";

export const optionalClassProp = z
  .object({
    class: z.string().optional(),
  })
  .transform(({ class: className, ...rest }) => ({
    className,
    ...rest,
  }));

export const elements = z.union([
  z.enum(["a", "article", "div", "footer", "header", "section", "span"]),
  z.custom<AstroComponentFactory>(), // Using HTMLElement as the type for Astro elements
]);

export const optionalElementProp = (defaultElement: z.input<typeof elements>) =>
  z
    .object({
      element: elements.default(defaultElement),
    })
    .transform(({ element: Element, ...rest }) => ({
      Element,
      ...rest,
    }));

export const props = {
  defaultElement: optionalElementProp,
  className: optionalClassProp,
};
