const Variants = {
    pageInitial: {
        y: '100%',
    },
    pageIn: {
        y: 0,
        transition: { duration: 0.8 },
    },
    pageOut: {
        y: '-100%',
        transition: { duration: 0.8 },
    },
    slideInInitial: {
        x: '100%',
    },
    slideIn: {
        x: 0,
        transition: { duration: 0.4 },
    },
    slideOut: {
        x: '-100%',
        transition: { duration: 0.4 },
        opacity: 0,
    },
    fadeInInitial: {
        opacity: 0,
    },
    fadeIn: {
        opacity: 1,
        transition: { duration: 0.8 },
    },
    fadeOut: {
        opacity: 0,
    },
    slideUpInitial: {
        y: '100%',
    },
    slideUp: {
        y: 0,
        transition: { duration: 0.8 },
    },
    slideUpOut: {
        y: '-100%',
        transition: { duration: 0.8 },
    },
    slideInLeftInitial: {
        x: '-100%',
    },
    slideInLeft: {
        x: 0,
        transition: { duration: 0.4 },
    },
    slideOutLeft: {
        x: '100%',
        transition: { duration: 0.4 },
        opacity: 0,
    },
};

const Transition = {
    type: 'spring',
    mass: 0.2,
    duration: 1,
};

export default {
    Variants,
    Transition,
};
