import { Badge } from "@/components/ui/badge";
import { CircleAlertIcon, Loader2Icon } from "lucide-react";

export default function RenderedEval(props: { eval: string }) {
    if (props.eval === "ACCEPT") {
        return (
            <Badge variant='default' className='bg-emerald-700 text-white'>
                {props.eval}
            </Badge>
        );
    } else if (props.eval === "REJECT") {
        return <Badge variant='destructive'>{props.eval}</Badge>;
    } else if (props.eval === "LOADING") {
        return (
            <span className='flex flex-row items-center gap-2 justify-start text-gray-500'>
                <Loader2Icon className='w-4 h-4 animate-spin' />
                Grading
            </span>
        );
    } else {
        return (
            <span className='flex flex-row items-center gap-2 justify-start'>
                <CircleAlertIcon className='w-4 h-4 text-red-600 animate-pulse' />
                {props.eval}
            </span>
        );
    }
}
