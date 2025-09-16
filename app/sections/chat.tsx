import React from 'react';
import {
  CopyIcon,
  GlobeIcon,
  MicIcon,
  PlusIcon,
  SearchIcon,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';

import Component from '@/components/component';
import { Branch } from '@/registry/components/branch';
import { CodeBlock } from '@/registry/components/code-block';
import { Conversation } from '@/registry/components/conversation';
import { InlineCitation } from '@/registry/components/inline-citation';
import { Loader } from '@/registry/components/loader';
import { Message } from '@/registry/components/message';
import { PromptInput } from '@/registry/components/prompt-input';
import { Rating } from '@/registry/components/rating';
import { Reasoning } from '@/registry/components/reasoning';
import { Response } from '@/registry/components/response';
import { Sources } from '@/registry/components/sources';
import Status from '@/registry/components/status';
import { Suggestion, Suggestions } from '@/registry/components/suggestion';
import { Task } from '@/registry/components/task';
import { Tool } from '@/registry/components/tool';
import { WebPreview } from '@/registry/components/web-preview';
import { Actions } from '@/registry/components/actions';
import { Artifact } from '@/registry/components/artifact';
import { ChainOfThought } from '@/registry/components/chain-of-thought';

const Chat = () => (
  <>
    <Component
      name='actions'
      description='Small actions on a message'
      code={`
      <Actions>
        <Actions.Action>
          <ThumbsUp />
        </Actions.Action>
        <Actions.Action>
          <ThumbsDown />
        </Actions.Action>
      </Actions>`}>
      <Actions>
        <Actions.Action>
          <ThumbsUp />
        </Actions.Action>
        <Actions.Action>
          <ThumbsDown />
        </Actions.Action>
      </Actions>
    </Component>

    <Component
      name='artifact'
      description='Customize the appearance of a message'
      code={`
      <Artifact>
        <Artifact.Header>
          <div>
            <Artifact.Title>
              Dijkstra&apos;s Algorithm Implementation
            </Artifact.Title>
            <Artifact.Description>Updated 1 minute ago</Artifact.Description>
          </div>
          <Artifact.Actions>
            <Artifact.Action
              icon={CopyIcon}
              label='Copy'
              tooltip='Copy to clipboard'
            />
          </Artifact.Actions>
        </Artifact.Header>
        <Artifact.Content>Fill in the artifact content here.</Artifact.Content>
      </Artifact>      
      `}>
      <Artifact>
        <Artifact.Header>
          <div>
            <Artifact.Title>
              Dijkstra&apos;s Algorithm Implementation
            </Artifact.Title>
            <Artifact.Description>Updated 1 minute ago</Artifact.Description>
          </div>
          <Artifact.Actions>
            <Artifact.Action
              icon={CopyIcon}
              label='Copy'
              tooltip='Copy to clipboard'
            />
          </Artifact.Actions>
        </Artifact.Header>
        <Artifact.Content>Fill in the artifact content here.</Artifact.Content>
      </Artifact>
    </Component>

    <Component
      name='branch'
      description='A branch component'
      code={`
         <Branch defaultBranch={0}>
          <Branch.Messages>
            <Message from="user">
              <Message.Content>Hello</Message.Content>
            </Message>
            <Message from="user">
              <Message.Content>Hi!</Message.Content>
            </Message>
          </Branch.Messages>
          <Branch.Selector from="user">
            <Branch.Previous />
            <Branch.Page />
            <Branch.Next />
          </Branch.Selector>
        </Branch>
        `}>
      <Branch defaultBranch={0}>
        <Branch.Messages>
          <Message from='user'>
            <Message.Content>Hello</Message.Content>
          </Message>
          <Message from='user'>
            <Message.Content>Hi!</Message.Content>
          </Message>
        </Branch.Messages>
        <Branch.Selector from='user'>
          <Branch.Previous />
          <Branch.Page />
          <Branch.Next />
        </Branch.Selector>
      </Branch>
    </Component>

    <Component
      name='chain-of-thought'
      description='A chain of thought component'
      code={`
      <ChainOfThought defaultOpen>
        <ChainOfThought.Header />
        <ChainOfThought.Content>
          <ChainOfThought.Step
            icon={SearchIcon}
            label='Searching for information'
            status='complete'>
            <ChainOfThought.SearchResults>
              <ChainOfThought.SearchResult>
                Result 1
              </ChainOfThought.SearchResult>
            </ChainOfThought.SearchResults>
          </ChainOfThought.Step>
        </ChainOfThought.Content>
      </ChainOfThought>      
      `}>
      <ChainOfThought defaultOpen>
        <ChainOfThought.Header />
        <ChainOfThought.Content>
          <ChainOfThought.Step
            icon={SearchIcon}
            label='Searching for information'
            status='complete'>
            <ChainOfThought.SearchResults>
              <ChainOfThought.SearchResult>
                Result 1
              </ChainOfThought.SearchResult>
            </ChainOfThought.SearchResults>
          </ChainOfThought.Step>
        </ChainOfThought.Content>
      </ChainOfThought>
    </Component>

    <Component
      name='code-block'
      description='A code block component'
      code={`
         <CodeBlock
          code="const hello = () => console.log('Hello World!');"
          language="javascript"
        />
        `}>
      <CodeBlock
        code="const hello = () => console.log('Hello World!');"
        language='javascript'
      />
    </Component>

    <Component
      name='conversation'
      description='A conversation component'
      code={`
       <Conversation className="relative w-full" style={{ height: "500px" }}>
          <Conversation.Content>
            <Message from={"user"}>
              <Message.Content>Hello there</Message.Content>
            </Message>
            <Message from={"assistant"}>
              <Message.Content>
                <p>Aah, Hello Kenobi</p>
              </Message.Content>
            </Message>
          </Conversation.Content>
          <Conversation.ScrollButton />
        </Conversation>
      `}>
      <Conversation
        className='relative w-full'
        style={{ height: '500px' }}>
        <Conversation.Content>
          <Message from={'user'}>
            <Message.Content>Hello there</Message.Content>
          </Message>
          <Message from={'assistant'}>
            <Message.Content>
              <p>Aah, Hello Kenobi</p>
            </Message.Content>
          </Message>
        </Conversation.Content>
        <Conversation.ScrollButton />
      </Conversation>
    </Component>

    <Component
      name='image'
      description='An image component'>
      Can not display image component. This component can render generated AI
      images.
      <a href='https://ai-sdk.dev/elements/components/image'>See ai-elements</a>
    </Component>

    <Component
      name='inline-citation'
      description='An inline citation component'
      code={`
        <InlineCitation>
          <InlineCitation.Text>
            Faktion is an AI product studio that helps you build AI-powered
            products.
          </InlineCitation.Text>
          <InlineCitation.Card>
            <InlineCitation.CardTrigger sources={["https://faktion.com"]} />
            <InlineCitation.CardBody>
              <InlineCitation.Carousel>
                <InlineCitation.CarouselHeader>
                  <InlineCitation.CarouselIndex />
                </InlineCitation.CarouselHeader>
                <InlineCitation.CarouselContent>
                  <InlineCitation.CarouselItem>
                    <InlineCitation.Source
                      title="Faktion"
                      url="https://faktion.com"
                      description="Faktion is an AI product studio that helps you build AI-powered products."
                    />
                  </InlineCitation.CarouselItem>
                </InlineCitation.CarouselContent>
              </InlineCitation.Carousel>
            </InlineCitation.CardBody>
          </InlineCitation.Card>
        </InlineCitation>          
          `}>
      <InlineCitation>
        <InlineCitation.Text>
          Faktion is an AI product studio that helps you build AI-powered
          products.
        </InlineCitation.Text>
        <InlineCitation.Card>
          <InlineCitation.CardTrigger sources={['https://faktion.com']} />
          <InlineCitation.CardBody>
            <InlineCitation.Carousel>
              <InlineCitation.CarouselHeader>
                <InlineCitation.CarouselIndex />
              </InlineCitation.CarouselHeader>
              <InlineCitation.CarouselContent>
                <InlineCitation.CarouselItem>
                  <InlineCitation.Source
                    title='Faktion'
                    url='https://faktion.com'
                    description='Faktion is an AI product studio that helps you build AI-powered products.'
                  />
                </InlineCitation.CarouselItem>
              </InlineCitation.CarouselContent>
            </InlineCitation.Carousel>
          </InlineCitation.CardBody>
        </InlineCitation.Card>
      </InlineCitation>
    </Component>

    <Component
      name='loader'
      description='A loader component'
      code={`
        <Loader />
        <Loader size={24} />  
        `}>
      <Loader />
      <Loader size={24} />
    </Component>

    <Component
      name='message'
      description='A message component'
      code={`
        <Message from="assistant">
          <Message.Avatar src="/avatar.png" name="Assistant" />
          <Message.Content>
            I&apos;m here to assist you with any questions or tasks you might
            have.
          </Message.Content>
        </Message>
        <Message from="user">
          <Message.Avatar src="/avatar.png" name="User" />
          <Message.Content>Hello! How can I help you today?</Message.Content>
        </Message>      
      `}>
      <Message from='assistant'>
        <Message.Avatar
          src='/avatar.png'
          name='Assistant'
        />
        <Message.Content>
          I&apos;m here to assist you with any questions or tasks you might
          have.
        </Message.Content>
      </Message>
      <Message from='user'>
        <Message.Avatar
          src='/avatar.png'
          name='User'
        />
        <Message.Content>Hello! How can I help you today?</Message.Content>
      </Message>
    </Component>

    <Component
      name='prompt-input'
      description='A prompt input component'
      code={`
        <PromptInput
          onSubmit={() => {
            console.log("onSubmit");
          }}
          className="mt-4 relative"
        >
          <PromptInput.Textarea
            onChange={(event) => {
              console.log(event.target.value);
            }}
            value={""}
          />
          <PromptInput.Toolbar>
            <PromptInput.Tools>
              <PromptInput.Button>
                <MicIcon size={16} />
              </PromptInput.Button>
              <PromptInput.Button>
                <GlobeIcon size={16} />
                <span>Search</span>
              </PromptInput.Button>
              <PromptInput.ModelSelect
                onValueChange={(value) => {
                  console.log(value);
                }}
                value={"com.openai:gpt-4o"}
              >
                <PromptInput.ModelSelectTrigger>
                  <PromptInput.ModelSelectValue />
                </PromptInput.ModelSelectTrigger>
                <PromptInput.ModelSelectContent>
                  {[{ name: "gpt-4o", id: "com.openai:gpt-4o" }].map(
                    (model) => (
                      <PromptInput.ModelSelectItem
                        key={model.name}
                        value={model.name}
                      >
                        {model.name}
                      </PromptInput.ModelSelectItem>
                    )
                  )}
                </PromptInput.ModelSelectContent>
              </PromptInput.ModelSelect>
            </PromptInput.Tools>
            <PromptInput.Submit
              className="absolute right-1 bottom-1"
              disabled={false}
              status={"ready"}
            />
          </PromptInput.Toolbar>
        </PromptInput>      
      `}>
      <PromptInput
        onSubmit={() => {
          console.log('onSubmit');
        }}
        className='mt-4 relative'>
        <PromptInput.Textarea
          onChange={(event) => {
            console.log(event.target.value);
          }}
          value={''}
        />
        <PromptInput.Toolbar>
          <PromptInput.Tools>
            <PromptInput.Button>
              <MicIcon size={16} />
            </PromptInput.Button>
            <PromptInput.Button>
              <GlobeIcon size={16} />
              <span>Search</span>
            </PromptInput.Button>
            <PromptInput.ModelSelect
              onValueChange={(value) => {
                console.log(value);
              }}
              value={'com.openai:gpt-4o'}>
              <PromptInput.ModelSelectTrigger>
                <PromptInput.ModelSelectValue />
              </PromptInput.ModelSelectTrigger>
              <PromptInput.ModelSelectContent>
                {[{ name: 'gpt-4o', id: 'com.openai:gpt-4o' }].map((model) => (
                  <PromptInput.ModelSelectItem
                    key={model.name}
                    value={model.name}>
                    {model.name}
                  </PromptInput.ModelSelectItem>
                ))}
              </PromptInput.ModelSelectContent>
            </PromptInput.ModelSelect>
          </PromptInput.Tools>
          <PromptInput.Submit
            className='absolute right-1 bottom-1'
            disabled={false}
            status={'ready'}
          />
        </PromptInput.Toolbar>
      </PromptInput>
    </Component>

    <Component
      name='rating'
      description='A rating component'
      code={`
        <Rating defaultValue={3}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Rating.Button key={index} />
          ))}
        </Rating>
      `}>
      <Rating defaultValue={3}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Rating.Button key={index} />
        ))}
      </Rating>
    </Component>

    <Component
      name='reasoning'
      description='A reasoning component'
      code={`
        <Reasoning className="w-full" isStreaming={false}>
          <Reasoning.Trigger />
          <Reasoning.Content>
            I need to computer the square of 2.
          </Reasoning.Content>
        </Reasoning>      
      `}>
      <Reasoning
        className='w-full'
        isStreaming={false}>
        <Reasoning.Trigger />
        <Reasoning.Content>
          I need to computer the square of 2.
        </Reasoning.Content>
      </Reasoning>
    </Component>

    <Component
      name='response'
      description='A response component'>
      <Response>
        {` **Hi there.** I am an AI model designed to help you. I am rendered
          markdown. 
          
          # Header 1
          ## Header 2
          ### Header 3
          - List item 1 
          - List item 2 
          - List item 3`}
      </Response>
    </Component>

    <Component
      name='sources'
      description='A source component'
      code={`
        <Sources>
          <Sources.Trigger count={1} />
          <Sources.Content>
            <Sources.Source href="https://ai-sdk.dev" title="AI SDK" />
          </Sources.Content>
        </Sources>        
        `}>
      <Sources>
        <Sources.Trigger count={1} />
        <Sources.Content>
          <Sources.Source
            href='https://ai-sdk.dev'
            title='AI SDK'
          />
        </Sources.Content>
      </Sources>
    </Component>

    <Component
      name='status'
      description='A status component'
      code={`
        <div className="flex items-center gap-4">
          <Status status="online" size="sm" />
          <span>Online</span>
          <Status status="offline" size="sm" />
          <span>Offline</span>
        </div>        
        `}>
      <div className='flex items-center gap-4'>
        <Status
          status='online'
          size='sm'
        />
        <span>Online</span>
        <Status
          status='offline'
          size='sm'
        />
        <span>Offline</span>
      </div>
    </Component>

    <Component
      name='suggestion'
      description='A suggestion component'
      code={`
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
        `}>
      <Suggestions>
        <Suggestion
          suggestion='What is AI?'
          onClick={(suggestion) => {
            console.log(suggestion);
          }}
        />
        <Suggestion
          suggestion='How does machine learning work?'
          onClick={(suggestion) => {
            console.log(suggestion);
          }}
        />
        <Suggestion
          suggestion='Explain neural networks'
          onClick={(suggestion) => {
            console.log(suggestion);
          }}
        />
      </Suggestions>
    </Component>

    <Component
      name='task'
      description='A task component'
      code={`
        <Task className="w-full">
          <Task.Trigger title="Found project files" />
          <Task.Content>
            <Task.Item>
              Read <Task.ItemFile>index.md</Task.ItemFile>
            </Task.Item>
          </Task.Content>
        </Task>        
        `}>
      <Task className='w-full'>
        <Task.Trigger title='Found project files' />
        <Task.Content>
          <Task.Item>
            Read <Task.ItemFile>index.md</Task.ItemFile>
          </Task.Item>
        </Task.Content>
      </Task>
    </Component>

    <Component
      name='tool'
      description='A tool component'
      code={`
        <Tool>
          <Tool.Header type="tool-call" state={"output-available" as const} />
          <Tool.Content>
            <Tool.Input input="Input to tool call" />
            <Tool.Output errorText="Error" output="Output from tool call" />
          </Tool.Content>
        </Tool>        
        `}>
      <Tool>
        <Tool.Header
          type='tool-call'
          state={'output-available' as const}
        />
        <Tool.Content>
          <Tool.Input input='Input to tool call' />
          <Tool.Output
            errorText='Error'
            output='Output from tool call'
          />
        </Tool.Content>
      </Tool>
    </Component>

    <Component
      name='web-preview'
      description='A web preview component'
      code={`
        <WebPreview
          defaultUrl="https://faktion.com"
          style={{ height: "400px" }}
        >
          <WebPreview.Navigation>
            <WebPreview.Url src="https://faktion.com" />
          </WebPreview.Navigation>
          <WebPreview.Body src="https://faktion.com" />
        </WebPreview>        
        `}>
      <WebPreview
        defaultUrl='https://faktion.com'
        style={{ height: '400px' }}>
        <WebPreview.Navigation>
          <WebPreview.Url src='https://faktion.com' />
        </WebPreview.Navigation>
        <WebPreview.Body src='https://faktion.com' />
      </WebPreview>
    </Component>
  </>
);

export default Chat;
