"use client";

import { LoaderCircleIcon, SendIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function FormSubmit() {
    const { pending } = useFormStatus();
    return (
        <Button type='submit' disabled={pending}>
            {!pending ? (
                <SendIcon className='w-4 h-4' />
            ) : (
                <LoaderCircleIcon className='w-4 h-4 animate-spin' />
            )}
            {pending ? "Submitting" : "Submit"}
        </Button>
    );
}
