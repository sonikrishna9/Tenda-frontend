"use client";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FiDownload } from "react-icons/fi";

/* ================= PDF GENERATOR COMPONENT ================= */
const ProductPDFGenerator = ({ 
  product, 
  onDownloadStart, 
  onDownloadComplete, 
  onError 
}) => {
  
  const generatePDF = async () => {
    try {
      if (onDownloadStart) onDownloadStart();

      // Create new PDF document
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // Add product title
      doc.setFontSize(24);
      doc.setTextColor(41, 128, 185); // Blue color
      doc.text(product?.title || "Product Datasheet", 14, 20);

      // Add product subtitle if exists
      if (product?.subtitle) {
        doc.setFontSize(14);
        doc.setTextColor(100, 100, 100);
        doc.text(product.subtitle, 14, 30);
      }

      // Add category information
      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      let yPos = 40;
      
      if (product?.parentCategory) {
        doc.text(`Category: ${product.parentCategory}`, 14, yPos);
        yPos += 7;
      }
      
      if (product?.subCategory) {
        doc.text(`Subcategory: ${product.subCategory}`, 14, yPos);
        yPos += 7;
      }

      // Add description if exists
      if (product?.description) {
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        
        // Split description into multiple lines
        const splitDescription = doc.splitTextToSize(
          `Description: ${product.description}`,
          180
        );
        doc.text(splitDescription, 14, yPos + 5);
        yPos += splitDescription.length * 5 + 10;
      }

      // Add generation date
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        14,
        doc.internal.pageSize.height - 10
      );

      // Add page number
      doc.text(
        `Page 1`,
        doc.internal.pageSize.width - 30,
        doc.internal.pageSize.height - 10
      );

      // ================= PARAMETERS TABLE =================
      if (product?.parameters && product.parameters.length > 0) {
        // Add a new page for parameters
        doc.addPage();

        // Parameters header
        doc.setFontSize(20);
        doc.setTextColor(41, 128, 185);
        doc.text("Technical Specifications", 14, 20);

        let currentY = 30;

        // Loop through each section
        product.parameters.forEach((section, sectionIndex) => {
          if (section.items && section.items.length > 0) {
            // Prepare table data
            const tableData = section.items.map(item => [
              item.title || "-",
              item.subtitle || "-"
            ]);

            // Generate table
            autoTable(doc, {
              startY: currentY,
              head: [[section.title || "Specification", "Value"]],
              body: tableData,
              theme: "grid",
              styles: {
                fontSize: 10,
                cellPadding: 4,
                lineColor: [200, 200, 200],
                lineWidth: 0.1,
              },
              headStyles: {
                fillColor: [41, 128, 185],
                textColor: [255, 255, 255],
                fontStyle: "bold",
                fontSize: 11,
              },
              bodyStyles: {
                textColor: [50, 50, 50],
              },
              alternateRowStyles: {
                fillColor: [245, 245, 245],
              },
              columnStyles: {
                0: { fontStyle: "bold", cellWidth: 70 },
                1: { cellWidth: "auto" },
              },
              margin: { left: 14, right: 14 },
              didDrawPage: (data) => {
                // Add footer on each page
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(
                  product?.title || "Product Datasheet",
                  14,
                  doc.internal.pageSize.height - 10
                );
                doc.text(
                  `Page ${doc.internal.getNumberOfPages()}`,
                  doc.internal.pageSize.width - 30,
                  doc.internal.pageSize.height - 10
                );
              },
            });

            // Update current Y position for next table
            currentY = doc.lastAutoTable.finalY + 15;
          }
        });

        // Add summary table
        const totalSections = product.parameters.length;
        const totalParameters = product.parameters.reduce(
          (sum, section) => sum + (section.items?.length || 0),
          0
        );

        autoTable(doc, {
          startY: currentY,
          body: [
            ["Total Sections", totalSections.toString()],
            ["Total Parameters", totalParameters.toString()],
            ["Document Version", "1.0"],
            ["Last Updated", new Date().toLocaleDateString()],
          ],
          theme: "plain",
          styles: {
            fontSize: 10,
            cellPadding: 3,
          },
          columnStyles: {
            0: { fontStyle: "bold", cellWidth: 50 },
            1: { cellWidth: 50 },
          },
          margin: { left: 14 },
        });
      } else {
        // No parameters found
        doc.setFontSize(12);
        doc.setTextColor(150, 150, 150);
        doc.text("No technical specifications available.", 14, 50);
      }

      // Save the PDF
      const filename = `${product?.title?.replace(/\s+/g, "_") || "product"}_datasheet_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      
      doc.save(filename);
      
      if (onDownloadComplete) onDownloadComplete();

    } catch (error) {
      console.error("PDF generation error:", error);
      if (onError) onError(error);
      
      // Fallback: try to generate a simpler PDF
      try {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Product Datasheet", 14, 20);
        doc.setFontSize(12);
        doc.text(`Product: ${product?.title || "N/A"}`, 14, 30);
        doc.text("Error generating detailed PDF. Please try again.", 14, 40);
        doc.save(`product_datasheet_${Date.now()}.pdf`);
      } catch (fallbackError) {
        console.error("Fallback PDF generation failed:", fallbackError);
      }
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
    >
      <FiDownload className="w-5 h-5" />
      <span>Download Datasheet (PDF)</span>
    </button>
  );
};

/* ================= PDF PREVIEW COMPONENT ================= */
export const PDFPreview = ({ product, onClose }) => {
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    setGenerating(true);
    
    // Create a temporary generator instance
    const tempGenerator = new ProductPDFGenerator({ 
      product,
      onDownloadComplete: () => {
        setGenerating(false);
        onClose();
      }
    });
    
    // Call the generate method
    await tempGenerator.generatePDF();
  };

  // Calculate total parameters
  const totalSections = product?.parameters?.length || 0;
  const totalParameters = product?.parameters?.reduce(
    (sum, section) => sum + (section.items?.length || 0), 
    0
  ) || 0;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">PDF Preview</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* PDF Preview Content */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <FiDownload className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{product?.title} Datasheet</h3>
                <p className="text-sm text-gray-500">
                  Includes all technical specifications and parameters
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-500">Total Sections</div>
                <div className="text-2xl font-bold text-gray-800">
                  {totalSections}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-500">Total Parameters</div>
                <div className="text-2xl font-bold text-gray-800">
                  {totalParameters}
                </div>
              </div>
            </div>

            {/* Preview of tables */}
            <div className="mt-4 max-h-60 overflow-y-auto">
              {product?.parameters?.map((section, idx) => (
                <div key={section._id || idx} className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">{section.title}</h4>
                  <div className="bg-white rounded-lg border border-gray-200">
                    {section.items?.slice(0, 3).map((item, itemIdx) => (
                      <div
                        key={item._id || itemIdx}
                        className="flex justify-between p-2 border-b last:border-b-0"
                      >
                        <span className="text-sm text-gray-600">{item.title}</span>
                        <span className="text-sm font-medium text-gray-800">{item.subtitle}</span>
                      </div>
                    ))}
                    {section.items?.length > 3 && (
                      <div className="p-2 text-center text-xs text-gray-400">
                        +{section.items.length - 3} more parameters
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              disabled={generating}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all disabled:opacity-50 font-medium shadow-md hover:shadow-lg min-w-[140px]"
            >
              {generating ? (
                <span className="flex items-center justify-center">
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Generating...
                </span>
              ) : (
                'Download PDF'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= PDF DOWNLOAD BUTTON WITH PROGRESS ================= */
export const PDFDownloadButton = ({ product, className = "", onComplete }) => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    setDownloading(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const generator = new ProductPDFGenerator({
        product,
        onDownloadStart: () => {},
        onDownloadComplete: () => {
          clearInterval(interval);
          setProgress(100);
          setTimeout(() => {
            setDownloading(false);
            setProgress(0);
            if (onComplete) onComplete();
          }, 500);
        },
        onError: () => {
          clearInterval(interval);
          setDownloading(false);
          setProgress(0);
        }
      });

      await generator.generatePDF();
    } catch (error) {
      clearInterval(interval);
      setDownloading(false);
      setProgress(0);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className={`relative overflow-hidden flex items-center justify-center gap-2 ${className}`}
    >
      {downloading ? (
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
          <span className="flex items-center gap-2">
            Generating PDF... 
            <span className="text-sm font-mono">{progress}%</span>
          </span>
        </div>
      ) : (
        <>
          <FiDownload className="w-5 h-5" />
          <span>Download Datasheet</span>
        </>
      )}
    </button>
  );
};

export default ProductPDFGenerator;