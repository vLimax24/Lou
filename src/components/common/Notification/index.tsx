import { toast } from "sonner"

import { Button } from "@/components/ui/button"

interface NonActionProps {
    title: string;
    description?: string;
    buttonName: string;
    className?: string;
}

interface ActionProps {
    title: string;
    description: string;
    label: string;
    buttonName: string;
    className?: string;
    onClick: () => void;
}

export const SuccessToast:React.FC<NonActionProps> = ({ title, description, buttonName, className }) => {
  return (
    <Button
      variant="secondary"
      onClick={() =>
        toast.success(title, {
          description: description,
        })
      }
      className={`${className}`}
    >
      {buttonName}
    </Button>
  )
}

export const InfoToast:React.FC<NonActionProps> = ({ title, description, buttonName, className }) => {
    return (
      <Button
        variant="secondary"
        onClick={() =>
          toast.info(title, {
            description: description,
          })
        }
        className={`${className}`}
      >
        {buttonName}
      </Button>
    )
}

export const ErrorToast:React.FC<NonActionProps> = ({ title, description, buttonName, className }) => {
    return (
      <Button
        variant="secondary"
        onClick={() =>
          toast.error(title, {
            description: description,
          })
        }
        className={`${className}`}
      >
        {buttonName}
      </Button>
    )
}

export const WarningToast:React.FC<NonActionProps> = ({ title, description, buttonName, className }) => {
    return (
      <Button
        variant="secondary"
        onClick={() =>
          toast.warning(title, {
            description: description,
          })
        }
        className={`${className}`}
      >
        {buttonName}
      </Button>
    )
}

export const ActionToast:React.FC<ActionProps> = ({ title, description, label, buttonName, className, onClick }) => {
    return (
      <Button
        variant="secondary"
        onClick={() =>
          toast(title, {
            description: description,
            action: {
              label: label,
              onClick: onClick,
            },
          })
        }
        className={`${className} bg-green-500 text-white`}
      >
        {buttonName}
      </Button>
    )
}


