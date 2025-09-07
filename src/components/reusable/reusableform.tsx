import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Label } from "flowbite-react";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "select" | "checkbox" | "custom";
  placeholder?: string;
  options?: { value: string; label: string }[];
  render?: (props: { register: any; error: any }) => ReactNode;
}

interface ReusableFormProps<T extends z.ZodType<any, any>> {
  schema: T;
  fields: FormField[];
  onSubmit: (data: z.infer<T>) => void;
  submitButtonText: string;
  className?: string;
  submitButtonClassName?: string;
}

const ReusableForm = <T extends z.ZodType<any, any>>({
  schema,
  fields,
  onSubmit,
  submitButtonText,
  className,
  submitButtonClassName,
}: ReusableFormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={twMerge("space-y-6", className)}
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <Label
            htmlFor={field.name}
            className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
          >
            {field.label}
          </Label>

         {field.type === "custom" && field.render ? (
  field.render({ register, error: errors[field.name] })
) : field.type === "select" ? (
  // existing select code
  <select
    {...register(field.name as any)}
    id={field.name}
    className={twMerge(
      "w-full rounded-lg border px-3 py-2 transition-all duration-200 focus:ring-2",
      "border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-blue-500",
      "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-blue-400",
      errors[field.name] &&
        "border-red-500 focus:ring-red-500 dark:border-red-400",
    )}
  >
    {field.options?.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
) : field.type === "checkbox" ? (
  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
    <input
      {...register(field.name as any)}
      id={field.name}
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-blue-500 dark:focus:ring-blue-400"
    />
    {field.label}
  </label>
) : (
  <input
    {...register(field.name as any)}
    id={field.name}
    type={field.type}
    placeholder={field.placeholder}
    className={twMerge(
      "w-full rounded-lg border px-3 py-2 transition-all duration-200 focus:ring-2",
      "border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-blue-500",
      "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-blue-400",
      errors[field.name] &&
        "border-red-500 focus:ring-red-500 dark:border-red-400",
    )}
  />
)}

          {errors[field.name] && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors[field.name]?.message as string}
            </p>
          )}
        </div>
      ))}

      <Button
        type="submit"
        disabled={isSubmitting}
        className={twMerge(
          "w-full rounded-lg px-4 py-2 font-semibold tracking-wide transition-all duration-300",
          "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-500",
          "hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50",
          submitButtonClassName,
        )}
      >
        {isSubmitting ? "Loading..." : submitButtonText}
      </Button>
    </form>
  );
};

export default ReusableForm;
