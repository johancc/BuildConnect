// This files holds refs for scrolling.

import {navigate} from "@reach/router";

// To use:
// 1) add "ref={ (ref) => refs.<name>=ref }" to component being referenced
// 2) add "onClick={() => scrollToRefOrPage(refs.<name>, "<fallback route>")}" to button or link

// Scroll to ref or navigate to route as fallback if ref is null
const scrollToRefOrPage = (ref, route) => {
    if (ref) {
        window.scrollTo({
            top: ref.offsetTop,
            left: 0,
            behavior: 'smooth'
        });
    } else {
        navigate(route);
    }
}

const refs = {
    about: null,
    contact: null,
};

export {
    refs,
    scrollToRefOrPage
}