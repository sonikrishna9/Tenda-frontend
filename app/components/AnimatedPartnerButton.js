'use client';

import { motion } from 'framer-motion';

export default function AnimatedPartnerButton({
    onDealerClick,
    onSiPartnerClick,
}) {
    return (
        <div
            style={{
                height: '22rem',
                width: '48px',
                position: 'relative',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                boxShadow: '0 8px 30px rgba(249, 115, 22, 0.45)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'default',
            }}
        >
            {/* WhatsApp-style Ping */}
            <span className="absolute inset-0 rounded-full animate-ping bg-orange-400/25 pointer-events-none" />

            {/* ROTATED CONTENT */}
            <div
                style={{
                    transform: 'rotate(-90deg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    zIndex: 1,
                    whiteSpace: 'nowrap',
                }}
            >
                {/* Dealer / Distributor */}
                <button
                    onClick={onDealerClick}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        cursor: 'pointer',
                        padding: '6px 4px',
                    }}
                >
                    Dealer / Distributor
                </button>

                {/* Divider */}
                <span
                    style={{
                        width: '18px',
                        height: '2px',
                        background: 'rgba(255,255,255,0.6)',
                        borderRadius: '2px',
                    }}
                />

                {/* SI Partner */}
                <button
                    onClick={onSiPartnerClick}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        cursor: 'pointer',
                        padding: '6px 4px',
                    }}
                >
                    SI Partner
                </button>

                {/* Arrow bottom → top */}
                <motion.div
                    animate={{ y: [10, -10] }}
                    transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                    }}
                >
                    
                </motion.div>
            </div>

            {/* Shine */}
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '-100%' }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'linear-gradient(180deg, transparent, rgba(255,255,255,0.25), transparent)',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
}
