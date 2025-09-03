import React, { createContext, type FC, useCallback, useContext } from 'react';

import { useComposition } from '@/hooks/use-composition';
import { cn } from '@/lib/utils';

interface ToggleContextType {
  value: string;
  setValue: (value: string) => void;
}

const ToggleContext = createContext<ToggleContextType>({
  value: '',
  setValue: () => undefined,
});

export interface ToggleTabProps {
  children?: React.ReactNode;
  value: string;
}
const ToggleTab: FC<ToggleTabProps> = ({ children, value }) => {
  const { value: currentValue, setValue } = useContext(ToggleContext);
  const handleClick = useCallback(() => {
    setValue(value);
  }, [value, setValue]);
  return (
    <button
      data-tab={value}
      onClick={handleClick}
      className={cn(
        'px-3 py-1 text-sm rounded text-muted-foreground hover:text-foreground',
        value === currentValue && 'bg-background text-foreground'
      )}>
      {children}
    </button>
  );
};
ToggleTab.displayName = 'ToggleTab';

export interface ToggleProps {
  value: string;
  setValue: (value: string) => void;
  children: React.ReactNode;
}
const Toggle: FC<ToggleProps> = ({ value, setValue, children }) => {
  const [_, toggleTabs] = useComposition(children, ToggleTab.displayName);
  return (
    <ToggleContext.Provider value={{ value, setValue }}>
      <div className={`flex bg-muted rounded-md p-1`}>{toggleTabs}</div>
    </ToggleContext.Provider>
  );
};

interface ToggleComposition {
  Tab: FC<ToggleTabProps>;
}

const RootWithComposition: ToggleComposition & typeof Toggle = Object.assign(
  Toggle,
  {
    Tab: ToggleTab,
  }
);

export { RootWithComposition as Toggle };
