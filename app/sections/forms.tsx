import Component from '@/components/component';
import CheckboxGroup from '@/registry/components/checkbox-group';
import { ColorPicker } from '@/registry/components/color-picker';
import Combobox from '@/registry/components/combobox';
import CountryCombobox from '@/registry/components/country-combobox';
import { Dropzone } from '@/registry/components/dropzone';
import LanguageCombobox from '@/registry/components/language-combobox';
import MultiCombobox from '@/registry/components/multi-combobox';
import { RadioGroup } from '@/registry/components/radio-group';
import { Toggle } from '@/registry/components/toggle';

const Forms = () => (
  <>
    <Component
      name='combobox'
      description='A combobox component'
      code={`
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
          `}>
      <Combobox
        value='option1'
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
        onChange={() => {
          console.log('onChange');
        }}
      />
      <Combobox
        value='option1'
        grouped
        options={[
          { group: 'Group 1', label: 'Option 1', value: 'option1' },
          { group: 'Group 1', label: 'Option 2', value: 'option2' },
          { group: 'Group 2', label: 'Option 3', value: 'option3' },
        ]}
        onChange={() => {
          console.log('onChange');
        }}
      />
    </Component>

    <Component
      name='multi-combobox'
      description='A multi combobox component'
      code={`
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
      `}>
      <MultiCombobox
        values={['option1', 'option2']}
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
        onChange={() => {
          console.log('onChange');
        }}
      />

      <MultiCombobox
        grouped
        values={['option1', 'option2']}
        options={[
          { group: 'Group 1', label: 'Option 1', value: 'option1' },
          { group: 'Group 1', label: 'Option 2', value: 'option2' },
          { group: 'Group 2', label: 'Option 3', value: 'option3' },
        ]}
        onChange={() => {
          console.log('onChange');
        }}
      />
    </Component>

    <Component
      name='toggle'
      description='A toggle component'
      code={`
        <Toggle value="option1" setValue={(value) => {
          console.log(value);
        }}>
          <Toggle.Tab value="option1">Option 1</Toggle.Tab>
          <Toggle.Tab value="option2">Option 2</Toggle.Tab>
        </Toggle>
        `}>
      <Toggle
        value='option1'
        setValue={(value) => {
          console.log(value);
        }}>
        <Toggle.Tab value='option1'>Option 1</Toggle.Tab>
        <Toggle.Tab value='option2'>Option 2</Toggle.Tab>
      </Toggle>
    </Component>

    <Component
      name='color-picker'
      description='A color picker component'
      code={`
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
      `}>
      <ColorPicker className='max-w-sm rounded-md border bg-background p-4 shadow-sm'>
        <ColorPicker.Selection />
        <div className='flex items-center gap-4'>
          <ColorPicker.EyeDropper />
          <div className='grid w-full gap-1'>
            <ColorPicker.Hue />
            <ColorPicker.Alpha />
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <ColorPicker.Output />
          <ColorPicker.Format />
        </div>
      </ColorPicker>
    </Component>

    <Component
      name='dropzone'
      description='A dropzone component'
      code={`
        <Dropzone>
          <Dropzone.Content />
          <Dropzone.EmptyState>
            <p>Drag and drop files here</p>
          </Dropzone.EmptyState>
        </Dropzone>
      `}>
      <Dropzone>
        <Dropzone.Content />
        <Dropzone.EmptyState>
          <p>Drag and drop files here</p>
        </Dropzone.EmptyState>
      </Dropzone>
    </Component>

    <Component
      name='radio-group'
      description='A radio group component'
      code={`
         <RadioGroup
          options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
          ]}
        />
        `}>
      <span>Vertical</span>
      <RadioGroup
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
      />
      <span>Horizontal</span>
      <RadioGroup
        orientation='horizontal'
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
      />
    </Component>

    <Component
      name='checkbox-group'
      description='A checkbox group component'
      code={`
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
        `}>
      <span>Vertical</span>
      <CheckboxGroup
        checked={['option1']}
        onChange={() => {
          console.log('onChange');
        }}
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
      />
      <span>Horizontal</span>
      <CheckboxGroup
        orientation='horizontal'
        checked={['option1']}
        onChange={() => {
          console.log('onChange');
        }}
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
      />
    </Component>

    <Component
      name='country-combobox'
      description='A country combobox component'
      code={`
        <CountryCombobox
          value="us"
          onChange={(value) => {
            console.log(value);
          }}
        />
        `}>
      <CountryCombobox
        value='us'
        onChange={(value) => {
          console.log(value);
        }}
      />
    </Component>

    <Component
      name='language-combobox'
      description='A language combobox component'
      code={`
        <LanguageCombobox
          value="en"
          onChange={(value) => {
            console.log(value);
          }}
        />
        `}>
      <LanguageCombobox
        value='en'
        onChange={(value) => {
          console.log(value);
        }}
      />
    </Component>
  </>
);

export default Forms;
