"use client";
import React from "react";

const ProductParameter = ({ parameters = [] }) => {
  if (!parameters.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        No parameters available
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      {parameters.map((section, index) => (
        <div key={index} className="mb-14">
          {/* SECTION TITLE */}
          <div className="flex flex-col md:flex-row gap-10 border-t pt-10">
            <div className="md:w-1/4">
              <h3 className="text-lg font-semibold text-gray-900">
                {section.title}
              </h3>
            </div>

            {/* PARAMETERS */}
            <div className="md:w-3/4 space-y-6">
              {section.items?.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row md:gap-10 border-b pb-4"
                >
                  {/* KEY */}
                  <div className="md:w-1/3 font-medium text-gray-800">
                    {item.title}
                  </div>

                  {/* VALUE */}
                  <div className="md:w-2/3 text-gray-600 space-y-1">
                    {Array.isArray(item.subtitle) ? (
                      item.subtitle.map((val, idx) => (
                        <p key={idx}>{val}</p>
                      ))
                    ) : (
                      <p>{item.subtitle}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductParameter;
