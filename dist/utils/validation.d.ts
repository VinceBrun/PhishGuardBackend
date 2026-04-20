import { z } from 'zod';
export declare const emailSchema: z.ZodString;
export declare const passwordSchema: z.ZodString;
export declare const uuidSchema: z.ZodString;
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
}, {
    limit?: number | undefined;
    page?: number | undefined;
}>;
export declare const dateSchema: z.ZodUnion<[z.ZodString, z.ZodDate]>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    rememberMe: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    rememberMe: boolean;
}, {
    email: string;
    password: string;
    rememberMe?: boolean | undefined;
}>;
export declare const registerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    organizationName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
    organizationName?: string | undefined;
}, {
    email: string;
    password: string;
    name: string;
    organizationName?: string | undefined;
}>;
export declare const resetPasswordSchema: z.ZodObject<{
    token: z.ZodString;
    newPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    newPassword: string;
    token: string;
}, {
    newPassword: string;
    token: string;
}>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    department: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<["ADMIN", "USER"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    role: "ADMIN" | "USER";
    name: string;
    department?: string | undefined;
}, {
    email: string;
    name: string;
    role?: "ADMIN" | "USER" | undefined;
    department?: string | undefined;
}>;
export declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    department: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    department?: string | undefined;
    avatar?: string | undefined;
}, {
    name?: string | undefined;
    department?: string | undefined;
    avatar?: string | undefined;
}>;
export declare const bulkUploadUsersSchema: z.ZodObject<{
    users: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        department: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        name: string;
        department?: string | undefined;
    }, {
        email: string;
        name: string;
        department?: string | undefined;
    }>, "many">;
    sendWelcomeEmail: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    users: {
        email: string;
        name: string;
        department?: string | undefined;
    }[];
    sendWelcomeEmail: boolean;
}, {
    users: {
        email: string;
        name: string;
        department?: string | undefined;
    }[];
    sendWelcomeEmail?: boolean | undefined;
}>;
export declare const createCampaignSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    templateId: z.ZodString;
    recipientIds: z.ZodArray<z.ZodString, "many">;
    scheduledAt: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    templateId: string;
    recipientIds: string[];
    description?: string | undefined;
    scheduledAt?: string | Date | undefined;
}, {
    name: string;
    templateId: string;
    recipientIds: string[];
    description?: string | undefined;
    scheduledAt?: string | Date | undefined;
}>;
export declare const updateCampaignSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "SCHEDULED", "ACTIVE", "COMPLETED"]>>;
}, "strip", z.ZodTypeAny, {
    status?: "DRAFT" | "SCHEDULED" | "ACTIVE" | "COMPLETED" | undefined;
    name?: string | undefined;
    description?: string | undefined;
}, {
    status?: "DRAFT" | "SCHEDULED" | "ACTIVE" | "COMPLETED" | undefined;
    name?: string | undefined;
    description?: string | undefined;
}>;
export declare const campaignFiltersSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "SCHEDULED", "ACTIVE", "COMPLETED", "all"]>>;
    dateFrom: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
    dateTo: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "DRAFT" | "SCHEDULED" | "ACTIVE" | "COMPLETED" | "all" | undefined;
    dateFrom?: string | Date | undefined;
    dateTo?: string | Date | undefined;
    search?: string | undefined;
}, {
    status?: "DRAFT" | "SCHEDULED" | "ACTIVE" | "COMPLETED" | "all" | undefined;
    dateFrom?: string | Date | undefined;
    dateTo?: string | Date | undefined;
    search?: string | undefined;
}>;
export declare const createTemplateSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    difficulty: z.ZodEnum<["EASY", "MEDIUM", "HARD"]>;
    category: z.ZodEnum<["PASSWORD", "PACKAGE", "EXECUTIVE", "PAYROLL", "SECURITY", "VENDOR", "HR", "SOCIAL", "BANK", "IT"]>;
    subject: z.ZodString;
    fromName: z.ZodString;
    fromEmail: z.ZodString;
    body: z.ZodString;
    ctaText: z.ZodOptional<z.ZodString>;
    ctaUrl: z.ZodOptional<z.ZodString>;
    redFlags: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    category: "HR" | "PASSWORD" | "PACKAGE" | "EXECUTIVE" | "PAYROLL" | "SECURITY" | "VENDOR" | "SOCIAL" | "BANK" | "IT";
    subject: string;
    fromName: string;
    fromEmail: string;
    body: string;
    redFlags: string[];
    ctaText?: string | undefined;
    ctaUrl?: string | undefined;
}, {
    name: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    category: "HR" | "PASSWORD" | "PACKAGE" | "EXECUTIVE" | "PAYROLL" | "SECURITY" | "VENDOR" | "SOCIAL" | "BANK" | "IT";
    subject: string;
    fromName: string;
    fromEmail: string;
    body: string;
    redFlags: string[];
    ctaText?: string | undefined;
    ctaUrl?: string | undefined;
}>;
export declare const updateTemplateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    difficulty: z.ZodOptional<z.ZodEnum<["EASY", "MEDIUM", "HARD"]>>;
    category: z.ZodOptional<z.ZodEnum<["PASSWORD", "PACKAGE", "EXECUTIVE", "PAYROLL", "SECURITY", "VENDOR", "HR", "SOCIAL", "BANK", "IT"]>>;
    subject: z.ZodOptional<z.ZodString>;
    fromName: z.ZodOptional<z.ZodString>;
    fromEmail: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    ctaText: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    ctaUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    redFlags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    difficulty?: "EASY" | "MEDIUM" | "HARD" | undefined;
    category?: "HR" | "PASSWORD" | "PACKAGE" | "EXECUTIVE" | "PAYROLL" | "SECURITY" | "VENDOR" | "SOCIAL" | "BANK" | "IT" | undefined;
    subject?: string | undefined;
    fromName?: string | undefined;
    fromEmail?: string | undefined;
    body?: string | undefined;
    ctaText?: string | undefined;
    ctaUrl?: string | undefined;
    redFlags?: string[] | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    difficulty?: "EASY" | "MEDIUM" | "HARD" | undefined;
    category?: "HR" | "PASSWORD" | "PACKAGE" | "EXECUTIVE" | "PAYROLL" | "SECURITY" | "VENDOR" | "SOCIAL" | "BANK" | "IT" | undefined;
    subject?: string | undefined;
    fromName?: string | undefined;
    fromEmail?: string | undefined;
    body?: string | undefined;
    ctaText?: string | undefined;
    ctaUrl?: string | undefined;
    redFlags?: string[] | undefined;
}>;
export declare const createQuizSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    difficulty: z.ZodEnum<["EASY", "MEDIUM", "HARD"]>;
    category: z.ZodEnum<["PASSWORD", "PACKAGE", "EXECUTIVE", "PAYROLL", "SECURITY", "VENDOR", "HR", "SOCIAL", "BANK", "IT"]>;
    timeLimit: z.ZodOptional<z.ZodNumber>;
    passingScore: z.ZodDefault<z.ZodNumber>;
    questions: z.ZodArray<z.ZodObject<{
        question: z.ZodString;
        options: z.ZodArray<z.ZodString, "many">;
        correctAnswer: z.ZodNumber;
        explanation: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        options: string[];
        question: string;
        correctAnswer: number;
        order: number;
        explanation?: string | undefined;
    }, {
        options: string[];
        question: string;
        correctAnswer: number;
        order: number;
        explanation?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    difficulty: "EASY" | "MEDIUM" | "HARD";
    category: "HR" | "PASSWORD" | "PACKAGE" | "EXECUTIVE" | "PAYROLL" | "SECURITY" | "VENDOR" | "SOCIAL" | "BANK" | "IT";
    title: string;
    passingScore: number;
    questions: {
        options: string[];
        question: string;
        correctAnswer: number;
        order: number;
        explanation?: string | undefined;
    }[];
    description?: string | undefined;
    timeLimit?: number | undefined;
}, {
    difficulty: "EASY" | "MEDIUM" | "HARD";
    category: "HR" | "PASSWORD" | "PACKAGE" | "EXECUTIVE" | "PAYROLL" | "SECURITY" | "VENDOR" | "SOCIAL" | "BANK" | "IT";
    title: string;
    questions: {
        options: string[];
        question: string;
        correctAnswer: number;
        order: number;
        explanation?: string | undefined;
    }[];
    description?: string | undefined;
    timeLimit?: number | undefined;
    passingScore?: number | undefined;
}>;
export declare const submitQuizSchema: z.ZodObject<{
    answers: z.ZodRecord<z.ZodString, z.ZodNumber>;
    timeSpent: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    answers: Record<string, number>;
    timeSpent: number;
}, {
    answers: Record<string, number>;
    timeSpent: number;
}>;
export declare const updateOrganizationSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    logo: z.ZodOptional<z.ZodString>;
    primaryColor: z.ZodOptional<z.ZodString>;
    secondaryColor: z.ZodOptional<z.ZodString>;
    smtpHost: z.ZodOptional<z.ZodString>;
    smtpPort: z.ZodOptional<z.ZodNumber>;
    smtpUser: z.ZodOptional<z.ZodString>;
    smtpPassword: z.ZodOptional<z.ZodString>;
    fromEmail: z.ZodOptional<z.ZodString>;
    fromName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    fromName?: string | undefined;
    fromEmail?: string | undefined;
    logo?: string | undefined;
    primaryColor?: string | undefined;
    secondaryColor?: string | undefined;
    smtpHost?: string | undefined;
    smtpPort?: number | undefined;
    smtpUser?: string | undefined;
    smtpPassword?: string | undefined;
}, {
    name?: string | undefined;
    fromName?: string | undefined;
    fromEmail?: string | undefined;
    logo?: string | undefined;
    primaryColor?: string | undefined;
    secondaryColor?: string | undefined;
    smtpHost?: string | undefined;
    smtpPort?: number | undefined;
    smtpUser?: string | undefined;
    smtpPassword?: string | undefined;
}>;
export declare const validate: <T>(schema: z.ZodSchema<T>, data: unknown) => T;
export declare const validateSafe: <T>(schema: z.ZodSchema<T>, data: unknown) => {
    success: true;
    data: T;
} | {
    success: false;
    errors: z.ZodError;
};
//# sourceMappingURL=validation.d.ts.map