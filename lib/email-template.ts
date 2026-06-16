import { site, BRAND } from "@/content/site";

/**
 * Branded HTML e-mail in the Nelissen house style.
 *
 * Email clients are picky: table-based layout, inline styles only, web-safe
 * font stacks (custom fonts don't load reliably), so the design echoes the site
 * with brand colours + uppercase letter-spaced headings rather than the actual
 * Barlow/DM Sans webfonts. Built generically so future flows (e.g. post-job
 * review requests) can reuse `baseLayout`.
 */

const HEADING_STACK = "Arial, Helvetica, sans-serif";
const BODY_STACK = "Arial, Helvetica, sans-serif";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** The three brand squares, as a bullet-proof little table. */
function logoSquares(): string {
  const sq = (color: string) =>
    `<td width="13" height="13" style="background:${color};font-size:0;line-height:0;">&nbsp;</td>`;
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      ${sq(BRAND.yellow)}<td width="4" style="font-size:0;line-height:0;">&nbsp;</td>
      ${sq(BRAND.red)}<td width="4" style="font-size:0;line-height:0;">&nbsp;</td>
      ${sq(BRAND.blue)}
    </tr></table>`;
}

type BaseLayout = {
  title: string;
  /** Hidden inbox-preview text. */
  preheader?: string;
  /** Inner HTML of the white content card. */
  contentHtml: string;
};

export function baseLayout({ title, preheader, contentHtml }: BaseLayout): string {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="nl" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f7f6f4;">
  ${
    preheader
      ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#f7f6f4;font-size:1px;line-height:1px;">${esc(preheader)}</div>`
      : ""
  }
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f7f6f4;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%;background:#ffffff;border:1px solid rgba(44,48,56,0.12);">
          <!-- Header -->
          <tr>
            <td style="background:${BRAND.anthracite};padding:22px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:12px;">${logoSquares()}</td>
                  <td style="vertical-align:middle;font-family:${HEADING_STACK};font-weight:bold;font-size:18px;letter-spacing:2px;text-transform:uppercase;color:#ffffff;">
                    Tegelhandel <span style="color:${BRAND.yellow};">Nelissen</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Yellow accent strip -->
          <tr><td style="height:4px;background:${BRAND.yellow};font-size:0;line-height:0;">&nbsp;</td></tr>
          <!-- Content -->
          <tr>
            <td style="padding:32px 28px;font-family:${BODY_STACK};color:${BRAND.anthracite};">
              ${contentHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f7f6f4;border-top:1px solid rgba(44,48,56,0.1);padding:20px 28px;font-family:${BODY_STACK};font-size:12px;line-height:1.6;color:#7a7873;">
              <strong style="color:${BRAND.anthracite};">${esc(site.legalName)}</strong><br />
              ${esc(site.address.street)}, ${esc(site.address.postalCode)} ${esc(site.address.city)}<br />
              <a href="tel:${site.phone.replace(/\s/g, "")}" style="color:${BRAND.anthracite};text-decoration:none;">${esc(site.phone)}</a>
              &nbsp;·&nbsp;
              <a href="mailto:${esc(site.email)}" style="color:${BRAND.anthracite};text-decoration:none;">${esc(site.email)}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Notification e-mail sent to the company when the contact form is submitted. */
export function contactNotificationEmail(input: { name: string; email: string; message: string }) {
  const subject = `Nieuw bericht via ${site.shortName}: ${input.name}`;

  const field = (label: string, valueHtml: string) => `
    <tr>
      <td style="padding:0 0 14px 0;">
        <div style="font-family:${BODY_STACK};font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#7a7873;padding-bottom:3px;">${esc(label)}</div>
        <div style="font-family:${BODY_STACK};font-size:15px;color:${BRAND.anthracite};">${valueHtml}</div>
      </td>
    </tr>`;

  const contentHtml = `
    <div style="font-family:${HEADING_STACK};font-weight:bold;font-size:22px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.anthracite};padding-bottom:4px;">
      Nieuwe contactaanvraag
    </div>
    <div style="font-family:${BODY_STACK};font-size:14px;color:#7a7873;padding-bottom:24px;">
      Via het contactformulier op de website.
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      ${field("Naam", esc(input.name))}
      ${field("E-mailadres", `<a href="mailto:${esc(input.email)}" style="color:${BRAND.blue};text-decoration:none;">${esc(input.email)}</a>`)}
    </table>

    <div style="font-family:${BODY_STACK};font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#7a7873;padding:6px 0 6px 0;">Bericht</div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td style="background:#f7f6f4;border-left:3px solid ${BRAND.yellow};padding:16px 18px;font-family:${BODY_STACK};font-size:15px;line-height:1.6;color:${BRAND.anthracite};white-space:pre-wrap;">${esc(input.message)}</td>
      </tr>
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="padding-top:24px;">
      <tr>
        <td style="background:${BRAND.yellow};">
          <a href="mailto:${esc(input.email)}?subject=${encodeURIComponent("Re: uw aanvraag bij Tegelhandel Nelissen")}"
             style="display:inline-block;padding:11px 22px;font-family:${HEADING_STACK};font-size:13px;font-weight:bold;color:${BRAND.anthracite};text-decoration:none;">
            Direct antwoorden
          </a>
        </td>
      </tr>
    </table>`;

  const html = baseLayout({
    title: subject,
    preheader: `Bericht van ${input.name}`,
    contentHtml,
  });

  const text = `Nieuwe contactaanvraag via ${site.shortName}\n\nNaam: ${input.name}\nE-mail: ${input.email}\n\nBericht:\n${input.message}\n`;

  return { subject, html, text };
}
