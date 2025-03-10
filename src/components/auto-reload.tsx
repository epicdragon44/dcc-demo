"use client";

import { cn } from "@/lib/utils";
import runCron from "@/services/cron";
import { RadioIcon, RefreshCcwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";

export default function AutoReload(props: {
    interval?: number;
    clearCache: () => Promise<void>;
}) {
    const [live, setLive] = useState(false);
    const [transactionPending, transactionStart] = useTransition();
    const router = useRouter();

    function run() {
        transactionStart(async function () {
            await runCron();
            await props.clearCache();
            router.refresh();
        });
    }

    useEffect(() => {
        if (live) {
            const interval = setInterval(
                run,
                props.interval ?? 1000 * 10 // every 10 seconds
            );
            return () => clearInterval(interval);
        }
    }, [router, live]);

    return (
        <div className='flex flex-row items-center justify-start gap-2'>
            <Toggle
                variant={"outline"}
                pressed={live}
                onPressedChange={setLive}
                className='flex flex-row items-center justify-center gap-1 relative'
            >
                <RadioIcon className='w-4 h-4' />
                <span className='text-sm font-medium'>Live</span>
                {live && (
                    <div className='w-2 h-2 rounded-full bg-gray-800 animate-ping -top-1 -right-1 absolute' />
                )}
            </Toggle>
            <Button
                variant={"outline"}
                onClick={run}
                disabled={transactionPending}
                className='flex flex-row items-center justify-center gap-1'
            >
                <RefreshCcwIcon
                    className={cn(
                        "w-4 h-4",
                        transactionPending && "animate-spin"
                    )}
                />
                {transactionPending ? "Refreshing" : "Refresh"}
            </Button>
        </div>
    );
}
