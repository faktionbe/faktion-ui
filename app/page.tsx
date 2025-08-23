"use client";

import { Plus, Rocket } from "lucide-react";

import Component from "@/components/component";
import CheckboxGroup from "@/registry/components/checkbox-group";
import { ColorPicker } from "@/registry/components/color-picker";
import Combobox from "@/registry/components/combobox";
import CountryCombobox from "@/registry/components/country-combobox";
import { Dropzone } from "@/registry/components/dropzone";
import Fab from "@/registry/components/fab";
import LanguageCombobox from "@/registry/components/language-combobox";
import MultiCombobox from "@/registry/components/multi-combobox";
import { Notification } from "@/registry/components/notification";
import { RadioGroup } from "@/registry/components/radio-group";
import { Rating } from "@/registry/components/rating";
import { Branch, BranchMessages } from "@/registry/components/branch";
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
      <Component name="fab" description="A floating action button component">
        <Fab
          onClick={() => {
            console.log("onClick");
          }}
        >
          <Plus />
        </Fab>
      </Component>
      <Component name="notification" description="A notification component">
        <Notification>
          <Fab
            onClick={() => {
              console.log("clicked");
            }}
          >
            <Rocket />
          </Fab>
          <Notification.Content size="md" side="top-right">
            4
          </Notification.Content>
        </Notification>
      </Component>
      <Component name="rating" description="A rating component">
        <Rating defaultValue={3}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Rating.Button key={index} />
          ))}
        </Rating>
      </Component>
      <Component name="color-picker" description="A color picker component">
        <ColorPicker className="max-w-sm rounded-md border bg-background p-4 shadow-sm">
          <ColorPicker.Selection />
          <div className="flex items-center gap-4">
            <ColorPicker.EyeDropper />
            <div className="grid w-full gap-1">
              <ColorPicker.Hue />
              <ColorPicker.Alpha />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ColorPicker.Output />
            <ColorPicker.Format />
          </div>
        </ColorPicker>
      </Component>
      <Component name="dropzone" description="A dropzone component">
        <Dropzone>
          <Dropzone.Content />
          <Dropzone.EmptyState>
            <p>Drag and drop files here</p>
          </Dropzone.EmptyState>
        </Dropzone>
      </Component>
      <Component name="radio-group" description="A radio group component">
        <span>Vertical</span>
        <RadioGroup
          options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
          ]}
        />
        <span>Horizontal</span>
        <RadioGroup
          orientation="horizontal"
          options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
          ]}
        />
      </Component>
      <Component name="checkbox-group" description="A checkbox group component">
        <span>Vertical</span>
        <CheckboxGroup
          checked={["option1"]}
          onChange={() => {
            console.log("onChange");
          }}
          options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
          ]}
        />
        <span>Horizontal</span>
        <CheckboxGroup
          orientation="horizontal"
          checked={["option1"]}
          onChange={() => {
            console.log("onChange");
          }}
          options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
          ]}
        />
      </Component>
      <Component
        name="country-combobox"
        description="A country combobox component"
      >
        <CountryCombobox
          value="us"
          onChange={(value) => {
            console.log(value);
          }}
        />
      </Component>
      <Component
        name="language-combobox"
        description="A language combobox component"
      >
        <LanguageCombobox
          value="en"
          onChange={(value) => {
            console.log(value);
          }}
        />
      </Component>
      <Component name="branch" description="A branch component">
        <Branch>
          <BranchMessages />
        </Branch>
      </Component>
    </main>
  </div>
);

export default Home;
