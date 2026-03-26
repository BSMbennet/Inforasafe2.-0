import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const { cvText, fullName } = await req.json();

    if (!cvText) {
      return NextResponse.json(
        { error: "Missing CV content" },
        { status: 400 }
      );
    }

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const { width, height } = page.getSize();
    let y = height - 50;

    const fontSize = 11;
    const lineHeight = 14;

    const lines = cvText.split("\n");

    for (const line of lines) {
      if (y < 50) {
        y = height - 50;
        pdfDoc.addPage();
      }

      page.drawText(line, {
        x: 50,
        y,
        size: fontSize,
        font,
      });

      y -= lineHeight;
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fullName || "cv"}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
