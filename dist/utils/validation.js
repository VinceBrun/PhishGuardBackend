"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSafe = exports.validate = exports.updateOrganizationSchema = exports.submitQuizSchema = exports.createQuizSchema = exports.updateTemplateSchema = exports.createTemplateSchema = exports.campaignFiltersSchema = exports.updateCampaignSchema = exports.createCampaignSchema = exports.bulkUploadUsersSchema = exports.updateUserSchema = exports.createUserSchema = exports.forgotPasswordSchema = exports.resetPasswordSchema = exports.registerSchema = exports.loginSchema = exports.dateSchema = exports.paginationSchema = exports.uuidSchema = exports.passwordSchema = exports.emailSchema = void 0;
const zod_1 = require("zod");
exports.emailSchema = zod_1.z.string().email('Invalid email address').trim().toLowerCase();
exports.passwordSchema = zod_1.z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');
exports.uuidSchema = zod_1.z.string().uuid('Invalid UUID format');
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(10),
});
exports.dateSchema = zod_1.z.string().datetime().or(zod_1.z.date());
exports.loginSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: zod_1.z.string().min(1, 'Password is required'),
    rememberMe: zod_1.z.boolean().optional().default(false),
});
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: exports.emailSchema,
    password: exports.passwordSchema,
    organizationName: zod_1.z.string().min(2).max(200).optional(),
});
exports.resetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, 'Reset token is required'),
    newPassword: exports.passwordSchema,
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: exports.emailSchema,
});
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    email: exports.emailSchema,
    department: zod_1.z.string().min(1).max(100).optional(),
    role: zod_1.z.enum(['ADMIN', 'USER']).default('USER'),
});
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100).optional(),
    department: zod_1.z.string().min(1).max(100).optional(),
    avatar: zod_1.z.string().url().optional(),
});
exports.bulkUploadUsersSchema = zod_1.z.object({
    users: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string().min(2).max(100),
        email: exports.emailSchema,
        department: zod_1.z.string().optional(),
    })).min(1, 'At least one user is required'),
    sendWelcomeEmail: zod_1.z.boolean().default(true),
});
exports.createCampaignSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, 'Campaign name must be at least 3 characters').max(200),
    description: zod_1.z.string().max(1000).optional(),
    templateId: exports.uuidSchema,
    recipientIds: zod_1.z.array(exports.uuidSchema).min(1, 'At least one recipient is required'),
    scheduledAt: exports.dateSchema.optional(),
});
exports.updateCampaignSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(200).optional(),
    description: zod_1.z.string().max(1000).optional(),
    status: zod_1.z.enum(['DRAFT', 'SCHEDULED', 'ACTIVE', 'COMPLETED']).optional(),
});
exports.campaignFiltersSchema = zod_1.z.object({
    status: zod_1.z.enum(['DRAFT', 'SCHEDULED', 'ACTIVE', 'COMPLETED', 'all']).optional(),
    dateFrom: exports.dateSchema.optional(),
    dateTo: exports.dateSchema.optional(),
    search: zod_1.z.string().optional(),
});
exports.createTemplateSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(200),
    description: zod_1.z.string().min(10).max(1000),
    difficulty: zod_1.z.enum(['EASY', 'MEDIUM', 'HARD']),
    category: zod_1.z.enum([
        'PASSWORD',
        'PACKAGE',
        'EXECUTIVE',
        'PAYROLL',
        'SECURITY',
        'VENDOR',
        'HR',
        'SOCIAL',
        'BANK',
        'IT',
    ]),
    subject: zod_1.z.string().min(3).max(200),
    fromName: zod_1.z.string().min(2).max(100),
    fromEmail: exports.emailSchema,
    body: zod_1.z.string().min(50),
    ctaText: zod_1.z.string().max(100).optional(),
    ctaUrl: zod_1.z.string().url().optional(),
    redFlags: zod_1.z.array(zod_1.z.string()).min(1, 'At least one red flag is required'),
});
exports.updateTemplateSchema = exports.createTemplateSchema.partial();
exports.createQuizSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(200),
    description: zod_1.z.string().max(1000).optional(),
    difficulty: zod_1.z.enum(['EASY', 'MEDIUM', 'HARD']),
    category: zod_1.z.enum([
        'PASSWORD',
        'PACKAGE',
        'EXECUTIVE',
        'PAYROLL',
        'SECURITY',
        'VENDOR',
        'HR',
        'SOCIAL',
        'BANK',
        'IT',
    ]),
    timeLimit: zod_1.z.number().int().positive().optional(),
    passingScore: zod_1.z.number().int().min(0).max(100).default(70),
    questions: zod_1.z.array(zod_1.z.object({
        question: zod_1.z.string().min(10),
        options: zod_1.z.array(zod_1.z.string()).min(2).max(6),
        correctAnswer: zod_1.z.number().int().min(0),
        explanation: zod_1.z.string().optional(),
        order: zod_1.z.number().int().min(0),
    })).min(1, 'At least one question is required'),
});
exports.submitQuizSchema = zod_1.z.object({
    answers: zod_1.z.record(zod_1.z.number().int()),
    timeSpent: zod_1.z.number().int().positive(),
});
exports.updateOrganizationSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(200).optional(),
    logo: zod_1.z.string().url().optional(),
    primaryColor: zod_1.z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color').optional(),
    secondaryColor: zod_1.z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color').optional(),
    smtpHost: zod_1.z.string().optional(),
    smtpPort: zod_1.z.number().int().positive().optional(),
    smtpUser: zod_1.z.string().optional(),
    smtpPassword: zod_1.z.string().optional(),
    fromEmail: exports.emailSchema.optional(),
    fromName: zod_1.z.string().optional(),
});
const validate = (schema, data) => {
    return schema.parse(data);
};
exports.validate = validate;
const validateSafe = (schema, data) => {
    const result = schema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, errors: result.error };
};
exports.validateSafe = validateSafe;
//# sourceMappingURL=validation.js.map