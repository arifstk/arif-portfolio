export function getOfferEmailTemplate(
  title: string,
  message: string,
  ctaUrl?: string,
  ctaText?: string,
) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 10px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);">
            
            <!-- Header Banner -->
            <tr>
              <td style="background: linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%); padding: 32px; text-align: center;">
                <span style="background-color: rgba(255, 255, 255, 0.2); color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; padding: 6px 14px; border-radius: 20px; display: inline-block; margin-bottom: 12px;">
                  Exclusive Offer
                </span>
                <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0; line-height: 1.3;">
                  ${title}
                </h1>
              </td>
            </tr>

            <!-- Body Content -->
            <tr>
              <td style="padding: 36px 32px; color: #334155; font-size: 15px; line-height: 1.7;">
                <div style="white-space: pre-wrap;">${message}</div>

                ${
                  ctaUrl && ctaText
                    ? `
                <div style="margin-top: 32px; text-align: center;">
                  <a href="${ctaUrl}" target="_blank" style="background-color: #6d28d9; color: #ffffff; padding: 14px 28px; border-radius: 12px; font-weight: 600; font-size: 14px; text-decoration: none; display: inline-block; box-shadow: 0 4px 6px -1px rgba(109, 40, 217, 0.3);">
                    ${ctaText}
                  </a>
                </div>
                `
                    : ""
                }
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f1f5f9; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
                <p style="margin: 0 0 8px 0;">You received this because you are subscribed to our newsletter.</p>
                <p style="margin: 0;">© ${new Date().getFullYear()} Shaikh Arif | All rights reserved.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
