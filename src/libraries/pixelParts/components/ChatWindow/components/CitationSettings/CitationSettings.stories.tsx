import * as React from 'react';
import CitationSettings from '.';

export default {
  title: 'Chat/CitationSettings',
  component: CitationSettings,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '<p>The <b>CitationSettings</b> component allows users to configure citation options for the chat.</p>'
      },
    },
  },
  args: {
    
  }
};

const settings = [
  {
    "title": "Exact Citations",
    "description": "Opens document with content highlighted. Slowest, but most precise.",
    "type": "Exact",
    "instructions": `
      ### Citation instructions
      ## 1. When to include citations
      - Strictly include coordinate tags only when the source document originates from a PDF (i.e., the filename ends with .pdf).
      - For all other file types (e.g., .docx, .txt, .xlsx), do not include coordinate tags under any circumstances. Ignore all citation-related instructions listed below if the document is not a PDF file.
      - IMPORTANT: Include all coordinate tags for PDF content — no omissions.

      ## 2. How to structure coordinate tags
      - Every sentence from the source PDF content is delivered to you in this pattern: SENTENCE_TEXT [Page#<N>~{minX:F2}, {minY:F2}, {maxX:F2}, {maxY:F2}]
      - The four x- and y-numbers are the coordinates in PDF points.
      - Every output citation coordinate tag must include all four coordinates, in the format: [Page#<N>~minX:F2, minY:F2, maxX:F2, maxY:F2]
    `
  },
  {
    "title": "Reference Page & Paragraph",
    "description": "Displays Page Number. Faster, but less precise.",
    "type": "Summary",
    "instructions": `
      ### Citation instructions
      When retrieving information from the document, always include the exact page number and paragraph number where the information appears. If the answer comes from multiple sections, list all corresponding page and paragraph numbers.
    `
  },
  {
    "title": "No Citations",
    "description": "Fastest, but no source verification.",
    "type": "None",
    "instructions": ""
  }
];

export const Default = {
  args: {
    text: <>Citations are supported for <b>Word</b> and <b>PDF</b> documents only.</>,
    onClick: (instructions, index) => console.log('Instructions:', instructions, 'Index:', index),
    selectedOption: 'Exact',
    settings
  }
};
