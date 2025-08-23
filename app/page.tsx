"use client";

import Component from "@/components/component";
import AutoGrowingTextArea from "@/registry/auto-growing-textarea";
import Combobox from "@/registry/combobox";
import MultiCombobox from "@/registry/multi-combobox";

const Home = () => (
  <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
    <header className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold tracking-tight">Faktion UI</h1>
      <p className="text-muted-foreground">A custom UI library for Faktion.</p>
    </header>
    <main className="flex flex-col flex-1 gap-8">
      <Component name="combobox" description="A combobox component">
        <Combobox
          value="option1"
          options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
          ]}
          onChange={() => {
            console.log("onChange");
          }}
        />
        <Combobox
          value="option1"
          grouped
          options={[
            { group: "Group 1", label: "Option 1", value: "option1" },
            { group: "Group 1", label: "Option 2", value: "option2" },
            { group: "Group 2", label: "Option 3", value: "option3" },
          ]}
          onChange={() => {
            console.log("onChange");
          }}
        />
      </Component>
      <Component name="multi-combobox" description="A multi combobox component">
        <MultiCombobox
          values={["option1", "option2"]}
          options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
          ]}
          onChange={() => {
            console.log("onChange");
          }}
        />

        <MultiCombobox
          grouped
          values={["option1", "option2"]}
          options={[
            { group: "Group 1", label: "Option 1", value: "option1" },
            { group: "Group 1", label: "Option 2", value: "option2" },
            { group: "Group 2", label: "Option 3", value: "option3" },
          ]}
          onChange={() => {
            console.log("onChange");
          }}
        />
      </Component>
      <Component
        name="auto-growing-textarea"
        description="A textarea that grows as you type"
      >
        <AutoGrowingTextArea
          value="Hello, world!"
          onChange={() => {
            console.log("onChange");
          }}
        />
      </Component>
    </main>
  </div>
);

export default Home;
