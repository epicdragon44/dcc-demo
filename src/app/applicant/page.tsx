import FormSubmit from "@/components/form-submit";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Db } from "@/services/redis";
import Form from "next/form";

export default async function ApplicantPage() {
    async function handleSubmit(formData: FormData) {
        "use server";

        const username = formData.get("username");
        const resume = formData.get("resume");
        await Db.setUserResume(username as string, resume as string);
    }

    return (
        <Card className='m-12 w-96'>
            <CardHeader className='flex flex-row items-center justify-between gap-4'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href='/applicant'
                                className='text-secondary-foreground font-medium'
                            >
                                Applicant View
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </CardHeader>
            <CardContent>
                <Form action={handleSubmit} className='flex flex-col gap-4'>
                    <Input name='username' type='text' placeholder='Username' />
                    <Textarea
                        name='resume'
                        className='h-48'
                        placeholder='Paste your resume here...'
                    />
                    <FormSubmit />
                </Form>
            </CardContent>
        </Card>
    );
}
