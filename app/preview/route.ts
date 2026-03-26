import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const { cvText, fullName } = await req.json();

    if (!cvText) {
      return NextResponse.json(
        { error: "Missing CV content" },
        { status: 400 }
      );
    }

    const pdfDoc = await PDFDocument.create();

    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    const margin = 50;
    let y = height - margin;

    const bodySize = 11;
    const headingSize = 13;
    const nameSize = 20;
    const lineGap = 14;
    const sectionGap = 24;

    // ✅ Draw Name Header
    if (fullName) {
      page.drawText(fullName.toUpperCase(), {
        x: margin,
        y,
        size: nameSize,
        font: fontBold,
      });
      y -= sectionGap;
    }

    const lines = cvText.split("\n");

    for (const rawLine of lines) {
      const line = rawLine.trim();

      // Page break
      if (y < margin) {
        page = pdfDoc.addPage();
        y = height - margin;
      }

      // ✅ Detect Section Headings
      const isHeading =
        line.toLowerCase().includes("summary") ||
        line.toLowerCase().includes("skills") ||
        line.toLowerCase().includes("experience") ||
        line.toLowerCase().includes("education") ||
        line.toLowerCase().includes("certification");

      if (isHeading && line.length < 40) {
        y -= 8;
        page.drawText(line, {
          x: margin,
          y,
          size: headingSize,
          font: fontBold,
        });
        y -= sectionGap;
        continue;
      }

      // ✅ Bullet formatting
      const formattedLine = line.startsWith("-") || line.startsWith("•")
        ? "• " + line.replace(/^[-•]\s*/, "")
        : line;

      page.drawText(formattedLine, {
        x: margin,
        y,
        size: bodySize,
        font: fontRegular,
        color: rgb(0, 0, 0),
        maxWidth: width - margin * 2,
      });

      y -= lineGap;
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fullName || "cv"}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
