import { Id } from "@/convex/_generated/dataModel";

export type Label = {
    _id: Id<"labels">;
    _creationTime: number;
    name: string;
    color: string;
};

export type LabelsArray = (Label | null)[];