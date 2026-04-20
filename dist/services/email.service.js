"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const config_1 = require("../config");
const database_1 = tslib_1.__importDefault(require("../utils/database"));
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
const transporter = nodemailer_1.default.createTransport({
    host: config_1.config.SMTP_HOST,
    port: config_1.config.SMTP_PORT,
    secure: config_1.config.SMTP_SECURE,
    auth: {
        user: config_1.config.SMTP_USER,
        pass: config_1.config.SMTP_PASSWORD,
    },
});
function buildTrackingPixelUrl(campaignId, userId) {
    return `${config_1.config.BACKEND_URL}/api/${config_1.config.API_VERSION}/email/track/open?cid=${campaignId}&uid=${userId}`;
}
function buildTrackingLinkUrl(campaignId, userId) {
    return `${config_1.config.BACKEND_URL}/api/${config_1.config.API_VERSION}/email/track/click?cid=${campaignId}&uid=${userId}`;
}
function renderEmailBody(template, userName, campaignId, userId) {
    const trackingLink = buildTrackingLinkUrl(campaignId, userId);
    const trackingPixel = buildTrackingPixelUrl(campaignId, userId);
    let body = template.body.replace(/\{\{user_name\}\}/g, userName);
    const ctaButton = template.ctaText
        ? `<div style="text-align:center;margin:24px 0;">
        <a href="${trackingLink}" style="background-color:#2563eb;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:600;display:inline-block;">
          ${template.ctaText}
        </a>
      </div>`
        : '';
    return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <div style="white-space:pre-wrap;line-height:1.6;color:#333333;font-size:14px;">
        ${body}
      </div>
      ${ctaButton}
      <img src="${trackingPixel}" width="1" height="1" style="display:none;" alt="" />
    </div>
  `;
}
exports.emailService = {
    async sendCampaignEmails(campaignId) {
        const campaign = await database_1.default.campaign.findUnique({
            where: { id: campaignId },
            include: {
                template: true,
                participants: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
                organization: {
                    select: {
                        fromEmail: true,
                        fromName: true,
                    },
                },
            },
        });
        if (!campaign) {
            throw new Error('Campaign not found');
        }
        const fromEmail = campaign.organization?.fromEmail || config_1.config.FROM_EMAIL;
        const fromName = campaign.template.fromName || campaign.organization?.fromName || config_1.config.FROM_NAME;
        let sentCount = 0;
        let failedCount = 0;
        for (const participant of campaign.participants) {
            try {
                const htmlBody = renderEmailBody(campaign.template, participant.user.name, campaignId, participant.user.id);
                await transporter.sendMail({
                    from: `"${fromName}" <${fromEmail}>`,
                    to: participant.user.email,
                    subject: campaign.template.subject,
                    html: htmlBody,
                });
                await database_1.default.emailEvent.create({
                    data: {
                        eventType: 'sent',
                        campaignId,
                        userId: participant.user.id,
                    },
                });
                sentCount++;
                logger_1.default.info(`Email sent to ${participant.user.email} for campaign ${campaignId}`);
            }
            catch (err) {
                failedCount++;
                logger_1.default.error(`Failed to send email to ${participant.user.email}: ${err}`);
            }
        }
        return { sentCount, failedCount, total: campaign.participants.length };
    },
    async recordOpen(campaignId, userId, ipAddress, userAgent) {
        await database_1.default.emailEvent.create({
            data: {
                eventType: 'opened',
                campaignId,
                userId,
                ipAddress,
                userAgent,
            },
        });
        await database_1.default.campaignParticipant.updateMany({
            where: { campaignId, userId, isEmailOpened: false },
            data: {
                isEmailOpened: true,
                emailOpenedAt: new Date(),
            },
        });
    },
    async recordClick(campaignId, userId, ipAddress, userAgent) {
        await database_1.default.emailEvent.create({
            data: {
                eventType: 'clicked',
                campaignId,
                userId,
                ipAddress,
                userAgent,
            },
        });
        const participant = await database_1.default.campaignParticipant.findFirst({
            where: { campaignId, userId },
        });
        if (participant && !participant.isLinkClicked) {
            const timeToClick = participant.emailSentAt
                ? Math.round((Date.now() - participant.emailSentAt.getTime()) / 1000)
                : null;
            await database_1.default.campaignParticipant.updateMany({
                where: { campaignId, userId },
                data: {
                    isLinkClicked: true,
                    linkClickedAt: new Date(),
                    timeToClick,
                },
            });
        }
    },
    async verifyConnection() {
        try {
            await transporter.verify();
            return true;
        }
        catch {
            return false;
        }
    },
};
//# sourceMappingURL=email.service.js.map