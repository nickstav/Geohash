function checkIfDesktop() {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    if (mediaQuery.matches) {
        return true;
    } else {
        return false;
    }

}

export { checkIfDesktop }