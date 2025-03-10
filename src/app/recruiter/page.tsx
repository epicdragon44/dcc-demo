import AutoReload from "@/components/auto-reload";
import ClearAll from "@/components/clear-all";
import RenderedEval from "@/components/rendered-eval";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Db } from "@/services/redis";
import { revalidatePath } from "next/cache";

export default async function RecruiterPage() {
    async function deleteAll() {
        "use server";
        await Db.deleteAllEntries();
        revalidatePath("/recruiter");
    }

    async function clearCache() {
        "use server";
        revalidatePath("/recruiter");
    }

    const entries = await Db.getAllEntries();

    return (
        <Card className='m-12'>
            <CardHeader className='flex flex-row items-center justify-between gap-4'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href='/recruiter'
                                className='text-secondary-foreground font-medium'
                            >
                                Recruiter View
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <ClearAll deleteAll={deleteAll} />
                    <AutoReload clearCache={clearCache} />
                </div>
            </CardHeader>
            <CardContent>
                <Table className='border border-gray-200'>
                    <TableHeader className='bg-gray-50'>
                        <TableRow>
                            <TableHead>Username</TableHead>
                            <TableHead>Resume</TableHead>
                            <TableHead>Evaluation</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entries.map((entry) => (
                            <TableRow key={entry.username}>
                                <TableCell>{entry.username}</TableCell>
                                <TableCell>
                                    <HoverCard>
                                        <HoverCardTrigger className='underline cursor-pointer hover:text-gray-600 transition-all duration-300'>
                                            Resume
                                        </HoverCardTrigger>
                                        <HoverCardContent className='w-96 h-96 overflow-y-auto text-wrap'>
                                            {entry.resume}
                                        </HoverCardContent>
                                    </HoverCard>
                                </TableCell>
                                <TableCell>
                                    <RenderedEval eval={entry.eval} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
