function PhoneInfo() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    const orientation = screenWidth > screenHeight ? 'horizontal' : 'vertical';
    
    return {
        width: screenWidth,
        height: screenHeight,
        orientation: orientation

    };
}

console.log(PhoneInfo());

export default PhoneInfo;