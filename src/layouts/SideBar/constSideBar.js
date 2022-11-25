// for collpsing sidebar

export const sideContainerVariants = {
    true: {
        width: "21rem",
    },
    false: {
        width: "6rem",
        transition: {
        delay: 0.6,
        },
    },
};

export const sidebarVariants = {
    true: {
        transition: 
            "width 2s linear 2s"
        ,
    },
    false: {
        width: "6rem",
        transition: 
            "width 1s linear 1s"
        ,
    },
};

export const FucUserName = {
    true: {
        fontSize: "18px",
        width: "100%"
    },
    false: {
        display: 'none'
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