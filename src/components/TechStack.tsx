import Image from "next/image";
import React from "react";
import { Heading } from "./Heading";
import { twMerge } from "tailwind-merge";

export const TechStack = () => {
  return (
    <div>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        Tech Stack
      </Heading>
      <div className="flex flex-wrap">
        <div className="flex flex-wrap">
          <img className="my-2" src="https://skillicons.dev/icons?i=angular,dotnet,mysql,typescript,javascript,elixir,kubernetes,docker,git,kafka,rust,golang,kubernetes,mongo,postgres" />
          <img className="my-2" src="https://skillicons.dev/icons?i=html,css,nodejs,python,threejs,react,nextjs,tailwind,bootstrap,dart,flutter" />
        </div>
      </div>
    </div>
  );
};
