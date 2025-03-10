"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CircleXIcon, LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";

export default function ClearAll(props: { deleteAll: () => Promise<void> }) {
    const [pending, startTransition] = useTransition();
    const router = useRouter();

    function clearAll() {
        startTransition(async function () {
            await props.deleteAll();
            router.refresh();
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button disabled={pending}>
                    {!pending ? (
                        <CircleXIcon className='w-4 h-4' />
                    ) : (
                        <LoaderCircleIcon className='w-4 h-4 animate-spin' />
                    )}
                    {pending ? "Deleting" : "Delete All"}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete all entries from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={clearAll}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
