import React, { type FC } from "react";

import { Install } from "@/components/install";
import { OpenInV0Button } from "@/components/open-in-v0-button";

interface ComponentProps {
  name: string;
  description: string;
  children: React.ReactNode;
}
const Component: FC<ComponentProps> = ({ name, description, children }) => (
  <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="">
          <a href={`#${name}`}>{name}</a>
        </h1>
        <h2 className="text-sm text-muted-foreground">{description}</h2>
      </div>

      <OpenInV0Button name="hello-world" className="w-fit" />
    </div>
    <div className="flex items-center justify-center min-h-[400px] relative flex-col gap-4">
      {children}
    </div>
    <Install component={name} />
  </div>
);

export default Component;
