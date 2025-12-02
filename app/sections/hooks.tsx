import React from 'react';

import Component from '@/components/component';

const Hooks = () => (
  <>
    <Component
      name='use-composition'
      description='A hook to extract children of a specific type from a composition'
      code={`
       const [children, childComponents] = useComposition(children, 'ChildComponent');
       return (
        <div>
          {children}
          {childComponents.map((child) => (
            <div key={child.key}>{child}</div>
          ))}
        </div>
       );
        `}>
      <span> Check `code` tab for usage</span>
    </Component>
    <Component
      name='use-file-download'
      description='A hook to download a file'
      code={`
       const { downloadFile } = useFileDownload({
        mutationKey: 'download-file',
        path: 'https://example.com/file.pdf',
       });
       downloadFile();
        `}>
      <span> Check `code` tab for usage</span>
    </Component>
    <Component
      name='use-download'
      description='A hook to download from a url'
      code={`
       const { download } = useDownload();
       download({ url: 'https://example.com/file.pdf', file: 'file.pdf' });
        `}>
      <span> Check `code` tab for usage</span>
    </Component>
  </>
);

export default Hooks;
