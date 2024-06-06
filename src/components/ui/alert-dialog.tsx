'use client';

import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { CircleAlert, CircleCheckBig, CircleHelp, CircleX } from 'lucide-react';
import { getRandomUUID } from '@/utils/crypto';

export type AlertDialogType = 'success' | 'error' | 'warning' | 'confirm';

type AlertDialogData = {
  type: AlertDialogType;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  id?: string;
  subTitle?: string | React.ReactNode;
  okText?: string;
  cancelText?: string;
};

type AlertDialogContext = {
  alert: (data: AlertDialogData) => void;
};

const AlertDialogContext = React.createContext<AlertDialogContext>(
  {} as AlertDialogContext
);

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: 'outline' }),
      'mt-2 sm:mt-0',
      className
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

const AlertDialogIcon = ({ type }: { type: AlertDialogType }) => {
  switch (type) {
    case 'success':
      return <CircleCheckBig className="text-green-600" size={40} />;
    case 'error':
      return <CircleX className="text-red-600" size={40} />;
    case 'warning':
      return <CircleAlert className="text-primary" size={40} />;
    case 'confirm':
      return <CircleHelp className="text-primary" size={40} />;
    default:
      return null;
  }
};

const useAlertDialog = () => React.useContext(AlertDialogContext);

const AlertDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [alerts, setAlerts] = React.useState<AlertDialogData[]>([]);

  const addAlert = (data: AlertDialogData) => {
    setAlerts((prev) => [...prev, { ...data, id: getRandomUUID() }]);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertDialogContext.Provider
      value={{
        alert: addAlert,
      }}
    >
      <AlertDialog open>
        {children}
        {alerts.map((alert) => (
          <AlertDialogContent
            key={alert.id}
            className="overflow-hidden max-h-[80%] flex flex-col items-center w-fit"
          >
            <AlertDialogHeader className="flex flex-col items-center">
              <AlertDialogIcon type={alert.type} />
              <AlertDialogTitle className="text-center">
                {alert.title}
              </AlertDialogTitle>
              {alert.subTitle && (
                <span className="text-sm text-muted-foreground text-center">
                  {alert.subTitle}
                </span>
              )}
            </AlertDialogHeader>
            <AlertDialogDescription className="overflow-y-auto w-[90%]">
              {alert.description}
            </AlertDialogDescription>
            <AlertDialogFooter
              className={cn(
                'w-full',
                alert.type !== 'warning' ? 'sm:justify-center' : ''
              )}
            >
              {alert.type === 'warning' ||
                (alert.type === 'confirm' && (
                  <AlertDialogCancel
                    onClick={() => {
                      alert.onCancel?.();
                      if (alert.id) removeAlert(alert.id);
                    }}
                  >
                    {alert.cancelText || 'Cancelar'}
                  </AlertDialogCancel>
                ))}
              <AlertDialogAction
                className={cn(
                  alert.type === 'warning' || alert.type === 'confirm'
                    ? 'bg-primary'
                    : '',
                  alert.type === 'success' ? 'bg-green-600' : '',
                  alert.type === 'error' ? 'bg-red-600' : ''
                )}
                onClick={() => {
                  alert.onOk?.();
                  if (alert.id) removeAlert(alert.id);
                }}
              >
                {alert.okText || 'Ok'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        ))}
      </AlertDialog>
    </AlertDialogContext.Provider>
  );
};

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogProvider,
  useAlertDialog,
};
