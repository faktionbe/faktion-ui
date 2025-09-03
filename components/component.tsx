'use client';
import React, { type FC } from 'react';

import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockItem,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
} from '@/components/blocks/code-block/index';
import { Install } from '@/components/install';
import { OpenInV0Button } from '@/components/open-in-v0-button';
import { Toggle } from '@/components/ui/toggle';

interface ComponentProps {
  name: string;
  description: string;
  children: React.ReactNode;
  code?: string;
}
const Component: FC<ComponentProps> = ({
  name,
  description,
  children,
  code,
}) => {
  const [activeTab, setActiveTab] = React.useState<string>('preview');

  const codeData = code
    ? [
        {
          language: 'tsx',
          filename: `${name}.tsx`,
          code,
        },
      ]
    : [];

  return (
    <div className='flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-1'>
          <h1 className=''>
            <a href={`#${name}`}>{name}</a>
          </h1>
          <h2 className='text-sm text-muted-foreground'>{description}</h2>
        </div>

        <div className='flex items-center gap-2'>
          <OpenInV0Button
            name={name}
            className='w-fit'
          />
        </div>
      </div>

      <div className='flex-1 min-h-[400px] relative'>
        {activeTab === 'preview' ? (
          <div className='flex flex-col gap-4 items-center justify-center min-h-[400px] relative'>
            {children}
          </div>
        ) : (
          <CodeBlock
            data={codeData}
            defaultValue='tsx'>
            <CodeBlockHeader>
              <CodeBlockSelect>
                <CodeBlockSelectTrigger>
                  <CodeBlockSelectValue placeholder='Select file' />
                </CodeBlockSelectTrigger>
                <CodeBlockSelectContent>
                  {(item) => (
                    <CodeBlockSelectItem
                      key={item.filename}
                      value={item.language}>
                      {item.filename}
                    </CodeBlockSelectItem>
                  )}
                </CodeBlockSelectContent>
              </CodeBlockSelect>
              <CodeBlockCopyButton />
            </CodeBlockHeader>
            <CodeBlockBody>
              {(item) => (
                <CodeBlockItem
                  key={item.filename}
                  value={item.language}>
                  <CodeBlockContent language='tsx'>
                    {item.code}
                  </CodeBlockContent>
                </CodeBlockItem>
              )}
            </CodeBlockBody>
          </CodeBlock>
        )}
      </div>

      <div className='flex flex-row gap-2 items-end border-t pt-2'>
        {code && (
          <Toggle
            value={activeTab}
            setValue={setActiveTab}>
            <Toggle.Tab value='preview'>Preview</Toggle.Tab>
            <Toggle.Tab value='code'>Code</Toggle.Tab>
          </Toggle>
        )}
        <Install component={`@faktion/${name}.json`} />
      </div>
    </div>
  );
};

export default Component;
