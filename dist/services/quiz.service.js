"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizService = void 0;
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("../utils/database"));
const errors_1 = require("../utils/errors");
exports.quizService = {
    async getAll(filters) {
        const where = {};
        if (filters.category) {
            where.category = filters.category;
        }
        if (filters.difficulty) {
            where.difficulty = filters.difficulty;
        }
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const skip = (page - 1) * limit;
        const [quizzes, total] = await Promise.all([
            database_1.default.quiz.findMany({
                where,
                include: {
                    _count: {
                        select: {
                            questions: true,
                        },
                    },
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            database_1.default.quiz.count({ where }),
        ]);
        return { quizzes, total, page, limit };
    },
    async getById(id) {
        const quiz = await database_1.default.quiz.findUnique({
            where: { id },
            include: {
                questions: {
                    orderBy: { order: 'asc' },
                },
            },
        });
        if (!quiz) {
            throw new errors_1.NotFoundError('Quiz not found');
        }
        return quiz;
    },
    async create(data) {
        const quiz = await database_1.default.quiz.create({
            data: {
                title: data.title,
                description: data.description,
                difficulty: data.difficulty,
                category: data.category,
                timeLimit: data.timeLimit,
                passingScore: data.passingScore || 70,
                questions: {
                    create: data.questions,
                },
            },
            include: {
                questions: true,
            },
        });
        return quiz;
    },
    async submitQuiz(quizId, userId, data) {
        const quiz = await database_1.default.quiz.findUnique({
            where: { id: quizId },
            include: {
                questions: true,
            },
        });
        if (!quiz) {
            throw new errors_1.NotFoundError('Quiz not found');
        }
        let correctCount = 0;
        quiz.questions.forEach((question) => {
            const userAnswer = data.answers[question.id];
            if (userAnswer === question.correctAnswer) {
                correctCount++;
            }
        });
        const score = Math.round((correctCount / quiz.questions.length) * 100);
        const passed = score >= quiz.passingScore;
        const attempt = await database_1.default.quizAttempt.create({
            data: {
                quizId,
                userId,
                answers: data.answers,
                score,
                timeSpent: data.timeSpent,
                passed,
                completedAt: new Date(),
            },
        });
        return {
            attempt,
            score,
            passed,
            correctCount,
            totalQuestions: quiz.questions.length,
        };
    },
    async getAttempts(userId) {
        const attempts = await database_1.default.quizAttempt.findMany({
            where: { userId },
            include: {
                quiz: {
                    select: {
                        title: true,
                        difficulty: true,
                        category: true,
                    },
                },
            },
            orderBy: { completedAt: 'desc' },
        });
        return attempts;
    },
    async getAttemptById(id) {
        const attempt = await database_1.default.quizAttempt.findUnique({
            where: { id },
            include: {
                quiz: {
                    include: {
                        questions: true,
                    },
                },
            },
        });
        if (!attempt) {
            throw new errors_1.NotFoundError('Quiz attempt not found');
        }
        return attempt;
    },
};
//# sourceMappingURL=quiz.service.js.map