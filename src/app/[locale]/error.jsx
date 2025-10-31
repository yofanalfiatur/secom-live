"use client"; // Error boundaries must be Client Components

import ButtonPrimary from "@/components/Elements/ButtonPrimary";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col mt-10 mb-10">
      <div className="container mx-auto items-center justify-center flex flex-col">
        <h1 className="mb-10 text-4xl text-center">Something went wrong!</h1>
        <ButtonPrimary
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          href=""
        >
          Try again
        </ButtonPrimary>
      </div>
    </section>
  );
}
