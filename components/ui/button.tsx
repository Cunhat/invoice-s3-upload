import React from "react";
import { Text, Pressable, PressableProps } from "react-native";

import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        primary: "bg-indigo-500  hover:bg-indigo-600/90",
        secondary: "bg-pink-500 ",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 ",
        lg: "h-11 px-8 ",
        full: "h-11 px-8  w-[80%]",
      },
    },
  }
);

export interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  className?: string;
  text: string;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  text,
  ...props
}) => {
  return (
    <Pressable
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      <Text className="text-white">{text}</Text>
    </Pressable>
  );
};
