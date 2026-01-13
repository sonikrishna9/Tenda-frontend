'use client';

import { motion } from 'framer-motion';

export default function Steps() {
    const steps = [
        { number: "01", title: "Registration Form", description: "Submit your dealership registration form" },
        { number: "02", title: "Document Verification", description: "Our team evaluates your eligibility" },
        { number: "03", title: "Approval", description: "Approval & Start the business" }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 pb-10">
            {/* -------- Section Heading -------- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Simple <span className="text-orange-500">3-Step</span> Process
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                    From application to launching your partnership
                </p>
            </motion.div>

            {/* -------- Timeline -------- */}
            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-orange-200 via-orange-400 to-orange-200 hidden md:block" />

                <div className="grid md:grid-cols-2 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative ${index % 2 === 0
                                    ? 'md:text-right md:pr-12'
                                    : 'md:pl-12 md:mt-20'
                                }`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border-4 border-white shadow-lg hidden md:block" />

                            {/* Step Card */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                                <div className="text-5xl font-bold text-gray-200 mb-4">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
