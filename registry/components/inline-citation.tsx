"use client";

import {
  type ComponentProps,
  createContext,
  type FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export type InlineCitationProps = ComponentProps<"span">;

const InlineCitation: FC<InlineCitationProps> = ({ className, ...props }) => (
  <span
    className={cn("group inline items-center gap-1", className)}
    {...props}
  />
);

export type InlineCitationTextProps = ComponentProps<"span">;

const InlineCitationText: FC<InlineCitationTextProps> = ({
  className,
  ...props
}) => (
  <span
    className={cn("transition-colors group-hover:bg-accent", className)}
    {...props}
  />
);

export type InlineCitationCardProps = ComponentProps<typeof HoverCard>;

const InlineCitationCard: FC<InlineCitationCardProps> = (props) => (
  <HoverCard closeDelay={0} openDelay={0} {...props} />
);

export type InlineCitationCardTriggerProps = ComponentProps<typeof Badge> & {
  sources: [string, ...Array<string>];
};

const InlineCitationCardTrigger: FC<InlineCitationCardTriggerProps> = ({
  sources,
  className,
  ...props
}) => (
  <HoverCardTrigger asChild>
    <Badge
      className={cn("ml-1 rounded-full", className)}
      variant="secondary"
      {...props}
    >
      {sources.length ? (
        <>
          {new URL(sources[0]).hostname}{" "}
          {sources.length > 1 && `+${sources.length - 1}`}
        </>
      ) : (
        "unknown"
      )}
    </Badge>
  </HoverCardTrigger>
);

export type InlineCitationCardBodyProps = ComponentProps<"div">;

const InlineCitationCardBody: FC<InlineCitationCardBodyProps> = ({
  className,
  ...props
}) => (
  <HoverCardContent className={cn("relative w-80 p-0", className)} {...props} />
);

const CarouselApiContext = createContext<CarouselApi | undefined>(undefined);

const useCarouselApi = () => {
  const context = useContext(CarouselApiContext);
  return context;
};

export type InlineCitationCarouselProps = ComponentProps<typeof Carousel>;

const InlineCitationCarousel: FC<InlineCitationCarouselProps> = ({
  className,
  children,
  ...props
}) => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <CarouselApiContext.Provider value={api}>
      <Carousel className={cn("w-full", className)} setApi={setApi} {...props}>
        {children}
      </Carousel>
    </CarouselApiContext.Provider>
  );
};

export type InlineCitationCarouselContentProps = ComponentProps<"div">;

const InlineCitationCarouselContent: FC<InlineCitationCarouselContentProps> = (
  props
) => <CarouselContent {...props} />;

export type InlineCitationCarouselItemProps = ComponentProps<"div">;

const InlineCitationCarouselItem: FC<InlineCitationCarouselItemProps> = ({
  className,
  ...props
}) => (
  <CarouselItem
    className={cn("w-full space-y-2 p-4 pl-8", className)}
    {...props}
  />
);

export type InlineCitationCarouselHeaderProps = ComponentProps<"div">;

const InlineCitationCarouselHeader: FC<InlineCitationCarouselHeaderProps> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex items-center justify-between gap-2 rounded-t-md bg-secondary p-2",
      className
    )}
    {...props}
  />
);

export type InlineCitationCarouselIndexProps = ComponentProps<"div">;

const InlineCitationCarouselIndex: FC<InlineCitationCarouselIndexProps> = ({
  children,
  className,
  ...props
}: InlineCitationCarouselIndexProps) => {
  const api = useCarouselApi();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-end px-3 py-1 text-muted-foreground text-xs",
        className
      )}
      {...props}
    >
      {children ?? `${current}/${count}`}
    </div>
  );
};

export type InlineCitationCarouselPrevProps = ComponentProps<"button">;

const InlineCitationCarouselPrev: FC<InlineCitationCarouselPrevProps> = ({
  className,
  ...props
}) => {
  const api = useCarouselApi();

  const handleClick = useCallback(() => {
    if (api) {
      api.scrollPrev();
    }
  }, [api]);

  return (
    <button
      aria-label="Previous"
      className={cn("shrink-0", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <ArrowLeftIcon className="size-4 text-muted-foreground" />
    </button>
  );
};

export type InlineCitationCarouselNextProps = ComponentProps<"button">;

const InlineCitationCarouselNext: FC<InlineCitationCarouselNextProps> = ({
  className,
  ...props
}) => {
  const api = useCarouselApi();

  const handleClick = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  return (
    <button
      aria-label="Next"
      className={cn("shrink-0", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <ArrowRightIcon className="size-4 text-muted-foreground" />
    </button>
  );
};

export type InlineCitationSourceProps = ComponentProps<"div"> & {
  title?: string;
  url?: string;
  description?: string;
};

const InlineCitationSource: FC<InlineCitationSourceProps> = ({
  title,
  url,
  description,
  className,
  children,
  ...props
}) => (
  <div className={cn("space-y-1", className)} {...props}>
    {title && (
      <h4 className="truncate font-medium text-sm leading-tight">{title}</h4>
    )}
    {url && (
      <p className="truncate break-all text-muted-foreground text-xs">{url}</p>
    )}
    {description && (
      <p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    )}
    {children}
  </div>
);

export type InlineCitationQuoteProps = ComponentProps<"blockquote">;

const InlineCitationQuote: FC<InlineCitationQuoteProps> = ({
  children,
  className,
  ...props
}) => (
  <blockquote
    className={cn(
      "border-muted border-l-2 pl-3 text-muted-foreground text-sm italic",
      className
    )}
    {...props}
  >
    {children}
  </blockquote>
);

interface InlineCitationComposition {
  Text: typeof InlineCitationText;
  Card: typeof InlineCitationCard;
  CardTrigger: typeof InlineCitationCardTrigger;
  CardBody: typeof InlineCitationCardBody;
  Carousel: typeof InlineCitationCarousel;
  CarouselContent: typeof InlineCitationCarouselContent;
  CarouselItem: typeof InlineCitationCarouselItem;
  CarouselHeader: typeof InlineCitationCarouselHeader;
  CarouselIndex: typeof InlineCitationCarouselIndex;
  CarouselPrev: typeof InlineCitationCarouselPrev;
  CarouselNext: typeof InlineCitationCarouselNext;
  Source: typeof InlineCitationSource;
  Quote: typeof InlineCitationQuote;
}

const RootWithComposition: InlineCitationComposition & typeof InlineCitation =
  Object.assign(InlineCitation, {
    Text: InlineCitationText,
    Card: InlineCitationCard,
    CardTrigger: InlineCitationCardTrigger,
    CardBody: InlineCitationCardBody,
    Carousel: InlineCitationCarousel,
    CarouselContent: InlineCitationCarouselContent,
    CarouselItem: InlineCitationCarouselItem,
    CarouselHeader: InlineCitationCarouselHeader,
    CarouselIndex: InlineCitationCarouselIndex,
    CarouselPrev: InlineCitationCarouselPrev,
    CarouselNext: InlineCitationCarouselNext,
    Source: InlineCitationSource,
    Quote: InlineCitationQuote,
  });

export { RootWithComposition as InlineCitation };
