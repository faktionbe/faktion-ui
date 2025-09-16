import React from 'react';
import { Plus, Rocket } from 'lucide-react';

import Component from '@/components/component';
import Fab from '@/registry/components/fab';
import { Notification } from '@/registry/components/notification';

const Default = () => (
  <>
    <Component
      name='fab'
      description='A floating action button component'
      code={`
        <Fab
          onClick={() => {
            console.log("onClick");
          }}
        >
          <Plus />
        </Fab>
      `}>
      <Fab
        onClick={() => {
          console.log('onClick');
        }}>
        <Plus />
      </Fab>
    </Component>

    <Component
      name='notification'
      description='A notification component'
      code={`
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
      `}>
      <Notification>
        <Fab
          onClick={() => {
            console.log('clicked');
          }}>
          <Rocket />
        </Fab>
        <Notification.Content
          size='md'
          side='top-right'>
          4
        </Notification.Content>
      </Notification>
    </Component>
  </>
);

export default Default;
