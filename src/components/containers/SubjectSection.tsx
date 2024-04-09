import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type SectionProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  addDialog?: JSX.Element 
};

export default function SubjectSection({
  children,
  title,
  description,
  addDialog
}: SectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between gap-4">
          <CardTitle>{title}</CardTitle>
          {addDialog && addDialog}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
