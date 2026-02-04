import React, { forwardRef } from "react";

export const Container = forwardRef<HTMLElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    return (
      <main ref={ref} className={`max-w-4xl w-full mx-auto py-20 px-4 md:px-10`}>
        {children}
      </main>
    );
  }
);

Container.displayName = "Container";
