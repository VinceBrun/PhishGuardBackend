export declare const quizService: {
    getAll(filters: {
        category?: string;
        difficulty?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        quizzes: any;
        total: any;
        page: number;
        limit: number;
    }>;
    getById(id: string): Promise<any>;
    create(data: {
        title: string;
        description?: string;
        difficulty: string;
        category: string;
        timeLimit?: number;
        passingScore?: number;
        questions: Array<{
            question: string;
            options: string[];
            correctAnswer: number;
            explanation?: string;
            order: number;
        }>;
    }): Promise<any>;
    submitQuiz(quizId: string, userId: string, data: {
        answers: Record<string, number>;
        timeSpent: number;
    }): Promise<{
        attempt: any;
        score: number;
        passed: boolean;
        correctCount: number;
        totalQuestions: any;
    }>;
    getAttempts(userId: string): Promise<any>;
    getAttemptById(id: string): Promise<any>;
};
//# sourceMappingURL=quiz.service.d.ts.map