import jsPDF from 'jspdf';
import { PageLayout } from '@/types/editor';

export const generatePDF = (htmlContent: string, pageLayout: PageLayout): void => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = {
    top: pageLayout.marginTop + (pageLayout.showHeader ? pageLayout.headerHeight : 0),
    bottom: pageLayout.marginBottom + (pageLayout.showFooter ? pageLayout.footerHeight : 0),
    left: pageLayout.marginLeft,
    right: pageLayout.marginRight,
  };
  const maxWidth = pageWidth - margin.left - margin.right;

  let yPosition = margin.top;
  let pageNumber = 1;

  // Function to add header
  const addHeader = () => {
    if (pageLayout.showHeader && pageLayout.headerText) {
      const headerY = pageLayout.marginTop;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);

      let headerText = pageLayout.headerText
        .replace('{page}', pageNumber.toString())
        .replace('{date}', new Date().toLocaleDateString())
        .replace('{title}', 'Document');

      pdf.text(headerText, margin.left, headerY + 5);
    }
  };

  // Function to add footer
  const addFooter = () => {
    if (pageLayout.showFooter && pageLayout.footerText) {
      const footerY = pageHeight - pageLayout.marginBottom;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);

      let footerText = pageLayout.footerText
        .replace('{page}', pageNumber.toString())
        .replace('{total}', '1')
        .replace('{date}', new Date().toLocaleDateString())
        .replace('{title}', 'Document');

      pdf.text(footerText, margin.left, footerY - 5);
    }
  };

  // Add header and footer to first page
  addHeader();
  addFooter();

  // Parse HTML content
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const elements = doc.body.children;

  const processElement = (element: Element) => {
    const tagName = element.tagName.toLowerCase();
    const text = element.textContent?.trim() || '';
    
    if (!text) return;

    // Set font based on element type
    let fontSize = 12;
    let fontStyle = 'normal';
    
    switch (tagName) {
      case 'h1':
        fontSize = 24;
        fontStyle = 'bold';
        break;
      case 'h2':
        fontSize = 20;
        fontStyle = 'bold';
        break;
      case 'h3':
        fontSize = 16;
        fontStyle = 'bold';
        break;
      default:
        fontSize = 12;
    }

    // Check for inline styles
    if (element.querySelector('b, strong') || (element as HTMLElement).style?.fontWeight === 'bold') {
      fontStyle = fontStyle === 'italic' ? 'bolditalic' : 'bold';
    }
    if (element.querySelector('i, em') || (element as HTMLElement).style?.fontStyle === 'italic') {
      fontStyle = fontStyle === 'bold' ? 'bolditalic' : 'italic';
    }

    pdf.setFont('helvetica', fontStyle);
    pdf.setFontSize(fontSize);
    pdf.setTextColor(0, 0, 0);

    const lineHeight = fontSize * 1.5 * 0.352778;

    // Wrap text
    const lines = pdf.splitTextToSize(text, maxWidth);

    lines.forEach((line: string) => {
      // Check if we need a new page
      if (yPosition + lineHeight > pageHeight - margin.bottom) {
        pdf.addPage();
        pageNumber++;
        yPosition = margin.top;
        addHeader();
        addFooter();
      }

      pdf.text(line, margin.left, yPosition);
      yPosition += lineHeight;
    });

    // Add spacing after element
    yPosition += lineHeight * 0.3;
  };

  // Process all elements
  Array.from(elements).forEach(processElement);

  pdf.save('document.pdf');
};
