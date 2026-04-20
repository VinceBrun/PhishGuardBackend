export interface AIAnalysisResult {
    is_phishing: boolean;
    phishing_probability: number;
    safe_probability: number;
    risk_level: string;
    confidence: number;
    model_breakdown: {
        random_forest: number;
        distilbert: number;
        ensemble: number;
    };
}
export declare const aiService: {
    analyzeEmail(emailText: string): Promise<AIAnalysisResult>;
    batchAnalyze(emails: string[]): Promise<AIAnalysisResult[]>;
    checkHealth(): Promise<{
        status: string;
        models_loaded: boolean;
    }>;
};
//# sourceMappingURL=ai.service.d.ts.map