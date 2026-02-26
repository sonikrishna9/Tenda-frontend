import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/* ===== LOAD IMAGE URL → BASE64 ===== */
const loadImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg", 0.95));
    };

    img.onerror = reject;
  });

export const generateProductPDF = async (product) => {

  const ORANGE = [242, 98, 43];      // main brand orange
  const DARK = [40, 40, 40];
  const LIGHT = [120,120,120];

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  let y = 18;

  /* ===== HEADER STRIP ===== */
  doc.setFillColor(...ORANGE);
  doc.rect(0,0,210,14,"F");

  doc.setFontSize(12);
  doc.setTextColor(255,255,255);
  doc.text("PRODUCT DATASHEET",14,9);

  /* ===== TITLE ===== */
  doc.setTextColor(...DARK);
  doc.setFontSize(22);
  doc.setFont(undefined,"bold");
  doc.text(product?.title || "Product",14,y+10);

  y+=18;

  /* ===== SUBTITLE ===== */
  if(product?.subtitle){
    doc.setFontSize(12);
    doc.setTextColor(...LIGHT);
    doc.setFont(undefined,"normal");
    doc.text(product.subtitle,14,y);
    y+=8;
  }

  /* ===== IMAGE ===== */
  try{
    const imgUrl = product?.images?.[0]?.url;

    if(imgUrl){
      const base64 = await loadImage(imgUrl);

      const width = 150;
      const height = 80;

      doc.addImage(base64,"JPEG",(210-width)/2,y,width,height);
      y+=height+10;
    }
  }catch(e){
    console.warn("Image failed",e);
  }

  /* ===== CATEGORY ===== */
  doc.setFontSize(11);
  doc.setTextColor(...DARK);

  if(product?.parentCategory){
    doc.text(`Category: ${product.parentCategory}`,14,y);
    y+=6;
  }

  if(product?.subCategory){
    doc.text(`Subcategory: ${product.subCategory}`,14,y);
    y+=6;
  }

  /* ===== DESCRIPTION BOX ===== */
  if(product?.description){

    doc.setDrawColor(230,230,230);
    doc.setFillColor(252,252,252);
    doc.roundedRect(12,y-2,186,30,3,3,"FD");

    doc.setFontSize(12);
    doc.setFont(undefined,"bold");
    doc.text("Description",14,y+4);

    doc.setFont(undefined,"normal");
    doc.setFontSize(11);

    const split = doc.splitTextToSize(product.description,180);
    doc.text(split,14,y+10);

    y+=split.length*5+18;
  }

  /* ===== PARAMETERS HEADER ===== */
  if(product?.parameters?.length){

    if(y>250){
      doc.addPage();
      y=20;
    }

    doc.setFontSize(16);
    doc.setFont(undefined,"bold");
    doc.setTextColor(...ORANGE);
    doc.text("Technical Specifications",14,y);

    y+=6;

    product.parameters.forEach(section=>{

      const body = section.items?.map(i=>[
        i.title || "-",
        i.subtitle || "-"
      ]) || [];

      autoTable(doc,{
        startY:y,

        head:[[section.title || "Specification","Value"]],
        body,

        theme:"grid",

        styles:{
          fontSize:10,
          cellPadding:4,
          textColor:[40,40,40]
        },

        headStyles:{
          fillColor:ORANGE,
          textColor:[255,255,255],
          fontStyle:"bold",
          fontSize:11
        },

        alternateRowStyles:{
          fillColor:[255,247,242]
        },

        margin:{left:14,right:14},

        didDrawPage:(data)=>{
          y=data.cursor.y+8;
        }
      });

      y=doc.lastAutoTable.finalY+10;

      if(y>260){
        doc.addPage();
        y=20;
      }

    });
  }

  /* ===== FOOTER ===== */
  const pages=doc.getNumberOfPages();

  for(let i=1;i<=pages;i++){
    doc.setPage(i);

    doc.setDrawColor(230,230,230);
    doc.line(14,285,196,285);

    doc.setFontSize(9);
    doc.setTextColor(150,150,150);

    doc.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      14,
      290
    );

    doc.text(
      `Page ${i}/${pages}`,
      180,
      290
    );
  }

  /* ===== SAVE ===== */
  const filename =
    `${product?.title?.replace(/\s+/g,"_") || "product"}_datasheet.pdf`;

  doc.save(filename);
};