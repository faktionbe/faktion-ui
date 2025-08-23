"use client";

import { Plus, Rocket } from "lucide-react";

import Component from "@/components/component";
import { Branch, BranchMessages } from "@/registry/components/branch";
import CheckboxGroup from "@/registry/components/checkbox-group";
import { CodeBlock } from "@/registry/components/code-block";
import { ColorPicker } from "@/registry/components/color-picker";
import Combobox from "@/registry/components/combobox";
import { Conversation } from "@/registry/components/conversation";
import CountryCombobox from "@/registry/components/country-combobox";
import { Dropzone } from "@/registry/components/dropzone";
import Fab from "@/registry/components/fab";
import { InlineCitation } from "@/registry/components/inline-citation";
import LanguageCombobox from "@/registry/components/language-combobox";
import { Loader } from "@/registry/components/loader";
import { Message } from "@/registry/components/message";
import MultiCombobox from "@/registry/components/multi-combobox";
import { Notification } from "@/registry/components/notification";
import { PromptInput } from "@/registry/components/prompt-input";
import { RadioGroup } from "@/registry/components/radio-group";
import { Rating } from "@/registry/components/rating";
import { Reasoning } from "@/registry/components/reasoning";
import { Response } from "@/registry/components/response";
import { Source } from "@/registry/components/source";
import Status from "@/registry/components/status";
import { Suggestion, Suggestions } from "@/registry/components/suggestion";
import { Task } from "@/registry/components/task";
import { Tool } from "@/registry/components/tool";
import { WebPreview } from "@/registry/components/web-preview";
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
          <BranchMessages>
            <div key="branch-1">
              <p>This is branch 1 content</p>
            </div>
            <div key="branch-2">
              <p>This is branch 2 content</p>
            </div>
            <div key="branch-3">
              <p>This is branch 3 content</p>
            </div>
          </BranchMessages>
        </Branch>
      </Component>
      <Component name="code-block" description="A code block component">
        <CodeBlock
          code="const hello = () => console.log('Hello World!');"
          language="javascript"
        />
      </Component>
      <Component name="conversation" description="A conversation component">
        <Conversation>
          <div className="p-4">Sample conversation content</div>
        </Conversation>
      </Component>
      <Component name="image" description="An image component">
        <div className="w-32 h-32 border rounded-lg flex items-center justify-center">
          Image placeholder
        </div>
      </Component>
      <Component
        name="inline-citation"
        description="An inline citation component"
      >
        <div className="p-4 border rounded-lg">
          <p>
            This is some text with an{" "}
            <InlineCitation>inline citation</InlineCitation> in the middle.
          </p>
        </div>
      </Component>
      <Component name="loader" description="A loader component">
        <Loader />
        <Loader size={24} />
      </Component>
      <Component name="message" description="A message component">
        <Message from="user">
          <Message.Avatar src="/avatar.png" name="User" />
          <Message.Content>Hello! How can I help you today?</Message.Content>
        </Message>
        <Message from="assistant">
          <Message.Avatar src="/avatar.png" name="Assistant" />
          <Message.Content>
            I&apos;m here to assist you with any questions or tasks you might
            have.
          </Message.Content>
        </Message>
      </Component>
      <Component name="prompt-input" description="A prompt input component">
        <PromptInput>
          <PromptInput.Textarea placeholder="Type your message here..." />
          <PromptInput.Toolbar>
            <PromptInput.Tools>
              <PromptInput.Button>Tool 1</PromptInput.Button>
              <PromptInput.Button>Tool 2</PromptInput.Button>
            </PromptInput.Tools>
            <PromptInput.Submit />
          </PromptInput.Toolbar>
        </PromptInput>
      </Component>
      <Component name="reasoning" description="A reasoning component">
        <Reasoning>
          <p>This is the reasoning behind the response...</p>
        </Reasoning>
      </Component>
      <Component name="response" description="A response component">
        <Response>This is a sample response from the AI assistant.</Response>
      </Component>
      <Component name="source" description="A source component">
        <Source href="https://example.com" title="Example Source">
          This is the content of the source document.
        </Source>
      </Component>
      <Component name="status" description="A status component">
        <div className="flex items-center gap-4">
          <Status status="online" size="sm" />
          <span>Online</span>
          <Status status="offline" size="sm" />
          <span>Offline</span>
        </div>
      </Component>
      <Component name="suggestion" description="A suggestion component">
        <Suggestions>
          <Suggestion
            suggestion="What is AI?"
            onClick={(suggestion) => {
              console.log(suggestion);
            }}
          />
          <Suggestion
            suggestion="How does machine learning work?"
            onClick={(suggestion) => {
              console.log(suggestion);
            }}
          />
          <Suggestion
            suggestion="Explain neural networks"
            onClick={(suggestion) => {
              console.log(suggestion);
            }}
          />
        </Suggestions>
      </Component>
      <Component name="task" description="A task component">
        <Task>
          This task involves completing the project requirements and
          documentation.
        </Task>
      </Component>
      <Component name="tool" description="A tool component">
        <Tool>The calculator tool has been executed successfully.</Tool>
      </Component>
      <Component name="web-preview" description="A web preview component">
        <WebPreview>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Example Website</h3>
            <p className="text-sm text-muted-foreground">https://example.com</p>
          </div>
        </WebPreview>
      </Component>
    </main>
  </div>
);

export default Home;
