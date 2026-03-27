import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const FIXED_PDF_WORKER_URL =
  "https://mcdermottwillemery.sharepoint.com/sites/AI/SiteAssets/scripts/pdf.worker.min.js";

export function configurePdfJsWorker(): void {
  if (pdfjsLib.GlobalWorkerOptions.workerSrc !== FIXED_PDF_WORKER_URL) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = FIXED_PDF_WORKER_URL;
  }
}