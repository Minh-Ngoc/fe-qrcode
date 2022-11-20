// for collpsing sidebar

export const sideContainerVariants = {
true: {
    width: "20rem",
},
false: {
    transition: {
    delay: 0.6,
    },
},
};

export const sidebarVariants = {
true: {},
false: {
    width: "6rem",
    transition: {
    delay: 0.4,
    },
},
};

export const profileVariants = {
    true: {
        alignSelf: "center",
        width: "6rem",
    },
    false: {
        alignSelf: "flex-start",
        marginTop: "2rem",
        width: "3rem",
    },
};